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

            const driverDescriptions = {
                "Conscientiousness": `Your entire profile is powered by an exceptional demand for structure (<span class="synthesis-highlight">${primaryDriver.displayName}: ${this.getOrdinal(primaryDriver.pct)} percentile</span>).`,
                "Extraversion": `Your entire profile is powered by high social energy (<span class="synthesis-highlight">${primaryDriver.displayName}: ${this.getOrdinal(primaryDriver.pct)} percentile</span>).`,
                "Neuroticism": `Your entire profile is governed by heightened emotional attunement (<span class="synthesis-highlight">${primaryDriver.displayName}: ${this.getOrdinal(primaryDriver.pct)} percentile</span>).`,
                "Agreeableness": `Your entire profile is centered around interpersonal harmony (<span class="synthesis-highlight">${primaryDriver.displayName}: ${this.getOrdinal(primaryDriver.pct)} percentile</span>).`,
                "Openness/Intellect": `Your entire profile is propelled by intellectual curiosity (<span class="synthesis-highlight">${primaryDriver.displayName}: ${this.getOrdinal(primaryDriver.pct)} percentile</span>).`,
                "Openness": `Your entire profile is propelled by intellectual curiosity (<span class="synthesis-highlight">${primaryDriver.displayName}: ${this.getOrdinal(primaryDriver.pct)} percentile</span>).`
            };

            const constraintDescriptions = {
                "Conscientiousness": `Conversely, your primary constraint lies in <span class="synthesis-highlight">${primaryConstraint.displayName} (${this.getOrdinal(primaryConstraint.pct)} percentile)</span>.`,
                "Extraversion": `Conversely, your primary constraint lies in <span class="synthesis-highlight">${primaryConstraint.displayName} (${this.getOrdinal(primaryConstraint.pct)} percentile)</span>.`,
                "Neuroticism": `Conversely, your primary constraint lies in <span class="synthesis-highlight">${primaryConstraint.displayName} (${this.getOrdinal(primaryConstraint.pct)} percentile)</span>.`,
                "Agreeableness": `Conversely, your primary constraint lies in <span class="synthesis-highlight">${primaryConstraint.displayName} (${this.getOrdinal(primaryConstraint.pct)} percentile)</span>.`,
                "Openness/Intellect": `Conversely, your primary constraint lies in <span class="synthesis-highlight">${primaryConstraint.displayName} (${this.getOrdinal(primaryConstraint.pct)} percentile)</span>.`,
                "Openness": `Conversely, your primary constraint lies in <span class="synthesis-highlight">${primaryConstraint.displayName} (${this.getOrdinal(primaryConstraint.pct)} percentile)</span>.`
            };

            const p1 = (driverDescriptions[primaryDriver.name] || driverDescriptions["Conscientiousness"]) + " " + (constraintDescriptions[primaryConstraint.name] || constraintDescriptions["Conscientiousness"]);

            return `
            <div class="synthesis-card">
                <div class="synthesis-header">
                    <h2>Core Profile Synthesis</h2>
                    <span class="synthesis-subtitle">Holistic Trait Configuration & Life Management Analysis</span>
                </div>
                <div class="synthesis-body">
                    <p>${p1}</p>
                </div>
            </div>`;
        },

        showResults: function (scores) {
            document.getElementById('survey-form').classList.add('hidden');
            document.getElementById('intro-view').classList.add('hidden');
            document.getElementById('results-view').classList.remove('hidden');

            const container = document.getElementById('scores-container');
            const levels = {};

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
                const dZ = calculateZScoreFn(domainTotal, d.name, normativeData);
                if (dZ < -1.2) levels[d.name] = 'very_low';
                else if (dZ < -0.4) levels[d.name] = 'moderate_low';
                else if (dZ <= 0.4) levels[d.name] = 'balanced';
                else if (dZ <= 1.2) levels[d.name] = 'moderate_high';
                else levels[d.name] = 'very_high';
            });

            const synthesisHTML = this.generateWholeProfileSummary(scores);

            let html = `
            <div class="results-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h3>${resultsData.title}</h3>
                <button type="button" onclick="app.downloadPDF()">📄 Download PDF Report</button>
            </div>
            ${synthesisHTML}
            <h2 class="section-title">1. Your Traits</h2>
            <div class="profile-grid">`;

            resultsData.domains.forEach(domainData => {
                const raw = scores[domainData.id] || scores[domainData.name] || 0;
                const z = calculateZScoreFn(raw, domainData.name, normativeData);
                const t = calculateTScoreFn(z);
                const pct = calculatePercentileFn(z);
                const ci = calculateSEMAndCIFn(raw, domainData.name, normativeData);

                html += `
                <div class="domain-summary-card">
                    <h3>${domainData.name}</h3>
                    <p><strong>${this.getOrdinal(pct)} Percentile</strong> (Z = ${z.toFixed(2)} | T = ${t})</p>
                    <p>Raw: ${raw} | 95% CI: ${this.getOrdinal(ci.ciPctLow)}–${this.getOrdinal(ci.ciPctHigh)} Pct</p>
                </div>`;
            });
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
