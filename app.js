// Mock demographic normative dataset (Means & SDs for 10 BFAS Aspects and 5 Domains)
// Based on a baseline demographic sample where aspect raw scores range from 10 to 50
const normativeData = {
    aspects: {
        "Volatility": { mean: 29.3, sd: 7.2, reliability: 0.89 },
        "Withdrawal": { mean: 30.0, sd: 6.2, reliability: 0.87 },
        "Compassion": { mean: 39.9, sd: 5.4, reliability: 0.84 },
        "Politeness": { mean: 36.3, sd: 5.3, reliability: 0.81 },
        "Industriousness": { mean: 31.7, sd: 5.5, reliability: 0.86 },
        "Orderliness": { mean: 33.8, sd: 6.1, reliability: 0.85 },
        "Enthusiasm": { mean: 36.2, sd: 6.3, reliability: 0.85 },
        "Assertiveness": { mean: 33.5, sd: 6.6, reliability: 0.88 },
        "Intellect": { mean: 35.6, sd: 6.0, reliability: 0.84 },
        "Openness": { mean: 38.0, sd: 5.5, reliability: 0.84 }
    },
    domains: {
        "Neuroticism": { mean: 59.3, sd: 11.9, reliability: 0.90 },
        "Agreeableness": { mean: 76.2, sd: 9.0, reliability: 0.87 },
        "Conscientiousness": { mean: 65.5, sd: 9.9, reliability: 0.89 },
        "Extraversion": { mean: 69.7, sd: 11.0, reliability: 0.91 },
        "Openness/Intellect": { mean: 73.6, sd: 9.5, reliability: 0.87 }
    }
};

// Pluggable Response Validity Engine (Structurally similar to Price Guard's modular variance architecture)
const ResponseValidityEngine = {
    config: {
        windowSize: 15,
        minVarianceThreshold: 0.15,
        minLatencySeconds: 240 // 4 minutes
    },
    rules: [],

    /**
     * Register a pluggable validation rule strategy
     */
    registerRule: function (name, evaluateFn, description) {
        this.rules.push({ name, evaluate: evaluateFn, description });
    },

    /**
     * Calculate sample variance across a numerical array slice
     */
    calculateVariance: function (arr) {
        if (!arr || arr.length <= 1) return 0;
        const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
        const sumSquares = arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
        return sumSquares / (arr.length - 1);
    },

    /**
     * Audit response dataset against all registered validity rules
     */
    audit: function (responses, context = {}) {
        const errors = [];
        for (const rule of this.rules) {
            const result = rule.evaluate(responses, context, this.config);
            if (!result.isValid) {
                errors.push({
                    ruleName: rule.name,
                    message: result.message
                });
            }
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
};

// Register Rule 1: Sliding-Window Straight-Lining Detector
ResponseValidityEngine.registerRule(
    "sliding_window_straight_lining",
    function (responses, context, config) {
        if (context.isDebug) return { isValid: true }; // Bypass straight-lining audit during automated debug testing
        const { windowSize, minVarianceThreshold } = config;
        const validResponses = responses.filter(r => typeof r === 'number' && !isNaN(r));
        
        if (validResponses.length < windowSize) {
            return { isValid: true };
        }

        for (let i = 0; i <= validResponses.length - windowSize; i++) {
            const windowSlice = validResponses.slice(i, i + windowSize);
            const variance = ResponseValidityEngine.calculateVariance(windowSlice);
            
            if (variance < minVarianceThreshold) {
                return {
                    isValid: false,
                    message: `Response Straight-Lining Detected: Answers across consecutive items #${i + 1} to #${i + windowSize} exhibited abnormally low variance (${variance.toFixed(3)} < minimum threshold ${minVarianceThreshold}). Please review this block and answer authentically.`
                };
            }
        }
        return { isValid: true };
    },
    "Sliding-window variance check to detect consecutive straight-lining"
);

// Register Rule 2: Cognitive Latency Tracker
ResponseValidityEngine.registerRule(
    "cognitive_latency_check",
    function (responses, context, config) {
        if (context.isDebug) return { isValid: true }; // Bypass latency audit during automated testing
        if (!context.startTimestamp || !context.submitTimestamp) {
            return { isValid: true };
        }

        const elapsedSeconds = (context.submitTimestamp - context.startTimestamp) / 1000;
        const { minLatencySeconds } = config;

        if (elapsedSeconds < minLatencySeconds) {
            const elapsedMinutes = (elapsedSeconds / 60).toFixed(2);
            const requiredMinutes = (minLatencySeconds / 60).toFixed(0);
            return {
                isValid: false,
                message: `Cognitive Latency Protocol Failed: Assessment completed in only ${elapsedMinutes} minutes. A minimum processing duration of ${requiredMinutes} minutes (240 seconds) is required to thoughtfully evaluate all statements.`
            };
        }
        return { isValid: true };
    },
    "Minimum response latency check (4 minutes) for cognitive validity"
);

// Register Rule 3: Impression Management Detector
ResponseValidityEngine.registerRule(
    "impression_management_detector",
    function (responses, context, config) {
        if (context.isDebug || !context.surveyItems) return { isValid: true };

        let validityScore = 0;
        let validityCount = 0;

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

        const meanScore = validityScore / validityCount;
        const threshold = 4.2; // 84% maximum possible score on a 1-5 scale

        if (meanScore >= threshold) {
            return {
                isValid: false,
                message: `Impression Management Detected: Responses to social desirability items indicate a statistically improbable pattern of highly favorable self-reporting. Please review your answers to ensure baseline authenticity.`
            };
        }
        return { isValid: true };
    },
    "Detects improbable patterns of socially desirable responding"
);

// Application Logic
const app = {
    surveyItems: [],
    userAnswers: [],
    currentPage: 0,
    pageSize: 20,

    init: function () {
        this.randomizeAndPrepareItems();
        this.renderQuestions();
        this.startTimestamp = null;
        this.submitTimestamp = null;
        // Ensure correct view state
        document.getElementById('intro-view').classList.remove('hidden');
        document.getElementById('survey-form').classList.add('hidden');
        document.getElementById('results-view').classList.add('hidden');
    },

    /**
     * Randomizes survey items while ensuring control items are evenly distributed across the array
     */
    randomizeAndPrepareItems: function () {
        const items = surveyStructure.items || [];
        const controlItems = items.filter(item => item.type === 'control');
        const normalItems = items.filter(item => item.type !== 'control');

        // Fisher-Yates shuffle on normal items
        const shuffledNormal = [...normalItems];
        for (let i = shuffledNormal.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledNormal[i], shuffledNormal[j]] = [shuffledNormal[j], shuffledNormal[i]];
        }

        // Shuffle control items so order of target 1 and target 4 varies
        const shuffledControls = [...controlItems];
        for (let i = shuffledControls.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledControls[i], shuffledControls[j]] = [shuffledControls[j], shuffledControls[i]];
        }

        // Evenly distribute control items across the shuffled array
        // E.g., for 2 control items and ~103 normal items, insert around ~1/3 and ~2/3 positions plus small jitter
        const combined = [...shuffledNormal];
        shuffledControls.forEach((ctrl, idx) => {
            const targetFraction = (idx + 1) / (shuffledControls.length + 1);
            const baseIndex = Math.round(combined.length * targetFraction);
            const jitter = Math.floor(Math.random() * 7) - 3; // Jitter between -3 and +3
            const insertIdx = Math.max(0, Math.min(combined.length, baseIndex + jitter));
            combined.splice(insertIdx, 0, ctrl);
        });

        this.surveyItems = combined;
        this.userAnswers = new Array(this.surveyItems.length).fill(null);
        this.currentPage = 0;
    },

    startSurvey: function () {
        this.randomizeAndPrepareItems();
        this.startTimestamp = Date.now();
        document.getElementById('intro-view').classList.add('hidden');
        document.getElementById('survey-form').classList.remove('hidden');
        this.renderQuestions();
        window.scrollTo(0, 0);
    },

    /**
     * Saves user selections on the currently displayed page to the state array
     */
    saveCurrentPageAnswers: function () {
        const startIdx = this.currentPage * this.pageSize;
        const endIdx = Math.min(startIdx + this.pageSize, this.surveyItems.length);

        for (let i = startIdx; i < endIdx; i++) {
            const selected = document.querySelector(`input[name="q${i}"]:checked`);
            if (selected) {
                this.userAnswers[i] = parseInt(selected.value);
            }
        }
    },

    nextPage: function () {
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
        const container = document.getElementById('questions-container');
        if (!container || !this.surveyItems || !this.surveyItems.length) return;

        const startIdx = this.currentPage * this.pageSize;
        const endIdx = Math.min(startIdx + this.pageSize, this.surveyItems.length);
        let html = '';

        for (let i = startIdx; i < endIdx; i++) {
            const item = this.surveyItems[i];
            const savedValue = this.userAnswers[i];

            html += `
                <div class="question-item" data-index="${i}" data-type="${item.type || 'normal'}">
                    <span class="question-text">${i + 1}. ${item.text}</span>
                    <div class="options-container">
                        ${(surveyStructure.scaleOptions || surveyStructure.scale).map(opt => `
                            <label class="option-label">
                                <input type="radio" name="q${i}" value="${opt.value}" ${savedValue === opt.value ? 'checked' : ''} required>
                                <span>${opt.label}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        container.innerHTML = html;
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
            html += `<button type="submit" class="btn primary">Submit Survey</button>`;
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

        // 1. Check completeness
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

        // 2. Control Item Attention Check
        let attentionFailed = false;
        this.surveyItems.forEach((item, idx) => {
            if (item.type === 'control') {
                if (this.userAnswers[idx] !== item.target) {
                    attentionFailed = true;
                }
            }
        });

        if (attentionFailed && !isDebug) {
            alert("Attention Check Failed: One or more validity verification statements were answered incorrectly. Please carefully review the items and ensure your responses accurately reflect your intent.");
            return;
        }

        // 3. Response Validity Engine Audit
        const auditResult = ResponseValidityEngine.audit(this.userAnswers, {
            startTimestamp: this.startTimestamp,
            submitTimestamp: this.submitTimestamp,
            isDebug: isDebug,
            surveyItems: this.surveyItems
        });

        if (!auditResult.isValid && !isDebug) {
            const errorMessages = auditResult.errors.map(e => `• [${e.ruleName}] ${e.message}`).join('\n\n');
            alert(`Assessment Validity Protocol Notice:\n\n${errorMessages}\n\nPlease review your responses to ensure accurate evaluation.`);
            return;
        }

        // 4. Score Calculation
        const rawScores = {};
        const domainAspectCounts = {};

        // Initialize scoring buckets
        resultsData.domains.forEach(domain => {
            rawScores[domain.id] = 0;
            rawScores[domain.name] = 0;
            domainAspectCounts[domain.name] = {};
            domain.aspects.forEach(aspect => {
                rawScores[aspect] = 0;
            });
        });

        // Tabulate scores
        this.surveyItems.forEach((item, idx) => {
            if (item.type === 'control') return;

            const val = parseInt(this.userAnswers[idx]);
            if (isNaN(val)) return;

            // Reverse scoring if applicable (assuming 1-5 Likert scale: 6 - value)
            const scoredVal = item.reverse ? (6 - val) : val;

            // Add to domain
            if (item.domain && rawScores.hasOwnProperty(item.domain)) {
                rawScores[item.domain] += scoredVal;
            }

            // Add to aspect
            if (item.aspect && rawScores.hasOwnProperty(item.aspect)) {
                rawScores[item.aspect] += scoredVal;
            }
        });

        this.showResults(rawScores);
    },

    /**
     * Converts a raw score into a Z-score using normative dataset parameters.
     */
    calculateZScore: function (rawScore, key) {
        const norm = normativeData.aspects[key] || normativeData.domains[key];
        if (!norm || !norm.sd) return 0;
        return (rawScore - norm.mean) / norm.sd;
    },

    /**
     * Translates a Z-score into a standardized T-score (Mean = 50, SD = 10).
     */
    calculateTScore: function (zScore) {
        return Math.round((50 + (zScore * 10)) * 10) / 10;
    },

    /**
     * Translates a Z-score into a percentile ranking (1 to 99) using normal CDF approximation.
     */
    calculatePercentile: function (zScore) {
        if (zScore === 0) return 50;
        const sign = zScore < 0 ? -1 : 1;
        const absZ = Math.abs(zScore) / Math.sqrt(2);

        // Abramowitz and Stegun approximation (Formula 7.1.26)
        const a1 = 0.254829592;
        const a2 = -0.284496736;
        const a3 = 1.421413741;
        const a4 = -1.453152027;
        const a5 = 1.061405429;
        const p = 0.3275911;

        const t = 1.0 / (1.0 + p * absZ);
        const erf = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absZ * absZ);
        const cdf = 0.5 * (1.0 + sign * erf);

        let percentile = Math.round(cdf * 100);
        if (percentile <= 0) percentile = 1;
        if (percentile >= 100) percentile = 99;
        return percentile;
    },

    getOrdinal: function(n) {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    },

    /**
     * Calculates Standard Error of Measurement (SEM) and a 95% Confidence Interval in percentiles.
     */
    calculateSEMAndCI: function (rawScore, key) {
        const norm = normativeData.aspects[key] || normativeData.domains[key];
        if (!norm) return { sem: 0, ciRawLow: rawScore, ciRawHigh: rawScore, ciPctLow: 50, ciPctHigh: 50 };

        const reliability = norm.reliability || 0.84;
        const sem = norm.sd * Math.sqrt(1 - reliability);
        
        // 95% Confidence interval in raw score points (1.96 * SEM)
        const marginRaw = 1.96 * sem;
        const ciRawLow = Math.max(0, Math.round((rawScore - marginRaw) * 10) / 10);
        const ciRawHigh = Math.round((rawScore + marginRaw) * 10) / 10;

        // Convert raw CI bounds to Z and then Percentile ranking
        const zLow = (ciRawLow - norm.mean) / norm.sd;
        const zHigh = (ciRawHigh - norm.mean) / norm.sd;
        const ciPctLow = this.calculatePercentile(zLow);
        const ciPctHigh = this.calculatePercentile(zHigh);

        return {
            sem: Math.round(sem * 10) / 10,
            ciRawLow,
            ciRawHigh,
            ciPctLow,
            ciPctHigh
        };
    },

    /**
     * Whole-Profile Synthesis Engine
     * Analyzes the entire trait configuration together across overall life management, personal habits,
     * relationship dynamics, and professional execution.
     */
    generateWholeProfileSummary: function (scores) {
        if (!scores || !resultsData || !resultsData.domains) return '';

        const getLevel = (z) => {
            if (z < -1.2) return 'very_low';
            if (z < -0.4) return 'moderate_low';
            if (z <= 0.4) return 'balanced';
            if (z <= 1.2) return 'moderate_high';
            return 'very_high';
        };

        // Gather statistics for all 5 domains
        const domainStats = resultsData.domains.map(d => {
            const raw = scores[d.id] || scores[d.name] || 0;
            const z = this.calculateZScore(raw, d.name);
            const pct = this.calculatePercentile(z);
            const level = getLevel(z);
            const displayName = d.name === "Openness/Intellect" ? "Openness / Intellect" : d.name;
            return {
                id: d.id,
                name: d.name,
                displayName: displayName,
                raw,
                z,
                pct,
                level
            };
        });

        // Sort by percentile descending to find Primary Driver and Primary Constraint
        const sorted = [...domainStats].sort((a, b) => b.pct - a.pct);
        const primaryDriver = sorted[0];
        const primaryConstraint = sorted[sorted.length - 1];

        // Specific lookups for Neuroticism and Conscientiousness
        const nStat = domainStats.find(d => d.name === "Neuroticism") || { pct: 50, level: 'balanced', displayName: 'Neuroticism' };
        const cStat = domainStats.find(d => d.name === "Conscientiousness") || { pct: 50, level: 'balanced', displayName: 'Conscientiousness' };

        // --- Paragraph 1: Primary Driver & Constraint (Life Management & Operational Foundation) ---
        const driverDescriptions = {
            "Conscientiousness": `Your entire profile is powered by an exceptional demand for structure, self-discipline, and rigorous execution (<span class="synthesis-highlight">${primaryDriver.displayName}: ${this.getOrdinal(primaryDriver.pct)} percentile</span>). This acts as your primary operational driver across overall life management, compelling you to organize complex household logistics, uphold zero-defect standards in your career, and systematically eliminate uncertainty across daily habits and relationship planning.`,
            "Extraversion": `Your entire profile is powered by high social energy, assertiveness, and a drive for engagement and influence (<span class="synthesis-highlight">${primaryDriver.displayName}: ${this.getOrdinal(primaryDriver.pct)} percentile</span>). This acts as your primary operational driver across overall life management, propelling you to naturally take charge of social calendars, rally collective momentum, and inject dynamic enthusiasm into professional environments and personal relationships alike.`,
            "Neuroticism": `Your entire profile is governed by heightened emotional attunement and acute situational vigilance (<span class="synthesis-highlight">${primaryDriver.displayName}: ${this.getOrdinal(primaryDriver.pct)} percentile</span>). This acts as your primary operational driver across overall life management, equipping you with an extraordinary sensitivity to interpersonal nuance, emotional climate shifts, and systemic risks across your workplace, family, and daily routines.`,
            "Agreeableness": `Your entire profile is centered around interpersonal harmony, empathy, and deep collaborative cohesion (<span class="synthesis-highlight">${primaryDriver.displayName}: ${this.getOrdinal(primaryDriver.pct)} percentile</span>). This acts as your primary operational driver across overall life management, motivating you to build profound psychological safety, nurture strong personal bonds, and resolve conflicts diplomatically across your household, social circles, and workplace.`,
            "Openness/Intellect": `Your entire profile is propelled by insatiable intellectual curiosity, conceptual exploration, and aesthetic sensitivity (<span class="synthesis-highlight">${primaryDriver.displayName}: ${this.getOrdinal(primaryDriver.pct)} percentile</span>). This acts as your primary operational driver across overall life management, driving you to continuously seek novelty, challenge conventional lifestyle routines, and pioneer innovative problem-solving in both your professional pursuits and personal world.`,
            "Openness": `Your entire profile is propelled by insatiable intellectual curiosity, conceptual exploration, and aesthetic sensitivity (<span class="synthesis-highlight">${primaryDriver.displayName}: ${this.getOrdinal(primaryDriver.pct)} percentile</span>). This acts as your primary operational driver across overall life management, driving you to continuously seek novelty, challenge conventional lifestyle routines, and pioneer innovative problem-solving in both your professional pursuits and personal world.`
        };

        const constraintDescriptions = {
            "Conscientiousness": `Conversely, your primary constraint lies in <span class="synthesis-highlight">${primaryConstraint.displayName} (${this.getOrdinal(primaryConstraint.pct)} percentile)</span>, manifesting as a strong preference for improvisation and a resistance to rigid routines or tedious administrative upkeep. While this grants you high adaptability in daily life and spontaneous situations, it requires you to build external accountability structures to manage long-term personal maintenance and household logistics without burnout.`,
            "Extraversion": `Conversely, your primary constraint lies in <span class="synthesis-highlight">${primaryConstraint.displayName} (${this.getOrdinal(primaryConstraint.pct)} percentile)</span>, reflecting deep social reserve, self-containment, and sensitivity to overstimulation. Because intense gatherings and continuous social demands drain your energy battery, protecting intentional quiet intervals and solitary recharge routines is vital for sustaining personal well-being and relational balance.`,
            "Neuroticism": `Conversely, your primary constraint lies in <span class="synthesis-highlight">${primaryConstraint.displayName} (${this.getOrdinal(primaryConstraint.pct)} percentile)</span>, where extreme emotional detachment and stoicism can create a blind spot in personal relationships. While your unflappable composure under crisis is invaluable, you must consciously practice active emotional mirroring to ensure loved ones and partners feel heard and validated rather than approached purely as logistical puzzles.`,
            "Agreeableness": `Conversely, your primary constraint lies in <span class="synthesis-highlight">${primaryConstraint.displayName} (${this.getOrdinal(primaryConstraint.pct)} percentile)</span>, reflecting a blunt, fiercely objective interpersonal style that prioritizes utility over social comfort. While this unvarnished candor accelerates problem-solving and filters out groupthink, calibrating your tone during relationship conflicts and sensitive discussions is crucial to preserve trust and intimacy.`,
            "Openness/Intellect": `Conversely, your primary constraint lies in <span class="synthesis-highlight">${primaryConstraint.displayName} (${this.getOrdinal(primaryConstraint.pct)} percentile)</span>, grounding your lifestyle firmly in concrete realities, familiar traditions, and proven practical routines. While this ensures rock-solid dependability and functional simplicity in your daily habits, you must actively guard against dismissing novel experiences or unconventional perspectives when partners or peers suggest them.`,
            "Openness": `Conversely, your primary constraint lies in <span class="synthesis-highlight">${primaryConstraint.displayName} (${this.getOrdinal(primaryConstraint.pct)} percentile)</span>, grounding your lifestyle firmly in concrete realities, familiar traditions, and proven practical routines. While this ensures rock-solid dependability and functional simplicity in your daily habits, you must actively guard against dismissing novel experiences or unconventional perspectives when partners or peers suggest them.`
        };

        const p1 = (driverDescriptions[primaryDriver.name] || driverDescriptions["Conscientiousness"]) + " " + (constraintDescriptions[primaryConstraint.name] || constraintDescriptions["Conscientiousness"]);

        // --- Paragraph 2: Neuroticism & Conscientiousness Regulative Triad (Habits, Relationships & Stress) ---
        const nCat = (nStat.level === 'very_high' || nStat.level === 'moderate_high') ? 'high' : ((nStat.level === 'very_low' || nStat.level === 'moderate_low') ? 'low' : 'balanced');
        const cCat = (cStat.level === 'very_high' || cStat.level === 'moderate_high') ? 'high' : ((cStat.level === 'very_low' || cStat.level === 'moderate_low') ? 'low' : 'balanced');

        const ncKey = `${nCat}_N_${cCat}_C`;
        const ncInteractions = {
            "high_N_high_C": `Evaluating the critical interaction between your emotional reactivity (<span class="synthesis-highlight">Neuroticism: ${this.getOrdinal(nStat.pct)} percentile</span>) and regulative control (<span class="synthesis-highlight">Conscientiousness: ${this.getOrdinal(cStat.pct)} percentile</span>) reveals a structured, high-vigilance dynamic across your personal habits and relationships. Your sensitivity to potential disruption is paired with ironclad self-discipline, driving you to maintain immaculate environments, strict schedules, and proactive contingency plans. While this ensures exceptional reliability in daily life and household management, it can generate internal exhaustion and difficulty truly relaxing until every variable is controlled.`,
            "high_N_low_C": `Evaluating the critical interaction between your emotional reactivity (<span class="synthesis-highlight">Neuroticism: ${this.getOrdinal(nStat.pct)} percentile</span>) and regulative control (<span class="synthesis-highlight">Conscientiousness: ${this.getOrdinal(cStat.pct)} percentile</span>) reveals significant friction between stress awareness and daily routines. You experience deep emotional attunement and sensitivity to pressure, yet operate with a spontaneous, unstructured lifestyle. During busy periods or interpersonal conflicts, the absence of rigid self-regulatory habits can amplify emotional distress—making automated maintenance tools and supportive external routines essential for daily peace.`,
            "low_N_high_C": `Evaluating the critical interaction between your emotional reactivity (<span class="synthesis-highlight">Neuroticism: ${this.getOrdinal(nStat.pct)} percentile</span>) and regulative control (<span class="synthesis-highlight">Conscientiousness: ${this.getOrdinal(cStat.pct)} percentile</span>) reveals one of the most resilient, steady-state configurations across life management and relationships. Your emotional stoicism combined with disciplined follow-through allows you to manage complex household logistics, career demands, and long-term personal goals with zero panic or burnout. You navigate daily disruptions with calm authority, though you must ensure your high standard of order does not translate into impatience with less structured loved ones.`,
            "low_N_low_C": `Evaluating the critical interaction between your emotional reactivity (<span class="synthesis-highlight">Neuroticism: ${this.getOrdinal(nStat.pct)} percentile</span>) and regulative control (<span class="synthesis-highlight">Conscientiousness: ${this.getOrdinal(cStat.pct)} percentile</span>) reveals a uniquely relaxed, laid-back, and highly improvisational approach to life management. Because you rarely get rattled by emergencies and prefer ad-hoc schedules, you adapt effortlessly to unexpected disruptions and maintain a low-stress, lived-in home environment. However, this supreme composure and aversion to rigid organization require simple habits like the '2-minute rule' to keep life administration from piling up.`,
            "high_N_balanced_C": `Evaluating the critical interaction between your emotional reactivity (<span class="synthesis-highlight">Neuroticism: ${this.getOrdinal(nStat.pct)} percentile</span>) and regulative control (<span class="synthesis-highlight">Conscientiousness: ${this.getOrdinal(cStat.pct)} percentile</span>) demonstrates a conscientious, threat-aware personal balance. Your heightened emotional nuance and stress sensitivity are moderated by functional organizational routines, allowing you to prepare thoroughly for major life events and maintain orderly habits without succumbing to inflexible perfectionism.`,
            "low_N_balanced_C": `Evaluating the critical interaction between your emotional reactivity (<span class="synthesis-highlight">Neuroticism: ${this.getOrdinal(nStat.pct)} percentile</span>) and regulative control (<span class="synthesis-highlight">Conscientiousness: ${this.getOrdinal(cStat.pct)} percentile</span>) demonstrates a steady, pragmatic, and well-grounded lifestyle. You handle personal stress, household friction, and schedule changes with admirable composure, applying just enough organizational structure to keep your daily life running smoothly without unnecessary rigidity.`,
            "balanced_N_high_C": `Evaluating the critical interaction between your emotional reactivity (<span class="synthesis-highlight">Neuroticism: ${this.getOrdinal(nStat.pct)} percentile</span>) and regulative control (<span class="synthesis-highlight">Conscientiousness: ${this.getOrdinal(cStat.pct)} percentile</span>) reveals a disciplined, reliable, and emotionally stable approach to daily living. You experience normal emotional empathy in relationships while relying on strong personal discipline and structured routines to keep household and career responsibilities firmly on track.`,
            "balanced_N_low_C": `Evaluating the critical interaction between your emotional reactivity (<span class="synthesis-highlight">Neuroticism: ${this.getOrdinal(nStat.pct)} percentile</span>) and regulative control (<span class="synthesis-highlight">Conscientiousness: ${this.getOrdinal(cStat.pct)} percentile</span>) reflects an adaptable, easygoing lifestyle. Your healthy emotional equilibrium pairs with a preference for flexibility, allowing you to go with the flow during vacations, social gatherings, and daily disruptions without stressing over strict plans or minor administrative delays.`,
            "balanced_N_balanced_C": `Evaluating the critical interaction between your emotional reactivity (<span class="synthesis-highlight">Neuroticism: ${this.getOrdinal(nStat.pct)} percentile</span>) and regulative control (<span class="synthesis-highlight">Conscientiousness: ${this.getOrdinal(cStat.pct)} percentile</span>) demonstrates a healthy, well-calibrated equilibrium across life management. You adjust your routines, discipline, and emotional vigilance directly to what your situation demands—mobilizing structure when handling important life milestones while recovering your composure easily during personal downtime.`
        };

        const p2 = ncInteractions[ncKey] || ncInteractions["balanced_N_balanced_C"];

        // --- Paragraph 3: Holistic Real-World Synthesis Across Life Management & Relationships ---
        const secondaryModulators = domainStats
            .filter(d => d.name !== primaryDriver.name && d.name !== primaryConstraint.name && d.name !== "Neuroticism" && d.name !== "Conscientiousness")
            .map(d => `${d.displayName} (${this.getOrdinal(d.pct)} percentile)`);

        const modText = secondaryModulators.length > 0
            ? `Across overall life management, personal habits, relationship dynamics, and workplace collaboration, this core dynamic is further modulated by your ${secondaryModulators.join(" and ")}.`
            : `Across overall life management, personal habits, relationship dynamics, and workplace collaboration, these primary forces interact continuously with your remaining traits.`;

        const p3 = `${modText} To maximize your holistic fulfillment, consciously lean into your primary driver (<span class="synthesis-highlight">${primaryDriver.displayName}</span>) to build healthy momentum and purposeful direction, while implementing simple, automated routines to support your primary constraint (<span class="synthesis-highlight">${primaryConstraint.displayName}</span>). By understanding how your emotional reactivity and self-regulation interact across daily routines and intimate communication, you can proactively design your personal schedule, household logistics, and recovery rituals to sustain peak vitality, deep relational harmony, and long-term psychological resilience.`;

        return `
        <div class="synthesis-card">
            <div class="synthesis-header">
                <h2>Core Profile Synthesis</h2>
                <span class="synthesis-subtitle">Holistic Trait Configuration & Life Management Analysis</span>
            </div>
            <div class="synthesis-body">
                <p>${p1}</p>
                <p>${p2}</p>
                <p>${p3}</p>
            </div>
        </div>`;
    },

    generateProfileSynthesis: function(domainZScores) {
        // 1. Identify highest and lowest traits
        let maxDomain = Object.keys(domainZScores)[0];
        let minDomain = Object.keys(domainZScores)[0];

        for (const [domain, zScore] of Object.entries(domainZScores)) {
            if (zScore > domainZScores[maxDomain]) maxDomain = domain;
            if (zScore < domainZScores[minDomain]) minDomain = domain;
        }

        // 2. Define Driver Text (Highest Trait)
        const driverText = {
            "Extraversion": "Your profile is driven by a strong need for engagement, action, and social connection across your personal and professional life.",
            "Openness/Intellect": "Your primary driver is conceptual exploration, intellectual novelty, and creative problem-solving across your lifestyle and habits.",
            "Conscientiousness": "Your defining characteristic is structure and self-discipline. Your life is anchored by order, reliability, and consistent execution.",
            "Agreeableness": "Your baseline operating system prioritizes interpersonal harmony, empathy, and nurturing supportive relationships across all social spheres.",
            "Neuroticism": "Your profile is shaped by heightened emotional nuance and situational vigilance, making you acutely attuned to risks and relationship dynamics."
        };

        // 3. Define Constraint Text (Lowest Trait)
        const constraintText = {
            "Extraversion": "However, this is balanced by a strong preference for quiet solitude and independent activities to protect your personal energy battery.",
            "Openness/Intellect": "This is grounded by a down-to-earth preference for practical, real-world utility, familiar routines, and concrete problem-solving.",
            "Conscientiousness": "This dynamic is modulated by a flexible, improvisational approach to daily schedules, preferring to adapt spontaneously rather than adhere to strict routines.",
            "Agreeableness": "You balance this with an objective, direct communication style that values candid truth and practical utility over social pleasantries.",
            "Neuroticism": "Crucially, this is stabilized by exceptional emotional composure and stress resilience, maintaining cognitive stoicism during intense life disruptions."
        };

        // 4. Calculate Operational Stability (Conscientiousness vs Neuroticism across life management)
        const cScore = domainZScores["Conscientiousness"];
        const nScore = domainZScores["Neuroticism"];
        let stabilityText = "";

        if (cScore > 0.5 && nScore < -0.5) {
            stabilityText = "Across overall life management, you exhibit the traits of a calm, organized achiever. High discipline paired with low stress reactivity allows you to manage complex responsibilities smoothly.";
        } else if (cScore < -0.5 && nScore > 0.5) {
            stabilityText = "Across overall life management, high emotional attunement paired with a flexible schedule means you benefit greatly from simple automated habits and supportive external routines.";
        } else if (cScore > 0.5 && nScore > 0.5) {
            stabilityText = "Across overall life management, your structured habits and high standards serve as powerful tools for maintaining clarity, order, and emotional equilibrium in daily routines.";
        } else if (cScore < -0.5 && nScore < -0.5) {
            stabilityText = "Across overall life management, you are a relaxed improviser who adapts effortlessly to disruptions, keeping a lived-in, low-stress environment.";
        } else {
            stabilityText = "Across overall life management, your emotional responsiveness and organizational discipline are well-balanced, enabling steady adaptation across work, home, and relationships.";
        }

        // Return formatted HTML using the comprehensive Whole-Profile Summary if scores exist, or fallback to this card
        return `
            <div class="insight-card layer1-card" style="border-top: 5px solid #8e44ad; background: #faf9fb;">
                <div class="insight-header">
                    <h3 style="color: #8e44ad;">Core Profile Synthesis</h3>
                </div>
                <p><strong>Primary Driver:</strong> ${driverText[maxDomain] || "Your profile reveals a balanced baseline across daily life."}</p>
                <p><strong>Primary Constraint:</strong> ${constraintText[minDomain] || "You adapt flexibly without severe constraints across standard settings."}</p>
                <p><strong>Life Management Reality:</strong> ${stabilityText}</p>
            </div>
        `;
    },

    showResults: function (scores) {
        document.getElementById('survey-form').classList.add('hidden');
        document.getElementById('intro-view').classList.add('hidden');
        document.getElementById('results-view').classList.remove('hidden');

        const container = document.getElementById('scores-container');

        const normativeData = {
            "Neuroticism": { mean: 55, sd: 12 },
            "Agreeableness": { mean: 75, sd: 10 },
            "Conscientiousness": { mean: 68, sd: 11 },
            "Extraversion": { mean: 65, sd: 12 },
            "Openness/Intellect": { mean: 72, sd: 10 }
        };

        const levels = {};
        const domainScores = {};
        const exactZScores = {}; // We need this dictionary for the Synthesis Engine

        const getDomainLevel = (domainName, rawScore) => {
            const norm = normativeData[domainName];
            if (!norm) return 'balanced'; 
            
            const zScore = (rawScore - norm.mean) / norm.sd;
            exactZScores[domainName] = zScore; // Store the exact decimal for triad logic
            
            if (zScore < -1.2) return 'very_low';
            if (zScore >= -1.2 && zScore < -0.4) return 'moderate_low';
            if (zScore >= -0.4 && zScore <= 0.4) return 'balanced';
            if (zScore > 0.4 && zScore <= 1.2) return 'moderate_high';
            return 'very_high';
        };

        resultsData.domains.forEach(d => {
            let domainTotal = 0;
            d.aspects.forEach(a => {
                const s = scores[a] || 0;
                domainTotal += s;
                // Calculate aspect level using standard normal distribution thresholds
                const aZ = this.calculateZScore(s, a);
                if (aZ < -1.2) levels[a] = 'very_low';
                else if (aZ < -0.4) levels[a] = 'moderate_low';
                else if (aZ <= 0.4) levels[a] = 'balanced';
                else if (aZ <= 1.2) levels[a] = 'moderate_high';
                else levels[a] = 'very_high';
            });
            domainScores[d.name] = domainTotal;
            levels[d.name] = getDomainLevel(d.name, domainTotal);
            
            const map = { "Extraversion": "E", "Conscientiousness": "C", "Neuroticism": "N", "Agreeableness": "A", "Openness/Intellect": "O" };
            if (map[d.name]) levels[map[d.name]] = levels[d.name];
        });

        // Generate the Synthesis HTML using our updated holistic engine
        const synthesisHTML = this.generateWholeProfileSummary(scores) || this.generateProfileSynthesis(exactZScores);

        // Render the top section, injecting the synthesisHTML before the trait grid
        let html = `<div class="results-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; margin-bottom: 24px;">
            <h3 style="margin: 0;">${resultsData.title} (Normative Statistical Model)</h3>
            <button type="button" onclick="app.downloadPDF()" style="padding: 10px 22px; font-size: 0.95em; border-radius: 8px; background: #2c3e50; color: white; border: none; cursor: pointer; font-weight: 700; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 10px rgba(44, 62, 80, 0.2); transition: background 0.2s, transform 0.1s;" data-html2canvas-ignore="true">📄 Download PDF Report</button>
        </div>
        ${synthesisHTML} 
        <h2 class="section-title">1. Your Traits (Normative Percentiles & CIs)</h2>
        <div class="profile-grid">`;

        resultsData.domains.forEach(domainData => {
            const raw = scores[domainData.id] || scores[domainData.name] || 0;
            const z = this.calculateZScore(raw, domainData.name);
            const t = this.calculateTScore(z);
            const pct = this.calculatePercentile(z);
            const ci = this.calculateSEMAndCI(raw, domainData.name);
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
                <!-- Redesigned Header: Stacked Layout -->
                <div class="domain-header-simple" style="display: flex; flex-direction: column; gap: 12px; border-bottom: 1px solid #eee; padding-bottom: 16px; margin-bottom: 16px;">
                    <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 6px;">
                        <h3 style="margin: 0; font-size: 1.35em; color: #2c3e50; line-height: 1.1;">${domainData.name}</h3>
                        <span class="score-badge ${badgeClass}" style="margin: 0; padding: 4px 10px; font-size: 0.65em; letter-spacing: 0.5px;">${badgeText}</span>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        <span style="font-size: 1.2em; font-weight: 700; color: #34495e;">${this.getOrdinal(pct)} Percentile</span>
                        <span style="font-size: 0.85em; color: #7f8c8d;">Z = ${z > 0 ? '+' : ''}${z.toFixed(2)} | T = ${t}</span>
                    </div>
                </div>
                
                <!-- Normative Percentile Bar -->
                <div style="margin-bottom: 18px;">
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
                    <!-- Stacked Raw/CI -->
                    <div style="font-size: 0.78em; color: #555; margin-top: 8px; display: flex; flex-direction: column; gap: 3px;">
                        <span><strong>Raw:</strong> ${raw}/100</span>
                        <span><strong>95% CI:</strong> ${this.getOrdinal(ci.ciPctLow)}–${this.getOrdinal(ci.ciPctHigh)} Pct (SEM ±${ci.sem})</span>
                    </div>
                </div>

                <div class="aspect-breakdown-simple" style="margin-top: 16px; border-top: 1px dashed #e1e8ed; padding-top: 14px;">
                    <div style="font-size: 0.85em; font-weight: bold; color: #34495e; margin-bottom: 12px;">Aspect Breakdown (Normative)</div>
                    ${domainData.aspects.map(aspect => {
                        const aRaw = scores[aspect] || 0;
                        const aZ = this.calculateZScore(aRaw, aspect);
                        const aT = this.calculateTScore(aZ);
                        const aPct = this.calculatePercentile(aZ);
                        const aCi = this.calculateSEMAndCI(aRaw, aspect);
                        return `
                        <div style="margin-bottom: 12px; background: #f8f9fa; padding: 12px; border-radius: 6px; border: 1px solid #f0f2f5;">
                            <!-- Stacked Aspect Text -->
                            <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                    <strong style="color: #2c3e50; font-size: 0.9em; line-height: 1.2;">${aspect}</strong>
                                    <strong style="color: #34495e; font-size: 0.9em; white-space: nowrap;">${this.getOrdinal(aPct)} Pct</strong>
                                </div>
                                <div style="display: flex; justify-content: space-between; font-size: 0.75em; color: #7f8c8d;">
                                    <span>Raw: ${aRaw}/50</span>
                                    <span>Z: ${aZ > 0 ? '+' : ''}${aZ.toFixed(2)} | T: ${aT}</span>
                                </div>
                            </div>
                            <!-- Mini Bar -->
                            <div class="mini-bar-simple" style="width: 100%; height: 6px; background: #e0e0e0; position: relative; overflow: visible;">
                                <div style="position: absolute; left: ${aCi.ciPctLow}%; width: ${Math.max(2, aCi.ciPctHigh - aCi.ciPctLow)}%; height: 100%; background: rgba(52, 152, 219, 0.35);"></div>
                                <div class="mini-fill" style="width: ${aPct}%; background: #3498db; border-radius: 3px;"></div>
                                <div style="position: absolute; left: 50%; top: -1px; bottom: -1px; width: 1.5px; background: #bdc3c7;"></div>
                            </div>
                            <div style="font-size: 0.72em; color: #7f8c8d; margin-top: 6px; text-align: right;">
                                95% CI: ${this.getOrdinal(aCi.ciPctLow)}–${this.getOrdinal(aCi.ciPctHigh)} Pct
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
            const dPct = this.calculatePercentile(this.calculateZScore(dRaw, d.name));

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
                const aPct = this.calculatePercentile(this.calculateZScore(aRaw, aspectName));

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

        const biases = {};
        resultsData.domains.forEach(d => {
            const roll = Math.random();
            if (roll < 0.33) biases[d.name] = 'low';
            else if (roll < 0.66) biases[d.name] = 'high';
            else biases[d.name] = 'avg';
        });

        this.surveyItems.forEach((item, idx) => {
            let valToSelect;

            if (item.type === 'control') {
                valToSelect = item.target;
            } else {
                const bias = biases[item.domain] || 'avg';
                const rand = Math.random();

                if (bias === 'high') {
                    valToSelect = rand > 0.4 ? (Math.floor(Math.random() * 2) + 4) : (Math.floor(Math.random() * 5) + 1);
                } else if (bias === 'low') {
                    valToSelect = rand > 0.4 ? (Math.floor(Math.random() * 2) + 1) : (Math.floor(Math.random() * 5) + 1);
                } else {
                    valToSelect = Math.floor(Math.random() * 3) + 2;
                }

                if (item.reverse) {
                    if (bias === 'high') {
                        valToSelect = rand > 0.4 ? (Math.floor(Math.random() * 2) + 1) : (Math.floor(Math.random() * 5) + 1);
                    } else if (bias === 'low') {
                        valToSelect = rand > 0.4 ? (Math.floor(Math.random() * 2) + 4) : (Math.floor(Math.random() * 5) + 1);
                    }
                }
            }

            this.userAnswers[idx] = valToSelect;
        });

        this.renderQuestions();
        this.submitSurvey(true);
    }
};

app.init();
