// Application Logic
const app = {
    init: function () {
        this.renderQuestions();
        // Ensure correct view state
        document.getElementById('intro-view').classList.remove('hidden');
        document.getElementById('survey-form').classList.add('hidden');
        document.getElementById('results-view').classList.add('hidden');
    },

    startSurvey: function () {
        document.getElementById('intro-view').classList.add('hidden');
        document.getElementById('survey-form').classList.remove('hidden');
        window.scrollTo(0, 0);
    },

    renderQuestions: function () {
        const container = document.getElementById('questions-container');
        let html = '';

        surveyStructure.items.forEach((item, index) => {
            html += `
                <div class="question-item" data-index="${index}" data-type="${item.type || 'normal'}">
                    <span class="question-text">${index + 1}. ${item.text}</span>
                    <div class="options-container">
                        ${surveyStructure.scale.map(opt => `
                            <label class="option-label">
                                <input type="radio" name="q${index}" value="${opt.value}">
                                <span>${opt.label}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    submitSurvey: function () {
        const results = surveyStructure.items.map((item, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            return selected ? parseInt(selected.value) : null;
        });

        if (results.includes(null)) {
            alert("Please answer all questions before submitting.");
            return;
        }

        this.calculateScores(results);
    },

    calculateScores: function (answers) {
        const scores = {};

        // Initialize scores
        surveyStructure.items.forEach(item => {
            if (item.aspect) {
                if (!scores[item.aspect]) scores[item.aspect] = 0;
                if (!scores[item.domain]) scores[item.domain] = 0;
            }
        });

        // Tally
        let failedControls = 0;

        answers.forEach((val, idx) => {
            const item = surveyStructure.items[idx];

            // Check Controls
            if (item.type === 'control') {
                if (val !== item.target) failedControls++;
                return;
            }
            if (item.type === 'filler') return;

            // BFAS Scoring
            // Reverse: 1->5, 2->4, 3->3, 4->2, 5->1  => (6 - val)
            const points = item.reverse ? (6 - val) : val;

            if (item.aspect) {
                scores[item.aspect] += points;
                scores[item.domain] += points;
            }
        });

        if (failedControls > 0) {
            alert("i know you weren't paying attention, loser. enjoy the useless inaccurate results and know that you have wasted your own time");
            // proceed anyway for demo
        }

        this.showResults(scores);
    },
    showResults: function (scores) {
        document.getElementById('survey-form').classList.add('hidden');
        document.getElementById('intro-view').classList.add('hidden');
        document.getElementById('results-view').classList.remove('hidden');

        const container = document.getElementById('scores-container');

        // --- 1. Calculate Levels (New Thresholds) ---
        // Low: 1.0 - 2.6, High: 3.5 - 5.0
        const levels = {};
        const domainScores = {}; // Just percentages for bars

        const getLevel = (val) => {
            if (val < 2.7) return 'low';
            if (val > 3.4) return 'high';
            return 'average';
        };

        resultsData.domains.forEach(d => {
            let total = 0;
            d.aspects.forEach(a => {
                const s = scores[a] || 0;
                total += s;
                levels[a] = getLevel(s / 10);
            });
            const avg = total / 20;
            levels[d.name] = getLevel(avg);
            // Save short code levl as well (Extraversion -> E)
            const map = { "Extraversion": "E", "Conscientiousness": "C", "Neuroticism": "N", "Agreeableness": "A", "Openness/Intellect": "O" }; // Note: Schema might use "Openness" as domain key?
            if (map[d.name]) levels[map[d.name]] = levels[d.name];
        });

        // --- 2. Render Scoreboard (Top Section) ---
        let html = `<div class="results-header">
            <h3>${resultsData.title}</h3>
        </div>
        <h2 class="section-title">1. Your Traits (Baseline)</h2>
        <div class="profile-grid">`;

        resultsData.domains.forEach(domainData => {
            let domainTotal = 0;
            domainData.aspects.forEach(a => { if (scores[a]) domainTotal += scores[a]; });
            const percent = Math.min((domainTotal / 100) * 100, 100);
            const levelKey = levels[domainData.name];

            html += `
            <div class="domain-summary-card">
                <div class="domain-header-simple">
                    <h3>${domainData.name}</h3>
                    <span class="score-badge ${levelKey}">${levelKey.toUpperCase()}</span>
                </div>
                <div class="score-bar"><div class="score-fill" style="width:${percent}%"></div></div>
                <div class="aspect-breakdown-simple">
                    ${domainData.aspects.map(aspect => {
                const s = scores[aspect] || 0;
                const p = Math.min((s / 50) * 100, 100);
                return `<div class="aspect-row">
                            <span>${aspect}</span>
                            <div class="mini-bar-simple"><div class="mini-fill" style="width:${p}%"></div></div>
                        </div>`;
            }).join('')}
                </div>
            </div>`;
        });
        html += `</div>`;

        // --- 3. Layer 1: Single Dimensions (High/Low Only) ---
        html += `<h2 class="section-title" style="margin-top:60px;">2. Behavioral Insights (Deep Dive)</h2>
                 <p class="section-desc">Analysis of your primary traits and their professional implications.</p>
                 <div class="insights-container">`;

        // Map domain names to keys in JSON (lowercase)
        // JSON keys: neuroticism, conscientiousness, etc.
        // Domain names in data: Neuroticism, Conscientiousness...
        resultsData.domains.forEach(d => {
            const dimKey = d.name.toLowerCase().split('/')[0]; // "Openness/Intellect" -> "openness"
            const lvl = levels[d.name];

            if (resultsData.layer_1_single_dimensions[dimKey] && resultsData.layer_1_single_dimensions[dimKey][lvl]) {
                const insight = resultsData.layer_1_single_dimensions[dimKey][lvl];
                html += `
                <div class="insight-card layer1-card">
                    <div class="insight-header">
                        <h3>${d.name}: ${lvl.charAt(0).toUpperCase() + lvl.slice(1)}</h3>
                    </div>
                    <p class="layer1-text">"${insight.insight}"</p>
                    <div class="layer1-grid">
                        <div class="l1-box strength">
                            <strong>📈 Key Strength</strong>
                            <p>${insight.key_strength}</p>
                        </div>
                        <div class="l1-box challenge">
                            <strong>⚠️ Potential Challenge</strong>
                            <p>${insight.potential_challenge}</p>
                        </div>
                    </div>
                    <p class="env-pref"><strong>🏢 Environment:</strong> ${insight.environmental_preference}</p>
                    <div class="habits-box">
                        <strong>🎯 Developmental Focus:</strong> ${insight.developmental_focus}
                    </div>
                </div>`;
            }
        });
        html += `</div>`;

        // --- 4. Layer 2: Intersections ---
        html += `<h2 class="section-title" style="margin-top:60px;">3. Interaction Matrix (Work & Conflict)</h2>
                 <p class="section-desc">How your traits combine to shape your leadership and conflict style.</p>
                 <div class="insights-container">`;

        // 4A. Work Style (E + C)
        const eLvl = levels["Extraversion"];
        const cLvl = levels["Conscientiousness"];
        const workKey = `E_${eLvl}_C_${cLvl}`;
        let workMatrix = resultsData.layer_2_intersections.work_style[workKey];

        // No fallback needed if all 9 combinations are present, but just in case:
        if (!workMatrix && resultsData.layer_2_intersections.work_style.mixed_interaction_fallback) {
            workMatrix = resultsData.layer_2_intersections.work_style.mixed_interaction_fallback;
        }

        if (workMatrix) {
            html += `
            <div class="matrix-card">
                <div class="matrix-header">
                    <span class="matrix-title">Work & Leadership Profile</span>
                    <h3>${workMatrix.profile_name}</h3>
                </div>
                <p class="matrix-summary">${workMatrix.detailed_analysis}</p>
                <p><strong>⚠️ Blindspot:</strong> ${workMatrix.blindspot_warning || 'N/A'}</p>
                <div class="advice-box"><strong>🌱 Growth Challenge:</strong> ${workMatrix.growth_challenge || 'N/A'}</div>
            </div>`;
        }

        // 4B. Conflict Style (A + N)
        const aLvl = levels["Agreeableness"];
        const nLvl = levels["Neuroticism"];
        const conflictKey = `A_${aLvl}_N_${nLvl}`;
        let conflictMatrix = resultsData.layer_2_intersections.conflict_style?.[conflictKey];

        if (!conflictMatrix) {
            // Logic Patch: Map to fallback if specific key missing
            conflictMatrix = resultsData.layer_2_intersections.conflict_style?.mixed_interaction_fallback;
        }

        if (conflictMatrix) {
            html += `
             <div class="matrix-card">
                 <div class="matrix-header">
                     <span class="matrix-title">Conflict Resolution Style</span>
                     <h3>${conflictMatrix.profile_name}</h3>
                 </div>
                 <p class="matrix-summary">${conflictMatrix.conflict_tactic}</p>
                 <div class="advice-box"><strong>💡 Professional Advice:</strong> ${conflictMatrix.advice}</div>
             </div>`;
        }

        html += `</div>`;

        container.innerHTML = html;
        window.scrollTo(0, 0);
    },

    debugFill: function () {
        // Create random biases for this run to ensure we see different "Personas"
        // instead of just regression to the mean (Average)
        const biases = {};
        resultsData.domains.forEach(d => {
            const roll = Math.random();
            if (roll < 0.33) biases[d.name] = 'low'; // Skew 1-2
            else if (roll < 0.66) biases[d.name] = 'high'; // Skew 4-5
            else biases[d.name] = 'avg'; // Skew 3
        });

        console.log("Debug Biases:", biases);
        console.log("Expected Work Profile:", `E_${biases["Extraversion"]}_C_${biases["Conscientiousness"]}`);
        console.log("Expected Conflict Profile:", `A_${biases["Agreeableness"]}_N_${biases["Neuroticism"]}`);

        // Fill radio buttons
        surveyStructure.items.forEach((item, idx) => {
            const rads = document.getElementsByName('q' + idx);
            if (rads.length > 0) {
                let valToSelect;

                if (item.type === 'control') {
                    valToSelect = item.target;
                } else {
                    const bias = biases[item.domain] || 'avg';
                    const rand = Math.random();

                    if (bias === 'high') {
                        // 60% chance of 4-5, 40% random
                        valToSelect = rand > 0.4 ? (Math.floor(Math.random() * 2) + 4) : (Math.floor(Math.random() * 5) + 1);
                    } else if (bias === 'low') {
                        // 60% chance of 1-2, 40% random
                        valToSelect = rand > 0.4 ? (Math.floor(Math.random() * 2) + 1) : (Math.floor(Math.random() * 5) + 1);
                    } else {
                        // Average skew (2-4)
                        valToSelect = Math.floor(Math.random() * 3) + 2;
                    }

                    // Handle Reverse Scoring Logic for correctness
                    // If we want a "High" result on a "Reverse" item, we need to pick a Low number (1 or 2).
                    // Example: "I am quiet" (R) -> We want High Extraversion. We should Disagree (1 or 2).
                    // Existing logic above picks "valToSelect" as the raw answer value (1-5).

                    // Wait, my logic above picks "High Numbers" (4-5).
                    // If the item is reversed, picking 5 means "Low Score".
                    // So if bias is 'high' and item is 'reverse', we should pick 'low' numbers.

                    if (item.reverse) {
                        if (bias === 'high') {
                            // Pick Low items
                            valToSelect = rand > 0.4 ? (Math.floor(Math.random() * 2) + 1) : (Math.floor(Math.random() * 5) + 1);
                        } else if (bias === 'low') {
                            // Pick High items
                            valToSelect = rand > 0.4 ? (Math.floor(Math.random() * 2) + 4) : (Math.floor(Math.random() * 5) + 1);
                        }
                    }
                }

                // Find the radio with this value
                for (let i = 0; i < rads.length; i++) {
                    if (parseInt(rads[i].value) === valToSelect) {
                        rads[i].checked = true;
                        break;
                    }
                }
            }
        });
        this.submitSurvey();
    }
};

app.init();
