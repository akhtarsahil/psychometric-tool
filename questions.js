// BFAS Survey Data
// Includes 100 original items + Control/Fillers

const surveyStructure = {
    title: "Big Five Aspects Scale (BFAS)",
    instructions: "Please rate how well each statement describes you.",
    scale: [
        { value: 1, label: "Strongly Disagree" },
        { value: 2, label: "Disagree" },
        { value: 3, label: "Neutral" },
        { value: 4, label: "Agree" },
        { value: 5, label: "Strongly Agree" }
    ],
    items: [
        // --- Neuroticism: Volatility ---
        { text: "I get angry easily.", domain: "Neuroticism", aspect: "Volatility" },
        { text: "I rarely get irritated.", domain: "Neuroticism", aspect: "Volatility", reverse: true },
        { text: "I get upset easily.", domain: "Neuroticism", aspect: "Volatility" },
        { text: "I keep my emotions under control.", domain: "Neuroticism", aspect: "Volatility", reverse: true },
        { text: "I change my mood a lot.", domain: "Neuroticism", aspect: "Volatility" },
        { text: "I rarely lose my composure.", domain: "Neuroticism", aspect: "Volatility", reverse: true },
        { text: "I am a person whose moods go up and down easily.", domain: "Neuroticism", aspect: "Volatility" },
        { text: "I am not easily annoyed.", domain: "Neuroticism", aspect: "Volatility", reverse: true },
        { text: "I get easily agitated.", domain: "Neuroticism", aspect: "Volatility" },
        { text: "I can be stirred up easily.", domain: "Neuroticism", aspect: "Volatility" },

        // --- Neuroticism: Withdrawal ---
        { text: "I seldom feel blue.", domain: "Neuroticism", aspect: "Withdrawal", reverse: true },
        { text: "I am filled with doubts about things.", domain: "Neuroticism", aspect: "Withdrawal" },
        { text: "I feel comfortable with myself.", domain: "Neuroticism", aspect: "Withdrawal", reverse: true },
        { text: "I feel threatened easily.", domain: "Neuroticism", aspect: "Withdrawal" },
        { text: "I rarely feel depressed.", domain: "Neuroticism", aspect: "Withdrawal", reverse: true },
        { text: "I worry about things.", domain: "Neuroticism", aspect: "Withdrawal" },
        { text: "I am easily discouraged.", domain: "Neuroticism", aspect: "Withdrawal" },
        { text: "I am not embarrassed easily.", domain: "Neuroticism", aspect: "Withdrawal", reverse: true },
        { text: "I become overwhelmed by events.", domain: "Neuroticism", aspect: "Withdrawal" },
        { text: "I am afraid of many things.", domain: "Neuroticism", aspect: "Withdrawal" },

        // --- Agreeableness: Compassion ---
        { text: "I am not interested in other people’s problems.", domain: "Agreeableness", aspect: "Compassion", reverse: true },
        { text: "I feel others’ emotions.", domain: "Agreeableness", aspect: "Compassion" },
        { text: "I inquire about others’ well-being.", domain: "Agreeableness", aspect: "Compassion" },
        { text: "I can’t be bothered with others’ needs.", domain: "Agreeableness", aspect: "Compassion", reverse: true },
        { text: "I sympathize with others’ feelings.", domain: "Agreeableness", aspect: "Compassion" },
        { text: "I am indifferent to the feelings of others.", domain: "Agreeableness", aspect: "Compassion", reverse: true },
        { text: "I take no time for others.", domain: "Agreeableness", aspect: "Compassion", reverse: true },
        { text: "I take an interest in other people’s lives.", domain: "Agreeableness", aspect: "Compassion" },
        { text: "I don’t have a soft side.", domain: "Agreeableness", aspect: "Compassion", reverse: true },
        { text: "I like to do things for others.", domain: "Agreeableness", aspect: "Compassion" },

        // --- Agreeableness: Politeness ---
        { text: "I respect authority.", domain: "Agreeableness", aspect: "Politeness" },
        { text: "I insult people.", domain: "Agreeableness", aspect: "Politeness", reverse: true },
        { text: "I hate to seem pushy.", domain: "Agreeableness", aspect: "Politeness" },
        // Item 33
        // --- CONTROL 1 ---
        { text: "Please select 'Agree' for this item.", type: "control", target: 4 },

        { text: "I believe that I am better than others.", domain: "Agreeableness", aspect: "Politeness", reverse: true },
        { text: "I avoid imposing my will on others.", domain: "Agreeableness", aspect: "Politeness" },
        { text: "I rarely put people under pressure.", domain: "Agreeableness", aspect: "Politeness" },
        { text: "I take advantage of others.", domain: "Agreeableness", aspect: "Politeness", reverse: true },
        { text: "I seek conflict.", domain: "Agreeableness", aspect: "Politeness", reverse: true },
        { text: "I love a good fight.", domain: "Agreeableness", aspect: "Politeness", reverse: true },
        { text: "I am out for my own personal gain.", domain: "Agreeableness", aspect: "Politeness", reverse: true },

        // --- Conscientiousness: Industriousness ---
        { text: "I carry out my plans.", domain: "Conscientiousness", aspect: "Industriousness" },
        { text: "I waste my time.", domain: "Conscientiousness", aspect: "Industriousness", reverse: true },
        { text: "I find it difficult to get down to work.", domain: "Conscientiousness", aspect: "Industriousness", reverse: true },
        { text: "I mess things up.", domain: "Conscientiousness", aspect: "Industriousness", reverse: true },
        { text: "I finish what I start.", domain: "Conscientiousness", aspect: "Industriousness" },
        { text: "I don’t put my mind on the task at hand.", domain: "Conscientiousness", aspect: "Industriousness", reverse: true },
        { text: "I get things done quickly.", domain: "Conscientiousness", aspect: "Industriousness" },
        { text: "I always know what I am doing.", domain: "Conscientiousness", aspect: "Industriousness" },
        { text: "I postpone decisions.", domain: "Conscientiousness", aspect: "Industriousness", reverse: true },
        { text: "I am easily distracted.", domain: "Conscientiousness", aspect: "Industriousness", reverse: true },

        // --- Conscientiousness: Orderliness ---
        { text: "I leave my belongings around.", domain: "Conscientiousness", aspect: "Orderliness", reverse: true },
        { text: "I like order.", domain: "Conscientiousness", aspect: "Orderliness" },
        { text: "I keep things tidy.", domain: "Conscientiousness", aspect: "Orderliness" },
        { text: "I follow a schedule.", domain: "Conscientiousness", aspect: "Orderliness" },
        { text: "I am not bothered by messy people.", domain: "Conscientiousness", aspect: "Orderliness", reverse: true },
        { text: "I want everything to be “just right.”", domain: "Conscientiousness", aspect: "Orderliness" },
        { text: "I am not bothered by disorder.", domain: "Conscientiousness", aspect: "Orderliness", reverse: true },
        { text: "I dislike routine.", domain: "Conscientiousness", aspect: "Orderliness", reverse: true },
        { text: "I see that rules are observed.", domain: "Conscientiousness", aspect: "Orderliness" },
        { text: "I want every detail taken care of.", domain: "Conscientiousness", aspect: "Orderliness" },
        // Item 66
        // --- CONTROL 2 ---
        { text: "Please select 'Strongly Disagree' for this item.", type: "control", target: 1 },

        // --- Extraversion: Enthusiasm ---
        { text: "I make friends easily.", domain: "Extraversion", aspect: "Enthusiasm" },
        { text: "I am hard to get to know.", domain: "Extraversion", aspect: "Enthusiasm", reverse: true },
        { text: "I keep others at a distance.", domain: "Extraversion", aspect: "Enthusiasm", reverse: true },
        { text: "I reveal little about myself.", domain: "Extraversion", aspect: "Enthusiasm", reverse: true },
        { text: "I warm up quickly to others.", domain: "Extraversion", aspect: "Enthusiasm" },
        { text: "I rarely get caught up in the excitement.", domain: "Extraversion", aspect: "Enthusiasm", reverse: true },
        { text: "I am not a very enthusiastic person.", domain: "Extraversion", aspect: "Enthusiasm", reverse: true },
        { text: "I show my feelings when I’m happy.", domain: "Extraversion", aspect: "Enthusiasm" },
        { text: "I have a lot of fun.", domain: "Extraversion", aspect: "Enthusiasm" },
        { text: "I laugh a lot.", domain: "Extraversion", aspect: "Enthusiasm" },

        // --- Extraversion: Assertiveness ---
        { text: "I take charge.", domain: "Extraversion", aspect: "Assertiveness" },
        { text: "I have a strong personality.", domain: "Extraversion", aspect: "Assertiveness" },
        { text: "I lack the talent for influencing people.", domain: "Extraversion", aspect: "Assertiveness", reverse: true },
        { text: "I know how to captivate people.", domain: "Extraversion", aspect: "Assertiveness" },
        { text: "I wait for others to lead the way.", domain: "Extraversion", aspect: "Assertiveness", reverse: true },
        { text: "I see myself as a good leader.", domain: "Extraversion", aspect: "Assertiveness" },
        { text: "I can talk others into doing things.", domain: "Extraversion", aspect: "Assertiveness" },
        { text: "I hold back my opinions.", domain: "Extraversion", aspect: "Assertiveness", reverse: true },
        { text: "I am the first to act.", domain: "Extraversion", aspect: "Assertiveness" },
        { text: "I do not have an assertive personality.", domain: "Extraversion", aspect: "Assertiveness", reverse: true },

        // --- Openness/Intellect: Intellect ---
        { text: "I am quick to understand things.", domain: "Openness", aspect: "Intellect" },
        { text: "I have difficulty understanding abstract ideas.", domain: "Openness", aspect: "Intellect", reverse: true },
        { text: "I can handle a lot of information.", domain: "Openness", aspect: "Intellect" },
        { text: "I like to solve complex problems.", domain: "Openness", aspect: "Intellect" },
        { text: "I avoid philosophical discussions.", domain: "Openness", aspect: "Intellect", reverse: true },
        { text: "I avoid difficult reading material.", domain: "Openness", aspect: "Intellect", reverse: true },
        { text: "I have a rich vocabulary.", domain: "Openness", aspect: "Intellect" },
        { text: "I think quickly.", domain: "Openness", aspect: "Intellect" },
        { text: "I learn things slowly.", domain: "Openness", aspect: "Intellect", reverse: true },
        { text: "I formulate ideas clearly.", domain: "Openness", aspect: "Intellect" },

        // --- Openness/Intellect: Openness ---
        { text: "I enjoy the beauty of nature.", domain: "Openness", aspect: "Openness" },
        { text: "I believe in the importance of art.", domain: "Openness", aspect: "Openness" },
        { text: "I love to reflect on things.", domain: "Openness", aspect: "Openness" },
        { text: "I get deeply immersed in music.", domain: "Openness", aspect: "Openness" },
        { text: "I do not like poetry.", domain: "Openness", aspect: "Openness", reverse: true },
        { text: "I see beauty in things that others might not notice.", domain: "Openness", aspect: "Openness" },
        { text: "I need a creative outlet.", domain: "Openness", aspect: "Openness" },
        { text: "I seldom get lost in thought.", domain: "Openness", aspect: "Openness", reverse: true },
        { text: "I seldom daydream.", domain: "Openness", aspect: "Openness", reverse: true },
        { text: "I seldom notice the emotional aspects of paintings and pictures.", domain: "Openness", aspect: "Openness", reverse: true },

        // --- FILLER ---
        { text: "I enjoy watching the weather report.", type: "filler" },
        { text: "I prefer drinking water over soda.", type: "filler" },
        { text: "I like to eat pizza.", type: "filler" }
    ]
};

// Interpretation Data
const resultsData = {
    "title": "Big Five Aspect Scales (BFAS) Interpretations",
    "source": "DeYoung, Peterson, et al.",
    "domains": [
        {
            "id": "Neuroticism",
            "name": "Neuroticism",
            "aspects": ["Volatility", "Withdrawal"],
            "levels": {
                "high": {
                    "relationships": {
                        "label": "High Needs",
                        "description": "Often requires frequent reassurance and stability from partners. May perceive neutral interactions as negative. Risk of reactivity (Volatility) or emotional retreat (Withdrawal)."
                    },
                    "career": {
                        "label": "Risk Sensitive",
                        "description": "Fits roles requiring high sensitivity to danger (e.g., safety inspector). Struggles in chaotic environments; needs clear feedback and low ambiguity."
                    },
                    "environment": {
                        "label": "Sanctuary",
                        "description": "Prefers predictable, quiet, low-stimulation environments. Prioritizes home security and safe spaces."
                    }
                },
                "average": {
                    "relationships": {
                        "label": "Balanced",
                        "description": "Generally stable but can be triggered by significant stress. Capable of empathy without being overwhelmed."
                    },
                    "career": {
                        "label": "Adaptive",
                        "description": "Can handle typical workplace stress but requires recovery time. Good at bridging high-stress and low-stress teams."
                    },
                    "environment": {
                        "label": "Flexible",
                        "description": "Comfortable in busy offices but appreciates the option to retreat."
                    }
                },
                "low": {
                    "relationships": {
                        "label": "The Rock",
                        "description": "Unflappable and emotionally steady. Calming, though sometimes perceived as detached if they fail to mirror a partner's urgency."
                    },
                    "career": {
                        "label": "Crisis Management",
                        "description": "Thrives in high-pressure roles (ER, trading). Unlikely to burn out from stress alone."
                    },
                    "environment": {
                        "label": "Stimulation Tolerant",
                        "description": "Can function effectively in loud, chaotic, or dangerous environments without psychological cost."
                    }
                }
            }
        },
        {
            "id": "Agreeableness",
            "name": "Agreeableness",
            "aspects": ["Compassion", "Politeness"],
            "levels": {
                "high": {
                    "relationships": {
                        "label": "Harmonizer",
                        "description": "Prioritizes peace and connection. Highly supportive but may struggle to assert boundaries (the 'doormat' risk)."
                    },
                    "career": {
                        "label": "Service Oriented",
                        "description": "Excellent in healthcare, teaching, or HR. Driven by helping others rather than competition; struggles with firing or harsh negotiation."
                    },
                    "environment": {
                        "label": "Communal",
                        "description": "Prefers warm, collaborative spaces. Dislikes sterile isolation. Likely to decorate with personal mementos."
                    }
                },
                "average": {
                    "relationships": {
                        "label": "Transactional but Kind",
                        "description": "Warm when appropriate but capable of skepticism. Will help colleagues but won't sacrifice their own work to do so."
                    },
                    "career": {
                        "label": "Team Player",
                        "description": "Functions well in teams but can engage in healthy debate. Switches easily between support and objectivity."
                    },
                    "environment": {
                        "label": "Socially Moderate",
                        "description": "Enjoys common areas but needs private time to focus."
                    }
                },
                "low": {
                    "relationships": {
                        "label": "Challenger",
                        "description": "Valued for honesty over politeness. Relationships are often intellectual or activity-based rather than emotional."
                    },
                    "career": {
                        "label": "Competitive",
                        "description": "Thrives in litigation, negotiation, or executive execution. Focuses on objectives rather than feelings."
                    },
                    "environment": {
                        "label": "Functional",
                        "description": "Prefers environments that signal power or efficiency. Indifferent to 'cozy' aesthetics; prioritizes utility."
                    }
                }
            }
        },
        {
            "id": "Conscientiousness",
            "name": "Conscientiousness",
            "aspects": ["Industriousness", "Orderliness"],
            "levels": {
                "high": {
                    "relationships": {
                        "label": "Reliable",
                        "description": "The planner. Shows love through acts of service. Can be critical of spontaneous or 'messy' partners."
                    },
                    "career": {
                        "label": "Execution Machine",
                        "description": "Operations, accounting, logistics. Ensures projects finish on time. May struggle to pivot quickly if plans change."
                    },
                    "environment": {
                        "label": "Structured",
                        "description": "Needs a tidy, organized workspace. Clutter causes psychological distress. Prefers minimalist aesthetics."
                    }
                },
                "average": {
                    "relationships": {
                        "label": "Functional",
                        "description": "Meets deadlines and keeps a house relatively clean, but lets things slide during stress."
                    },
                    "career": {
                        "label": "Results-Oriented",
                        "description": "Cares about the outcome more than the perfect process. Gets things 'good enough' without getting stuck."
                    },
                    "environment": {
                        "label": "Lived-In",
                        "description": "Tolerates some mess but cleans up when it impacts function."
                    }
                },
                "low": {
                    "relationships": {
                        "label": "Spontaneous",
                        "description": "Fun and adaptable, but may forget obligations. Often relies on a partner for the 'admin' of life."
                    },
                    "career": {
                        "label": "Improvisational",
                        "description": "Good at brainstorming or immediate reaction roles. Struggles with self-directed routine."
                    },
                    "environment": {
                        "label": "Chaotic",
                        "description": "Often surrounded by clutter (viewed as 'cozy'). Dislikes rigid rules or sterile layouts."
                    }
                }
            }
        },
        {
            "id": "Extraversion",
            "name": "Extraversion",
            "aspects": ["Enthusiasm", "Assertiveness"],
            "levels": {
                "high": {
                    "relationships": {
                        "label": "The Initiator",
                        "description": "Energetic and dominant. Plans the social calendar. Needs high interaction and validation."
                    },
                    "career": {
                        "label": "Public Facing",
                        "description": "Sales, leadership, public speaking. Thrives on visibility and influence. Energized by meetings."
                    },
                    "environment": {
                        "label": "High Stimulus",
                        "description": "Prefers open-plan offices, busy cities, and activity. Silence feels oppressive."
                    }
                },
                "average": {
                    "relationships": {
                        "label": "Ambivert",
                        "description": "Can lead a meeting and enjoy a party, but has a social battery that drains."
                    },
                    "career": {
                        "label": "Flexible Collaborator",
                        "description": "Good at sales but capable of focused solo work. Can listen as well as they speak."
                    },
                    "environment": {
                        "label": "Varied",
                        "description": "Needs access to both social hubs and quiet corners."
                    }
                },
                "low": {
                    "relationships": {
                        "label": "The Observer",
                        "description": "Private and reserved. Intimacy is deep and one-on-one. May find high-energy partners exhausting."
                    },
                    "career": {
                        "label": "Deep Work",
                        "description": "Research, coding, writing. Prefers roles with autonomy. Influence is exerted through output, not presence."
                    },
                    "environment": {
                        "label": "Low Stimulus",
                        "description": "Needs quiet, private spaces. Prefers rural settings or sound-proofing. Sensitive to noise."
                    }
                }
            }
        },
        {
            "id": "Openness",
            "name": "Openness/Intellect",
            "aspects": ["Intellect", "Openness"],
            "levels": {
                "high": {
                    "relationships": {
                        "label": "Explorer",
                        "description": "Needs novelty and intellectual stimulation. Routine is the enemy. Relationships must include shared discovery."
                    },
                    "career": {
                        "label": "Creative/Strategic",
                        "description": "R&D, arts, entrepreneurship. Solves abstract problems. May struggle with repetitive execution."
                    },
                    "environment": {
                        "label": "Novel & Aesthetic",
                        "description": "Surrounded by books, art, or unusual objects. Prefers cities with culture or wild nature."
                    }
                },
                "average": {
                    "relationships": {
                        "label": "Pragmatic Creator",
                        "description": "Appreciates new ideas but checks them against reality. Enjoys vacations but likes routine."
                    },
                    "career": {
                        "label": "Applier",
                        "description": "Good at making radical ideas practical. Bridges the gap between 'creatives' and 'operators'."
                    },
                    "environment": {
                        "label": "Conventional with Twists",
                        "description": "Standard setups with small personal touches."
                    }
                },
                "low": {
                    "relationships": {
                        "label": "Traditionalist",
                        "description": "Values tradition and concrete reality. Loyal and predictable. May view high-openness partners as 'flighty'."
                    },
                    "career": {
                        "label": "Procedural",
                        "description": "Implementation, trade skills, administration. Excellent at following proven methods. Dislikes ambiguity."
                    },
                    "environment": {
                        "label": "Familiar",
                        "description": "Prefers simple, functional, and traditional environments. Uncomfortable with avant-garde aesthetics."
                    }
                }
            }
        }
    ],
    "layer_1_single_dimensions": {
        "neuroticism": {
            "high": {
                "insight": "High Volatility & Withdrawal. You likely experience emotions with greater intensity and duration than average. You may be more vigilant regarding potential risks or negative outcomes.",
                "key_strength": "Risk Identification. You are often the first to notice inconsistencies, potential failures, or subtle changes in an environment.",
                "potential_challenge": "Stress Management. Ambiguous situations or lack of feedback may trigger disproportionate anxiety or defensiveness.",
                "developmental_focus": "Delayed Response Strategy. When receiving negative feedback, implement a mandatory waiting period before responding to allow emotional reactivity to subside.",
                "environmental_preference": "Structured environments with clear performance metrics and minimal ambiguity."
            },
            "low": {
                "insight": "Low Volatility & Withdrawal. You tend to remain emotionally stable and resilient across changing circumstances. You are generally slow to anger or panic.",
                "key_strength": "Stability under Pressure. You can maintain cognitive function and decision-making capabilities during crises.",
                "potential_challenge": "Perceived Detachment. Your lack of visible emotional reaction may be misinterpreted by others as indifference or lack of urgency.",
                "developmental_focus": "Active Empathy. Consciously verbally acknowledge the stress or emotions of others, even if you do not personally share those feelings.",
                "environmental_preference": "High-intensity or high-stakes environments where emotional detachment is an asset."
            }
        },
        "conscientiousness": {
            "high": {
                "insight": "High Industriousness & Orderliness. You exhibit a strong preference for planning, organization, and goal completion. You are self-disciplined and reliable.",
                "key_strength": "Execution and Reliability. You consistently meet deadlines and maintain high standards of quality control.",
                "potential_challenge": "Rigidity. You may struggle to adapt when plans change suddenly or when efficiency requires sacrificing perfection.",
                "developmental_focus": "Diminishing Returns Analysis. Practice identifying the point where additional effort yields negligible results, and move to the next task.",
                "environmental_preference": "Roles offering autonomy over process and clear long-term objectives."
            },
            "low": {
                "insight": "Low Industriousness & Orderliness. You prefer spontaneity and flexibility over rigid structures. You are often comfortable with disorder and improvisation.",
                "key_strength": "Adaptability. You can pivot quickly in dynamic situations and are rarely paralyzed by a change in plans.",
                "potential_challenge": "Administrative Consistency. You may overlook routine maintenance tasks, deadlines, or organizational details.",
                "developmental_focus": "Immediate Action Heuristic. For administrative tasks taking less than two minutes, execute them immediately rather than scheduling them.",
                "environmental_preference": "Dynamic environments with short-term horizons and external accountability structures."
            }
        },
        "agreeableness": {
            "high": {
                "insight": "High Compassion & Politeness. You place a high value on interpersonal harmony, cooperation, and the well-being of others.",
                "key_strength": "Team Cohesion. You naturally facilitate collaboration and mitigate interpersonal conflict within groups.",
                "potential_challenge": "Assertiveness. You may suppress your own needs or valid criticisms to avoid causing discomfort to others.",
                "developmental_focus": "Boundary Setting. Practice declining minor requests regularly to normalize the prioritization of your own workload.",
                "environmental_preference": "Collaborative, non-competitive cultures that emphasize shared success."
            },
            "low": {
                "insight": "Low Compassion & Politeness. You prioritize objective truth, utility, and competition over social niceties. You are generally skeptical and direct.",
                "key_strength": "Objective Analysis. You are willing to voice unpopular facts or make difficult decisions without being hindered by emotional concerns.",
                "potential_challenge": "Interpersonal Friction. Your directness may be perceived as hostility, potentially damaging professional relationships.",
                "developmental_focus": "Tactical Validation. Before offering a critique, acknowledge a valid point in the opposing argument to lower defensiveness.",
                "environmental_preference": "Meritocratic or competitive environments where debate and directness are normalized."
            }
        },
        "extraversion": {
            "high": {
                "insight": "High Enthusiasm & Assertiveness. You are energized by social interaction and external stimulation. You tend to be verbal, dominant, and expressive.",
                "key_strength": "Social Initiation. You are effective at networking, public speaking, and establishing a presence in group settings.",
                "potential_challenge": "Listening Skills. You may dominate conversations or speak before fully processing the input of others.",
                "developmental_focus": "Active Pausing. In meetings, deliberately wait for a few seconds after a speaker finishes before interjecting.",
                "environmental_preference": "Roles requiring frequent interaction, public visibility, and variety."
            },
            "low": {
                "insight": "Low Enthusiasm & Assertiveness. You find high levels of social stimulation draining and prefer solitary or low-key activities. You are reserved and reflective.",
                "key_strength": "Sustained Focus. You are capable of deep, independent work without requiring constant social validation.",
                "potential_challenge": "Visibility. Your contributions may go unrecognized if you rely solely on the quality of work rather than self-promotion.",
                "developmental_focus": "Strategic Communication. Implement a routine of brief, written status updates to ensure your work is visible to stakeholders.",
                "environmental_preference": "Quiet environments allowing for long periods of uninterrupted work."
            }
        },
        "openness": {
            "high": {
                "insight": "High Intellect & Openness. You are motivated by novelty, abstract ideas, and aesthetic experiences. You tend to be creative and curious.",
                "key_strength": "Strategic Innovation. You excel at connecting unrelated concepts and visualizing future possibilities.",
                "potential_challenge": "Routine Maintenance. Repetitive or purely administrative tasks may lead to significant disengagement or procrastination.",
                "developmental_focus": "Prioritization. Limit your focus to one primary creative project at a time to prevent fragmented attention.",
                "environmental_preference": "Roles involved in R&D, strategy, or creative production."
            },
            "low": {
                "insight": "Low Intellect & Openness. You value pragmatism, tradition, and concrete reality. You prefer proven methods over theoretical speculation.",
                "key_strength": "Practical Implementation. You are effective at maintaining systems, following procedures, and dealing with tangible facts.",
                "potential_challenge": "Change Resistance. You may be skeptical of new methods or technologies that lack immediate, proven utility.",
                "developmental_focus": "Novelty Exposure. Periodically engage with a new tool or methodology to maintain adaptability.",
                "environmental_preference": "Roles with clear procedures, defined hierarchies, and practical outcomes."
            }
        }
    },
    "layer_2_intersections": {
        "work_style": {
            "E_high_C_high": {
                "profile_name": "Structured Leader",
                "detailed_analysis": "This combination suggests a drive for leadership coupled with the discipline to execute. You likely exhibit high energy in directing others and high standards for the final output.",
                "blindspot_warning": "May inhibit team autonomy by over-directing. Subordinates may hesitate to voice concerns due to your dominant style.",
                "growth_challenge": "Solicit specific feedback on your management style from subordinates, focusing on areas where you may be overly controlling."
            },
            "E_high_C_low": {
                "profile_name": "Dynamic Initiator",
                "detailed_analysis": "You likely excel at starting projects, sales, and rallying support. Your energy is high, but your attention to detailed follow-through may be inconsistent.",
                "blindspot_warning": "Tendency to over-commit resources or timelines without verifying logistical feasibility.",
                "growth_challenge": "Avoid immediate verbal commitments. Adopt a standard practice of verifying schedules before agreeing to deadlines."
            },
            "E_low_C_high": {
                "profile_name": "Operational Specialist",
                "detailed_analysis": "You likely function as a reliable, independent contributor. You focus on technical precision and systems maintenance rather than social influence.",
                "blindspot_warning": "Perfectionism may lead to delays (analysis paralysis). You may withhold partial work until it meets an unnecessarily high standard.",
                "growth_challenge": "Practice sharing early drafts or 'work in progress' to gather feedback before investing time in perfecting the details."
            },
            "E_low_C_low": {
                "profile_name": "Flexible Observer",
                "detailed_analysis": "You likely prefer roles that allow for independence and flexibility. You are not driven by rigid schedules or the need for social dominance.",
                "blindspot_warning": "Risk of passivity. Without external structure or pressure, you may struggle to self-initiate complex tasks.",
                "growth_challenge": "Establish external accountability structures (e.g., regular check-ins) to maintain momentum on long-term goals."
            },
            "E_average_C_average": {
                "profile_name": "The Generalist",
                "detailed_analysis": "You possess a balanced profile, capable of shifting between leadership and support roles as required. You are neither rigidly structured nor chaotic.",
                "blindspot_warning": "Lack of distinct specialization. You may be viewed as competent in many areas but exceptional in none.",
                "growth_challenge": " proactively select a 'spike' skill—one area where you force yourself to be highly specialized—to differentiate yourself."
            },
            "E_high_C_average": {
                "profile_name": "The Social Facilitator",
                "detailed_analysis": "Your high social energy is moderated by average conscientiousness. You are effective at maintaining morale and communication without being overly rigid about rules.",
                "blindspot_warning": "You may prioritize the 'vibe' of the team over the strict efficiency of the process.",
                "growth_challenge": "Ensure that your meetings always end with written action items, not just good feelings."
            },
            "E_low_C_average": {
                "profile_name": "The Independent Producer",
                "detailed_analysis": "You prefer to work alone and have a moderate ability to self-manage. You are steady and low-maintenance.",
                "blindspot_warning": "You risk becoming invisible. You do the work, but you don't advocate for it.",
                "growth_challenge": "Force yourself to voice your opinion in meetings at least once, even if it feels unnecessary."
            },
            "E_average_C_high": {
                "profile_name": "The Reliable Deputy",
                "detailed_analysis": "You have high discipline but moderate social need. You are often the 'right hand' to a more volatile leader, providing stability and execution.",
                "blindspot_warning": "You may rely too heavily on authority figures to set the direction for you.",
                "growth_challenge": "Practice initiating a project proposal yourself rather than waiting to be assigned one."
            },
            "E_average_C_low": {
                "profile_name": "The Responsive Support",
                "detailed_analysis": "You are flexible and moderately social. You excel in support roles that require reacting to incoming requests rather than long-term planning.",
                "blindspot_warning": "Reactive workflow. You may spend your whole career putting out fires rather than building things.",
                "growth_challenge": "Block out one hour each morning for 'Deep Work' before you open your email or slack."
            }
        },
        "conflict_style": {
            "A_high_N_high": {
                "profile_name": "Appeasing Style",
                "conflict_tactic": "Tendency to concede or apologize quickly to resolve the immediate emotional tension of a conflict.",
                "advice": "Recognize that professional disagreement is a necessary function of business, not a personal rejection."
            },
            "A_low_N_low": {
                "profile_name": "Objective Style",
                "conflict_tactic": "Tendency to focus strictly on facts and logic, often bypassing the emotional component of the dispute.",
                "advice": "Acknowledge the other party's perspective verbally before presenting counter-arguments to prevent them from becoming defensive."
            },
            "A_average_N_average": {
                "profile_name": "The Pragmatic Mediator",
                "conflict_tactic": "You generally seek a middle ground and are not easily triggered, though you have limits.",
                "advice": "Your balance is an asset. Use your neutrality to translate between the highly emotional and the highly logical team members."
            },
            "mixed_interaction_fallback": {
                "profile_name": "Situational Responder",
                "conflict_tactic": "Your response to conflict depends heavily on the specific context and your current stress level.",
                "advice": "Since your default setting is flexible, pay close attention to the emotional state of the *other* person to decide your tactic."
            }
        }
    }
};
