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
    {
        "text": "I do not have an assertive personality.",
        "domain": "Extraversion",
        "aspect": "Assertiveness",
        "reverse": true
    },
    {
        "text": "I postpone decisions.",
        "domain": "Conscientiousness",
        "aspect": "Industriousness",
        "reverse": true
    },
    {
        "text": "I mess things up.",
        "domain": "Conscientiousness",
        "aspect": "Industriousness",
        "reverse": true
    },
    {
        "text": "I find it difficult to get down to work.",
        "domain": "Conscientiousness",
        "aspect": "Industriousness",
        "reverse": true
    },
    {
        "text": "I warm up quickly to others.",
        "domain": "Extraversion",
        "aspect": "Enthusiasm"
    },
    {
        "text": "I learn things slowly.",
        "domain": "Openness",
        "aspect": "Intellect",
        "reverse": true
    },
    {
        "text": "I hate to seem pushy.",
        "domain": "Agreeableness",
        "aspect": "Politeness"
    },
    {
        "text": "I am afraid of many things.",
        "domain": "Neuroticism",
        "aspect": "Withdrawal"
    },
    {
        "text": "I enjoy the beauty of nature.",
        "domain": "Openness",
        "aspect": "Openness"
    },
    {
        "text": "I feel threatened easily.",
        "domain": "Neuroticism",
        "aspect": "Withdrawal"
    },
    {
        "text": "Please select 'Strongly Disagree' for this item.",
        "type": "control",
        "target": 1
    },
    {
        "text": "I am hard to get to know.",
        "domain": "Extraversion",
        "aspect": "Enthusiasm",
        "reverse": true
    },
    {
        "text": "I inquire about others’ well-being.",
        "domain": "Agreeableness",
        "aspect": "Compassion"
    },
    {
        "text": "I am easily distracted.",
        "domain": "Conscientiousness",
        "aspect": "Industriousness",
        "reverse": true
    },
    {
        "text": "I am not a very enthusiastic person.",
        "domain": "Extraversion",
        "aspect": "Enthusiasm",
        "reverse": true
    },
    {
        "text": "I lack the talent for influencing people.",
        "domain": "Extraversion",
        "aspect": "Assertiveness",
        "reverse": true
    },
    {
        "text": "I get upset easily.",
        "domain": "Neuroticism",
        "aspect": "Volatility"
    },
    {
        "text": "I get angry easily.",
        "domain": "Neuroticism",
        "aspect": "Volatility"
    },
    {
        "text": "I keep things tidy.",
        "domain": "Conscientiousness",
        "aspect": "Orderliness"
    },
    {
        "text": "I can handle a lot of information.",
        "domain": "Openness",
        "aspect": "Intellect"
    },
    {
        "text": "I feel comfortable with myself.",
        "domain": "Neuroticism",
        "aspect": "Withdrawal",
        "reverse": true
    },
    {
        "text": "I take no time for others.",
        "domain": "Agreeableness",
        "aspect": "Compassion",
        "reverse": true
    },
    {
        "text": "I change my mood a lot.",
        "domain": "Neuroticism",
        "aspect": "Volatility"
    },
    {
        "text": "I keep others at a distance.",
        "domain": "Extraversion",
        "aspect": "Enthusiasm",
        "reverse": true
    },
    {
        "text": "I love to reflect on things.",
        "domain": "Openness",
        "aspect": "Openness"
    },
    {
        "text": "I become overwhelmed by events.",
        "domain": "Neuroticism",
        "aspect": "Withdrawal"
    },
    {
        "text": "I want everything to be “just right.”",
        "domain": "Conscientiousness",
        "aspect": "Orderliness"
    },
    {
        "text": "I enjoy watching the weather report.",
        "type": "filler"
    },
    {
        "text": "I always know what I am doing.",
        "domain": "Conscientiousness",
        "aspect": "Industriousness"
    },
    {
        "text": "I take charge.",
        "domain": "Extraversion",
        "aspect": "Assertiveness"
    },
    {
        "text": "I get things done quickly.",
        "domain": "Conscientiousness",
        "aspect": "Industriousness"
    },
    {
        "text": "I respect authority.",
        "domain": "Agreeableness",
        "aspect": "Politeness"
    },
    {
        "text": "I keep my emotions under control.",
        "domain": "Neuroticism",
        "aspect": "Volatility",
        "reverse": true
    },
    {
        "text": "I take an interest in other people’s lives.",
        "domain": "Agreeableness",
        "aspect": "Compassion"
    },
    {
        "text": "I see myself as a good leader.",
        "domain": "Extraversion",
        "aspect": "Assertiveness"
    },
    {
        "text": "I am easily discouraged.",
        "domain": "Neuroticism",
        "aspect": "Withdrawal"
    },
    {
        "text": "I want every detail taken care of.",
        "domain": "Conscientiousness",
        "aspect": "Orderliness"
    },
    {
        "text": "I have a strong personality.",
        "domain": "Extraversion",
        "aspect": "Assertiveness"
    },
    {
        "text": "I am indifferent to the feelings of others.",
        "domain": "Agreeableness",
        "aspect": "Compassion",
        "reverse": true
    },
    {
        "text": "I seldom notice the emotional aspects of paintings and pictures.",
        "domain": "Openness",
        "aspect": "Openness",
        "reverse": true
    },
    {
        "text": "I am filled with doubts about things.",
        "domain": "Neuroticism",
        "aspect": "Withdrawal"
    },
    {
        "text": "I am quick to understand things.",
        "domain": "Openness",
        "aspect": "Intellect"
    },
    {
        "text": "I like to do things for others.",
        "domain": "Agreeableness",
        "aspect": "Compassion"
    },
    {
        "text": "I get easily agitated.",
        "domain": "Neuroticism",
        "aspect": "Volatility"
    },
    {
        "text": "I rarely feel depressed.",
        "domain": "Neuroticism",
        "aspect": "Withdrawal",
        "reverse": true
    },
    {
        "text": "I show my feelings when I’m happy.",
        "domain": "Extraversion",
        "aspect": "Enthusiasm"
    },
    {
        "text": "I seldom get lost in thought.",
        "domain": "Openness",
        "aspect": "Openness",
        "reverse": true
    },
    {
        "text": "I see that rules are observed.",
        "domain": "Conscientiousness",
        "aspect": "Orderliness"
    },
    {
        "text": "I don’t have a soft side.",
        "domain": "Agreeableness",
        "aspect": "Compassion",
        "reverse": true
    },
    {
        "text": "I worry about things.",
        "domain": "Neuroticism",
        "aspect": "Withdrawal"
    },
    {
        "text": "I believe that I am better than others.",
        "domain": "Agreeableness",
        "aspect": "Politeness",
        "reverse": true
    },
    {
        "text": "I like to eat pizza.",
        "type": "filler"
    },
    {
        "text": "I believe in the importance of art.",
        "domain": "Openness",
        "aspect": "Openness"
    },
    {
        "text": "I am not embarrassed easily.",
        "domain": "Neuroticism",
        "aspect": "Withdrawal",
        "reverse": true
    },
    {
        "text": "I insult people.",
        "domain": "Agreeableness",
        "aspect": "Politeness",
        "reverse": true
    },
    {
        "text": "I rarely lose my composure.",
        "domain": "Neuroticism",
        "aspect": "Volatility",
        "reverse": true
    },
    {
        "text": "I formulate ideas clearly.",
        "domain": "Openness",
        "aspect": "Intellect"
    },
    {
        "text": "I dislike routine.",
        "domain": "Conscientiousness",
        "aspect": "Orderliness",
        "reverse": true
    },
    {
        "text": "I take advantage of others.",
        "domain": "Agreeableness",
        "aspect": "Politeness",
        "reverse": true
    },
    {
        "text": "I don’t put my mind on the task at hand.",
        "domain": "Conscientiousness",
        "aspect": "Industriousness",
        "reverse": true
    },
    {
        "text": "I am a person whose moods go up and down easily.",
        "domain": "Neuroticism",
        "aspect": "Volatility"
    },
    {
        "text": "I am out for my own personal gain.",
        "domain": "Agreeableness",
        "aspect": "Politeness",
        "reverse": true
    },
    {
        "text": "I rarely get irritated.",
        "domain": "Neuroticism",
        "aspect": "Volatility",
        "reverse": true
    },
    {
        "text": "I sympathize with others’ feelings.",
        "domain": "Agreeableness",
        "aspect": "Compassion"
    },
    {
        "text": "I know how to captivate people.",
        "domain": "Extraversion",
        "aspect": "Assertiveness"
    },
    {
        "text": "I need a creative outlet.",
        "domain": "Openness",
        "aspect": "Openness"
    },
    {
        "text": "I do not like poetry.",
        "domain": "Openness",
        "aspect": "Openness",
        "reverse": true
    },
    {
        "text": "I think quickly.",
        "domain": "Openness",
        "aspect": "Intellect"
    },
    {
        "text": "I leave my belongings around.",
        "domain": "Conscientiousness",
        "aspect": "Orderliness",
        "reverse": true
    },
    {
        "text": "I like order.",
        "domain": "Conscientiousness",
        "aspect": "Orderliness"
    },
    {
        "text": "I am not easily annoyed.",
        "domain": "Neuroticism",
        "aspect": "Volatility",
        "reverse": true
    },
    {
        "text": "I have difficulty understanding abstract ideas.",
        "domain": "Openness",
        "aspect": "Intellect",
        "reverse": true
    },
    {
        "text": "I carry out my plans.",
        "domain": "Conscientiousness",
        "aspect": "Industriousness"
    },
    {
        "text": "I can talk others into doing things.",
        "domain": "Extraversion",
        "aspect": "Assertiveness"
    },
    {
        "text": "I have a rich vocabulary.",
        "domain": "Openness",
        "aspect": "Intellect"
    },
    {
        "text": "I get deeply immersed in music.",
        "domain": "Openness",
        "aspect": "Openness"
    },
    {
        "text": "I avoid difficult reading material.",
        "domain": "Openness",
        "aspect": "Intellect",
        "reverse": true
    },
    {
        "text": "I avoid imposing my will on others.",
        "domain": "Agreeableness",
        "aspect": "Politeness"
    },
    {
        "text": "I make friends easily.",
        "domain": "Extraversion",
        "aspect": "Enthusiasm"
    },
    {
        "text": "I rarely put people under pressure.",
        "domain": "Agreeableness",
        "aspect": "Politeness"
    },
    {
        "text": "I waste my time.",
        "domain": "Conscientiousness",
        "aspect": "Industriousness",
        "reverse": true
    },
    {
        "text": "I hold back my opinions.",
        "domain": "Extraversion",
        "aspect": "Assertiveness",
        "reverse": true
    },
    {
        "text": "I feel others’ emotions.",
        "domain": "Agreeableness",
        "aspect": "Compassion"
    },
    {
        "text": "I follow a schedule.",
        "domain": "Conscientiousness",
        "aspect": "Orderliness"
    },
    {
        "text": "I reveal little about myself.",
        "domain": "Extraversion",
        "aspect": "Enthusiasm",
        "reverse": true
    },
    {
        "text": "I see beauty in things that others might not notice.",
        "domain": "Openness",
        "aspect": "Openness"
    },
    {
        "text": "I seldom feel blue.",
        "domain": "Neuroticism",
        "aspect": "Withdrawal",
        "reverse": true
    },
    {
        "text": "I love a good fight.",
        "domain": "Agreeableness",
        "aspect": "Politeness",
        "reverse": true
    },
    {
        "text": "I can’t be bothered with others’ needs.",
        "domain": "Agreeableness",
        "aspect": "Compassion",
        "reverse": true
    },
    {
        "text": "I prefer drinking water over soda.",
        "type": "filler"
    },
    {
        "text": "I am not bothered by disorder.",
        "domain": "Conscientiousness",
        "aspect": "Orderliness",
        "reverse": true
    },
    {
        "text": "I wait for others to lead the way.",
        "domain": "Extraversion",
        "aspect": "Assertiveness",
        "reverse": true
    },
    {
        "text": "I am not bothered by messy people.",
        "domain": "Conscientiousness",
        "aspect": "Orderliness",
        "reverse": true
    },
    {
        "text": "I laugh a lot.",
        "domain": "Extraversion",
        "aspect": "Enthusiasm"
    },
    {
        "text": "I seek conflict.",
        "domain": "Agreeableness",
        "aspect": "Politeness",
        "reverse": true
    },
    {
        "text": "I am the first to act.",
        "domain": "Extraversion",
        "aspect": "Assertiveness"
    },
    {
        "text": "I can be stirred up easily.",
        "domain": "Neuroticism",
        "aspect": "Volatility"
    },
    {
        "text": "I like to solve complex problems.",
        "domain": "Openness",
        "aspect": "Intellect"
    },
    {
        "text": "I finish what I start.",
        "domain": "Conscientiousness",
        "aspect": "Industriousness"
    },
    {
        "text": "I rarely get caught up in the excitement.",
        "domain": "Extraversion",
        "aspect": "Enthusiasm",
        "reverse": true
    },
    {
        "text": "I am not interested in other people’s problems.",
        "domain": "Agreeableness",
        "aspect": "Compassion",
        "reverse": true
    },
    {
        "text": "I seldom daydream.",
        "domain": "Openness",
        "aspect": "Openness",
        "reverse": true
    },
    {
        "text": "I have a lot of fun.",
        "domain": "Extraversion",
        "aspect": "Enthusiasm"
    },
    {
        "text": "I avoid philosophical discussions.",
        "domain": "Openness",
        "aspect": "Intellect",
        "reverse": true
    },
    {
        "text": "Please select 'Agree' for this item.",
        "type": "control",
        "target": 4
    },
    { text: "It is sometimes hard for me to go on with my work if I am not encouraged.", domain: "validity", reverse: true },
    { text: "I sometimes feel resentful when I don't get my way.", domain: "validity", reverse: true },
    { text: "On a few occasions, I have given up doing something because I thought too little of my ability.", domain: "validity", reverse: true },
    { text: "There have been times when I felt like rebelling against people in authority even though I knew they were right.", domain: "validity", reverse: true },
    { text: "No matter who I'm talking to, I'm always a good listener.", domain: "validity", reverse: false },
    { text: "There have been occasions when I took advantage of someone.", domain: "validity", reverse: true },
    { text: "I'm always willing to admit it when I make a mistake.", domain: "validity", reverse: false },
    { text: "I sometimes try to get even rather than forgive and forget.", domain: "validity", reverse: true },
    { text: "I am always courteous, even to people who are disagreeable.", domain: "validity", reverse: false },
    { text: "I have never been irked when people expressed ideas very different from my own.", domain: "validity", reverse: false },
    { text: "There have been times when I was quite jealous of the good fortune of others.", domain: "validity", reverse: true },
    { text: "I am sometimes irritated by people who ask favors of me.", domain: "validity", reverse: true },
    { text: "I have never deliberately said something that hurt someone's feelings.", domain: "validity", reverse: false }
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
            "very_low": {
                "insight_professional": "You exhibit extreme emotional detachment under pressure, remaining highly operational and objective during workplace crises.",
                "insight_social_personal": "In relationships, you are a grounding force. However, you may fail to mirror a partner's emotional urgency, which can be perceived as coldness or invalidation during conflicts.",
                "everyday_operational_habits": "Your baseline is steady. You do not require rigid routines to manage anxiety, allowing you to live comfortably in chaotic or unpredictable environments.",
                "key_strength": "Absolute cognitive stability and stoicism across all domains of life.",
                "potential_challenge": "Creating emotional distance by treating personal distress as a logistical problem to be solved rather than a feeling to be validated.",
                "environmental_preference": "High-stakes environments and dynamic social circles where stoicism is an asset.",
                "actionable_insights": [
                    "When a partner is distressed, explicitly remind yourself that their emotional state is the primary operational issue; solving the logistical problem will not resolve the emotional one.",
                    "Schedule intentional check-ins to monitor team or family morale, as you will not naturally detect rising ambient stress."
                ]
            },
            "moderate_low": {
                "insight_professional": "You are resilient and calm, acting as a stabilizing influence in high-pressure professional environments without becoming emotionally detached.",
                "insight_social_personal": "You handle relationship friction well without becoming defensive or reactive. You provide steady, consistent emotional support to loved ones.",
                "everyday_operational_habits": "You recover quickly from daily setbacks and do not dwell on minor frustrations or disruptions to your schedule.",
                "key_strength": "Maintaining perspective and operational steadiness when others are overwhelmed.",
                "potential_challenge": "Occasionally underestimating the genuine emotional weight of situations experienced by more sensitive peers or partners.",
                "environmental_preference": "Fast-paced, high-accountability environments where stress tolerance is valued.",
                "actionable_insights": [
                    "Avoid using phrases like 'it's not a big deal' when others express anxiety; remember that their baseline sensitivity differs from yours.",
                    "Leverage your composure during crises by volunteering to lead post-mortem discussions or high-tension negotiations."
                ]
            },
            "balanced": {
                "insight_professional": "You experience normal emotional responsiveness to stress and deadlines, using tension constructively to drive focus without becoming overwhelmed.",
                "insight_social_personal": "You are emotionally relatable and empathetic, able to share vulnerability with partners while maintaining healthy boundaries.",
                "everyday_operational_habits": "Your daily habits are flexible; you feel normal levels of urgency around deadlines but decompress effectively when work is done.",
                "key_strength": "Healthy adaptability—experiencing enough stress to stay alert, but possessing enough resilience to recover swiftly.",
                "potential_challenge": "Prolonged exposure to chaotic, high-conflict environments can gradually erode your baseline stability over time.",
                "environmental_preference": "Balanced professional and social settings that challenge you without demanding constant firefighting.",
                "actionable_insights": [
                    "Monitor your stress load during major life transitions; your balanced nature can mask gradual burnout until a breaking point occurs.",
                    "Establish clear separation between professional demands and personal relaxation time to preserve your emotional equilibrium."
                ]
            },
            "moderate_high": {
                "insight_professional": "You are highly vigilant and detail-oriented, driven by an acute awareness of potential risks and bottlenecks in projects.",
                "insight_social_personal": "You care deeply about your relationships and are attuned to subtle shifts in tone or mood, though you may occasionally overanalyze minor conflicts.",
                "everyday_operational_habits": "You rely on structure, preparation, and contingency planning to mitigate anxiety and maintain daily control.",
                "key_strength": "Exceptional risk detection, anticipation of failure modes, and proactive preparation.",
                "potential_challenge": "Experiencing unnecessary emotional fatigue by treating hypothetical worst-case scenarios as probable outcomes.",
                "environmental_preference": "Structured, supportive, and highly organized environments where expectations and processes are explicit.",
                "actionable_insights": [
                    "Implement a 'worry budget': Allocate 15 minutes a day to write down all project or personal anxieties, then strictly forbid dwelling on them outside that window.",
                    "When anticipating a negative outcome, force yourself to write down the best-case scenario and the most realistic scenario alongside the worst-case."
                ]
            },
            "very_high": {
                "insight_professional": "You operate with intense emotional attunement and threat-sensitivity, which can lead to severe stress under ambiguity or high-stakes pressure.",
                "insight_social_personal": "You experience relationship dynamics deeply and passionately, but you are vulnerable to chronic worry, reassurance-seeking, and emotional exhaustion.",
                "everyday_operational_habits": "Your daily routines are carefully constructed to minimize surprise and stress; unexpected disruptions can significantly derail your focus.",
                "key_strength": "Profound empathy, deep emotional nuance, and unparalleled ability to spot subtle environmental hazards.",
                "potential_challenge": "Severe vulnerability to anxiety, emotional flooding, and burnout when navigating sustained uncertainty or interpersonal conflict.",
                "environmental_preference": "Highly stable, psychologically psychological-safe environments with clear structure and minimal interpersonal friction.",
                "actionable_insights": [
                    "Develop and practice somatic grounding techniques (e.g., physiological sighs, cold water immersion) to interrupt acute stress cycles before addressing problems verbally.",
                    "Strictly limit your exposure to ambiguous communication channels outside working hours to protect your baseline recovery."
                ]
            }
        },
        "conscientiousness": {
            "very_low": {
                "insight_professional": "You thrive on pure spontaneity and immediate execution, rejecting strict processes, deadlines, and administrative structure.",
                "insight_social_personal": "You are spontaneous and fun-loving, but may frustrate partners through chronic disorganization, missed appointments, or lack of long-term planning.",
                "everyday_operational_habits": "Your schedule is entirely fluid. You address tasks spontaneously as they catch your attention rather than working from structured lists.",
                "key_strength": "Extreme adaptability and freedom from rigid routines, allowing instant pivots when circumstances change.",
                "potential_challenge": "Severe difficulty with long-term follow-through, administrative maintenance, and meeting formal deadlines without external structure.",
                "environmental_preference": "Dynamic, unstructured, or creative environments where rigid compliance is unnecessary and improvisation is rewarded.",
                "actionable_insights": [
                    "Implement the '2-Minute Rule': If a household or work task takes less than two minutes, do it immediately. Do not schedule it; you will forget.",
                    "Use automated systems (auto-pay, recurring calendar alerts) for all essential life maintenance to bypass the need for personal discipline."
                ]
            },
            "moderate_low": {
                "insight_professional": "You prioritize flexibility over rigid planning. You execute effectively but find administrative maintenance tedious.",
                "insight_social_personal": "You are a laid-back partner and friend. You prefer to 'go with the flow' rather than adhere to strict itineraries for social events or vacations.",
                "everyday_operational_habits": "Your living space and daily schedule are functional but lived-in. You clean and organize only when the disorder begins to actively impede your life.",
                "key_strength": "Adapting rapidly to changing circumstances without experiencing distress over broken plans.",
                "potential_challenge": "Overlooking minor details or requiring external pressure to finalize the last 10% of a project or personal goal.",
                "environmental_preference": "Fast-paced environments that value speed and adaptability over perfection.",
                "actionable_insights": [
                    "Use external accountability (body doubling, deadlines shared with peers) to force completion of tedious life tasks.",
                    "Standardize just one key routine (e.g., a strict 15-minute evening reset for your home) to anchor your day."
                ]
            },
            "balanced": {
                "insight_professional": "You maintain functional organization, planning when necessary but willing to let minor details slide to maintain overall momentum.",
                "insight_social_personal": "You contribute fairly to household management and relationship planning, balancing spontaneous fun with necessary responsibilities.",
                "everyday_operational_habits": "You keep a reasonably organized life. You have systems, but you don't panic if a system temporarily breaks down during a busy week.",
                "key_strength": "Balancing the need for structural planning with the reality of pragmatic execution.",
                "potential_challenge": "Under extreme stress, your organizational systems are usually the first thing you abandon, leading to a backlog.",
                "environmental_preference": "Environments offering a mix of structured deliverables and independent pacing.",
                "actionable_insights": [
                    "Identify which 'balls are glass' and which 'balls are rubber' in your daily life, and consciously let the rubber ones drop when overwhelmed.",
                    "Set a weekly 'admin hour' to clear out personal and professional logistical backlog."
                ]
            },
            "moderate_high": {
                "insight_professional": "You drive execution through clear systems and consistent output, though you feel friction when forced to abandon a plan.",
                "insight_social_personal": "You often take on the role of the 'planner' in your relationships. You show care through acts of service and reliable logistical support.",
                "everyday_operational_habits": "Your home and schedule are highly structured. Clutter and disorganization cause you low-level psychological distress.",
                "key_strength": "Consistently meeting commitments and maintaining high standards of quality in all domains.",
                "potential_challenge": "Becoming overly critical of partners or friends who do not share your standard of order or punctuality.",
                "environmental_preference": "Roles and living situations offering autonomy over process and clear, measurable objectives.",
                "actionable_insights": [
                    "Practice identifying the point of 'diminishing returns' in your organization; recognize when a task is 'good enough' to move on.",
                    "Verbally separate your need for order from your partner's character (a messy room is just a messy room, not a sign of disrespect)."
                ]
            },
            "very_high": {
                "insight_professional": "You demand absolute precision. Your rigid perfectionism ensures flawless execution but makes you highly resistant to sudden systemic changes.",
                "insight_social_personal": "You hold yourself and your loved ones to incredibly high, sometimes impossible, standards. You may inadvertently micromanage your household or partner.",
                "everyday_operational_habits": "Your routines are ironclad. You rely on immaculate environments and strict schedules; deviation from the routine causes severe distress.",
                "key_strength": "Maintaining highly complex, zero-error systems over long durations.",
                "potential_challenge": "Analysis paralysis and alienating loved ones by treating personal relationships as projects to be optimized.",
                "environmental_preference": "Highly regulated environments where precision, compliance, and absolute accuracy are required.",
                "actionable_insights": [
                    "Schedule mandatory 'unstructured time' where the explicit goal is to accomplish nothing and practice tolerating the discomfort of disorder.",
                    "Force yourself to submit 'V1' drafts—or invite friends into a slightly messy house—to desensitize your perfectionism."
                ]
            }
        },
        "agreeableness": {
            "very_low": {
                "insight_professional": "You are highly antagonistic and strictly objective, prioritizing blunt truth and competitive advantage over team cohesion.",
                "insight_social_personal": "Your relationships are often built on debate, shared activities, or utility rather than emotional vulnerability. You are fiercely independent and unbothered by social disapproval.",
                "everyday_operational_habits": "You optimize for efficiency and self-interest. You do not waste time on social pleasantries or obligations you deem illogical.",
                "key_strength": "Completely unhindered by social pressure; capable of making ruthless, necessary decisions.",
                "potential_challenge": "Your directness is often perceived as aggressive hostility, severely limiting deep interpersonal intimacy and professional alliances.",
                "environmental_preference": "Hyper-competitive, meritocratic environments where debate is the default state.",
                "actionable_insights": [
                    "Before delivering a critique, internally identify the strongest point the other person has made to ensure your pushback is objective rather than purely combative.",
                    "Audit your relationships: Ensure you have at least one dynamic that is entirely based on mutual care rather than utility or debate."
                ]
            },
            "moderate_low": {
                "insight_professional": "You are skeptical and direct. You value utility over social harmony, acting as an effective critical thinker who challenges group consensus.",
                "insight_social_personal": "You are fiercely loyal to a small inner circle but maintain a guarded, analytical approach to new people. You show love by solving problems, not through excessive warmth.",
                "everyday_operational_habits": "You protect your time and resources well, easily saying 'no' to social requests or obligations that drain you.",
                "key_strength": "Filtering out groupthink and ensuring decisions are based on data rather than social comfort.",
                "potential_challenge": "Unnecessarily escalating minor disagreements by focusing entirely on technical truth rather than the emotional context.",
                "environmental_preference": "Results-oriented cultures that normalize direct, unvarnished feedback.",
                "actionable_insights": [
                    "Ask yourself if winning a minor argument with a loved one is worth the relational capital it will cost.",
                    "When someone comes to you with a problem, default to asking, 'Do you want comfort or solutions?' before deploying your analytical skills."
                ]
            },
            "balanced": {
                "insight_professional": "You navigate social dynamics pragmatically, cooperating easily but maintaining clear boundaries for healthy pushback.",
                "insight_social_personal": "You are generally warm and supportive, but you do not sacrifice your core needs to keep the peace. You can handle conflict when it arises.",
                "everyday_operational_habits": "You engage in community and social obligations willingly, but withdraw to protect your own energy when necessary.",
                "key_strength": "Building consensus without becoming a pushover; maintaining balanced reciprocity.",
                "potential_challenge": "Occasionally sending mixed signals by switching rapidly between warmth and strict objectivity.",
                "environmental_preference": "Environments that value teamwork but respect individual boundaries.",
                "actionable_insights": [
                    "Clearly signal your mode to others: 'I'm putting on my critical thinking hat for a second,' to soften the transition to objectivity.",
                    "Regularly audit your close relationships to ensure the give-and-take remains equitable."
                ]
            },
            "moderate_high": {
                "insight_professional": "You are highly collaborative, prioritizing team morale and naturally facilitating smooth operations, though you hesitate to deliver harsh feedback.",
                "insight_social_personal": "You are deeply empathetic and heavily prioritize the needs of your family and friends, often acting as the emotional glue of your social circle.",
                "everyday_operational_habits": "Your day is heavily influenced by the needs of others. You are likely to derail your own plans to help someone else.",
                "key_strength": "Actively mitigating friction and building highly loyal, deeply connected relationships.",
                "potential_challenge": "Suppressing your own valid grievances or accepting subpar treatment to avoid the discomfort of confrontation.",
                "environmental_preference": "Mission-driven, communal cultures that emphasize shared human success.",
                "actionable_insights": [
                    "Reframe boundary-setting: Saying 'no' to an unreasonable request is actually a protective measure for your long-term relationship with that person.",
                    "Practice delivering 'micro-corrections' (small pieces of critical feedback) daily to build your tolerance for interpersonal friction."
                ]
            },
            "very_high": {
                "insight_professional": "You are extremely accommodating and conflict-averse, prioritizing the emotional comfort of others to the extent that you suppress your own needs.",
                "insight_social_personal": "You are a chronic people-pleaser. You likely attract dominant personalities and struggle deeply to express anger or assert boundaries in your romantic life.",
                "everyday_operational_habits": "Your lifestyle is entirely dictated by external obligations. You absorb the emotional weight of your household, leading to chronic exhaustion.",
                "key_strength": "Immense empathy, selflessness, and profound attunement to the emotional needs of others.",
                "potential_challenge": "Severe risk of burnout, resentment, and being actively leveraged by highly competitive or narcissistic peers.",
                "environmental_preference": "Highly supportive, non-competitive environments rooted in caregiving or service.",
                "actionable_insights": [
                    "Establish a default delay for all requests: Respond to every favor with, 'Let me check my schedule and get back to you.' Never say yes immediately.",
                    "Schedule weekly 'selfish time' where you are explicitly forbidden from doing anything that benefits another person."
                ]
            }
        },
        "extraversion": {
            "very_low": {
                "insight_professional": "You find social stimulation and group settings draining, exerting influence strictly through the high quality of your independent output.",
                "insight_social_personal": "You are fiercely protective of your solitude and social battery. You prefer deep, one-on-one connections and find large gatherings exhausting.",
                "everyday_operational_habits": "Your ideal routine involves long stretches of uninterrupted, quiet focus. You actively minimize spontaneous social interactions.",
                "key_strength": "Massive capacity for deep, sustained focus and independent problem-solving in total isolation.",
                "potential_challenge": "Risk of becoming invisible within organizations or social groups, allowing others to overlook your contributions or needs.",
                "environmental_preference": "Quiet, isolated environments that strictly protect uninterrupted focus.",
                "actionable_insights": [
                    "Implement asynchronous visibility: Send weekly written summaries of your accomplishments to leadership so you don't have to vocalize them in meetings.",
                    "Establish a hard 'social budget' for your personal life, communicating clearly to friends when you have reached your limit for the week."
                ]
            },
            "moderate_low": {
                "insight_professional": "You are reserved and deliberate, preferring solitary deep work and small functional teams over high-visibility leadership.",
                "insight_social_personal": "You are a thoughtful, highly present listener. You prefer intentional gatherings over spontaneous parties and take time to open up to new people.",
                "everyday_operational_habits": "You structure your day around quiet productivity, using breaks for solitary recharge rather than socializing.",
                "key_strength": "Active listening and processing information fully before committing to a verbal position.",
                "potential_challenge": "Failing to advocate for your own ideas in fast-paced environments where aggressive interruptions are standard.",
                "environmental_preference": "Roles combining high autonomy with small, trusted, and familiar teams.",
                "actionable_insights": [
                    "Prepare one data-backed talking point before every meeting and force yourself to deliver it early, establishing your presence.",
                    "Practice saying, 'I need some time to process that; I'll email you my thoughts by noon,' to avoid being put on the spot verbally."
                ]
            },
            "balanced": {
                "insight_professional": "You are socially adaptable, capable of leading meetings or engaging in team settings while relying on independent focus to recharge.",
                "insight_social_personal": "You enjoy socializing and attending events, but you happily retreat to your own space when your social battery winds down.",
                "everyday_operational_habits": "You naturally alternate between collaborative bursts and solitary focus, adapting your routine to the demands of the week.",
                "key_strength": "Bridging the communication gap between highly introverted technical experts and highly verbal extroverts.",
                "potential_challenge": "Spreading yourself too thin by trying to match the energy of high extraverts while also maintaining the deep work habits of introverts.",
                "environmental_preference": "Hybrid environments offering both communal collaboration spaces and quiet, closed-door focus areas.",
                "actionable_insights": [
                    "Block out mandatory 'no-meeting' mornings on your calendar to protect your deep work from being eroded by social demands.",
                    "Pay attention to whether you feel energized or drained after social interactions to better predict your recharge needs."
                ]
            },
            "moderate_high": {
                "insight_professional": "You are engaging and assertive, thriving in public-facing roles and utilizing verbal communication to build project momentum.",
                "insight_social_personal": "You are warm, outgoing, and easily initiate connections. You naturally take the lead in organizing social outings and bringing people together.",
                "everyday_operational_habits": "You seek out stimulation and external interaction throughout the day, often thinking out loud to process ideas.",
                "key_strength": "Networking, initiating action, and generating external enthusiasm across diverse groups.",
                "potential_challenge": "Formulating thoughts while speaking, which can lead to premature commitments or inadvertently dominating conversation.",
                "environmental_preference": "Roles requiring frequent interaction, external negotiation, and high visibility.",
                "actionable_insights": [
                    "Practice 'Active Pausing': Wait three full seconds after a colleague or partner finishes speaking before you begin responding.",
                    "Write down your initial ideas before voicing them in meetings to ensure you aren't just thinking aloud at the expense of others' airtime."
                ]
            },
            "very_high": {
                "insight_professional": "You require constant external stimulation and dominance, aggressively seeking visibility, leadership, and action above solitary analysis.",
                "insight_social_personal": "You are the center of gravity in your social circles. You crave excitement, large gatherings, and verbal exchange, but may overwhelm quieter partners.",
                "everyday_operational_habits": "You operate at a high verbal and physical tempo, filling quiet spaces with activity, conversation, and immediate action.",
                "key_strength": "Unyielding drive to initiate momentum, command room attention, and forcefully push objectives forward.",
                "potential_challenge": "Steamrolling detailed planning, dismissing quiet experts, and exhausting peers with constant social urgency.",
                "environmental_preference": "High-stimulus environments like enterprise leadership, public relations, or high-stakes negotiations.",
                "actionable_insights": [
                    "Enforce a strict rule to speak last in strategic meetings; compel your team to outline their positions fully before establishing yours.",
                    "Consciously practice sitting in silence during conversations, resisting the urge to fill every conversational pause with your own voice."
                ]
            }
        },
        "openness": {
            "very_low": {
                "insight_professional": "You are strictly traditional and pragmatic, rejecting theoretical frameworks in favor of proven, concrete methodologies.",
                "insight_social_personal": "You prefer familiar routines, classic traditions, and practical conversations over abstract philosophical debates or unconventional art.",
                "everyday_operational_habits": "Your routines are consistent and grounded in what works. You do not change tools, brands, or habits unless forced by obsolescence.",
                "key_strength": "Ensuring operational continuity and preventing teams from adopting untested, speculative, or highly flawed systems.",
                "potential_challenge": "Aggressively defending legacy systems or personal habits long after they have become inefficient or obsolete.",
                "environmental_preference": "Highly established institutions with clear hierarchies and unchanging core processes.",
                "actionable_insights": [
                    "Evaluate new tools strictly on their demonstrable ROI and time-saving metrics rather than focusing on the discomfort of the initial learning curve.",
                    "When loved ones want to try a radical new experience (restaurant, travel style), agree to participate without immediately pointing out practical flaws."
                ]
            },
            "moderate_low": {
                "insight_professional": "You are grounded and realistic, adopting new tools or ideas only when they offer immediate, demonstrable utility.",
                "insight_social_personal": "You are down-to-earth and straightforward. You enjoy tangible, real-world activities (crafts, sports, concrete problem-solving) over abstract speculation.",
                "everyday_operational_habits": "You maintain a practical daily flow, focusing your energy on getting concrete tasks done rather than pondering hypothetical scenarios.",
                "key_strength": "Executing established plans efficiently without getting distracted by novel, unproven concepts.",
                "potential_challenge": "Dismissing unconventional or creative solutions simply because they lack immediate precedent or conventional structure.",
                "environmental_preference": "Roles emphasizing practical execution, manufacturing, logistics, or administrative stability.",
                "actionable_insights": [
                    "When presented with a novel strategy, explicitly map out how it could practically integrate with your workflow before rejecting it.",
                    "Differentiate between an idea being 'unrealistic' versus simply being 'unfamiliar' to you."
                ]
            },
            "balanced": {
                "insight_professional": "You balance pragmatism with curiosity, open to novel solutions while maintaining a strict requirement that new ideas be anchored to reality.",
                "insight_social_personal": "You appreciate art, culture, and novel ideas in moderation, but you remain equally comfortable with traditional, grounded routines.",
                "everyday_operational_habits": "You are willing to tweak and optimize your daily habits when a better method appears, but you don't change routines just for the sake of novelty.",
                "key_strength": "Acting as a vital translator between highly abstract creatives and strictly literal operators.",
                "potential_challenge": "Hesitating to fully commit to either radical innovation or complete standardization when forced to choose an extreme.",
                "environmental_preference": "Roles that require optimizing and evolving existing systems rather than inventing entirely new paradigms.",
                "actionable_insights": [
                    "Dedicate specific time blocks to explore unproven concepts, knowing you possess the grounding to discard them if they lack utility.",
                    "Use your balanced perspective to mediate debates between the innovators and the traditionalists on your team."
                ]
            },
            "moderate_high": {
                "insight_professional": "You are strategic and creative, naturally synthesizing complex abstract concepts to drive innovation and novel problem-solving.",
                "insight_social_personal": "You are intellectually curious and aesthetically sensitive. You enjoy deep, abstract conversations and seek out diverse, unconventional experiences.",
                "everyday_operational_habits": "You easily bore of repetitive daily routines, continuously finding new ways to organize, work, or explore new intellectual territory.",
                "key_strength": "Anticipating future trends and connecting disparate concepts to form cohesive, innovative strategies.",
                "potential_challenge": "Losing motivation during the long-term maintenance phase of a project once the initial conceptual puzzle is solved.",
                "environmental_preference": "Environments focused on R&D, product development, design, or long-term strategic planning.",
                "actionable_insights": [
                    "Partner with highly conscientious executors to ensure your creative strategies survive the transition from concept to long-term reality.",
                    "Create a 'parking lot' for new ideas so you can capture creative bursts without abandoning your current commitments."
                ]
            },
            "very_high": {
                "insight_professional": "You are relentlessly theoretical and novelty-seeking, generating continuous paradigm-shifting ideas while actively despising routine maintenance.",
                "insight_social_personal": "You live in the world of ideas, art, and possibilities. You require partners and friends who can match your intense intellectual curiosity and appetite for novelty.",
                "everyday_operational_habits": "Your daily habits are fluid and experimental. You constantly change workflows, explore rabbit holes, and resist conventional lifestyle structures.",
                "key_strength": "Immense intellectual bandwidth and the capability to conceptualize entirely new frameworks and artistic breakthroughs.",
                "potential_challenge": "Becoming a perpetual architect who never builds the house, abandoning practical follow-through the moment the conceptual challenge is resolved.",
                "environmental_preference": "Purely creative, academic, or entrepreneurial environments demanding continuous ideation without maintenance burdens.",
                "actionable_insights": [
                    "Limit yourself to one primary conceptual project at a time; forbid yourself from starting a new initiative until the current one is officially handed off.",
                    "Establish strict operational boundaries or hire administrative support so your unconventional habits do not disrupt practical life necessities."
                ]
            }
        }
    },
            "layer_2_intersections": {
            "work_and_execution_style": {
                "E_high_C_high": {
                    "profile_name": "The Structured Director",
                    "detailed_analysis": "You exhibit high energy in directing others coupled with the discipline to execute. Professionally, you are a dominant leader who demands high standards. Personally, you likely run your household like a business, organizing group trips, managing the social calendar, and ensuring everyone meets their commitments.",
                    "social_dynamic": "You are the undisputed leader of your friend group, but your intensity can leave less driven friends feeling managed rather than loved.",
                    "blindspot_warning": "May inhibit team and partner autonomy by over-directing. Loved ones may hesitate to voice concerns due to your forceful, controlling style.",
                    "actionable_insights": [
                        "Solicit specific feedback on your management style from subordinates and your partner, specifically asking where you might be overly controlling.",
                        "Let someone else plan the next social outing, and commit to following their plan without offering 'optimizations'."
                    ]
                },
                "E_high_C_low": {
                    "profile_name": "The Dynamic Initiator",
                    "detailed_analysis": "You excel at starting projects, rallying support, and generating excitement. However, your high energy is not backed by detailed follow-through. You are the life of the party and a visionary starter, but you often leave a trail of unfinished personal projects and administrative messes for others to clean up.",
                    "social_dynamic": "You bring massive fun and spontaneity to relationships, but you may frustrate partners with your unreliability regarding chores or logistics.",
                    "blindspot_warning": "Tendency to over-commit resources, make grand promises, or agree to social events without verifying logistical feasibility.",
                    "actionable_insights": [
                        "Avoid immediate verbal commitments. Adopt a standard practice of saying 'Let me check my calendar' before agreeing to any professional or social deadline.",
                        "Pair up with highly conscientious peers or partners, and explicitly grant them the authority to rein in your impulses."
                    ]
                },
                "E_low_C_high": {
                    "profile_name": "The Independent Operator",
                    "detailed_analysis": "You function as a reliable, independent contributor who focuses on technical precision over social influence. In your personal life, you are highly self-sufficient, maintaining an organized, quiet lifestyle where you handle your own responsibilities without needing an audience.",
                    "social_dynamic": "You are a low-maintenance, deeply loyal friend, but you are difficult to get to know and rarely initiate social contact.",
                    "blindspot_warning": "Your perfectionism and isolation can lead to extreme analysis paralysis. You may withhold affection or work until it meets an unnecessarily high standard.",
                    "actionable_insights": [
                        "Practice sharing early 'works in progress'—both in your professional drafts and by sharing your unpolished thoughts with close friends.",
                        "Set a recurring calendar reminder to initiate contact with your core friends, overriding your natural instinct to wait for them to reach out."
                    ]
                },
                "E_low_C_low": {
                    "profile_name": "The Flexible Observer",
                    "detailed_analysis": "You prefer roles and lifestyles that allow for independence and flexibility. You are not driven by rigid schedules or the need for social dominance. You take life as it comes, maintaining a low-stress, improvisational approach to both career and home management.",
                    "social_dynamic": "You are incredibly easygoing and accepting of others, but your extreme passivity means partners may feel they have to drag you through life's milestones.",
                    "blindspot_warning": "Risk of severe passivity and inertia. Without external structure or social pressure, you may struggle to self-initiate complex tasks or personal growth.",
                    "actionable_insights": [
                        "Establish external accountability structures (e.g., hiring a trainer, scheduling regular check-ins with a manager) to maintain momentum.",
                        "Take proactive ownership of at least one major household or relationship responsibility to relieve the administrative burden on your partner."
                    ]
                },
                "mixed_interaction_fallback": {
                    "profile_name": "The Contextual Generalist",
                    "detailed_analysis": "You possess a balanced behavioral profile, capable of shifting between leadership and support, or structure and spontaneity, based on what the environment demands.",
                    "social_dynamic": "You adapt easily to different social circles, serving as a stabilizing presence that bridges the gap between extreme personalities.",
                    "blindspot_warning": "Lack of distinct specialization. You may be viewed as competent in many areas but exceptional in none.",
                    "actionable_insights": [
                        "Proactively select a 'spike' skill—one area where you force yourself to be highly specialized—to differentiate yourself professionally.",
                        "Ensure you aren't just adopting the traits of whoever you are currently spending time with; actively define your own boundaries."
                    ]
                }
            },
            "relationship_and_conflict_style": {
                "A_high_N_high": {
                    "profile_name": "The Anxious Appeaser",
                    "conflict_tactic": "Tendency to concede, apologize quickly, or suppress your own needs to resolve the immediate emotional tension of a conflict, often driven by a fear of abandonment or failure.",
                    "actionable_insights": [
                        "Recognize that professional and personal disagreement is a necessary function of a healthy system, not a sign of impending rejection.",
                        "Internally clarify your own non-negotiable needs before entering a difficult conversation, preventing you from automatically adopting the other person's priorities out of panic.",
                        "Practice 'tolerating the pause' during arguments rather than rushing to concede just to end the silence."
                    ]
                },
                "A_low_N_low": {
                    "profile_name": "The Stoic Challenger",
                    "conflict_tactic": "Tendency to focus strictly on facts, logic, and utility, completely bypassing the emotional component of the dispute and remaining unfazed by the other party's distress.",
                    "actionable_insights": [
                        "Understand that in romantic and social conflicts, the 'feeling' is often the actual problem. Fixing the logistics won't fix the feeling.",
                        "Internally map the emotional context of a dispute before engaging. If you only argue the logistical facts, the conflict will remain unresolved.",
                        "Monitor your tone; your natural stoicism can easily be misread as contempt or arrogance during heated moments."
                    ]
                },
                "A_high_N_low": {
                    "profile_name": "The Steady Harmonizer",
                    "conflict_tactic": "You seek peaceful resolutions and consensus, maintaining a calm, unflappable demeanor even when the other party becomes highly emotional or erratic.",
                    "actionable_insights": [
                        "Your calmness is an asset, but be careful not to act 'above' the conflict, which can invalidate a highly distressed partner.",
                        "Use your emotional stability to gently guide the conversation back to collaborative solutions rather than just absorbing the other person's anger.",
                        "Ensure you aren't using your calm demeanor as a shield to avoid taking action on valid criticisms."
                    ]
                },
                "A_low_N_high": {
                    "profile_name": "The Volatile Critic",
                    "conflict_tactic": "You are easily triggered by stress and have zero hesitation about expressing your displeasure bluntly. You are likely to engage in combative, highly critical arguments when threatened.",
                    "actionable_insights": [
                        "You must implement a strict 'time-out' protocol during arguments. When your heart rate spikes, step away for 20 minutes before continuing the discussion.",
                        "Focus your critiques on the specific behavior ('You left the report unfinished') rather than attacking the person's character ('You are lazy').",
                        "Recognize that your blunt delivery combined with high emotional intensity is incredibly destructive to team cohesion and marital trust."
                    ]
                },
                "mixed_interaction_fallback": {
                    "profile_name": "The Pragmatic Mediator",
                    "conflict_tactic": "Your response to conflict depends heavily on the specific context. You generally seek a middle ground and are not easily triggered, though you have firm limits.",
                    "actionable_insights": [
                        "Your balance is your greatest asset. Use your neutrality to translate between highly emotional and highly logical team members or family members.",
                        "Pay close attention to the emotional state of the *other* person to decide your tactic—whether they need logical solutions or emotional validation.",
                        "Don't let your desire for a pragmatic middle ground prevent you from taking a hard stance when core principles are violated."
                    ]
                }
            }
        }
};
