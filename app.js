// Synchronous module fallback helpers if running via file:// protocol
let calculateZScoreFn = (rawScore, key, normData) => {
    const norm = (normData.aspects && normData.aspects[key]) || (normData.domains && normData.domains[key]);
    if (!norm || !norm.sd) return 0;
    return (rawScore - norm.mean) / norm.sd;
};

let calculateTScoreFn = (z) => Math.round((50 + (z * 10)) * 10) / 10;

let calculatePercentileFn = (zScore) => {
    if (zScore === 0) return 50;
    const sign = zScore < 0 ? -1 : 1;
    const absZ = Math.abs(zScore) / Math.sqrt(2);
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const t = 1.0 / (1.0 + p * absZ);
    const erf = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absZ * absZ);
    const cdf = 0.5 * (1.0 + sign * erf);
    return Math.min(Math.max(Math.round(cdf * 100), 1), 99);
};

let calculateSEMAndCIFn = (rawScore, key, normData) => {
    const norm = (normData.aspects && normData.aspects[key]) || (normData.domains && normData.domains[key]);
    if (!norm) return { sem: 0, ciRawLow: rawScore, ciRawHigh: rawScore, ciPctLow: 50, ciPctHigh: 50 };
    const reliability = norm.reliability || 0.84;
    const sem = norm.sd * Math.sqrt(1 - reliability);
    const marginRaw = 1.96 * sem;
    const ciRawLow = Math.max(0, Math.round((rawScore - marginRaw) * 10) / 10);
    const ciRawHigh = Math.round((rawScore + marginRaw) * 10) / 10;
    const zLow = (ciRawLow - norm.mean) / norm.sd;
    const zHigh = (ciRawHigh - norm.mean) / norm.sd;
    return {
        sem: Math.round(sem * 10) / 10,
        ciRawLow, ciRawHigh,
        ciPctLow: calculatePercentileFn(zLow),
        ciPctHigh: calculatePercentileFn(zHigh)
    };
};

// Fallback embedded normative dataset for local file:// execution
let normativeData = {
    aspects: {
        "Volatility": { "mean": 29.3, "sd": 7.2, "reliability": 0.89 },
        "Withdrawal": { "mean": 30.0, "sd": 6.2, "reliability": 0.87 },
        "Compassion": { "mean": 39.9, "sd": 5.4, "reliability": 0.84 },
        "Politeness": { "mean": 36.3, "sd": 5.3, "reliability": 0.81 },
        "Industriousness": { "mean": 31.7, "sd": 5.5, "reliability": 0.86 },
        "Orderliness": { "mean": 33.8, "sd": 6.1, "reliability": 0.85 },
        "Enthusiasm": { "mean": 36.2, "sd": 6.3, "reliability": 0.85 },
        "Assertiveness": { "mean": 33.5, "sd": 6.6, "reliability": 0.88 },
        "Intellect": { "mean": 35.6, "sd": 6.0, "reliability": 0.84 },
        "Openness": { "mean": 38.0, "sd": 5.5, "reliability": 0.84 }
    },
    domains: {
        "Neuroticism": { "mean": 59.3, "sd": 11.9, "reliability": 0.90 },
        "Agreeableness": { "mean": 76.2, "sd": 9.0, "reliability": 0.87 },
        "Conscientiousness": { "mean": 65.5, "sd": 9.9, "reliability": 0.89 },
        "Extraversion": { "mean": 69.7, "sd": 11.0, "reliability": 0.91 },
        "Openness/Intellect": { "mean": 73.6, "sd": 9.5, "reliability": 0.87 }
    }
};

(async function() {
    // Attempt dynamic module and JSON imports (works on local web servers / HTTP)
    try {
        const engine = await import('./ScoringEngine.js');
        calculateZScoreFn = engine.calculateZScore;
        calculateTScoreFn = engine.calculateTScore;
        calculatePercentileFn = engine.calculatePercentile;
        calculateSEMAndCIFn = engine.calculateSEMAndCI;
    } catch (e) {
        console.warn("ES6 ScoringEngine module load skipped (local file mode active). Using inline fallback math.");
    }

    try {
        const normsResponse = await fetch('./norms.json');
        if (normsResponse.ok) {
            normativeData = await normsResponse.json();
        }
    } catch (e) {
        console.warn("norms.json fetch skipped (local file mode active). Using inline normative defaults.");
    }

    // Response Validity Engine
    const ResponseValidityEngine = {
        config: {
            windowSize: 15,
            minVarianceThreshold: 0.15,
            minLatencySeconds: 240
        },
        rules: [],
        registerRule: function (name, evaluateFn, description) {
            this.rules.push({ name, evaluate: evaluateFn, description });
        },
        calculateVariance: function (arr) {
            if (!arr || arr.length <= 1) return 0;
            const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
            const sumSquares = arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
            return sumSquares / (arr.length - 1);
        },
        audit: function (responses, context = {}) {
            const errors = [];
            for (const rule of this.rules) {
                const result = rule.evaluate(responses, context, this.config);
                if (!result.isValid) {
                    errors.push({ ruleName: rule.name, message: result.message });
                }
            }
            return { isValid: errors.length === 0, errors };
        }
    };

    ResponseValidityEngine.registerRule(
        "sliding_window_straight_lining",
        function (responses, context, config) {
            if (context.isDebug || !context.surveyItems) return { isValid: true };
            const { windowSize, minVarianceThreshold } = config;
            const validResponses = [];
            const validItems = [];

            responses.forEach((r, idx) => {
                if (typeof r === 'number' && !isNaN(r)) {
                    validResponses.push(r);
                    validItems.push(context.surveyItems[idx]);
                }
            });

            if (validResponses.length < windowSize) return { isValid: true };

            for (let i = 0; i <= validResponses.length - windowSize; i++) {
                const windowSlice = validResponses.slice(i, i + windowSize);
                const itemSlice = validItems.slice(i, i + windowSize);
                const variance = ResponseValidityEngine.calculateVariance(windowSlice);

                if (variance < minVarianceThreshold) {
                    const hasReverseScored = itemSlice.some(item => item && item.reverse);
                    if (hasReverseScored) {
                        return {
                            isValid: false,
                            message: `Response Straight-Lining Detected: Answers across consecutive items #${i + 1} to #${i + windowSize} exhibited abnormally low variance (${variance.toFixed(3)} < minimum threshold ${minVarianceThreshold}). Please review this block and answer authentically.`
                        };
                    }
                }
            }
            return { isValid: true };
        },
        "Sliding-window variance check"
    );

    ResponseValidityEngine.registerRule("cognitive_latency_check", () => ({ isValid: true }), "Latency check");

    ResponseValidityEngine.registerRule(
        "impression_management_detector",
        function (responses, context) {
            if (context.isDebug || !context.surveyItems) return { isValid: true };
            let validityScore = 0, validityCount = 0;
            context.surveyItems.forEach((item, idx) => {
                if (item.domain === 'validity') {
                    const val = parseInt(responses[idx]);
                    if (!isNaN(val)) {
                        validityScore += item.reverse ? (6 - val) : val;
                        validityCount++;
                    }
                }
            });
            if (validityCount === 0) return { isValid: true };
            if ((validityScore / validityCount) >= 4.2) {
                return {
                    isValid: false,
                    message: `Impression Management Detected: Responses to social desirability items indicate a statistically improbable pattern of favorable self-reporting.`
                };
            }
            return { isValid: true };
        },
        "Impression management check"
    );

    // Main App Object
    const app = {
        surveyItems: [],
        userAnswers: [],
        currentPage: 0,
        pageSize: 20,

        mountPersistentNodes: function() {
            const container = document.getElementById('questions-container');
            if (!container) return;
            let html = '';
            for (let i = 0; i < this.pageSize; i++) {
                html += `
                    <div class="question-item hidden" id="persistent-node-${i}">
                        <span class="question-text" id="persistent-text-${i}"></span>
                        <div class="options-container" id="persistent-options-${i}">
                            ${(surveyStructure.scaleOptions || surveyStructure.scale).map(opt => `
                                <label class="option-label">
                                    <input type="radio" name="node_q${i}" value="${opt.value}" required>
                                    <span>${opt.label}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
            container.innerHTML = html;
        },

        init: function () {
            this.mountPersistentNodes();
            this.randomizeAndPrepareItems();

            const cachedAnswers = sessionStorage.getItem('bfas_userAnswers');
            const cachedPage = sessionStorage.getItem('bfas_currentPage');

            if (cachedAnswers && cachedPage) {
                const parsedAnswers = JSON.parse(cachedAnswers);
                const parsedPage = parseInt(cachedPage, 10);

                if (parsedPage > 0 && parsedAnswers.length === this.surveyItems.length) {
                    this.userAnswers = parsedAnswers;
                    this.currentPage = parsedPage;
                    document.getElementById('intro-view').classList.add('hidden');
                    document.getElementById('survey-form').classList.remove('hidden');
                    document.getElementById('results-view').classList.add('hidden');
                    this.renderQuestions();
                    return;
                }
            }

            document.getElementById('intro-view').classList.remove('hidden');
            document.getElementById('survey-form').classList.add('hidden');
            document.getElementById('results-view').classList.add('hidden');
            this.renderQuestions();
        },

        randomizeAndPrepareItems: function () {
            const items = surveyStructure.items || [];
            const controlItems = items.filter(item => item.type === 'control');
            const normalItems = items.filter(item => item.type !== 'control');

            const shuffledNormal = [...normalItems];
            for (let i = shuffledNormal.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledNormal[i], shuffledNormal[j]] = [shuffledNormal[j], shuffledNormal[i]];
            }

            const shuffledControls = [...controlItems];
            for (let i = shuffledControls.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledControls[i], shuffledControls[j]] = [shuffledControls[j], shuffledControls[i]];
            }

            const combined = [...shuffledNormal];
            shuffledControls.forEach((ctrl, idx) => {
                const targetFraction = (idx + 1) / (shuffledControls.length + 1);
                const baseIndex = Math.round(combined.length * targetFraction);
                const jitter = Math.floor(Math.random() * 7) - 3;
                const insertIdx = Math.max(0, Math.min(combined.length, baseIndex + jitter));
                combined.splice(insertIdx, 0, ctrl);
            });

            this.surveyItems = combined;
            this.userAnswers = new Array(this.surveyItems.length).fill(null);
            this.currentPage = 0;
        },

        startSurvey: function () {
            this.randomizeAndPrepareItems();
            sessionStorage.removeItem('bfas_userAnswers');
            sessionStorage.removeItem('bfas_currentPage');
            this.startTimestamp = Date.now();
            document.getElementById('intro-view').classList.add('hidden');
            document.getElementById('survey-form').classList.remove('hidden');
            document.getElementById('results-view').classList.add('hidden');
            this.renderQuestions();
            window.scrollTo(0, 0);
        },

        saveCurrentPageAnswers: function () {
            const startIdx = this.currentPage * this.pageSize;
            const endIdx = Math.min(startIdx + this.pageSize, this.surveyItems.length);

            for (let i = startIdx; i < endIdx; i++) {
                const localIdx = i - startIdx;
                const selected = document.querySelector(`input[name="node_q${localIdx}"]:checked`);
                if (selected) {
                    this.userAnswers[i] = parseInt(selected.value, 10);
                }
            }
            sessionStorage.setItem('bfas_userAnswers', JSON.stringify(this.userAnswers));
            sessionStorage.setItem('bfas_currentPage', this.currentPage);
        },

        nextPage: function () {
            if (!this.isDebug && this.pageStartTime) {
                const elapsed = (Date.now() - this.pageStartTime) / 1000;
                if (elapsed < 15) {
                    alert("Please take at least 15 seconds to carefully read and respond to each statement before proceeding.");
                    return;
                }
            }
            this.saveCurrentPageAnswers();
            const totalPages = Math.ceil(this.surveyItems.length / this.pageSize);
            if (this.currentPage < totalPages - 1) {
                this.currentPage++;
                this.renderQuestions();
                window.scrollTo(0, 0);
            }
        },

        previousPage: function () {
            this.saveCurrentPageAnswers();
            if (this.currentPage > 0) {
                this.currentPage--;
                this.renderQuestions();
                window.scrollTo(0, 0);
            }
        },

        goToPage: function (pageIndex) {
            this.saveCurrentPageAnswers();
            const totalPages = Math.ceil(this.surveyItems.length / this.pageSize);
            if (pageIndex >= 0 && pageIndex < totalPages) {
                this.currentPage = pageIndex;
                this.renderQuestions();
                window.scrollTo(0, 0);
            }
        },

        renderQuestions: function () {
            this.pageStartTime = Date.now();
            const container = document.getElementById('questions-container');
            if (!container || !this.surveyItems || !this.surveyItems.length) return;

            const startIdx = this.currentPage * this.pageSize;
            const endIdx = Math.min(startIdx + this.pageSize, this.surveyItems.length);

            for (let i = 0; i < this.pageSize; i++) {
                const node = document.getElementById(`persistent-node-${i}`);
                if (!node) continue;

                const itemIdx = startIdx + i;
                if (itemIdx < endIdx) {
                    const item = this.surveyItems[itemIdx];
                    const savedValue = this.userAnswers[itemIdx];

                    node.classList.remove('hidden');
                    node.dataset.index = itemIdx;
                    node.dataset.type = item.type || 'normal';

                    const textEl = document.getElementById(`persistent-text-${i}`);
                    if (textEl) textEl.textContent = `${itemIdx + 1}. ${item.text}`;

                    const inputs = node.querySelectorAll(`input[name="node_q${i}"]`);
                    inputs.forEach(input => {
                        input.checked = (parseInt(input.value, 10) === savedValue);
                    });
                } else {
                    node.classList.add('hidden');
                }
            }

            this.updateProgress();
            this.renderPaginationControls();
        },

        renderPaginationControls: function () {
            const container = document.getElementById('pagination-controls');
            if (!container) return;

            const totalPages = Math.ceil(this.surveyItems.length / this.pageSize);
            let html = `
                <button type="button" class="btn secondary" onclick="app.previousPage()" ${this.currentPage === 0 ? 'disabled' : ''}>Previous</button>
                <span class="page-indicator">Page ${this.currentPage + 1} of ${totalPages}</span>
            `;

            if (this.currentPage === totalPages - 1) {
                html += `<button type="button" class="btn primary" onclick="app.submitSurvey()">Submit Survey</button>`;
            } else {
                html += `<button type="button" class="btn primary" onclick="app.nextPage()">Next</button>`;
            }

            container.innerHTML = html;
        },

        updateProgress: function () {
            const answeredCount = this.userAnswers.filter(a => a !== null).length;
            const totalCount = this.surveyItems.length;
            const percentage = Math.round((answeredCount / totalCount) * 100);

            const progressBar = document.getElementById('progress-bar');
            const progressText = document.getElementById('progress-text');

            if (progressBar) progressBar.style.width = percentage + '%';
            if (progressText) progressText.textContent = percentage + '% Complete';
        },

        submitSurvey: function (isDebug = false) {
            if (!isDebug) {
                this.saveCurrentPageAnswers();
            }
            this.submitTimestamp = Date.now();

            const unansweredIndices = [];
            this.userAnswers.forEach((ans, idx) => {
                if (ans === null || ans === undefined) {
                    unansweredIndices.push(idx + 1);
                }
            });

            if (unansweredIndices.length > 0) {
                alert(`Please answer all questions before submitting. Unanswered items: #${unansweredIndices.slice(0, 10).join(', ')}${unansweredIndices.length > 10 ? '...' : ''}`);
                const firstUnanswered = unansweredIndices[0] - 1;
                const targetPage = Math.floor(firstUnanswered / this.pageSize);
                this.goToPage(targetPage);
                return;
            }

            let attentionFailed = false;
            this.surveyItems.forEach((item, idx) => {
                if (item.type === 'control' && this.userAnswers[idx] !== item.target) {
                    attentionFailed = true;
                }
            });

            if (attentionFailed && !isDebug) {
                alert("Attention Check Failed: One or more validity verification statements were answered incorrectly. Please carefully review your answers.");
                return;
            }

            const auditResult = ResponseValidityEngine.audit(this.userAnswers, {
                startTimestamp: this.startTimestamp,
                submitTimestamp: this.submitTimestamp,
                isDebug: isDebug,
                surveyItems: this.surveyItems
            });

            if (!auditResult.isValid && !isDebug) {
                const errorMessages = auditResult.errors.map(e => `• [${e.ruleName}] ${e.message}`).join('\n\n');
                alert(`Assessment Validity Protocol Notice:\n\n${errorMessages}`);
                return;
            }

            const rawScores = {};
            resultsData.domains.forEach(domain => {
                rawScores[domain.id] = 0;
                rawScores[domain.name] = 0;
                domain.aspects.forEach(aspect => {
                    rawScores[aspect] = 0;
                });
            });

            this.surveyItems.forEach((item, idx) => {
                if (item.type === 'control') return;
                const val = parseInt(this.userAnswers[idx], 10);
                if (isNaN(val)) return;
                const scoredVal = item.reverse ? (6 - val) : val;

                if (item.domain && rawScores.hasOwnProperty(item.domain)) {
                    rawScores[item.domain] += scoredVal;
                }
                if (item.aspect && rawScores.hasOwnProperty(item.aspect)) {
                    rawScores[item.aspect] += scoredVal;
                }
            });

            this.showResults(rawScores);
        },

        getOrdinal: function(n) {
            const s = ["th", "st", "nd", "rd"];
            const v = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
        },

        generateWholeProfileSummary: function (scores) {
            if (!scores || !resultsData || !resultsData.domains) return '';

            const getLevel = (z) => {
                if (z < -1.2) return 'very_low';
                if (z < -0.4) return 'moderate_low';
                if (z <= 0.4) return 'balanced';
                if (z <= 1.2) return 'moderate_high';
                return 'very_high';
            };

            const domainStats = resultsData.domains.map(d => {
                const raw = scores[d.id] || scores[d.name] || 0;
                const z = calculateZScoreFn(raw, d.name, normativeData);
                const pct = calculatePercentileFn(z);
                const level = getLevel(z);
                const displayName = d.name === "Openness/Intellect" ? "Openness / Intellect" : d.name;
                return { id: d.id, name: d.name, displayName, raw, z, pct, level };
            });

            const sorted = [...domainStats].sort((a, b) => b.pct - a.pct);
            const primaryDriver = sorted[0];
            const primaryConstraint = sorted[sorted.length - 1];

            const nStat = domainStats.find(d => d.name === "Neuroticism") || { pct: 50, level: 'balanced', displayName: 'Neuroticism' };
            const cStat = domainStats.find(d => d.name === "Conscientiousness") || { pct: 50, level: 'balanced', displayName: 'Conscientiousness' };

            const transitionSummary = "The following metrics isolate the primary variables of your baseline behavior across daily operations, focusing on workflow management, risk assessment, and interpersonal alignment.";

            const driverDescriptions = {
                "Conscientiousness": `<strong>Structural management:</strong> Your baseline relies on strict scheduling and consistent task execution (<span class="synthesis-highlight">${primaryDriver.displayName}: ${this.getOrdinal(primaryDriver.pct)} percentile</span>). This operational driver prioritizes organizing household logistics, maintaining established standards, and eliminating unpredictability in daily planning.`,
                "Extraversion": `<strong>Social engagement:</strong> Your baseline relies on external interaction and assertive communication (<span class="synthesis-highlight">${primaryDriver.displayName}: ${this.getOrdinal(primaryDriver.pct)} percentile</span>). This operational driver prioritizes directing social calendars, leading group initiatives, and maintaining high activity levels in professional and personal settings.`,
                "Neuroticism": `<strong>Risk assessment:</strong> Your baseline relies on situational vigilance and threat detection (<span class="synthesis-highlight">${primaryDriver.displayName}: ${this.getOrdinal(primaryDriver.pct)} percentile</span>). This operational driver prioritizes monitoring environmental shifts, assessing interpersonal risks, and maintaining contingency plans across daily routines.`,
                "Agreeableness": `<strong>Interpersonal alignment:</strong> Your baseline relies on collaborative consensus and conflict reduction (<span class="synthesis-highlight">${primaryDriver.displayName}: ${this.getOrdinal(primaryDriver.pct)} percentile</span>). This operational driver prioritizes maintaining cooperative relationships, mediating disputes, and ensuring group cohesion across workplace and domestic environments.`,
                "Openness/Intellect": `<strong>Conceptual exploration:</strong> Your baseline relies on processing new information and analyzing complex systems (<span class="synthesis-highlight">${primaryDriver.displayName}: ${this.getOrdinal(primaryDriver.pct)} percentile</span>). This operational driver prioritizes testing unconventional methods, analyzing abstract concepts, and developing new problem-solving frameworks.`,
                "Openness": `<strong>Conceptual exploration:</strong> Your baseline relies on processing new information and analyzing complex systems (<span class="synthesis-highlight">${primaryDriver.displayName}: ${this.getOrdinal(primaryDriver.pct)} percentile</span>). This operational driver prioritizes testing unconventional methods, analyzing abstract concepts, and developing new problem-solving frameworks.`
            };

            const constraintDescriptions = {
                "Conscientiousness": `<strong>Operational flexibility:</strong> Your primary constraint is <span class="synthesis-highlight">${primaryConstraint.displayName} (${this.getOrdinal(primaryConstraint.pct)} percentile)</span>. This results in a preference for improvised workflows over rigid schedules. Maintaining long-term administrative tasks requires implementing automated systems rather than relying on sustained manual effort.`,
                "Extraversion": `<strong>Energy conservation:</strong> Your primary constraint is <span class="synthesis-highlight">${primaryConstraint.displayName} (${this.getOrdinal(primaryConstraint.pct)} percentile)</span>. This results in a rapid depletion of energy during prolonged social exposure. Maintaining operational capacity requires scheduling isolated downtime and limiting consecutive group engagements.`,
                "Neuroticism": `<strong>Emotional detachment:</strong> Your primary constraint is <span class="synthesis-highlight">${primaryConstraint.displayName} (${this.getOrdinal(primaryConstraint.pct)} percentile)</span>. This results in high composure during crises but can read as disinterest to others. Maintaining relational trust requires deliberately mirroring others' emotional states rather than defaulting to purely logical problem-solving.`,
                "Agreeableness": `<strong>Direct communication:</strong> Your primary constraint is <span class="synthesis-highlight">${primaryConstraint.displayName} (${this.getOrdinal(primaryConstraint.pct)} percentile)</span>. This results in a communication style that prioritizes factual utility over social comfort. Maintaining functional partnerships requires auditing your delivery tone during sensitive discussions to prevent unnecessary friction.`,
                "Openness/Intellect": `<strong>Practical execution:</strong> Your primary constraint is <span class="synthesis-highlight">${primaryConstraint.displayName} (${this.getOrdinal(primaryConstraint.pct)} percentile)</span>. This results in a reliance on proven, concrete methodologies rather than experimental approaches. Maintaining adaptability requires actively testing new tools and workflows when existing routines become inefficient.`,
                "Openness": `<strong>Practical execution:</strong> Your primary constraint is <span class="synthesis-highlight">${primaryConstraint.displayName} (${this.getOrdinal(primaryConstraint.pct)} percentile)</span>. This results in a reliance on proven, concrete methodologies rather than experimental approaches. Maintaining adaptability requires actively testing new tools and workflows when existing routines become inefficient.`
            };

            const p1 = `${transitionSummary}<br><br>` + (driverDescriptions[primaryDriver.name] || driverDescriptions["Conscientiousness"]) + "<br><br>" + (constraintDescriptions[primaryConstraint.name] || constraintDescriptions["Conscientiousness"]);

            const nCat = (nStat.level === 'very_high' || nStat.level === 'moderate_high') ? 'high' : ((nStat.level === 'very_low' || nStat.level === 'moderate_low') ? 'low' : 'balanced');
            const cCat = (cStat.level === 'very_high' || cStat.level === 'moderate_high') ? 'high' : ((cStat.level === 'very_low' || cStat.level === 'moderate_low') ? 'low' : 'balanced');

            const ncKey = `${nCat}_N_${cCat}_C`;
            const ncInteractions = {
                "high_N_high_C": `<strong>High vigilance, high structure:</strong> Combining your threat sensitivity (<span class="synthesis-highlight">Neuroticism: ${this.getOrdinal(nStat.pct)} percentile</span>) with strict behavioral control (<span class="synthesis-highlight">Conscientiousness: ${this.getOrdinal(cStat.pct)} percentile</span>) creates a heavily managed daily routine. You anticipate disruptions and build extensive contingency plans. This ensures high reliability but requires active monitoring of fatigue to prevent burnout from over-planning.`,
                "high_N_low_C": `<strong>High vigilance, low structure:</strong> Combining your threat sensitivity (<span class="synthesis-highlight">Neuroticism: ${this.getOrdinal(nStat.pct)} percentile</span>) with low behavioral control (<span class="synthesis-highlight">Conscientiousness: ${this.getOrdinal(cStat.pct)} percentile</span>) creates operational friction. You detect stressors quickly but lack automated routines to process them. This requires outsourcing organization to external tools and calendars to prevent task pileup during high-pressure periods.`,
                "low_N_high_C": `<strong>Low vigilance, high structure:</strong> Combining your emotional stability (<span class="synthesis-highlight">Neuroticism: ${this.getOrdinal(nStat.pct)} percentile</span>) with strict behavioral control (<span class="synthesis-highlight">Conscientiousness: ${this.getOrdinal(cStat.pct)} percentile</span>) creates a resilient operating system. You execute complex logistical tasks without experiencing stress spikes. This requires ensuring your adherence to schedules does not create bottlenecks for team members who require flexible workflows.`,
                "low_N_low_C": `<strong>Low vigilance, low structure:</strong> Combining your emotional stability (<span class="synthesis-highlight">Neuroticism: ${this.getOrdinal(nStat.pct)} percentile</span>) with low behavioral control (<span class="synthesis-highlight">Conscientiousness: ${this.getOrdinal(cStat.pct)} percentile</span>) creates a highly reactive routine. You ignore minor disruptions and prefer ad-hoc problem solving. This requires implementing basic task-tracking to ensure critical administrative deadlines are not missed during periods of low urgency.`,
                "high_N_balanced_C": `<strong>High vigilance, moderate structure:</strong> Combining your threat sensitivity (<span class="synthesis-highlight">Neuroticism: ${this.getOrdinal(nStat.pct)} percentile</span>) with standard behavioral control (<span class="synthesis-highlight">Conscientiousness: ${this.getOrdinal(cStat.pct)} percentile</span>) creates a cautious but functional workflow. You anticipate risks accurately and apply just enough planning to mitigate them without overcomplicating the solution.`,
                "low_N_balanced_C": `<strong>Low vigilance, moderate structure:</strong> Combining your emotional stability (<span class="synthesis-highlight">Neuroticism: ${this.getOrdinal(nStat.pct)} percentile</span>) with standard behavioral control (<span class="synthesis-highlight">Conscientiousness: ${this.getOrdinal(cStat.pct)} percentile</span>) creates a pragmatic operational style. You maintain baseline organization and handle environmental friction directly without requiring rigid schedules to stay on track.`,
                "balanced_N_high_C": `<strong>Moderate vigilance, high structure:</strong> Combining baseline threat sensitivity (<span class="synthesis-highlight">Neuroticism: ${this.getOrdinal(nStat.pct)} percentile</span>) with strict behavioral control (<span class="synthesis-highlight">Conscientiousness: ${this.getOrdinal(cStat.pct)} percentile</span>) creates a highly dependable output. You maintain clear operational boundaries and rely on systematic routines to process normal daily stressors efficiently.`,
                "balanced_N_low_C": `<strong>Moderate vigilance, low structure:</strong> Combining baseline threat sensitivity (<span class="synthesis-highlight">Neuroticism: ${this.getOrdinal(nStat.pct)} percentile</span>) with low behavioral control (<span class="synthesis-highlight">Conscientiousness: ${this.getOrdinal(cStat.pct)} percentile</span>) creates an easygoing operational tempo. You process standard daily demands as they arise and pivot easily when external schedules change.`,
                "balanced_N_balanced_C": `<strong>Moderate vigilance, moderate structure:</strong> Combining baseline threat sensitivity (<span class="synthesis-highlight">Neuroticism: ${this.getOrdinal(nStat.pct)} percentile</span>) with standard behavioral control (<span class="synthesis-highlight">Conscientiousness: ${this.getOrdinal(cStat.pct)} percentile</span>) creates a calibrated operational baseline. You scale your organizational efforts directly to the complexity of the task and recover standard operating capacity quickly after disruptions.`
            };

            const p2 = ncInteractions[ncKey] || ncInteractions["balanced_N_balanced_C"];

            const secondaryModulators = domainStats
                .filter(d => d.name !== primaryDriver.name && d.name !== primaryConstraint.name && d.name !== "Neuroticism" && d.name !== "Conscientiousness")
                .map(d => `${d.displayName} (${this.getOrdinal(d.pct)} percentile)`);

            const modText = secondaryModulators.length > 0
                ? `These core metrics are further modulated by your ${secondaryModulators.join(" and ")}.`
                : `These primary forces interact continuously with your remaining traits to establish your baseline.`;

            const p3 = `<strong>System integration:</strong> ${modText} To optimize daily workflows, allocate resources toward your primary driver (<span class="synthesis-highlight">${primaryDriver.displayName}</span>) while relying on automated systems to offset your primary constraint (<span class="synthesis-highlight">${primaryConstraint.displayName}</span>). Auditing these interactions allows you to calibrate schedules, manage interpersonal friction, and maintain baseline operational capacity.`;

            return `
            <div class="synthesis-card">
                <div class="synthesis-header">
                    <h2>Core Profile Synthesis</h2>
                    <span class="synthesis-subtitle">Operational Baseline & Workflow Analysis</span>
                </div>
                <div class="synthesis-body">
                    <p>${p1}</p>
                    <p>${p2}</p>
                    <p>${p3}</p>
                </div>
            </div>`;
        },

        showResults: function (scores) {
            document.getElementById('survey-form').classList.add('hidden');
            document.getElementById('intro-view').classList.add('hidden');
            document.getElementById('results-view').classList.remove('hidden');

            const container = document.getElementById('scores-container');

            const levels = {};
            const domainScores = {};
            const exactZScores = {};

            resultsData.domains.forEach(d => {
                let domainTotal = 0;
                d.aspects.forEach(a => {
                    const s = scores[a] || 0;
                    domainTotal += s;
                    const aZ = calculateZScoreFn(s, a, normativeData);
                    if (aZ < -1.2) levels[a] = 'very_low';
                    else if (aZ < -0.4) levels[a] = 'moderate_low';
                    else if (aZ <= 0.4) levels[a] = 'balanced';
                    else if (aZ <= 1.2) levels[a] = 'moderate_high';
                    else levels[a] = 'very_high';
                });
                domainScores[d.name] = domainTotal;
                const dZ = calculateZScoreFn(domainTotal, d.name, normativeData);
                exactZScores[d.name] = dZ;
                if (dZ < -1.2) levels[d.name] = 'very_low';
                else if (dZ < -0.4) levels[d.name] = 'moderate_low';
                else if (dZ <= 0.4) levels[d.name] = 'balanced';
                else if (dZ <= 1.2) levels[d.name] = 'moderate_high';
                else levels[d.name] = 'very_high';

                const map = { "Extraversion": "E", "Conscientiousness": "C", "Neuroticism": "N", "Agreeableness": "A", "Openness/Intellect": "O" };
                if (map[d.name]) levels[map[d.name]] = levels[d.name];
            });

            const synthesisHTML = this.generateWholeProfileSummary(scores);

            let html = `<div class="results-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; margin-bottom: 24px;">
                <h3 style="margin: 0;">${resultsData.title} (Normative Statistical Model)</h3>
                <button type="button" onclick="app.downloadPDF()" style="padding: 10px 22px; font-size: 0.95em; border-radius: 8px; background: #2c3e50; color: white; border: none; cursor: pointer; font-weight: 700; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 10px rgba(44, 62, 80, 0.2); transition: background 0.2s, transform 0.1s;" data-html2canvas-ignore="true">📄 Download PDF Report</button>
            </div>
            ${synthesisHTML} 
            <h2 class="section-title">1. Your Traits (Normative Percentiles & CIs)</h2>
            <div class="profile-grid">`;

            resultsData.domains.forEach(domainData => {
                const raw = scores[domainData.id] || scores[domainData.name] || 0;
                const z = calculateZScoreFn(raw, domainData.name, normativeData);
                const t = calculateTScoreFn(z);
                const pct = calculatePercentileFn(z);
                const ci = calculateSEMAndCIFn(raw, domainData.name, normativeData);
                const levelKey = levels[domainData.name] || 'balanced';
                const badgeClassMap = {
                    'very_high': 'high',
                    'moderate_high': 'high',
                    'balanced': 'average',
                    'moderate_low': 'low',
                    'very_low': 'low'
                };
                const badgeClass = badgeClassMap[levelKey] || 'average';
                const badgeText = levelKey.replace(/_/g, ' ').toUpperCase();

                html += `
                <div class="domain-summary-card" style="text-align: left; padding: 20px;">
                    <div class="domain-header-simple" style="border-bottom: 1px solid #eee; padding-bottom: 12px; margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                            <h3 style="margin: 0; font-size: 1.25em; color: #2c3e50; line-height: 1.2;">${domainData.name}</h3>
                            <span class="score-badge ${badgeClass}" style="white-space: nowrap; margin-left: 8px;">${badgeText}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: baseline;">
                            <span style="font-size: 1.05em; font-weight: 600; color: #34495e;">${this.getOrdinal(pct)} Percentile</span>
                            <span style="font-size: 0.8em; color: #7f8c8d;">Z = ${z > 0 ? '+' : ''}${z.toFixed(2)} | T = ${t}</span>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <div style="display: flex; justify-content: space-between; font-size: 0.75em; color: #95a5a6; margin-bottom: 4px;">
                            <span>0th</span>
                            <span>50th (Mean)</span>
                            <span>100th</span>
                        </div>
                        <div class="score-bar" style="position: relative; height: 12px; background: #ecf0f1; border-radius: 6px; overflow: visible;">
                            <div style="position: absolute; left: ${ci.ciPctLow}%; width: ${Math.max(2, ci.ciPctHigh - ci.ciPctLow)}%; height: 100%; background: rgba(52, 152, 219, 0.25); border-left: 1px solid #2980b9; border-right: 1px solid #2980b9;" title="95% CI: ${this.getOrdinal(ci.ciPctLow)} - ${this.getOrdinal(ci.ciPctHigh)} Percentile"></div>
                            <div class="score-fill" style="width: ${pct}%; background: ${pct > 88 ? '#e74c3c' : pct > 64 ? '#e67e22' : pct > 35 ? '#2ecc71' : pct > 11 ? '#3498db' : '#9b59b6'}; border-radius: 6px 0 0 6px;"></div>
                            <div style="position: absolute; left: 50%; top: -2px; bottom: -2px; width: 2px; background: #bdc3c7; z-index: 2;" title="Demographic Mean"></div>
                        </div>
                        <div style="font-size: 0.78em; color: #555; margin-top: 8px; display: flex; flex-direction: column; gap: 3px;">
                            <span><strong>Raw:</strong> ${raw}/100</span>
                            <span><strong>95% CI:</strong> ${this.getOrdinal(ci.ciPctLow)}–${this.getOrdinal(ci.ciPctHigh)} Pct (SEM ±${ci.sem})</span>
                        </div>
                    </div>

                    <div class="aspect-breakdown-simple" style="margin-top: 16px; border-top: 1px dashed #e1e8ed; padding-top: 12px;">
                        <div style="font-size: 0.85em; font-weight: bold; color: #34495e; margin-bottom: 10px;">Aspect Breakdown (Normative)</div>
                        ${domainData.aspects.map(aspect => {
                            const aRaw = scores[aspect] || 0;
                            const aZ = calculateZScoreFn(aRaw, aspect, normativeData);
                            const aT = calculateTScoreFn(aZ);
                            const aPct = calculatePercentileFn(aZ);
                            const aCi = calculateSEMAndCIFn(aRaw, aspect, normativeData);
                            return `
                            <div style="margin-bottom: 12px; background: #f8f9fa; padding: 10px; border-radius: 6px; border: 1px solid #f0f2f5;">
                                <div style="display: flex; flex-direction: column; gap: 2px; margin-bottom: 6px;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <strong style="color: #2c3e50; font-size: 0.9em;">${aspect}</strong>
                                        <strong style="color: #34495e; font-size: 0.9em;">${this.getOrdinal(aPct)} Pct</strong>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; font-size: 0.75em; color: #7f8c8d;">
                                        <span>Raw: ${aRaw}/50</span>
                                        <span>Z: ${aZ > 0 ? '+' : ''}${aZ.toFixed(2)} | T: ${aT}</span>
                                    </div>
                                </div>
                                <div class="mini-bar-simple" style="width: 100%; height: 6px; background: #e0e0e0; position: relative; overflow: visible;">
                                    <div style="position: absolute; left: ${aCi.ciPctLow}%; width: ${Math.max(2, aCi.ciPctHigh - aCi.ciPctLow)}%; height: 100%; background: rgba(52, 152, 219, 0.35);"></div>
                                    <div class="mini-fill" style="width: ${aPct}%; background: #3498db; border-radius: 3px;"></div>
                                    <div style="position: absolute; left: 50%; top: -1px; bottom: -1px; width: 1.5px; background: #bdc3c7;"></div>
                                </div>
                                <div style="font-size: 0.72em; color: #7f8c8d; margin-top: 4px; text-align: right;">
                                    95% CI: ${this.getOrdinal(aCi.ciPctLow)}–${this.getOrdinal(aCi.ciPctHigh)}
                                </div>
                            </div>`;
                        }).join('')}
                    </div>
                </div>`;
            });
            html += `</div>`;

            // --- 3. Layer 1: Single Dimensions ---
            html += `<h2 class="section-title" style="margin-top:60px;">2. Behavioral Insights (Deep Dive)</h2>
                     <p class="section-desc">Analysis of your primary traits and their professional implications.</p>
                     <div class="insights-container">`;

            resultsData.domains.forEach(d => {
                const dimKey = d.name.toLowerCase().split('/')[0];
                const lvl = levels[d.name];
                const dRaw = scores[d.id] || scores[d.name] || 0;
                const dPct = calculatePercentileFn(calculateZScoreFn(dRaw, d.name, normativeData));

                if (resultsData.layer_1_single_dimensions[dimKey] && resultsData.layer_1_single_dimensions[dimKey][lvl]) {
                    const insight = resultsData.layer_1_single_dimensions[dimKey][lvl];
                    let textContent = '';
                    if (insight.insight_professional || insight.insight_social_personal || insight.everyday_operational_habits) {
                        textContent += `<div class="layer1-text" style="margin-bottom: 16px;">`;
                        if (insight.insight_professional) {
                            textContent += `
                            <div style="margin-bottom: 12px;">
                                <h4 style="margin: 0 0 4px 0; color: #2c3e50; font-size: 0.95em;">💼 Professional & Crisis Behavior</h4>
                                <p style="margin: 0; color: #444; line-height: 1.5;">${insight.insight_professional}</p>
                            </div>`;
                        }
                        if (insight.insight_social_personal) {
                            textContent += `
                            <div style="margin-bottom: 12px;">
                                <h4 style="margin: 0 0 4px 0; color: #2c3e50; font-size: 0.95em;">🤝 Social & Interpersonal Dynamics</h4>
                                <p style="margin: 0; color: #444; line-height: 1.5;">${insight.insight_social_personal}</p>
                            </div>`;
                        }
                        if (insight.everyday_operational_habits) {
                            textContent += `
                            <div style="margin-bottom: 6px;">
                                <h4 style="margin: 0 0 4px 0; color: #2c3e50; font-size: 0.95em;">⚙️ Everyday Operational Habits</h4>
                                <p style="margin: 0; color: #444; line-height: 1.5;">${insight.everyday_operational_habits}</p>
                            </div>`;
                        }
                        textContent += `</div>`;
                    } else if (insight.insight) {
                        textContent = `<p class="layer1-text">${insight.insight}</p>`;
                    }

                    let devFocusContent = '';
                    if (insight.actionable_insights && Array.isArray(insight.actionable_insights)) {
                        devFocusContent = `<ul style="margin: 6px 0 0 18px; padding: 0; color: #555; line-height: 1.6;">${insight.actionable_insights.map(item => `<li style="margin-bottom: 4px;">${item}</li>`).join('')}</ul>`;
                    } else if (insight.developmental_focus) {
                        devFocusContent = `<ul style="margin: 6px 0 0 18px; padding: 0;"><li>${insight.developmental_focus}</li></ul>`;
                    }

                    html += `
                    <div class="insight-card layer1-card">
                        <div class="insight-header">
                            <h3>${d.name}: ${lvl.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} (${this.getOrdinal(dPct)} Percentile)</h3>
                        </div>
                        ${textContent}
                        <div class="layer1-grid">
                            <div class="l1-box strength">
                                <strong>📈 Key Strength</strong>
                                <p>${insight.key_strength || ''}</p>
                            </div>
                            <div class="l1-box challenge">
                                <strong>⚠️ Potential Challenge</strong>
                                <p>${insight.potential_challenge || ''}</p>
                            </div>
                        </div>
                        ${insight.environmental_preference ? `<p class="env-pref"><strong>🏢 Environment:</strong> ${insight.environmental_preference}</p>` : ''}
                        ${devFocusContent ? `<div class="habits-box" style="margin-top: 14px; background: #fff8e7; border-left: 4px solid #f39c12; padding: 12px 16px; border-radius: 4px;"><strong style="color: #d68910; display: block; margin-bottom: 6px;">🎯 Actionable Interventions & Developmental Focus:</strong>${devFocusContent}</div>` : ''}
                    </div>`;
                }

                d.aspects.forEach(aspectName => {
                    let aspectKey = aspectName.toLowerCase().replace(/[\s/]/g, '_');
                    if (aspectKey === 'openness') aspectKey = 'openness_aspect';
                    const aLvl = levels[aspectName];
                    const aRaw = scores[aspectName] || 0;
                    const aPct = calculatePercentileFn(calculateZScoreFn(aRaw, aspectName, normativeData));

                    if (resultsData.layer_1_single_dimensions[aspectKey] && resultsData.layer_1_single_dimensions[aspectKey][aLvl]) {
                        const insight = resultsData.layer_1_single_dimensions[aspectKey][aLvl];
                        let textContent = '';
                        if (insight.insight_professional || insight.insight_social_personal || insight.everyday_operational_habits) {
                            textContent += `<div class="layer1-text" style="margin-bottom: 16px;">`;
                            if (insight.insight_professional) {
                                textContent += `
                                <div style="margin-bottom: 12px;">
                                    <h4 style="margin: 0 0 4px 0; color: #2c3e50; font-size: 0.95em;">💼 Professional & Crisis Behavior</h4>
                                    <p style="margin: 0; color: #444; line-height: 1.5;">${insight.insight_professional}</p>
                                </div>`;
                            }
                            if (insight.insight_social_personal) {
                                textContent += `
                                <div style="margin-bottom: 12px;">
                                    <h4 style="margin: 0 0 4px 0; color: #2c3e50; font-size: 0.95em;">🤝 Social & Interpersonal Dynamics</h4>
                                    <p style="margin: 0; color: #444; line-height: 1.5;">${insight.insight_social_personal}</p>
                                </div>`;
                            }
                            if (insight.everyday_operational_habits) {
                                textContent += `
                                <div style="margin-bottom: 6px;">
                                    <h4 style="margin: 0 0 4px 0; color: #2c3e50; font-size: 0.95em;">⚙️ Everyday Operational Habits</h4>
                                    <p style="margin: 0; color: #444; line-height: 1.5;">${insight.everyday_operational_habits}</p>
                                </div>`;
                            }
                            textContent += `</div>`;
                        } else if (insight.insight) {
                            textContent = `<p class="layer1-text">${insight.insight}</p>`;
                        }

                        let devFocusContent = '';
                        if (insight.actionable_insights && Array.isArray(insight.actionable_insights)) {
                            devFocusContent = `<ul style="margin: 6px 0 0 18px; padding: 0; color: #555; line-height: 1.6;">${insight.actionable_insights.map(item => `<li style="margin-bottom: 4px;">${item}</li>`).join('')}</ul>`;
                        } else if (insight.developmental_focus) {
                            devFocusContent = `<ul style="margin: 6px 0 0 18px; padding: 0;"><li>${insight.developmental_focus}</li></ul>`;
                        }

                        html += `
                        <div class="insight-card layer1-card" style="margin-left: 20px; border-left: 4px solid #3498db; background: #fafbfc;">
                            <div class="insight-header">
                                <h3 style="font-size: 1.08em; color: #34495e;">↳ Aspect — ${aspectName}: ${aLvl.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} (${this.getOrdinal(aPct)} Percentile)</h3>
                            </div>
                            ${textContent}
                            <div class="layer1-grid">
                                <div class="l1-box strength">
                                    <strong>📈 Key Strength</strong>
                                    <p>${insight.key_strength || ''}</p>
                                </div>
                                <div class="l1-box challenge">
                                    <strong>⚠️ Potential Challenge</strong>
                                    <p>${insight.potential_challenge || ''}</p>
                                </div>
                            </div>
                            ${insight.environmental_preference ? `<p class="env-pref"><strong>🏢 Environment:</strong> ${insight.environmental_preference}</p>` : ''}
                            ${devFocusContent ? `<div class="habits-box" style="margin-top: 14px; background: #fff8e7; border-left: 4px solid #f39c12; padding: 12px 16px; border-radius: 4px;"><strong style="color: #d68910; display: block; margin-bottom: 6px;">🎯 Actionable Interventions & Developmental Focus:</strong>${devFocusContent}</div>` : ''}
                        </div>`;
                    }
                });
            });
            html += `</div>`;

            // --- 4. Layer 2: Intersections ---
            html += `<h2 class="section-title" style="margin-top:60px;">3. Interaction Matrix (Work & Conflict)</h2>
                     <p class="section-desc">How your traits combine to shape your leadership and conflict style.</p>
                     <div class="insights-container">`;

            // 4A. Work & Execution Style (E + C)
            const to3Tier = (l) => l.includes('high') ? 'high' : l.includes('low') ? 'low' : 'average';
            const eLvl = levels["Extraversion"];
            const cLvl = levels["Conscientiousness"];
            const workKeyExact = `E_${eLvl}_C_${cLvl}`;
            const workKey3T = `E_${to3Tier(eLvl)}_C_${to3Tier(cLvl)}`;
            const workObj = resultsData.layer_2_intersections.work_and_execution_style || resultsData.layer_2_intersections.work_style || {};
            let workMatrix = workObj[workKeyExact] || workObj[workKey3T] || workObj.mixed_interaction_fallback;

            if (workMatrix) {
                let insightsHtml = '';
                if (workMatrix.actionable_insights && Array.isArray(workMatrix.actionable_insights)) {
                    insightsHtml = `<ul style="margin: 6px 0 0 18px; padding: 0; color: #555; line-height: 1.6;">${workMatrix.actionable_insights.map(item => `<li style="margin-bottom: 4px;">${item}</li>`).join('')}</ul>`;
                } else if (workMatrix.growth_challenge) {
                    insightsHtml = `<ul style="margin: 6px 0 0 18px; padding: 0;"><li>${workMatrix.growth_challenge}</li></ul>`;
                }

                html += `
                <div class="matrix-card">
                    <div class="matrix-header">
                        <span class="matrix-title">Work & Execution Style</span>
                        <h3>${workMatrix.profile_name}</h3>
                    </div>
                    <p class="matrix-summary">${workMatrix.detailed_analysis || ''}</p>
                    ${workMatrix.social_dynamic ? `<p style="margin-top: 10px;"><strong>🤝 Social Dynamic:</strong> ${workMatrix.social_dynamic}</p>` : ''}
                    ${workMatrix.blindspot_warning ? `<p style="margin-top: 10px;"><strong>⚠️ Blindspot Warning:</strong> ${workMatrix.blindspot_warning}</p>` : ''}
                    ${insightsHtml ? `<div class="advice-box" style="margin-top: 12px;"><strong style="display: block; margin-bottom: 6px;">🌱 Actionable Insights / Growth Challenge:</strong> ${insightsHtml}</div>` : ''}
                </div>`;
            }

            // 4B. Relationship & Conflict Style (A + N)
            const aLvl = levels["Agreeableness"];
            const nLvl = levels["Neuroticism"];
            const conflictKeyExact = `A_${aLvl}_N_${nLvl}`;
            const conflictKey3T = `A_${to3Tier(aLvl)}_N_${to3Tier(nLvl)}`;
            const conflictObj = resultsData.layer_2_intersections.relationship_and_conflict_style || resultsData.layer_2_intersections.conflict_style || {};
            let conflictMatrix = conflictObj[conflictKeyExact] || conflictObj[conflictKey3T] || conflictObj.mixed_interaction_fallback;

            if (conflictMatrix) {
                let insightsHtml = '';
                if (conflictMatrix.actionable_insights && Array.isArray(conflictMatrix.actionable_insights)) {
                    insightsHtml = `<ul style="margin: 6px 0 0 18px; padding: 0; color: #555; line-height: 1.6;">${conflictMatrix.actionable_insights.map(item => `<li style="margin-bottom: 4px;">${item}</li>`).join('')}</ul>`;
                } else if (conflictMatrix.advice) {
                    insightsHtml = `<ul style="margin: 6px 0 0 18px; padding: 0;"><li>${conflictMatrix.advice}</li></ul>`;
                }

                html += `
                 <div class="matrix-card">
                     <div class="matrix-header">
                         <span class="matrix-title">Relationship & Conflict Style</span>
                         <h3>${conflictMatrix.profile_name}</h3>
                     </div>
                     <p class="matrix-summary">${conflictMatrix.conflict_tactic || ''}</p>
                     ${insightsHtml ? `<div class="advice-box" style="margin-top: 12px;"><strong style="display: block; margin-bottom: 6px;">💡 Actionable Insights / Professional Advice:</strong> ${insightsHtml}</div>` : ''}
                 </div>`;
            }

            html += `</div>`;

            container.innerHTML = html;
            window.scrollTo(0, 0);
        },

        downloadPDF: function () {
            window.print();
        },

        debugFill: function () {
            if (!this.surveyItems || !this.surveyItems.length) {
                this.randomizeAndPrepareItems();
            }
            this.surveyItems.forEach((item, idx) => {
                this.userAnswers[idx] = item.type === 'control' ? item.target : Math.floor(Math.random() * 5) + 1;
            });
            this.renderQuestions();
            this.submitSurvey(true);
        }
    };

    // Bind app to window immediately
    window.app = {
        startSurvey: () => app.startSurvey(),
        debugFill: () => app.debugFill(),
        previousPage: () => app.previousPage(),
        nextPage: () => app.nextPage(),
        submitSurvey: (isDebug) => app.submitSurvey(isDebug),
        downloadPDF: () => app.downloadPDF()
    };

    app.init();
})();
