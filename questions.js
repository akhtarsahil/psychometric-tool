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
        "text": "I make no time for others.",
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
            "id": "Openness_Domain",
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
        "volatility": {
          "very_low": {
                    "insight_professional": "Maintains absolute operational stability regardless of environmental friction or interpersonal conflict.",
                    "insight_social_personal": "Relates to others strictly through logical problem-solving, rarely exhibiting reactive emotional shifts.",
                    "everyday_operational_habits": "Processes daily stress without physical or verbal escalation.",
                    "key_strength": "Immune to emotional contagion; serves as a reliable anchor during crises.",
                    "potential_challenge": "May dismiss the urgency of team members or partners who require emotional validation.",
                    "actionable_insights": [
                              "Acknowledge the emotional state of others explicitly before proposing logistical solutions.",
                              "Establish predetermined protocols for handling interpersonal disputes to ensure they are addressed."
                    ]
          },
          "moderate_low": {
                    "insight_professional": "Exhibits steady execution under pressure, absorbing standard workplace stress without externalizing frustration.",
                    "insight_social_personal": "Maintains a predictable demeanor in relationships, requiring significant provocation to display anger.",
                    "everyday_operational_habits": "Navigates routine obstacles efficiently, rarely allowing minor setbacks to derail the daily schedule.",
                    "key_strength": "Consistent output and interpersonal predictability.",
                    "potential_challenge": "Occasional reluctance to address rising friction until it becomes unavoidable.",
                    "actionable_insights": [
                              "Schedule regular debriefs to vocalize minor frustrations before they accumulate.",
                              "Practice mirroring the energy of peers during tense situations to demonstrate engagement."
                    ]
          },
          "balanced": {
                    "insight_professional": "Demonstrates proportional responses to workplace events, utilizing moderate tension to maintain focus.",
                    "insight_social_personal": "Expresses frustration directly when warranted, but recovers baseline equilibrium quickly.",
                    "everyday_operational_habits": "Balances focused execution with necessary decompression periods following high-stress tasks.",
                    "key_strength": "Adaptive responsiveness to both positive momentum and emerging threats.",
                    "potential_challenge": "Prolonged exposure to chaotic environments can gradually elevate baseline reactivity.",
                    "actionable_insights": [
                              "Monitor your recovery time after intense interactions to gauge your current stress load.",
                              "Implement structured transition periods between high-stress work and personal time."
                    ]
          },
          "moderate_high": {
                    "insight_professional": "Quickly detects and reacts to operational friction, serving as an early warning system for project risks.",
                    "insight_social_personal": "Highly attuned to relational dynamics, though prone to rapid fluctuations in mood based on immediate interactions.",
                    "everyday_operational_habits": "Requires structured environments to mitigate the impact of unexpected daily disruptions on productivity.",
                    "key_strength": "Rapid threat detection and swift mobilization in response to emerging problems.",
                    "potential_challenge": "Tendency to externalize stress, elevating the ambient tension of the team or household.",
                    "actionable_insights": [
                              "Implement a strict delay between feeling a reactive impulse and communicating it verbally or digitally.",
                              "Utilize objective data to verify the severity of a problem before escalating it."
                    ]
          },
          "very_high": {
                    "insight_professional": "Exhibits immediate, intense reactions to workplace stressors, leading to rapid exhaustion in volatile environments.",
                    "insight_social_personal": "Experiences interpersonal dynamics with high intensity, frequently requiring external reassurance to stabilize.",
                    "everyday_operational_habits": "Daily routines are highly vulnerable to disruption by minor inconveniences or negative interactions.",
                    "key_strength": "Exceptional sensitivity to environmental shifts and profound capacity for empathetic engagement.",
                    "potential_challenge": "High risk of burnout and conflict escalation due to impaired emotional regulation during stress.",
                    "actionable_insights": [
                              "Deploy somatic regulation techniques (e.g., breathwork, physical movement) as a mandatory first response to stress.",
                              "Limit exposure to unpredictable or high-conflict environments, strictly managing your daily stimulus intake."
                    ]
          }
},
        "withdrawal": {
          "very_low": {
                    "insight_professional": "Operates without hesitation in ambiguous situations, exhibiting zero anticipatory anxiety.",
                    "insight_social_personal": "Approaches new relationships and social risks with complete confidence and lack of self-consciousness.",
                    "everyday_operational_habits": "Executes plans decisively without requiring exhaustive preparation or contingency planning.",
                    "key_strength": "Absolute fearlessness in the face of uncertainty and risk.",
                    "potential_challenge": "Failure to anticipate genuine hazards or mitigate foreseeable points of failure.",
                    "actionable_insights": [
                              "Mandate a 'pre-mortem' analysis before launching new initiatives to explicitly identify potential risks.",
                              "Consult with highly vigilant team members to uncover blind spots in your planning."
                    ]
          },
          "moderate_low": {
                    "insight_professional": "Maintains steady momentum during uncertain projects, assessing risks without becoming paralyzed by them.",
                    "insight_social_personal": "Engages comfortably in social settings, rarely experiencing imposter syndrome or anticipatory dread.",
                    "everyday_operational_habits": "Handles routine uncertainty efficiently, proceeding with action rather than over-analyzing.",
                    "key_strength": "Pragmatic confidence and swift decision-making.",
                    "potential_challenge": "May occasionally underestimate the preparation required for complex, high-stakes tasks.",
                    "actionable_insights": [
                              "Build standard checklists for major projects to ensure basic safety protocols are not bypassed.",
                              "Verify your confidence against objective metrics before committing resources."
                    ]
          },
          "balanced": {
                    "insight_professional": "Calculates risks proportionally, preparing for likely contingencies while accepting necessary uncertainty.",
                    "insight_social_personal": "Experiences normal levels of hesitation in novel situations, but proceeds effectively once acclimated.",
                    "everyday_operational_habits": "Balances forward momentum with prudent caution in daily decision-making.",
                    "key_strength": "Optimal calibration between risk assessment and execution.",
                    "potential_challenge": "Can be tipped into over-caution if operating in an environment with a high penalty for failure.",
                    "actionable_insights": [
                              "Clearly define the 'acceptable failure rate' for your current projects to prevent creeping perfectionism.",
                              "Ensure your risk assessment does not devolve into procrastination when faced with difficult tasks."
                    ]
          },
          "moderate_high": {
                    "insight_professional": "Exhibits strong anticipatory vigilance, requiring comprehensive data and planning before committing to action.",
                    "insight_social_personal": "Prone to self-doubt and hesitation, frequently seeking validation or reassurance before making personal decisions.",
                    "everyday_operational_habits": "Relies on established routines to minimize exposure to unexpected variables.",
                    "key_strength": "Thorough preparation and rigorous stress-testing of proposed plans.",
                    "potential_challenge": "Analysis paralysis and a tendency to abandon projects prematurely at the first sign of friction.",
                    "actionable_insights": [
                              "Establish strict time limits for research and data-gathering phases to force execution.",
                              "Implement a policy of taking the 'next smallest logical step' when feeling overwhelmed by a larger goal."
                    ]
          },
          "very_high": {
                    "insight_professional": "Experiences severe anticipatory anxiety, leading to profound difficulty operating in ambiguous or high-risk environments.",
                    "insight_social_personal": "Avoids vulnerability and novel social interactions to protect against perceived threats of rejection or failure.",
                    "everyday_operational_habits": "Structures daily life primarily around threat avoidance and risk minimization.",
                    "key_strength": "Unparalleled capacity to identify structural weaknesses and potential failure modes in any system.",
                    "potential_challenge": "Chronic inaction, avoidance behaviors, and severe susceptibility to discouragement.",
                    "actionable_insights": [
                              "Segment all large objectives into micro-tasks, focusing exclusively on completing the immediate action without assessing the final outcome.",
                              "Systematize your decision-making using rigid rubrics to bypass the need for emotional confidence."
                    ]
          }
},
        "compassion": {
          "very_low": {
                    "insight_professional": "Prioritizes brutal efficiency and factual accuracy over team morale or individual sensitivities.",
                    "insight_social_personal": "Evaluates relationships primarily on utility and logic, displaying minimal interest in others' emotional states.",
                    "everyday_operational_habits": "Operates with strict self-interest, ignoring social obligations that do not offer a clear return on investment.",
                    "key_strength": "Utterly uncompromised objectivity in decision-making and negotiation.",
                    "potential_challenge": "Alienating critical allies and destroying team cohesion through perceived callousness.",
                    "actionable_insights": [
                              "Treat team morale as a quantifiable metric that directly impacts output and must be managed accordingly.",
                              "Schedule deliberate check-ins with key personnel, strictly to inquire about their operational needs."
                    ]
          },
          "moderate_low": {
                    "insight_professional": "Focuses on task completion, offering support only when it directly facilitates project objectives.",
                    "insight_social_personal": "Maintains functional, low-maintenance relationships, providing practical solutions rather than emotional validation.",
                    "everyday_operational_habits": "Minimizes time spent on social pleasantries, preferring direct and concise interactions.",
                    "key_strength": "Clear, unclouded judgment free from emotional bias.",
                    "potential_challenge": "Failing to build the relational capital necessary to navigate complex political or social environments.",
                    "actionable_insights": [
                              "Incorporate a brief, positive acknowledgment of others' efforts before delivering critical feedback.",
                              "Recognize that investing time in casual rapport functions as a lubricant for future negotiations."
                    ]
          },
          "balanced": {
                    "insight_professional": "Balances the need for operational efficiency with a pragmatic awareness of team well-being.",
                    "insight_social_personal": "Offers support and empathy to close contacts while maintaining healthy boundaries against emotional exhaustion.",
                    "everyday_operational_habits": "Engages socially when appropriate but reliably prioritizes core responsibilities over endless accommodation.",
                    "key_strength": "Sustainable empathy that supports others without compromising personal output.",
                    "potential_challenge": "May appear inconsistent, switching between warm support and cold objectivity depending on the context.",
                    "actionable_insights": [
                              "Explicitly communicate your current operational mode (e.g., 'I need to focus strictly on the data for this hour').",
                              "Audit your commitments to ensure you are not disproportionately absorbing the emotional labor of the group."
                    ]
          },
          "moderate_high": {
                    "insight_professional": "Actively monitors team morale, frequently intervening to support struggling colleagues and mitigate interpersonal friction.",
                    "insight_social_personal": "Deeply invested in the well-being of others, often anticipating their needs and offering preemptive care.",
                    "everyday_operational_habits": "Routinely adjusts personal schedules to accommodate the needs and requests of peers or family members.",
                    "key_strength": "Fostering intense loyalty, psychological safety, and high-functioning collaborative environments.",
                    "potential_challenge": "Risk of taking on the emotional burdens of others, leading to personal fatigue and compromised boundaries.",
                    "actionable_insights": [
                              "Establish a firm boundary between 'supporting' someone and 'solving' their problem for them.",
                              "Require others to formally request assistance rather than automatically volunteering your resources."
                    ]
          },
          "very_high": {
                    "insight_professional": "Prioritizes the emotional comfort of the team above all other metrics, often sacrificing efficiency to avoid causing distress.",
                    "insight_social_personal": "Operates entirely based on the needs of others, experiencing their pain as if it were personal.",
                    "everyday_operational_habits": "Daily life is heavily dictated by external demands for emotional or practical support.",
                    "key_strength": "Profound capacity for caregiving, mediation, and creating environments of absolute trust.",
                    "potential_challenge": "Severe boundary collapse, emotional burnout, and vulnerability to exploitation by self-interested parties.",
                    "actionable_insights": [
                              "Implement a mandatory 24-hour waiting period before agreeing to take on any new emotional or practical burden.",
                              "Quantify the cost of your extreme accommodation, specifically tracking how it detracts from your primary objectives."
                    ]
          }
},
        "politeness": {
          "very_low": {
                    "insight_professional": "Communicates with absolute bluntness, entirely disregarding hierarchy, social norms, or the potential for offense.",
                    "insight_social_personal": "Routinely challenges authority and initiates conflict, viewing debate as the primary mode of interaction.",
                    "everyday_operational_habits": "Ignores social conventions, pursuing objectives with a disruptive and aggressive tempo.",
                    "key_strength": "Willingness to expose critical flaws and dismantle ineffective systems regardless of the political cost.",
                    "potential_challenge": "Creating unnecessary enemies and severely limiting long-term career or social viability through constant friction.",
                    "actionable_insights": [
                              "Filter your critiques: Ensure every challenge is directed at the process or the data, never at the individual.",
                              "Calculate the political cost of a battle before initiating it; reserve your aggression for issues of critical importance."
                    ]
          },
          "moderate_low": {
                    "insight_professional": "Questions consensus and pushes back against authority when inefficiencies are detected, valuing truth over tact.",
                    "insight_social_personal": "Communicates directly and assertively, occasionally offending more sensitive individuals in the pursuit of clarity.",
                    "everyday_operational_habits": "Operates efficiently by bypassing standard bureaucratic pleasantries or indirect communication.",
                    "key_strength": "Driving honest dialogue and preventing groups from settling for comfortable but flawed solutions.",
                    "potential_challenge": "Gaining a reputation for being difficult or uncooperative, which can hinder team-based projects.",
                    "actionable_insights": [
                              "Adopt a 'criticize in private, praise in public' protocol to mitigate the social damage of your directness.",
                              "Use interrogative framing (e.g., 'Help me understand how this works') rather than outright declarative attacks."
                    ]
          },
          "balanced": {
                    "insight_professional": "Respects hierarchical structures and social norms while retaining the capacity to deliver necessary pushback.",
                    "insight_social_personal": "Navigates social interactions smoothly, deploying tact when necessary but capable of setting firm boundaries.",
                    "everyday_operational_habits": "Adapts communication style to the context, balancing the need for efficiency with the requirement for civility.",
                    "key_strength": "Effective diplomacy that preserves relationships while still addressing core issues.",
                    "potential_challenge": "May occasionally compromise on the severity of feedback to maintain a polite atmosphere.",
                    "actionable_insights": [
                              "Ensure that your desire to remain polite does not dilute the clarity of critical instructions.",
                              "Periodically assess if you are deferring to authority out of genuine agreement or merely out of habit."
                    ]
          },
          "moderate_high": {
                    "insight_professional": "Highly compliant with organizational rules and authority, prioritizing smooth, respectful interactions over disruptive innovation.",
                    "insight_social_personal": "Carefully moderates behavior to avoid causing offense, actively seeking to align with the expectations of the group.",
                    "everyday_operational_habits": "Operates cautiously, ensuring all actions are vetted and approved by relevant authorities or peers.",
                    "key_strength": "Creating seamless, frictionless environments that support stable, long-term operations.",
                    "potential_challenge": "Hesitancy to challenge flawed leadership or voice dissenting opinions, leading to complicity in poor decisions.",
                    "actionable_insights": [
                              "Designate specific forums (like brainstorms or retrospectives) where you explicitly practice voicing disagreement.",
                              "Recognize that withholding critical feedback out of politeness ultimately damages the team's objective."
                    ]
          },
          "very_high": {
                    "insight_professional": "Exhibits extreme deference to authority, entirely unwilling to initiate conflict or challenge the status quo.",
                    "insight_social_personal": "Submerges personal opinions and desires completely to comply with external expectations and maintain absolute peace.",
                    "everyday_operational_habits": "Daily actions are heavily constrained by a fear of stepping out of line or violating social protocols.",
                    "key_strength": "Absolute reliability in executing established protocols and maintaining the organizational hierarchy.",
                    "potential_challenge": "Complete inability to advocate for personal needs, advocate for necessary change, or defend against aggression.",
                    "actionable_insights": [
                              "Practice making small, definitive statements of preference in low-stakes situations to build a tolerance for self-advocacy.",
                              "Reframe disagreement: View challenging a flawed idea as an act of duty to the organization, rather than an act of disrespect."
                    ]
          }
},
        "industriousness": {
          "very_low": {
                    "insight_professional": "Operates with minimal self-direction, requiring constant external pressure to initiate and complete tasks.",
                    "insight_social_personal": "Avoids long-term commitments and views sustained effort as inherently undesirable.",
                    "everyday_operational_habits": "Routinely delays necessary tasks until the absolute final deadline or until forced by external circumstances.",
                    "key_strength": "Conserves energy effectively and rarely falls victim to overwork or burnout.",
                    "potential_challenge": "Chronic underachievement, missed deadlines, and unreliability in both professional and personal domains.",
                    "actionable_insights": [
                              "Rely entirely on automated systems and external accountability (e.g., strict management, joint calendars) to force execution.",
                              "Break all tasks into micro-actions that require less than 5 minutes, focusing only on the immediate next step."
                    ]
          },
          "moderate_low": {
                    "insight_professional": "Executes tasks only when immediately necessary, preferring quick sprints of effort followed by long periods of rest.",
                    "insight_social_personal": "Contributes to household or group goals sporadically, often requiring prompting from partners or peers.",
                    "everyday_operational_habits": "Prioritizes convenience and leisure, minimizing the time spent on difficult or tedious work.",
                    "key_strength": "Efficiency through corner-cutting, often finding the path of least resistance to achieve an acceptable result.",
                    "potential_challenge": "Tendency to abandon projects at the first sign of significant friction or boredom.",
                    "actionable_insights": [
                              "Use the 'Pomodoro Technique' (short, intense bursts of timed work) to bypass your natural resistance to sustained effort.",
                              "Commit publicly to deadlines to manufacture the external pressure required to trigger your execution phase."
                    ]
          },
          "balanced": {
                    "insight_professional": "Maintains a steady, functional work rate, completing required duties reliably without descending into workaholism.",
                    "insight_social_personal": "Invests consistent effort into maintaining relationships and household responsibilities, matching the contributions of others.",
                    "everyday_operational_habits": "Balances periods of focused productivity with intentional, guilt-free downtime.",
                    "key_strength": "Sustainable output over long timelines without severe fluctuations in energy or commitment.",
                    "potential_challenge": "May lack the extreme drive required to push through exceptional periods of crisis or intense competition.",
                    "actionable_insights": [
                              "Identify high-leverage periods where temporarily increasing your work rate will yield outsized returns.",
                              "Protect your baseline routine, ensuring that periods of high effort are followed by planned recovery."
                    ]
          },
          "moderate_high": {
                    "insight_professional": "Self-driven and highly focused, consistently pushing projects forward and exceeding baseline expectations.",
                    "insight_social_personal": "Takes proactive ownership of planning and executing shared goals within relationships.",
                    "everyday_operational_habits": "Structures the day around productivity, finding satisfaction in checking off objectives and clearing backlogs.",
                    "key_strength": "Reliable execution, high output capacity, and strong self-management skills.",
                    "potential_challenge": "Difficulty disengaging from the 'execution mindset', occasionally viewing relaxation as a waste of time.",
                    "actionable_insights": [
                              "Schedule 'rest' as a formal, non-negotiable objective on your calendar to ensure it actually occurs.",
                              "Audit your task list to ensure you are prioritizing high-impact work rather than just generating busywork."
                    ]
          },
          "very_high": {
                    "insight_professional": "Relentlessly driven by output and achievement, capable of sustaining massive workloads through sheer willpower.",
                    "insight_social_personal": "Treats personal life and relationships as extensions of work, constantly seeking to optimize, fix, or improve them.",
                    "everyday_operational_habits": "Operates at maximum capacity constantly, viewing any unutilized time as a failure of discipline.",
                    "key_strength": "Unparalleled capacity to overcome obstacles and achieve complex, long-term goals through sustained effort.",
                    "potential_challenge": "Severe risk of burnout, workaholism, and alienating peers who cannot match the required tempo.",
                    "actionable_insights": [
                              "Define 'completion' clearly for every task to prevent endless, unnecessary iterations and polish.",
                              "Implement strict 'shut-down' routines at the end of the day to physically and mentally detach from the work environment."
                    ]
          }
},
        "orderliness": {
          "very_low": {
                    "insight_professional": "Operates comfortably in total chaos, completely ignoring established protocols, filing systems, or structural rules.",
                    "insight_social_personal": "Maintains a highly disorganized personal environment, frustrating partners who require predictability or tidiness.",
                    "everyday_operational_habits": "Lives entirely in the present, addressing needs as they arise with zero anticipatory organization or routine.",
                    "key_strength": "Extreme adaptability and complete immunity to the stress caused by changing plans or messy environments.",
                    "potential_challenge": "Constant loss of time and resources due to misplaced items, forgotten details, and systemic inefficiency.",
                    "actionable_insights": [
                              "Outsource all administrative and organizational tasks to software or detail-oriented partners.",
                              "Establish one single, non-negotiable physical location for critical items (keys, wallet, vital documents)."
                    ]
          },
          "moderate_low": {
                    "insight_professional": "Prioritizes forward momentum over perfect organization, maintaining only the minimum structure required to function.",
                    "insight_social_personal": "Tolerates significant clutter and ambiguity, preferring flexibility over rigid household routines.",
                    "everyday_operational_habits": "Relies on memory and ad-hoc methods rather than formalized lists, calendars, or filing systems.",
                    "key_strength": "Agility in fast-changing environments where rigid plans would immediately become obsolete.",
                    "potential_challenge": "Periodic crises caused by overlooking small but critical administrative details.",
                    "actionable_insights": [
                              "Schedule a weekly 'purge and reset' hour to prevent minor disorder from accumulating into a major blockage.",
                              "Adopt minimalist workflows: Use the simplest possible tool (like a single text file) rather than complex organizational software."
                    ]
          },
          "balanced": {
                    "insight_professional": "Maintains functional systems that support the work without becoming a slave to the process itself.",
                    "insight_social_personal": "Keeps a reasonably tidy environment and schedule, but easily abandons the routine for spontaneous opportunities.",
                    "everyday_operational_habits": "Utilizes standard organizational tools effectively, letting them slide during busy periods and resetting when time allows.",
                    "key_strength": "Pragmatic organization that serves the objective rather than dictating it.",
                    "potential_challenge": "Systemic degradation during extended periods of high stress, requiring significant effort to rebuild the baseline.",
                    "actionable_insights": [
                              "Identify the specific organizational habits that yield the highest return on your time, and ruthlessly abandon the rest.",
                              "Designate specific zones (physical or digital) that must remain perfectly ordered, while allowing chaos in less critical areas."
                    ]
          },
          "moderate_high": {
                    "insight_professional": "Relies heavily on structured processes, detailed planning, and pristine organization to drive efficiency.",
                    "insight_social_personal": "Maintains a highly regulated household and schedule, viewing order as a prerequisite for relaxation.",
                    "everyday_operational_habits": "Operates strictly via lists, calendars, and established routines, finding comfort in predictability.",
                    "key_strength": "Creating highly reliable, error-free environments that allow for smooth, predictable execution.",
                    "potential_challenge": "Experiencing disproportionate stress when forced to operate outside of established routines or in messy environments.",
                    "actionable_insights": [
                              "Practice 'flexible compliance': Identify scenarios where adhering to the plan is actually less efficient than adapting to the new reality.",
                              "Communicate your need for order as a personal operational requirement, rather than a moral standard others must meet."
                    ]
          },
          "very_high": {
                    "insight_professional": "Demands absolute precision and rigid adherence to protocol, prioritizing perfect order over speed or adaptability.",
                    "insight_social_personal": "Imposes intense structural requirements on partners and environments, experiencing severe distress if rules are broken.",
                    "everyday_operational_habits": "Life is heavily ritualized. Every item has a specific place, and every hour is meticulously scheduled.",
                    "key_strength": "Flawless execution of complex logistical systems requiring zero tolerance for error.",
                    "potential_challenge": "Crippling perfectionism, micromanagement, and an inability to function when the environment cannot be controlled.",
                    "actionable_insights": [
                              "Differentiate between 'critical order' (e.g., safety protocols) and 'aesthetic order' (e.g., desk alignment), learning to let the latter go.",
                              "Intentionally introduce minor disruptions into your routine to slowly build a tolerance for unpredictability."
                    ]
          }
},
        "enthusiasm": {
          "very_low": {
                    "insight_professional": "Maintains a flat, unexpressive demeanor, engaging with work strictly on a transactional and factual basis.",
                    "insight_social_personal": "Highly reserved and difficult to engage, showing minimal visible reaction to positive events or social overtures.",
                    "everyday_operational_habits": "Conserves energy aggressively, avoiding environments or interactions that require emotional performance.",
                    "key_strength": "Immunity to hype, maintaining total objectivity and resisting emotionally driven decision-making.",
                    "potential_challenge": "Being perceived as hostile, depressed, or entirely disengaged, which alienates peers and limits collaboration.",
                    "actionable_insights": [
                              "Explicitly verbalize your approval or agreement, as your lack of nonverbal enthusiasm will be misread as disapproval.",
                              "Identify one or two trusted colleagues to act as your proxy for team morale and relationship-building."
                    ]
          },
          "moderate_low": {
                    "insight_professional": "Communicates efficiently and seriously, participating in team culture only when necessary for the objective.",
                    "insight_social_personal": "Warms up to others very slowly, requiring time and established trust before displaying genuine emotion.",
                    "everyday_operational_habits": "Prefers solitary or low-key activities, finding highly expressive or energetic environments fatiguing.",
                    "key_strength": "Providing a calm, stabilizing presence that naturally defuses manic or overly emotional group dynamics.",
                    "potential_challenge": "Failing to project enough energy to lead initiatives or rally a team during critical pushes.",
                    "actionable_insights": [
                              "Deploy 'strategic enthusiasm' during key moments (kickoffs, project completions) to align with team expectations.",
                              "Communicate your default state to close partners so they do not interpret your calm demeanor as boredom."
                    ]
          },
          "balanced": {
                    "insight_professional": "Displays appropriate energy and engagement based on the situation, rallying when needed but defaulting to a calm baseline.",
                    "insight_social_personal": "Enjoys social interaction and shared positive experiences, but does not rely on them for daily motivation.",
                    "everyday_operational_habits": "Modulates energy levels effectively, engaging in team dynamics without burning out.",
                    "key_strength": "Adaptability in both high-energy celebrations and serious, focused work environments.",
                    "potential_challenge": "May struggle to sustain momentum if placed in a role that demands constant, high-octane emotional performance.",
                    "actionable_insights": [
                              "Protect your baseline by scheduling quiet recovery periods immediately following high-energy events.",
                              "Use your calibrated energy to bridge the gap between highly expressive and highly reserved team members."
                    ]
          },
          "moderate_high": {
                    "insight_professional": "Radiates positive energy and optimism, naturally elevating team morale and accelerating project momentum through verbal encouragement.",
                    "insight_social_personal": "Warm, engaging, and quick to form connections. Readily shares positive emotions and seeks out shared experiences.",
                    "everyday_operational_habits": "Thrives on interpersonal contact, using social interactions throughout the day to generate energy and focus.",
                    "key_strength": "Building rapid rapport, fostering team cohesion, and generating buy-in for new initiatives.",
                    "potential_challenge": "Allowing optimism to obscure genuine risks, or exhausting quieter team members with relentless positivity.",
                    "actionable_insights": [
                              "Ensure your enthusiasm does not invalidate the concerns of peers who are attempting to highlight project risks.",
                              "Calibrate your energy output to match the tone of the room, especially during serious or highly technical discussions."
                    ]
          },
          "very_high": {
                    "insight_professional": "Operates with intense, constant emotional expression and extreme optimism, requiring high visibility and continuous positive feedback.",
                    "insight_social_personal": "Highly exuberant and hyper-social, dominating the emotional tone of relationships and demanding high levels of engagement.",
                    "everyday_operational_habits": "Requires constant external stimulation and social interaction to function; silence and isolation cause rapid demotivation.",
                    "key_strength": "Unmatched ability to generate excitement, persuade large groups, and inject massive momentum into stagnant environments.",
                    "potential_challenge": "Over-promising due to temporary excitement, lacking follow-through, and overwhelming introverted partners.",
                    "actionable_insights": [
                              "Implement a 'cooling off' period before committing to any project or social event proposed while you are in a state of high excitement.",
                              "Actively practice lowering your volume and physical tempo to allow others space to enter the dynamic."
                    ]
          }
},
        "assertiveness": {
          "very_low": {
                    "insight_professional": "Entirely passive in group settings, yielding to the direction of others and actively avoiding leadership roles or confrontation.",
                    "insight_social_personal": "Submits to the preferences of partners or friends constantly, struggling to articulate personal desires or set boundaries.",
                    "everyday_operational_habits": "Operates strictly in the background, executing assigned tasks while minimizing visibility and responsibility.",
                    "key_strength": "Absolute compliance and willingness to support the objectives of dominant leaders without friction.",
                    "potential_challenge": "Becoming a target for exploitation, harboring deep unspoken resentment, and failing to advocate for basic needs.",
                    "actionable_insights": [
                              "Use written communication (email, shared docs) to state your requirements, bypassing the intimidation of verbal confrontation.",
                              "Designate specific, low-stakes decisions (e.g., where to eat) where you mandate that your preference must dictate the outcome."
                    ]
          },
          "moderate_low": {
                    "insight_professional": "Prefers supportive or advisory roles. Will offer input if specifically asked, but rarely interrupts or seizes control of the group.",
                    "insight_social_personal": "Accommodating and easygoing, generally content to let others dictate the pace and direction of the relationship.",
                    "everyday_operational_habits": "Focuses on execution rather than direction, functioning best when the hierarchy and objectives are clearly defined by someone else.",
                    "key_strength": "Facilitating group harmony and executing reliably without requiring ego validation or control.",
                    "potential_challenge": "Allowing flawed decisions to proceed simply because you were unwilling to aggressively interrupt and correct the leader.",
                    "actionable_insights": [
                              "Frame your assertions as questions (e.g., 'Have we considered X?') to insert your perspective without feeling combative.",
                              "Pre-arrange with a more assertive colleague to back up your points during critical meetings."
                    ]
          },
          "balanced": {
                    "insight_professional": "Capable of taking charge when necessary, but equally comfortable stepping back and letting others lead.",
                    "insight_social_personal": "Communicates needs clearly without attempting to dominate the relationship, maintaining an equitable balance of power.",
                    "everyday_operational_habits": "Adjusts posture based on context, asserting authority when expertise is required and yielding when it is not.",
                    "key_strength": "Flexible leadership that empowers others while maintaining the capacity to enforce standards.",
                    "potential_challenge": "May lack the overwhelming forceful presence required to rapidly take control of a highly chaotic or resistant group.",
                    "actionable_insights": [
                              "Consciously identify when a situation requires 'peacetime' collaborative leadership versus 'wartime' dictatorial command.",
                              "Ensure you are not defaulting to passivity simply because another assertive personality has entered the room."
                    ]
          },
          "moderate_high": {
                    "insight_professional": "Naturally assumes control of ambiguous situations, driving decisions forward and comfortably holding others accountable.",
                    "insight_social_personal": "Takes the lead in relationships, initiating action, setting the agenda, and communicating expectations directly.",
                    "everyday_operational_habits": "Operates with a decisive tempo, preferring to dictate the terms of engagement rather than waiting for instructions.",
                    "key_strength": "Catalyzing action, enforcing standards, and navigating conflict without hesitation.",
                    "potential_challenge": "Inadvertently silencing quieter team members and monopolizing the decision-making process.",
                    "actionable_insights": [
                              "Adopt the 'speak last' rule in meetings to force yourself to synthesize the group's input rather than dictating the outcome.",
                              "Regularly delegate decision-making authority on specific tasks, expressly forbidding yourself from overriding the outcome."
                    ]
          },
          "very_high": {
                    "insight_professional": "Fiercely dominant and highly confrontational. Demands absolute control and aggressively steamrolls opposition to achieve objectives.",
                    "insight_social_personal": "Overwhelmingly forceful in relationships, dictating terms and requiring partners who can either withstand or submit to constant intensity.",
                    "everyday_operational_habits": "Views all interactions through a lens of power and leverage, constantly asserting dominance over the environment.",
                    "key_strength": "Unstoppable drive and the ability to force compliance and execution in the most resistant environments.",
                    "potential_challenge": "Creating toxic cultures, alienating highly competent peers, and suffering from catastrophic blind spots because subordinates are too intimidated to warn you.",
                    "actionable_insights": [
                              "Appoint an 'integrator'—a highly trusted, blunt second-in-command who is explicitly authorized to tell you when you are wrong.",
                              "Evaluate your success not just on the objective achieved, but on the relational collateral damage incurred to achieve it."
                    ]
          }
},
        "intellect": {
          "very_low": {
                    "insight_professional": "Rejects abstract reasoning entirely, demanding concrete, literal instructions and focusing exclusively on immediate physical execution.",
                    "insight_social_personal": "Displays zero interest in philosophical, political, or theoretical discussions, engaging only with tangible, immediate realities.",
                    "everyday_operational_habits": "Operates strictly via repetition and established manual processes, avoiding any task that requires conceptual problem-solving.",
                    "key_strength": "Absolute grounding in reality and a willingness to perform highly repetitive, literal tasks without boredom.",
                    "potential_challenge": "Complete inability to navigate conceptual ambiguity or adapt to new systems that require abstract comprehension.",
                    "actionable_insights": [
                              "Translate all new concepts into direct physical actions or step-by-step literal checklists.",
                              "Avoid roles requiring strategic planning; focus on execution, logistics, and maintenance."
                    ]
          },
          "moderate_low": {
                    "insight_professional": "Prefers straightforward problem-solving over complex theoretical analysis. Values the 'how' much more than the 'why'.",
                    "insight_social_personal": "Engages in practical conversations regarding daily life, hobbies, or events, rather than debating abstract ideas.",
                    "everyday_operational_habits": "Learns best through hands-on practice rather than reading manuals or theoretical models.",
                    "key_strength": "Rapid, pragmatic execution without getting bogged down in unnecessary intellectualization.",
                    "potential_challenge": "May struggle to synthesize broad patterns from disparate data points, missing the larger strategic picture.",
                    "actionable_insights": [
                              "When forced to engage with abstract strategy, ask for specific historical examples to ground the concept in reality.",
                              "Partner with strategic thinkers to handle the conceptual mapping while you manage the practical implementation."
                    ]
          },
          "balanced": {
                    "insight_professional": "Capable of engaging with complex theories when necessary, but quickly pivots to practical application.",
                    "insight_social_personal": "Enjoys intellectual conversations in moderation, but remains equally comfortable discussing practical, everyday matters.",
                    "everyday_operational_habits": "Balances time between conceptualizing solutions and actually executing them.",
                    "key_strength": "Bridging the gap between highly theoretical planners and strictly literal operators.",
                    "potential_challenge": "May lack the extreme conceptual depth required for pure research or the extreme patience required for pure rote execution.",
                    "actionable_insights": [
                              "Use your balanced processing speed to translate complex strategies into actionable steps for the rest of the team.",
                              "Allocate specific time to deep-dive into complex topics to ensure your conceptual skills do not atrophy."
                    ]
          },
          "moderate_high": {
                    "insight_professional": "Highly analytical and quick to grasp complex, abstract systems. Excels at identifying underlying patterns in chaotic data.",
                    "insight_social_personal": "Seeks out intellectually stimulating environments and conversations, often bonding over shared ideas rather than shared activities.",
                    "everyday_operational_habits": "Approaches daily life as a series of problems to be optimized and understood conceptually.",
                    "key_strength": "Rapid synthesis of complex information and the ability to formulate sophisticated strategic models.",
                    "potential_challenge": "Tendency to over-complicate simple problems by intellectualizing them rather than just executing the obvious solution.",
                    "actionable_insights": [
                              "Apply the principle of 'Occam's Razor': consciously force yourself to select the simplest workable solution before exploring complex alternatives.",
                              "Ensure you allocate sufficient time to actual implementation, rather than just endlessly refining the theoretical model."
                    ]
          },
          "very_high": {
                    "insight_professional": "Operates almost entirely in the realm of high-level abstraction, thriving on philosophical, theoretical, and highly complex logical puzzles.",
                    "insight_social_personal": "Requires intense intellectual engagement in relationships. Experiences profound boredom if conversations remain on literal or mundane topics.",
                    "everyday_operational_habits": "Constantly consumes complex information, analyzing systems and theories, often at the expense of practical daily functioning.",
                    "key_strength": "Unmatched capacity for deep, theoretical breakthroughs, lateral thinking, and systemic analysis.",
                    "potential_challenge": "Total detachment from practical reality, intellectual arrogance, and an inability to communicate ideas in an accessible manner.",
                    "actionable_insights": [
                              "Practice the 'Feynman Technique': force yourself to explain your most complex theories using only language a 10-year-old would understand.",
                              "Delegate the literal execution of your ideas entirely, as your natural aversion to mundane details will guarantee failure during implementation."
                    ]
          }
},
        "openness_aspect": {
          "very_low": {
                    "insight_professional": "Displays absolute reliance on convention, completely rejecting new methodologies, aesthetic changes, or unconventional approaches.",
                    "insight_social_personal": "Adheres strictly to traditional lifestyles. Displays zero interest in art, diverse cultures, or novel experiences.",
                    "everyday_operational_habits": "Maintains highly rigid routines and environments, finding comfort exclusively in the familiar and the proven.",
                    "key_strength": "Unshakable stability and the preservation of functional traditions against unnecessary disruption.",
                    "potential_challenge": "Extreme rigidity leading to obsolescence, and an inability to adapt when the external environment fundamentally changes.",
                    "actionable_insights": [
                              "Treat necessary updates (like new software) as mandatory maintenance rather than optional 'new experiences'.",
                              "Recognize that refusing to adapt to a changing environment is, practically speaking, a decision to fail."
                    ]
          },
          "moderate_low": {
                    "insight_professional": "Prefers established practices and requires overwhelming evidence of utility before adopting a new tool or creative approach.",
                    "insight_social_personal": "Enjoys familiar entertainment and routines. Occasional openness to new experiences if guided by a trusted partner.",
                    "everyday_operational_habits": "Focuses on function over form. Unconcerned with aesthetics, optimizing life for practical utility.",
                    "key_strength": "Efficiency, reliability, and immunity to passing trends or superficial fads.",
                    "potential_challenge": "Dismissing creative or aesthetic improvements that could actually increase morale or usability.",
                    "actionable_insights": [
                              "When a creative change is proposed, evaluate it specifically on its potential to improve workflow, separating the utility from the 'novelty'.",
                              "Allow trusted peers to occasionally dictate new approaches to prevent your routines from becoming entirely stagnant."
                    ]
          },
          "balanced": {
                    "insight_professional": "Appreciates innovation and aesthetic design, but tempers creative impulses with a demand for practical application.",
                    "insight_social_personal": "Enjoys a mix of traditional routines and new cultural experiences, appreciating art without being consumed by it.",
                    "everyday_operational_habits": "Maintains functional systems but occasionally updates them for the sake of variety or minor optimization.",
                    "key_strength": "Integrating novel, creative ideas into existing, practical frameworks.",
                    "potential_challenge": "May lack the extreme dedication required to master a purely creative discipline or the strict discipline for pure routine.",
                    "actionable_insights": [
                              "Use your balanced perspective to act as an editor, refining the wild ideas of high-openness peers into usable products.",
                              "Intentionally dedicate specific blocks of time to either pure creative exploration or pure routine execution."
                    ]
          },
          "moderate_high": {
                    "insight_professional": "Highly receptive to unconventional solutions and aesthetic excellence. Drives innovation and challenges standard operating procedures.",
                    "insight_social_personal": "Curious, culturally engaged, and aesthetically sensitive. Seeks out novel experiences, travel, and artistic expression.",
                    "everyday_operational_habits": "Frequently alters routines, environments, and workflows to maintain a sense of freshness and inspiration.",
                    "key_strength": "Continuous generation of fresh perspectives and the ability to see aesthetic and conceptual connections others miss.",
                    "potential_challenge": "Abandoning functional systems simply because they feel 'boring', leading to unnecessary instability.",
                    "actionable_insights": [
                              "Before changing a functional system, clearly articulate what specific problem the new, novel approach will solve.",
                              "Channel your need for novelty into specific, contained hobbies or brainstorming sessions rather than disrupting core operations."
                    ]
          },
          "very_high": {
                    "insight_professional": "Operates entirely outside of convention, prioritizing radical innovation, aesthetic perfection, and constant disruption of the status quo.",
                    "insight_social_personal": "Experiences life as an ongoing artistic or exploratory project. Requires constant exposure to diverse, novel, and profound experiences.",
                    "everyday_operational_habits": "Rejects routine entirely. Life is characterized by fluidity, shifting passions, and a highly curated aesthetic environment.",
                    "key_strength": "Visionary creativity, paradigm-shifting innovation, and profound aesthetic intuition.",
                    "potential_challenge": "Total inability to tolerate routine maintenance, leading to chronic instability and a lack of grounding in practical reality.",
                    "actionable_insights": [
                              "Acknowledge that true mastery of any creative field eventually requires tedious, repetitive practice (routine).",
                              "Partner with highly grounded, low-openness individuals to handle the administrative reality of your life and work."
                    ]
          }
},
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
