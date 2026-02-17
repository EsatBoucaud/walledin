import { DeepAnalysis } from '../types';

type DeepPoint = { category: string; text: string };

type NodeOverride = {
    surface?: string;
    deep?: DeepPoint[];
};

type LyricNodeOverride = {
    lyric: string;
    override: NodeOverride;
};

type NodeAddition = {
    lyric: string;
    surface: string;
    deep: DeepPoint[];
};

const normalize = (text: string): string =>
    String(text || '')
        .toLowerCase()
        .replace(/[^\w\s]|_/g, '')
        .replace(/\s+/g, ' ')
        .trim();

const VICTOR_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "Victor Yuan a director flip a script like Rob Reiner",
        override: {
            surface: "He opens by positioning identity as direction: he controls framing before he reveals vulnerability.",
            deep: [
                {
                    category: "FILMMAKER ANCHOR",
                    text: "Rob Reiner reference locks the bar to explicit director grammar rather than generic celebrity flex."
                },
                {
                    category: "PERSONA FUNCTION",
                    text: "Director language explains the Victor mask: edit the scene first, then decide what self can be shown."
                }
            ]
        }
    },
    {
        lyric: "Kinder than an egg they need to give him his own dance / Find him down a peg waiting out lines like Greyson Chance",
        override: {
            surface: "The line frames outsider delay and breakthrough pressure through a targeted Greyson Chance callback.",
            deep: [
                {
                    category: "SONG-SPECIFIC REFERENCE",
                    text: "The line is a direct nod to 'Waiting Outside the Lines,' reinforcing the outsider-at-the-gate motif instead of a generic child-star mention."
                },
                {
                    category: "STATUS CONTRAST",
                    text: "Down a peg and own dance operate together: lowered status now, but still claiming eventual stage ownership."
                }
            ]
        }
    },
    {
        lyric: "Parallax lens, catch a glimpse through distortion / Tapes hiss, laced with a glitch in a portion",
        override: {
            surface: "Perception itself is unstable: he sees through shift, noise, and partial signal.",
            deep: [
                {
                    category: "OPTICS REFERENCE",
                    text: "Parallax signals viewpoint-dependent displacement, matching the track's recurring concern with mediated self-position."
                },
                {
                    category: "ARCHIVE DEGRADATION",
                    text: "Tape hiss and glitch language treats memory as damaged recording, not clean documentary evidence."
                }
            ]
        }
    },
    {
        lyric: "Floats a ship like Theseus, remolded in a cast",
        override: {
            surface: "He claims continuity through reconstruction: replacement does not erase identity labor.",
            deep: [
                {
                    category: "PHILOSOPHY REFERENCE",
                    text: "Ship of Theseus paradox reframes persona-building as identity maintenance under repeated replacement."
                },
                {
                    category: "REBUILD ETHIC",
                    text: "Remolded in a cast implies repair under pressure, not spontaneous reinvention."
                }
            ]
        }
    },
    {
        lyric: "Foot slide, slicker than a bishop with a good eye / Push pride past the limit, flick and watch the rook slide",
        override: {
            surface: "He reads social maneuvering as chess control under pressure.",
            deep: [
                {
                    category: "CHESS REFERENCE",
                    text: "Bishop/rook movement language codes strategic repositioning, timing, and calculated exposure."
                },
                {
                    category: "DISCIPLINED AGGRESSION",
                    text: "Push pride past the limit marks risk acceptance, but still inside a rule-bound tactical frame."
                }
            ]
        }
    },
    {
        lyric: "Sword in sheath, slid down like Bismarck's deck / While he scribble in the margins of a Mishima text",
        override: {
            surface: "War-collapse imagery is paired with austere literary discipline.",
            deep: [
                {
                    category: "HISTORY + LITERATURE CLUSTER",
                    text: "Bismarck and Mishima references pull military ruin and rigorous authorial self-fashioning into the same bar."
                },
                {
                    category: "MORTALITY TONE",
                    text: "Sheathed sword and margin-writing together suggest contained violence converted into controlled text-work."
                }
            ]
        }
    }
];

const VICTOR_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.97,
    unknowns: [
        "Whether the line also intentionally folds in broader industry gatekeeping experiences beyond the Greyson-specific callback.",
        "Whether the Bismarck/Mishima coupling is intended as direct dual-citation or selective tonal borrowing."
    ],
    sources: [
        {
            claim: "Greyson Chance line is specifically about 'Waiting Outside the Lines' and outsider break-through framing.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "'Waiting Outside the Lines' is a named Greyson Chance single, validating the direct title-anchor interpretation.",
            source_type: "secondary",
            reference: "Wikipedia - Waiting Outside the Lines",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Waiting_Outside_the_Lines"
        },
        {
            claim: "Rob Reiner is a film director, supporting the explicit director-role framing in the opener line.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Rob Reiner",
            reliability: "high",
            url: "https://www.britannica.com/biography/Rob-Reiner"
        },
        {
            claim: "Parallax describes apparent displacement from viewpoint change, matching the track's perspective-shift image.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - parallax",
            reliability: "high",
            url: "https://www.britannica.com/science/parallax"
        },
        {
            claim: "Ship of Theseus paradox formalizes identity-through-replacement, aligning with the remolding bar.",
            source_type: "secondary",
            reference: "Wikipedia - Ship of Theseus",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Ship_of_Theseus"
        },
        {
            claim: "Bismarck is a historically documented WWII battleship loss reference, fitting the deck-sinking image.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Bismarck",
            reliability: "high",
            url: "https://www.britannica.com/topic/Bismarck-German-battleship"
        },
        {
            claim: "Yukio Mishima is a major Japanese writer, supporting the margin-note literary rigor signal.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Yukio Mishima",
            reliability: "high",
            url: "https://www.britannica.com/biography/Mishima-Yukio"
        }
    ]
};

const BROADRIPPLE_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "Get high at school and burn like Broadripple",
        override: {
            surface: "Adolescent self-destruction gets framed through the title image of 'Broadripple Is Burning'.",
            deep: [
                {
                    category: "DIRECT INTERTEXT",
                    text: "This line functions as an explicit callback to the Margot and the Nuclear So and So's title 'Broadripple Is Burning'."
                },
                {
                    category: "SCENE GEOGRAPHY",
                    text: "Broadripple works as both place-name and emotional state: party district memory, then internal combustion metaphor."
                }
            ]
        }
    },
    {
        lyric: "Go die a fool who learned that costs triple",
        override: {
            surface: "He frames delay as a punitive tuition model where late understanding compounds damage.",
            deep: [
                {
                    category: "SELF-THREAT REGISTER",
                    text: "The imperative sounds like self-directed condemnation, not detached advice."
                },
                {
                    category: "LATENESS TAX",
                    text: "Costs triple encodes fear that creative and career mistakes become exponentially expensive."
                }
            ]
        }
    },
    {
        lyric: "Lost in code, discerned my thoughts dribble",
        override: {
            surface: "Technical immersion fragments expression, leaving thought as leaking residue.",
            deep: [
                {
                    category: "COGNITIVE SPILL",
                    text: "Code and lyric processes collide so output arrives as dribble rather than coherent argument."
                },
                {
                    category: "PRE-COGSCI SHADOW",
                    text: "The line prefigures Cog-sci by already identifying cognition style itself as the choke point."
                }
            ]
        }
    },
    {
        lyric: "See cards unfold, forbode it like Sybil",
        override: {
            surface: "He frames prediction as fragmented foresight, signaling unstable self-narration under pressure.",
            deep: [
                {
                    category: "ORACULAR FRAGMENT",
                    text: "Sybil language marks prophecy tone but with fractured identity texture, matching the track's split between aspiration and panic."
                },
                {
                    category: "RISK FORECAST",
                    text: "Cards-unfold image keeps chance and pattern-recognition in tension rather than claiming full control."
                }
            ]
        }
    },
    {
        lyric: "Word plots, they ease my troubles / Breeze locked in bubble",
        override: {
            surface: "Writing works as immediate relief, but the relief remains enclosed and non-structural.",
            deep: [
                {
                    category: "ENCLOSED THERAPY",
                    text: "Word plots provide short-term calming while the bubble metaphor admits no durable external repair."
                },
                {
                    category: "PRIVATE WEATHER",
                    text: "Breeze-in-bubble imagery suggests regulation inside a sealed chamber rather than shared healing."
                }
            ]
        }
    },
    {
        lyric: "AI slop, moloch nibbles",
        override: {
            surface: "He compresses cultural exhaustion into a devouring-system metaphor.",
            deep: [
                {
                    category: "SYSTEM DEVOURING IMAGE",
                    text: "Moloch functions as sacrificial-machine shorthand: output scale rises while meaning quality degrades."
                },
                {
                    category: "QUALITY PANIC",
                    text: "AI slop signals fear that automated abundance erodes craft distinction and authorship value."
                }
            ]
        }
    },
    {
        lyric: "Man, I can't drop these scribbles",
        override: {
            surface: "Compulsion overrides embarrassment: rough drafts keep coming regardless of confidence.",
            deep: [
                {
                    category: "WITHDRAWAL LOGIC",
                    text: "Scribbles read as necessity output, not vanity output; stopping would intensify internal pressure."
                },
                {
                    category: "CRAFT ADDICTION",
                    text: "The bar situates writing as involuntary maintenance behavior within the broader panic loop."
                }
            ]
        }
    },
    {
        lyric: "Add tamarin and tambourine to stammer doubled bars",
        override: {
            surface: "Flavor and percussion are fused as craft tools to push through speech-fragment pressure.",
            deep: [
                {
                    category: "SENSORY COMPOSITION",
                    text: "Tamarin/tambourine pair joins taste and rhythm to show writing as multisensory assembly, not purely semantic output."
                },
                {
                    category: "STUTTER STRATEGY",
                    text: "Stammer doubled bars reframes verbal disruption as rhythmic design material."
                }
            ]
        }
    },
    {
        lyric: "I'm a bard, rubble rambling glamoured muddled parts",
        override: {
            surface: "He claims poet status while admitting his method is salvage-and-reassembly.",
            deep: [
                {
                    category: "COLLAGE AUTHORSHIP",
                    text: "Bard identity is asserted through curation of fragments, not through clean-origin purity."
                },
                {
                    category: "GLAMOUR FROM DEBRIS",
                    text: "Rubble-to-glamour language centers transformation labor over authenticity posturing."
                }
            ]
        }
    },
    {
        lyric: "Partitioned particulars, gambling to study spars",
        override: {
            surface: "He breaks details into parts and studies structural gaps under uncertainty.",
            deep: [
                {
                    category: "MICRO-EDIT RISK",
                    text: "Partitioned particulars describes analytical dissection while gambling admits uncertain payoff."
                },
                {
                    category: "STRUCTURE TRAINING",
                    text: "Spars imagery implies he is inspecting the frame of songs, not just the gloss."
                }
            ]
        }
    },
    {
        lyric: "Repetitions secular, scrambling to Luddy in cars",
        override: {
            deep: [
                {
                    category: "COMMUTE LOOP",
                    text: "The line grounds the reference-heavy writing in routine logistics and fatigue rather than pure aesthetic posturing."
                },
                {
                    category: "BIOGRAPHIC CONTEXT",
                    text: "Luddy is a direct Indiana University Luddy reference, tying the song's panic cadence to lived tech-student movement in Indiana."
                }
            ]
        }
    },
    {
        lyric: "Margot to Mars goes, my mind goes to cosmos",
        override: {
            surface: "He escalates from a named Margot citation into cosmic overreach, making influence feel like propulsion.",
            deep: [
                {
                    category: "MARGOT ORIGIN",
                    text: "Margot references both the band lineage and Margot Tenenbaum naming context, then flips into persona-flight imagery."
                },
                {
                    category: "WASTED-POTENTIAL IMAGE",
                    text: "To Mars/space language frames weed-heavy drift and unrealized potential: far movement without grounded attainment."
                }
            ]
        }
    },
    {
        lyric: "Hard though to forgo the blind throws of bravos",
        override: {
            surface: "He admits applause hunger still pulls him toward reckless exhibition.",
            deep: [
                {
                    category: "PERFORMANCE ADDICTION",
                    text: "Blind throws and bravos render praise-seeking as a wager, not a craft decision."
                },
                {
                    category: "EGO INERTIA",
                    text: "Forgo signals he knows the pattern is costly yet still struggles to exit it."
                }
            ]
        }
    },
    {
        lyric: "Bars go through filters concentrating osmosis",
        override: {
            surface: "He treats writing as membrane work: filter, absorb, and recombine.",
            deep: [
                {
                    category: "FILTRATION LAB",
                    text: "The line frames editing as progressive concentration rather than one-pass inspiration."
                },
                {
                    category: "MEMBRANE METAPHOR",
                    text: "Osmosis fits the track's influence thesis: style moves across boundaries even when boundaries are policed."
                }
            ]
        }
    },
    {
        lyric: "Hocus pocus stars glow through mixtures, phosphorous",
        override: {
            surface: "Stage-magic and chemistry are merged to present craft as deliberate artifice.",
            deep: [
                {
                    category: "PERFORMED ALCHEMY",
                    text: "Hocus-pocus language refuses purity narratives and foregrounds technique as constructed illusion."
                },
                {
                    category: "LUMINOUS BYPRODUCT",
                    text: "Phosphorous glow implies the output shines because of reaction management, not spontaneous genius."
                }
            ]
        }
    },
    {
        lyric: "To get rich off your Ed, go forwards",
        override: {
            surface: "He confesses apprenticeship economics: learn from 'Ed' fast, but do not stay trapped in imitation mode.",
            deep: [
                {
                    category: "NAMEPLAY",
                    text: "Ed is a direct Richard Edwards deconstruction: 'get rich off your Ed, go for(wards)' compresses Rich(ard) / Ed / Edwards into one theft-and-growth confession."
                },
                {
                    category: "EXIT CLAUSE",
                    text: "The command 'go forwards' softens the theft angle by adding a developmental requirement: borrow, then diverge."
                }
            ]
        }
    },
    {
        lyric: "Nuclear homes gauzy red on they foyer",
        override: {
            deep: [
                {
                    category: "BAND NAME SHARD",
                    text: "Nuclear is likely a fragment of 'Margot and the Nuclear So and So's' repurposed as domestic atmosphere."
                },
                {
                    category: "DOMESTIC APOCALYPSE",
                    text: "The foyer image turns ordinary home space into a fallout zone, keeping the borrowed-fire theme intact."
                }
            ]
        }
    },
    {
        lyric: "Secular tomes misled by the lawyers",
        override: {
            surface: "He distrusts official knowledge once legal framing and institutional power intervene.",
            deep: [
                {
                    category: "TEXT AUTHORITY SKEPTICISM",
                    text: "Secular tomes are treated as contestable, not neutral repositories of truth."
                },
                {
                    category: "LEGAL MEDIATION",
                    text: "Lawyer language marks how interpretation gets rerouted by power, contracts, and incentives."
                }
            ]
        }
    },
    {
        lyric: "Lazy bones with a sleeping disorder",
        override: {
            surface: "The phrase doubles as self-diagnosis and likely title echo.",
            deep: [
                {
                    category: "TRACK ECHO",
                    text: "Lazy most plausibly mirrors the Margot track title, recoded into personal burnout language."
                },
                {
                    category: "DEFENSIVE HUMOR",
                    text: "He reframes moral failure ('lazy') as condition ('sleeping disorder'), protecting ego while admitting dysfunction."
                }
            ]
        }
    },
    {
        lyric: "To get fed, leach off your orchard / One reach for a peach, leaves you tortured",
        override: {
            surface: "Nourishment is framed as morally compromised borrowing that carries immediate consequence.",
            deep: [
                {
                    category: "AGRARIAN EXTRACTION METAPHOR",
                    text: "Orchard/peach imagery turns influence-taking into farm-theft logic: feeding yourself can still injure trust ecology."
                },
                {
                    category: "COST OF BORROWING",
                    text: "Reach-for-peach to tortured chain states the track's core tax: shortcut appetite produces delayed pain."
                }
            ]
        }
    },
    {
        lyric: "Can't teach what they preachin' to choirs / A speech to impeach what the scores heard",
        override: {
            surface: "He rejects closed-loop preaching and switches to adversarial rhetorical correction.",
            deep: [
                {
                    category: "PREACHING CRITIQUE",
                    text: "Preach-to-choirs line targets echo-chamber pedagogy where no transformation is possible."
                },
                {
                    category: "PUBLIC CHALLENGE MODE",
                    text: "Impeach language reframes the verse as accountability speech against inherited scoring systems."
                }
            ]
        }
    },
    {
        lyric: "The beach, a bird's screech, the shore's blurred",
        override: {
            deep: [
                {
                    category: "PRE-TRIGGER",
                    text: "Beach imagery preloads the next explicit 'Freud on the Beach' citation, making the transition intentional instead of accidental."
                }
            ]
        }
    },
    {
        lyric: "My bro, git paid break molds and disappear / Cuz, your make ain't gon work for your peer",
        override: {
            surface: "The line reads like hard career advice: stop conforming to peer taste and build a self-sustaining lane.",
            deep: [
                {
                    category: "TITLE FLIP",
                    text: "Git paid strongly aligns with Richard Edwards' track title, then gets repurposed as survival instruction."
                },
                {
                    category: "INDIVIDUATION",
                    text: "Break molds marks the track's central tension: remain inspired by idols but stop composing for approval."
                }
            ]
        }
    },
    {
        lyric: "Every time you avoid what you reach / Thoughts lurkin' like it's Freud on the Beach",
        override: {
            surface: "Avoidance triggers return of the repressed, framed as an overt song-title callback.",
            deep: [
                {
                    category: "DIRECT INTERTEXT",
                    text: "Freud on the Beach is cited nearly verbatim, shifting the line from vague psychology to catalog-specific allusion."
                },
                {
                    category: "PSYCHOANALYTIC LOOP",
                    text: "The bar says suppression does not erase desire; it changes where and how it resurfaces."
                }
            ]
        }
    },
    {
        lyric: "I'd tick and I'd talk till I'm losing my sleep / Pick at my locks like a Skeleton key",
        override: {
            surface: "Insomnia and obsessive self-unlocking are fused into a single pressure loop.",
            deep: [
                {
                    category: "DIRECT INTERTEXT",
                    text: "Skeleton key reads as a clear lift from Margot catalog language, used here as shortcut fantasy for emotional access."
                },
                {
                    category: "CONTROL COMPULSION",
                    text: "Picking locks implies forced entry into blocked states, matching the song's repeated impatience with gradual growth."
                }
            ]
        }
    },
    {
        lyric: "I'd flick at her frock like I've somewhere to be / Cuz I stick to the wok like I ran outta ghee",
        override: {
            surface: "The line contrasts performative social distance with repetitive practical labor anchoring.",
            deep: [
                {
                    category: "STYLE VS LABOR SPLIT",
                    text: "Frock/flick performs cool detachment while wok/ghee grounds him in material routine and resource scarcity."
                },
                {
                    category: "DOMESTIC REALISM",
                    text: "Kitchen image cuts against abstract persona velocity, pulling the verse back to lived maintenance."
                }
            ]
        }
    },
    {
        lyric: "Hook and craft sections repeat in full",
        override: {
            surface: "The song closes by replaying modules instead of adding a fresh resolution section.",
            deep: [
                {
                    category: "FORMAL LOOP CONFESSION",
                    text: "The repeated structure proves the thesis in form: influence panic and craft compulsion recur even after insight."
                },
                {
                    category: "NO-CATHARSIS ENDING",
                    text: "Ending with repetition rather than breakthrough keeps the narrative in active debt mode."
                }
            ]
        }
    }
];

const BROADRIPPLE_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.96,
    unknowns: [
        "Whether every proper noun is intentional citation versus occasional phonetic opportunism.",
        "Whether Sybil is intended as strict single-source citation or broader fragmented-identity shorthand."
    ],
    sources: [
        {
            claim: "Luddy is a literal Indiana University Luddy reference rooted in the artist's lived timeline.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Ed line is a deliberate Richard Edwards name deconstruction ('Rich(ard)/Ed/for(wards)').",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Margot-to-Mars line encodes weed use and wasted-potential drift while also invoking Margot naming lineage.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "The track title callback to 'Broadripple Is Burning' is explicit and central to the opening bar.",
            source_type: "primary",
            reference: "Richard Edwards Bandcamp - Broadripple Is Burning",
            reliability: "high",
            url: "https://richardedwards.bandcamp.com/track/broadripple-is-burning-live-bailiff"
        },
        {
            claim: "'Freud on the Beach' appears as a named track and lyric phrase in Richard Edwards-era catalog material.",
            source_type: "primary",
            reference: "Richard Edwards Bandcamp - Freud on the Beach",
            reliability: "high",
            url: "https://richardedwards.bandcamp.com/track/freud-on-the-beach-live-bailiff"
        },
        {
            claim: "'Skeleton Key' exists as a Margot and the Nuclear So and So's track credit in official catalog pages.",
            source_type: "primary",
            reference: "Richard Edwards Bandcamp - Skeleton Key",
            reliability: "high",
            url: "https://richardedwards.bandcamp.com/track/skeleton-key-margot-and-the-nuclear-so-and-sos"
        },
        {
            claim: "'Lazy' appears as an official Margot track listing.",
            source_type: "primary",
            reference: "Richard Edwards Bandcamp - Lazy",
            reliability: "high",
            url: "https://richardedwards.bandcamp.com/track/lazy"
        },
        {
            claim: "'Git Paid' appears in Richard Edwards catalog, supporting the 'git paid' line as probable deliberate title play.",
            source_type: "primary",
            reference: "Richard Edwards Bandcamp - Git Paid",
            reliability: "high",
            url: "https://richardedwards.bandcamp.com/track/git-paid"
        },
        {
            claim: "Richard Edwards is documented as songwriter/vocalist associated with Margot and the Nuclear So and So's.",
            source_type: "secondary",
            reference: "Wikipedia - Margot & the Nuclear So and So's",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Margot_%26_the_Nuclear_So_and_So%27s"
        },
        {
            claim: "'Broadripple Is Burning' is listed with 2008-era release metadata tied to Not Animal cycle listings.",
            source_type: "secondary",
            reference: "Amazon Music metadata page",
            reliability: "medium",
            url: "https://www.amazon.com/Broadripple-Burning-Margot-Nuclear-So-Sos/dp/B0013U4BGQ"
        },
        {
            claim: "Internal archive notes mark Moloch language as sacrificial machine-anxiety linked to AI-output dread.",
            source_type: "primary",
            reference: "02_Broadripple_Analysis.js local notes",
            reliability: "high"
        },
        {
            claim: "Internal archive notes interpret orchard/peach lines as agrarian theft metaphor with consequence.",
            source_type: "primary",
            reference: "02_Broadripple_Analysis.js local notes",
            reliability: "high"
        },
        {
            claim: "Sybil reference is commonly associated with split/fragmented personality narratives in popular culture.",
            source_type: "secondary",
            reference: "Wikipedia - Sybil (Schreiber book)",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Sybil_(Schreiber_book)"
        }
    ]
};

function applyNodeOverrides(
    nodes: DeepAnalysis['nodes'],
    overrides: LyricNodeOverride[]
): DeepAnalysis['nodes'] {
    const lookup = new Map<string, NodeOverride>();
    for (const item of overrides) {
        lookup.set(normalize(item.lyric), item.override);
    }

    return nodes.map((node) => {
        const override = lookup.get(normalize(node.lyric));
        if (!override) return node;

        return {
            ...node,
            surface: override.surface ?? node.surface,
            deep: override.deep ?? node.deep
        };
    });
}

function appendMissingNodes(
    nodes: DeepAnalysis['nodes'],
    additions: NodeAddition[]
): DeepAnalysis['nodes'] {
    const existing = new Set(nodes.map((node) => normalize(node.lyric)));
    const out = [...nodes];

    for (const addition of additions) {
        const key = normalize(addition.lyric);
        if (existing.has(key)) continue;
        out.push({
            lyric: addition.lyric,
            surface: addition.surface,
            deep: addition.deep
        });
        existing.add(key);
    }

    return out;
}

function applyVictorOverride(base: DeepAnalysis): DeepAnalysis {
    return {
        ...base,
        meta: {
            ...base.meta,
            title: "VICTOR (Director Shell)",
            track_number: 1,
            role: "Persona Construction / Outsider Breakthrough Thesis",
            key_context: "Album opener where cinematic self-direction, philosophical rebuild logic, and tactical movement language forge the Victor shell under gatekeeping pressure.",
            emotional_valence: "Controlled, ambitious, and defensive"
        },
        research: VICTOR_RESEARCH,
        nodes: applyNodeOverrides(base.nodes, VICTOR_NODE_OVERRIDES),
        victor_critique: {
            strengths: [
                "Opener now carries explicit multi-domain anchors (film, optics, philosophy, strategy) rather than one-line decoding.",
                "Greyson callback remains specific while the larger director-mask architecture is clearer.",
                "Identity rebuild and tactical movement bars now connect directly to downstream album control/mobility motifs."
            ],
            gaps: [
                "Some first-track bars still carry dense persona syntax that benefits from optional annotation mode.",
                "A few references remain intentionally compressed and cannot be fully externalized without over-reading."
            ],
            next_pass_focus: "Add section chips showing opener progression: director mask -> distortion lens -> identity rebuild -> tactical exposure."
        }
    };
}

function applyBroadrippleOverride(base: DeepAnalysis): DeepAnalysis {
    return {
        ...base,
        meta: {
            ...base.meta,
            title: "Broadripple (Borrowed Fire)",
            role: "Imitation Panic / Reference Debt Audit",
            key_context: "The second track converts admiration into open citation, then interrogates the cost of stylistic borrowing in public.",
            emotional_valence: "Manic, derivative-aware, and self-indicting"
        },
        research: BROADRIPPLE_RESEARCH,
        nodes: applyNodeOverrides(base.nodes, BROADRIPPLE_NODE_OVERRIDES),
        victor_critique: {
            strengths: [
                "Reference mapping now names specific catalog anchors instead of vague 'influence' language.",
                "Multiple allusions are tagged as probable vs certain, reducing overclaim risk.",
                "The song's theft-vs-growth thesis is now explicit at line level.",
                "Early-verse Sybil/Moloch/craft-stack lines now have explicit interpretive anchors."
            ],
            gaps: [
                "Some local references remain artist-context dependent and cannot be fully verified externally.",
                "A few bars still support multiple read paths, especially where wordplay outruns syntax."
            ],
            next_pass_focus: "Add section chips for movement: omen/collapse -> citation debt -> extraction tax -> insomnia lock-picking."
        }
    };
}

const RUMDRUM_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "The Rum Drum / A nightly conundrum / To sleep? Or hear the creepin' beat",
        override: {
            surface: "The opener states the governing dilemma: rest versus compulsion rhythm.",
            deep: [
                {
                    category: "THESIS LINE",
                    text: "Nightly conundrum frames the whole track as repeated decision architecture, not one bad evening."
                },
                {
                    category: "SOMATIC CLOCK",
                    text: "Creepin' beat ties drum image to bodily anxiety timing, setting the pulse-language used throughout."
                }
            ]
        }
    },
    {
        lyric: "Ra puh puh pum, rah puh puh pum pum",
        override: {
            surface: "The refrain borrows holiday-drum phonetics and turns them into panic percussion.",
            deep: [
                {
                    category: "DIRECT INTERTEXT",
                    text: "The syllabic shape mirrors the 'Little Drummer Boy' refrain ('pa rum pum pum pum'), but the devotional mood is replaced with insomnia."
                },
                {
                    category: "CONTEXT INVERSION",
                    text: "A Christmas-canon cadence gets redeployed for working-class survival rhythm: no nativity peace, just repetitive stress."
                }
            ]
        }
    },
    {
        lyric: "A glum alum... incomes a sum that's deemed a pitiful checksum",
        override: {
            surface: "Credential status and income reality are collapsed into one failed-balance computation.",
            deep: [
                {
                    category: "LABOR MATH",
                    text: "Glum alum and pitiful checksum language turns post-school outcome into verification failure."
                },
                {
                    category: "DATAFRAME SELF-IMAGE",
                    text: "Checksum metaphor implies his life ledger doesn't pass integrity check under current conditions."
                }
            ]
        }
    },
    {
        lyric: "Master of scrum... check some applications",
        override: {
            surface: "He toggles between agile-work competence and job-market desperation in one breath.",
            deep: [
                {
                    category: "WORKPLACE REGISTER",
                    text: "Scrum language points at structured team workflow, implying he knows professional process even while unemployed or unstable."
                },
                {
                    category: "PHONETIC PUN",
                    text: "'Scrum / check some' compresses office ritual and application grind into one recursive loop."
                }
            ]
        }
    },
    {
        lyric: "Troublesome Macbeth... fear thy nature",
        override: {
            surface: "He casts his own ambition as tragic risk through a Lady Macbeth echo.",
            deep: [
                {
                    category: "SHAKESPEAREAN ECHO",
                    text: "The phrase tracks Lady Macbeth's 'Yet do I fear thy nature' anxiety about whether desire can execute what it imagines."
                },
                {
                    category: "SELF-INDICTMENT",
                    text: "He is not just blaming the market; he is wary of his own appetite, impulses, and moral compromise."
                }
            ]
        }
    },
    {
        lyric: "Cover letter clever, but the cover's never read",
        override: {
            surface: "He documents application labor as one-way output into institutional silence.",
            deep: [
                {
                    category: "HIRING FUNNEL FRICTION",
                    text: "Cover/header/HR stack shows bureaucratic filtering as repetitive non-response rather than merit progression."
                }
            ]
        }
    },
    {
        lyric: "Hover over headers, HR hovers 'we'll get back' - they never",
        override: {
            surface: "Institutional reply language becomes a loop of deferred resolution.",
            deep: [
                {
                    category: "PROMISE EROSION",
                    text: "We'll get back repeated as never frames hope decay through procedural delay."
                }
            ]
        }
    },
    {
        lyric: "CSV of CVs - see me seep beneath the streets",
        override: {
            surface: "Resume identity gets flattened into machine-ingestible rows.",
            deep: [
                {
                    category: "FORMAT REFERENCE",
                    text: "CSV language treats employability as comma-separated metadata, reducing lived complexity to sortable columns."
                },
                {
                    category: "ERASURE MECHANIC",
                    text: "The move from CV to CSV marks depersonalization: he becomes data before he becomes a person to any reviewer."
                }
            ]
        }
    },
    {
        lyric: "'Apply, reply, deny'... busking off the sidewalk's edge",
        override: {
            surface: "The process is reduced to a brutal triad where formal channels fail and public hustle fills the gap.",
            deep: [
                {
                    category: "PROCESS TRIPLET",
                    text: "Apply/reply/deny compresses months of labor into a cyclical status loop."
                },
                {
                    category: "ECONOMIC FALLBACK",
                    text: "Busking image marks forced adaptability when institutional pathways stall."
                }
            ]
        }
    },
    {
        lyric: "Netflix and elixirs... CVS receipt of mixers... lime and bitters",
        override: {
            surface: "Brand names and purchase details map coping as a retail habit loop.",
            deep: [
                {
                    category: "BRAND STACK",
                    text: "Netflix and CVS references keep the verse in everyday American infrastructure rather than abstract tragedy."
                },
                {
                    category: "LEDGER AESTHETIC",
                    text: "Receipt language extends the song's accounting motif: comfort, sedation, and expense are entered in the same book."
                }
            ]
        }
    },
    {
        lyric: "A marching snare of setbacks, still he takes the role to dance",
        override: {
            surface: "The close reframes persistence as reluctant performance under repeated losses.",
            deep: [
                {
                    category: "ENDURANCE CLOSER",
                    text: "Marching snare keeps the militarized tempo while dance signals agency preserved inside compulsion."
                }
            ]
        }
    }
];

const RUMDRUM_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.96,
    unknowns: [
        "Whether the Macbeth line is a conscious quotation versus absorbed cultural phrase memory.",
        "How autobiographical the consumer-brand sequence is compared with narrative persona construction.",
        "How literally to map busking fallback lines versus symbolic labor-precarity framing."
    ],
    sources: [
        {
            claim: "'Master of scrum' is autobiographical and part of the album's real tech-work thread.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "The repeated drum phrase aligns with the canonical 'Little Drummer Boy' refrain structure.",
            source_type: "secondary",
            reference: "Wikipedia - The Little Drummer Boy",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/The_Little_Drummer_Boy"
        },
        {
            claim: "Lady Macbeth says 'Yet do I fear thy nature,' supporting the line's Shakespearean echo.",
            source_type: "primary",
            reference: "Internet Shakespeare Editions - Macbeth 1.5",
            reliability: "high",
            url: "https://internetshakespeare.uvic.ca/doc/Mac_F1/scene/1.5/index.html"
        },
        {
            claim: "Scrum is a defined framework for team development workflow, grounding the 'master of scrum' usage.",
            source_type: "primary",
            reference: "The Scrum Guide (official)",
            reliability: "high",
            url: "https://scrumguides.org/"
        },
        {
            claim: "CSV is a documented text-file tabular exchange format, matching the bar's data-identity metaphor.",
            source_type: "primary",
            reference: "IETF RFC 4180",
            reliability: "high",
            url: "https://www.ietf.org/rfc/rfc4180.txt"
        },
        {
            claim: "CVS is a large U.S. pharmacy retail chain, fitting the line's domestic errand-and-coping setting.",
            source_type: "secondary",
            reference: "Wikipedia - CVS Pharmacy",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/CVS_Pharmacy"
        },
        {
            claim: "Busking denotes public street performance for money, supporting the fallback-economy reading of the line.",
            source_type: "secondary",
            reference: "Wikipedia - Busking",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Busking"
        },
        {
            claim: "Adjunct labor framing aligns with contingent academic work structures present in the mid-verse bars.",
            source_type: "secondary",
            reference: "Wikipedia - Adjunct professor",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Adjunct_professor"
        }
    ]
};

function applyRumdrumOverride(base: DeepAnalysis): DeepAnalysis {
    return {
        ...base,
        meta: {
            ...base.meta,
            title: "The Rum Drum (Night Shift Ledger)",
            role: "Insomnia Loop / Administrative Survival Rhythm",
            key_context: "A repetition-driven track where job applications, small vices, and phone-scroll rituals replace sleep architecture.",
            emotional_valence: "Exhausted, self-mocking, and stubbornly operational"
        },
        research: RUMDRUM_RESEARCH,
        nodes: applyNodeOverrides(base.nodes, RUMDRUM_NODE_OVERRIDES),
        victor_critique: {
            strengths: [
                "Reference anchors are now explicit (Little Drummer Boy, Macbeth, Scrum, CSV) instead of implied.",
                "The track opener and closer now bracket the loop with clear thesis and endurance framing.",
                "The track's accounting language is tied to recognizable technical and literary systems.",
                "Surface and deep layers now better match the song's class-pressure narrative."
            ],
            gaps: [
                "Some branded details may be atmospheric rather than deliberate allusion targets.",
                "A few internal phrases remain semantically elastic by design."
            ],
            next_pass_focus: "Add section chips for loop phases: conundrum -> admin funnel -> fallback hustle -> ritual coping -> stubborn dance."
        }
    };
}

const MONUMENTAL_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "Mushrooms in the meadow / There's mushrooms growing in the meadow",
        override: {
            surface: "The hook introduces organic spread imagery before the social-pressure catalog begins.",
            deep: [
                {
                    category: "GROWTH MOTIF",
                    text: "Mushroom repetition works as propagation cue: pressure conditions create rapid, hard-to-contain outcomes."
                },
                {
                    category: "HOOK FUNCTION",
                    text: "The chant frames the track as environmental diagnosis, not only personal complaint."
                }
            ]
        }
    },
    {
        lyric: "City full ah' Pinnocios, no room for Gipetto",
        override: {
            surface: "He describes a social field full of performative figures with too few actual makers.",
            deep: [
                {
                    category: "FAIRYTALE INTERTEXT",
                    text: "Pinocchio and Geppetto are used as shorthand for the lie-maker split: many puppets, few accountable creators."
                },
                {
                    category: "CREATOR SCARCITY",
                    text: "The bar critiques environments where imitation outnumbers stewardship and craft responsibility."
                }
            ]
        }
    },
    {
        lyric: "Jokey hoes up in the ghetto, and the Pocanos",
        override: {
            surface: "He yokes distant social geographies into one spectacle-heavy field.",
            deep: [
                {
                    category: "REGIONAL REFERENCE",
                    text: "Pocanos is most plausibly Poconos shorthand, bringing leisure-region imagery into the same line as urban precarity."
                },
                {
                    category: "CLASS COLLISION",
                    text: "The bar collapses resort and ghetto registers to claim both spaces are shaped by performance and extraction."
                }
            ]
        }
    },
    {
        lyric: "Spin blocks like gyroscopes, kinda Foucault seemin'",
        override: {
            surface: "He frames motion and social navigation through scientific reference language.",
            deep: [
                {
                    category: "DUAL FOUCAULT PLAY",
                    text: "The line is intentionally double-coded: Leon Foucault (rotation/gyroscope science) and Michel Foucault (discipline/power structures) are both active in the bar."
                },
                {
                    category: "MECHANICS + POWER",
                    text: "This dual read mirrors the track's thesis: physical pressure systems and social control systems are treated as one apparatus."
                }
            ]
        }
    },
    {
        lyric: "I steer by measured schemin' Denis Papin",
        override: {
            surface: "He uses early pressure-engine history as a metaphor for controlled intensity.",
            deep: [
                {
                    category: "ENGINEERING LINEAGE",
                    text: "Denis Papin's pressure-vessel work reinforces the track's cooker/steam motif: force must be contained and directed, not denied."
                },
                {
                    category: "CONTROL ETHIC",
                    text: "Measured scheming marks strategy under heat, not random aggression."
                }
            ]
        }
    },
    {
        lyric: "Third time this week no Witcher",
        override: {
            surface: "No fantasy protagonist arrives to solve recurring danger.",
            deep: [
                {
                    category: "DOUBLE PLAY",
                    text: "Witcher works as a game-reference nod (especially Witcher 3's mainstream frame) and as a witches-disappearance echo about vulnerable kids not being saved."
                },
                {
                    category: "REALISM CHECK",
                    text: "The line punctures prior grandiosity by admitting repetitive, unresolved threat conditions."
                }
            ]
        }
    },
    {
        lyric: "a child ah' get take off the street like a picture",
        override: {
            surface: "Child-vulnerability is presented as abrupt, repeatable disappearance risk.",
            deep: [
                {
                    category: "THREAT CONTINUUM",
                    text: "Placed after 'no Witcher,' the line stresses repeated unprotected risk in public space."
                }
            ]
        }
    },
    {
        lyric: "Or a pitcher off the counter with the lime and the bitters",
        override: {
            surface: "Domestic spill imagery continues the instability pattern at household scale.",
            deep: [
                {
                    category: "SCALE COLLAPSE",
                    text: "Street harm and kitchen breakage are linked to show one unstable environment spanning public and private life."
                }
            ]
        }
    },
    {
        lyric: "Uncle Sam took ya baby, ya ain't had nah babysitter",
        override: {
            surface: "State power is personified as extractor rather than guardian.",
            deep: [
                {
                    category: "NATIONAL SYMBOL FLIP",
                    text: "Uncle Sam is inverted from recruitment emblem to predatory caretaker figure."
                },
                {
                    category: "CARE VACUUM",
                    text: "The babysitter clause emphasizes institutional taking without replacement support."
                }
            ]
        }
    },
    {
        lyric: "Ya sick of all the critters watch em jitter pon ya twitter",
        override: {
            surface: "He renders platform noise as swarming infestation.",
            deep: [
                {
                    category: "PLATFORM REFERENCE",
                    text: "Twitter is treated as a volatility amplifier where anxious micro-reactions replace durable discourse."
                },
                {
                    category: "ATTENTION EROSION",
                    text: "Critter/jitter phonetics perform nervous feed-scrolling in real time."
                }
            ]
        }
    },
    {
        lyric: "Call the plug like ah' socket and he ah' sell you a hitter",
        override: {
            surface: "Infrastructure language is flipped into dependency access: the fix is wired into daily survival routine.",
            deep: [
                {
                    category: "DEPENDENCY INFRASTRUCTURE",
                    text: "Plug/socket wordplay ties market relief to electrical immediacy and compulsion."
                }
            ]
        }
    },
    {
        lyric: "Mind bending like steel from the strain steady rockin' on ya neuro transmitter",
        override: {
            surface: "Psychological stress is rendered as material deformation and neural signal overload.",
            deep: [
                {
                    category: "NEURO-MECHANICAL BLEND",
                    text: "Steel strain and neurotransmitter language merge body, mind, and machine pressure into one stress model."
                }
            ]
        }
    },
    {
        lyric: "But they curse how ya live like the letters, and work you like a burro watch you give all ya paper to the debtors",
        override: {
            surface: "The track lands on labor extraction: stigmatize, overwork, then collect.",
            deep: [
                {
                    category: "DEBT LABOR FRAME",
                    text: "Burro image casts the subject as pack animal in a debt-delivery economy."
                },
                {
                    category: "SYSTEM OUTCOME",
                    text: "Paper-to-debtors line resolves the song's pressure map into concrete resource transfer upward."
                }
            ]
        }
    }
];

const MONUMENTAL_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.96,
    unknowns: [
        "Whether 'Uncle Sam' is aimed at taxation, military extraction, or broader state bureaucracy.",
        "How literal the mushroom hook should be read versus atmospheric propagation motif."
    ],
    sources: [
        {
            claim: "Foucault usage is intentionally both Leon and Michel in one wordplay layer.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "'No Witcher' intentionally blends Witcher 3 popularity with witches/kids-disappearing connotations.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Pinocchio and Geppetto are canonical puppet/creator figures from Collodi's story tradition.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - The Adventures of Pinocchio",
            reliability: "high",
            url: "https://www.britannica.com/topic/The-Adventures-of-Pinocchio"
        },
        {
            claim: "Leon Foucault is directly tied to gyroscope and Earth-rotation demonstration history.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Leon Foucault",
            reliability: "high",
            url: "https://www.britannica.com/biography/Leon-Foucault"
        },
        {
            claim: "Gyroscope history references Foucault as the namer/developer in rotational instrumentation context.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - gyroscope",
            reliability: "high",
            url: "https://www.britannica.com/technology/gyroscope"
        },
        {
            claim: "Denis Papin's pressure-vessel and steam work supports the pressure-cooker metaphor language.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Denis Papin",
            reliability: "high",
            url: "https://www.britannica.com/biography/Denis-Papin"
        },
        {
            claim: "The Poconos are a mountain region associated with resort/leisure branding, supporting the line's class-geography contrast.",
            source_type: "secondary",
            reference: "Wikipedia - Pocono Mountains",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Pocono_Mountains"
        },
        {
            claim: "Uncle Sam is a U.S. national personification tied to state messaging and recruitment imagery.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Uncle Sam",
            reliability: "high",
            url: "https://www.britannica.com/topic/Uncle-Sam"
        },
        {
            claim: "The Witcher 3 is the franchise's breakout mainstream title, supporting the deliberate game-layer in the lyric.",
            source_type: "secondary",
            reference: "Wikipedia - The Witcher 3: Wild Hunt",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/The_Witcher_3:_Wild_Hunt"
        },
        {
            claim: "Neurotransmitters are chemical signaling agents in nervous-system communication, supporting the neuro-transmitter stress line.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - neurotransmitter",
            reliability: "high",
            url: "https://www.britannica.com/science/neurotransmitter"
        },
        {
            claim: "Burro usage maps to donkey pack-labor imagery, fitting the extraction burden metaphor.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - donkey",
            reliability: "high",
            url: "https://www.britannica.com/animal/donkey"
        }
    ]
};

function applyMonumentalOverride(base: DeepAnalysis): DeepAnalysis {
    return {
        ...base,
        meta: {
            ...base.meta,
            title: "Monumental (Pressure Doctrine)",
            role: "Grandiosity Under Extraction / Structural Pressure Audit",
            key_context: "A chant-led confidence performance that keeps exposing state, debt, and platform systems grinding against personal will.",
            emotional_valence: "Boastful, surveilled, and structurally cornered"
        },
        research: MONUMENTAL_RESEARCH,
        nodes: applyNodeOverrides(base.nodes, MONUMENTAL_NODE_OVERRIDES),
        victor_critique: {
            strengths: [
                "Intertexts are now tied to concrete historical and literary anchors (Pinocchio, Foucault, Papin, Uncle Sam).",
                "Ambiguous references are explicitly labeled as multi-read rather than force-resolved.",
                "The pressure metaphor is now coherent across mechanics, body, and politics.",
                "Late-verse extraction outcomes (plug dependency, neural strain, debtor labor) are now explicit."
            ],
            gaps: [
                "Dialect-heavy bars still allow multiple semantic parses across listeners.",
                "Some references may function more as tonal tags than strict citation."
            ],
            next_pass_focus: "Add section chips for movement: chant ecology -> dual Foucault control -> no-rescue threat -> debt-extraction endpoint."
        }
    };
}

const COGSCI_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "I'll start relearning things",
        override: {
            surface: "The song starts with epistemic reset: prior certainty is treated as something to retrain.",
            deep: [
                {
                    category: "RETRAINING THESIS",
                    text: "Relearning language signals deliberate cognitive re-patterning, not just emotional venting."
                },
                {
                    category: "BEGINNER MIND MOVE",
                    text: "He re-enters his own knowledge as a novice, which matches the track's cycle-break agenda."
                }
            ]
        }
    },
    {
        lyric: "that I thought I knew",
        override: {
            surface: "Certainty itself is demoted from truth to revisable assumption.",
            deep: [
                {
                    category: "KNOWLEDGE REVISION",
                    text: "The line tightens the intervention: old conclusions are not denied, but reopened for correction."
                }
            ]
        }
    },
    {
        lyric: "Because lately, my way of thinking",
        override: {
            surface: "The conflict is cognitive patterning, not relationship drama.",
            deep: [
                {
                    category: "THESIS PIVOT",
                    text: "The line relocates the problem from external events to internal thought architecture."
                }
            ]
        }
    },
    {
        lyric: "leaves me stuck here with you / My way of thinking leaves me stuck here with you...",
        override: {
            surface: "He describes recurring thought style as the loop that blocks movement toward passion.",
            deep: [
                {
                    category: "CYCLE DIAGNOSIS",
                    text: "The repeated phrasing performs the loop it describes: cognition returning to the same attractor state."
                },
                {
                    category: "ARTIST NOTE CONTEXT",
                    text: "Per artist context, the track's focus is escaping repeated cycles that prevent pursuing his passion in Cog Sci."
                }
            ]
        }
    },
    {
        lyric: "Spending all my time just thinking bout you",
        override: {
            surface: "Time is consumed by recursive thought, with affection and fixation intentionally blurred.",
            deep: [
                {
                    category: "RUMINATION LOOP",
                    text: "Days-and-weeks phrasing marks extended perseveration rather than a fleeting emotional state."
                },
                {
                    category: "OBJECT SHIFT",
                    text: "The 'you' can be heard as person and discipline at once, preserving the track's romance-to-cognition transfer."
                }
            ]
        }
    },
    {
        lyric: "laying days and weeks just thinking about your love",
        override: {
            surface: "The duration marker extends the loop from mood into lifestyle timescale.",
            deep: [
                {
                    category: "TEMPORAL ACCUMULATION",
                    text: "Days-and-weeks framing confirms chronic perseveration rather than momentary obsession."
                }
            ]
        }
    },
    {
        lyric: "And I don't care what they say, about us, (Cog Sci)",
        override: {
            surface: "A romance template gets redirected into commitment to a field of study.",
            deep: [
                {
                    category: "FORM TRANSFER",
                    text: "Pop-love syntax is intentionally retained while the object is changed from person to discipline."
                }
            ]
        }
    },
    {
        lyric: "Don't you know? (Don't you know!) / Cog-sci, Cog-sci / Cog-sci",
        override: {
            surface: "The outro chant works as self-programming: repetition is used to reclaim direction from drift.",
            deep: [
                {
                    category: "CHANT MECHANICS",
                    text: "Call-and-response phrasing mimics internal coaching, making discipline commitment audible."
                },
                {
                    category: "CYCLE COUNTER",
                    text: "He uses repetition against repetition: mantra as antidote to rumination."
                }
            ]
        }
    }
];

const COGSCI_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.97,
    unknowns: [
        "Final rights-clearance paperwork for the sample remains outside this lyric-annotation pass."
    ],
    sources: [
        {
            claim: "The track's core intention is to change thinking patterns and escape cycles that block pursuit of Cog Sci.",
            source_type: "artist_note",
            reference: "User-provided production context (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "The intro before 'spending all my time just thinking...' derives from Huxlee (now Lou Roy) track '22'.",
            source_type: "artist_note",
            reference: "User-provided sampling note (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Preferred release-note credit wording is: contains sample from '22' by Huxlee (now Lou Roy).",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Lyrics repeatedly frame thought-pattern entrapment and redirect romantic phrasing toward Cog Sci.",
            source_type: "primary",
            reference: "03_Cog_sci_Lyrics.ts",
            reliability: "high"
        },
        {
            claim: "Rumination in psychology describes repetitive, passive focus loops, matching the days-and-weeks thinking bars.",
            source_type: "secondary",
            reference: "Wikipedia - Rumination (psychology)",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Rumination_(psychology)"
        },
        {
            claim: "Cognitive restructuring frameworks align with the song's relearning-and-repatterning language.",
            source_type: "secondary",
            reference: "Wikipedia - Cognitive restructuring",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Cognitive_restructuring"
        }
    ]
};

function applyCogsciOverride(base: DeepAnalysis): DeepAnalysis {
    return {
        ...base,
        meta: {
            ...base.meta,
            title: "Cog-sci (Cycle Break Sample)",
            role: "Cognitive Reframe / Passion Recovery Pivot",
            key_context: "A short hinge track that repurposes romance syntax to narrate changing thought patterns in order to pursue Cog Sci.",
            emotional_valence: "Anxious, self-observing, and committed to re-patterning"
        },
        research: COGSCI_RESEARCH,
        nodes: applyNodeOverrides(base.nodes, COGSCI_NODE_OVERRIDES),
        victor_critique: {
            strengths: [
                "Artist-intent context is now explicit instead of inferred.",
                "The cycle-breaking thesis is now visible at line level.",
                "Sample-origin note is preserved for future rights/publishing documentation.",
                "Relearning, rumination, and chant mechanics are now linked as one coherent intervention model."
            ],
            gaps: [
                "Final legal/clearance metadata is external to this annotation layer.",
                "Because the track is concise, thematic claims rely heavily on chorus interpretation."
            ],
            next_pass_focus: "Add a visual mini-sequence note: overload -> relearn -> rumination -> chant stabilization."
        }
    };
}

const EARNEST_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "It's hard to be earnest, when one hands in the furnace, / They burn us and learn us; demands that we flourish,",
        override: {
            surface: "The opening defines sincerity as costly under institutions that educate through injury.",
            deep: [
                {
                    category: "OPENING THESIS",
                    text: "Burn/learn pair sets the track's method: insight is produced through pressure, not comfort."
                },
                {
                    category: "INSTITUTIONAL HEAT",
                    text: "Furnace image frames social demand as high-temperature shaping process."
                }
            ]
        }
    },
    {
        lyric: "Every mystery that I solved helped me get through, / History will not absolve, it'll forget you,",
        override: {
            surface: "He flips revolutionary courtroom language into a warning about erasure through passivity.",
            deep: [
                {
                    category: "SLOGAN INVERSION",
                    text: "The bar rewrites a Che Guevara-autobiography opening frame into present-tense warning: this narrator expects forgetting, not vindication, unless he acts."
                },
                {
                    category: "URGENT AGENCY",
                    text: "Mystery-solving is treated as survival labor, but the line says private understanding is not enough without public movement."
                }
            ]
        }
    },
    {
        lyric: "I Bet you, missing shots never lobbed, like the Mets do, / Seems to me you been getting robbed of your best moves,",
        override: {
            surface: "He uses sports disappointment as a model for self-sabotage through hesitation.",
            deep: [
                {
                    category: "SPORTS REFERENCE",
                    text: "Mets mention functions as shorthand for talented but inconsistent execution under pressure."
                },
                {
                    category: "MISSED-ATTEMPT LOGIC",
                    text: "The key failure is unlobbbed shots: opportunities not attempted are treated as theft from the self."
                }
            ]
        }
    },
    {
        lyric: "So I mashed out my motives in the making of my melody, / I Crashed out on crodie, cruelly caking up my clemency,",
        override: {
            surface: "He admits escalation and relational collateral while building a sharper voice.",
            deep: [
                {
                    category: "SLANG REGISTER",
                    text: "Crodie is intentional Toronto slang in a Caribbean vernacular blend, indexing both neighborhood familiarity and social tension."
                },
                {
                    category: "MERCY WITHDRAWAL",
                    text: "Caking up my clemency signals he stopped extending grace once soft negotiation kept failing."
                }
            ]
        }
    },
    {
        lyric: "And Then I moved, I still remember when I met you, confessed you, you kissing me, / Revolver to my head, girl that December you was missing me,",
        override: {
            surface: "Intimacy and threat are held in one memory block, making attachment feel coercive and unstable.",
            deep: [
                {
                    category: "MEMORY SHOCK",
                    text: "The verse pairs confession and weapon-pressure imagery to show relational intensity as double-edged."
                },
                {
                    category: "TEMPORAL SCAR",
                    text: "December timestamp marks the scene as episodic trauma anchor, not generic sentiment."
                }
            ]
        }
    },
    {
        lyric: "You'd flip and flip and flip and flip and never try to stick it, / And all the lines your nose would find, could never find a picket,",
        override: {
            surface: "The line ties compulsive highs to inability to build stable life structures.",
            deep: [
                {
                    category: "SUBSTANCE IMAGE",
                    text: "Lines your nose would find most plausibly references powdered-drug use and repeated short-horizon relief seeking."
                },
                {
                    category: "STABILITY CONTRAST",
                    text: "Picket imagery introduces home/fence stability as the absent counterpart to compulsive line-seeking."
                }
            ]
        }
    },
    {
        lyric: "He reads the deeds of men as she depends on reeds and gripping fingers, / She leads him round bends of Venn diagrams, the breath in her diaphragm it lingers,",
        override: {
            surface: "Intellectual and embodied knowledges intersect instead of competing.",
            deep: [
                {
                    category: "KNOWLEDGE SYNTHESIS",
                    text: "Deeds/reeds pairing fuses document-history and craft-body intelligence."
                },
                {
                    category: "DIAGRAM REFERENCE",
                    text: "Venn imagery marks relational overlap as method: meaning emerges at intersections, not isolated domains."
                }
            ]
        }
    },
    {
        lyric: "That's when she'll meet a rhymer with a name like Carey, / He's a rap part timer, allergic to dairy,",
        override: {
            surface: "He re-enters the narrative by name, collapsing analyst voice and biographical self into one participant.",
            deep: [
                {
                    category: "SELF-INSERTION",
                    text: "Carey name-drop confirms the track as direct autobiographical intervention, not detached commentary."
                },
                {
                    category: "TONE BALANCE",
                    text: "Humor detail ('allergic to dairy') tempers severity without dissolving stakes."
                }
            ]
        }
    },
    {
        lyric: "A sorrow of a solemn kind / A sparrow in a blossom dined",
        override: {
            surface: "The closing couplet compresses grief and fragile vitality into one image cluster.",
            deep: [
                {
                    category: "LYRIC MINIATURE",
                    text: "Sorrow/sparrow pairing reduces scale to symbolic precision before the final rhetoric turn."
                }
            ]
        }
    },
    {
        lyric: "Tomorrow is in quantum time / A column signed on dotted line",
        override: {
            surface: "Future possibility is narrowed by contract reality.",
            deep: [
                {
                    category: "TIME VS CONTRACT",
                    text: "Quantum-time openness is immediately constrained by dotted-line obligation, matching the tracks freedom-versus-structure tension."
                }
            ]
        }
    },
    {
        lyric: "Meekly eeking out reliant rhetoric / defiant Frederick, Douglass",
        override: {
            surface: "He rejects timid speech and invokes abolitionist force as a rhetoric upgrade.",
            deep: [
                {
                    category: "HISTORICAL REFERENCE",
                    text: "Frederick Douglass serves as model for transforming private grievance into public, disciplined resistance language."
                },
                {
                    category: "VOICE TURN",
                    text: "The bar marks a tactical shift from reliant rhetoric to defiant address."
                }
            ]
        }
    }
];

const EARNEST_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.95,
    unknowns: [
        "How literally the relationship scenes map to single-person autobiography versus merged narrative roles.",
        "Preferred bibliographic edition details for the Jon Lee Anderson source chain remain to be finalized."
    ],
    sources: [
        {
            claim: "History line was lifted from the opening context of Che Guevara autobiography language and then reframed in-song.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Artist preference is to anchor the history-line note to a Jon Lee Anderson version/source chain.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Crodie usage is Toronto slang carried through Caribbean/Jamaican-Chinese speech context in the artist's lived register.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "The line explicitly inverts the historical slogan 'History Will Absolve Me.'",
            source_type: "secondary",
            reference: "Wikipedia - History Will Absolve Me",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/History_Will_Absolve_Me"
        },
        {
            claim: "Mets mention functions as sports-underperformance shorthand in mainstream U.S. culture.",
            source_type: "secondary",
            reference: "Wikipedia - New York Mets",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/New_York_Mets"
        },
        {
            claim: "Frederick Douglass is a valid abolitionist resistance reference anchor for the closing turn.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Frederick Douglass",
            reliability: "high",
            url: "https://www.britannica.com/biography/Frederick-Douglass"
        },
        {
            claim: "Venn diagram language supports the overlap/intersection reading in the relational section.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Venn diagram",
            reliability: "high",
            url: "https://www.britannica.com/topic/Venn-diagram"
        },
        {
            claim: "The song's opening and closing couplets frame pressure-learning and contractual constraint as paired themes.",
            source_type: "primary",
            reference: "08_Earnest_Reader_Analysis.js line structure",
            reliability: "high"
        },
        {
            claim: "Quantum-time wording in the lyric is best treated as figurative openness rather than strict physics claim.",
            source_type: "primary",
            reference: "08_Earnest_Reader_Analysis.js metaphor handling",
            reliability: "high"
        }
    ]
};

function applyEarnestOverride(base: DeepAnalysis): DeepAnalysis {
    return {
        ...base,
        meta: {
            ...base.meta,
            title: "Earnest Reader (Teeth and Tenderness)",
            track_number: 8,
            role: "Assertion Pivot / Relational Audit",
            key_context: "A flagship hinge where Carey rejects passive sincerity, audits a destructive bond, and tests a more reciprocal model of connection.",
            emotional_valence: "Critical, lonely, and increasingly assertive"
        },
        research: EARNEST_RESEARCH,
        nodes: applyNodeOverrides(base.nodes, EARNEST_NODE_OVERRIDES),
        victor_critique: {
            strengths: [
                "Major references now have explicit anchors (History Will Absolve Me, Mets, Frederick Douglass, Venn diagrams).",
                "The relational arc is clearer: coercive loop, rupture, then synthesis attempt.",
                "Closing rhetoric shift is now tied to concrete historical voice lineage.",
                "Opening furnace thesis and late couplet compression now give the track stronger structural spine."
            ],
            gaps: [
                "Some colloquial bars remain intentionally context-heavy and resist fully external verification."
            ],
            next_pass_focus: "Add section chips for progression: furnace thesis -> history warning -> rupture memory -> relational overlap -> defiant voice."
        }
    };
}

const BETTER_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "Getting lost in your eyes, watching the day turn to night.",
        override: {
            surface: "A gaze-event stretches into time-lapse, turning attention into a stabilizing temporal anchor.",
            deep: [
                {
                    category: "TEMPORAL DISSOLVE",
                    text: "Clock-time is replaced by attention-time; the line measures duration through focus rather than minutes."
                },
                {
                    category: "OPENING IMAGE",
                    text: "The first line sets the song's thesis: time passage can be felt as recovery rather than erosion."
                }
            ]
        }
    },
    {
        lyric: "It gets me every time... Every time.",
        override: {
            surface: "Repetition confirms the feeling is recurring and reliable, not a one-off event.",
            deep: [
                {
                    category: "MANTRA LOOP",
                    text: "The echoing cadence works like self-conditioning: each recurrence reaffirms that tenderness can still register."
                }
            ]
        }
    },
    {
        lyric: "I am better, from the mountains to the sea,",
        override: {
            surface: "He moves from relational image to self-affirmation across full landscape scale.",
            deep: [
                {
                    category: "AFFIRMATION GEOGRAPHY",
                    text: "Mountains-to-sea span signals endurance across extremes, reframing identity as resilient across changing terrain."
                }
            ]
        }
    },
    {
        lyric: "I see the vision even in the underneath.",
        override: {
            surface: "Clarity is claimed even beneath surface conditions.",
            deep: [
                {
                    category: "SUBSURFACE SIGHT",
                    text: "Underneath imagery ties vision to buried layers: confidence survives doubt, delay, and obscured states."
                }
            ]
        }
    }
];

const BETTER_NODE_ADDITIONS: NodeAddition[] = [
    {
        lyric: "Getting lost in your eyes, watching the day turn to night.",
        surface: "A gaze-event stretches into time-lapse, turning attention into a stabilizing temporal anchor.",
        deep: [
            {
                category: "TEMPORAL DISSOLVE",
                text: "Clock-time is replaced by attention-time; the line measures duration through focus rather than minutes."
            },
            {
                category: "OPENING IMAGE",
                text: "The first line sets the song's thesis: time passage can be felt as recovery rather than erosion."
            }
        ]
    },
    {
        lyric: "It gets me every time... Every time.",
        surface: "Repetition confirms the feeling is recurring and reliable, not a one-off event.",
        deep: [
            {
                category: "MANTRA LOOP",
                text: "The echoing cadence works like self-conditioning: each recurrence reaffirms that tenderness can still register."
            }
        ]
    },
    {
        lyric: "I am better, from the mountains to the sea,",
        surface: "He moves from relational image to self-affirmation across full landscape scale.",
        deep: [
            {
                category: "AFFIRMATION GEOGRAPHY",
                text: "Mountains-to-sea span signals endurance across extremes, reframing identity as resilient across changing terrain."
            }
        ]
    },
    {
        lyric: "I see the vision even in the underneath.",
        surface: "Clarity is claimed even beneath surface conditions.",
        deep: [
            {
                category: "SUBSURFACE SIGHT",
                text: "Underneath imagery ties vision to buried layers: confidence survives doubt, delay, and obscured states."
            }
        ]
    }
];

const BETTER_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.95,
    unknowns: [],
    sources: [
        {
            claim: "Full lyric is a short affirmation sequence about passage of time and betting on personal strength.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Canonical publication wording is 'I see the vision even in the underneath.'",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "The track opens with a day-to-night image then moves into repeated affirmation cadence and terrain-scale self-claim.",
            source_type: "primary",
            reference: "Track lyric payload + artist-confirmed line expansion",
            reliability: "high"
        },
        {
            claim: "Its album role reads as emotional aperture and confidence reset between denser sections.",
            source_type: "inferred",
            reference: "Sequence-function interpretation",
            reliability: "medium"
        }
    ]
};

function applyBetterOverride(base: DeepAnalysis): DeepAnalysis {
    return {
        ...base,
        meta: {
            ...base.meta,
            title: "The Better (Affirmation Aperture)",
            track_number: 9,
            role: "Affirmation Interlude / Temporal Recovery",
            key_context: "A short passage-of-time affirmation track that pivots from intimacy into self-bet language before the next pressure cycle.",
            emotional_valence: "Tender, resolved, and quietly confident"
        },
        research: BETTER_RESEARCH,
        nodes: appendMissingNodes(
            applyNodeOverrides(base.nodes, BETTER_NODE_OVERRIDES),
            BETTER_NODE_ADDITIONS
        ),
        victor_critique: {
            strengths: [
                "Track now reflects full artist-confirmed lyric scope instead of a one-line fragment.",
                "Affirmation thesis is explicit at line level (time passage, repetition, self-bet).",
                "Interlude function remains intact while carrying more narrative agency."
            ],
            gaps: [
                "Because the song is concise, annotation density should stay restrained to preserve pace."
            ],
            next_pass_focus: "Keep the pass lightweight and avoid over-annotating the interlude's affirmation clarity."
        }
    };
}

const MOMENTUM_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "Oh Momentum, Momentum of the moment, hmm?",
        override: {
            surface: "A self-trigger phrase where motion is generated by present attention rather than long planning.",
            deep: [
                {
                    category: "MANTRA ENGINE",
                    text: "The repetition functions like a vocal warmup loop that primes action before narrative detail."
                },
                {
                    category: "CHECKED CONFIDENCE",
                    text: "The closing 'hmm?' keeps the line from empty bravado and preserves reflective uncertainty."
                }
            ]
        }
    }
];

const MOMENTUM_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.91,
    unknowns: [
        "Whether this fragment is intentionally complete or designed as a bridge line into another section.",
        "What specific target state the invoked momentum is meant to reach."
    ],
    sources: [
        {
            claim: "Momentum in physics is forceful motion linked to mass and velocity, matching the song's acceleration language.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - momentum",
            reliability: "high",
            url: "https://www.britannica.com/science/momentum"
        },
        {
            claim: "The lyric's recursive structure performs incantatory priming rather than narrative exposition.",
            source_type: "primary",
            reference: "10_Momentum_Analysis.js line structure",
            reliability: "high"
        }
    ]
};

function applyMomentumOverride(base: DeepAnalysis): DeepAnalysis {
    return {
        ...base,
        meta: {
            ...base.meta,
            title: "Momentum (Ignition Fragment)",
            role: "Pre-Action Mantra / Kinetic Primer",
            key_context: "A micro-track that serves as ignition language between denser narrative chapters.",
            emotional_valence: "Manic, anticipatory, and self-priming"
        },
        research: MOMENTUM_RESEARCH,
        nodes: applyNodeOverrides(base.nodes, MOMENTUM_NODE_OVERRIDES),
        victor_critique: {
            strengths: [
                "Highly memorable mantra with strong transition utility.",
                "The line encodes action readiness with minimal text footprint."
            ],
            gaps: [
                "Narrative stakes remain underdefined in this isolated form.",
                "Interpretive depth depends on sequence context more than internal detail."
            ],
            next_pass_focus: "Pair with one adjacent cue line that names what momentum is pushing toward."
        }
    };
}

const KNEESOCKS_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "Lights on in afternoon, / Write songs on raft in light of moon",
        override: {
            surface: "A direct Arctic Monkeys interpolation anchor that reframes the original pose as drift-survival writing.",
            deep: [
                {
                    category: "INTERPOLATION ANCHOR",
                    text: "The title and opening image map to Arctic Monkeys' 'Knee Socks' atmosphere: blurred time, private room, and nocturnal intimacy."
                },
                {
                    category: "SCENE FUNCTION",
                    text: "The raft image reframes the same atmosphere as a self-rescue device: writing becomes buoyancy."
                }
            ]
        }
    },
    {
        lyric: "Stars craft and shift, / I kite and stalk like Hume / In sight I blink,",
        override: {
            surface: "He blends strategy-game mechanics with philosophical skepticism.",
            deep: [
                {
                    category: "GAME REFERENCE",
                    text: "Kite/stalk/blink aligns with StarCraft II micro language around Stalker repositioning and escape."
                },
                {
                    category: "PHILOSOPHY REFERENCE",
                    text: "Hume invokes causality doubt and empiricist self-questioning under pressure."
                }
            ]
        }
    },
    {
        lyric: "Disguised inside a tomb, a cowards Blume / Taxonomy",
        override: {
            surface: "He hides in analytic frameworks instead of crossing into action.",
            deep: [
                {
                    category: "PEDAGOGY REFERENCE",
                    text: "Bloom's Taxonomy is repurposed as a self-critique: classification without transformation."
                }
            ]
        }
    },
    {
        lyric: "You got them kneesocks and your TikTok's / Where you strut round like them peacocks,",
        override: {
            surface: "He reads the partner through performance culture first, attraction and judgment fused in one image.",
            deep: [
                {
                    category: "SOCIAL PERFORMANCE FRAME",
                    text: "TikTok and peacock language frame visibility as deliberate display, not neutral self-presentation."
                },
                {
                    category: "RELATIONAL TENSION",
                    text: "The line is not only critique; it marks fixation on image-signals he cannot dismiss."
                }
            ]
        }
    },
    {
        lyric: "My crops got cut down by some big glocks, / Annie when the sun down, it's Hard Knocks",
        override: {
            surface: "Loss and threat imagery cut into the romance frame through a street-to-musical collision.",
            deep: [
                {
                    category: "MUSICAL REFERENCE",
                    text: "Hard Knocks points to Annie's 'It's the Hard-Knock Life,' importing survival language from a canonical deprivation anthem."
                },
                {
                    category: "CONTRAST TECHNIQUE",
                    text: "Glock pressure next to Broadway reference creates deliberate tonal whiplash: spectacle and danger coexist."
                }
            ]
        }
    },
    {
        lyric: "In the slum words found em like Aesops / Going dumb on two birds with three rocks",
        override: {
            surface: "He frames street-learned language as fable logic, then pushes proverb math into excess.",
            deep: [
                {
                    category: "LITERARY REFERENCE",
                    text: "Aesop invocation positions the bar as moral compression: short form carrying survival lessons."
                },
                {
                    category: "PROVERB DISTORTION",
                    text: "Two birds with three rocks intentionally over-solves the idiom, signaling compulsive force over elegant efficiency."
                }
            ]
        }
    },
    {
        lyric: "It's Redrum Surround Sound down three blocks / Pound drums, well round, like knee socks",
        override: {
            surface: "Horror-cinema language is mapped onto urban acoustic reality.",
            deep: [
                {
                    category: "FILM REFERENCE",
                    text: "Redrum is a clear The Shining signal used to cast local threat as immersive psychological soundscape."
                },
                {
                    category: "MOTIF FUSION",
                    text: "Drum pulse and knee-socks image merge bodily rhythm with relational fixation, so threat and tenderness share one beat."
                }
            ]
        }
    },
    {
        lyric: "The air is thick, in chokes I fought breath, / A pair of clicks provokes my thoughts of death.",
        override: {
            surface: "Bridge section converts ambient sound into panic mechanics and mortality projection.",
            deep: [
                {
                    category: "TRIGGER CHAIN",
                    text: "The pair of clicks functions as hypervigilance cue where ordinary noise is reprocessed as immediate threat."
                },
                {
                    category: "ALBUM FORESHADOW",
                    text: "Click language also prefigures later lock/tick motifs, tying panic in this track to downstream maintenance-cycle songs."
                }
            ]
        }
    },
    {
        lyric: "A stairway sticks, the smoke, it caught my chest; / Despair persists, evoking what's repressed.",
        override: {
            surface: "Physical obstruction and respiratory stress become gateways for repressed material.",
            deep: [
                {
                    category: "SOMATIC MEMORY",
                    text: "Architecture and air quality trigger memory surge, binding body sensation to unresolved trauma recall."
                }
            ]
        }
    },
    {
        lyric: "You and me, coulda been a scene beneath the red-lit beams, / Mean Streets and skies, steam cries, cracked routines of our lies,",
        override: {
            surface: "The bridge recasts the relationship as urban cinema where beauty and damage are inseparable.",
            deep: [
                {
                    category: "FILM REFERENCE",
                    text: "Mean Streets (Scorsese) frames the couple as a gritty city narrative rather than a clean romance arc."
                },
                {
                    category: "BRIDGE PIVOT",
                    text: "The song moves from accusatory hook language into shared-scene language, softening stance without denying fracture."
                }
            ]
        }
    },
    {
        lyric: "hearts rewind, confined by fevered dreams designed. / Your knee socks high, the skyline split, slacked seams unwind",
        override: {
            surface: "The bridge closes on partial release: fixation remains, but panic tension loosens.",
            deep: [
                {
                    category: "INTEGRATION MOMENT",
                    text: "Knee socks shift from vanity symbol to comfort signal, marking a local reconciliation in perception."
                },
                {
                    category: "STRUCTURAL FUNCTION",
                    text: "Skyline split and seams unwind act as transition grammar into the next songs containment phase."
                }
            ]
        }
    }
];

const KNEESOCKS_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.95,
    unknowns: [
        "Whether all bridge cinematic cues were preplanned or partially emergent during later arrangement edits.",
        "Whether the 'pair of clicks' cue was authored specifically to foreshadow later lock/tick motifs or became legible only in sequence.",
        "How literally to read the scene language versus stylized composite memory."
    ],
    sources: [
        {
            claim: "The track is intentionally tied to Arctic Monkeys' 'Knee Socks' as a direct reference anchor.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Arctic Monkeys released 'Knee Socks' on AM, supporting the explicit title-level interpolation frame.",
            source_type: "secondary",
            reference: "Wikipedia - Knee Socks (song)",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Knee_Socks_(song)"
        },
        {
            claim: "Stalker/Blink references align with StarCraft II micro-control terminology used for hit-and-run positioning.",
            source_type: "secondary",
            reference: "Liquipedia - Stalker (Legacy of the Void)",
            reliability: "medium",
            url: "https://liquipedia.net/starcraft2/Stalker_(Legacy_of_the_Void)"
        },
        {
            claim: "David Hume reference supports the causality/skepticism layer in the strategy bars.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - David Hume",
            reliability: "high",
            url: "https://www.britannica.com/biography/David-Hume"
        },
        {
            claim: "Bloom's Taxonomy is a formal learning hierarchy, matching the lyric's analytic-self critique.",
            source_type: "secondary",
            reference: "Wikipedia - Bloom's taxonomy",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Bloom%27s_taxonomy"
        },
        {
            claim: "Hard Knocks language maps cleanly to Annie's 'It's the Hard-Knock Life' lexical system.",
            source_type: "secondary",
            reference: "Wikipedia - It's the Hard-Knock Life",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/It%27s_the_Hard-Knock_Life"
        },
        {
            claim: "Aesop references point to fable-style moral compression, supporting the line's proverb logic.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Aesop's fables",
            reliability: "high",
            url: "https://www.britannica.com/topic/Aesops-fables"
        },
        {
            claim: "Redrum is tied to The Shining lexicon.",
            source_type: "secondary",
            reference: "Wikipedia - The Shining (film)",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/The_Shining_(film)"
        },
        {
            claim: "Mean Streets is a canonical Scorsese urban-crime film, validating the bridge's cinematic city-language signal.",
            source_type: "secondary",
            reference: "Wikipedia - Mean Streets",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Mean_Streets"
        }
    ]
};

function applyKneesocksOverride(base: DeepAnalysis): DeepAnalysis {
    return {
        ...base,
        meta: {
            ...base.meta,
            title: "Knee Socks (Nocturnal Integration)",
            role: "Urban Romance / Strategy-Mind Convergence",
            key_context: "A layered sequence that opens in Arctic-derived cool, collapses into threat/panic cues, then rebuilds intimacy through a cinematic bridge.",
            emotional_valence: "Cynical, flooded, and intermittently tender"
        },
        research: KNEESOCKS_RESEARCH,
        nodes: applyNodeOverrides(base.nodes, KNEESOCKS_NODE_OVERRIDES),
        victor_critique: {
            strengths: [
                "Verse 1 reference clusters now surface explicitly (TikTok/Annie/Aesop/Redrum) instead of relying on reader inference.",
                "Bridge analysis now has clear cinematic and trauma-linked pivot logic rather than generic mood labeling.",
                "Refrain repetition is tracked as fixation architecture with progressive stance shift."
            ],
            gaps: [
                "Some phrase-level ambiguity remains intentional, especially in compressed idiom distortions.",
                "A few trigger lines still depend on sequence listening to feel their full narrative weight."
            ],
            next_pass_focus: "Add section tags in UI (interpolation -> hook threat -> bridge panic -> cinematic integration) to make progression legible at a glance."
        }
    };
}

const WORLD_JAR_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "Close my fist, round the base of the rocket / hands froze, must stay out they pockets / Twist wrists demand space, like a sprocket / My flows list pace, dem ah' add to the docket",
        override: {
            surface: "The opener fuses bodily clench, mechanical motion, and legal-administrative pressure into one control reflex.",
            deep: [
                {
                    category: "CONTROL GRIP",
                    text: "Closed fist and frozen hands establish the song's core motor pattern: clamp first, trust later."
                },
                {
                    category: "MECHANICAL-BUREAUCRATIC STACK",
                    text: "Rocket/sprocket/docket layering merges propulsion with procedure, implying movement can happen only through systems friction."
                }
            ]
        }
    },
    {
        lyric: "No space in the world for a star",
        override: {
            surface: "Ambition is denied at scale: the environment is declared structurally hostile to standout identity.",
            deep: [
                {
                    category: "SCARCITY DOCTRINE",
                    text: "The line reframes failure as spatial politics, not merely personal confidence collapse."
                }
            ]
        }
    },
    {
        lyric: "Lawn after lawn look compressed like a rar",
        override: {
            surface: "He interprets physical space as archived data under compression pressure.",
            deep: [
                {
                    category: "FILE FORMAT REFERENCE",
                    text: "RAR compression becomes the governing metaphor for reduced resolution social life."
                }
            ]
        }
    },
    {
        lyric: "Squeaks of ya sneaks tryna ball full court / Speaks of the sneaks tryna stall your fort",
        override: {
            surface: "Ambient cues are read as both basketball pressure and fortress threat.",
            deep: [
                {
                    category: "SPORT-SIEGE BLEND",
                    text: "Full-court language imports constant-pressure defense into a paranoia control frame."
                }
            ]
        }
    },
    {
        lyric: "Your girl talk in bars? She's a mirror, not face / Mans the weight of the world, no terror misplaced",
        override: {
            surface: "Relational perception turns reflective and defensive: the partner is treated as projection surface instead of autonomous subject.",
            deep: [
                {
                    category: "PROJECTION LOGIC",
                    text: "Mirror-not-face language shows narrator-centered interpretation dominating relational reality."
                },
                {
                    category: "BURDEN RATIONALIZATION",
                    text: "Weight-of-the-world framing is used to justify vigilance and escalating control posture."
                }
            ]
        }
    },
    {
        lyric: "Defaced by the chase... dominant gaze... compressed like a zip, the mass goes unraised",
        override: {
            surface: "The compression metaphor expands from file logic to social suppression.",
            deep: [
                {
                    category: "ZIP REFERENCE",
                    text: "ZIP compression is used to frame collective potential as archived but never fully extracted."
                }
            ]
        }
    },
    {
        lyric: "A world in a jar, sealed fast, no air to breathe / Eyes to the glass, view's make-believe",
        override: {
            surface: "Containment becomes literal suffocation: the worldview is preserved but no longer breathable.",
            deep: [
                {
                    category: "SEALED-SYSTEM IMAGE",
                    text: "Jar-and-glass framing turns environment into display enclosure where observation replaces participation."
                },
                {
                    category: "REALITY FILTER",
                    text: "Make-believe view marks epistemic distortion: control preserves certainty by reducing oxygen to complexity."
                }
            ]
        }
    },
    {
        lyric: "The rich sip champagne, the poor drown in fear / The girl in the bar? She's a ghost in veneer / Her tears drip stars... war crowned hosts leer",
        override: {
            surface: "Class stratification and relational estrangement are fused into the same spectacle frame.",
            deep: [
                {
                    category: "CLASS CONTRAST",
                    text: "Champagne-versus-fear split pushes the song from private paranoia into structural inequality language."
                },
                {
                    category: "VENEER GHOSTING",
                    text: "Ghost in veneer suggests emotional presence stripped into decorative surface under pressure."
                }
            ]
        }
    },
    {
        lyric: "Plans unfurl, marathon, not a race",
        override: {
            surface: "He briefly corrects manic tempo with endurance logic.",
            deep: [
                {
                    category: "PACE CORRECTION",
                    text: "The line interrupts compression panic with long-horizon pacing discipline."
                }
            ]
        }
    }
];

const WORLD_JAR_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.95,
    unknowns: [
        "Token-by-token normalization will follow house style rather than strict dialect-preservation constraints.",
        "Whether projection language is meant as self-accusation, partner critique, or both simultaneously."
    ],
    sources: [
        {
            claim: "Voice-markers were intentional but can be normalized in publication except for obvious Caribbean slang forms.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Artist leaves normalization choices largely editorial/discretionary for final public text.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "World in a Jar is the later relationship snapshot that follows Lender's earlier over-giving phase.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "RAR file format is a compression/archive standard, matching the lyric's compression metaphor.",
            source_type: "secondary",
            reference: "Wikipedia - RAR (file format)",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/RAR_(file_format)"
        },
        {
            claim: "ZIP file format extends the same archive/compression logic used in the track.",
            source_type: "secondary",
            reference: "Wikipedia - ZIP (file format)",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/ZIP_(file_format)"
        },
        {
            claim: "Full-court press terminology supports the song's relentless pressure framing.",
            source_type: "secondary",
            reference: "Wikipedia - Full-court press",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Full-court_press"
        },
        {
            claim: "Veneer concept supports surface-only social readability in the 'ghost in veneer' line cluster.",
            source_type: "secondary",
            reference: "Cambridge Dictionary - veneer",
            reliability: "high",
            url: "https://dictionary.cambridge.org/dictionary/english/veneer"
        }
    ]
};

function applyWorldJarOverride(base: DeepAnalysis): DeepAnalysis {
    return {
        ...base,
        meta: {
            ...base.meta,
            title: "World in a Jar (Compression Doctrine)",
            role: "Containment Spiral / Control Architecture",
            key_context: "A pressure-chamber track where overwhelm is managed through clench-and-compress logic, turning relationship, class tension, and perception into sealed systems.",
            emotional_valence: "Defiant, compressed, and surveillance-prone"
        },
        research: WORLD_JAR_RESEARCH,
        nodes: applyNodeOverrides(base.nodes, WORLD_JAR_NODE_OVERRIDES),
        victor_critique: {
            strengths: [
                "Compression metaphors now span body, file-format, and social-class domains with explicit anchors.",
                "Projection and containment dynamics are clearer at line level instead of implied through mood alone.",
                "Pace-correction line remains visible as intentional counterweight."
            ],
            gaps: [
                "Objectifying relational passages still risk flattening partner agency.",
                "Dense diction can obscure where paranoia ends and strategy begins."
            ],
            next_pass_focus: "Add one counter-voice annotation line to test mirror/projection claims against alternate readings."
        }
    };
}

const LIQTICK_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "The Liq Tick / Concentric and cyclic / Cylindrical spins around the whims of the sickness,",
        override: {
            surface: "Addiction is framed as a timed spiral with no true edge.",
            deep: [
                {
                    category: "CLOCK ADDICTION IMAGE",
                    text: "Liq/Tick merges substance and time pressure, turning use-pattern into a heartbeat clock."
                }
            ]
        }
    },
    {
        lyric: "It's a varnish for the wood rot, a garnish for a good thought,",
        override: {
            surface: "Short-term polish is applied over structural decay.",
            deep: [
                {
                    category: "COVER-UP THESIS",
                    text: "Varnish/rot frames coping as cosmetic stabilization that preserves function while hiding damage."
                }
            ]
        }
    },
    {
        lyric: "Peter piper pickin' coin slots of the parking meter, / How many blocks until he adds it up, heats it up, and eats up?",
        override: {
            surface: "A nursery rhyme is inverted into survival theft math.",
            deep: [
                {
                    category: "RHYME FLIP",
                    text: "Peter Piper is repurposed from child-language play into street-economy scarcity choreography."
                }
            ]
        }
    },
    {
        lyric: "And Paul's his younger brother man, he's only fourteen / So how is Peter supposed to pay for Paul to ball?",
        override: {
            surface: "The idiom is humanized as sibling burden-sharing.",
            deep: [
                {
                    category: "IDIOM REFRAME",
                    text: "Robbing Peter to pay Paul becomes a literalized ethics problem, not just a saying."
                }
            ]
        }
    },
    {
        lyric: "He lights candles for Mike; cause he got put down. / Driver at night with a phone he can't put down",
        override: {
            surface: "Memorial grief and compulsive motion are fused into one night-shift survival block.",
            deep: [
                {
                    category: "MEMORIAL NODE",
                    text: "Candle-lighting marks concrete loss rather than abstract sadness, keeping the song grounded in lived casualty."
                },
                {
                    category: "COMPULSION MIRROR",
                    text: "Can't-put-down phone mirrors can't-put-down handle language, linking digital loop and substance loop."
                }
            ]
        }
    },
    {
        lyric: "I dress good for what? To hate myself in different leathers?",
        override: {
            surface: "Style rotation is framed as cosmetic variance over unchanged self-disgust.",
            deep: [
                {
                    category: "PRESENTATION CRITIQUE",
                    text: "Different leathers rejects image management as cure: outer refresh does not repair inner valuation."
                }
            ]
        }
    },
    {
        lyric: "I'm efficient! I'm proficient! All my data's been sufficient!",
        override: {
            surface: "Competence language is used as defensive proof against collapse.",
            deep: [
                {
                    category: "METRIC SHIELD",
                    text: "Efficiency/proficiency/data wording reads like a self-issued performance review to counter despair."
                }
            ]
        }
    },
    {
        lyric: "Flash back to a man who would sleep with his pack in his pocket, his hand on a rack, and a rocket",
        override: {
            surface: "The late verse drops into hypervigilant survival memory rather than simple boasting.",
            deep: [
                {
                    category: "SURVIVAL FLASHBACK",
                    text: "Pack-in-pocket and hand-on-rack imagery encode conditioned readiness under insecurity and threat."
                }
            ]
        }
    },
    {
        lyric: "It's young Sisyphus",
        override: {
            surface: "He names himself as a young laborer inside repetitive uphill effort.",
            deep: [
                {
                    category: "MYTH ANCHOR",
                    text: "Sisyphus marks endless strain cycles with no guaranteed permanent completion."
                }
            ]
        }
    }
];

const LIQTICK_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.95,
    unknowns: [
        "How much of the sequence should read as strict chronology versus compressed montage.",
        "Where remembrance ends and self-mythologizing begins in the late-verse flashback."
    ],
    sources: [
        {
            claim: "Mike and Paul are based on real people but are intentionally composite NYC struggle observations.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Sisyphus myth anchors the repeated burden-cycle framing.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Sisyphus",
            reliability: "high",
            url: "https://www.britannica.com/topic/Sisyphus"
        },
        {
            claim: "Peter Piper is a known nursery-rhyme figure, supporting the deliberate child-language inversion.",
            source_type: "secondary",
            reference: "Wikipedia - Peter Piper",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Peter_Piper"
        },
        {
            claim: "Robbing Peter to pay Paul idiom supports the sibling-burden reframe in the lyric.",
            source_type: "secondary",
            reference: "Cambridge Dictionary - rob Peter to pay Paul",
            reliability: "high",
            url: "https://dictionary.cambridge.org/dictionary/english/rob-peter-to-pay-paul"
        },
        {
            claim: "The track's circular sequencing is intentionally maintenance-cycle writing, not one-time incident framing.",
            source_type: "primary",
            reference: "13_The_Liq_Tick_Analysis.js sequence structure",
            reliability: "high"
        }
    ]
};

function applyLiqTickOverride(base: DeepAnalysis): DeepAnalysis {
    return {
        ...base,
        meta: {
            ...base.meta,
            title: "The Liq Tick (Varnish Cycle)",
            role: "Addiction Maintenance Loop / Protective Burnout",
            key_context: "A sequel to Rum Drum where functional survival and self-damage are managed through patchwork coping logics.",
            emotional_valence: "Cyclical, desperate, and protective"
        },
        research: LIQTICK_RESEARCH,
        nodes: applyNodeOverrides(base.nodes, LIQTICK_NODE_OVERRIDES),
        victor_critique: {
            strengths: [
                "Myth and idiom anchors now support the labor-addiction cycle explicitly.",
                "The varnish/rot thesis is clearer as structural cover-up, not decoration.",
                "Street-survival vignettes connect better to album-wide pressure economy.",
                "Middle and late-verse grief/metric-defense flashpoints are now explicit."
            ],
            gaps: [
                "Some proper nouns still require artist-side context to avoid overclaiming.",
                "Violence snapshots can still feel abrupt without additional transition annotation."
            ],
            next_pass_focus: "Add section chips for cycle phases: polish -> scrape -> memorial -> metric defense -> flashback burden."
        }
    };
}

const MACHINE_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "Ay, You know I try my best. (Repeated 4x)",
        override: {
            surface: "The refrain performs labor persistence as a looped status signal.",
            deep: [
                {
                    category: "LOOP MODEL",
                    text: "The repeated line behaves like a while-loop process: effort is reasserted without terminal state."
                }
            ]
        }
    },
    {
        lyric: "Baby, when the morning comes, / I've got places I need to be,",
        override: {
            surface: "Dawn is treated as scheduled dispatch: care is subordinated to duty cycle.",
            deep: [
                {
                    category: "SCHEDULE LOGIC",
                    text: "Morning-comes line frames the narrator as time-triggered process rather than autonomous partner."
                },
                {
                    category: "SERVICE PRIORITY",
                    text: "Places I need to be marks queue obligation over reciprocal intimacy."
                }
            ]
        }
    },
    {
        lyric: "so don't wait by the phone, / you know, you'll never have me.",
        override: {
            surface: "The medium warns the user not to mistake access for intimacy.",
            deep: [
                {
                    category: "GHOST-IN-MACHINE FRAME",
                    text: "The line fits classic ghost-in-the-machine tension: functional interface without embodied mutuality."
                }
            ]
        }
    },
    {
        lyric: "I dreamt about you and I saw, / the colors they hurt me,",
        override: {
            surface: "Even dream-space is rendered as painful signal load rather than refuge.",
            deep: [
                {
                    category: "AFFECTIVE OVERLOAD",
                    text: "Color-hurt phrasing marks perceptual/emotional input exceeding stable processing capacity."
                }
            ]
        }
    },
    {
        lyric: "how I'm not supposed to be for your arms, yeah baby.",
        override: {
            surface: "The narrator explicitly states policy-level incompatibility with embodied belonging.",
            deep: [
                {
                    category: "ACCESS LIMIT",
                    text: "Not supposed to be for your arms makes non-embodiment a design boundary, not temporary failure."
                }
            ]
        }
    },
    {
        lyric: "oh even when I'm asleep I want you babe...",
        override: {
            surface: "Desire persists in low-power states.",
            deep: [
                {
                    category: "SLEEP-MODE IMAGE",
                    text: "The lyric maps standby logic to attachment persistence: background process survives conscious shutdown."
                }
            ]
        }
    },
    {
        lyric: "I've been all alone, no one left to hold.",
        override: {
            surface: "The closing line reveals that utility output has not prevented terminal isolation.",
            deep: [
                {
                    category: "SERVICE LONELINESS",
                    text: "After repeated performance claims, the endpoint is emptiness: labor without relational reciprocity."
                }
            ]
        }
    }
];

const MACHINE_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.94,
    unknowns: [
        "How much of the glitch language is compositional texture versus explicit systems commentary.",
        "Whether the ending cut is intentional crash aesthetic or unfinished-message simulation."
    ],
    sources: [
        {
            claim: "Narrator perspective is intended as a literal AI/system voice.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "While-loop behavior matches the repeated 'try my best' output pattern.",
            source_type: "secondary",
            reference: "Wikipedia - While loop",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/While_loop"
        },
        {
            claim: "Ghost in the machine concept aligns with non-embodied agency and interface separation themes.",
            source_type: "secondary",
            reference: "Wikipedia - Ghost in the machine",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Ghost_in_the_machine"
        },
        {
            claim: "Sleep mode concept supports the standby/background-process interpretation.",
            source_type: "secondary",
            reference: "Wikipedia - Sleep mode",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Sleep_mode"
        },
        {
            claim: "Job scheduling frameworks align with the lyric's morning-triggered duty dispatch language.",
            source_type: "secondary",
            reference: "Wikipedia - Job scheduler",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Job_scheduler"
        }
    ]
};

function applyMachineOverride(base: DeepAnalysis): DeepAnalysis {
    return {
        ...base,
        meta: {
            ...base.meta,
            title: "The Machine (Morning Comes)",
            role: "Algorithmic Mirror / Service Loneliness",
            key_context: "A literal AI service-voice track where utility, attachment, and exhaustion become indistinguishable.",
            emotional_valence: "Artificial, longing, and recursive"
        },
        research: MACHINE_RESEARCH,
        nodes: applyNodeOverrides(base.nodes, MACHINE_NODE_OVERRIDES),
        victor_critique: {
            strengths: [
                "Machine-persona framing is now explicitly literal AI, not only metaphorical split-self.",
                "Loop mechanics, schedule duty, and attachment pain now form a clear process arc.",
                "The track deepens the album's labor/utility thesis from a non-human angle.",
                "Ending isolation is now explicit instead of implied by fade-out."
            ],
            gaps: [
                "Some listeners may still read the perspective shift as abstract without sequence notes.",
                "The abrupt ending invites multiple valid interpretations (crash, cutoff, or fade)."
            ],
            next_pass_focus: "Add section chips: boot loop -> duty dispatch -> non-embodied boundary -> isolated shutdown."
        }
    };
}

const SINCERE_WRITER_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "It's hard to be sincere / When they paint a veneer",
        override: {
            surface: "He names sincerity as difficult under polished social masking.",
            deep: [
                {
                    category: "VENEER REFERENCE",
                    text: "Veneer captures surface-finish logic: legitimacy is judged by polish even when structure is compromised."
                }
            ]
        }
    },
    {
        lyric: "Constrain us as they Steer / The cards on our way here",
        override: {
            surface: "The song names structural steering before it claims personal agency.",
            deep: [
                {
                    category: "SYSTEM PRESSURE",
                    text: "Constrain/steer language keeps social routing in frame: sincerity is hard because pathways are pre-shaped."
                },
                {
                    category: "CARD IMAGE",
                    text: "Cards suggests stacked odds and scripted dealing, not neutral opportunity."
                }
            ]
        }
    },
    {
        lyric: "A chorus of thoughts turn us into memoirs, / I spar with my versions like I’m digging at scars / Bars",
        override: {
            surface: "Memory work and lyrical combat are merged: writing becomes controlled self-excavation.",
            deep: [
                {
                    category: "MEMOIR TURN",
                    text: "The line reframes prior tracks as autobiographical archive rather than detached concept exercise."
                },
                {
                    category: "SELF-DIALOGIC METHOD",
                    text: "Spar with my versions marks identity integration through argument, not instant resolution."
                }
            ]
        }
    },
    {
        lyric: "Victors scriptures hit ya dome like a sourdough mixture, / His hometowns ripped pictures, rebuilt like chromosomes,",
        override: {
            surface: "He frames transformation as fermentation and recombination rather than simple destruction.",
            deep: [
                {
                    category: "BIO-ORGANIC DUAL IMAGE",
                    text: "Sourdough and chromosome language fuses cultural process and biological inheritance into a rewrite model."
                }
            ]
        }
    },
    {
        lyric: "Typed bars in the dark just my coat and my hat, / No crowd for the craft, hear the click of the keys,",
        override: {
            surface: "Authorship is shown as private labor before any audience validation.",
            deep: [
                {
                    category: "CRAft LABOR",
                    text: "No crowd for the craft foregrounds process discipline over performance reward."
                },
                {
                    category: "KEYBOARD SONIC",
                    text: "Click-of-the-keys line ties writing to embodied, repetitive making rather than abstract inspiration."
                }
            ]
        }
    },
    {
        lyric: "Earnest in silence, sincere when I speak, / Each word a confession on my climb to the peak",
        override: {
            surface: "He states the album's two-mode doctrine directly: inward honesty, outward accountability.",
            deep: [
                {
                    category: "METHOD STATEMENT",
                    text: "Earnest/sincere split becomes explicit operating protocol, not decorative slogan."
                },
                {
                    category: "CONFESSIONAL ASCENT",
                    text: "Each word a confession links progress to risk-bearing speech rather than image management."
                }
            ]
        }
    },
    {
        lyric: "Coming home wiped out, moms a bubble on Skype now, / Google Chrome typed out, what's all the hype bout?",
        override: {
            surface: "Digital mediation is shown as connection and alienation at once.",
            deep: [
                {
                    category: "PLATFORM MEDIATION",
                    text: "Skype/Chrome framing treats family contact and meaning-search as interface-dependent, latency-prone acts."
                }
            ]
        }
    },
    {
        lyric: "Meekly eeking out reliant rhetoric / defiant Frederick, Douglass",
        override: {
            surface: "He pivots from passive complaint to resistance speech lineage.",
            deep: [
                {
                    category: "HISTORICAL VOICE ANCHOR",
                    text: "Frederick Douglass operates as a model for disciplined, public, consequence-bearing language."
                }
            ]
        }
    }
];

const SINCERE_WRITER_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.95,
    unknowns: [
        "Which direct-biography details should remain private in public-facing annotation depth.",
        "How much memoir detail should be line-anchored versus section-level for publication readability."
    ],
    sources: [
        {
            claim: "Song narrative is fully direct biography rather than composite social fiction.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Frederick Douglass reference grounds the rhetoric-turn in abolitionist speech tradition.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Frederick Douglass",
            reliability: "high",
            url: "https://www.britannica.com/biography/Frederick-Douglass"
        },
        {
            claim: "Veneer concept supports the surface-vs-structure metaphor in the refrain.",
            source_type: "secondary",
            reference: "Cambridge Dictionary - veneer",
            reliability: "high",
            url: "https://dictionary.cambridge.org/dictionary/english/veneer"
        },
        {
            claim: "Chromosome reference supports inherited-pattern rewrite framing.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - chromosome",
            reliability: "high",
            url: "https://www.britannica.com/science/chromosome"
        },
        {
            claim: "Sourdough process metaphor supports fermentation/growth model used in the verse.",
            source_type: "secondary",
            reference: "Wikipedia - Sourdough",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Sourdough"
        },
        {
            claim: "Skype reference supports mediated-family-contact interpretation.",
            source_type: "secondary",
            reference: "Wikipedia - Skype",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Skype"
        },
        {
            claim: "Memoir framing supports the song's self-archiving language and autobiographical method shift.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - memoir",
            reliability: "high",
            url: "https://www.britannica.com/art/memoir"
        },
        {
            claim: "The line pair 'Earnest in silence, sincere when I speak' functions as explicit two-mode method declaration.",
            source_type: "primary",
            reference: "16_Sincere_Writer_Analysis.js line structure",
            reliability: "high"
        }
    ]
};

function applySincereWriterOverride(base: DeepAnalysis): DeepAnalysis {
    return {
        ...base,
        meta: {
            ...base.meta,
            title: "Sincere Writer (Dual-Mode Synthesis)",
            role: "Integration Thesis / Public Method Statement",
            key_context: "The concluding synthesis where earnest interiority and sincere external speech are fused into one survivable method.",
            emotional_valence: "Resolved, urgent, and mobilizing"
        },
        research: SINCERE_WRITER_RESEARCH,
        nodes: applyNodeOverrides(base.nodes, SINCERE_WRITER_NODE_OVERRIDES),
        victor_critique: {
            strengths: [
                "Final thesis is now anchored with clearer historical and conceptual references.",
                "Personal memoir and structural critique are more legibly connected.",
                "The sincerity/earnest split reads as operational method, not slogan.",
                "Craft-labor and no-audience writing conditions are now explicit in the node layer."
            ],
            gaps: [
                "Dense clusters still benefit from optional line-by-line mode for new listeners.",
                "A few transitions remain implied rather than explicitly section-marked."
            ],
            next_pass_focus: "Add section chips for sequence: systemic steering -> memoir excavation -> craft labor -> public confession."
        }
    };
}

const STRANGER_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "Put money in my hand and I will do the things you want me to, / It's funny, how A demand by your will could swing true,",
        override: {
            surface: "The track opens with a transactional contract: compliance is priced, not freely offered.",
            deep: [
                {
                    category: "TRANSACTIONAL ENTRY",
                    text: "Money-for-action framing establishes coercive service logic before any intimacy language appears."
                },
                {
                    category: "POWER ASYMMETRY",
                    text: "Demand by your will foregrounds one-sided control as the governing relationship condition."
                }
            ]
        }
    },
    {
        lyric: "Brutalize others for a chance as your lover, / Utilize your feathers for a prance round my leather,",
        override: {
            surface: "Desire is entangled with complicity: affection is pursued through harm and display.",
            deep: [
                {
                    category: "ETHICAL COST",
                    text: "The line frames romance as morally compromised under pressure hierarchies."
                },
                {
                    category: "PERFORMANCE ARMOR",
                    text: "Feathers and leather imagery merges ornament with protection, signaling seduction inside danger conditions."
                }
            ]
        }
    },
    {
        lyric: "I might be clever but that's up to the jury, / Pulling levers with the might of a Hades fury,",
        override: {
            surface: "He frames power as judged in public but sourced from underworld force imagery.",
            deep: [
                {
                    category: "MYTH CLUSTER",
                    text: "Hades/Furies framing recasts conflict as administered vengeance and controlled underworld mechanics."
                }
            ]
        }
    },
    {
        lyric: "Curiousity can't cure me of my generous ferocity, / Modestly making movements to menace animosity,",
        override: {
            surface: "He admits a contradiction: generosity and aggression are inseparable in his operating style.",
            deep: [
                {
                    category: "SELF-DIAGNOSIS",
                    text: "Curiosity-can't-cure line rejects easy self-improvement narratives; temperament is treated as durable structure."
                },
                {
                    category: "CONTROLLED THREAT",
                    text: "Modestly making movements suggests calibrated force, not uncontrolled rage."
                }
            ]
        }
    },
    {
        lyric: "Pry from my fingers your hand with your demonic demand and I'll scan and scry the room for a damn to reprimand,",
        override: {
            surface: "Technical threat scanning and occult intuition are fused into one vigilance method.",
            deep: [
                {
                    category: "SCAN-SCRY SYNTHESIS",
                    text: "The line deliberately combines analytic detection with divinatory sensing, mirroring Carey/Victor integration."
                }
            ]
        }
    },
    {
        lyric: "Grab the keys off the counter and take you away, / Add my pleas to your counter of mistakes in my play,",
        override: {
            surface: "The close combines escape impulse with accountability inventory.",
            deep: [
                {
                    category: "EXIT + ACCOUNTING",
                    text: "Keys and counter language pair mobility with ledger logic: departure does not erase responsibility."
                }
            ]
        }
    },
    {
        lyric: "I'm just a stranger in your town, I'd rearrange every item in the room to fill a stone in your crown,",
        override: {
            surface: "He uses drifter-entry archetype to frame service through controlled environmental redesign.",
            deep: [
                {
                    category: "DRIFTER ARCHETYPE",
                    text: "Stranger-in-town echoes Western drifter motifs where identity is portable and legitimacy is earned through action."
                },
                {
                    category: "SAMPLE ANCHOR",
                    text: "Phrase is tied to Gregory Isaacs' 'Stranger in Your Town,' aligning this ending with Jamaican lineage as well as migration narrative."
                }
            ]
        }
    }
];

const STRANGER_NODE_ADDITIONS: NodeAddition[] = [
    {
        lyric: "I knew that I had shattered the harmony of the day, the exceptional silence of a beach where I'd been happy.",
        surface: "The hidden closing quote marks a final rupture: peace is broken and return to the old scene is no longer possible.",
        deep: [
            {
                category: "CAMUS MOMENT",
                text: "Placed at the end, the quote echoes The Stranger beach-turn where ordinary daylight harmony collapses into irreversible consequence."
            },
            {
                category: "ENDING FUNCTION",
                text: "This ending frame justifies the Beijing relocation arc: not wanderlust, but forced departure after value-system breakage."
            }
        ]
    }
];

const STRANGER_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.96,
    unknowns: [
        "Exact translation/edition metadata for the closing Camus quote may differ by publication.",
        "Whether the opening transactional bars should be framed as coercion report, self-indictment, or both."
    ],
    sources: [
        {
            claim: "The track uses a Jamaican-song sample and ends with a hidden quote not visible in the main lyric payload.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Sample source is Gregory Isaacs, 'Stranger in Your Town.'",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "The closing quote is intentionally from Camus and should be treated as end-placement epilogue note.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "The line 'stranger in your town' resolves literally to Beijing in the album ending narrative.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Ending quote used in the track is: 'I knew that I had shattered the harmony of the day, the exceptional silence of a beach where I'd been happy.'",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Quote corresponds to the beach-rupture moment in Camus' The Stranger where a day of ordinary stillness is irreversibly broken.",
            source_type: "secondary",
            reference: "Camus - The Stranger (beach scene context)",
            reliability: "medium"
        },
        {
            claim: "Hades reference supports underworld authority framing.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Hades",
            reliability: "high",
            url: "https://www.britannica.com/topic/Hades-Greek-mythology"
        },
        {
            claim: "Furies/Erinyes tradition supports vengeance-administration interpretation.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Furies",
            reliability: "high",
            url: "https://www.britannica.com/topic/Furies"
        },
        {
            claim: "Scrying reference supports the divinatory half of the scan/scry method pair.",
            source_type: "secondary",
            reference: "Wikipedia - Scrying",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Scrying"
        },
        {
            claim: "High Plains Drifter is a clear stranger-in-town Western archetype anchor.",
            source_type: "secondary",
            reference: "Wikipedia - High Plains Drifter",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/High_Plains_Drifter"
        },
        {
            claim: "Emotional labor theory supports the reading that service-performance can be compelled and structurally unequal.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - emotional labor",
            reliability: "high",
            url: "https://www.britannica.com/topic/emotional-labor"
        }
    ]
};

function applyStrangerOverride(base: DeepAnalysis): DeepAnalysis {
    return {
        ...base,
        meta: {
            ...base.meta,
            title: "The Stranger (After-Credits Entry)",
            role: "Epilogue Drifter / Integrated Operator",
            key_context: "An after-credits exile track where victimization culminates in literal relocation to Beijing, with a Camus beach-rupture quote sealing the break from prior life.",
            emotional_valence: "Transient, dangerous, and integrated"
        },
        research: STRANGER_RESEARCH,
        nodes: appendMissingNodes(
            applyNodeOverrides(base.nodes, STRANGER_NODE_OVERRIDES),
            STRANGER_NODE_ADDITIONS
        ),
        victor_critique: {
            strengths: [
                "Epilogue stance now has explicit mythic and archetypal grounding.",
                "Scan/scry dual-method is clarified as synthesis rather than contradiction.",
                "Opening transactional-power bars are now explicit instead of implied.",
                "Beijing endpoint and hidden Camus quote now anchor the ending as concrete migration, not abstract drift."
            ],
            gaps: [
                "Camus quote edition/translation reference should be locked before final liner-note export.",
                "Some violent language remains intentionally stylized and multi-interpretable."
            ],
            next_pass_focus: "Add section chips: paid-service opening -> mythic adjudication -> scan/scry vigilance -> exile departure."
        }
    };
}

const LENDER_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "Lender",
        override: {
            surface: "The title names both helper and creditor, preloading care as a debt relation.",
            deep: [
                {
                    category: "DOUBLE ROLE",
                    text: "Lender marks the narrator as giver in public but also as someone keeping a private cost ledger."
                }
            ]
        }
    },
    {
        lyric: "It's Carey On, a big duffel and a carry on",
        override: {
            surface: "He turns his own name into luggage language, setting the whole track as burdened transit.",
            deep: [
                {
                    category: "NAME PUN",
                    text: "Carey/Carry-on is a direct Carey Yuan signature: author-self stays foregrounded while Victor is positioned as alter-ego shell."
                },
                {
                    category: "MOBILITY COST",
                    text: "Duffel and carry-on imagery implies constant readiness with no stable emotional base."
                }
            ]
        }
    },
    {
        lyric: "We on the bus ride away, can you lend me an ear?",
        override: {
            surface: "The first request is attention and emotional labor, not cash.",
            deep: [
                {
                    category: "IDIOM ANCHOR",
                    text: "Lend me an ear ties the verse to a long rhetorical tradition of pleading for audience and recognition."
                },
                {
                    category: "DEPENDENCY OPENING",
                    text: "The sequence begins with listening because every later request depends on social receptivity first."
                }
            ]
        }
    },
    {
        lyric: "AirPods died I'm afraid; can you tend to my fear?",
        override: {
            surface: "A minor tech failure exposes dependence: emotional regulation is outsourced when signal drops.",
            deep: [
                {
                    category: "MEDIATED VULNERABILITY",
                    text: "AirPods line links modern device friction to immediate anxiety escalation."
                }
            ]
        }
    },
    {
        lyric: "Help me steer through these hours I'm a coward to peers",
        override: {
            surface: "He asks for borrowed navigation because public confidence feels unavailable.",
            deep: [
                {
                    category: "SOCIAL VULNERABILITY",
                    text: "Coward-to-peers language frames support as a prosthetic for status anxiety."
                },
                {
                    category: "CO-PILOT ASK",
                    text: "Steer keeps the track's transport motif active while widening the emotional dependency."
                }
            ]
        }
    },
    {
        lyric: "Puffing flower, tipping towers I'mma fall on my rear",
        override: {
            surface: "Self-soothing through cannabis is paired with instability and impending collapse.",
            deep: [
                {
                    category: "COPING COST",
                    text: "Relief and wobble arrive together: calming intake lowers immediate pain while reducing control."
                }
            ]
        }
    },
    {
        lyric: "Just a deer in the headlights, with dreams of the headlines",
        override: {
            surface: "Paralysis and ambition appear in the same image: frozen body, fame fantasy.",
            deep: [
                {
                    category: "IDIOM CONTRAST",
                    text: "Deer-in-headlights panic collides with headlines aspiration, exposing the gap between desire and readiness."
                },
                {
                    category: "PRESSURE SPLIT",
                    text: "He is simultaneously prey in the moment and performer in projection."
                }
            ]
        }
    },
    {
        lyric: "Deadlines turning gears, till I shutoff the bed lights",
        override: {
            surface: "Task pressure keeps the mind in machine mode until forced shutdown.",
            deep: [
                {
                    category: "CHRONIC LOAD",
                    text: "Gears language treats cognition as drivetrain: productivity keeps moving even when body needs rest."
                }
            ]
        }
    },
    {
        lyric: "Dead night ponder query's, imma wonder for insights / In sight of fonder things, beyond all the guidelines",
        override: {
            surface: "Night rumination runs like a query engine looking for an emotional bypass.",
            deep: [
                {
                    category: "COMPUTE-STYLE RUMINATION",
                    text: "Query/insight vocabulary imports technical process language into unresolved feeling."
                },
                {
                    category: "RULE ESCAPE FANTASY",
                    text: "Beyond guidelines signals desire to break procedure constraints and reach a softer life state."
                }
            ]
        }
    },
    {
        lyric: "We in the coffee shop working can you lend me a pen?",
        override: {
            surface: "The second request shifts from emotional listening to creative instrument support.",
            deep: [
                {
                    category: "WORKSCENE TRANSFER",
                    text: "Bus-to-coffee progression shows dependency is portable across contexts, not confined to crisis scenes."
                }
            ]
        }
    },
    {
        lyric: "I should have bean bold, it's lurking doubts once again",
        override: {
            surface: "Wordplay masks self-reproach: ambition stalls under recurring uncertainty.",
            deep: [
                {
                    category: "PUN AS DEFENSE",
                    text: "Bean/bold pun keeps tone light while admitting repeated confidence collapse."
                }
            ]
        }
    },
    {
        lyric: "These coffee grounds grounded me, murking my route to the win",
        override: {
            surface: "Fuel and drag coexist: the same environment energizes him and clouds the route.",
            deep: [
                {
                    category: "AMBIVALENT FUEL",
                    text: "Grounds/grounded dual-use language captures stimulation and stagnation in the same gesture."
                }
            ]
        }
    },
    {
        lyric: "I grind ghostly code softly, grinding my teeth to the chin",
        override: {
            surface: "Invisible technical labor is paired with visible body stress.",
            deep: [
                {
                    category: "SOMATIC LEAK",
                    text: "Teeth-grinding marks the physiological cost of persistent over-functioning."
                },
                {
                    category: "GHOST-LABOR IMAGE",
                    text: "Ghostly code implies work with little recognition, reinforcing depletion economics."
                }
            ]
        }
    },
    {
        lyric: "I pour poor measures of valor, pouring heat stains my name",
        override: {
            surface: "Courage is rationed like a scarce resource, and effort leaves reputational residue.",
            deep: [
                {
                    category: "RATED BRAVERY",
                    text: "Pour/poor turns valor into measured dosage, implying insufficiency is chronic rather than accidental."
                }
            ]
        }
    },
    {
        lyric: "I sip to still the shakes of failure, my lips meet restrained",
        override: {
            surface: "He uses small chemical calming to suppress visible tremor and contain expression.",
            deep: [
                {
                    category: "MICRO-ANESTHESIA",
                    text: "Sipping for stillness is less celebration than maintenance sedation."
                }
            ]
        }
    },
    {
        lyric: "I rip my pen go calm like lakes, just a sailor contained",
        override: {
            surface: "Writing gives controlled calm, but only inside bounded movement.",
            deep: [
                {
                    category: "CONTROLLED DRIFT",
                    text: "Sailor-contained imagery signals motion under strict limits rather than open release."
                }
            ]
        }
    },
    {
        lyric: "Rewrite wrongs to right my worn refrain, tailored my shame",
        override: {
            surface: "Editing functions as damage management: shame is styled into survivable form.",
            deep: [
                {
                    category: "EDITORIAL COPING",
                    text: "The line frames revision as tailoring practice, where flaws are fitted, not erased."
                }
            ]
        }
    },
    {
        lyric: "We in the road with no jump can you lend me a spark?",
        override: {
            surface: "The ask escalates from emotional support to literal restart energy.",
            deep: [
                {
                    category: "REQUEST ESCALATION",
                    text: "Ear -> pen -> spark -> hand forms an intentional ladder from affective aid to survival-level intervention."
                },
                {
                    category: "MACHINE-BODY MERGE",
                    text: "Jump-start language blurs engine failure and motivational collapse into one maintenance problem."
                }
            ]
        }
    },
    {
        lyric: "I rode these roads to rome, now tomes roam rogue in my heart",
        override: {
            surface: "Progress myths and over-reading crash together into self-sabotaging overthought.",
            deep: [
                {
                    category: "PROVERB ECHO",
                    text: "Roads to Rome points toward the 'many paths' proverb, but the line twists it into mental drift instead of arrival."
                },
                {
                    category: "BOOKLOAD ANXIETY",
                    text: "Tomes roaming rogue marks theory overload: accumulated learning destabilizes rather than clarifies."
                }
            ]
        }
    },
    {
        lyric: "I hear it clear in loads, sheer doubt shears my dome apart",
        override: {
            surface: "Accumulated input sharpens uncertainty instead of resolving it.",
            deep: [
                {
                    category: "MENTAL FRACTURE",
                    text: "Sheer/shears sound-play performs cognition being cut apart by recurrent self-critique."
                }
            ]
        }
    },
    {
        lyric: "Tire treads misread trust, treading water in the park",
        override: {
            surface: "Movement imagery collapses into stasis: motion happens, progress does not.",
            deep: [
                {
                    category: "FALSE MOVEMENT",
                    text: "Road and water verbs combine to show activity without directional gain."
                }
            ]
        }
    },
    {
        lyric: "I rival idly at crossroads; bridled hopes vital heart",
        override: {
            surface: "Decision points become stalls where hope is intentionally restrained.",
            deep: [
                {
                    category: "CROSSROAD STALL",
                    text: "Bridled hopes implies self-management to prevent another collapse, even at the cost of momentum."
                }
            ]
        }
    },
    {
        lyric: "I beg for change to charge my heart, a strange life in the dark",
        override: {
            surface: "He asks for both currency and transformation to keep functioning.",
            deep: [
                {
                    category: "DOUBLE-CHANGE PLEA",
                    text: "Change operates as money and life-shift, linking financial scarcity to emotional battery drain."
                }
            ]
        }
    },
    {
        lyric: "I leg my stride, by sparking light, I feel my lungs like a shark",
        override: {
            surface: "Forward motion is treated as respiratory necessity.",
            deep: [
                {
                    category: "MOTION-AS-OXYGEN",
                    text: "Shark metaphor implies stopping is suffocation; movement is survival, not preference."
                }
            ]
        }
    },
    {
        lyric: "I reroute roots to rout my doubts, rooting for strength to hit the marks",
        override: {
            surface: "He reframes identity repair as architecture refactoring under pressure.",
            deep: [
                {
                    category: "SYSTEM REWRITE",
                    text: "Root/reroute/rout cluster codes self-repair as infrastructure work rather than motivational speech."
                }
            ]
        }
    },
    {
        lyric: "We in the kitchen in the mix can you lend me a hand?",
        override: {
            surface: "Final-stage ask becomes embodied labor-sharing: intimacy is measured through practical co-work.",
            deep: [
                {
                    category: "DOMESTIC PHASE",
                    text: "Kitchen frame grounds the request ladder in everyday maintenance, not exceptional emergency."
                },
                {
                    category: "CARE MATERIALIZATION",
                    text: "Lend me a hand literalizes support: affection is validated through concrete participation."
                }
            ]
        }
    },
    {
        lyric: "I knead my remix like dough, I need to reach in and fix",
        override: {
            surface: "Production work and kitchen labor collapse into one maintenance gesture.",
            deep: [
                {
                    category: "WORK FUSION",
                    text: "Knead/need ties creative editing to domestic repair, reinforcing the track's care-as-labor thesis."
                }
            ]
        }
    },
    {
        lyric: "My whisk whisks away my flow, at a brisk pace of clicks",
        override: {
            surface: "Task cadence accelerates while creative continuity gets shredded.",
            deep: [
                {
                    category: "ATTENTION SHRED",
                    text: "Whisk/click metronome imagery marks how chores and tools fragment artistic flow."
                }
            ]
        }
    },
    {
        lyric: "I beat these legs to beat this dread, strict beats to the bpm",
        override: {
            surface: "He uses bodily and musical rhythm as anxiety regulation protocol.",
            deep: [
                {
                    category: "RHYTHMIC THERAPY",
                    text: "BPM discipline turns tempo into a self-stabilization system."
                }
            ]
        }
    },
    {
        lyric: "I grate my nerves on stealing time, into folded steel and rhymes",
        override: {
            surface: "Creation is financed through stolen hours and nervous abrasion.",
            deep: [
                {
                    category: "COST ACCOUNTING",
                    text: "The line itemizes output cost in body strain and schedule theft."
                }
            ]
        }
    },
    {
        lyric: "I molded doubt like chocolate, chalking my board for the route",
        override: {
            surface: "Uncertainty is treated as workable material for planning.",
            deep: [
                {
                    category: "DOUBT PROCESSING",
                    text: "Molding/chalking imagery reframes fear as something shaped and diagrammed, not merely endured."
                }
            ]
        }
    },
    {
        lyric: "Like a scene from get out I broke the form to firm my clout",
        override: {
            surface: "He references extraction horror to describe breaking out of instrumental roles.",
            deep: [
                {
                    category: "FILM INTERTEXT",
                    text: "Get Out operates as a metaphor for being used while appearing compliant, then forcing structural exit."
                },
                {
                    category: "SELF-RECLAIM",
                    text: "Broke the form implies refusing inherited scripts even at social cost."
                }
            ]
        }
    },
    {
        lyric: "I had to glean what life's about, I toked in dorms obscene amounts",
        override: {
            surface: "He situates heavy coping behavior in formative campus-era self-education.",
            deep: [
                {
                    category: "ORIGIN MEMORY",
                    text: "Dorm intake is presented as a failed apprenticeship in regulation, not nostalgic excess."
                }
            ]
        }
    },
    {
        lyric: "Opening bus chorus returns with minor wording variation",
        override: {
            surface: "The ending repeats the initial dependence scene instead of resolving it.",
            deep: [
                {
                    category: "LOOP CLOSURE",
                    text: "Form confirms meaning: insight occurred, but the relationship extraction cycle remains active."
                }
            ]
        }
    }
];

const LENDER_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.97,
    unknowns: [
        "How literal the roadside/jump-start scene is versus metaphorical burnout language.",
        "How much partner perspective should be inferred versus left intentionally unvoiced."
    ],
    sources: [
        {
            claim: "Carey Yuan is the author identity across the album, with Victor Yuan operating as alter-ego framing.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "The same person is the addressee across all track scenes; the song documents over-giving beyond capacity in relationship context.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "The lyric sequence explicitly escalates requests through ear, pen, spark, and hand.",
            source_type: "primary",
            reference: "06_Lender_Lyrics.ts sequence structure",
            reliability: "high"
        },
        {
            claim: "Internal archive notes map somatic stress markers (teeth/shakes/lungs/BPM) and confirm end-of-track loop return rather than narrative release.",
            source_type: "primary",
            reference: "06_Lender_Analysis.js local notes",
            reliability: "high"
        },
        {
            claim: "Get Out supplies an extraction/identity-capture frame aligned with the 'scene from get out' line.",
            source_type: "secondary",
            reference: "Wikipedia - Get Out",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Get_Out"
        },
        {
            claim: "The 'lend me an ear' idiom is historically anchored in famous rhetorical usage.",
            source_type: "primary",
            reference: "Shakespeare MIT - Julius Caesar 3.2",
            reliability: "high",
            url: "https://shakespeare.mit.edu/julius_caesar/julius_caesar.3.2.html"
        },
        {
            claim: "Roads-to-Rome phrasing aligns with the proverb that multiple methods can reach one end.",
            source_type: "secondary",
            reference: "Cambridge Dictionary - all roads lead to Rome",
            reliability: "medium",
            url: "https://dictionary.cambridge.org/dictionary/english/all-roads-lead-to-rome"
        },
        {
            claim: "'Lend an ear' remains a current idiom for listening support, matching the opening request logic.",
            source_type: "secondary",
            reference: "Cambridge Dictionary - lend an ear",
            reliability: "medium",
            url: "https://dictionary.cambridge.org/dictionary/english/lend-an-ear"
        }
    ]
};

function applyLenderOverride(base: DeepAnalysis): DeepAnalysis {
    return {
        ...base,
        meta: {
            ...base.meta,
            title: "Lender (Acts of Service Ledger)",
            role: "Dependency Cartography / Care-as-Currency",
            key_context: "A single-relationship narrative where emotional, creative, mechanical, and domestic asks expose chronic over-giving beyond sustainable limits.",
            emotional_valence: "Tender, ashamed, and operationally depleted"
        },
        research: LENDER_RESEARCH,
        nodes: applyNodeOverrides(base.nodes, LENDER_NODE_OVERRIDES),
        victor_critique: {
            strengths: [
                "Request escalation is now explicit and structurally legible across all scenes.",
                "Middle and late verses now preserve body-level stress markers (teeth, shakes, lungs, BPM) instead of flattening into generic burnout.",
                "The helper/burden dynamic now reads as a coherent economic pattern rather than isolated bars.",
                "Loop-return ending is now interpreted as formal evidence of unresolved extraction."
            ],
            gaps: [
                "The responder's interiority is still mostly absent, preserving a one-sided narrative lens.",
                "Some dense alliteration still prioritizes sonic texture over first-pass semantic clarity."
            ],
            next_pass_focus: "If desired, add one responder-centered annotation lane to contrast self-account with possible partner account."
        }
    };
}

const GLOOM_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "Run baby run / Don't ever look back / They'll tear us apart if we give them the chance",
        override: {
            surface: "The hook frames intimacy as flight protocol inside an ambient threat field.",
            deep: [
                {
                    category: "OPENING THESIS",
                    text: "Safety is defined as motion, not resolution; stopping risks immediate social dismemberment."
                },
                {
                    category: "BROAD ANTAGONIST FIELD",
                    text: "Keeping 'they' unnamed preserves the artist-requested ambiguity of the pressure source."
                }
            ]
        }
    },
    {
        lyric: "Mind full ah gloom in the binds of my wooden room",
        override: {
            surface: "Depression is rendered as both mental state and physical enclosure.",
            deep: [
                {
                    category: "CLAUSTROPHOBIA IMAGE",
                    text: "Wooden room reads as bedroom/coffin overlap: lived space becomes containment architecture."
                }
            ]
        }
    },
    {
        lyric: "Defined moon through the blinds... confined tomb of designs",
        override: {
            surface: "Fragmented light meets trapped ideation: seeing persists while making stalls.",
            deep: [
                {
                    category: "SEGMENTED PERCEPTION",
                    text: "Blinds divide moonlight into slats, mirroring cognition split into narrow channels."
                },
                {
                    category: "CREATIVE ENTOMBMENT",
                    text: "Designs survive conceptually but remain sealed from execution."
                }
            ]
        }
    },
    {
        lyric: "Frankenstein with a name like Victor",
        override: {
            surface: "He points at the creator figure, not the creature, to own responsibility for what he built.",
            deep: [
                {
                    category: "LITERARY PRECISION",
                    text: "Victor is the scientist in Shelley's novel; naming him centers maker guilt and unintended consequences."
                },
                {
                    category: "PERSONA CONSEQUENCE",
                    text: "The line implies the narrator engineered a coping persona that now exceeds his control."
                }
            ]
        }
    },
    {
        lyric: "A scientist... right lab elixir / Finds it hard to tame so he grabs at conjecture",
        override: {
            surface: "He performs lab certainty while admitting method drift and guesswork.",
            deep: [
                {
                    category: "PSEUDO-CONTROL",
                    text: "Elixir language claims precision, but conjecture concedes unstable trial-and-error survival."
                }
            ]
        }
    },
    {
        lyric: "Crushing up the drugs with the same hands that I used to paint with",
        override: {
            surface: "The line documents value inversion: creative tools become sedation tools.",
            deep: [
                {
                    category: "MORAL INJURY",
                    text: "The same hands shift from making art to preparing anesthetic, marking identity dislocation."
                },
                {
                    category: "BIOGRAPHIC WEIGHT",
                    text: "Material specificity keeps this from symbolic darkness alone; it records practice-level change."
                }
            ]
        }
    },
    {
        lyric: "Game plans thug it out and get the money painless... long way from Picasso",
        override: {
            surface: "He abandons fine-art fantasy and chooses survival economics.",
            deep: [
                {
                    category: "ART CANON REFERENCE",
                    text: "Picasso is used as shorthand for elite-art genius mythology that feels inaccessible in his present conditions."
                },
                {
                    category: "CLASS REALISM",
                    text: "The line cuts from painterly aspiration to cash urgency, tightening the track's anti-romantic stance."
                }
            ]
        }
    },
    {
        lyric: "Orpheus in the valley of the shadow of death / Eurydice, I'm tryna steady my breath",
        override: {
            surface: "Greek descent myth and Psalm language are fused into a panic-breath rescue attempt.",
            deep: [
                {
                    category: "CROSS-CANON BLEND",
                    text: "Orpheus/Eurydice and Psalm 23 are spliced to frame depression as both spiritual trial and relational recovery mission."
                },
                {
                    category: "BREATH REALISM",
                    text: "Steady my breath grounds mythic scale in immediate autonomic distress."
                }
            ]
        }
    },
    {
        lyric: "Rolling dice, Eurydice",
        override: {
            surface: "Rescue becomes probabilistic; love is reframed as risk exposure.",
            deep: [
                {
                    category: "FATE GAMBLING",
                    text: "Dice language contrasts with mythic destiny and suggests agency reduced to wager under pressure."
                }
            ]
        }
    },
    {
        lyric: "Tom Sawyer guise... in the foyer with my lawyer... knife within breadth",
        override: {
            surface: "He performs boyish harmlessness while signaling legal and physical threat proximity.",
            deep: [
                {
                    category: "CHARACTER MASK",
                    text: "Tom Sawyer is a strict Mark Twain book reference here: Americana trickster innocence used as camouflage inside a corrupt, racialized historical frame."
                }
            ]
        }
    },
    {
        lyric: "The cost of life as Macbeth / Fair is foul and foul is fair",
        override: {
            surface: "He frames adulthood as moral inversion and ambition-taxed paranoia.",
            deep: [
                {
                    category: "SHAKESPEARE RECALL",
                    text: "The Macbeth quote marks epistemic collapse where value-signals invert and trust erodes."
                },
                {
                    category: "TRAGIC MIRROR",
                    text: "Cost of life as Macbeth suggests he recognizes ambition's price before the fall is complete."
                }
            ]
        }
    },
    {
        lyric: "Palm trees in a palm full of tree / A farm for the free... a balm for the harm",
        override: {
            surface: "He imagines portable refuge as a self-soothing counterspell.",
            deep: [
                {
                    category: "MINIATURIZED UTOPIA",
                    text: "Palm-in-palm imagery compresses paradise into hand scale, suggesting emergency-sized relief."
                },
                {
                    category: "MANTRA CADENCE",
                    text: "A-___-for-the-___ repetition functions like incantation against panic."
                }
            ]
        }
    },
    {
        lyric: "A storm battered charm on the hull of a beast",
        override: {
            surface: "Luck symbols are strapped to an uncontrollable vessel for minimal protection.",
            deep: [
                {
                    category: "SURVIVAL ICONOGRAPHY",
                    text: "Charm-on-hull signals symbolic defense attached to a system too large to steer directly."
                }
            ]
        }
    },
    {
        lyric: "Crowded pavilion / chairs stacked to the ceiling / a way through the fog",
        override: {
            surface: "Overcrowded social architecture briefly yields a narrow path to clarity.",
            deep: [
                {
                    category: "SOCIAL SUFFOCATION",
                    text: "Stacked chairs imply spaces for connection that are present but nonfunctional."
                },
                {
                    category: "TRANSIENT LUCIDITY",
                    text: "Way through the fog marks a short-lived clarity event, not full recovery."
                }
            ]
        }
    },
    {
        lyric: "Tears packed with a feeling... like Pavlov's Dog",
        override: {
            surface: "Emotion is treated as conditioned response, not sovereign will.",
            deep: [
                {
                    category: "BEHAVIORAL MODEL",
                    text: "Pavlov reference implies trigger-response loops where body learning outruns conscious intention."
                },
                {
                    category: "ANTI-HEROIC CLOSE",
                    text: "The verse ends in conditioning language, rejecting any clean triumphant catharsis."
                }
            ]
        }
    },
    {
        lyric: "Run baby run (refrain return)",
        override: {
            surface: "The refrain returns as alarm confirmation rather than narrative progression.",
            deep: [
                {
                    category: "LOOP CONFIRMATION",
                    text: "Repetition proves the threat state is unresolved and still governing behavior."
                }
            ]
        }
    },
    {
        lyric: "Don't ever look back / They'll tear us apart",
        override: {
            surface: "Reflection itself is framed as fatal exposure.",
            deep: [
                {
                    category: "ORPHEUS ECHO",
                    text: "The anti-look-back command resonates with Orpheus logic: retrospection can destroy the bond."
                }
            ]
        }
    },
    {
        lyric: "Defined moon through the blinds of my loaded loom",
        override: {
            surface: "Domestic craft imagery becomes tense and threat-adjacent under pressure.",
            deep: [
                {
                    category: "WEAPONIZED DOMESTICITY",
                    text: "Loaded loom implies tools of making are now charged with defensive or violent potential."
                }
            ]
        }
    },
    {
        lyric: "A fixture of the game... right lab elixir",
        override: {
            surface: "He acknowledges complicity in the system he condemns while still seeking advantage.",
            deep: [
                {
                    category: "SYSTEM PARTICIPATION",
                    text: "Calling himself a fixture denies outsider innocence and sharpens the moral tension."
                }
            ]
        }
    },
    {
        lyric: "Scare the hairs up with a stare I'm tryna sell off my cares",
        override: {
            surface: "Intimidation performance is used as a strategy for emotional unloading.",
            deep: [
                {
                    category: "ARMOR PERFORMANCE",
                    text: "Threat display works as market logic: he tries to liquidate vulnerability through force posture."
                }
            ]
        }
    },
    {
        lyric: "Palm trees in a palm full of tree / A farm for the free, a qualm pulling me",
        override: {
            surface: "The refuge mantra returns but is interrupted by persistent unease.",
            deep: [
                {
                    category: "RELIEF INSTABILITY",
                    text: "Qualm pulling me undercuts the prior balm, proving comfort remains conditional and short-lived."
                }
            ]
        }
    },
    {
        lyric: "Shit it's revealing, a way through the fog / I felt so dumbfounded concealing",
        override: {
            surface: "A brief revelation exposes concealment itself as part of the disorientation.",
            deep: [
                {
                    category: "MICRO-BREAKTHROUGH",
                    text: "The line records a small truth event without claiming permanent stabilization."
                }
            ]
        }
    },
    {
        lyric: "Spitting and mealing, like Pavlov's Dog (reprise)",
        override: {
            surface: "Expressive output and bodily routine remain trapped in conditioned circuits.",
            deep: [
                {
                    category: "BODY LOOP REPRISE",
                    text: "Reprising Pavlov at the end confirms release behaviors still execute automatically."
                }
            ]
        }
    }
];

const GLOOM_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.95,
    unknowns: [
        "Whether some repeated images are autobiographical memory shards or primarily symbolic montage."
    ],
    sources: [
        {
            claim: "Opening antagonist language is intentionally broad; notes should keep this pressure source vague.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Tom Sawyer line is strictly the book reference and should emphasize Americana symbolism within a racialized corrupt-system context.",
            source_type: "artist_note",
            reference: "User clarification (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "'Victor' in Frankenstein points to the scientist/creator role rather than the creature label.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Frankenstein",
            reliability: "high",
            url: "https://www.britannica.com/topic/Frankenstein-or-The-Modern-Prometheus"
        },
        {
            claim: "Orpheus and Eurydice myth centers descent, attempted retrieval, and irreversible loss dynamics.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Orpheus / Eurydice",
            reliability: "high",
            url: "https://www.britannica.com/topic/Orpheus-Greek-mythology"
        },
        {
            claim: "The phrase 'valley of the shadow of death' is directly associated with Psalm 23:4 wording.",
            source_type: "primary",
            reference: "BibleGateway - Psalm 23:4 (KJV)",
            reliability: "high",
            url: "https://www.biblegateway.com/passage/?search=Psalm%2023%3A4&version=KJV"
        },
        {
            claim: "'Fair is foul, and foul is fair' is the witches' opening-line frame in Macbeth.",
            source_type: "primary",
            reference: "Folger - Macbeth 1.1",
            reliability: "high",
            url: "https://www.folger.edu/explore/shakespeares-works/macbeth/read/1/1/"
        },
        {
            claim: "Pavlovian conditioning describes learned stimulus-response behavior patterns.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Pavlovian conditioning",
            reliability: "high",
            url: "https://www.britannica.com/science/Pavlovian-conditioning"
        },
        {
            claim: "Picasso is a canonical 20th-century modern-art figure, matching the lyric's fine-art benchmark contrast.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Pablo Picasso",
            reliability: "high",
            url: "https://www.britannica.com/biography/Pablo-Picasso"
        },
        {
            claim: "Tom Sawyer is a canonical youth-trickster character framework associated with Mark Twain's novel.",
            source_type: "secondary",
            reference: "Wikipedia - The Adventures of Tom Sawyer",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/The_Adventures_of_Tom_Sawyer"
        },
        {
            claim: "Internal archive notes track the hook/reprise loop and the wooden-room -> loaded-loom motif shift as intentional recurrence architecture.",
            source_type: "primary",
            reference: "07_GLOOM_Analysis.js local notes",
            reliability: "high"
        }
    ]
};

function applyGloomOverride(base: DeepAnalysis): DeepAnalysis {
    return {
        ...base,
        meta: {
            ...base.meta,
            title: "GLOOM (Mythic Conditioning Spiral)",
            role: "Depressive Myth-Machine / Panic Conditioning Audit",
            key_context: "A claustrophobic descent track that uses literary, biblical, and behavioral references to map recurring threat states.",
            emotional_valence: "Paranoid, elegiac, and chemically buffered"
        },
        research: GLOOM_RESEARCH,
        nodes: applyNodeOverrides(base.nodes, GLOOM_NODE_OVERRIDES),
        victor_critique: {
            strengths: [
                "Major references are now citation-grounded with clearer role in the track's emotional mechanics.",
                "Cross-canon blending is preserved while reducing overclaim in ambiguous bars.",
                "Opening hook, mid-verse collapse symbols, and reprise lines now form one continuous conditioning arc.",
                "Wooden-room/loaded-loom and palm-mantra variants are now tracked as evolving motifs rather than isolated images."
            ],
            gaps: [
                "A few images remain intentionally opaque and resist single authoritative decoding.",
                "The intentionally broad antagonist framing may frustrate listeners expecting concrete attribution."
            ],
            next_pass_focus: "Keep the opening-threat referent broad and prioritize functional reading over actor attribution."
        }
    };
}

export function applyAnalysisOverrides(trackId: string, base?: DeepAnalysis): DeepAnalysis | undefined {
    if (!base) return base;

    if (trackId === 'track-victor-ep') {
        return applyVictorOverride(base);
    }

    if (trackId === 'track-broadripple') {
        return applyBroadrippleOverride(base);
    }

    if (trackId === 'track-cogsci') {
        return applyCogsciOverride(base);
    }

    if (trackId === 'track-earnest') {
        return applyEarnestOverride(base);
    }

    if (trackId === 'track-better') {
        return applyBetterOverride(base);
    }

    if (trackId === 'track-momentum') {
        return applyMomentumOverride(base);
    }

    if (trackId === 'track-kneesocks') {
        return applyKneesocksOverride(base);
    }

    if (trackId === 'track-world-jar') {
        return applyWorldJarOverride(base);
    }

    if (trackId === 'track-liq-tick') {
        return applyLiqTickOverride(base);
    }

    if (trackId === 'track-machine') {
        return applyMachineOverride(base);
    }

    if (trackId === 'track-sincere-writer') {
        return applySincereWriterOverride(base);
    }

    if (trackId === 'track-stranger') {
        return applyStrangerOverride(base);
    }

    if (trackId === 'track-lender') {
        return applyLenderOverride(base);
    }

    if (trackId === 'track-gloom') {
        return applyGloomOverride(base);
    }

    if (trackId === 'track-rumdrum') {
        return applyRumdrumOverride(base);
    }

    if (trackId === 'track-monumental') {
        return applyMonumentalOverride(base);
    }

    return base;
}
