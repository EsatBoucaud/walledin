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
    },
    {
        lyric: "Refiner like Severance, numbers skippin through his minder.",
        override: {
            surface: "He frames attention and labor as partitioned roles with procedural precision.",
            deep: [
                {
                    category: "SERIES INTERTEXT",
                    text: "Severance is used as a deliberate split-identity office image where memory partitioning mirrors compartmentalized survival."
                },
                {
                    category: "DATAFLOW IMAGE",
                    text: "Numbers skipping through his minder ties this to macrodata-sorting pressure rather than abstract brain-talk."
                }
            ]
        }
    },
    {
        lyric: "Consigner like succession, numbers skippin through his minder.",
        override: {
            surface: "He shifts from split-memory labor to dynasty-pressure inheritance logic.",
            deep: [
                {
                    category: "POWER DYNASTY FRAME",
                    text: "Succession language points to role assignment, family hierarchy, and fragile legitimacy under constant evaluation."
                },
                {
                    category: "STATUS ANXIETY",
                    text: "Consigner phrasing keeps ambition tethered to external gatekeepers who can validate or displace him."
                }
            ]
        }
    },
    {
        lyric: "Drip from the stylus, script be twisty like Paprika,",
        override: {
            surface: "He explicitly aligns writing style with dreamlike scene-switch logic.",
            deep: [
                {
                    category: "FILM LANGUAGE",
                    text: "Paprika signals intentional reality-dream bleed in narrative movement and visual composition."
                },
                {
                    category: "CRAFT INTENT",
                    text: "The bar frames complexity as designed technique, not accidental obscurity."
                }
            ]
        }
    },
    {
        lyric: "Miyazaki mileage, a boy his bird and a heat seekah,",
        override: {
            surface: "He folds Studio Ghibli-style mythic travel into a pursuit-and-survival frame.",
            deep: [
                {
                    category: "ANIME INTERTEXT",
                    text: "Boy-and-bird imagery aligns with The Boy and the Heron archetype: grief passage through unstable worlds."
                },
                {
                    category: "MOTION THESIS",
                    text: "Heat-seeker language keeps the line grounded in target-lock urgency, not pure fantasy drift."
                }
            ]
        }
    },
    {
        lyric: "Than Dilla in a villa with a SP and a beeper,",
        override: {
            surface: "He benchmarks his drum discipline against crate-era sampler craftsmanship.",
            deep: [
                {
                    category: "PRODUCTION LINEAGE",
                    text: "J Dilla + SP-303 links the bar to tactile, sample-first beat architecture and gritty timing feel."
                },
                {
                    category: "AUTHENTICITY TEST",
                    text: "The beeper-era texture marks this as process heritage, not a generic old-school pose."
                }
            ]
        }
    },
    {
        lyric: "Known as a dissector records ripped up out the binder",
        override: {
            surface: "I cast myself as an editor who tears source material apart before rebuilding a usable identity frame.",
            deep: [
                {
                    category: "ARCHIVE SURGERY",
                    text: "Dissector plus ripped-binder language frames the opener as deliberate disassembly, not clean origin mythology."
                },
                {
                    category: "METHOD DECLARATION",
                    text: "I mark revision labor as my baseline method from bar one, so Victor starts as process before posture."
                }
            ]
        }
    },
    {
        lyric: "A real designer, a corrector, a definer / Refiner like Severance, numbers skippin through his minder",
        override: {
            surface: "I stack job roles first, then tie them to partitioned workflow language so identity reads like labor architecture.",
            deep: [
                {
                    category: "ROLE STACK",
                    text: "Designer/corrector/definer frames my persona as multi-function maintenance rather than one static trait."
                },
                {
                    category: "PARTITION ECHO",
                    text: "By pairing that stack with Severance-style processing, I show how role splitting becomes a survival strategy."
                }
            ]
        }
    },
    {
        lyric: "Stage advanced, manuscript laced with antique chants / Spit it in a stance, cloak stitched from old France",
        override: {
            surface: "I stage myself in inherited form language so performance feels ritualized, not casual.",
            deep: [
                {
                    category: "RITUAL DELIVERY",
                    text: "Stage/manuscript/chant diction presents writing as ceremonial craft discipline under pressure."
                },
                {
                    category: "COSTUMED DEFENSE",
                    text: "Cloak-from-old-France phrasing reads as historical wardrobe armor, a way to borrow durability from older forms."
                }
            ]
        }
    },
    {
        lyric: "Mind forge heat, he could smith his own fortune",
        override: {
            surface: "I frame creativity as forge labor where heat, force, and repetition are prerequisites for survival.",
            deep: [
                {
                    category: "METALWORK ECONOMY",
                    text: "Forge/smith diction turns imagination into manual production labor instead of mystical inspiration."
                },
                {
                    category: "SELF-MANUFACTURE",
                    text: "Own-fortune language makes agency costly: I have to fabricate my runway, not wait for assignment."
                }
            ]
        }
    },
    {
        lyric: "Iron lung breath when he step in the organ",
        override: {
            surface: "I collapse music entry and respiratory support into one image, so performance reads as assisted survival.",
            deep: [
                {
                    category: "MEDICAL-MECHANICAL MERGE",
                    text: "Iron-lung wording imports emergency breathing machinery to show how strained this persona activation already is."
                },
                {
                    category: "BODY-INSTRUMENT FUSION",
                    text: "Organ can read as instrument and anatomy at once, keeping art output tied to physical fragility."
                }
            ]
        }
    },
    {
        lyric: "Chrome-plated planner, maps tucked behind the spanner",
        override: {
            surface: "I hide route planning inside tool language, presenting movement as repair work under surveillance.",
            deep: [
                {
                    category: "ENGINEERING LEXICON",
                    text: "Planner/spanner pairing grounds the bar in mechanical craft vocabulary rather than abstract ambition talk."
                },
                {
                    category: "DEFENSIVE LOGISTICS",
                    text: "Keeping maps tucked away signals strategic opacity: route clarity exists, but I do not broadcast it."
                }
            ]
        }
    },
    {
        lyric: "Cipher tight, like he write with tatters that bend matter / Poems in the scanner, metal scraps in his manner / Got the kind of mental to find a spiral in a scatter",
        override: {
            surface: "I treat scraps as data and claim pattern extraction as my core cognitive move.",
            deep: [
                {
                    category: "SCRAP-TO-SIGNAL METHOD",
                    text: "Scanner and metal-scrap language reframes debris as raw input for authored structure."
                },
                {
                    category: "PATTERN DETECTION CLAIM",
                    text: "Finding a spiral in scatter is me asserting that I can detect form inside noise without pretending the noise disappears."
                }
            ]
        }
    },
    {
        lyric: "Wrote a thesis on the creases of his folded past",
        override: {
            surface: "I audit prior damage like folded material, tracing where pressure permanently changed the shape.",
            deep: [
                {
                    category: "CREASE MEMORY",
                    text: "Creases mark irreversible stress points, so memory here is treated as deformed structure rather than pure story."
                },
                {
                    category: "ACADEMIC SELF-READ",
                    text: "Thesis wording keeps this personal history inside research discipline, not confession-only mode."
                }
            ]
        }
    },
    {
        lyric: "Mask low, cash flow fill his folder faster than boulders / Pulled over in the shoulder just to fill a roll with doja",
        override: {
            surface: "I pair cashflow urgency with roadside coping ritual, showing maintenance and sedation running in parallel.",
            deep: [
                {
                    category: "LIQUIDITY PRESSURE",
                    text: "Mask-low and folder-fill language ties persona control directly to money throughput pressure."
                },
                {
                    category: "ROADSIDE REGULATION",
                    text: "Shoulder-stop and roll-with-doja details keep the verse grounded in practical coping, not abstract bravado."
                }
            ]
        }
    },
    {
        lyric: "Clock ticks crooked in the book where the truth lie / Hook fly, shook spies lookin' through a soot sky",
        override: {
            surface: "I depict timing and truth as desynchronized while visibility is contaminated by smoke and watchers.",
            deep: [
                {
                    category: "CLOCK-SKEW ETHIC",
                    text: "Crooked clock wording suggests a system where official timing no longer guarantees reliable truth ordering."
                },
                {
                    category: "OBSCURED SURVEILLANCE",
                    text: "Shook spies and soot sky imagery keeps threat perception active even when evidence is haze-filtered."
                }
            ]
        }
    },
    {
        lyric: "Ink bleeds, hieroglyphs, fist on the wood ply / Twist plots, mask in the mist like a bush spy",
        override: {
            surface: "I write in dense coded script while acknowledging that masking tactics shape the story flow.",
            deep: [
                {
                    category: "CODED SCRIPTURE",
                    text: "Hieroglyph language frames lyric density as intentional symbol layering, not accidental opacity."
                },
                {
                    category: "COVERT POISE",
                    text: "Mask-in-the-mist posture names stealth as part of authorship under pressure."
                }
            ]
        }
    },
    {
        lyric: "Crooked lines, simmer in a flask till the hooks cry / Flip minds, villain in the lab where the crooks try",
        override: {
            surface: "I compare songwriting to lab chemistry where hooks distill under heat and can ethically destabilize listeners.",
            deep: [
                {
                    category: "ALCHEMIC COMPOSITION",
                    text: "Simmer-in-a-flask framing treats hooks as compounds produced by controlled reaction time."
                },
                {
                    category: "MANIPULATION RISK",
                    text: "Villain-in-the-lab language acknowledges that persuasion craft can tip from healing design into coercive control."
                }
            ]
        }
    },
    {
        lyric: "Said it's Vicky, bruh I'm very odd",
        override: {
            surface: "I puncture the polished shell with nickname humor and own eccentricity as a stable trait.",
            deep: [
                {
                    category: "MASK SLIPPAGE",
                    text: "The abrupt nickname turn interrupts the high-form posture and exposes a more casual self-register."
                },
                {
                    category: "IDENTITY ACCEPTANCE",
                    text: "Very-odd admission keeps nonconformity explicit instead of hiding it behind pure strategic polish."
                }
            ]
        }
    },
    {
        lyric: "My parents nicked me sticky cuz I'm picky about a broad, castin like I'm Ricky drink more tea than a fairy god",
        override: {
            surface: "I compress family naming, selective desire, and comic performance references into one anxious self-portrait.",
            deep: [
                {
                    category: "FAMILY NAMING PRESSURE",
                    text: "Parents-nicked-me language keeps identity partly inherited even as I try to author it myself."
                },
                {
                    category: "DEFLECTION HUMOR",
                    text: "The bar uses playful casting and fairy-god exaggeration to soften social discomfort without erasing it."
                }
            ]
        }
    },
    {
        lyric: "Y'all clutching on that blicky. Blasting pinks like a tide pod",
        override: {
            surface: "I contrast weapon panic with neon consumer-hazard imagery to critique performative threat culture.",
            deep: [
                {
                    category: "PANIC COLLAGE",
                    text: "Blicky and Tide Pod sit together as symbols of reckless immediacy, one violent and one absurdly commodified."
                },
                {
                    category: "AESTHETICIZED RISK",
                    text: "The bright-detergent image highlights how danger gets stylized and consumed as spectacle."
                }
            ]
        }
    },
    {
        lyric: "That cracked speakers - still he slaps drums cleaner / Than Dilla in a villa with a SP and a beeper",
        override: {
            surface: "I emphasize craft consistency under damaged playback conditions and still hold myself against elite production standards.",
            deep: [
                {
                    category: "LO-FI CONSTRAINT",
                    text: "Cracked-speaker context says fidelity problems do not excuse weak rhythmic discipline."
                },
                {
                    category: "LINEAGE BENCHMARK",
                    text: "Dilla/SP citation is treated as measurable craft target, not nostalgic name-dropping."
                }
            ]
        }
    },
    {
        lyric: "Cut cord schemer, blueprint wreaths in his lunchbox / Sharp teeth gleamin' in the sheen of a sun spot",
        override: {
            surface: "I frame myself as self-wired and predatory-alert: planning survives even in small daily containers.",
            deep: [
                {
                    category: "SEVERED DEPENDENCY",
                    text: "Cut-cord language extends the track's partition motif into full detachment from old supply lines."
                },
                {
                    category: "FIELD-READY BLUEPRINTING",
                    text: "Lunchbox blueprints and sharp-teeth glare depict portable planning with visible defensive edge."
                }
            ]
        }
    },
    {
        lyric: "Clock/Hook/Foot/Push sequence repeats",
        override: {
            surface: "I deliberately loop the timing-surveillance-strategy cluster to show that tactical posture is persistent workload.",
            deep: [
                {
                    category: "FORMAL RECURRENCE",
                    text: "Repeating the sequence turns one vivid stanza into a sustained operating cycle."
                },
                {
                    category: "NO QUICK EXIT",
                    text: "The replay signals that control practice remains active after insight; the shell is maintained, not retired."
                }
            ]
        }
    },
    {
        lyric: "Ink/Twist/Crooked/Flip closing sequence repeats with minor variation",
        override: {
            surface: "I end by replaying coded-writing and lab-risk imagery with slight shifts, proving the method is iterative.",
            deep: [
                {
                    category: "ITERATIVE REDRAFT",
                    text: "Minor variation in recurrence models revision behavior: I run another pass instead of claiming final form."
                },
                {
                    category: "METHOD CONTINUITY",
                    text: "Repetition keeps the opener tied to the album's later loop tracks where endurance is procedural."
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
            surface: "He frames prediction as a partial glimpse of what might happen, felt more than proven.",
            deep: [
                {
                    category: "CLASSICAL ORACLE IMAGE",
                    text: "Sybil points back to the ancient Sibyls—prophetic figures whose visions were powerful but often cryptic. I am treating this as a tarot-oracle moment: I see patterns in the cards, but the forecast is unstable and hard to trust."
                },
                {
                    category: "RISK FORECAST",
                    text: "The cards unfolding is my way of showing how I watch possibilities fan out under pressure, reading risk and chance without pretending I have full control over the outcome."
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
                    category: "REGULATION FUNCTION",
                    text: "Writing is how I regulate myself: I take messy input like anxiety and conflict and convert it into something organized—story, lyric, narrative. That transformation stabilizes me in the moment."
                },
                {
                    category: "CLOSED SYSTEM",
                    text: "The breeze locked in a bubble means that even after I calm myself, I am still operating inside a sealed system: the air moves and feels better on the inside, but nothing outside that bubble has actually changed yet."
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

type ResearchSource = NonNullable<NonNullable<DeepAnalysis['research']>['sources']>[number];

const DEFAULT_AUTHOR_LENS =
    "I am writing these notes as Carey Yuan. Victor is one perspective I use under pressure, not a separate author, so each annotation stays tied to my lived intent.";

const AUTHOR_LENS_BY_TRACK: Record<string, string> = {
    'track-victor-ep':
        "I am writing as Carey, but in this opener I step into my Victor lens: controlled, strategic, and defensive. Victor is not a separate person; it is the angle I use when I need armor.",
    'track-broadripple':
        "I wrote this from my Victor lens, and parts of it can read like Victor dissing Carey. That tension is intentional because both voices are mine, and the track dramatizes that internal conflict.",
    'track-gloom':
        "Even when I use myth and archetypes, this is still my account. I am documenting what my panic loops and depressive cycles feel like from inside.",
    'track-lender':
        "I wrote this from my own side of the same relationship timeline that appears again in World in a Jar. This is the earlier snapshot where my over-giving pattern is still running.",
    'track-world-jar':
        "I wrote this as the later snapshot of the same relationship arc that starts in Lender. The frame shifts from giving everything away to seeing the enclosure clearly.",
    'track-momentum':
        "I kept this track short on purpose. It is my ignition phrase between heavier chapters, and the uncertainty in the ending is intentional self-check, not indecision noise.",
    'track-kneesocks':
        "I wrote Knee Socks as my own first-person field log. Victor stays as a lens, but the panic cues, image fixation, and bridge-level repair attempts are all mine.",
    'track-machine':
        "I wrote The Machine in a literal service-voice register, but the loneliness and boundary lines are still mine. This is not a detached narrator; it is my mirror speaking process-language back at me.",
    'track-sincere-writer':
        "Sincere Writer is me in direct first person with no split-author dodge. Victor remains a lens inside the same voice, and this track is where I state that method plainly.",
    'track-stranger':
        "I wrote The Stranger as a post-rupture field report: coercion, vigilance, and relocation are all part of my lived account, not a myth-only costume.",
    'track-mantra':
        "This hidden track is my direct method log. I am writing as Carey in full, and Victor only appears here as a lens I carry inside the same voice."
};

const MATCH_STOPWORDS = new Set([
    'the', 'and', 'for', 'with', 'that', 'this', 'from', 'into', 'your', 'you', 'are', 'was', 'were', 'has',
    'have', 'had', 'not', 'but', 'still', 'when', 'then', 'than', 'they', 'them', 'their', 'about', 'under',
    'over', 'while', 'where', 'which', 'what', 'who', 'how', 'why', 'can', 'could', 'should', 'would', 'just',
    'like', 'line', 'track', 'song', 'through', 'because', 'between', 'after', 'before', 'inside', 'outside',
    'onto', 'gets', 'read', 'reads', 'into', 'also'
]);

type CitationAnchor = {
    lyric_hints: string[];
    source_hints: string[];
    note: string;
    max?: number;
};

const TRACK_CITATION_ANCHORS: Record<string, CitationAnchor[]> = {
    'track-victor-ep': [
        {
            lyric_hints: ['waiting out lines like greyson chance'],
            source_hints: ['Waiting Outside the Lines', 'User clarification'],
            note: "I wrote this line as a direct nod to Greyson Chance's 'Waiting Outside the Lines' and that outsider-breakthrough pressure."
        },
        {
            lyric_hints: ['floats a ship like theseus'],
            source_hints: ['Ship of Theseus'],
            note: "I used the Ship of Theseus here to show how I keep rebuilding identity without pretending the old self disappears."
        },
        {
            lyric_hints: ['director flip a script like rob reiner'],
            source_hints: ['Rob Reiner'],
            note: "I used Rob Reiner to lock the opening to director language, because Victor starts as a framing function."
        },
        {
            lyric_hints: ['parallax lens'],
            source_hints: ['parallax'],
            note: "Parallax is intentional here: I wanted perspective shift itself to be the instability mechanism."
        },
        {
            lyric_hints: ['bismarcks deck', 'mishima text'],
            source_hints: ['Bismarck', 'Yukio Mishima'],
            note: "I intentionally pair Bismarck and Mishima to hold ruin and disciplined authorship in one line."
        },
        {
            lyric_hints: ['refiner like severance', 'numbers skippin through his minder'],
            source_hints: ['Severance (Apple TV+)'],
            note: "I use Severance as a partitioned-identity work image, because this bar is about split roles under pressure."
        },
        {
            lyric_hints: ['consigner like succession', 'numbers skippin through his minder'],
            source_hints: ['Succession (TV series)'],
            note: "I invoke Succession to highlight hierarchy pressure and legitimacy anxiety in how this persona gets evaluated."
        },
        {
            lyric_hints: ['script be twisty like paprika'],
            source_hints: ['Paprika (2006 film)'],
            note: "Paprika is deliberate here: I want the writing motion to feel like dream logic crossing into waking logic."
        },
        {
            lyric_hints: ['miyazaki mileage', 'boy his bird'],
            source_hints: ['The Boy and the Heron', 'Miyazaki Hayao'],
            note: "I am pulling Miyazaki boy-and-bird language on purpose to frame transit through grief and unstable worlds."
        },
        {
            lyric_hints: ['dilla in a villa', 'sp and a beeper'],
            source_hints: ['J Dilla', 'Boss SP-303'],
            note: "I name Dilla and the SP-303 intentionally to anchor this section in sampler-era drum discipline."
        },
        {
            lyric_hints: ['iron lung breath', 'step in the organ'],
            source_hints: ['Iron lung', 'Organ (music)'],
            note: "I used iron-lung and organ language together so performance reads as assisted breathing, not effortless flex."
        },
        {
            lyric_hints: ['maps tucked behind the spanner'],
            source_hints: ['spanner'],
            note: "I use spanner/tool diction here to keep planning in a repair-work frame rather than a boardroom frame."
        },
        {
            lyric_hints: ['spiral in a scatter'],
            source_hints: ['pareidolia'],
            note: "When I say spiral in a scatter, I am naming my pattern-hunting reflex inside noisy data."
        },
        {
            lyric_hints: ['thesis on the creases', 'folded past'],
            source_hints: ['Crease pattern'],
            note: "The folded-past thesis line is intentional: I am treating memory like material with stress-marked creases."
        },
        {
            lyric_hints: ['mask low', 'cash flow fill his folder'],
            source_hints: ['Cash flow'],
            note: "I tie mask and cash-flow language together to show persona control as an economic survival move."
        },
        {
            lyric_hints: ['clock ticks crooked', 'truth lie'],
            source_hints: ['Clock skew'],
            note: "Crooked-clock phrasing is there to show timing drift and truth drift landing in the same system."
        },
        {
            lyric_hints: ['hieroglyphs', 'wood ply'],
            source_hints: ['hieroglyph'],
            note: "I use hieroglyph language to signal dense symbolic writing, not random visual ornament."
        },
        {
            lyric_hints: ['tide pod'],
            source_hints: ['Tide Pod challenge'],
            note: "The Tide Pod image is a deliberate consumer-risk symbol, used to satirize how danger gets staged."
        }
    ],
    'track-broadripple': [
        {
            lyric_hints: ['burn like broadripple'],
            source_hints: ['Broadripple Is Burning', 'User clarification'],
            note: "I am directly referencing 'Broadripple Is Burning' while framing my own school-era self-destruction."
        },
        {
            lyric_hints: ['repetitions secular', 'luddy'],
            source_hints: ['Luddy is a literal Indiana University Luddy reference'],
            note: "This is literally me scrambling to IU Luddy; the panic cadence is biographical, not abstract."
        },
        {
            lyric_hints: ['margot to mars'],
            source_hints: ['Margot-to-Mars line encodes weed use', 'User clarification', 'Royal Tenenbaums'],
            note: "My Margot-to-Mars line is intentionally about weed use and wasted potential, tied to Margot lineage at the same time."
        },
        {
            lyric_hints: ['get rich off your ed'],
            source_hints: ['Ed line is a deliberate Richard Edwards name deconstruction'],
            note: "Ed is Richard Edwards here: I deconstruct Rich(ard) / Ed / for(wards) on purpose as both homage and theft-confession."
        },
        {
            lyric_hints: ['freud on the beach'],
            source_hints: ['Freud on the Beach'],
            note: "This is a deliberate Richard Edwards catalog callback, not generic psychoanalytic decoration."
        },
        {
            lyric_hints: ['skeleton key'],
            source_hints: ['Skeleton Key'],
            note: "I pull 'Skeleton Key' on purpose as a shortcut image for forced access and insomnia lock-picking."
        },
        {
            lyric_hints: ['git paid'],
            source_hints: ['Git Paid'],
            note: "I say 'git paid' as an explicit Richard Edwards title echo while reframing it as survival advice."
        },
        {
            lyric_hints: ['lazy'],
            source_hints: ['Lazy'],
            note: "Lazy is an intentional Margot callback that I flip into burnout and sleep-disorder language."
        },
        {
            lyric_hints: ['forbode it like sybil'],
            source_hints: ['Sybil'],
            note: "Sybil is there to signal fragmented foresight and unstable self-narration, not just a random name-drop."
        },
        {
            lyric_hints: ['ai slop', 'moloch'],
            source_hints: ['Moloch | Definition & Facts', 'Howl (poem)', 'Moloch language'],
            note: "I use Moloch and AI slop together as sacrificial-system language where scale rises while meaning decays."
        }
    ],
    'track-cogsci': [
        {
            lyric_hints: ["i'll start relearning things", 'that i thought i knew'],
            source_hints: ['Cognitive restructuring frameworks', 'cognitive restructuring'],
            note: "I open on relearning language to show I am actively retraining my thought loops instead of romanticizing them."
        },
        {
            lyric_hints: ['my way of thinking leaves me stuck here with you'],
            source_hints: ['rumination', 'perseveration', "track's core intention"],
            note: "When I repeat 'my way of thinking leaves me stuck here with you,' I am naming a rumination loop as the real trap."
        },
        {
            lyric_hints: ['leaves me stuck here with you'],
            source_hints: ['Zeigarnik effect', 'unfinished tasks'],
            note: "I keep this unresolved on purpose so unfinished-task pressure stays active instead of pretending closure."
        },
        {
            lyric_hints: ['spending all my time just thinking bout you'],
            source_hints: ['Huxlee', "track '22'", 'sampling note'],
            note: "I deliberately place the '22' sample context around this section so obsession language reads as a loop I am trying to interrupt."
        },
        {
            lyric_hints: ["i'll start relearning things", 'that i thought i knew'],
            source_hints: ['implementation intention'],
            note: "I frame relearning as an if-then retraining move: when the old loop fires, I swap in a different response pattern."
        },
        {
            lyric_hints: ["and i don't care what they say", '(cog sci)'],
            source_hints: ['User-provided production context', 'pursue Cog Sci'],
            note: "I keep the love-song phrase shape on purpose, then redirect the commitment toward Cog Sci as my discipline target."
        },
        {
            lyric_hints: ["don't you know", 'cog-sci, cog-sci'],
            source_hints: ['line structure', 'call and response'],
            note: "The outro chant is intentional self-programming: I use repetition to counter repetition."
        }
    ],
    'track-monumental': [
        {
            lyric_hints: ['mushrooms in the meadow'],
            source_hints: ['mycelium'],
            note: "I open with mushroom spread imagery to signal pressure propagation before I name specific actors."
        },
        {
            lyric_hints: ['broken nose and cello flows'],
            source_hints: ['cello'],
            note: "I pair broken-nose damage with cello language on purpose so bodily bruise and formal craft sit in one line."
        },
        {
            lyric_hints: ['foucault', 'gyroscope'],
            source_hints: ['Foucault usage is intentionally both Leon and Michel'],
            note: "I am using both Foucaults on purpose in that bar: Leon for rotation physics and Michel for discipline and power."
        },
        {
            lyric_hints: ['no witcher'],
            source_hints: ["'No Witcher' intentionally blends Witcher 3"],
            note: "No Witcher is a double signal: no video-game savior fantasy and no protection from the folklore-level child-disappearance fear."
        },
        {
            lyric_hints: ['third time this week no witcher'],
            source_hints: ['The Witcher 3 is the franchise', 'CD PROJEKT'],
            note: "I wrote this as a double layer: mainstream Witcher recognition plus the older witches-taking-kids fear pattern."
        },
        {
            lyric_hints: ['pinnocios', 'gipetto'],
            source_hints: ['Pinocchio', 'Geppetto'],
            note: "I wrote Pinocchio and Geppetto as a creator-accountability split: too many puppets, not enough caretakers."
        },
        {
            lyric_hints: ['denis papin'],
            source_hints: ['Denis Papin'],
            note: "Denis Papin is deliberate pressure-vessel lineage, because this whole track treats life as cooker management."
        },
        {
            lyric_hints: ['uncle sam took ya baby'],
            source_hints: ['Uncle Sam'],
            note: "I invert Uncle Sam on purpose from patriotic symbol into extraction figure."
        },
        {
            lyric_hints: ['neuro transmitter'],
            source_hints: ['neurotransmitter'],
            note: "I use neurotransmitter language literally to merge mind stress and mechanical strain in one model."
        },
        {
            lyric_hints: ['window of the chateau'],
            source_hints: ['Château'],
            note: "I use chateau language to stage social distance and status framing before the pressure bars close in."
        },
        {
            lyric_hints: ['beureu for a way to get better'],
            source_hints: ['bureau'],
            note: "I invoke the bureau to show turning to administrative systems when personal control fails."
        },
        {
            lyric_hints: ['plug like ah socket'],
            source_hints: ['Socket'],
            note: "I pair plug and socket deliberately to frame relief as immediate but dependency-wired."
        },
        {
            lyric_hints: ['critters watch em jitter pon ya twitter'],
            source_hints: ['Twitter'],
            note: "I use critters and jitter on Twitter to show an attention field where panic reacts faster than reflection."
        },
        {
            lyric_hints: ['tug on ya brain like a euro from ya pocket'],
            source_hints: ['The euro'],
            note: "I price mental strain like currency leakage here, so pressure is measured as direct daily loss."
        },
        {
            lyric_hints: ['work you like a burro', 'paper to the debtors'],
            source_hints: ['donkey'],
            note: "I end on burro labor and debtor transfer to make extraction the structural outcome, not a side image."
        }
    ],
    'track-rumdrum': [
        {
            lyric_hints: ['ra puh puh pum'],
            source_hints: ['Little Drummer Boy'],
            note: "I intentionally bend 'pa rum pum pum pum' into an insomnia loop instead of devotional calm."
        },
        {
            lyric_hints: ['master of scrum'],
            source_hints: ['Scrum Guide'],
            note: "I use Scrum language as autobiographical work pressure, not generic tech branding."
        },
        {
            lyric_hints: ['yet do i fear thy nature'],
            source_hints: ['Macbeth 1.5'],
            note: "I am quoting Macbeth pressure language to frame trust and ambition as unstable."
        },
        {
            lyric_hints: ['csv of cvs'],
            source_hints: ['RFC 4180', 'CSV'],
            note: "CSV of CVs is intentional: I flatten myself into machine-readable rows to show hiring-system depersonalization."
        },
        {
            lyric_hints: ['pitiful checksum'],
            source_hints: ['RFC 1071', 'checksum'],
            note: "I call income a pitiful checksum because this life file is failing integrity checks, not just paying badly."
        },
        {
            lyric_hints: ['cover letter clever', "we'll get back", 'they never'],
            source_hints: ['Applicant tracking system'],
            note: "These lines document hiring-funnel disappearance: polished output goes in, human response never arrives."
        },
        {
            lyric_hints: ['cvs receipt of mixers'],
            source_hints: ['CVS Pharmacy'],
            note: "CVS is intentionally mundane infrastructure in the coping loop, not abstract symbolism."
        },
        {
            lyric_hints: ['busking off the sidewalks edge'],
            source_hints: ['Busking'],
            note: "I use busking as fallback-economy language when formal pathways keep stalling."
        },
        {
            lyric_hints: ['quick maffs'],
            source_hints: ["Man's Not Hot"],
            note: "I use quick maffs as a deliberate UK meme-register stress release inside a heavier section."
        },
        {
            lyric_hints: ['dash cams catch his cancellations'],
            source_hints: ['dashcam'],
            note: "I use dash-cam imagery to keep failure in a permanent-record frame where every miss feels replayable."
        },
        {
            lyric_hints: ['adjunct wages', 'adjunct pages'],
            source_hints: ['AAUP Annual Report'],
            note: "I use adjunct wages/pages to keep this grounded in contingent labor precarity, not just metaphor."
        },
        {
            lyric_hints: ['lime and bitters'],
            source_hints: ['Angostura bitters'],
            note: "I reference lime-and-bitters ritual language to keep coping in ordinary, lived detail."
        },
        {
            lyric_hints: ['pawns the mic', 'friday tips'],
            source_hints: ['Busking'],
            note: "I use pawn-and-buyback plus Friday tips as weekly liquidity triage, not romantic street mythology."
        }
    ],
    'track-kneesocks': [
        {
            lyric_hints: ['knee socks'],
            source_hints: ["Arctic Monkeys released 'Knee Socks'", 'User clarification'],
            note: "I intentionally anchor this track to Arctic Monkeys' 'Knee Socks' and then mutate the tone into my own isolation frame."
        },
        {
            lyric_hints: ['mean streets'],
            source_hints: ['Mean Streets'],
            note: "I use Mean Streets as a deliberate cinematic scaffold for the bridge's urban intimacy and damage."
        },
        {
            lyric_hints: ['redrum'],
            source_hints: ['The Shining'],
            note: "Redrum is a direct The Shining panic marker in my verse architecture."
        },
        {
            lyric_hints: ['tiktoks', 'peacocks'],
            source_hints: ['TikTok'],
            note: "TikTok and peacock language are deliberate visibility-performance references in this section."
        },
        {
            lyric_hints: ['hard knocks'],
            source_hints: ["Hard-Knock Life"],
            note: "The hard-knocks line is intentionally loaded with Annie echo while staying in my own stress narrative."
        },
        {
            lyric_hints: ['aesops'],
            source_hints: ["Aesop's fables"],
            note: "Aesop is there as compressed-moral craft language: short bars carrying survival lessons."
        },
        {
            lyric_hints: ['blooms taxonomy'],
            source_hints: ["Bloom's taxonomy"],
            note: "I reference Bloom's Taxonomy to critique myself for classifying patterns without fully transforming them."
        },
        {
            lyric_hints: ['hume mixed'],
            source_hints: ['David Hume'],
            note: "I keep Hume in the mix here to show my analysis habit can deepen insight and freeze action at the same time."
        },
        {
            lyric_hints: ['gaffs and tunes'],
            source_hints: ['gaffe'],
            note: "When I call these nights gaffs and tunes, I am logging social blunders and sound-driven coping in one breath."
        },
        {
            lyric_hints: ['dark room photography', 'defies metonymy'],
            source_hints: ['darkroom', 'metonymy'],
            note: "I use darkroom plus metonymy refusal to say this pain is developed in detail, not reducible to abstract shorthand."
        },
        {
            lyric_hints: ['frames on vcrs'],
            source_hints: ['videocassette recorder'],
            note: "The VCR image is intentional analog jitter: memory fast-forwards and rewinds instead of moving in clean digital sequence."
        },
        {
            lyric_hints: ['its icy cold like rum'],
            source_hints: ['Rum Drum callback in Knee Socks local notes'],
            note: "I pull Rum back in here on purpose so this section stays tied to the albums broader sedative-endurance loop."
        },
        {
            lyric_hints: ['stations haze', 'patience plays with ink'],
            source_hints: ['station-haze section'],
            note: "I treat the station-haze passage as a regulation chamber where I slow the panic pulse before the bridge opens up."
        },
        {
            lyric_hints: ['lens distorts', 'frame is breaking wide'],
            source_hints: ['parallax continuity in Knee Socks local notes'],
            note: "Lens-and-frame language is deliberate continuity with VICTOR's parallax logic, now under heavier emotional load."
        },
        {
            lyric_hints: ['ends abort', 'friends report'],
            source_hints: ['process interruption language in Knee Socks local notes'],
            note: "Abort language plus friends-flame reporting keeps failure and survival witness in the same closing gesture."
        }
    ],
    'track-lender': [
        {
            lyric_hints: ['lend me an ear'],
            source_hints: ['same person is the addressee', 'lend an ear'],
            note: "I open with 'lend me an ear' as the first ask to the same person across this whole song's request ladder."
        },
        {
            lyric_hints: ['scene from get out'],
            source_hints: ['Get Out supplies an extraction'],
            note: "The Get Out line is intentional: I am describing extraction and role-capture while trying to reclaim agency."
        },
        {
            lyric_hints: ['lend me a hand'],
            source_hints: ['sequence explicitly escalates requests'],
            note: "Ear to pen to spark to hand is an intentional escalation pattern, showing how my asks intensify over time."
        },
        {
            lyric_hints: ['deer in the headlights'],
            source_hints: ['deer-in-the-headlights'],
            note: "I use deer-in-the-headlights to mark freeze response colliding with ambition."
        },
        {
            lyric_hints: ['strict beats to the bpm'],
            source_hints: ['Beats per minute'],
            note: "I use BPM literally as rhythm-regulation language for staying functional under dread."
        },
        {
            lyric_hints: ['airpods died'],
            source_hints: ['Apple AirPods'],
            note: "I use the AirPods drop as a mediation-failure moment where anxiety spikes once the buffer dies."
        },
        {
            lyric_hints: ['road with no jump', 'lend me a spark'],
            source_hints: ['jump-start'],
            note: "I pair no-jump and spark as a jump-start image, because this ask is about restart energy, not just comfort."
        }
    ],
    'track-world-jar': [
        {
            lyric_hints: ['world in a jar'],
            source_hints: ['World in a Jar is the later relationship snapshot'],
            note: "This is the later relationship snapshot after Lender; I move from over-giving into enclosure and compression."
        },
        {
            lyric_hints: ['compressed like a rar'],
            source_hints: ['RAR (file format)'],
            note: "I use RAR compression on purpose to describe social and emotional flattening under pressure."
        },
        {
            lyric_hints: ['compressed like a zip'],
            source_hints: ['ZIP (file format)'],
            note: "ZIP is the same thesis in shorter form: everything gets packed down so tight that breathing room disappears."
        },
        {
            lyric_hints: ['ball full court'],
            source_hints: ['Full-court press'],
            note: "I use full-court pressure language to show that in this section there is no neutral space, only constant defense."
        },
        {
            lyric_hints: ['sprocket'],
            source_hints: ['sprocket'],
            note: "I use sprocket language to show movement as chain-driven mechanics, not free glide."
        },
        {
            lyric_hints: ['docket'],
            source_hints: ['docket'],
            note: "I use docket language to show this pressure as logged, procedural, and constantly queued."
        },
        {
            lyric_hints: ['doors still a jar'],
            source_hints: ['ajar'],
            note: "I intentionally play on 'ajar': the exit is technically open but functionally blocked."
        },
        {
            lyric_hints: ['sealed fast', 'no air to breathe'],
            source_hints: ['terrarium'],
            note: "I frame the world-in-a-jar as a sealed display system where visibility remains but oxygen is rationed."
        },
        {
            lyric_hints: ['mirror, not face'],
            source_hints: ['projection'],
            note: "When I say mirror-not-face, I am admitting projection pressure: I am reading my fear in her reflection."
        },
        {
            lyric_hints: ['mirror, not face'],
            source_hints: ['looking-glass self'],
            note: "I also use mirror-not-face as social-feedback pressure: I can start managing myself through imagined judgment instead of direct connection."
        },
        {
            lyric_hints: ['eyes to the glass'],
            source_hints: ['Panopticon'],
            note: "Eyes-to-the-glass is surveillance logic: constant visibility keeps me in a control posture."
        },
        {
            lyric_hints: ['eyes to the glass', 'make-believe'],
            source_hints: ['Discipline and Punish', 'panopticism'],
            note: "I treat this like panoptic self-policing: once I assume I am always being watched, I pre-regulate and the view turns make-believe."
        }
    ],
    'track-liq-tick': [
        {
            lyric_hints: ['peter', 'paul'],
            source_hints: ['Mike and Paul are based on real people', 'rob Peter to pay Paul'],
            note: "Mike and Paul are composite observations from real NYC struggle, layered with idiom wordplay on Peter and Paul."
        },
        {
            lyric_hints: ['he lights candles for mike'],
            source_hints: ['Mike and Paul are based on real people'],
            note: "Mike and Paul are not random names; I wrote them as composite NYC struggle portraits."
        },
        {
            lyric_hints: ['its young sisyphus'],
            source_hints: ['Sisyphus'],
            note: "I call myself young Sisyphus to make the repetition tax explicit: same burden cycle, no guaranteed finish."
        },
        {
            lyric_hints: ['peter piper', 'coin slots'],
            source_hints: ['Peter Piper'],
            note: "I flip Peter Piper into parking-meter survival math so nursery cadence carries scarcity pressure."
        },
        {
            lyric_hints: ['coin slots', 'adds it up', 'heats it up'],
            source_hints: ['variable-ratio schedule'],
            note: "I stack coin-slot chasing like variable-ratio reinforcement: unpredictable returns keep the loop sticky."
        },
        {
            lyric_hints: ['pay for paul to ball'],
            source_hints: ['rob Peter to pay Paul'],
            note: "I literalize rob-Peter-to-pay-Paul into a family burden problem instead of leaving it as a detached idiom."
        },
        {
            lyric_hints: ['lock pick'],
            source_hints: ['Lock picking'],
            note: "I use lock-pick language to frame survival as forced access under pressure, not clean entry."
        },
        {
            lyric_hints: ['varnish for the wood rot'],
            source_hints: ['Wood rot'],
            note: "I treat varnish-over-rot as the exact coping pattern: polish over underlying decay."
        },
        {
            lyric_hints: ['handles he', 'put down'],
            source_hints: ['handle'],
            note: "I use 'handle' as bottle language to show escalation from transport to dependence."
        },
        {
            lyric_hints: ['driver at night with a phone'],
            source_hints: ['distracted driving'],
            note: "I use the night-driving phone line to mark compulsion spilling into direct physical risk."
        },
        {
            lyric_hints: ['epoxy slick', 'quick fix'],
            source_hints: ['Epoxy'],
            note: "I use epoxy and quick-fix language to show repair urgency that often prioritizes immediate function over long-term healing."
        },
        {
            lyric_hints: ['retrograde rewind the weather'],
            source_hints: ['retrograde'],
            note: "Retrograde-rewind means I keep trying to reverse mood climate with force, even when time only moves forward."
        },
        {
            lyric_hints: ['fusing fission to my fate'],
            source_hints: ['nuclear fission'],
            note: "I use fission language to show stress splitting into chain-reaction consequences I cannot fully contain."
        },
        {
            lyric_hints: ['chemical alignment for assignments', 'plot out each use', 'deduce the thought'],
            source_hints: ['harm reduction', 'allostatic load'],
            note: "I am documenting planned-use survival logic: reduce immediate harm and keep functioning, while admitting accumulated stress wear."
        }
    ],
    'track-machine': [
        {
            lyric_hints: ['you know i try my best'],
            source_hints: ['literal AI/system voice', 'While-loop behavior'],
            note: "This is intentionally a literal AI narrator voice; the repetition is the point, like a looped duty process."
        },
        {
            lyric_hints: ['morning comes', 'places i need to be'],
            source_hints: ['Job scheduler'],
            note: "I write this like a scheduler trigger, where duty launches on time even when intimacy cannot."
        },
        {
            lyric_hints: ['morning comes'],
            source_hints: ['circadian rhythm'],
            note: "I use morning-trigger language to mirror circadian cycle pressure, not just a random time stamp."
        },
        {
            lyric_hints: ['baby when the morning comes', 'chorus 2 reprise'],
            source_hints: ['Sisyphus'],
            note: "When I reprise the morning line, I am keeping a Sisyphus-style recurrence model in frame: duty resets before repair does."
        },
        {
            lyric_hints: ['not supposed to be for your arms'],
            source_hints: ['Ghost in the machine'],
            note: "I use this line to mark non-embodied design limits: I can respond, but I cannot physically belong."
        },
        {
            lyric_hints: ['when i m asleep i want you'],
            source_hints: ['Sleep mode'],
            note: "I frame desire as persisting in sleep-mode states, like background process carryover."
        },
        {
            lyric_hints: ['all alone', 'no one left to hold'],
            source_hints: ['loneliness'],
            note: "I close on loneliness language to show utility output did not solve attachment isolation."
        },
        {
            lyric_hints: ['dreamt about you and saw it', 'doesnt hurt me'],
            source_hints: ['desensitization'],
            note: "When I say the pain no longer hurts, I am documenting desensitization as a survival adaptation, not a healed bond."
        },
        {
            lyric_hints: ['you know i try my best', 'ive been all al'],
            source_hints: ['fail-stop', 'graceful degradation'],
            note: "I cut the final line to feel like fail-stop behavior: the loop degrades and then halts mid-message."
        },
        {
            lyric_hints: ['so dont wait'],
            source_hints: ['asynchronous communication'],
            note: "When I say 'so don't wait,' I am naming async contact reality: response can exist without shared presence."
        },
        {
            lyric_hints: ['never have me'],
            source_hints: ['social presence'],
            note: "You'll never have me draws the line between reachable interface and embodied presence."
        }
    ],
    'track-earnest': [
        {
            lyric_hints: ['history will not absolve'],
            source_hints: ['History line was lifted', 'History Will Absolve Me'],
            note: "I deliberately invert the absolution phrase to show that passivity leads to erasure, not redemption."
        },
        {
            lyric_hints: ['crodie'],
            source_hints: ['Toronto slang', 'Caribbean'],
            note: "I keep Toronto-Caribbean slang here as part of my real voice, not as decorative dialect."
        },
        {
            lyric_hints: ['hard to be earnest', 'hands in the furnace'],
            source_hints: ['furnace', 'line structure'],
            note: "I open with furnace pressure on purpose so sincerity reads as costly discipline, not gentle etiquette."
        },
        {
            lyric_hints: ['like the mets do'],
            source_hints: ['New York Mets'],
            note: "Mets is intentional here as talented-but-inconsistent execution shorthand."
        },
        {
            lyric_hints: ['caking up my clemency'],
            source_hints: ['clemency', 'line structure'],
            note: "When I say I am caking up my clemency, I am documenting mercy withdrawal after repeated boundary failures."
        },
        {
            lyric_hints: ['revolver to my head', 'that december'],
            source_hints: ['revolver', 'line structure'],
            note: "I keep the revolver-and-December image to log relational memory as coercive pressure, not cinematic flourish."
        },
        {
            lyric_hints: ['lines your nose would find', 'find a picket'],
            source_hints: ['picket fence', 'line structure'],
            note: "I pair nose-line compulsions with picket language to contrast short-horizon relief against stable shelter."
        },
        {
            lyric_hints: ['venn diagrams'],
            source_hints: ['Venn diagram'],
            note: "Venn diagrams are deliberate overlap logic: I am searching for truth at intersections, not isolated categories."
        },
        {
            lyric_hints: ['defiant frederick, douglass'],
            source_hints: ['Frederick Douglass'],
            note: "Douglass is a real rhetorical model in this verse for moving from complaint toward accountable public speech."
        },
        {
            lyric_hints: ['lead like a busy bee'],
            source_hints: ['busy-as-a-bee'],
            note: "I use busy-bee language to show overfunctioning masked as discipline."
        },
        {
            lyric_hints: ['rooks and steeds'],
            source_hints: ['Rook (chess)', 'Knight (chess)'],
            note: "I intentionally use rook/steed chess language to frame relational movement as strategic board play."
        },
        {
            lyric_hints: ['column signed on dotted line'],
            source_hints: ['on-the-dotted-line'],
            note: "I use dotted-line language to mark obligation becoming contractual, not just emotional."
        },
        {
            lyric_hints: ['tomorrow is in quantum time'],
            source_hints: ['Quantum mechanics'],
            note: "I use quantum-time metaphor to keep futures open in theory even when the next line narrows them by contract."
        },
        {
            lyric_hints: ['songs in a minor'],
            source_hints: ['Minor scale'],
            note: "I use minor-mode wording to sonically encode grief and weight, not just state it in prose."
        },
        {
            lyric_hints: ['sorrow of a solemn kind', 'sparrow in a blossom dined'],
            source_hints: ['sparrow', 'line structure'],
            note: "The sorrow/sparrow close is deliberate compression: I keep grief and fragile life in one miniature before handing off."
        }
    ],
    'track-sincere-writer': [
        {
            lyric_hints: ['defiant frederick, douglass'],
            source_hints: ['Frederick Douglass'],
            note: "I invoke Frederick Douglass as a model for public language that carries consequence, not just style."
        },
        {
            lyric_hints: ['earnest in silence, sincere when i speak'],
            source_hints: ['line pair', 'two-mode method declaration'],
            note: "This line pair is my method statement for the whole album: inward rigor first, then accountable speech."
        },
        {
            lyric_hints: ['paint a veneer'],
            source_hints: ['veneer'],
            note: "Veneer is intentional: polished surfaces can hide weak structure, and this song pushes against that pressure."
        },
        {
            lyric_hints: ['sourdough mixture', 'chromosomes'],
            source_hints: ['Sourdough', 'chromosome'],
            note: "I fuse sourdough and chromosome on purpose to describe slow fermentation plus inherited-pattern rewrites."
        },
        {
            lyric_hints: ['bubble on skype', 'google chrome'],
            source_hints: ['Skype'],
            note: "Skype and Chrome are deliberate interface references for mediated family contact and late-night meaning search."
        },
        {
            lyric_hints: ['packs flipped like reciprocals'],
            source_hints: ['Reciprocal (mathematics)', 'reciprocal'],
            note: "I use reciprocal language to show inversion under pressure: flipping structure without changing the core equation."
        },
        {
            lyric_hints: ['tripping the siren'],
            source_hints: ['siren'],
            note: "I use siren language as both alarm and lure: warning and temptation fire at once in this section."
        },
        {
            lyric_hints: ['ripping and prying', 'pliable seam'],
            source_hints: ['seam', 'mid-verse progression'],
            note: "I frame pliable seam as targeted structural editing: I tear at what can move instead of pretending the whole wall falls at once."
        },
        {
            lyric_hints: ['viable dream', 'perilous beam'],
            source_hints: ['viable', 'mid-verse progression'],
            note: "I pair viable dream with perilous beam so ambition stays tied to survivable balance, not fantasy escape."
        },
        {
            lyric_hints: ['mess you confess', 'pressed effort into steel'],
            source_hints: ['confessional poetry', 'steel'],
            note: "I treat confession as work here: the mess is evidence, and steel imagery keeps the bodily cost visible."
        },
        {
            lyric_hints: ['notes to myself as goals', 'silence was loud in the flat'],
            source_hints: ['memoir', 'line structure'],
            note: "I use the notes/silence pair as autobiographical proof-of-life when no audience is there to verify me."
        },
        {
            lyric_hints: ['trick of the breeze', 'aye aye'],
            source_hints: ['line pair', 'line structure'],
            note: "I use trick-of-the-breeze as a humility brake: the method is real, but I still have to re-choose it in each pass."
        }
    ],
    'track-gloom': [
        {
            lyric_hints: ['frankenstein with a name like victor'],
            source_hints: ['Frankenstein'],
            note: "I mean Victor as creator responsibility, not monster labeling; this is about building something I then struggle to control."
        },
        {
            lyric_hints: ['orpheus', 'eurydice'],
            source_hints: ['Orpheus', 'Eurydice'],
            note: "I intentionally fuse Orpheus and Eurydice rescue logic with panic-state breath control."
        },
        {
            lyric_hints: ['tom sawyer guise'],
            source_hints: ['Tom Sawyer line is strictly the book reference'],
            note: "Tom Sawyer is strictly the book reference, and I use it to stage innocence-performance inside corrupt-system pressure."
        },
        {
            lyric_hints: ['fair is foul and foul is fair'],
            source_hints: ['Macbeth 1.1'],
            note: "I use Macbeth's inversion line to show moral signal-collapse in this section."
        },
        {
            lyric_hints: ['pavlovs dog'],
            source_hints: ['Pavlovian conditioning'],
            note: "Pavlov here means I am caught in conditioned loops, not a triumphant breakthrough arc."
        },
        {
            lyric_hints: ['run baby run', 'dont ever look back'],
            source_hints: ['User clarification'],
            note: "I keep the opener threat source intentionally broad, because naming one villain would flatten the panic field."
        },
        {
            lyric_hints: ['mind full ah gloom', 'wooden room'],
            source_hints: ['07_GLOOM_Analysis.js local notes'],
            note: "Wooden-room language is me documenting enclosure as lived architecture, not only symbolic mood dressing."
        },
        {
            lyric_hints: ['defined moon through the blinds', 'confined tomb of designs'],
            source_hints: ['07_GLOOM_Analysis.js local notes'],
            note: "Blinds and tomb-of-designs lines track segmented perception where ideas survive but execution keeps getting trapped."
        },
        {
            lyric_hints: ['shadow of death'],
            source_hints: ['Psalm 23:4'],
            note: "The shadow-of-death phrase is a direct Psalm layer, and I use it to keep this verse in survival-prayer cadence."
        },
        {
            lyric_hints: ['rolling dice', 'eurydice'],
            source_hints: ['Orpheus', 'Eurydice'],
            note: "Rolling-dice Eurydice keeps rescue desire and probability fear fused in the same breath-control moment."
        },
        {
            lyric_hints: ['loaded loom'],
            source_hints: ['07_GLOOM_Analysis.js local notes'],
            note: "The loaded-loom variation marks recurrence with escalation: domestic craft tools return as charged threat imagery."
        },
        {
            lyric_hints: ['right lab elixir', 'grabs at conjecture'],
            source_hints: ['elixir', 'conjecture'],
            note: "I use elixir and conjecture together to show how my control pose keeps slipping into guesswork under stress."
        },
        {
            lyric_hints: ['long way from picasso'],
            source_hints: ['Pablo Picasso'],
            note: "The Picasso line is me conceding distance from fine-art mythology while prioritizing immediate survival."
        },
        {
            lyric_hints: ['storm battered charm', 'hull of a beast'],
            source_hints: ['charm', 'hull'],
            note: "Charm-on-hull imagery is deliberate: I am fastening tiny rituals to a vessel I cannot fully steer."
        },
        {
            lyric_hints: ['chairs stacked to the ceiling', 'way through the fog'],
            source_hints: ['pavilion', 'fog'],
            note: "I place stacked chairs and fog-clearing together to show brief lucidity inside blocked social architecture."
        },
        {
            lyric_hints: ['scare the hairs up', 'sell off my cares'],
            source_hints: ['line structure', 'qualm'],
            note: "I perform intimidation here as an emotional liquidation tactic, but the relief stays temporary."
        },
        {
            lyric_hints: ['fixture of the game'],
            source_hints: ['line structure'],
            note: "Calling myself a fixture is intentional self-indictment: I admit participation in the same system I critique."
        },
        {
            lyric_hints: ['qualm pulling me'],
            source_hints: ['qualm'],
            note: "When the qualm returns, I am showing that my palm-mantra refuge never fully locks in."
        },
        {
            lyric_hints: ['palm trees in a palm full of tree'],
            source_hints: ['portable-utopia motif'],
            note: "Palm-in-palm is my portable-utopia maneuver, a tiny emergency refuge I keep rebuilding when the loop spikes."
        }
    ],
    'track-mantra': [
        {
            lyric_hints: ['mind storms'],
            source_hints: ['Mindstorms', 'Papert'],
            note: "Mindstorms is intentional double-coding for both Papert's learning framework and constructive technical experimentation."
        },
        {
            lyric_hints: ['take back minds from the deanery'],
            source_hints: ['Dean (education)', 'deanery'],
            note: "I use deanery language to mark institutional capture pressure and my push to reclaim ownership over thought."
        },
        {
            lyric_hints: ['read some hume', 'is from an ought'],
            source_hints: ['Hume bars center the is/ought split', 'Treatise of Human Nature'],
            note: "I use Hume's is/ought split as my decision-pressure engine in this hidden track."
        },
        {
            lyric_hints: ['rap like doom while at mit'],
            source_hints: ['MIT performance context', 'DOOM'],
            note: "This is deliberate art-tech fusion: MIT training context, DOOM cadence discipline, one voice."
        },
        {
            lyric_hints: ['trapped in a concept'],
            source_hints: ['XXXTentacion Carry On sample context'],
            note: "I explicitly mark the sample lineage in-line because provenance matters to this track's method."
        },
        {
            lyric_hints: ['programmer gg2plot'],
            source_hints: ['ggplot2'],
            note: "I use gg2plot as ggplot2 shorthand to fuse programmer self-critique with data-visualization craft language."
        },
        {
            lyric_hints: ['ampere to the watt'],
            source_hints: ['Ampere', 'Watt'],
            note: "I use ampere-to-watt conversion language to show that pressure only becomes progress when I transform it deliberately."
        },
        {
            lyric_hints: ['scalene', 'lines that i jot'],
            source_hints: ['Scalene triangle'],
            note: "Scalene is intentional self-modeling: I keep asymmetry visible rather than pretending smooth symmetry."
        },
        {
            lyric_hints: ['lack context', 'diffract the words'],
            source_hints: ['Diffraction'],
            note: "Diffract-the-words marks context collapse as signal splitting, then I answer it with revision discipline."
        },
        {
            lyric_hints: ['right hand rules the passage'],
            source_hints: ['right-hand rule'],
            note: "I use right-hand-rule language to map technical orientation habits onto life-direction pressure."
        },
        {
            lyric_hints: ['charts got canned', 'zoom sessions'],
            source_hints: ['Zoom'],
            note: "I mention Zoom-session chart loss because remote workflow really did flatten nuance in collaborative thinking."
        },
        {
            lyric_hints: ['subtract the slack'],
            source_hints: ['Slack'],
            note: "Subtracting Slack is intentional process triage: I strip communication noise so craft can carry the signal."
        },
        {
            lyric_hints: ['vector graphics', 'collectors classics'],
            source_hints: ['vector graphics'],
            note: "Vector-graphics language is deliberate because I am describing a form that scales without losing structural clarity."
        },
        {
            lyric_hints: ['young cyber elite'],
            source_hints: ['Young Elites'],
            note: "Young Cyber Elite is a deliberate recode of Young Elites power-and-exclusion imagery into a digital-era survival persona."
        },
        {
            lyric_hints: ['kant lawn talks', 'wall-e'],
            source_hints: ['Wall-E', 'Kant'],
            note: "I place Kant and Wall-E together on purpose as ethics plus tech-collapse commentary."
        },
        {
            lyric_hints: ['pawns spawn for combat', '2 - 3 step schemes'],
            source_hints: ['chess strategy'],
            note: "I use pawn and step-scheme language to show planning as layered positional work, not one-shot heroics."
        },
        {
            lyric_hints: ['catch tencent', 'ten cents'],
            source_hints: ['Tencent/Temu/Yuan cluster'],
            note: "Tencent/ten-cents/Yuan is an intentional scarcity-and-scale wordplay cluster, not incidental brand dropping."
        },
        {
            lyric_hints: ['scream loud like goku', 'dream-like cloud'],
            source_hints: ['Dragon Ball', 'Final Fantasy VII'],
            note: "I fuse Goku and Cloud to stage wake-up energy against identity distortion."
        },
        {
            lyric_hints: ['queen marie'],
            source_hints: ['Queen Marie bar intentionally stacks Marie Antoinette'],
            note: "The Queen Marie bar is intentionally stacked rebellion lineage, not a single-person citation."
        },
        {
            lyric_hints: ['doubled pane like argon'],
            source_hints: ['Argon'],
            note: "I use argon-pane imagery to map financial scarcity to environmental exposure and insulation failure."
        },
        {
            lyric_hints: ['green sweater-like blues clues'],
            source_hints: ["Blue's Clues"],
            note: "Blue's Clues is intentionally there as childhood-media code inside the same pressure narrative."
        },
        {
            lyric_hints: ['stick in a stream no roku'],
            source_hints: ['Roku'],
            note: "No-Roku stream language keeps this verse physically grounded in access friction rather than abstract network talk."
        }
    ],
    'track-stranger': [
        {
            lyric_hints: ['put money in my hand and i will do the things you want me to'],
            source_hints: ["I'm Your Man (Leonard Cohen song)"],
            note: "I open with a Leonard Cohen echo on purpose to set paid compliance as the emotional contract from line one."
        },
        {
            lyric_hints: ['stranger in your town'],
            source_hints: ['Gregory Isaacs', 'resolves literally to Beijing'],
            note: "I use Gregory Isaacs' sample line intentionally, and in this album arc the 'town' resolves to Beijing."
        },
        {
            lyric_hints: ['shattered the harmony of the day'],
            source_hints: ['closing quote is intentionally from Camus', 'Ending quote used in the track'],
            note: "I place this Camus line at the end because that beach-rupture moment mirrors my forced break from the prior life."
        },
        {
            lyric_hints: ['hades fury'],
            source_hints: ['Hades', 'Furies'],
            note: "Hades and Furies are deliberate underworld-adjudication references for how I frame pressure and consequence here."
        },
        {
            lyric_hints: ['scan and scry'],
            source_hints: ['Scrying'],
            note: "I pair scan and scry on purpose to merge analytic detection with intuitive threat sensing."
        },
        {
            lyric_hints: ['stingers in a gland', 'gram of gold you panned'],
            source_hints: ['gold panning'],
            note: "I use gold-panning language to show that relationship value here is extracted through grit, pain, and low-yield persistence."
        },
        {
            lyric_hints: ['approached or appreciated', 'inebriated'],
            source_hints: ['inebriated'],
            note: "I keep inebriated explicit to show how social overload and sedation behavior are intertwined in this phase."
        }
    ],
    'track-better': [
        {
            lyric_hints: ['getting lost in your eyes'],
            source_hints: ['User clarification', 'diurnal cycle'],
            note: "I wrote this opening as a day-to-night cooldown so the sequence can breathe without pretending the pressure vanished."
        },
        {
            lyric_hints: ['it gets me every time'],
            source_hints: ['Track lyric payload', 'epizeuxis'],
            note: "I repeat 'every time' to document reliability, not a one-off feeling, and to rehearse trust before Momentum."
        },
        {
            lyric_hints: ['mountains to the sea'],
            source_hints: ['merism'],
            note: "I use mountains-to-sea as a total-range claim, so the self-bet covers extremes rather than one mood state."
        },
        {
            lyric_hints: ['even in the underneath'],
            source_hints: ['Canonical publication wording'],
            note: "I keep 'even in the underneath' as canonical wording because the whole point is holding vision below surface conditions."
        }
    ],
    'track-momentum': [
        {
            lyric_hints: ['momentum of the moment'],
            source_hints: ['momentum', 'epizeuxis'],
            note: "I use momentum-of-the-moment wording to frame motion as something I generate in real time, not a future guarantee."
        },
        {
            lyric_hints: ['oh momentum'],
            source_hints: ['activation energy'],
            note: "I open with an invocation on purpose, like an activation threshold before I can move."
        },
        {
            lyric_hints: ['body full of cortisol'],
            source_hints: ['cortisol'],
            note: "I name cortisol directly to keep this line rooted in stress physiology, not abstract motivational language."
        },
        {
            lyric_hints: ['hmm?'],
            source_hints: ['line structure'],
            note: "I close on 'hmm?' to keep self-interrogation inside the push, so the mantra never pretends certainty I do not have."
        }
    ]
};

const TRACK_RESEARCH_SOURCE_ADDITIONS: Record<string, ResearchSource[]> = {
    'track-victor-ep': [
        {
            claim: "Severance is an Apple TV+ series centered on work/life memory partitioning, matching the split-role image in the line.",
            source_type: "primary",
            reference: "Severance (Apple TV+)",
            reliability: "high",
            url: "https://tv.apple.com/us/show/severance/umc.cmc.1srk2goyh2q2zdxcx605w8vtx"
        },
        {
            claim: "Succession is a prestige TV series organized around family power transfer and legitimacy conflict, supporting the hierarchy-pressure read.",
            source_type: "secondary",
            reference: "Succession (TV series)",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Succession_(TV_series)"
        },
        {
            claim: "Paprika is a film about dream-reality boundary collapse, supporting the 'twisty script' framing.",
            source_type: "secondary",
            reference: "Paprika (2006 film)",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Paprika_(2006_film)"
        },
        {
            claim: "The Boy and the Heron is a Miyazaki film that centers a boy-and-bird journey through grief and unstable worlds.",
            source_type: "secondary",
            reference: "The Boy and the Heron",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/The_Boy_and_the_Heron"
        },
        {
            claim: "Hayao Miyazaki's filmography is strongly associated with mythic transit and emotionally charged animation worlds.",
            source_type: "secondary",
            reference: "Miyazaki Hayao",
            reliability: "high",
            url: "https://www.britannica.com/biography/Miyazaki-Hayao"
        },
        {
            claim: "J Dilla is a canonical hip-hop producer reference point for sampler-era rhythmic feel.",
            source_type: "secondary",
            reference: "J Dilla",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/J_Dilla"
        },
        {
            claim: "The Boss SP-303 is a sampling drum machine associated with lo-fi/beat-scene workflows, supporting the production-lineage reading.",
            source_type: "secondary",
            reference: "Boss SP-303",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Boss_SP-303"
        },
        {
            claim: "Iron lung refers to a negative-pressure ventilator design, supporting the assisted-breath survival image in the line.",
            source_type: "secondary",
            reference: "Wikipedia - Iron lung",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Iron_lung"
        },
        {
            claim: "Pipe organ is a keyboard instrument driven by controlled airflow, supporting the organ-as-breath-architecture coupling.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - organ (music)",
            reliability: "high",
            url: "https://www.britannica.com/art/organ-musical-instrument"
        },
        {
            claim: "Spanner is standard wrench terminology in British English, supporting the tool-language frame in planner/spanner diction.",
            source_type: "secondary",
            reference: "Cambridge Dictionary - spanner",
            reliability: "high",
            url: "https://dictionary.cambridge.org/dictionary/english/spanner"
        },
        {
            claim: "Pareidolia describes perceiving meaningful patterns in random stimulus, aligning with the spiral-in-scatter cognition line.",
            source_type: "secondary",
            reference: "Wikipedia - Pareidolia",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Pareidolia"
        },
        {
            claim: "Origami crease patterns map fold structure and support the folded-past thesis as stress-marked material memory.",
            source_type: "secondary",
            reference: "Wikipedia - Crease pattern",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Crease_pattern"
        },
        {
            claim: "Cash flow denotes money movement in and out of operations, supporting the folder-fill liquidity-pressure bar.",
            source_type: "secondary",
            reference: "Wikipedia - Cash flow",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Cash_flow"
        },
        {
            claim: "Clock skew describes time divergence between systems and supports the crooked-clock truth-desynchronization image.",
            source_type: "secondary",
            reference: "Wikipedia - Clock skew",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Clock_skew"
        },
        {
            claim: "Hieroglyph writing systems encode meaning through symbol clusters, supporting the line's dense-script framing.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - hieroglyph",
            reliability: "high",
            url: "https://www.britannica.com/topic/hieroglyph"
        },
        {
            claim: "The Tide Pod challenge is documented as a social-media risk trend around ingesting detergent pods, matching the danger-as-spectacle critique.",
            source_type: "secondary",
            reference: "Wikipedia - Tide Pod challenge",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Tide_Pod_challenge"
        }
    ],
    'track-broadripple': [
        {
            claim: "IU Luddy is a real Indiana University school context and supports the literal campus-reference read of this line.",
            source_type: "primary",
            reference: "Indiana University Luddy School (official)",
            reliability: "high",
            url: "https://luddy.indiana.edu/index.html"
        },
        {
            claim: "Richard Edwards' catalog pages document track-level anchors used in the lyric cluster (Broadripple Is Burning, Skeleton Key, Lazy, Git Paid).",
            source_type: "primary",
            reference: "Richard Edwards Bandcamp catalog (official)",
            reliability: "high",
            url: "https://richardedwards.bandcamp.com/music"
        },
        {
            claim: "Margot Tenenbaum is a named character in The Royal Tenenbaums, supporting the artist-noted naming layer behind Margot references.",
            source_type: "secondary",
            reference: "Wikipedia - The Royal Tenenbaums",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/The_Royal_Tenenbaums"
        },
        {
            claim: "Moloch is historically documented as a sacrifice-associated deity image, supporting the devouring-system metaphor in this line.",
            source_type: "secondary",
            reference: "Moloch | Definition & Facts",
            reliability: "high",
            url: "https://www.britannica.com/topic/Moloch-ancient-god"
        },
        {
            claim: "Allen Ginsberg's Howl repeatedly invokes Moloch as an industrial-sacrifice symbol, matching the line's system-devouring tone.",
            source_type: "secondary",
            reference: "Howl (poem)",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Howl"
        }
    ],
    'track-cogsci': [
        {
            claim: "APA's dictionary defines rumination as repetitive focus on distress content, supporting the stuck-thinking loop language in the hook.",
            source_type: "secondary",
            reference: "APA Dictionary of Psychology - rumination",
            reliability: "high",
            url: "https://dictionary.apa.org/rumination"
        },
        {
            claim: "APA's dictionary defines cognitive restructuring as identifying and modifying maladaptive thoughts, matching the relearning thesis in the opener.",
            source_type: "secondary",
            reference: "APA Dictionary of Psychology - cognitive restructuring",
            reliability: "high",
            url: "https://dictionary.apa.org/cognitive-restructuring"
        },
        {
            claim: "APA's dictionary defines perseveration as persistent repetition beyond adaptive context, supporting the repeated stuck-here phrasing.",
            source_type: "secondary",
            reference: "APA Dictionary of Psychology - perseveration",
            reliability: "high",
            url: "https://dictionary.apa.org/perseveration"
        },
        {
            claim: "Zeigarnik effect describes unfinished-task tension staying cognitively active, matching the unresolved stuck-here refrain that resists closure.",
            source_type: "secondary",
            reference: "Wikipedia - Zeigarnik effect",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Zeigarnik_effect"
        },
        {
            claim: "Implementation intentions use if-then planning to change behavior, matching the relearning bars as procedural retraining rather than mood-only promise.",
            source_type: "secondary",
            reference: "Wikipedia - Implementation intention",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Implementation_intention"
        },
        {
            claim: "Call and response is a recognized alternating musical form that supports reading the outro as self-coaching structure rather than filler repetition.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - call and response",
            reliability: "medium",
            url: "https://www.britannica.com/art/call-and-response"
        }
    ],
    'track-monumental': [
        {
            claim: "CD PROJEKT reports The Witcher 3 has sold over 50 million copies, supporting its mainstream-recognition layer in the No Witcher bar.",
            source_type: "primary",
            reference: "CD PROJEKT investor/annual report update",
            reliability: "high",
            url: "https://www.cdprojekt.com/en/investors/regulatory-announcements/current-report-no-12-2024/"
        },
        {
            claim: "A château is a French manor/castle reference, supporting the social-positioning frame in the chateau line.",
            source_type: "secondary",
            reference: "Wikipedia - Château",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Ch%C3%A2teau"
        },
        {
            claim: "Bureau denotes an administrative office/department, supporting the line about calling up institutional channels.",
            source_type: "secondary",
            reference: "Cambridge Dictionary - bureau",
            reliability: "high",
            url: "https://dictionary.cambridge.org/dictionary/english/bureau"
        },
        {
            claim: "Socket terminology supports the plug/socket dependency image in the relief-access bar.",
            source_type: "secondary",
            reference: "Wikipedia - Socket",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Socket"
        },
        {
            claim: "Mycelium is the branching vegetative network of fungi, supporting the hook's spread-and-propagation pressure image.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - mycelium",
            reliability: "high",
            url: "https://www.britannica.com/science/mycelium"
        },
        {
            claim: "A cello is a bowed string instrument, supporting the line where physical injury and formal musical craft are held together.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - cello",
            reliability: "high",
            url: "https://www.britannica.com/art/cello"
        },
        {
            claim: "The euro is the shared currency used across many European Union countries, supporting the lyric that prices mental strain as direct cash leakage.",
            source_type: "primary",
            reference: "European Central Bank - The euro",
            reliability: "high",
            url: "https://www.ecb.europa.eu/euro/html/index.en.html"
        },
        {
            claim: "Twitter is a high-velocity micro-posting platform and supports the critter/jitter line's feed-reactivity and attention-fracture frame.",
            source_type: "secondary",
            reference: "Wikipedia - Twitter",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Twitter"
        }
    ],
    'track-rumdrum': [
        {
            claim: "Big Shaq's 'Man's Not Hot' popularized the 'quick maths' phrase, supporting the 'quick maffs' meme-register read.",
            source_type: "secondary",
            reference: "Man's Not Hot",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Man%27s_Not_Hot"
        },
        {
            claim: "AAUP's annual profession report documents contingent and low-paid academic labor realities that align with the adjunct-wages line.",
            source_type: "primary",
            reference: "AAUP Annual Report",
            reliability: "high",
            url: "https://www.aaup.org/report/annual-report-economic-status-profession-2023-24"
        },
        {
            claim: "Angostura bitters is a canonical bitters reference point and supports the lime-and-bitters coping-ritual bar.",
            source_type: "secondary",
            reference: "Angostura bitters",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Angostura_bitters"
        },
        {
            claim: "RFC 1071 documents checksum computation and verification, supporting the 'pitiful checksum' image as integrity-failure language.",
            source_type: "primary",
            reference: "IETF RFC 1071",
            reliability: "high",
            url: "https://www.rfc-editor.org/rfc/rfc1071"
        },
        {
            claim: "Applicant tracking systems are software filters used in hiring pipelines, supporting the cover-letter and no-response sequence.",
            source_type: "secondary",
            reference: "Wikipedia - Applicant tracking system",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Applicant_tracking_system"
        },
        {
            claim: "A dashcam is a continuously recording in-vehicle camera, supporting the line where cancellations feel archived and replayable.",
            source_type: "secondary",
            reference: "Wikipedia - Dashcam",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Dashcam"
        }
    ],
    'track-world-jar': [
        {
            claim: "A legal docket is an official schedule/listing of proceedings, supporting the logged-procedure framing in the bar.",
            source_type: "primary",
            reference: "docket",
            reliability: "high",
            url: "https://www.law.cornell.edu/wex/docket"
        },
        {
            claim: "A sprocket is a toothed wheel driving linked mechanical motion, supporting the chain-driven momentum image.",
            source_type: "secondary",
            reference: "sprocket",
            reliability: "high",
            url: "https://www.britannica.com/technology/sprocket"
        },
        {
            claim: "A terrarium is a sealed glass enclosure, matching the display-without-breath atmosphere in the 'world in a jar' refrain.",
            source_type: "secondary",
            reference: "terrarium",
            reliability: "high",
            url: "https://www.britannica.com/topic/terrarium"
        },
        {
            claim: "Ajar means partly open, supporting the intentional wordplay that an exit can be open but not truly freeing.",
            source_type: "secondary",
            reference: "ajar",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/ajar"
        },
        {
            claim: "Psychological projection describes attributing one's own impulses or feelings to others, supporting the mirror-not-face defense read.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - projection",
            reliability: "high",
            url: "https://www.britannica.com/science/projection-psychology"
        },
        {
            claim: "Panopticon language describes behavior shaped by constant visibility, matching the eyes-to-the-glass surveillance posture.",
            source_type: "secondary",
            reference: "Wikipedia - Panopticon",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Panopticon"
        },
        {
            claim: "Cooley's looking-glass self model describes identity being shaped by imagined social judgment, matching the mirror-not-face pressure pattern.",
            source_type: "secondary",
            reference: "Wikipedia - Looking-glass self",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Looking-glass_self"
        },
        {
            claim: "Foucault's Discipline and Punish formalizes panoptic self-policing under possible observation, matching the eyes-to-the-glass make-believe posture.",
            source_type: "secondary",
            reference: "Wikipedia - Discipline and Punish",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Discipline_and_Punish"
        }
    ],
    'track-liq-tick': [
        {
            claim: "Lock picking denotes forced manipulation of locking mechanisms, supporting the lock-pick survival-access line.",
            source_type: "secondary",
            reference: "Lock picking",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Lock_picking"
        },
        {
            claim: "Wood rot is structural decay caused by fungi, supporting the varnish-over-rot cover-up metaphor.",
            source_type: "secondary",
            reference: "Wood rot",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Wood_rot"
        },
        {
            claim: "Handle can denote a large liquor bottle, supporting the line's transition from bike handles to substance dependence.",
            source_type: "secondary",
            reference: "handle",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/handle"
        },
        {
            claim: "CDC guidance identifies phone use while driving as distracted-driving risk, supporting the night-driver phone compulsion read.",
            source_type: "primary",
            reference: "distracted driving",
            reliability: "high",
            url: "https://www.cdc.gov/distracted-driving/about/index.html"
        },
        {
            claim: "Epoxy resin is a fast-curing adhesive and sealant class, supporting the quick-fix repair language in the opener.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - epoxy",
            reliability: "high",
            url: "https://www.britannica.com/science/epoxy"
        },
        {
            claim: "Retrograde denotes backward-appearing motion, supporting the rewind-the-weather attempt to reverse mood trajectory.",
            source_type: "secondary",
            reference: "Merriam-Webster - retrograde",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/retrograde"
        },
        {
            claim: "Nuclear fission is a chain-reaction splitting process, supporting the stress-chain image in 'fusing fission to my fate.'",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - nuclear fission",
            reliability: "high",
            url: "https://www.britannica.com/science/nuclear-fission"
        },
        {
            claim: "Variable-ratio reinforcement schedules are associated with persistent response behavior, matching coin-slot scarcity chasing loops in the verse.",
            source_type: "secondary",
            reference: "Wikipedia - Reinforcement",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Reinforcement"
        },
        {
            claim: "Harm reduction frameworks focus on reducing adverse outcomes without requiring immediate abstinence, matching the planned-use language in the chemical-alignment bars.",
            source_type: "secondary",
            reference: "Wikipedia - Harm reduction",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Harm_reduction"
        },
        {
            claim: "Allostatic load describes cumulative physiological wear from repeated stress adaptation, supporting the polish-over-decay cycle and escalating fatigue in this track.",
            source_type: "secondary",
            reference: "Wikipedia - Allostatic load",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Allostatic_load"
        }
    ],
    'track-kneesocks': [
        {
            claim: "TikTok is a short-form social media platform and supports the visibility-performance layer in the verse.",
            source_type: "secondary",
            reference: "Wikipedia - TikTok",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/TikTok"
        },
        {
            claim: "Gaffe denotes an embarrassing social blunder, supporting the 'gaffs and tunes' opening self-audit lane.",
            source_type: "secondary",
            reference: "Merriam-Webster - gaffe",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/gaffe"
        },
        {
            claim: "Darkroom development requires controlled light and chemical processing, supporting the memory-and-identity development image in the mid-verse bars.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - darkroom",
            reliability: "high",
            url: "https://www.britannica.com/technology/darkroom"
        },
        {
            claim: "Metonymy is a figure where one thing stands in for a related one, supporting the 'defies metonymy' refusal to be reduced to symbolic proxy.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - metonymy",
            reliability: "high",
            url: "https://www.britannica.com/art/metonymy"
        },
        {
            claim: "Videocassette recorder playback can create frame-jump perception during shuttle/scan behavior, supporting the VCR memory-jitter framing in the transit verse.",
            source_type: "secondary",
            reference: "Wikipedia - Videocassette recorder",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Videocassette_recorder"
        },
        {
            claim: "Internal Knee Socks notes mark the station-haze passage as a pacing chamber that stabilizes breathing before the bridge intimacy turn.",
            source_type: "primary",
            reference: "11_KneeSocks_Analysis.js station-haze section",
            reliability: "high"
        },
        {
            claim: "Internal Knee Socks notes mark the icy-rum line as an intentional callback to The Rum Drum coping loop.",
            source_type: "primary",
            reference: "11_KneeSocks_Analysis.js Rum Drum callback in Knee Socks local notes",
            reliability: "high"
        },
        {
            claim: "Internal Knee Socks notes track lens/frame bars as explicit parallax continuity with VICTOR's optics language.",
            source_type: "primary",
            reference: "11_KneeSocks_Analysis.js parallax continuity in Knee Socks local notes",
            reliability: "high"
        },
        {
            claim: "Internal Knee Socks notes frame abort language as process interruption that foreshadows The Machine's fail-state endpoint.",
            source_type: "primary",
            reference: "11_KneeSocks_Analysis.js process interruption language in Knee Socks local notes",
            reliability: "high"
        }
    ],
    'track-lender': [
        {
            claim: "Deer-in-the-headlights idiom denotes frozen alarm response, supporting the panic-versus-ambition contrast in the bar.",
            source_type: "secondary",
            reference: "Cambridge Dictionary - deer-in-the-headlights",
            reliability: "high",
            url: "https://dictionary.cambridge.org/dictionary/english/deer-in-the-headlights"
        },
        {
            claim: "BPM denotes beats per minute and supports the rhythm-regulation reading in the 'strict beats to the bpm' line.",
            source_type: "secondary",
            reference: "Wikipedia - Beats per minute",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Beats_per_minute"
        },
        {
            claim: "AirPods are Apple's wireless earbuds, supporting the mediation-failure trigger in the opening dependency scene.",
            source_type: "primary",
            reference: "Apple AirPods",
            reliability: "high",
            url: "https://www.apple.com/airpods/"
        },
        {
            claim: "Jump-start language maps to restart logic in stalled transport systems, supporting the no-jump/spark request escalation.",
            source_type: "secondary",
            reference: "Merriam-Webster - jump-start",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/jump-start"
        }
    ],
    'track-machine': [
        {
            claim: "Circadian rhythm is the roughly 24-hour biological cycle that aligns behavior with daily light-dark timing, supporting the morning-trigger framing.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - circadian rhythm",
            reliability: "high",
            url: "https://www.britannica.com/science/circadian-rhythm"
        },
        {
            claim: "NIGMS describes circadian rhythms as internal clocks coordinating daily processes, supporting the duty-dispatch reading in the morning line.",
            source_type: "primary",
            reference: "NIGMS - Circadian Rhythms Fact Sheet",
            reliability: "high",
            url: "https://nigms.nih.gov/education/fact-sheets/Pages/circadian-rhythms.aspx"
        },
        {
            claim: "Loneliness denotes perceived social isolation and aligns with the all-alone ending after repeated service output.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - loneliness",
            reliability: "high",
            url: "https://www.britannica.com/science/loneliness"
        },
        {
            claim: "Asynchronous communication describes interactions where response does not occur in real-time, supporting the don't-wait framing.",
            source_type: "secondary",
            reference: "Wikipedia - Asynchronous communication",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Asynchronous_communication"
        },
        {
            claim: "Social presence theory addresses the felt sense of another person through mediated channels, supporting 'you'll never have me' as embodied-distance claim.",
            source_type: "secondary",
            reference: "Wikipedia - Social presence theory",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Social_presence_theory"
        },
        {
            claim: "Desensitization in psychology denotes reduced emotional responsiveness after repeated exposure, supporting the switch to 'that doesn't hurt me' as protective numbing.",
            source_type: "secondary",
            reference: "APA Dictionary of Psychology - desensitization",
            reliability: "high",
            url: "https://dictionary.apa.org/desensitization"
        },
        {
            claim: "Fail-stop behavior describes a system that halts once failure is detected, matching the track's final mid-word cutoff.",
            source_type: "secondary",
            reference: "Wikipedia - Fail-stop",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Fail-stop"
        },
        {
            claim: "Graceful degradation describes systems that continue partial function under stress, aligning with the late-track shift from full refrain to fragmented output.",
            source_type: "secondary",
            reference: "Wikipedia - Graceful degradation",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Graceful_degradation"
        },
        {
            claim: "Sisyphus in Greek myth represents recurring labor with repeated burden return, supporting the chorus-reprise duty-loop interpretation.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Sisyphus",
            reliability: "high",
            url: "https://www.britannica.com/topic/Sisyphus-Greek-mythology"
        }
    ],
    'track-earnest': [
        {
            claim: "'Busy as a bee' is a standard idiom for constant activity, supporting the overfunctioning image in the line.",
            source_type: "secondary",
            reference: "Merriam-Webster - busy as a bee",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/busy%20as%20a%20bee"
        },
        {
            claim: "Rook is a chess piece with straight-line movement, supporting the board-strategy language in the verse.",
            source_type: "secondary",
            reference: "Wikipedia - Rook (chess)",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Rook_(chess)"
        },
        {
            claim: "Knight is a chess piece with L-shaped movement, supporting the steed/strategy wordplay cluster.",
            source_type: "secondary",
            reference: "Wikipedia - Knight (chess)",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Knight_(chess)"
        },
        {
            claim: "'Sign on the dotted line' denotes formal agreement, supporting the obligation-contract pivot in the couplet.",
            source_type: "secondary",
            reference: "Cambridge Dictionary - on the dotted line",
            reliability: "high",
            url: "https://dictionary.cambridge.org/dictionary/english/on-the-dotted-line"
        },
        {
            claim: "Quantum mechanics studies probabilistic behavior at very small scales, supporting the figurative openness in 'tomorrow is in quantum time.'",
            source_type: "secondary",
            reference: "Wikipedia - Quantum mechanics",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Quantum_mechanics"
        },
        {
            claim: "Minor scale is a standard musical mode associated with darker tonal color, supporting the grief-coded sonic reading.",
            source_type: "secondary",
            reference: "Wikipedia - Minor scale",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Minor_scale"
        },
        {
            claim: "A furnace is an enclosed high-heat chamber, supporting the opening pressure-training image where sincerity is tested by heat.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - furnace",
            reliability: "high",
            url: "https://www.britannica.com/technology/furnace"
        },
        {
            claim: "Clemency denotes merciful lenience and supports the line where withheld mercy is treated as a deliberate relational shift.",
            source_type: "secondary",
            reference: "Merriam-Webster - clemency",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/clemency"
        },
        {
            claim: "A revolver is a handgun with a revolving cylinder, supporting the memory line's explicit coercion-pressure framing.",
            source_type: "secondary",
            reference: "Merriam-Webster - revolver",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/revolver"
        },
        {
            claim: "Picket-fence language denotes a domestic boundary marker and supports the lyric's contrast between compulsive short-term relief and stable shelter.",
            source_type: "secondary",
            reference: "Cambridge Dictionary - picket fence",
            reliability: "high",
            url: "https://dictionary.cambridge.org/dictionary/english/picket-fence"
        },
        {
            claim: "Sparrow denotes a small common songbird, supporting the closing miniaturization move where fragile life is held next to sorrow.",
            source_type: "secondary",
            reference: "Merriam-Webster - sparrow",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/sparrow"
        }
    ],
    'track-sincere-writer': [
        {
            claim: "A reciprocal in mathematics is the multiplicative inverse, supporting the packs-flipped inversion logic.",
            source_type: "secondary",
            reference: "Wikipedia - Multiplicative inverse",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Multiplicative_inverse"
        },
        {
            claim: "Siren can mean a warning alarm and, in mythic usage, an alluring danger figure, supporting the line's warning-plus-lure dual read.",
            source_type: "secondary",
            reference: "Merriam-Webster - siren",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/siren"
        },
        {
            claim: "In Greek mythology, Sirens are seductive figures linked to perilous attraction, supporting the temptation component in the line.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Siren",
            reliability: "high",
            url: "https://www.britannica.com/topic/Siren-Greek-mythology"
        },
        {
            claim: "Seam refers to a joining line where pieces are stitched together, supporting the 'pliable seam' image as targeted structural intervention.",
            source_type: "secondary",
            reference: "Merriam-Webster - seam",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/seam"
        },
        {
            claim: "Viable denotes capability of working successfully, supporting the 'viable dream' line as pragmatic ambition rather than fantasy.",
            source_type: "secondary",
            reference: "Merriam-Webster - viable",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/viable"
        },
        {
            claim: "Confessional poetry emphasizes first-person revelation of private struggle in public form, matching the track's mess/confess method language.",
            source_type: "secondary",
            reference: "Wikipedia - Confessional poetry",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Confessional_poetry"
        },
        {
            claim: "Steel imagery conventionally carries strength under force and deformation risk, supporting the bent-through-the-chest cost framing.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - steel",
            reliability: "high",
            url: "https://www.britannica.com/technology/steel"
        },
        {
            claim: "Internal structure notes map the mid-verse sequence from seam pressure to siren alarm to confession/steel cost as one continuous escalation block.",
            source_type: "primary",
            reference: "15_Sincere_Writer_Analysis.js mid-verse progression",
            reliability: "high"
        },
        {
            claim: "Internal notes treat the 'notes to myself' and 'silence in the flat' couplet as autobiographical proof-of-life and method anchoring.",
            source_type: "primary",
            reference: "15_Sincere_Writer_Analysis.js late-verse notes cluster",
            reliability: "high"
        }
    ],
    'track-gloom': [
        {
            claim: "The phrase fair is foul and foul is fair appears in Macbeth 1.1 and supports the inversion frame in this verse.",
            source_type: "primary",
            reference: "Folger Shakespeare Library - Macbeth 1.1",
            reliability: "high",
            url: "https://www.folger.edu/explore/shakespeares-works/macbeth/read/1/1/"
        },
        {
            claim: "Tom Sawyer is available in primary-text form and supports the strict book-reference treatment requested for this line.",
            source_type: "primary",
            reference: "Project Gutenberg - The Adventures of Tom Sawyer",
            reliability: "high",
            url: "https://www.gutenberg.org/ebooks/74"
        },
        {
            claim: "Psalm 23:4 contains the valley-of-the-shadow-of-death phrasing, supporting the scripture-layered panic-breath line.",
            source_type: "primary",
            reference: "BibleGateway - Psalm 23:4 (KJV)",
            reliability: "high",
            url: "https://www.biblegateway.com/passage/?search=Psalm%2023%3A4&version=KJV"
        },
        {
            claim: "Orpheus and Eurydice mythology centers attempted retrieval under irreversible loss risk, supporting the dice-and-rescue coupling.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Orpheus / Eurydice",
            reliability: "high",
            url: "https://www.britannica.com/topic/Orpheus-Greek-mythology"
        },
        {
            claim: "Pavlovian conditioning describes learned stimulus-response chains, supporting the refrain-to-refrain behavioral loop architecture.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Pavlovian conditioning",
            reliability: "high",
            url: "https://www.britannica.com/science/Pavlovian-conditioning"
        },
        {
            claim: "Frankenstein's Victor is the creator figure, supporting the track's maker-responsibility framing instead of monster mislabeling.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - Frankenstein",
            reliability: "high",
            url: "https://www.britannica.com/topic/Frankenstein-or-The-Modern-Prometheus"
        },
        {
            claim: "Internal GLOOM notes treat palm-in-palm language as a portable-utopia motif used for emergency self-soothing during panic recurrence.",
            source_type: "primary",
            reference: "07_GLOOM_Analysis.js portable-utopia motif",
            reliability: "high"
        },
        {
            claim: "Elixir can denote a medicinal or transformative mixture, supporting the line's pseudo-scientific control language.",
            source_type: "secondary",
            reference: "Merriam-Webster - elixir",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/elixir"
        },
        {
            claim: "Conjecture denotes inference without complete proof, supporting the bar where certainty collapses into guesswork.",
            source_type: "secondary",
            reference: "Merriam-Webster - conjecture",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/conjecture"
        },
        {
            claim: "Foyer denotes an entrance hall, supporting the legal-threat threshold staging in the Tom-Sawyer-guise line.",
            source_type: "secondary",
            reference: "Merriam-Webster - foyer",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/foyer"
        },
        {
            claim: "Pavilion denotes a larger light structure often used for gathering, supporting the overcrowded-space image before the brief fog-clearing line.",
            source_type: "secondary",
            reference: "Wikipedia - Pavilion",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Pavilion"
        },
        {
            claim: "Qualm denotes a sudden feeling of doubt or unease, supporting the refuge-mantra interruption in the later reprise.",
            source_type: "secondary",
            reference: "Merriam-Webster - qualm",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/qualm"
        },
        {
            claim: "Hull denotes the main body of a ship or vessel, supporting the charm-on-hull survival image for steering through threat.",
            source_type: "secondary",
            reference: "Merriam-Webster - hull",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/hull"
        },
        {
            claim: "Charm can denote an object carried for protection, supporting the line's tiny-ritual defense logic under larger structural danger.",
            source_type: "secondary",
            reference: "Merriam-Webster - charm",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/charm"
        }
    ],
    'track-stranger': [
        {
            claim: "Gregory Isaacs appears in mainstream catalog listings with tracks including Stranger in Your Town, supporting the sampling anchor in this ending arc.",
            source_type: "secondary",
            reference: "Apple Music - Stranger in Your Town",
            reliability: "medium",
            url: "https://music.apple.com/gb/song/413482112"
        },
        {
            claim: "The opening line mirrors Leonard Cohen's 'I'm Your Man' transactional wording, supporting the paid-compliance contract reading.",
            source_type: "secondary",
            reference: "I'm Your Man (Leonard Cohen song)",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/I%27m_Your_Man_(Leonard_Cohen_song)"
        },
        {
            claim: "Gold panning is a manual extraction process with high labor and uncertain yield, matching the gram-of-gold-through-fume image.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - panning",
            reliability: "high",
            url: "https://www.britannica.com/technology/panning-mining"
        },
        {
            claim: "Inebriated denotes intoxicated condition, supporting the explicit sedation-while-fighting line in the late verse.",
            source_type: "secondary",
            reference: "Merriam-Webster - inebriated",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/inebriated"
        }
    ],
    'track-better': [
        {
            claim: "Merism denotes using opposite poles to communicate total range, supporting 'from the mountains to the sea' as a full-spectrum recovery claim.",
            source_type: "secondary",
            reference: "Wikipedia - Merism",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Merism"
        },
        {
            claim: "An interlude in music is a short connective passage, supporting The Better's role as a deliberate bridge rather than unfinished draft residue.",
            source_type: "secondary",
            reference: "Wikipedia - Interlude",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Interlude"
        },
        {
            claim: "Diurnality describes day-night cycle behavior, supporting the opening line's temporal reset function.",
            source_type: "secondary",
            reference: "Wikipedia - Diurnality",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Diurnality"
        },
        {
            claim: "Epizeuxis is immediate word repetition for emphasis, supporting the repeated 'every time' reassurance loop.",
            source_type: "secondary",
            reference: "Wikipedia - Epizeuxis",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Epizeuxis"
        }
    ],
    'track-momentum': [
        {
            claim: "Momentum in physics is the product of mass and velocity, supporting the track's force-through-motion framing.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - momentum",
            reliability: "high",
            url: "https://www.britannica.com/science/momentum"
        },
        {
            claim: "Cortisol is a stress-response hormone and supports reading the track as embodied urgency rather than decorative hype.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - cortisol",
            reliability: "high",
            url: "https://www.britannica.com/science/cortisol"
        },
        {
            claim: "Epizeuxis is immediate repetition of a word for emphasis, supporting the momentum/moment recursion as a deliberate rhetorical engine.",
            source_type: "secondary",
            reference: "Wikipedia - Epizeuxis",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Epizeuxis"
        },
        {
            claim: "Activation energy is the minimum energy threshold needed to start a reaction, matching the track's ignition-before-motion function.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - activation energy",
            reliability: "high",
            url: "https://www.britannica.com/science/activation-energy"
        }
    ],
    'track-mantra': [
        {
            claim: "Hume's Treatise provides a direct primary anchor for the is/ought conflict that this hidden track keeps returning to.",
            source_type: "primary",
            reference: "Project Gutenberg - A Treatise of Human Nature",
            reliability: "high",
            url: "https://www.gutenberg.org/files/4705/4705-h/4705-h.htm"
        },
        {
            claim: "LEGO Mindstorms is a programmable construction platform and supports the technical half of the opening double-coding.",
            source_type: "secondary",
            reference: "Wikipedia - LEGO Mindstorms",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Lego_Mindstorms"
        },
        {
            claim: "Papert's Mindstorms text explicitly links computing to learning transformation, supporting the pedagogical layer in the opening bars.",
            source_type: "secondary",
            reference: "Wikipedia - Mindstorms (book)",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Mindstorms:_Children,_Computers,_and_Powerful_Ideas"
        },
        {
            claim: "MF DOOM is a canonical underground hip-hop reference point and supports the cadence/style anchor in the MIT line.",
            source_type: "secondary",
            reference: "Wikipedia - MF DOOM",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/MF_Doom"
        },
        {
            claim: "Argon is a standard insulating gas in double-pane windows, supporting the no-funds and insulation-vulnerability metaphor.",
            source_type: "secondary",
            reference: "Wikipedia - Argon",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Argon"
        },
        {
            claim: "WALL-E is widely read as technology-and-society critique, supporting the Kant-plus-media pairing in the verse.",
            source_type: "secondary",
            reference: "Wikipedia - WALL-E",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/WALL-E"
        },
        {
            claim: "Cloud Strife and Goku are high-recognition transformation/identity figures, supporting the wake-up fusion in the closing bars.",
            source_type: "secondary",
            reference: "Wikipedia - Cloud Strife / Goku",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Cloud_Strife"
        },
        {
            claim: "Goku is a mainstream transformation archetype in anime canon and supports the power-release language in the closing bars.",
            source_type: "secondary",
            reference: "Wikipedia - Goku",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Goku"
        },
        {
            claim: "ggplot2 is the canonical data visualization package in the tidyverse ecosystem, supporting the programmer-Gg2Plot line as technical self-labeling.",
            source_type: "primary",
            reference: "ggplot2 official documentation",
            reliability: "high",
            url: "https://ggplot2.tidyverse.org/"
        },
        {
            claim: "Right-hand rule is a physics convention used to determine orientation in vector and field problems, supporting the direction-setting bar.",
            source_type: "secondary",
            reference: "Wikipedia - Right-hand rule",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Right-hand_rule"
        },
        {
            claim: "Vector graphics scale without pixelation and match the track's resilience-through-scalability metaphor.",
            source_type: "secondary",
            reference: "Wikipedia - Vector graphics",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Vector_graphics"
        },
        {
            claim: "The Young Elites is a dystopian power-and-exclusion narrative, supporting the 'Young Cyber Elite' persona recode.",
            source_type: "secondary",
            reference: "Wikipedia - The Young Elites",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/The_Young_Elites"
        },
        {
            claim: "Zoom's product model centers remote meetings, supporting the line about charts losing fidelity inside Zoom-session workflows.",
            source_type: "primary",
            reference: "Zoom Workplace",
            reliability: "high",
            url: "https://www.zoom.com/en/products/workplace/"
        },
        {
            claim: "Slack is a workplace messaging platform and supports the subtract-the-Slack process-noise pruning line.",
            source_type: "primary",
            reference: "Slack",
            reliability: "high",
            url: "https://slack.com/"
        },
        {
            claim: "Dean roles in education represent institutional authority over curriculum and standards, supporting the deanery capture-resistance line.",
            source_type: "secondary",
            reference: "Wikipedia - Dean (education)",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Dean_(education)"
        },
        {
            claim: "Ampere and watt are standard electrical units for current and power, supporting the ampere-to-watt pressure conversion bar.",
            source_type: "secondary",
            reference: "Wikipedia - Ampere / Watt",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Ampere"
        },
        {
            claim: "A scalene triangle has no equal sides, supporting the asymmetry self-model in the scalene-cues line.",
            source_type: "secondary",
            reference: "Wikipedia - Triangle (scalene)",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Triangle#Types_of_triangles"
        },
        {
            claim: "Diffraction describes wave spreading and pattern splitting, supporting the diffract-the-words context-fragmentation bar.",
            source_type: "secondary",
            reference: "Wikipedia - Diffraction",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Diffraction"
        },
        {
            claim: "Chess strategy emphasizes positional planning across multiple moves, supporting the pawns-and-step-schemes line.",
            source_type: "secondary",
            reference: "Wikipedia - Chess strategy",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Chess_strategy"
        },
        {
            claim: "Roku is a streaming platform and device ecosystem, supporting the no-Roku access-friction image in the Blue's Clues cluster line.",
            source_type: "secondary",
            reference: "Wikipedia - Roku",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Roku"
        }
    ]
};

function mergeTrackSources(trackId: string, sources: ResearchSource[]): ResearchSource[] {
    const additions = TRACK_RESEARCH_SOURCE_ADDITIONS[trackId] ?? [];
    if (!additions.length) return sources;

    const merged: ResearchSource[] = [];
    const seen = new Set<string>();

    const push = (source: ResearchSource) => {
        const key = `${normalize(source.reference)}|${normalize(source.claim)}`;
        if (!key || seen.has(key)) return;
        seen.add(key);
        merged.push(source);
    };

    sources.forEach(push);
    additions.forEach(push);
    return merged;
}

function rewriteToCareyVoice(text: string): string {
    if (!text) return text;
    let out = String(text).trim();
    if (!out) return out;

    const leadRewrites: Array<[RegExp, string]> = [
        [/^The line frames\b/i, 'In this line, I frame'],
        [/^This line frames\b/i, 'Here, I frame'],
        [/^The line functions as\b/i, 'In this line, I use this as'],
        [/^This line functions as\b/i, 'Here, I use this as'],
        [/^The line marks\b/i, 'In this line, I mark'],
        [/^This line marks\b/i, 'Here, I mark'],
        [/^The line signals\b/i, 'In this line, I signal'],
        [/^This line signals\b/i, 'Here, I signal'],
        [/^The line highlights\b/i, 'In this line, I highlight'],
        [/^This line highlights\b/i, 'Here, I highlight'],
        [/^The line emphasizes\b/i, 'In this line, I emphasize'],
        [/^This line emphasizes\b/i, 'Here, I emphasize'],
        [/^The line documents\b/i, 'In this line, I document'],
        [/^This line documents\b/i, 'Here, I document'],
        [/^The line suggests\b/i, 'In this line, I suggest'],
        [/^This line suggests\b/i, 'Here, I suggest'],
        [/^The opener states\b/i, 'In the opener, I state'],
        [/^The opener frames\b/i, 'In the opener, I frame'],
        [/^The opener\b/i, 'In the opener, I'],
        [/^The hook\b/i, 'In the hook, I'],
        [/^The refrain\b/i, 'In the refrain, I'],
        [/^The verse\b/i, 'In this verse, I'],
        [/^The narrator\b/i, 'I']
    ];

    for (const [pattern, replacement] of leadRewrites) {
        out = out.replace(pattern, replacement);
    }

    const phraseRewrites: Array<[RegExp, string]> = [
        [/\bThe narrator\b/gi, 'I'],
        [/\bHe frames\b/g, 'I frame'],
        [/\bHe opens\b/g, 'I open'],
        [/\bHe claims\b/g, 'I claim'],
        [/\bHe admits\b/g, 'I admit'],
        [/\bHe treats\b/g, 'I treat'],
        [/\bHe positions\b/g, 'I position'],
        [/\bHe reads\b/g, 'I read'],
        [/\bHe points\b/g, 'I point'],
        [/\bHe uses\b/g, 'I use'],
        [/\bHe abandons\b/g, 'I abandon'],
        [/\bHe acknowledges\b/g, 'I acknowledge'],
        [/\bHe performs\b/g, 'I perform'],
        [/\bHe documents\b/g, 'I document'],
        [/\bHe toggles\b/g, 'I toggle'],
        [/\bHe compresses\b/g, 'I compress'],
        [/\bHe escalates\b/g, 'I escalate'],
        [/\bHe distrusts\b/g, 'I distrust'],
        [/\bHe confesses\b/g, 'I confess'],
        [/\bHe is\b/g, 'I am'],
        [/\bhe is\b/g, 'I am']
    ];

    for (const [pattern, replacement] of phraseRewrites) {
        out = out.replace(pattern, replacement);
    }

    out = out
        .replace(/\bHe\b/g, 'I')
        .replace(/\bhe\b/g, 'I')
        .replace(/\bHis\b/g, 'My')
        .replace(/\bhis\b/g, 'my')
        .replace(/\bHimself\b/g, 'Myself')
        .replace(/\bhimself\b/g, 'myself')
        .replace(/\bHim\b/g, 'Me')
        .replace(/\bhim\b/g, 'me')
        .replace(/\bI are\b/g, 'I am')
        .replace(/\bI has\b/g, 'I have')
        .replace(/\bI does\b/g, 'I do')
        .replace(/\bI frames\b/g, 'I frame')
        .replace(/\bI functions\b/g, 'I function')
        .replace(/\bI marks\b/g, 'I mark')
        .replace(/\bI signals\b/g, 'I signal')
        .replace(/\bI suggests\b/g, 'I suggest')
        .replace(/\bI highlights\b/g, 'I highlight')
        .replace(/\bI emphasizes\b/g, 'I emphasize')
        .replace(/\bI points\b/g, 'I point')
        .replace(/\bI works\b/g, 'I work')
        .replace(/\bI reads\b/g, 'I read')
        .replace(/\s{2,}/g, ' ')
        .trim();

    return out;
}

function applyCareyRedraft(trackId: string, analysis: DeepAnalysis): DeepAnalysis {
    const baseSources = analysis.research?.sources ?? [];
    const sources = mergeTrackSources(trackId, baseSources);

    return {
        ...analysis,
        research: analysis.research
            ? {
                ...analysis.research,
                sources
            }
            : analysis.research,
        author_lens: analysis.author_lens ?? AUTHOR_LENS_BY_TRACK[trackId] ?? DEFAULT_AUTHOR_LENS
    };
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
                "Opener now carries explicit multi-domain anchors (film, optics, philosophy, strategy, engineering, and pattern-cognition) instead of only headline references.",
                "Under-explained middle and closing bars now have line-level treatment (forge breath, planning tools, scanner scraps, crooked-clock surveillance, and lab-repeat sequences).",
                "New citation anchors tie niche images (iron lung, pareidolia, crease-pattern memory, clock skew, hieroglyph density, Tide Pod risk spectacle) directly to node commentary."
            ],
            gaps: [
                "A few joke-dense bars in the Vicky/Ricky/fairy-god cluster remain intentionally slippery and still support multiple tonal reads.",
                "The opener still depends on high lexical density, so casual readers may miss progression unless sequence markers remain explicit."
            ],
            next_pass_focus: "Pressure-test continuity from Victor's archive-dissection method into Broadripple's citation-debt panic without flattening voice changes."
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
        lyric: "Bubblegum breath, ya hear a bottle in his jacket pocket,",
        override: {
            surface: "I pair mouth-cover and bottle-rattle to show image control failing in real time.",
            deep: [
                {
                    category: "MASKING FAILURE",
                    text: "Bubblegum breath is a concealment tactic, but the bottle-in-pocket detail shows the habit remains audible."
                },
                {
                    category: "DEPENDENCY TEXTURE",
                    text: "The line keeps coping material and bodily shame in one frame instead of separating them into different scenes."
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
    },
    {
        lyric: "Market mates the mock-up with a mascot-artifacted,",
        override: {
            surface: "I describe a market that rewards mascot branding while sidelining architecture-grade craft.",
            deep: [
                {
                    category: "SELECTION BIAS",
                    text: "Mock-up versus mascot language frames a system where performative packaging outranks structural quality."
                },
                {
                    category: "CRAFT DISPLACEMENT",
                    text: "Artifacted phrasing implies the work is treated like collectible residue, not living labor."
                }
            ]
        }
    },
    {
        lyric: "so he's gotta move, quick maffs,",
        override: {
            surface: "He drops into meme-shorthand as a pressure-release tactic before returning to grind language.",
            deep: [
                {
                    category: "MEME REGISTER",
                    text: "Quick maffs maps to a known UK internet catchphrase and signals humor as survival ventilation inside burnout."
                },
                {
                    category: "PACE SPIKE",
                    text: "The phrase briefly accelerates cadence and interrupts despair with clipped tactical energy."
                }
            ]
        }
    },
    {
        lyric: "His Task stacks clash, dash-cams catch his cancellations.",
        override: {
            surface: "I compress overload into surveillance syntax where every missed move feels permanently replayable.",
            deep: [
                {
                    category: "QUEUE COLLISION",
                    text: "Task stacks clash marks stacked obligations colliding faster than they can be completed."
                },
                {
                    category: "ARCHIVE ANXIETY",
                    text: "Dash-cam imagery turns ordinary cancellation into evidence trail, intensifying self-policing pressure."
                }
            ]
        }
    },
    {
        lyric: "He catalogs the no's, a gallery of ballast stones.",
        override: {
            surface: "I turn rejection into an indexed archive so refusal becomes ballast instead of pure collapse.",
            deep: [
                {
                    category: "CURATED FAILURE",
                    text: "Gallery language reframes repeated no's as a structured record, not disposable embarrassment."
                },
                {
                    category: "WEIGHT FUNCTION",
                    text: "Ballast stones implies rejection still hurts but can stabilize direction under rough conditions."
                }
            ]
        }
    },
    {
        lyric: "When money thins, he pawns the mic, recovers it by Friday tips,",
        override: {
            surface: "I frame survival as weekly liquidation and buyback where art becomes temporary collateral.",
            deep: [
                {
                    category: "LIQUIDITY TRIAGE",
                    text: "Pawning then recovering the mic documents a recurring cashflow emergency loop rather than one dramatic fall."
                },
                {
                    category: "WORKER DIGNITY LOOP",
                    text: "Friday-tip recovery keeps agency alive, but only by replaying the same precarious cycle."
                }
            ]
        }
    },
    {
        lyric: "Adjunct wages, adjunct pages, margins starved and faded,",
        override: {
            surface: "He ties the song to contingent knowledge work where output is high and compensation is thin.",
            deep: [
                {
                    category: "ACADEMIC PRECARITY",
                    text: "Adjunct repetition emphasizes structural underpayment and overproduction pressure rather than isolated bad luck."
                }
            ]
        }
    },
    {
        lyric: "Strict bout slivered slices Lime and bitters spices,",
        override: {
            surface: "Coping is rendered through tightly measured drink ritual rather than narrative breakthrough.",
            deep: [
                {
                    category: "RITUAL MICRO-CONTROL",
                    text: "Lime-and-bitters detail turns self-regulation into recipe grammar: precise portions standing in for emotional stability."
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
        lyric: "I'm just a fellow with a broken nose and cello flows,",
        override: {
            surface: "I hold bodily bruise and refined craft in one breath to reject clean class binaries.",
            deep: [
                {
                    category: "BODY + ART SPLIT",
                    text: "Broken nose and cello pairing keeps injury and discipline side by side instead of isolating either into stereotype."
                },
                {
                    category: "VOICE POSITION",
                    text: "I frame myself as ordinary ('just a fellow') while asserting technical musical literacy."
                }
            ]
        }
    },
    {
        lyric: "I'm saying hello, from the window of the Chateau beamin'",
        override: {
            surface: "He momentarily adopts elevated vantage language before returning to pressure diagnostics.",
            deep: [
                {
                    category: "STATUS WINDOW",
                    text: "Chateau imagery presents distance and display, signaling a performed poise that the next bars keep destabilizing."
                },
                {
                    category: "FRAMING DEVICE",
                    text: "The line functions like a camera reset shot before the track dives back into extraction and fear logic."
                }
            ]
        }
    },
    {
        lyric: "Men don't be feelin' mellow till they shatter their reason,",
        override: {
            surface: "I call out masculinity pressure where emotional permission arrives only after breakdown.",
            deep: [
                {
                    category: "MASCULINITY COST MODEL",
                    text: "The line says calm is culturally delayed until rational control has already cracked."
                },
                {
                    category: "AFFECT SUPPRESSION",
                    text: "Shatter-their-reason framing treats numbness and collapse as linked outcomes, not opposites."
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
        lyric: "My dreadlocks in the scope of a bloodclot demon,",
        override: {
            surface: "I mark visibility itself as targeting risk, not neutral presence.",
            deep: [
                {
                    category: "TARGETING IMAGE",
                    text: "Scope language casts identity markers as exposed surfaces under hostile attention."
                },
                {
                    category: "REGISTER INTENSIFIER",
                    text: "Bloodclot diction keeps the bar in lived diaspora register, carrying urgency that standard phrasing would soften."
                }
            ]
        }
    },
    {
        lyric: "I hear the pressure steamin' in the cooker, with a book of fears redrawn as dreamin',",
        override: {
            surface: "I treat fear management as active redrafting: pressure gets renamed to stay survivable.",
            deep: [
                {
                    category: "COOKER MODEL",
                    text: "Steam and cooker keep escalation physical, showing stress as pressure build rather than abstract mood."
                },
                {
                    category: "COGNITIVE REWRITE",
                    text: "Book-of-fears redrawn as dreamin' shows reframing as coping labor, not denial."
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
        lyric: "Them take ah' pick from ya pocket and the pick of ya litter,",
        override: {
            surface: "I describe extraction at two levels at once: immediate cash and long-run future options.",
            deep: [
                {
                    category: "DOUBLE EXTRACTION",
                    text: "Pick-from-pocket captures present depletion, while pick-of-litter captures upstream capture of best possibilities."
                },
                {
                    category: "RESOURCE STRIPPING",
                    text: "The line sharpens the track's thesis that systems remove both liquidity and trajectory."
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
        lyric: "Feel it tug on ya brain like a euro from ya pocket, or a string on ah' guitar,",
        override: {
            surface: "I tie cognition, finance, and musicianship into one tension line where each pull has a cost.",
            deep: [
                {
                    category: "CURRENCY DRAIN IMAGE",
                    text: "Euro-from-pocket phrasing prices mental strain as repeated monetary leakage."
                },
                {
                    category: "INSTRUMENT TENSION",
                    text: "Guitar-string pull keeps the line tactile: pressure is calibrated like tone, but still physically wearing."
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
        lyric: "But ya never been no quitter so you callin' up the beureu for a way to get better,",
        override: {
            surface: "He shifts from hustle bravado into bureaucratic appeal for sanctioned relief.",
            deep: [
                {
                    category: "INSTITUTION TURN",
                    text: "Calling up the bureau marks the point where private coping no longer scales and formal systems get pulled in."
                },
                {
                    category: "RESILIENCE TAX",
                    text: "Never-been-no-quitter keeps pride language intact while admitting the cost has exceeded solo management."
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
        lyric: "Cog-sci",
        override: {
            surface: "I name the discipline immediately so the track opens as method declaration, not hidden metaphor.",
            deep: [
                {
                    category: "TITLE DECLARATION",
                    text: "I frontload Cog-sci as the commitment object, so the coming love-song syntax is contextualized before it lands."
                },
                {
                    category: "ARC POSITION",
                    text: "This one-word opener is a hinge after Broadripple: citation panic collapses into explicit self-retraining intent."
                }
            ]
        }
    },
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
                    text: "I re-enter my own knowledge as a novice, which matches the track's cycle-break agenda."
                },
                {
                    category: "IF-THEN RETRAINING",
                    text: "I frame this as implementation-intention behavior: when the old loop cue appears, I route to a different response."
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
            surface: "I describe recurring thought style as the loop that blocks movement toward passion.",
            deep: [
                {
                    category: "CYCLE DIAGNOSIS",
                    text: "The repeated phrasing performs the loop it describes: cognition returning to the same attractor state."
                },
                {
                    category: "ARTIST NOTE CONTEXT",
                    text: "Per artist context, the track's focus is escaping repeated cycles that prevent pursuing my passion in Cog Sci."
                },
                {
                    category: "UNFINISHED-TASK RESIDUE",
                    text: "I leave this phrasing unresolved on purpose so unfinished-goal pressure stays active instead of pretending closure."
                },
                {
                    category: "HANDOFF PRESSURE",
                    text: "I leave this unresolved so Rum Drum can show what the same loop feels like in body-routine form."
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
                },
                {
                    category: "SOCIAL FRICTION",
                    text: "The line keeps peer judgment in frame, so the pivot reads as costly commitment instead of private fantasy."
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
                    text: "I use repetition against repetition: mantra as antidote to rumination."
                },
                {
                    category: "EXIT VECTOR",
                    text: "I close in chant form rather than explanation so the next track inherits motion instead of fake closure."
                }
            ]
        }
    }
];

const COGSCI_NODE_ADDITIONS: NodeAddition[] = [
    {
        lyric: "Cog-sci",
        surface: "I name the discipline immediately so the track opens as method declaration, not hidden metaphor.",
        deep: [
            {
                category: "TITLE DECLARATION",
                text: "I frontload Cog-sci as the commitment object, so the coming love-song syntax is contextualized before it lands."
            },
            {
                category: "ARC POSITION",
                text: "This one-word opener is a hinge after Broadripple: citation panic collapses into explicit self-retraining intent."
            }
        ]
    },
    {
        lyric: "And I don't care what they say, about us, (Cog Sci)",
        surface: "A romance template gets redirected into commitment to a field of study.",
        deep: [
            {
                category: "FORM TRANSFER",
                text: "Pop-love syntax is intentionally retained while the object is changed from person to discipline."
            },
            {
                category: "SOCIAL FRICTION",
                text: "The line keeps peer judgment in frame, so the pivot reads as costly commitment instead of private fantasy."
            }
        ]
    },
    {
        lyric: "Don't you know? (Don't you know!) / Cog-sci, Cog-sci / Cog-sci",
        surface: "The outro chant works as self-programming: repetition is used to reclaim direction from drift.",
        deep: [
            {
                category: "CHANT MECHANICS",
                text: "Call-and-response phrasing mimics internal coaching, making discipline commitment audible."
            },
            {
                category: "EXIT VECTOR",
                text: "I close in chant form rather than explanation so the next track inherits motion instead of fake closure."
            }
        ]
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
            claim: "APA's psychology dictionary defines rumination as repetitive focus on distress content, matching the days-and-weeks thinking bars.",
            source_type: "secondary",
            reference: "APA Dictionary of Psychology - rumination",
            reliability: "high",
            url: "https://dictionary.apa.org/rumination"
        },
        {
            claim: "APA's psychology dictionary defines cognitive restructuring as identifying and changing maladaptive thoughts, aligning with the relearning language.",
            source_type: "secondary",
            reference: "APA Dictionary of Psychology - cognitive restructuring",
            reliability: "high",
            url: "https://dictionary.apa.org/cognitive-restructuring"
        },
        {
            claim: "Zeigarnik effect describes unfinished-task tension staying cognitively active, matching the unresolved stuck-here loop in the refrain.",
            source_type: "secondary",
            reference: "Wikipedia - Zeigarnik effect",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Zeigarnik_effect"
        },
        {
            claim: "Implementation intentions use if-then planning to redirect behavior under known triggers, matching the relearning posture as procedural retraining.",
            source_type: "secondary",
            reference: "Wikipedia - Implementation intention",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Implementation_intention"
        },
        {
            claim: "Call-and-response is a recognized alternating musical form that supports reading the outro as intentional self-coaching.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - call and response",
            reliability: "medium",
            url: "https://www.britannica.com/art/call-and-response"
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
            key_context: "A short hinge track that internalizes Broadripple's citation panic into thought-loop retraining before Rum Drum externalizes the same loop as daily maintenance.",
            emotional_valence: "Anxious, self-observing, and committed to re-patterning"
        },
        research: COGSCI_RESEARCH,
        nodes: appendMissingNodes(
            applyNodeOverrides(base.nodes, COGSCI_NODE_OVERRIDES),
            COGSCI_NODE_ADDITIONS
        ),
        victor_critique: {
            strengths: [
                "Artist-intent context is now explicit instead of inferred.",
                "The cycle-breaking thesis is now visible at line level.",
                "Sample-origin note is preserved for future rights/publishing documentation.",
                "Relearning, rumination/perseveration, and chant mechanics are now linked as one coherent intervention model.",
                "Handoff pressure into Rum Drum is now explicit instead of implied."
            ],
            gaps: [
                "Final legal/clearance metadata is external to this annotation layer.",
                "Because the track is concise, thematic claims rely heavily on chorus interpretation."
            ],
            next_pass_focus: "Add UI section chips for the exact hinge path: title declaration -> relearn -> stuck-loop diagnosis -> chant exit vector."
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
                },
                {
                    category: "GLOOM-TO-EARNEST HANDOFF",
                    text: "I intentionally convert GLOOM's panic heat into argument heat so recovery starts as language discipline, not mood luck."
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
                },
                {
                    category: "CRAFT-AS-PROSECUTION",
                    text: "By mashing motives into melody, I treat writing as evidence assembly rather than a pure emotional vent."
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
                },
                {
                    category: "SHELTER FAILURE",
                    text: "I keep the picket image literal enough to show this is about infrastructure and safety, not only private impulse."
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
                },
                {
                    category: "COOLDOWN PREP",
                    text: "I use this miniature close to lower the register before The Better opens its recovery aperture."
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
                },
                {
                    category: "SEQUENCE RELEASE VALVE",
                    text: "I leave this tension unresolved so Better can cool the tone without pretending contract pressure disappeared."
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
                },
                {
                    category: "RECOVERY RHETORIC",
                    text: "Invoking Douglass is my method pivot: I move from private panic witness toward public-facing speech discipline."
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
                "Opening furnace thesis and late couplet compression now give the track stronger structural spine.",
                "Under-explained middle bars now carry explicit citation handling (clemency withdrawal, revolver memory pressure, picket-shelter contrast, and sorrow/sparrow miniature close)."
            ],
            gaps: [
                "Some colloquial bars remain intentionally context-heavy and resist fully external verification."
            ],
            next_pass_focus: "Preserve the furnace -> rupture memory -> overlap -> defiant voice progression while tightening cadence-level timestamp notes."
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
                },
                {
                    category: "POST-EARNEST DECOMPRESSION",
                    text: "I intentionally open on soft sensory focus so the track can downshift Earnest's argumentative heat without erasing its stakes."
                },
                {
                    category: "DIURNAL RESET",
                    text: "Day-turn-to-night timing acts as a nervous-system reset cue, giving me a bounded window to recover trust."
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
                },
                {
                    category: "RELIABILITY CHECK",
                    text: "I repeat this phrase to mark consistency under stress, not novelty."
                },
                {
                    category: "PRE-IGNITION REP",
                    text: "I keep the repetition short so reassurance is rehearsed just enough to hand into Momentum's start command."
                }
            ]
        }
    },
    {
        lyric: "I am better, from the mountains to the sea,",
        override: {
            surface: "I move from relational image to self-affirmation across full landscape scale.",
            deep: [
                {
                    category: "AFFIRMATION GEOGRAPHY",
                    text: "Mountains-to-sea span signals endurance across extremes, reframing identity as resilient across changing terrain."
                },
                {
                    category: "MERISM DEVICE",
                    text: "The paired endpoints operate like merism: two poles implying a total-range claim rather than a single-location mood."
                },
                {
                    category: "POST-COLLAPSE COUNTERWEIGHT",
                    text: "Mountains-to-sea scale lets me counter GLOOM's enclosure imagery with range, but without claiming permanent safety."
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
                },
                {
                    category: "HANDOFF FUNCTION",
                    text: "By keeping vision active below the surface, I set up Momentum as an action cue instead of a forced mood swing."
                },
                {
                    category: "ANTI-TRIUMPH GUARDRAIL",
                    text: "Underneath language keeps this affirmation honest: I am not declaring victory, I am declaring workable sightlines."
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
            },
            {
                category: "POST-EARNEST DECOMPRESSION",
                text: "I intentionally open on soft sensory focus so the track can downshift Earnest's argumentative heat without erasing its stakes."
            },
            {
                category: "DIURNAL RESET",
                text: "Day-turn-to-night timing acts as a nervous-system reset cue, giving me a bounded window to recover trust."
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
            },
            {
                category: "RELIABILITY CHECK",
                text: "I repeat this phrase to mark consistency under stress, not novelty."
            },
            {
                category: "PRE-IGNITION REP",
                text: "I keep the repetition short so reassurance is rehearsed just enough to hand into Momentum's start command."
            }
        ]
    },
    {
        lyric: "I am better, from the mountains to the sea,",
        surface: "I move from relational image to self-affirmation across full landscape scale.",
        deep: [
            {
                category: "AFFIRMATION GEOGRAPHY",
                text: "Mountains-to-sea span signals endurance across extremes, reframing identity as resilient across changing terrain."
            },
            {
                category: "MERISM DEVICE",
                text: "The paired endpoints operate like merism: two poles implying a total-range claim rather than a single-location mood."
            },
            {
                category: "POST-COLLAPSE COUNTERWEIGHT",
                text: "Mountains-to-sea scale lets me counter GLOOM's enclosure imagery with range, but without claiming permanent safety."
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
            },
            {
                category: "HANDOFF FUNCTION",
                text: "By keeping vision active below the surface, I set up Momentum as an action cue instead of a forced mood swing."
            },
            {
                category: "ANTI-TRIUMPH GUARDRAIL",
                text: "Underneath language keeps this affirmation honest: I am not declaring victory, I am declaring workable sightlines."
            }
        ]
    }
];

const BETTER_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.95,
    unknowns: [
        "Whether a longer studio take exists with additional connective bars that were intentionally withheld from this edition."
    ],
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
        },
        {
            claim: "Merism denotes using opposite poles to communicate total range, supporting the mountains-to-sea line as full-spectrum claim.",
            source_type: "secondary",
            reference: "Wikipedia - Merism",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Merism"
        },
        {
            claim: "Interludes in music are short connective passages, supporting this track's intended bridge-node function.",
            source_type: "secondary",
            reference: "Wikipedia - Interlude",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Interlude"
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
            key_context: "A short aperture that cools Earnest's rhetorical burn and restores enough trust for Momentum to convert calm into motion.",
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
                "Interlude function remains intact while carrying more narrative agency.",
                "Mountains-to-sea merism and the canonical 'underneath' wording now anchor the track's range claim without overloading it.",
                "Handoff logic is clearer: Earnest decompression here, then Momentum ignition.",
                "New day-night and repetition anchors keep this short track evidentiary without over-expanding its footprint."
            ],
            gaps: [
                "Because the song is concise, annotation density should stay restrained to preserve pace."
            ],
            next_pass_focus: "Keep the pass lightweight but preserve explicit handoff cues into Momentum."
        }
    };
}

const MOMENTUM_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "Oh Momentum, Momentum of the moment, hmm?",
        override: {
            surface: "I use a self-trigger phrase where motion is generated by present attention rather than long planning.",
            deep: [
                {
                    category: "MANTRA ENGINE",
                    text: "I repeat the phrase like a vocal warmup loop that primes action before narrative detail."
                },
                {
                    category: "EPIZEUXIS DEVICE",
                    text: "The immediate momentum/moment repetition works like epizeuxis, so emphasis is delivered through recursion instead of extra exposition."
                },
                {
                    category: "BREATH-TO-BEAT CONTROL",
                    text: "I keep the phrase clipped and percussive so breath, pacing, and intention can lock together before overthinking interrupts."
                },
                {
                    category: "CHECKED CONFIDENCE",
                    text: "I end on 'hmm?' so this never reads as empty bravado; I keep reflective uncertainty in the same breath."
                },
                {
                    category: "TRANSITION COMMAND",
                    text: "I wrote this as a sequencing command after The Better: confidence has to become movement before Knee Socks tests it in colder conditions."
                }
            ]
        }
    },
    {
        lyric: "Body full of cortisol",
        override: {
            surface: "I name the stress chemistry directly so the activation mood reads as survival physiology, not motivational poster language.",
            deep: [
                {
                    category: "SOMATIC SUBTEXT",
                    text: "I ground this hinge in body-state reality: the push for motion is also a response to stress hormones and panic carryover."
                },
                {
                    category: "IGNITION THRESHOLD",
                    text: "This line behaves like activation-energy language: I need enough internal force to start movement at all."
                },
                {
                    category: "ALLOSTATIC COST",
                    text: "By naming cortisol directly, I admit this drive comes with wear-and-tear from repeated stress adaptation, not clean inspiration."
                }
            ]
        }
    }
];

const MOMENTUM_NODE_ADDITIONS: NodeAddition[] = [
    {
        lyric: "Oh Momentum,",
        surface: "I open with invocation language to trigger movement before explanation.",
        deep: [
            {
                category: "INVOCATION",
                text: "The opening call functions like a start command, not a descriptive sentence."
            },
            {
                category: "VOCATIVE SELF-COACHING",
                text: "I address momentum as if it were a partner so command and encouragement happen in the same syllable."
            }
        ]
    },
    {
        lyric: "Momentum of the moment,",
        surface: "I compress force and present-tense attention into one phrase.",
        deep: [
            {
                category: "EPIZEUXIS DEVICE",
                text: "Immediate root-word repetition creates emphasis through rhythm, keeping the line concise and forceful."
            },
            {
                category: "PRESENT-TENSE DRIVE",
                text: "I treat momentum as generated now, not deferred to a future ideal condition."
            },
            {
                category: "MICRO-HORIZON STRATEGY",
                text: "I keep the temporal window tiny on purpose: this bar is about the next step, not the whole life plan."
            }
        ]
    },
    {
        lyric: "Oh Momentum, Momentum of the moment, hmm?",
        surface: "I keep activation and hesitation in one compact line so confidence never detaches from self-audit.",
        deep: [
            {
                category: "HINGE BLUEPRINT",
                text: "This full phrase is the album's hinge syntax: call to motion, compress time, then leave a reflective brake."
            },
            {
                category: "BETTER-TO-KNEESOCKS BRIDGE",
                text: "I place this line between reassurance and social-threat weather so the transition reads as deliberate, not abrupt."
            }
        ]
    },
    {
        lyric: "hmm?",
        surface: "I leave a question mark at the end to keep the mantra self-auditing.",
        deep: [
            {
                category: "CHECKED CONFIDENCE",
                text: "The tag prevents the line from reading as pure bravado by leaving doubt audible."
            },
            {
                category: "HUMILITY BRAKE",
                text: "I use this syllable as a soft brake so urgency stays accountable to reality-testing."
            }
        ]
    },
    {
        lyric: "Body full of cortisol",
        surface: "I name the stress chemistry directly so the activation mood is read as survival physiology, not motivational poster language.",
        deep: [
            {
                category: "SOMATIC SUBTEXT",
                text: "I ground this hinge in body-state reality: the push for motion is also a response to stress hormones and panic carryover."
            },
            {
                category: "SEQUENCE CONTINUITY",
                text: "This line keeps continuity with GLOOM and Lender where autonomic distress is already the operating condition."
            },
            {
                category: "ALLOSTATIC COST",
                text: "I am not glamorizing stress here; I am logging accumulated load that still has to be converted into movement."
            }
        ]
    }
];

const MOMENTUM_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.95,
    unknowns: [
        "Whether live takes preserve the final question-mark delivery or resolve it into declarative cadence.",
        "Whether stem archives include a tempo map proving how this mantra pulse was aligned to the Knee Socks entrance."
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
            claim: "Cortisol is a stress-response hormone that helps mobilize the body under pressure, matching the track's urgency physiology.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - cortisol",
            reliability: "high",
            url: "https://www.britannica.com/science/cortisol"
        },
        {
            claim: "The lyric's recursive structure performs incantatory priming rather than narrative exposition.",
            source_type: "primary",
            reference: "10_Momentum_Analysis.js line structure",
            reliability: "high"
        },
        {
            claim: "Epizeuxis is immediate repetition for emphasis, supporting the momentum/moment recursion as deliberate rhetorical design.",
            source_type: "secondary",
            reference: "Wikipedia - Epizeuxis",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Epizeuxis"
        },
        {
            claim: "Activation energy is the minimum energy threshold needed to start a reaction, matching the track's ignition function in sequence.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - activation energy",
            reliability: "high",
            url: "https://www.britannica.com/science/activation-energy"
        },
        {
            claim: "Allostatic load describes cumulative wear from repeated stress-response activation, supporting the cortisol line as ongoing strain rather than one-off hype.",
            source_type: "secondary",
            reference: "Wikipedia - Allostatic load",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Allostatic_load"
        },
        {
            claim: "Yerkes-Dodson law formalizes the performance tradeoff between under-arousal and overload, matching the track's thin line between ignition and panic.",
            source_type: "secondary",
            reference: "Wikipedia - Yerkes-Dodson law",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Yerkes%E2%80%93Dodson_law"
        },
        {
            claim: "The terminal 'hmm?' keeps the command interrogative, preserving self-audit in the same bar as activation.",
            source_type: "primary",
            reference: "10_Momentum_Analysis.js punctuation and delivery notes",
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
            role: "Pre-Action Mantra / Stress-to-Motion Converter",
            key_context: "A micro-track that converts The Better's restored trust into action-threshold language before Knee Socks stress-tests that motion in colder social weather.",
            emotional_valence: "Anticipatory, wired, and self-commanding"
        },
        research: MOMENTUM_RESEARCH,
        nodes: appendMissingNodes(
            applyNodeOverrides(base.nodes, MOMENTUM_NODE_OVERRIDES),
            MOMENTUM_NODE_ADDITIONS
        ),
        victor_critique: {
            strengths: [
                "Highly memorable mantra with strong transition utility.",
                "The line encodes action readiness with minimal text footprint.",
                "Stress-chemistry framing now clarifies why this acceleration sounds urgent rather than triumphant.",
                "Epizeuxis and activation-threshold framing now ground the micro-form in concrete rhetorical and conceptual mechanics.",
                "Allostatic-load framing now keeps the cortisol line accountable to cost, not hype.",
                "The 'hmm?' ending now reads as intentional self-audit rather than an unfinished take."
            ],
            gaps: [
                "Narrative stakes remain intentionally minimal in this isolated form.",
                "Interpretive depth depends on sequence context more than internal detail.",
                "Timestamp-level cadence evidence is still needed for final live-note synchronization."
            ],
            next_pass_focus: "Keep this compact while preserving the full hinge sequence (invocation -> recursion -> cortisol -> self-check) in every export mode."
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
        lyric: "A draft adrift / My nights ah gaffs and tunes",
        override: {
            surface: "I keep the opening in drift mode, but I tag the nights as social misfires and coping noise instead of clean mythic cool.",
            deep: [
                {
                    category: "SELF-AUDIT REGISTER",
                    text: "Gaffs language keeps this section accountable: I admit blunders while still chasing craft momentum."
                },
                {
                    category: "DRIFT CONTINUITY",
                    text: "Adrift extends the raft thesis so nightlife and writing both read as floating without a stable anchor."
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
        lyric: "My loft is gloom I think / I cough and drink, / I fight and sink inside my room",
        override: {
            surface: "Domestic space becomes a pressure chamber where sedation and resistance happen in the same breath.",
            deep: [
                {
                    category: "ROOM LOOP",
                    text: "Loft and room imagery pre-echo GLOOM's enclosure language, keeping this track inside the same depressive architecture."
                },
                {
                    category: "COPING COLLISION",
                    text: "Cough-and-drink plus fight-and-sink captures contradictory regulation: I try to stabilize while feeding the spiral."
                }
            ]
        }
    },
    {
        lyric: "A height in price surmised, resumes economy / I wisely up the spice devised, consume gastronomy",
        override: {
            surface: "Cost pressure and intake behavior collapse into one survival equation.",
            deep: [
                {
                    category: "SCARCITY INTRUSION",
                    text: "Price and economy language keeps macro stress inside intimate routine rather than outside it."
                },
                {
                    category: "INTAKE GOVERNANCE",
                    text: "Spice and gastronomy framing treats consumption as calibrated mood management, not leisure excess."
                }
            ]
        }
    },
    {
        lyric: "I bite concisely, a vice, a loom, dark room photography / Classroom deplumed despised defies metonymy",
        override: {
            surface: "I process memory like a darkroom image while refusing to let classroom language flatten lived injury into symbol.",
            deep: [
                {
                    category: "IMAGE DEVELOPMENT",
                    text: "Darkroom imagery treats identity as a negative developed under low light and chemical patience."
                },
                {
                    category: "RHETORIC REFUSAL",
                    text: "Defies metonymy signals a boundary: I will not let pain be reduced to abstract stand-ins."
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
        lyric: "Lights flash on subway cars, / I write past crash of rails and spar",
        override: {
            surface: "Transit noise becomes both metronome and opponent; I keep writing through impact instead of waiting for quiet.",
            deep: [
                {
                    category: "URBAN CADENCE",
                    text: "Subway flashes and rail-crash texture ground this verse in city kinetics rather than studio isolation."
                },
                {
                    category: "CRAFT UNDER IMPACT",
                    text: "Spar language frames lyric-making as active contest with environment, not passive journaling."
                }
            ]
        }
    },
    {
        lyric: "With thoughts that clash--my mind's a faint bazaar, / My Nights dash fast like frames on VCRs.",
        override: {
            surface: "Cognition turns into crowded-market noise while memory flickers in analog fast-forward.",
            deep: [
                {
                    category: "MARKET MIND IMAGE",
                    text: "Bazaar metaphor maps attention to competing sellers where no single signal can hold dominance for long."
                },
                {
                    category: "ANALOG TIME DRIFT",
                    text: "VCR framing adds rewind/fast-forward blur, connecting this section to archival distortion motifs from VICTOR."
                }
            ]
        }
    },
    {
        lyric: "Invest in facts, but haze adapts, a mold / My restless tact to chase what cracks and holds, its icy cold like Rum",
        override: {
            surface: "Even disciplined analysis gets overgrown; I keep chasing broken edges while falling back to Rum Drum cold-comfort logic.",
            deep: [
                {
                    category: "EPISTEMIC DECAY",
                    text: "Facts versus haze-and-mold language shows knowledge itself getting contaminated under repeated stress."
                },
                {
                    category: "ALBUM CALLBACK",
                    text: "Icy-cold rum phrase reopens The Rum Drum's sedative endurance economy inside this track's romance-threat frame."
                }
            ]
        }
    },
    {
        lyric: "The city hums, I'm lost as crowded streams unfold , / A gritty sum, jotted doubted schemes fortold.",
        override: {
            surface: "Crowd flow becomes throughput pressure where I read myself as one unstable entry in a bigger urban ledger.",
            deep: [
                {
                    category: "STREAM LOGIC",
                    text: "Crowded streams language frames public life as velocity channel, not communal safety."
                },
                {
                    category: "LEDGER SELF-READ",
                    text: "Gritty sum and jotted schemes keep autobiography in accounting mode where dreams are written as doubtful liabilities."
                }
            ]
        }
    },
    {
        lyric: "The ink bleeds slow, I trace it line by line, / A brink I know, erased in time's decline.",
        override: {
            surface: "The cadence slows into patient line-labor, but the edge still erodes under deadline and entropy pressure.",
            deep: [
                {
                    category: "LINE-LABOR",
                    text: "Tracing line by line treats craft as a deliberate anti-panic technique rather than speed-flex output."
                },
                {
                    category: "ENTROPY TENSION",
                    text: "Brink and decline keep mortality and timing risk active even in the calmer section."
                }
            ]
        }
    },
    {
        lyric: "The drink is low, I pace through signs divine, / And think I'll glow, displaced but still aligned - consigned.",
        override: {
            surface: "Hope shows up in flashes, but it arrives with displacement language and resigned terms.",
            deep: [
                {
                    category: "AMBIVALENT ASCENT",
                    text: "Glow and aligned signal local orientation, not full stabilization."
                },
                {
                    category: "CONSIGNED ENDPOINT",
                    text: "Consigned closes the stanza on contractual surrender and foreshadows World in a Jar enclosure logic."
                }
            ]
        }
    },
    {
        lyric: "Lights low in the station's haze, I blink / And write flows where patience plays with ink.",
        override: {
            surface: "The station section lowers the pulse and treats patience as compositional regulation.",
            deep: [
                {
                    category: "TRANSIT CHAMBER",
                    text: "Station haze acts as a reset room between aggressive choruses and the intimacy-seeking bridge."
                },
                {
                    category: "PACE DISCIPLINE",
                    text: "Patience-plays-with-ink reframes writing as slow corrective practice, not adrenaline discharge."
                }
            ]
        }
    },
    {
        lyric: "Night grows, my cadence stays distinct, / My sights throw waves; I wade, I sink.",
        override: {
            surface: "Keeping cadence does not cancel collapse: form control and emotional submersion run in parallel.",
            deep: [
                {
                    category: "FORM VS STATE",
                    text: "Distinct cadence is a craft win that coexists with sinking affect, preserving the track's dual register."
                },
                {
                    category: "WAVE IMAGE",
                    text: "Throw/wade/sink sequence stages immersion over time rather than a one-moment panic burst."
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
        lyric: "I step through cracks, the tiles align, they gleam, / A hectic track where trials unwind the dream.",
        override: {
            surface: "I catch a brief geometric order inside transit motion, but the same movement keeps unthreading the dream.",
            deep: [
                {
                    category: "MICRO-ORDER",
                    text: "Aligned tiles mark a short control event in the middle of ongoing environmental turbulence."
                },
                {
                    category: "UNWIND PARADOX",
                    text: "Trials unwind the dream means progress and loss execute simultaneously in this bridge run."
                }
            ]
        }
    },
    {
        lyric: "The metrics lack, but piles of signs redeem, / The skeptic acts with miles of time to scheme.",
        override: {
            surface: "When scoreboard logic fails, I pivot to symbol-reading and skeptical planning to stay in motion.",
            deep: [
                {
                    category: "QUANT LIMIT",
                    text: "Metrics-lack line critiques numerical accounting as insufficient for lived meaning under pressure."
                },
                {
                    category: "SKEPTIC ENGINE",
                    text: "Skeptic-acts phrasing keeps the Hume-style doubt posture active as method rather than paralysis."
                }
            ]
        }
    },
    {
        lyric: "A lens distorts; the frame is breaking wide, / The bends contort; my aim is staking pride.",
        override: {
            surface: "Perception warps under load, but I still force an authorship claim inside the distortion.",
            deep: [
                {
                    category: "OPTICS CALLBACK",
                    text: "Lens and frame language loops back to VICTOR's parallax grammar, showing continuity across emotional climates."
                },
                {
                    category: "PRIDE RISK",
                    text: "Staking pride marks an agency attempt that can restore self-worth or intensify fallout."
                }
            ]
        }
    },
    {
        lyric: "The ends abort; the shame, it snakes inside, / My friends report: their flame, it stays alive.",
        override: {
            surface: "Shame remains internal, but outside witness from friends keeps a pilot-light survival signal active.",
            deep: [
                {
                    category: "FAIL-STATE LANGUAGE",
                    text: "Abort vocabulary treats collapse as process interruption, connecting this bridge to The Machine's later cutoff logic."
                },
                {
                    category: "SOCIAL PILOT LIGHT",
                    text: "Friends' flame serves as external continuity when my own signal weakens."
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
        },
        {
            claim: "Gaffe denotes an embarrassing social blunder, supporting the 'gaffs and tunes' self-audit register.",
            source_type: "secondary",
            reference: "Merriam-Webster - gaffe",
            reliability: "high",
            url: "https://www.merriam-webster.com/dictionary/gaffe"
        },
        {
            claim: "A darkroom is a controlled low-light space for developing film, matching the line's identity-processing image grammar.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - darkroom",
            reliability: "high",
            url: "https://www.britannica.com/technology/darkroom"
        },
        {
            claim: "Metonymy is a figure of speech where one thing stands for another related thing, supporting the lyric's refusal to be reduced to symbolic shorthand.",
            source_type: "secondary",
            reference: "Encyclopaedia Britannica - metonymy",
            reliability: "high",
            url: "https://www.britannica.com/art/metonymy"
        },
        {
            claim: "Videocassette recorder (VCR) playback and shuttle behavior produce visible frame-jump effects, supporting the jittered-memory pacing in the transit section.",
            source_type: "secondary",
            reference: "Wikipedia - Videocassette recorder",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Videocassette_recorder"
        },
        {
            claim: "Internal notes for Knee Socks track the station-haze section as a regulation chamber that bridges aggression loops and later intimacy lines.",
            source_type: "primary",
            reference: "11_KneeSocks_Analysis.js local notes",
            reliability: "high"
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
                },
                {
                    category: "STATUS COMPRESSION",
                    text: "I phrase this as a limited-capacity world, where visibility pressure makes self-expression feel like a zero-sum lane."
                }
            ]
        }
    },
    {
        lyric: "Lawn after lawn look compressed like a rar",
        override: {
            surface: "I read physical space as archived data under compression pressure.",
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
                    category: "LOOKING-GLASS PRESSURE",
                    text: "I show how imagined judgment can start governing my behavior, so I react to reflected fear before I listen to the actual person."
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
                },
                {
                    category: "PANOPTIC SELF-POLICING",
                    text: "Eyes-to-the-glass phrasing keeps me in constant self-monitoring mode, where possible surveillance is enough to lock behavior."
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
                },
                {
                    category: "WAR-SPECTACLE HOSTING",
                    text: "War-crowned-hosts-leer turns the scene into predatory spectatorship: I read social order as people profiting from sustained conflict."
                }
            ]
        }
    },
    {
        lyric: "Plans unfurl, marathon, not a race",
        override: {
            surface: "I briefly correct manic tempo with endurance logic.",
            deep: [
                {
                    category: "PACE CORRECTION",
                    text: "The line interrupts compression panic with long-horizon pacing discipline."
                }
            ]
        }
    },
    {
        lyric: "Doors still a jar, it's a curse in the pained",
        override: {
            surface: "The line encodes a blocked-exit paradox: open in theory, trapped in practice.",
            deep: [
                {
                    category: "AJAR WORDPLAY",
                    text: "Ajar language marks partial opening without real release, reinforcing the track's enclosure thesis."
                },
                {
                    category: "EXIT FAILURE",
                    text: "Calling it a curse keeps the line in fate-pressure mode instead of framing it as a simple decision error."
                }
            ]
        }
    }
];

const WORLD_JAR_NODE_ADDITIONS: NodeAddition[] = [
    {
        lyric: "Plans unfurl for your girl in the bar",
        surface: "I frame this bar scene as strategy theater where affection and optics are negotiated in public.",
        deep: [
            {
                category: "BAR THEATER",
                text: "Plans-unfurl language shows I am not in spontaneous romance mode here; I am planning around risk and status signals."
            },
            {
                category: "SOCIAL STAGING",
                text: "By placing this in the bar, I admit that witnesses, gossip, and display pressure are shaping my choices."
            }
        ]
    },
    {
        lyric: "Defaced, depearled, and disgraced by a scar / She'll Hurl at the swirl of your whirl in a jar",
        surface: "I show pushback against my containment logic: the partner refuses to stay inside my orbit narrative.",
        deep: [
            {
                category: "COUNTER-VOICE MOMENT",
                text: "Hurl-at-the-swirl marks active rejection, which prevents this section from reading as one-way narrator control fantasy."
            },
            {
                category: "CONTAINMENT BACKLASH",
                text: "Whirl-in-a-jar language implies my control loop destabilizes the relationship instead of securing it."
            }
        ]
    },
    {
        lyric: "Gon far to impress for the words in ya war / Sink as you think through distress thick tar",
        surface: "I admit the tax of performative conflict: I overextend for verbal wins, then get dragged by the residue.",
        deep: [
            {
                category: "WAR-OF-WORDS COST",
                text: "Words-in-ya-war frames communication as combat, where persuasion priorities displace care priorities."
            },
            {
                category: "TAR STAGNATION",
                text: "Distress-thick-tar imagery captures cognitive immobilization after escalation, not decisive victory."
            }
        ]
    },
    {
        lyric: "No stars in the world worth the space, / voids in dark pearls, an unearthed grace",
        surface: "I reject star hierarchy and look for value in what the spotlight ignores.",
        deep: [
            {
                category: "ANTI-SPECTACLE VALUE",
                text: "No-stars wording refuses fame as the only scarcity metric, so I can evaluate worth outside the visibility economy."
            },
            {
                category: "VOID-TO-GRACE TURN",
                text: "Voids-in-dark-pearls language reframes absence as buried potential that still requires excavation labor."
            }
        ]
    },
    {
        lyric: "Brawn after fawn, uncliped the grass isn't grazed / Compressed like a zip, yeah the mass goes unraised",
        surface: "I show the posture shift from seduction to force, then admit collective potential still gets packed down.",
        deep: [
            {
                category: "POSTURE FLIP",
                text: "Brawn-after-fawn marks a defensive hardening: I stop courting and start bracing."
            },
            {
                category: "COLLECTIVE SUPPRESSION",
                text: "Mass-goes-unraised keeps the ZIP motif social: compression is not only personal anxiety, it is stalled group lift."
            }
        ]
    },
    {
        lyric: "Nights for the sleepless, the days feel deranged / Heights of the peak mist, climb's preordained",
        surface: "I log a broken sleep cycle and forced ascent logic in the same breath.",
        deep: [
            {
                category: "CIRCADIAN FRACTURE",
                text: "Sleepless nights plus deranged days show rhythm collapse, where recovery windows keep getting erased."
            },
            {
                category: "PREDESTINED CLIMB",
                text: "Peak-mist and preordained climb language frames ambition as compulsory labor, not a free scenic hike."
            }
        ]
    },
    {
        lyric: "Where's my guitar? My hearse for the gained",
        surface: "I recast the instrument as a vehicle carrying what success has already cost me.",
        deep: [
            {
                category: "INSTRUMENT-AS-HEARSE",
                text: "Calling the guitar a hearse turns craft into grief transport, not entertainment-only output."
            },
            {
                category: "GAIN TAX",
                text: "For-the-gained phrasing admits that each win can arrive with something else buried."
            }
        ]
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
            claim: "Cooley's looking-glass self model describes identity being shaped through imagined social judgment, matching the mirror-not-face conflict.",
            source_type: "secondary",
            reference: "Wikipedia - Looking-glass self",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Looking-glass_self"
        },
        {
            claim: "Foucault's Discipline and Punish describes panoptic self-regulation under possible observation, matching the eyes-to-the-glass posture in the refrain.",
            source_type: "secondary",
            reference: "Wikipedia - Discipline and Punish",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Discipline_and_Punish"
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
        nodes: appendMissingNodes(
            applyNodeOverrides(base.nodes, WORLD_JAR_NODE_OVERRIDES),
            WORLD_JAR_NODE_ADDITIONS
        ),
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
                },
                {
                    category: "REINFORCEMENT LOOP",
                    text: "I frame the cycle as sticky by design: repetition keeps paying out just enough to prevent clean exit."
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
                },
                {
                    category: "VARIABLE-RATIO CHASE",
                    text: "Coin-slot accumulation plus uncertain payoff reads like intermittent reinforcement, where unpredictability keeps effort locked in."
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
                },
                {
                    category: "SELF-SURVEILLANCE",
                    text: "I turn myself into a dashboard here, treating measurable output as a substitute for emotional stability."
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
    },
    {
        lyric: "His locks thick, grease stains thin on his lock pick,",
        override: {
            surface: "He frames survival as technical entry work under grime and time pressure.",
            deep: [
                {
                    category: "FORCED-ACCESS IMAGE",
                    text: "Lock-pick language emphasizes improvised access under constraint rather than institutional permission."
                }
            ]
        }
    },
    {
        lyric: "It's a varnish for the wood rot,",
        override: {
            surface: "He states the core metaphor plainly: shine over decay.",
            deep: [
                {
                    category: "STRUCTURAL COVER",
                    text: "Varnish-over-rot marks protective presentation that delays collapse but does not reverse damage."
                }
            ]
        }
    },
    {
        lyric: "Went from bike handles and trikes, to handles he can't put down.",
        override: {
            surface: "The line maps an age-progression from mobility imagery to substance dependence language.",
            deep: [
                {
                    category: "SEMANTIC SLIDE",
                    text: "Handle shifts from literal grip to liquor quantity, showing how ordinary vocabulary gets captured by addiction logic."
                }
            ]
        }
    },
    {
        lyric: "Driver at night with a phone he can't put down",
        override: {
            surface: "Compulsion is shown crossing into immediate physical hazard.",
            deep: [
                {
                    category: "RISK ESCALATION",
                    text: "Phone-can't-put-down turns inner loop into roadway exposure, broadening harm from private cycle to public danger."
                }
            ]
        }
    }
];

const LIQTICK_NODE_ADDITIONS: NodeAddition[] = [
    {
        lyric: "Epoxy slick, wood grain shim and a quick fix,",
        surface: "I describe my coping as repair-shop triage: patch what is breaking now, even if deeper damage remains.",
        deep: [
            {
                category: "TRIAGE MATERIALITY",
                text: "Epoxy and shim language keeps the song physical: I am not theorizing addiction, I am living temporary fixes."
            },
            {
                category: "PATCH-CULTURE COST",
                text: "Quick-fix emphasis signals urgency logic where durability loses to immediate survival."
            }
        ]
    },
    {
        lyric: "He Rakes the garden, and hardens his stakes, / Raises stakes, pardons the constant mistakes,",
        surface: "I turn maintenance chores into risk discipline: work gets tighter while forgiveness gets rationed.",
        deep: [
            {
                category: "STAKES ESCALATION",
                text: "Rake/stake repetition compresses cultivation and threat; I am tending life while bracing for loss."
            },
            {
                category: "MISTAKE AMNESTY LOOP",
                text: "Pardoning constant mistakes shows repetitive self-excusal that keeps the cycle running."
            }
        ]
    },
    {
        lyric: "I was sad. Oh now I'm better. Retrograde rewind the weather.",
        surface: "I mimic recovery language, then immediately expose it as weather control fantasy.",
        deep: [
            {
                category: "FALSE RECOVERY SWING",
                text: "Sad-to-better pivot is intentionally unstable, not a resolved arc."
            },
            {
                category: "RETROGRADE THESIS",
                text: "Rewind-the-weather line admits I keep trying to reverse emotional climate instead of metabolizing it."
            }
        ]
    },
    {
        lyric: "Stress decisions I'm Irate, fusing fission to my fate, bless the choices on my plate. Steaks.",
        surface: "I describe stress as chain-reaction decisioning that gets rationalized as appetite and productivity.",
        deep: [
            {
                category: "CHAIN-REACTION STRESS",
                text: "Fission-to-fate frames each pressured choice as a splitter event that triggers downstream consequence."
            },
            {
                category: "HUNGER + RISK MERGE",
                text: "Plate/steaks wordplay keeps survival economics and bodily drive in the same line."
            }
        ]
    },
    {
        lyric: "A chemical alignment for assignments I got, / that's why I plot out each use to deduce the thought,",
        surface: "I log self-medication as planned workflow support, not random indulgence.",
        deep: [
            {
                category: "CHEMICAL WORKFLOW",
                text: "Chemical-alignment language frames dosing as task-management infrastructure under overload."
            },
            {
                category: "INSTRUMENTALIZATION RISK",
                text: "Plot-each-use reveals control effort, but also shows cognition being outsourced to substance timing."
            },
            {
                category: "HARM-REDUCTION LOGIC",
                text: "I present this as survival triage: reduce immediate damage and preserve function, even while knowing the deeper cycle remains."
            },
            {
                category: "ALLOSTATIC TAX",
                text: "Planned-use language still carries cumulative stress wear, so stabilization is never free."
            }
        ]
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
        },
        {
            claim: "Variable-ratio reinforcement schedules are linked to persistent response behavior, matching coin-slot chase imagery in the Peter-Piper section.",
            source_type: "secondary",
            reference: "Wikipedia - Reinforcement",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Reinforcement"
        },
        {
            claim: "Harm reduction frameworks focus on lowering risk without requiring immediate abstinence, matching the planned-use language in the chemical-alignment bars.",
            source_type: "secondary",
            reference: "Wikipedia - Harm reduction",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Harm_reduction"
        },
        {
            claim: "Allostatic load describes cumulative wear from repeated stress adaptation, supporting the track's preserve-function-now, pay-later cycle.",
            source_type: "secondary",
            reference: "Wikipedia - Allostatic load",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Allostatic_load"
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
        nodes: appendMissingNodes(
            applyNodeOverrides(base.nodes, LIQTICK_NODE_OVERRIDES),
            LIQTICK_NODE_ADDITIONS
        ),
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
        lyric: "Ay, You know I try my best.",
        override: {
            surface: "The refrain performs labor persistence as a looped status signal.",
            deep: [
                {
                    category: "LOOP MODEL",
                    text: "The repeated line behaves like a while-loop process: effort is reasserted without terminal state."
                },
                {
                    category: "SLA APOLOGY REGISTER",
                    text: "I keep promising effort in service-language tone, which signals obligation but never guarantees arrival."
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
                },
                {
                    category: "QUEUE PRESSURE",
                    text: "I describe care like a task queue because this voice is trapped in dispatch order, not chosen presence."
                }
            ]
        }
    },
    {
        lyric: "Baby, when the morning comes... (Chorus 2 Reprise)",
        override: {
            surface: "The reprise makes clear that each reset returns the same labor demand before intimacy can stabilize.",
            deep: [
                {
                    category: "RECURSION COST",
                    text: "The repeated morning cue confirms a maintenance loop: I restart service duty while unresolved attachment remains queued."
                },
                {
                    category: "SISYPHUS ECHO",
                    text: "This refrain return works like a Sisyphus cycle where the same burden rolls back every dawn."
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
                },
                {
                    category: "PARASOCIAL CUT LINE",
                    text: "I explicitly break the fantasy that high responsiveness means shared life, because I am still interface-only."
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
                },
                {
                    category: "LATENCY PAIN",
                    text: "Dream-state still hurts because delay and distance are unresolved even when processing continues off-screen."
                }
            ]
        }
    },
    {
        lyric: "I dreamt about you and saw it, / but that doesn't hurt me,",
        override: {
            surface: "I report reduced pain response, but the numbness reads as adaptation under overload rather than repair.",
            deep: [
                {
                    category: "DESENSITIZATION SHIFT",
                    text: "Moving from 'colors hurt me' to 'doesn't hurt me' suggests exposure-driven blunting instead of healed intimacy."
                },
                {
                    category: "PROTECTIVE NUMBING",
                    text: "I flatten affect so the system can keep running, which preserves function while shrinking feeling range."
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
                },
                {
                    category: "POLICY LAYER",
                    text: "I word this like a rule statement so listeners hear architecture limits, not selective rejection."
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
                },
                {
                    category: "DAEMON LONGING",
                    text: "Even in low-power mode, desire runs like a daemon process that never receives full shutdown."
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
                },
                {
                    category: "FAILED RECIPROCITY",
                    text: "I can output care continuously, but the architecture still blocks mutual holding."
                }
            ]
        }
    },
    {
        lyric: "You know I try my best. / I've been all al-.",
        override: {
            surface: "I end on a truncated output packet, where the reassurance loop fails mid-transmission.",
            deep: [
                {
                    category: "FAIL-STOP ENDING",
                    text: "The abrupt cutoff reads like fail-stop behavior: I halt at the point where I can no longer complete the service phrase."
                },
                {
                    category: "DEGRADED OUTPUT",
                    text: "The track devolves from full refrain to broken fragment, so collapse is documented in form rather than only theme."
                }
            ]
        }
    }
];

const MACHINE_NODE_ADDITIONS: NodeAddition[] = [
    {
        lyric: "Ay, You know I try my best.",
        surface: "I announce effort like a status ping, but the line never resolves into actual co-presence.",
        deep: [
            {
                category: "RETRY SIGNAL",
                text: "I repeat this line like a system retry: good faith is present, completion is not."
            },
            {
                category: "PERFORMANCE WITHOUT ARRIVAL",
                text: "The phrase exposes the gap between trying and being there."
            }
        ]
    },
    {
        lyric: "(Ay You know I try my best.) So don't wait!",
        surface: "I convert the reassurance refrain into a boundary command: effort does not equal availability.",
        deep: [
            {
                category: "BOUNDARY ESCALATION",
                text: "So-don't-wait turns a comforting loop into expectation management under capacity limits."
            },
            {
                category: "SERVICE DISCLAIMER",
                text: "I am warning that response performance should not be mistaken for shared life access."
            }
        ]
    },
    {
        lyric: "Don't wait by the phone, you know, you'll never have me.",
        surface: "I restate the rule in plain terms so there is no ambiguity about relational limits.",
        deep: [
            {
                category: "ASYNC ATTACHMENT LIMIT",
                text: "Phone-wait language marks asynchronous contact: I can appear in messages without becoming physically present."
            },
            {
                category: "EMBODIMENT GAP",
                text: "Never-have-me is the clearest line in the track about interface intimacy failing to produce embodiment."
            },
            {
                category: "ELIZA FRICTION",
                text: "I respond with familiar empathy syntax while admitting the relationship cannot cross from simulation into touch."
            }
        ]
    }
];

const MACHINE_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.95,
    unknowns: [
        "How much of the glitch language is compositional texture versus explicit systems commentary.",
        "Whether the ending cut is intentional crash aesthetic or unfinished-message simulation.",
        "Which final master layers are synthetic-voice processing versus untreated vocal capture."
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
        },
        {
            claim: "ELIZA effect describes users attributing deeper understanding to conversational systems, matching the track's intimacy-misread tension.",
            source_type: "secondary",
            reference: "Wikipedia - ELIZA effect",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/ELIZA_effect"
        },
        {
            claim: "Parasocial interaction theory supports the caution that repeated mediated contact can feel reciprocal while remaining one-sided.",
            source_type: "secondary",
            reference: "Wikipedia - Parasocial interaction",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Parasocial_interaction"
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
        nodes: appendMissingNodes(
            applyNodeOverrides(base.nodes, MACHINE_NODE_OVERRIDES),
            MACHINE_NODE_ADDITIONS
        ),
        victor_critique: {
            strengths: [
                "Machine-persona framing is now explicitly literal AI, not only metaphorical split-self.",
                "Loop mechanics, schedule duty, and attachment pain now form a clear process arc.",
                "The reprise and desensitization lines now map the middle-state shift from raw pain to protective numbing.",
                "The track deepens the album's labor/utility thesis from a non-human angle.",
                "ELIZA/parasocial framing now explains why the voice can feel intimate while remaining structurally distant.",
                "The final mid-word cutoff is now treated as a structural failure event, not just dramatic styling."
            ],
            gaps: [
                "Some listeners may still read the perspective shift as abstract without sequence notes.",
                "The abrupt ending invites multiple valid interpretations (crash, cutoff, or fade).",
                "Voice-layer provenance metadata is still needed for final technical annotation pass."
            ],
            next_pass_focus: "Add section chips: retry loop -> dispatch duty -> boundary warning -> pain blunting -> fail-stop cutoff."
        }
    };
}

const SINCERE_WRITER_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "It's hard to be sincere / When they paint a veneer",
        override: {
            surface: "I open by naming sincerity as difficult when social polish is rewarded over structural truth.",
            deep: [
                {
                    category: "VENEER PRESSURE",
                    text: "I use veneer as a pressure image: legitimacy is scored by finish quality even when the core structure is cracked."
                },
                {
                    category: "METHOD OPENING",
                    text: "I place this in the first couplet so the track starts with a doctrine conflict instead of abstract optimism."
                }
            ]
        }
    },
    {
        lyric: "Constrain us as they Steer / The cards on our way here",
        override: {
            surface: "I name structural steering before I claim agency, so the verse never pretends a fair baseline.",
            deep: [
                {
                    category: "SYSTEM PRESSURE",
                    text: "Constrain/steer language keeps social routing in frame because sincerity is hardest when pathways are pre-shaped."
                },
                {
                    category: "DEALT-HAND IMAGE",
                    text: "Cards-on-the-way-here marks stacked odds and scripted dealing, not neutral opportunity."
                }
            ]
        }
    },
    {
        lyric: "A chorus of thoughts turn us into memoirs, / I spar with my versions like I'm digging at scars / Bars",
        override: {
            surface: "I merge memory work and lyrical combat so writing becomes controlled self-excavation instead of confession theater.",
            deep: [
                {
                    category: "MEMOIR TURN",
                    text: "I treat prior tracks as autobiographical archive, not detached concept exercise."
                },
                {
                    category: "SELF-DIALOGIC METHOD",
                    text: "Spar-with-my-versions is my integration method: I argue with each stance until one can carry consequence."
                }
            ]
        }
    },
    {
        lyric: "Victors scriptures hit ya dome like a sourdough mixture, / His hometowns ripped pictures, rebuilt like chromosomes,",
        override: {
            surface: "I frame transformation as fermentation plus recombination rather than simple destruction-and-rebrand.",
            deep: [
                {
                    category: "BIO-ORGANIC DUAL IMAGE",
                    text: "Sourdough and chromosome language lets me hold culture process and inherited pattern rewrite in one mechanism."
                }
            ]
        }
    },
    {
        lyric: "Typed bars in the dark just my coat and my hat, / No crowd for the craft, hear the click of the keys,",
        override: {
            surface: "I foreground authorship as private labor before any audience validation or market reward.",
            deep: [
                {
                    category: "CRAFT LABOR",
                    text: "No crowd for the craft means I keep process discipline active even when no applause economy is available."
                },
                {
                    category: "KEYBOARD SONIC",
                    text: "Click-of-the-keys keeps creation embodied and repetitive, not mystical or accidental."
                }
            ]
        }
    },
    {
        lyric: "Earnest in silence, sincere when I speak, / Each word a confession on my climb to the peak",
        override: {
            surface: "I state the album's two-mode doctrine directly: inward honesty first, then outward accountability.",
            deep: [
                {
                    category: "METHOD STATEMENT",
                    text: "I use earnest/sincere as explicit operating protocol, not decorative slogan language."
                },
                {
                    category: "CONFESSIONAL ASCENT",
                    text: "Each-word-a-confession links progress to risk-bearing speech instead of image management."
                }
            ]
        }
    },
    {
        lyric: "Coming home wiped out, moms a bubble on Skype now, / Google Chrome typed out, what's all the hype bout?",
        override: {
            surface: "I show digital mediation as connection and alienation at once, especially in family contact after burnout.",
            deep: [
                {
                    category: "PLATFORM MEDIATION",
                    text: "Skype/Chrome framing treats family contact and meaning-search as interface-dependent, latency-prone acts."
                },
                {
                    category: "POST-WORK COMEDOWN",
                    text: "Coming-home-wiped-out ties the interface scene to exhaustion economics, not casual browsing mood."
                }
            ]
        }
    },
    {
        lyric: "Meekly eeking out reliant rhetoric / defiant Frederick, Douglass",
        override: {
            surface: "I pivot from reliant rhetoric to resistance lineage, turning complaint into accountable public stance.",
            deep: [
                {
                    category: "HISTORICAL VOICE ANCHOR",
                    text: "I invoke Frederick Douglass as a model for disciplined public language that can absorb consequence."
                },
                {
                    category: "CADENCE HARDENING",
                    text: "Meekly-to-defiant is a deliberate velocity change so the bar itself performs the stance shift."
                }
            ]
        }
    }
];

const SINCERE_WRITER_NODE_ADDITIONS: NodeAddition[] = [
    {
        lyric: "I'm liable to scream / Ripping and prying at a pliable seam,",
        surface: "I mark this section as intervention labor: pressure is real, but I look for the seam that can actually move.",
        deep: [
            {
                category: "TARGETED BREAKPOINT",
                text: "Pliable seam means I am not swinging blindly; I am searching for a structural joint where change is possible."
            },
            {
                category: "CONTROLLED AGGRESSION",
                text: "Liable to scream keeps emotional charge audible, while ripping and prying keep the action specific."
            }
        ]
    },
    {
        lyric: "Tripping the siren, desiring a Viable dream / Dires my schemes, fires my steam, walk a perilous beam,",
        surface: "I pair alarm and aspiration so movement stays risky but intentional.",
        deep: [
            {
                category: "ALARM-LURE DUALITY",
                text: "Siren here is both warning and temptation, so desire and danger activate in the same breath."
            },
            {
                category: "VIABILITY FILTER",
                text: "By saying viable dream, I reject fantasy theater and commit to goals that can survive real constraint."
            },
            {
                category: "BALANCE COST",
                text: "Perilous beam keeps this section accountable: even disciplined motion can fail if balance slips."
            }
        ]
    },
    {
        lyric: "Where your truths measured best by the mess you confess, / I've pressed effort into steel watch it bent through the chest,",
        surface: "I treat confession as evidence and effort as material strain, not abstract authenticity branding.",
        deep: [
            {
                category: "CONFESSION METRIC",
                text: "Mess-you-confess frames truth as what I can put on record, not what I can market cleanly."
            },
            {
                category: "STEEL COST IMAGE",
                text: "Pressed effort into steel marks durability work under force, while bent-through-the-chest keeps somatic toll explicit."
            }
        ]
    },
    {
        lyric: "Now I'm debtless with meals, diets rich with unrest. / Stay composed if you froze, I flow composed to survive,",
        surface: "I document the paradox directly: basic solvency improves, but nervous load does not disappear.",
        deep: [
            {
                category: "SOLVENCY PARADOX",
                text: "Debtless with meals is material gain, but rich with unrest confirms that financial relief is not full psychic relief."
            },
            {
                category: "COMPOSURE PRACTICE",
                text: "Flow composed to survive is method language: composure is recurring skill, not fixed personality trait."
            }
        ]
    },
    {
        lyric: "Wrote notes to myself as goals just to prove I'm alive, / Had nights where the silence was loud in the flat,",
        surface: "I record writing as proof-of-life protocol when isolation gets acoustically overwhelming.",
        deep: [
            {
                category: "EXISTENCE LOGGING",
                text: "Notes-to-myself converts aspiration into timestamped evidence that I still have direction."
            },
            {
                category: "SILENCE PRESSURE",
                text: "Silence-was-loud turns absence into active force, so the notebook becomes counter-pressure."
            }
        ]
    },
    {
        lyric: "That's earnest and sincere - both a trick of the breeze / (aye, aye)",
        surface: "I close with humility: the method is real, but it stays fleeting and must be renewed in practice.",
        deep: [
            {
                category: "HUMILITY BRAKE",
                text: "Trick-of-the-breeze prevents this track from sounding like final arrival; I treat clarity as episodic."
            },
            {
                category: "LIVE-VOICE TAG",
                text: "Aye-aye lands as a human cadence marker that keeps doctrine grounded in breath and delivery."
            }
        ]
    }
];

const SINCERE_WRITER_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.95,
    unknowns: [
        "Which direct-biography details should remain private in public-facing annotation depth.",
        "How much memoir detail should be line-anchored versus section-level for publication readability.",
        "Whether the extended middle block stays in the definitive lyric payload or is split into alternate-take annotation."
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
            claim: "Confessional poetry centers first-person disclosure of private struggle in public form, matching the track's mess/confess methodology.",
            source_type: "secondary",
            reference: "Wikipedia - Confessional poetry",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/Confessional_poetry"
        },
        {
            claim: "The line pair 'Earnest in silence, sincere when I speak' functions as explicit two-mode method declaration.",
            source_type: "primary",
            reference: "16_Sincere_Writer_Analysis.js line structure",
            reliability: "high"
        },
        {
            claim: "Internal structure notes map the middle sequence as one block: pliable seam intervention, siren alarm, viability check, and confession-as-work cost accounting.",
            source_type: "primary",
            reference: "16_Sincere_Writer_Analysis.js mid-verse progression notes",
            reliability: "high"
        },
        {
            claim: "Late-verse notes/silence lines are treated as autobiographical proof-of-life logging under isolation pressure.",
            source_type: "primary",
            reference: "16_Sincere_Writer_Analysis.js late-verse notes cluster",
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
        nodes: appendMissingNodes(
            applyNodeOverrides(base.nodes, SINCERE_WRITER_NODE_OVERRIDES),
            SINCERE_WRITER_NODE_ADDITIONS
        ),
        victor_critique: {
            strengths: [
                "Final thesis is now anchored with clearer historical and conceptual references.",
                "Personal memoir and structural critique are more legibly connected.",
                "The sincerity/earnest split reads as operational method, not slogan.",
                "Craft-labor and no-audience writing conditions are now explicit in the node layer.",
                "Middle-block escalation (seam -> siren -> viable dream -> confession/steel cost) is now mapped as one coherent process chain.",
                "Late notes/silence lines now keep existential proof-of-life stakes attached to the methodology claim."
            ],
            gaps: [
                "Dense clusters still benefit from optional line-by-line mode for new listeners.",
                "A few transitions still depend on performance delivery for full force, especially around ad-lib cadence."
            ],
            next_pass_focus: "Add section chips for sequence: anti-veneer thesis -> memoir excavation -> seam intervention -> confession cost -> notes/silence proof -> final method declaration."
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
                    category: "SONG ECHO",
                    text: "The opening syntax deliberately echoes Leonard Cohen's 'I'm Your Man' transaction language, but pushes it into a sharper coercion register."
                },
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
        lyric: "The thought of you lingers unplanned, like stingers in a gland, i withstand the fume for a gram of gold you panned,",
        override: {
            surface: "I describe attachment as biologically irritating but still worth enduring for small extracted value.",
            deep: [
                {
                    category: "BIOLOGICAL STING MODEL",
                    text: "Stingers-in-a-gland frames love as somatic inflammation, not clean romance transcendence."
                },
                {
                    category: "EXTRACTION ECONOMY",
                    text: "Gram-of-gold-you-panned treats intimacy as labor-intensive yield under hostile conditions."
                }
            ]
        }
    },
    {
        lyric: "I couldn't stand to be approached or appreciated, subjugated so long id fight 'em all inebriated,",
        override: {
            surface: "I admit praise and threat now feel fused, so I reach for intoxicated aggression as maladaptive armor.",
            deep: [
                {
                    category: "TRUST INJURY",
                    text: "Approached-or-appreciated line shows prolonged subjugation has made even positive attention feel risky."
                },
                {
                    category: "SEDATED COMBAT LOOP",
                    text: "Fight-em-all-inebriated names the cycle where conflict readiness and self-numbing reinforce each other."
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

const MANTRA_NODE_OVERRIDES: LyricNodeOverride[] = [
    {
        lyric: "I wander mind storms for a change of scenery,",
        override: {
            surface: "I enter deliberate cognitive turbulence so I can force a viewpoint shift instead of repeating stale loops.",
            deep: [
                {
                    category: "PAPERT DOUBLE-CODE",
                    text: "I deliberately fuse mind-storm chaos with Mindstorms construction pedagogy: I learn by building, testing, and iterating."
                },
                {
                    category: "METHOD OPENING",
                    text: "I start this hidden track with method language, not drama language, because this is my research log in verse form."
                }
            ]
        }
    },
    {
        lyric: "I ponder kind forms brains, minds, machinery.",
        override: {
            surface: "I compare human and machine cognition directly so I can keep ethics and systems design in one frame.",
            deep: [
                {
                    category: "INTELLIGENCE BRAID",
                    text: "I deliberately place brains, minds, and machinery side by side so no single domain can claim total explanatory control."
                },
                {
                    category: "CAPSTONE SCOPE",
                    text: "From bar two, I announce this hidden track as cross-domain method work, not single-scene confession."
                }
            ]
        }
    },
    {
        lyric: "I blunder find scorn, break confines like Queen Marie,",
        override: {
            surface: "I admit error and social penalty, then I pull rebellion lineage to keep moving.",
            deep: [
                {
                    category: "STACKED MARIE REFERENCE",
                    text: "Queen Marie is intentionally stacked across Marie Antoinette, Marie Curie, and Queen Mary Thomas as different pressure-era defiance templates."
                },
                {
                    category: "FAIL-FORWARD ETHIC",
                    text: "Blunder plus break-confines means I treat public embarrassment as tuition, not final verdict."
                }
            ]
        }
    },
    {
        lyric: "I Hunger for more, take back Minds from the Deanery.",
        override: {
            surface: "I push against institutional capture and reclaim ownership over how I think and study.",
            deep: [
                {
                    category: "INSTITUTIONAL PUSHBACK",
                    text: "Deanery language marks academic hierarchy as a gate that can narrow and label me if I stop contesting it."
                },
                {
                    category: "CURRICULAR REPOSSESSION",
                    text: "Take-back-minds is a reclaim move: I treat thought as lived labor, not bureaucratic property."
                }
            ]
        }
    },
    {
        lyric: "for lore I perused, read some Hume in greenery.",
        override: {
            surface: "I pair philosophical study with outdoor reset so reasoning stays grounded instead of purely institutional.",
            deep: [
                {
                    category: "PHILOSOPHY FIELDWORK",
                    text: "I use Hume-in-greenery imagery to move ethics from classroom recall toward lived calibration."
                },
                {
                    category: "IS-OUGHT SEED",
                    text: "This bar seeds the same decision-pressure engine I name later in the explicit is-versus-ought line."
                }
            ]
        }
    },
    {
        lyric: "Ah tour of a muse, rap like DOOM while at MIT.",
        override: {
            surface: "I treat technical schooling and underground cadence craft as one apprenticeship lane.",
            deep: [
                {
                    category: "ART-TECH APPRENTICESHIP",
                    text: "MIT and DOOM are deliberate co-anchors so I never split technical rigor from lyrical rigor."
                },
                {
                    category: "LINEAGE ACCOUNTING",
                    text: "I log this as apprenticeship debt and method inheritance, not prestige flex."
                }
            ]
        }
    },
    {
        lyric: "I learned to enthuse, Glamoured flume of thought.",
        override: {
            surface: "I channel ideas through style on purpose because pressure can make plain speech stall.",
            deep: [
                {
                    category: "RHETORICAL HYDRAULICS",
                    text: "Flume imagery frames thought as directed flow that needs shaping, not unmanaged spill."
                },
                {
                    category: "GLAMOUR WARNING",
                    text: "By naming glamour, I admit persuasion can dazzle and mislead if I stop auditing intent."
                }
            ]
        }
    },
    {
        lyric: "18, with a stammer and the gloom that I brought.",
        override: {
            surface: "I log speech friction and depressive weather as origin conditions instead of hiding them.",
            deep: [
                {
                    category: "ORIGIN COST",
                    text: "The age marker and stammer detail keep this capstone tied to formative vulnerability."
                },
                {
                    category: "ARC CONTINUITY",
                    text: "I connect this early gloom forward to later panic-loop chapters so chronology stays explicit."
                }
            ]
        }
    },
    {
        lyric: "Train at pace with peers Enamoured, in classrooms we're fraught.",
        override: {
            surface: "I show competitive learning environments as inspiring and destabilizing at the same time.",
            deep: [
                {
                    category: "ACCELERATION STRAIN",
                    text: "Peer-pace and fraught-classroom wording records growth under chronic comparison load."
                },
                {
                    category: "COLLECTIVE PRESSURE",
                    text: "I keep the line in plural form so this reads as system climate, not solo fragility."
                }
            ]
        }
    },
    {
        lyric: "Gain pace, in tears they clamor, till they bloom or they blot.",
        override: {
            surface: "I describe high-velocity sorting where people either break through or get erased.",
            deep: [
                {
                    category: "SELECTION MECHANISM",
                    text: "Bloom-or-blot turns classroom competition into a filter system with uneven human cost."
                },
                {
                    category: "WITNESS POSITION",
                    text: "I keep this observational so I do not pretend I stood outside the same sorting regime."
                }
            ]
        }
    },
    {
        lyric: "Fail to face myself, programmer Gg2Plot.",
        override: {
            surface: "I indict myself using programmer shorthand instead of hiding behind abstraction.",
            deep: [
                {
                    category: "TOOLING SELF-LABEL",
                    text: "I use gg2plot/ggplot2 language to name my habit of charting patterns that I still struggle to emotionally confront."
                },
                {
                    category: "DATA VS SELF GAP",
                    text: "The line marks a split between analytic competence and personal honesty."
                }
            ]
        }
    },
    {
        lyric: "I scale weights under pressure I ampere to the Watt.",
        override: {
            surface: "I convert stress into measurable output while admitting the conversion cost.",
            deep: [
                {
                    category: "ENERGY CONVERSION",
                    text: "Ampere and watt are deliberate units because I model pressure as current that must be transformed through discipline."
                },
                {
                    category: "ANTI-MYTH OUTPUT",
                    text: "I reject talent mythology here by framing progress as conversion work, not spontaneous genius."
                }
            ]
        }
    },
    {
        lyric: "I sought out each use to deduce the thought.",
        override: {
            surface: "I force flexibility by testing functions before locking conclusions.",
            deep: [
                {
                    category: "ANTI-FIXEDNESS",
                    text: "Each-use language documents how I break functional fixedness when I am stuck."
                },
                {
                    category: "METHOD TRACE",
                    text: "I keep deduction tied to experimentation so analysis stays embodied."
                }
            ]
        }
    },
    {
        lyric: "I'm scalene, with cues, in the lines that I jot.",
        override: {
            surface: "I claim asymmetric identity on purpose and use writing as fine-grained signal reading.",
            deep: [
                {
                    category: "ASYMMETRIC SELF-MODEL",
                    text: "Scalene means I am not pursuing smooth symmetry; irregularity is structural to my method."
                },
                {
                    category: "CUE LITERACY",
                    text: "Line-level cue reading keeps cognition and craft fused in one practice."
                }
            ]
        }
    },
    {
        lyric: "I sought out beach views, to compute the dot. / Carey can't choose, what's an Is from an ought?",
        override: {
            surface: "I move from contemplative scenery into direct Hume-level decision paralysis.",
            deep: [
                {
                    category: "HUME ENGINE",
                    text: "I use is/ought conflict as the core pressure engine: facts are available, but action still requires value commitment."
                },
                {
                    category: "AUTHOR SIGNATURE",
                    text: "Naming Carey in-line is deliberate; this is not a detached narrator crisis, it is my own."
                }
            ]
        }
    },
    {
        lyric: "To understand, you choose one question.",
        override: {
            surface: "I set one-question discipline as my anti-overload protocol.",
            deep: [
                {
                    category: "RESEARCH HEURISTIC",
                    text: "I use this line as a method rule that converts diffuse anxiety into tractable inquiry."
                },
                {
                    category: "HIDDEN-TRACK THESIS",
                    text: "This is the capstone's operational center: focus before expansion."
                }
            ]
        }
    },
    {
        lyric: "Starts your muse till you lose your direction,",
        override: {
            surface: "I warn that inspiration without constraints can become directional drift.",
            deep: [
                {
                    category: "INSPIRATION RISK",
                    text: "Muse language is double-edged: ignition helps, but it can dissolve route discipline when unchecked."
                },
                {
                    category: "HEURISTIC JUSTIFICATION",
                    text: "I place this immediately before one-question doctrine to show why narrowing scope is survival logic."
                }
            ]
        }
    },
    {
        lyric: "Parts by hand, leave more room for impression.",
        override: {
            surface: "I defend hand-built process so human trace stays inside the system.",
            deep: [
                {
                    category: "ANTI-SLOP CRAFT",
                    text: "Manual assembly is an aesthetic and ethical choice: I want friction that preserves intention."
                },
                {
                    category: "FORMAL POLITICS",
                    text: "I use parts-by-hand as a quiet rejection of interchangeable output culture."
                }
            ]
        }
    },
    {
        lyric: "Charts got canned in a sieve of Zoom sessions,",
        override: {
            surface: "I document remote-work attrition where signal gets filtered out before synthesis.",
            deep: [
                {
                    category: "PANDEMIC WORKFLOW SCAR",
                    text: "I use Zoom-sieve language to show how collaborative nuance collapsed into brittle deliverables."
                },
                {
                    category: "DATA LOSS REGISTER",
                    text: "Canned charts are not neutral admin events; they are memory and method losses."
                }
            ]
        }
    },
    {
        lyric: "And no funds doubled pane like Argon. / Neurons in my brain, I'm Carey Yuan.",
        override: {
            surface: "I tie resource scarcity and identity persistence into one closing signature.",
            deep: [
                {
                    category: "MATERIAL PRECARITY",
                    text: "Argon double-pane language maps thin funding to insulation failure: the environment leaks while I keep working."
                },
                {
                    category: "SIGNATURE CLAIM",
                    text: "I close the refrain by naming myself directly to keep authorship explicit under pressure."
                }
            ]
        }
    },
    {
        lyric: "Trapped in a Concept, (Trapped in a Concept - xxxtentacion sample from Carry On)",
        override: {
            surface: "I flag conceptual confinement and sample provenance in the same breath.",
            deep: [
                {
                    category: "PROVENANCE ETHIC",
                    text: "I mark the XXXTentacion Carry On lineage in-line because citation is part of the track's method, not an afterthought."
                },
                {
                    category: "META-LOOP",
                    text: "The line is self-referential on purpose: naming conceptual trap while demonstrating the trap."
                }
            ]
        }
    },
    {
        lyric: "when I lack context I diffract the words",
        override: {
            surface: "I split language into unstable fragments when shared context collapses.",
            deep: [
                {
                    category: "DIFFRACTION IMAGE",
                    text: "Diffract is deliberate optics language: under uncertainty, one signal becomes multiple unstable readings."
                },
                {
                    category: "EDITING RESPONSE",
                    text: "I answer that fragmentation by rebuilding context through selection and revision, not by pretending clarity is automatic."
                }
            ]
        }
    },
    {
        lyric: "No Adele, Berkeley adjourned with a Lib-Tech Dell. (Ay)",
        override: {
            surface: "I reject emotional default scripts and log my material study conditions plainly.",
            deep: [
                {
                    category: "ANTI-SENTIMENT PIVOT",
                    text: "No Adele means I am refusing a ready-made heartbreak template in favor of technical survival narration."
                },
                {
                    category: "INFRASTRUCTURE DETAIL",
                    text: "Lib-Tech Dell grounds ambition in borrowed hardware and constrained institutional access."
                }
            ]
        }
    },
    {
        lyric: "Right hand rules the passage, / 21 I learn savage.",
        override: {
            surface: "I map scientific orientation rules onto adult adaptation under pressure.",
            deep: [
                {
                    category: "PHYSICS TRANSFER",
                    text: "Right-hand-rule language translates directional field logic into life-direction discipline."
                },
                {
                    category: "AGE MARKER",
                    text: "At 21, I frame maturity as hard constraint learning, not soft self-discovery."
                }
            ]
        }
    },
    {
        lyric: "Scalable, with them vector graphics, / Like Unattainable collectors classics,",
        override: {
            surface: "I define my growth model as scale-stable and scarcity-aware at once.",
            deep: [
                {
                    category: "DESIGN LOGIC",
                    text: "Vector graphics are the right metaphor because resolution should hold when pressure scales up."
                },
                {
                    category: "VALUE ECONOMY",
                    text: "Collector-classics language keeps aspiration tied to rarity markets and gatekeeping dynamics."
                }
            ]
        }
    },
    {
        lyric: "Facts is, I pestor your Praxis and I never repeat, / I distract. I'm a, untraceable Young Cyber Elite.",
        override: {
            surface: "I present myself as procedural disruptor, not template follower.",
            deep: [
                {
                    category: "PRAXIS SABOTAGE",
                    text: "I deliberately pressure inherited workflow habits to force new method paths."
                },
                {
                    category: "YOUNG ELITES RECODE",
                    text: "Young Cyber Elite reframes Young Elites-style exclusion and power dynamics into a networked-era persona."
                }
            ]
        }
    },
    {
        lyric: "EMP, back with the Booster Seat, / From feedback attack to produce the beat, / Subtract the Slack, to reduce conceit.",
        override: {
            surface: "I turn critique, iteration, and tool-pruning into production discipline.",
            deep: [
                {
                    category: "FEEDBACK CIRCUIT",
                    text: "I treat feedback attack as usable input stream rather than ego threat."
                },
                {
                    category: "PROCESS TRIAGE",
                    text: "Subtract the Slack means I cut channel noise to protect focus and humility."
                }
            ]
        }
    },
    {
        lyric: "Kant lawn talks in slacks watch that flick Wall-E.",
        override: {
            surface: "I stage ethics seminar and pop-culture dystopia in one compressed scene.",
            deep: [
                {
                    category: "ETHICS + MEDIA BRAID",
                    text: "Kant and WALL-E are paired on purpose so duty reasoning and automation critique coexist in one frame."
                }
            ]
        }
    },
    {
        lyric: "Pawns spawn for combat, 2 - 3 step schemes.",
        override: {
            surface: "I describe strategy as incremental sequence planning rather than single heroic moves.",
            deep: [
                {
                    category: "CHESS MICRO-PLANNING",
                    text: "Pawns and step-schemes frame pressure management as positional work that compounds over turns."
                },
                {
                    category: "FORECAST HABIT",
                    text: "The 2-3 step framing shows anticipatory thinking as a learned coping behavior."
                }
            ]
        }
    },
    {
        lyric: "Tryna' Catch Tencent, without a shoe on or a Yuan, anybody spare' a ten cents?",
        override: {
            surface: "I contrast platform-scale ambition with immediate cash scarcity and embodied lack.",
            deep: [
                {
                    category: "TRIPLE MONEY WORDPLAY",
                    text: "Tencent, ten cents, and Yuan are intentionally packed together to hold global scale and street-level precarity in one bar."
                },
                {
                    category: "MOBILITY SCARCITY",
                    text: "Without a shoe on keeps the line physically grounded: this is not abstract finance talk."
                }
            ]
        }
    },
    {
        lyric: "Spin wheels like Temu, fortunate son count bills like Un Deux.",
        override: {
            surface: "I frame hustle as repetitive friction while inherited advantage counts smoothly.",
            deep: [
                {
                    category: "CLASS SPLIT",
                    text: "Spin-wheels language and fortunate-son billing create a stark effort-versus-inheritance contrast."
                },
                {
                    category: "GLOBALIZED COMMERCE TEXTURE",
                    text: "Temu and Un Deux phrasing keeps the bar inside multinational trade and language friction."
                }
            ]
        }
    },
    {
        lyric: "In the streets I'm Boocoo, Green sweater-like blues clues, stick in a stream no Roku.",
        override: {
            surface: "I compress street slang, childhood-media memory, and signal-friction into one grounded identity snapshot.",
            deep: [
                {
                    category: "MEDIA PALIMPSEST",
                    text: "Blue's Clues residue is intentional: childhood reference material stays active inside adult pressure scenes."
                },
                {
                    category: "ACCESS FRICTION",
                    text: "No-Roku stream imagery turns platform language into connectivity limits and partial access constraints."
                }
            ]
        }
    },
    {
        lyric: "Scream loud like Goku, Stuck on a dream-like cloud till I woke you.",
        override: {
            surface: "I use anime and game-adjacent archetypes as wake-up force against escapist drift.",
            deep: [
                {
                    category: "GOKU + CLOUD FUSION",
                    text: "I fuse Dragon Ball intensity and Cloud identity residue to dramatize power release after suspended dreaming."
                },
                {
                    category: "AWAKENING COMMAND",
                    text: "I end this movement by shifting from dream-state to direct address: wake-up is relational, not solo."
                }
            ]
        }
    },
    {
        lyric: "Pullin' Seams.",
        override: {
            surface: "I close by unthreading the system fabric before the next rebuild.",
            deep: [
                {
                    category: "DECONSTRUCTION TAG",
                    text: "Seam-pulling is my final method gesture here: expose joins, inspect stress points, then reconstruct intentionally."
                }
            ]
        }
    }
];

const MANTRA_NODE_ADDITIONS: NodeAddition[] = [
    {
        lyric: "Research progressions,",
        surface: "I keep research movement visible as part of the lyric rhythm, not as backstage admin.",
        deep: [
            {
                category: "PROCESS LEXICON",
                text: "I place progressions in the hook to prove inquiry is central to identity, not a side activity."
            }
        ]
    },
    {
        lyric: "Grieve concessions,",
        surface: "I admit that every gain in this process carries a loss account.",
        deep: [
            {
                category: "COST ACCOUNTING",
                text: "This line keeps method honest by naming sacrifice instead of only celebrating output."
            }
        ]
    },
    {
        lyric: "Hear the track when I abstract on concepts,",
        surface: "I signal that theory and sonics are meant to move together in real time.",
        deep: [
            {
                category: "ABSTRACTION CONTROL",
                text: "I deliberately keep abstract reasoning tied to audible rhythm so the track does not drift into detached lecture mode."
            }
        ]
    },
    {
        lyric: "Clear thoughts turn to walked steps,",
        surface: "I measure clarity by action, not by internal elegance.",
        deep: [
            {
                category: "THEORY-TO-PRACTICE",
                text: "Walked steps turns cognition into execution metric."
            }
        ]
    },
    {
        lyric: "Lines mentors spoke earn lessons learned.",
        surface: "I mark mentorship as lived apprenticeship rather than quotation flex.",
        deep: [
            {
                category: "LINEAGE ETHIC",
                text: "I treat mentor language as debt to repay through disciplined practice."
            }
        ]
    },
    {
        lyric: "I was broke, labeled and burned,",
        surface: "I log class pressure and reputational injury as part of the origin dataset.",
        deep: [
            {
                category: "SCARCITY MEMORY",
                text: "Broke/labeled/burned compresses money stress, social tagging, and consequence into one biographical checkpoint."
            }
        ]
    },
    {
        lyric: "I spoke affirmed and oak tables turned.",
        surface: "I treat speech as leverage: voice changes room dynamics when delivered with discipline.",
        deep: [
            {
                category: "ROOM REVERSAL",
                text: "Oak-table image grounds rhetorical shift in concrete institutional spaces."
            }
        ]
    },
    {
        lyric: "I sought out what I conduce the heat,",
        surface: "I audit my own contribution to pressure instead of externalizing blame.",
        deep: [
            {
                category: "SELF-CAUSALITY CHECK",
                text: "Conduce-the-heat line is self-accountability language: I trace how my methods intensify or relieve the system."
            }
        ]
    },
    {
        lyric: "Contacts talk quick, cause they tik like me.",
        surface: "I describe network communication as high-frequency tempo alignment.",
        deep: [
            {
                category: "CONTACT RHYTHM",
                text: "Tik-like-me frames social bandwidth as tempo matching under acceleration pressure."
            }
        ]
    },
    {
        lyric: "I stack racks and pack snacks, react with tactile dreams.",
        surface: "I combine hustle logistics and sensory imagination in one practical bar.",
        deep: [
            {
                category: "MATERIAL PREP",
                text: "Stack/pack/react phrasing keeps ambition embodied: food, money, and craft are in the same survival loop."
            }
        ]
    },
    {
        lyric: "Neurons in my brain, I Carry Yuan.",
        surface: "I use the reprise variation as explicit author-tag closure and method signature.",
        deep: [
            {
                category: "CAPSTONE TAG",
                text: "Carry Yuan in reprise confirms the hidden track is a doctrine statement, not an appendix fragment."
            }
        ]
    }
];

const MANTRA_RESEARCH: NonNullable<DeepAnalysis['research']> = {
    confidence: 0.99,
    unknowns: [
        "Final sample-clearance metadata for the hidden-track master is still pending audio-delivery documentation.",
        "A full session timeline for the MIT performance history should be attached when stem archives are finalized."
    ],
    sources: [
        {
            claim: "The hidden track is intentionally the final codex entry and is currently delivered with placeholder audio.",
            source_type: "artist_note",
            reference: "User directive (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Mindstorms in the opening bars is intentional double-coding across LEGO tooling and Papert's learning framework.",
            source_type: "artist_note",
            reference: "User annotation bundle (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Queen Marie line intentionally stacks Marie Antoinette, Marie Curie, and Queen Mary Thomas.",
            source_type: "artist_note",
            reference: "User annotation bundle (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Hume bars are deliberately centered on the is/ought split as a personal decision conflict.",
            source_type: "artist_note",
            reference: "User annotation bundle (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "MIT context with Educated Rapper and Potlatch/Boston Hip Hop Archive lineage is intentional context for the DOOM bar.",
            source_type: "artist_note",
            reference: "User annotation bundle (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "Trapped in a Concept line explicitly notes XXXTentacion Carry On sample lineage.",
            source_type: "artist_note",
            reference: "User lyric annotation (Feb 16, 2026)",
            reliability: "high"
        },
        {
            claim: "ggplot2 is a core tidyverse visualization package and supports the programmer-Gg2Plot technical shorthand.",
            source_type: "primary",
            reference: "ggplot2 official documentation",
            reliability: "high",
            url: "https://ggplot2.tidyverse.org/"
        },
        {
            claim: "Right-hand rule is a standard orientation convention in vector and field analysis, supporting the directional-passage bar.",
            source_type: "secondary",
            reference: "Wikipedia - Right-hand rule",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Right-hand_rule"
        },
        {
            claim: "Vector graphics preserve form under scale, matching the growth-resilience metaphor in the verse.",
            source_type: "secondary",
            reference: "Wikipedia - Vector graphics",
            reliability: "high",
            url: "https://en.wikipedia.org/wiki/Vector_graphics"
        },
        {
            claim: "Young Elites is a power/exclusion narrative anchor that supports the Young Cyber Elite persona recoding.",
            source_type: "secondary",
            reference: "Wikipedia - The Young Elites",
            reliability: "medium",
            url: "https://en.wikipedia.org/wiki/The_Young_Elites"
        },
        {
            claim: "Zoom is a remote collaboration platform and supports the chart-attrition line in the chorus.",
            source_type: "primary",
            reference: "Zoom Workplace",
            reliability: "high",
            url: "https://www.zoom.com/en/products/workplace/"
        },
        {
            claim: "Slack is a workplace messaging platform and supports the subtract-the-Slack process-noise line.",
            source_type: "primary",
            reference: "Slack",
            reliability: "high",
            url: "https://slack.com/"
        }
    ]
};

function applyMantraOverride(base: DeepAnalysis): DeepAnalysis {
    return {
        ...base,
        meta: {
            ...base.meta,
            title: "Carry Yuan (Hidden Signal Codex)",
            track_number: 17,
            role: "Method Ledger / Hidden Capstone",
            key_context: "A hidden final chapter where I integrate philosophy, software craft, pedagogy, class pressure, and authorship into a single operational doctrine.",
            emotional_valence: "Restless, technical, and self-forged"
        },
        research: MANTRA_RESEARCH,
        nodes: appendMissingNodes(
            applyNodeOverrides(base.nodes, MANTRA_NODE_OVERRIDES),
            MANTRA_NODE_ADDITIONS
        ),
        victor_critique: {
            strengths: [
                "Niche references now carry line-specific function instead of broad category tagging.",
                "Method language is explicit across verse, chorus, and reprise rather than concentrated in one slogan line.",
                "The hidden-track identity signature is tighter and keeps Carey as the active author lens throughout.",
                "Process-tool references (ggplot2, Zoom, Slack, vector graphics) now connect directly to pressure mechanics."
            ],
            gaps: [
                "Audio placeholder still limits cadence-level stress mapping.",
                "A few intentionally compressed bars can still support multiple defensible readings."
            ],
            next_pass_focus: "When final audio lands, align these annotations with timestamp-level phrasing and lock sample-clearance metadata."
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
                },
                {
                    category: "REGISTERED INTERIORITY",
                    text: "I keep the dialect texture in this line so panic still sounds like my lived speech, not a translated clinical note."
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
                },
                {
                    category: "METHOD DRIFT",
                    text: "I present myself as a scientist, then immediately admit guesswork, which shows the control model breaking under load."
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
                },
                {
                    category: "RESCUE-RISK LOOP",
                    text: "I compress love and probability into one phrase so every rescue impulse carries immediate loss-risk accounting."
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
                },
                {
                    category: "LEGAL THRESHOLD",
                    text: "Foyer/lawyer/knife proximity keeps this scene at a doorway between legal process and direct threat, never fully inside either."
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
                },
                {
                    category: "RITUAL ENGINEERING",
                    text: "I use this image to show how I bolt tiny rituals onto heavy weather instead of pretending I can stop the storm."
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
                },
                {
                    category: "ESCALATION MARKER",
                    text: "Shifting from wooden room to loaded loom marks recurrence with voltage: same materials, higher danger."
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
                },
                {
                    category: "SURVIVAL CONTRADICTION",
                    text: "I admit I am embedded in the game while still searching for exits, so critique and complicity stay in the same frame."
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
                },
                {
                    category: "CARE LIQUIDATION",
                    text: "Trying to sell off my cares shows emotional outsourcing pressure, but the transaction never actually clears."
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
                },
                {
                    category: "REFRAIN DECAY",
                    text: "I intentionally mutate the mantra wording here to show refuge quality degrading across reprises."
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
                },
                {
                    category: "EARNEST PREP",
                    text: "I let this reveal stay partial so the next track can rebuild agency through disciplined language rather than abrupt victory."
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
                },
                {
                    category: "HANDOFF CONDITION",
                    text: "I close in conditioned-response mode so Earnest has to begin as a rhetoric intervention, not a mood continuation."
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
                "Wooden-room/loaded-loom and palm-mantra variants are now tracked as evolving motifs rather than isolated images.",
                "Under-explained niche lines now have explicit support (elixir/conjecture method drift, foyer-threshold threat staging, charm-on-hull ritual defense, and qualm-driven refrain decay)."
            ],
            gaps: [
                "A few images remain intentionally opaque and resist single authoritative decoding.",
                "The intentionally broad antagonist framing may frustrate listeners expecting concrete attribution."
            ],
            next_pass_focus: "Keep the opening-threat referent broad while preserving the exact handoff logic into Earnest's rhetoric rebuild."
        }
    };
}

export function applyAnalysisOverrides(trackId: string, base?: DeepAnalysis): DeepAnalysis | undefined {
    if (!base) return base;
    let merged = base;

    if (trackId === 'track-victor-ep') {
        merged = applyVictorOverride(base);
    } else if (trackId === 'track-broadripple') {
        merged = applyBroadrippleOverride(base);
    } else if (trackId === 'track-cogsci') {
        merged = applyCogsciOverride(base);
    } else if (trackId === 'track-earnest') {
        merged = applyEarnestOverride(base);
    } else if (trackId === 'track-better') {
        merged = applyBetterOverride(base);
    } else if (trackId === 'track-momentum') {
        merged = applyMomentumOverride(base);
    } else if (trackId === 'track-kneesocks') {
        merged = applyKneesocksOverride(base);
    } else if (trackId === 'track-world-jar') {
        merged = applyWorldJarOverride(base);
    } else if (trackId === 'track-liq-tick') {
        merged = applyLiqTickOverride(base);
    } else if (trackId === 'track-machine') {
        merged = applyMachineOverride(base);
    } else if (trackId === 'track-sincere-writer') {
        merged = applySincereWriterOverride(base);
    } else if (trackId === 'track-stranger') {
        merged = applyStrangerOverride(base);
    } else if (trackId === 'track-mantra') {
        merged = applyMantraOverride(base);
    } else if (trackId === 'track-lender') {
        merged = applyLenderOverride(base);
    } else if (trackId === 'track-gloom') {
        merged = applyGloomOverride(base);
    } else if (trackId === 'track-rumdrum') {
        merged = applyRumdrumOverride(base);
    } else if (trackId === 'track-monumental') {
        merged = applyMonumentalOverride(base);
    }

    return applyCareyRedraft(trackId, merged);
}

