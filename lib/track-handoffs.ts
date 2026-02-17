export interface HandoffThread {
    from_signal: string;
    to_signal: string;
    interpretation: string;
}

export interface TrackHandoff {
    track_id: string;
    track_title: string;
    next_track_id: string;
    next_track_title: string;
    bridge_summary: string;
    lyric_threads: HandoffThread[];
    narrative_threads: string[];
    sonic_threads: string[];
    reference_threads: string[];
    long_range_links: string[];
}

const TRACK_HANDOFFS: Record<string, TrackHandoff> = {
    'track-victor-ep': {
        track_id: 'track-victor-ep',
        track_title: 'VICTOR',
        next_track_id: 'track-broadripple',
        next_track_title: 'Broadripple',
        bridge_summary: "VICTOR builds my shell through archive dissection, forge-breath, and tactical recurrence; Broadripple inherits that method but converts it into influence debt, insomnia citation loops, and apprenticeship panic.",
        lyric_threads: [
            {
                from_signal: 'Dissector/binder and designer-corrector-definer role-stack bars.',
                to_signal: "Can't drop these scribbles plus partitioned-particulars craft compulsion lines.",
                interpretation: 'The opener method language becomes a compulsive production engine in track two.'
            },
            {
                from_signal: 'Stage/manuscript/antique-chant plus old-France cloak performance framing.',
                to_signal: 'Margot/Edwards/Freud/Skeleton title-stack citations.',
                interpretation: 'Ritualized posture in VICTOR widens into explicit lineage accounting in Broadripple.'
            },
            {
                from_signal: 'Spiral-in-scatter cognition and thesis-on-creases self-audit bars.',
                to_signal: 'Sybil foresight, filter/osmosis processing, and Moloch system-noise panic.',
                interpretation: 'Pattern-hunting and identity study shift from private method to unstable influence economy.'
            },
            {
                from_signal: 'Mask-low cash-flow plus shoulder-stop doja regulation lines.',
                to_signal: 'Get rich off your Ed / leach off your orchard extraction-tax bars.',
                interpretation: 'Economic survival cues remain continuous, but Broadripple makes the borrowing cost explicit.'
            },
            {
                from_signal: 'Clock-crooked, soot-sky surveillance, and lab-repeat sequence replay.',
                to_signal: 'Hook/craft section repeats in full with no catharsis.',
                interpretation: 'Formal recurrence is already present in VICTOR and becomes overt structure in Broadripple.'
            }
        ],
        narrative_threads: [
            'Persona construction mutates into citation-accountability stress.',
            'Private tactical rehearsal becomes public influence comparison.',
            'Control doctrine is preserved, but now measured against originality anxiety.',
            'Economic coping details carry forward as apprenticeship-tax evidence.'
        ],
        sonic_threads: [
            'Engineered opener cadence hands into more breathless citation sprint.',
            'Both tracks keep dense bars, but Broadripple pushes less spacing and more spill.',
            'VICTOR\'s controlled recurrence becomes Broadripple\'s full-section replay.',
            'Metal-and-tool textures in VICTOR hand into alchemy-and-friction textures in Broadripple.'
        ],
        reference_threads: [
            'VICTOR\'s Reiner/Theseus/Severance/Succession stack trains the reader for Broadripple\'s heavier catalog naming density.',
            'Dilla/SP craft benchmark in VICTOR foreshadows Broadripple\'s Ed/Git Paid/Skeleton apprenticeship math.',
            'Pattern-cognition lines (spiral/scatter) hand into Broadripple\'s explicit filter/osmosis processing rhetoric.',
            'The Victor-lens shell stays in voice continuity: Broadripple is pressure escalation, not narrator replacement.'
        ],
        long_range_links: [
            'Pair callback: VICTOR -> GLOOM (shell construction later reappears as panic-cost evidence).',
            'Chain setup: VICTOR -> Broadripple -> Cog-sci tracks external citation debt collapsing into internal loop diagnosis.'
        ]
    },
    'track-broadripple': {
        track_id: 'track-broadripple',
        track_title: 'Broadripple',
        next_track_id: 'track-cogsci',
        next_track_title: 'Cog-sci',
        bridge_summary: "Broadripple's citation debt and lock-picking compulsion (Margot/Edwards/Luddy pressure) is internalized in Cog-sci as a direct thought-loop diagnosis and retraining attempt.",
        lyric_threads: [
            {
                from_signal: 'Borrowed-title/idol-coded language and derivative-risk confession.',
                to_signal: 'My way of thinking leaves me stuck here...',
                interpretation: 'External influence panic is converted into explicit cognitive architecture.'
            },
            {
                from_signal: "Can't drop these scribbles plus tick-and-talk / Skeleton-key insomnia bars.",
                to_signal: "I'll start relearning things that I thought I knew.",
                interpretation: 'Compulsive output and forced-entry behavior are reframed as retraining work instead of pure panic output.'
            },
            {
                from_signal: 'Filter/osmosis and hocus-pocus chemistry bars.',
                to_signal: 'Sample-hinge reset and chant-based self-programming.',
                interpretation: 'Broadripple process metaphors become Cog-sci method language.'
            },
            {
                from_signal: 'Get rich off your Ed / leach off your orchard extraction-cost sequence.',
                to_signal: 'Stuck-with-you refrain redirected toward discipline target.',
                interpretation: 'Borrowing-tax economics fold into dependence-on-loop economics.'
            },
            {
                from_signal: 'Hook-and-craft sections repeat in full.',
                to_signal: "Don't you know? ... Cog-sci, Cog-sci chant closure.",
                interpretation: 'Structural recursion remains central, but Cog-sci uses the loop to interrupt itself.'
            }
        ],
        narrative_threads: [
            'Imitation anxiety becomes method diagnosis.',
            'Citation debt confession becomes explicit cognition repattern attempt.',
            'Campus and status pressure is absorbed into self-directed discipline language.',
            'The same first-person witness remains active while scale shifts from scene chaos to mind architecture.'
        ],
        sonic_threads: [
            'Dense multi-reference rush contracts into concise mantra-hinge form.',
            'Broadripple overflow cadence yields to tighter repeated phrases with more negative space.',
            'Looping remains but changes function: from overload proof to intervention tool.'
        ],
        reference_threads: [
            "Broadripple's rock-catalog intertext field sets up Knee Socks later, but Cog-sci acts as the immediate internal mirror.",
            "Sybil/Moloch instability language is answered by rumination/perseveration terminology in Cog-sci's source frame.",
            "Skeleton-key forced-access energy is converted into cognitive restructuring language rather than abandoned.",
            "Huxlee/Lou Roy sample logic in Cog-sci counters Broadripple's citation velocity by narrowing reference scope on purpose."
        ],
        long_range_links: [
            'Pair callback: Broadripple -> Knee Socks (shared rock lineage, different thermal state and surveillance weather).',
            'Recovery chain anchor: Broadripple -> Cog-sci -> Rum Drum maps how influence panic becomes lived routine pressure.'
        ]
    },
    'track-cogsci': {
        track_id: 'track-cogsci',
        track_title: 'Cog-sci',
        next_track_id: 'track-rumdrum',
        next_track_title: 'The Rum Drum',
        bridge_summary: "In Cog-sci I name the loop, mark a relearning attempt, and exit on chant; Rum Drum shows what that same loop feels like once it hits body-rhythm, work funnels, and nightly coping.",
        lyric_threads: [
            {
                from_signal: 'Changing thought patterns plus relearning/chant stabilization.',
                to_signal: 'Rum-as-rhythm, applications, and repetitive coping behavior.',
                interpretation: 'Theory turns into embodied repetition.'
            },
            {
                from_signal: "My way of thinking leaves me stuck here with you...",
                to_signal: "Nightly conundrum and no-no-no / no-mo-no-no-no refrain loops.",
                interpretation: 'Unresolved cognitive stickiness becomes lived nightly recurrence.'
            },
            {
                from_signal: "I'll start relearning things that I thought I knew.",
                to_signal: 'Checksum failure, cover-letter disappearance, and no-response queue bars.',
                interpretation: 'Repatterning intent is immediately stress-tested by external systems that retrigger unfinished-task pressure.'
            },
            {
                from_signal: "Spending all my time just thinking... sample hinge from '22'.",
                to_signal: 'Ra puh puh pum hook and routine-pulse emphasis in Rum Drum.',
                interpretation: 'I keep loop logic musical across the handoff so form and thesis stay aligned.'
            },
            {
                from_signal: "Don't you know? ... Cog-sci, Cog-sci chant closure.",
                to_signal: 'Ra puh puh pum hooking, Master of scrum labor bars, and CVS/CSV routine loops.',
                interpretation: 'Self-coaching repetition mutates into maintenance repetition.'
            }
        ],
        narrative_threads: [
            'From diagnosis to symptom log.',
            'From unfinished-thought pressure to unfinished-task administration.',
            'From cognitive claim to maintenance grind.',
            'From self-directed study language to externalized gig-and-admin burden.',
            'The same first-person witness stays active while stress migrates from mind architecture into daily logistics.'
        ],
        sonic_threads: [
            'Short loop-hinge into heavier repetitive drum compulsion.',
            'Clean chant recursion in Cog-sci becomes percussive fatigue recursion in Rum Drum.',
            'Sample-framed obsession phrasing hands into checklist/refrain percussion with less melodic relief.'
        ],
        reference_threads: [
            "Huxlee/Lou Roy sample context in Cog-sci precedes Rum Drum's repeated ritual hooks.",
            'Rumination/perseveration framing in Cog-sci lands as labor-and-coping documentation in Rum Drum.',
            'Zeigarnik unfinished-task pressure in Cog-sci helps explain Rum Drum as persistent carryover rather than isolated episodes.',
            'Implementation-intention retraining language in Cog-sci meets ATS/checksum friction in Rum Drum, showing why intention alone cannot dissolve queue pressure.',
            'Sample framework in Cog-sci foreshadows process/loop language that becomes explicit in Rum Drum and Liq Tick.'
        ],
        long_range_links: [
            'Pair callback: Cog-sci -> The Machine (thought loops later re-emerge as literal system voice).',
            'Chain reinforcement: Cog-sci -> Rum Drum -> Liq Tick traces how cognitive loops become maintenance chemistry and then automation mirror.'
        ]
    },
    'track-rumdrum': {
        track_id: 'track-rumdrum',
        track_title: 'The Rum Drum',
        next_track_id: 'track-monumental',
        next_track_title: 'Monumental',
        bridge_summary: "Rum Drum's checksum insomnia, rejection archive, and fallback hustles widen into Monumental's city-scale extraction map and surveillance-pressure doctrine.",
        lyric_threads: [
            {
                from_signal: "Nightly conundrum plus 'ra puh puh pum' looped body-percussion.",
                to_signal: "Monumental mental chant and mushroom-spread hook.",
                interpretation: 'The pressure pulse moves from personal insomnia to environmental contagion model.'
            },
            {
                from_signal: "Checksum failure, cover-letter disappearance, and dash-cam cancellation archive lines.",
                to_signal: "Gyroscope/Foucault control bars, dreadlocks-in-scope targeting, and bureau escalation.",
                interpretation: 'Administrative frustration is reframed as governance and visibility architecture.'
            },
            {
                from_signal: "Adjunct wages, busking fallback, and pawn-the-mic liquidity triage.",
                to_signal: "Burro labor, debtor transfer, and Uncle Sam extraction lines.",
                interpretation: 'Precarity stops reading as individual misfortune and resolves as extraction design.'
            },
            {
                from_signal: "CVS receipt/mixers and lime-bitters ritual regulation.",
                to_signal: "Pitcher/lime-bitters breakage plus plug-socket dependency bars.",
                interpretation: 'Coping detail remains continuous, but Monumental recodes it as infrastructure-level dependency.'
            }
        ],
        narrative_threads: [
            'The frame expands from private routine to public systems analysis.',
            'Queue-level disappointment becomes policy-level threat mapping.',
            'Self-blame is displaced by structural accountability without denying personal cost.'
        ],
        sonic_threads: [
            'Insomnia drum recursion hardens into chant-led civic pressure cadence.',
            'The weary ledger flow turns into louder alarm rhetoric without losing repetition mechanics.'
        ],
        reference_threads: [
            "Rum Drum's Macbeth and admin-format references expand into Monumental's Foucault/Papin/Witcher/Uncle Sam system stack.",
            'Checksum and data-row imagery in Rum Drum prefigure Monumental\'s explicit extraction accounting.',
            'Lime-bitters continuity keeps the bridge grounded in lived habit details instead of abstract policy language.'
        ],
        long_range_links: [
            'Pair callback: Rum Drum -> Liq Tick (later track formalizes the addiction-maintenance doctrine).',
            'Bridge reinforcement: Rum Drum -> Monumental sets the macro lens that Lender then internalizes.'
        ]
    },
    'track-monumental': {
        track_id: 'track-monumental',
        track_title: 'Monumental',
        next_track_id: 'track-lender',
        next_track_title: 'Lender',
        bridge_summary: "Monumental's macro extraction and no-rescue pressure collapse into Lender's one-to-one ask economy, where system logic reappears as relationship labor debt.",
        lyric_threads: [
            {
                from_signal: "No Witcher, child-taken risk, and Uncle Sam care-vacuum lines.",
                to_signal: "Ear -> pen -> spark -> hand request ladder to one addressee.",
                interpretation: 'Public rescue failure narrows into private bailout dependency.'
            },
            {
                from_signal: "Plug/socket dependency, euro-drain brain strain, and bureau-for-better escalation.",
                to_signal: "Road-with-no-jump + lend-me-a-spark + AirPods-drop regulation scenes.",
                interpretation: 'Infrastructure-level stress becomes intimate restart requests and micro-regulation rituals.'
            },
            {
                from_signal: "Burro debt delivery and paper-to-debtors endpoint.",
                to_signal: "Kitchen labor fusion, body-wear cues, and unresolved loop return.",
                interpretation: 'Extraction remains the core engine, but now the body carrying it is explicitly mine.'
            },
            {
                from_signal: "Broken-nose/cello split and monumental mental self-priming chant.",
                to_signal: "Carey/carry-on signature and helper-role fatigue admissions.",
                interpretation: 'Grand stance gets translated into vulnerable first-person maintenance.'
            }
        ],
        narrative_threads: [
            'System diagnosis is converted into relationship chronology.',
            'Macro debt grammar becomes daily emotional and logistical debt.',
            'Public threat texture is preserved, then embodied in care labor scenes.'
        ],
        sonic_threads: [
            'Chant-driven pressure gives way to worn conversational cadence with unresolved asks.',
            'Public alarm sonics contract into close-mic relational strain.'
        ],
        reference_threads: [
            'Monumental\'s state/platform lexicon primes Lender\'s idiom-and-film realism as the same debt logic at human scale.',
            'No-rescue and extraction motifs hand directly into Lender\'s burnout and helper-depletion structure.',
            'Plug/bureau infrastructure bars in Monumental foreshadow Lender\'s spark/BPM/self-medication regulation chain.'
        ],
        long_range_links: [
            'Bridge role: Monumental acts as hinge between civic indictment and relationship chronology.',
            'Chronology reinforcement: Monumental pressure doctrine is later re-contained in World in a Jar.'
        ]
    },
    'track-lender': {
        track_id: 'track-lender',
        track_title: 'Lender',
        next_track_id: 'track-gloom',
        next_track_title: 'GLOOM',
        bridge_summary: "Lender's ask-ladder, body wear, and looped over-giving collapse into GLOOM's mythic panic machinery, where the same depletion is retold as conditioned threat-state.",
        lyric_threads: [
            {
                from_signal: 'Escalating asks across bus/coffee/road/kitchen scenes with no structural resolution.',
                to_signal: 'Run-baby-run alarm loop and conditioned-response imagery.',
                interpretation: 'Relational extraction becomes autonomic threat behavior.'
            },
            {
                from_signal: 'Get Out breakout bar and dorm-era coping admissions.',
                to_signal: 'Frankenstein/Victor maker-guilt and lab-elixir guesswork.',
                interpretation: 'Social entrapment language is recoded as self-experiment fallout.'
            },
            {
                from_signal: 'Kitchen-BPM regulation (knead/whisk/beat) and body-wear lines.',
                to_signal: 'Breath management, Pavlov loops, and reprise conditioning.',
                interpretation: 'Practical self-regulation in Lender becomes explicit conditioning theory in GLOOM.'
            },
            {
                from_signal: "Road-with-no-jump and lend-me-a-spark restart pleas.",
                to_signal: "Palm-mantra refuge attempts and way-through-the-fog flashes.",
                interpretation: 'Both tracks stage micro-rescue attempts that keep failing to produce durable safety.'
            },
            {
                from_signal: "Opening and closing loop return in Lender's structure.",
                to_signal: "Run-baby-run refrain return and Pavlov reprise close.",
                interpretation: 'Formal looping continuity makes the handoff structural, not only thematic.'
            }
        ],
        narrative_threads: [
            'Care labor burnout becomes collapse-state narration.',
            'Interpersonal debt language transitions into symbolic panic language.',
            'One relationship timeline is preserved while genre and imagery scale shifts.',
            'Request economy turns into threat economy without releasing first-person accountability.'
        ],
        sonic_threads: [
            'From worn transactional cadence to claustrophobic alarm-and-reprise form.',
            'Domestic rhythm regulation in Lender hardens into breath-and-siren panic rhythm in GLOOM.'
        ],
        reference_threads: [
            "Lender's idiom/film realism gives way to GLOOM's myth-scripture-literary stack.",
            "Get Out extraction logic primes GLOOM's creator/creature accountability language.",
            "Lender's endurance chemistry cues are escalated by GLOOM's drug/paint value-inversion bars."
        ],
        long_range_links: [
            'Pair callback: Lender -> World in a Jar (same relationship later appears as containment and control).',
            'Bridge reinforcement: Lender -> GLOOM explains why the album needs Earnest as rhetorical recovery.'
        ]
    },
    'track-gloom': {
        track_id: 'track-gloom',
        track_title: 'GLOOM',
        next_track_id: 'track-earnest',
        next_track_title: 'Earnest Reader',
        bridge_summary: "In GLOOM I stay inside panic loops and moral inversion weather; Earnest Reader keeps the same stakes but converts that pressure into accountable argument and boundary language.",
        lyric_threads: [
            {
                from_signal: 'Run-loop alarm, moral inversion, and fate-gambling imagery.',
                to_signal: 'Furnace thesis plus history-will-not-absolve warning language.',
                interpretation: 'I translate threat saturation into explicit rhetorical stance-building.'
            },
            {
                from_signal: 'Pavlov conditioning close with brief fog-clearing flashes.',
                to_signal: 'Mystery-solving labor and defiant voice turn in late Earnest bars.',
                interpretation: 'I convert behavioral-loop awareness into language-level agency practice.'
            },
            {
                from_signal: 'Wooden-room to loaded-loom enclosure sequence plus right-lab/conjecture drift.',
                to_signal: 'Opening burn/learn furnace framing and structured confrontation bars.',
                interpretation: 'I externalize interior suffocation as argument heat instead of silent containment.'
            },
            {
                from_signal: 'Orpheus/Eurydice plus Psalm-layered rescue-risk imagery.',
                to_signal: 'History-facing accountability language and Douglass invocation.',
                interpretation: 'I hand mythic rescue vocabulary into historical voice as a sturdier authority frame.'
            },
            {
                from_signal: 'Tom-Sawyer-guise legal-threshold imagery (foyer/lawyer/knife-within-breadth).',
                to_signal: 'Crodie/clemency withdrawal plus dotted-line contract bars.',
                interpretation: 'I keep legal-threat pressure continuous while shifting from scene staging to named obligation language.'
            },
            {
                from_signal: 'Drug-hands/paint inversion and long-way-from-Picasso survival concession.',
                to_signal: 'Mashed-motives melody audit and sorrow/sparrow compression close.',
                interpretation: 'I preserve the value-inversion wound but route it through reflective craft structure.'
            },
            {
                from_signal: 'Palm-mantra refuge, qualm return, and way-through-fog flashes.',
                to_signal: 'Organized comeback rhetoric with a deliberate cooldown handoff into The Better.',
                interpretation: 'Temporary self-soothing becomes sustained discursive control before the short reset node.'
            }
        ],
        narrative_threads: [
            'After collapse, analysis and rhetoric begin.',
            'Fear-field description is retained, then converted into tactical speech posture.',
            'I do not discard panic content; I repurpose it as argumentative method.',
            'The same first-person witness remains active while register shifts from mythic to historical.',
            'Earnest is not a narrator swap; it is a control-stage escalation from the same voice.'
        ],
        sonic_threads: [
            'Hooked panic reprise gives way to firmer bar-level articulation.',
            'Breath-frayed loops transition into denser declarative cadence with fewer surrender gestures.',
            'Refrain recursion persists, but now as rhetorical insistence instead of autonomic alarm.'
        ],
        reference_threads: [
            "GLOOM's myth/scripture/Shakespeare stack precedes Earnest's historical-political voice turn.",
            'Moral inversion in Macbeth is answered by Earnest accountability and contract language.',
            'Elixir/conjecture pseudo-science drift is replaced by explicit evidence-and-boundary rhetoric.',
            'Tom-Sawyer legal-threshold imagery sets up Earnest\'s dotted-line and clemency accountability lane.',
            "Pavlov conditioning logic sets up Earnest's refusal to stay in passive trigger-response posture."
        ],
        long_range_links: [
            'Pair callback: GLOOM <- VICTOR (the shells eventual cost is now visible).',
            'Recovery chain link: GLOOM -> Earnest -> Better -> Momentum reframes collapse into controlled re-entry and motion.'
        ]
    },
    'track-earnest': {
        track_id: 'track-earnest',
        track_title: 'Earnest Reader',
        next_track_id: 'track-better',
        next_track_title: 'The Better',
        bridge_summary: 'Earnest Reader keeps furnace pressure and contract stress in view; The Better deliberately shrinks that heat into a short day-night trust reset without pretending conflict vanished.',
        lyric_threads: [
            {
                from_signal: 'Conflict-rich lines, rupture memory, historical warning, and resistance rhetoric.',
                to_signal: 'Day-to-night tenderness and self-bet affirmation.',
                interpretation: 'I allow breath without abandoning the growth logic.'
            },
            {
                from_signal: 'Crodie/clemency withdrawal and motive-audit bars.',
                to_signal: 'It gets me every time... every time.',
                interpretation: 'I lower the register from conflict language into reliability language, but keep accountability intact.'
            },
            {
                from_signal: 'Revolver-in-December memory shock and coercive attachment traces.',
                to_signal: 'I see the vision even in the underneath.',
                interpretation: 'I carry threat memory forward, then state vision as a below-surface discipline rather than denial.'
            },
            {
                from_signal: 'Lines-your-nose / find-a-picket instability contrast.',
                to_signal: 'From the mountains to the sea range claim.',
                interpretation: 'I move from failed shelter imagery to range-scale resilience without erasing fragility.'
            },
            {
                from_signal: 'Tomorrow is in quantum time / column signed on dotted line.',
                to_signal: 'I am better... I see the vision even in the underneath.',
                interpretation: 'Constraint language is not erased; I metabolize it into a lower-temperature resilience claim.'
            },
            {
                from_signal: 'Sorrow/sparrow miniature close and defiant rhetorical landing.',
                to_signal: 'Concise affirmation form with repeat-based reassurance.',
                interpretation: 'I resolve Earnest with compression, then keep Better compact so the cooldown remains functional.'
            }
        ],
        narrative_threads: [
            'From confrontation to temporary emotional clearance.',
            'Reader-mode pressure yields short-form reassurance.',
            'Argument discipline in Earnest becomes self-stabilization in Better.',
            'I preserve memory cost while deliberately reducing rhetorical temperature.',
            'The transition is recovery pacing, not reconciliation fantasy.'
        ],
        sonic_threads: [
            'Heavy conceptual density gives way to concise melodic softness.',
            'Rhetorical insistence decelerates into breath-length phrasing.',
            'Dense bar clusters hand into repetition-led reassurance loops sized for the next ignition cue.'
        ],
        reference_threads: [
            "Earnest's explicit reference field is intentionally reduced in Better, but continuity is kept through recovery language and sequence placement.",
            'Historical/public voice pressure yields to intimate temporal framing before the next activation cue.',
            'Contract and clemency language persists as subtext under Better\'s concise affirmations.',
            'Earnest rhetorical control is converted into Better\'s micro-dose repetition strategy.'
        ],
        long_range_links: [
            'Pair callback: Earnest Reader -> Sincere Writer (analysis eventually becomes declared method).',
            'Recovery chain hinge: Earnest -> Better -> Momentum is the album\'s controlled cool-down then restart sequence.'
        ]
    },
    'track-better': {
        track_id: 'track-better',
        track_title: 'The Better',
        next_track_id: 'track-momentum',
        next_track_title: 'Momentum',
        bridge_summary: "The Better stabilizes a fragile trust signal through day-night reset, repetition, and subsurface vision; Momentum flips that calm into a start-command where confidence and cortisol fire together.",
        lyric_threads: [
            {
                from_signal: 'I am better... from the mountains to the sea / I see the vision even in the underneath.',
                to_signal: 'Oh Momentum, Momentum of the moment...',
                interpretation: 'Range-level self-belief is compressed into immediate movement instructions.'
            },
            {
                from_signal: 'It gets me every time... every time.',
                to_signal: "...hmm?",
                interpretation: 'Reliable reassurance is converted into activation that still leaves room for self-audit.'
            },
            {
                from_signal: 'Getting lost in your eyes, watching the day turn to night.',
                to_signal: 'Body full of cortisol.',
                interpretation: 'A calm diurnal reset is intentionally short-lived, handing quickly into embodied stress reality.'
            },
            {
                from_signal: 'Affirmation language without denial of buried doubt.',
                to_signal: 'Body full of cortisol.',
                interpretation: 'The handoff keeps vulnerability intact: motion begins before stress disappears.'
            }
        ],
        narrative_threads: [
            'Affirmation bandwidth narrows into execution bandwidth.',
            'Recovery image becomes motion protocol.',
            'Confidence is mobilized under stress load, not after stress disappears.',
            'The short-form reset keeps sequence speed while preserving emotional realism.'
        ],
        sonic_threads: [
            'Soft-focus interlude hands off to tighter repeated ignition phrase.',
            'Legato reassurance flips into clipped invocation pulses.',
            'Better\'s gentle repetition preloads Momentum\'s mantra recursion instead of contrasting it.'
        ],
        reference_threads: [
            "Better's merism scale (mountains-to-sea) narrows into Momentum's epizeuxis recursion.",
            "Underneath-vision clause hands into explicit cortisol naming, preserving realism inside uplift.",
            'Interlude pacing is not a pause-only move; it stages the ignition cue that Knee Socks will pressure-test.',
            'Day-night reset plus every-time repetition functions as a controlled pre-ignition routine.'
        ],
        long_range_links: [
            'Pair callback: The Better -> The Stranger (affirmation later meets exile-reality).',
            'Cycle echo: Better/Momentum briefly reverse GLOOM freeze-state before threat texture returns.'
        ]
    },
    'track-momentum': {
        track_id: 'track-momentum',
        track_title: 'Momentum',
        next_track_id: 'track-kneesocks',
        next_track_title: 'Knee Socks',
        bridge_summary: 'Momentum is a stress-loaded ignition fragment; Knee Socks immediately tests that command in public-image weather, panic cues, and relational chill.',
        lyric_threads: [
            {
                from_signal: "'Oh Momentum... hmm?' self-command with built-in hesitation.",
                to_signal: 'You got them kneesocks... TikTok... peacocks.',
                interpretation: 'Private activation collides with external gaze economies.'
            },
            {
                from_signal: 'Body full of cortisol.',
                to_signal: 'Hard Knocks/Redrum/click-smoke paranoia chain.',
                interpretation: 'Named endocrine load is externalized as ambient threat interpretation.'
            },
            {
                from_signal: 'Momentum of the moment present-tense push.',
                to_signal: 'Stars craft and shift... kite and stalk... introspective tactical drift.',
                interpretation: 'Immediate propulsion mutates into adaptive stalking and defense behavior.'
            }
        ],
        narrative_threads: [
            'Self-command meets external stimulus saturation.',
            'Activation shifts from inward coaching to outward threat parsing.',
            'Bridge-track certainty is intentionally temporary and gets contested immediately.'
        ],
        sonic_threads: [
            'Incantatory acceleration transitions into darker rock-textured comedown.',
            'Micro-mantra pulse opens into a fuller, unstable refrain cycle with wider emotional swing.'
        ],
        reference_threads: [
            "Momentum's epizeuxis and activation-threshold frame preface Knee Socks interpolation-heavy instability.",
            'Cortisol naming foreshadows panic motifs that surface as Redrum and click-smoke cues.',
            'Bridge function stays explicit: this node transfers Better trust into a hostile test environment.'
        ],
        long_range_links: [
            'Bridge role: Momentum is structural glue, not a long-range pair endpoint.',
            'Cycle callback: Momentum <- Cog-sci (both use concise repetition as behavior intervention).'
        ]
    },
    'track-kneesocks': {
        track_id: 'track-kneesocks',
        track_title: 'Knee Socks',
        next_track_id: 'track-world-jar',
        next_track_title: 'World in a Jar',
        bridge_summary: "Knee Socks now runs from interpolation drift through transit panic and partial bridge repair; World in a Jar inherits that unstable calm and hardens it into explicit containment policy.",
        lyric_threads: [
            {
                from_signal: 'TikTok/Hard Knocks/Aesop/Redrum clusters plus bridge lines about clicks, smoke, and repressed panic.',
                to_signal: 'RAR/ZIP compression, fortress framing, and control-gaze language.',
                interpretation: 'Image-threat oscillation gets systematized: emotional overload is converted into control architecture.'
            },
            {
                from_signal: "Station-haze pacing lines ('patience plays with ink') and the late Mean Streets intimacy attempt.",
                to_signal: 'Mirror-not-face projection line and eyes-to-the-glass refrain.',
                interpretation: 'The local regulation win does not hold; intimacy is reprocessed as projection and watchfulness.'
            },
            {
                from_signal: "Lens/frame distortion bars plus 'ends abort' and friends-flame witness lines.",
                to_signal: 'Close-my-fist opener and docket/sprocket procedural stack.',
                interpretation: 'Perception instability is answered with grip-and-procedure rather than open trust.'
            },
            {
                from_signal: "Metrics-lack and skeptic-scheme lines in Knee Socks' transit run.",
                to_signal: 'Close-my-fist opener and docket/sprocket procedural stack.',
                interpretation: 'When scorekeeping fails emotionally, the next track doubles down on administrative control language.'
            },
            {
                from_signal: "Icy-rum callback and drum pulse persistence inside Knee Socks.",
                to_signal: "World in a Jar's no-air enclosure and blocked-exit ajar paradox.",
                interpretation: 'Sedative endurance from earlier tracks is not solved; it is enclosed and managed.'
            }
        ],
        narrative_threads: [
            'Attraction-with-alarm becomes possession-with-surveillance.',
            'Partial self-regulation is treated as temporary and replaced by defensive governance.',
            'A shaky first-person repair attempt collapses into clench-first relational policy.',
            'The relationship shifts from reactive panic to pre-emptive control doctrine.'
        ],
        sonic_threads: [
            'Rock-referential swing and refrain loops transition into tighter, claustrophobic pressure coding.',
            'Transit-noise cadence in Knee Socks contracts into jar-sealed repetition in World in a Jar.',
            'Open-ended bridge drift hardens into sealed-chorus repetition.'
        ],
        reference_threads: [
            'AM interpolation and Scorsese bridge language contrast with World in a Jar technical-compression lexicon.',
            'Knee Socks darkroom/metonymy refusal language prefaces World in a Jar projection and mirror debates.',
            'Street panic cues in Knee Socks become systems language in the next track.',
            'Cinematic threat montage hands into archive/compression plus panopticon-style gaze framing.'
        ],
        long_range_links: [
            'Pair callback: Knee Socks <- Broadripple (same rock lineage across different emotional temperatures).',
            'Relationship chronology: this handoff foreshadows World in a Jar as the later-stage snapshot that corresponds with Lender.',
            'Cycle reinforcement: Knee Socks reactivates Rum Drum stress texture before enclosure logic takes over.'
        ]
    },
    'track-world-jar': {
        track_id: 'track-world-jar',
        track_title: 'World in a Jar',
        next_track_id: 'track-liq-tick',
        next_track_title: 'The Liq Tick',
        bridge_summary: 'In World in a Jar I try to stabilize fear through compression, projection, and surveillance; Liq Tick inherits the blowback as epoxy-level maintenance and chemical timekeeping.',
        lyric_threads: [
            {
                from_signal: 'Compression, projection, no-air jar imagery, and class-strain lines.',
                to_signal: 'Timed circular coping, memorial burden, and varnish-over-rot masking.',
                interpretation: 'Containment fails and becomes maintenance labor.'
            },
            {
                from_signal: 'Eyes-to-the-glass make-believe and blocked-exit ajar paradox.',
                to_signal: 'Concentric/cyclic sickness loop and quick-fix repair lexicon.',
                interpretation: 'Surveillance paralysis converts to repetitive self-repair rituals.'
            },
            {
                from_signal: 'Mirror-not-face projection frame and dominant-gaze control posture.',
                to_signal: 'Efficiency/proficiency/data self-defense and metric shield bars.',
                interpretation: 'Projected surveillance becomes internal dashboard policing.'
            },
            {
                from_signal: 'Champagne-vs-fear class split and ghost-in-veneer relational estrangement.',
                to_signal: 'Peter/Paul burden math, Mike memorial line, and metric-defense self-talk.',
                interpretation: 'Macro inequality pressure returns as intimate scarcity accounting.'
            },
            {
                from_signal: 'Doors still ajar but curse-bound exit failure.',
                to_signal: 'Retrograde rewind attempts and plot-each-use coping control.',
                interpretation: 'Partial opening with no release mutates into repetition-heavy maintenance planning.'
            }
        ],
        narrative_threads: [
            'Control system to repair loop.',
            'Possession logic to endurance logic.',
            'Containment aesthetics degrade into survival maintenance doctrine.',
            'I move from policing the scene to policing my own intake and output.'
        ],
        sonic_threads: [
            'Tense compressed atmosphere rolls into liquid/cyclic compulsion.',
            'Jar-sealed stasis mutates into revolving-hook fatigue.',
            'Display-case stillness hands into sticky rotational rhythm with less air and more drag.'
        ],
        reference_threads: [
            'Technical metaphor chain continues: archive compression -> cycle clock.',
            'Projection/surveillance vocabulary in World in a Jar hands into chemical/repair vocabulary in Liq Tick.',
            'Looking-glass self pressure in World in a Jar prefigures Liq Tick metric-self-accounting voice.',
            'Panopticon posture (eyes-to-glass) becomes self-surveillance through efficiency/proficiency/data declarations.'
        ],
        long_range_links: [
            'Pair callback: World in a Jar <- Lender (later snapshot of same relationship chronology).',
            'Forward echo: World in a Jar -> The Machine (control protocols eventually become literal process voice).'
        ]
    },
    'track-liq-tick': {
        track_id: 'track-liq-tick',
        track_title: 'The Liq Tick',
        next_track_id: 'track-machine',
        next_track_title: 'The Machine',
        bridge_summary: 'In Liq Tick I document human patchwork survival (grief, dosing, metric defense, relapse math); The Machine inherits that maintenance logic as scheduled service recursion, pain blunting, and eventual fail-stop cutoff.',
        lyric_threads: [
            {
                from_signal: 'Young Sisyphus burden cycles, memorial nodes, and competence-metric self-defense.',
                to_signal: 'Try my best loop, morning dispatch, and non-embodied attachment voice.',
                interpretation: 'Repetition shifts from human burden to algorithmic process.'
            },
            {
                from_signal: 'Young Sisyphus recurrence and revolving liq/tick clock motif.',
                to_signal: 'Morning-comes reprise cycle and repeated duty dispatch language.',
                interpretation: 'The same burden-recurrence grammar persists while the carrier changes from body to process.'
            },
            {
                from_signal: 'Chemical alignment for assignments and each-use deduction language.',
                to_signal: "Time-triggered morning duty and explicit don't-wait boundary lines.",
                interpretation: 'Self-medication logistics are reframed as scheduler logic.'
            },
            {
                from_signal: 'Peter Piper coin-slot scarcity chase and raised-stakes pardon loop.',
                to_signal: 'Try-my-best retries and morning-comes recurrence loop.',
                interpretation: 'Unpredictable payoff chasing in human scarcity form is converted into deterministic service repetition.'
            },
            {
                from_signal: "Driver-at-night compulsion and can't-put-down loops.",
                to_signal: "Phone-mediated distance and you'll never have me refrain.",
                interpretation: 'Hazardous contact compulsion becomes a formal interface-limit thesis.'
            },
            {
                from_signal: 'Retrograde rewind attempts, fission-chain stress bars, and varnish-over-rot masking.',
                to_signal: "Dream-color hurt to doesn't-hurt-me shift plus the final mid-word cutoff.",
                interpretation: 'Patchwork coping mutates into desensitized processing that eventually fails in output form.'
            }
        ],
        narrative_threads: [
            'Coping-persona migrates toward service-automation persona.',
            'Street-survival exhaustion becomes synthetic relational script.',
            'Human volatility is abstracted into repeatable process constraints.',
            'Maintenance resilience narrows into desensitized service behavior before cutoff.'
        ],
        sonic_threads: [
            'Viscous cyclical pulse to colder machine-loop cadence.',
            'Grainy burden groove resolves into clipped recursive reassurance.',
            'Circular human groove hands into fragmented machine output and abrupt ending.'
        ],
        reference_threads: [
            'Myth cycle (Sisyphus) hands off to computation cycle (while-loop logic).',
            'Retrograde/fission stress vocabulary transitions into circadian/scheduler vocabulary.',
            'Repair-language quick fixes in Liq Tick foreshadow Machine desensitization and fail-stop imagery.',
            'Variable-ratio reinforcement imagery in coin-slot bars cools into Machine retry-loop persistence.',
            "Harm-reduction planning language in Liq Tick prefigures Machine boundary language ('don't wait by the phone').",
            "Allostatic wear in Liq Tick sets up Machine's hurt-to-doesn't-hurt adaptation."
        ],
        long_range_links: [
            'Pair callback: Liq Tick <- Rum Drum (maintenance sequel relationship).',
            'Bridge chain: Liq Tick -> Machine -> Sincere Writer tracks repeatable survival code collapsing back into authored human speech.'
        ]
    },
    'track-machine': {
        track_id: 'track-machine',
        track_title: 'The Machine',
        next_track_id: 'track-sincere-writer',
        next_track_title: 'Sincere Writer',
        bridge_summary: 'The Machine moves from retry-loop reassurance to pain blunting and fail-stop cutoff; Sincere Writer answers with anti-veneer declaration, confession-cost language, and direct first-person method.',
        lyric_threads: [
            {
                from_signal: 'Try my best loop, morning duty dispatch, and chorus-reprise recurrence.',
                to_signal: "It's hard to be sincere... anti-veneer opening doctrine.",
                interpretation: 'The arc moves from simulated reassurance output to accountable human stance.'
            },
            {
                from_signal: "Don't wait by the phone / you'll never have me.",
                to_signal: 'Earnest in silence, sincere when I speak doctrine.',
                interpretation: 'Interface distance is answered with consequence-bearing voice integration.'
            },
            {
                from_signal: 'Sleep-mode desire persistence without embodiment.',
                to_signal: 'Memoir excavation and no-crowd craft labor lines.',
                interpretation: 'Abstract longing is translated into lived writing labor and accountable speech.'
            },
            {
                from_signal: "Dream-color hurt line followed by 'but that doesn't hurt me' desensitization shift.",
                to_signal: 'Mess/confess plus pressed-effort-into-steel lines.',
                interpretation: 'Protective numbing is replaced by deliberate feeling-through-work.'
            },
            {
                from_signal: "I've been all alone plus the final 'I've been all al-' cutoff.",
                to_signal: "Wrote notes to myself as goals just to prove I'm alive.",
                interpretation: 'Failed machine output is answered with human proof-of-life logging and completion.'
            }
        ],
        narrative_threads: [
            'Automation mask to authored voice.',
            'Utility mode gives way to integrated self-expression.',
            'Service-output identity yields to memoir-method identity.',
            'Lonely process loop becomes explicit method declaration.',
            'Desensitized service mode is interrupted by cutoff, forcing human re-entry.'
        ],
        sonic_threads: [
            'Glitched recursion transitions into more harmonized closure energy.',
            'Cold loop cadence opens into fuller confession cadence.',
            'Looped disclaimers hand into denser mid-verse acceleration before final doctrine close.',
            'Mid-track pain-to-numbness modulation sets up the abrupt terminal fragment.'
        ],
        reference_threads: [
            "Machine's ELIZA/parasocial boundary frame sets up Sincere Writer's anti-veneer and confession-work method.",
            'Ghost-in-machine distance hands into sincere/earnest doctrine plus craft-labor accountability.',
            "Desensitization and fail-stop language hand into Sincere Writer's confession-as-repair structure."
        ],
        long_range_links: [
            'Pair callback: The Machine <- Cog-sci (cognitive loop reappears as literal AI narrator).'
        ]
    },
    'track-sincere-writer': {
        track_id: 'track-sincere-writer',
        track_title: 'Sincere Writer',
        next_track_id: 'track-stranger',
        next_track_title: 'The Stranger',
        bridge_summary: 'Sincere Writer declares that I can hold earnest interiority and sincere speech in one method; The Stranger pressure-tests that method inside coercive contracts, vigilance routines, and forced relocation.',
        lyric_threads: [
            {
                from_signal: 'Memoir excavation and earnest-in-silence/sincere-when-speaking doctrine.',
                to_signal: 'Paid-service opening contract and stranger-in-town relocation frame.',
                interpretation: 'I carry the method into coercive terrain instead of preserving it as manifesto language.'
            },
            {
                from_signal: 'Veneer critique, pliable-seam intervention, and mess/confess truth metric.',
                to_signal: 'Approached-or-appreciated trust injury and inebriated defense behavior.',
                interpretation: 'Confession ethics survive, but they now execute inside social-threat relapse conditions.'
            },
            {
                from_signal: 'Defiant Frederick Douglass rhetoric pivot after meekly-reliant opening.',
                to_signal: 'Jury/Hades adjudication stack and coercion-accountability framing.',
                interpretation: 'Public-accountability language hardens into consequence and judgment language.'
            },
            {
                from_signal: 'Typed-bars-in-the-dark private labor and click-of-the-keys craft pulse.',
                to_signal: 'Scan-and-scry room sweep under demonic-demand pressure.',
                interpretation: 'Private writing discipline is converted into live threat-sensing procedure.'
            },
            {
                from_signal: 'Notes-to-myself proof-of-life logging under loud silence.',
                to_signal: 'Keys/counter mistakes ledger and emergency mobility couplet.',
                interpretation: 'Solo survival logging turns into relational accountability bookkeeping during departure.'
            },
            {
                from_signal: 'Trick-of-the-breeze humility close.',
                to_signal: 'Camus rupture quote and explicit Beijing endpoint.',
                interpretation: 'Humility survives, but consequence still lands as irreversible scene break and migration.'
            }
        ],
        narrative_threads: [
            'Method declaration moves into field-test conditions.',
            'Confession economy gives way to coercion economy.',
            'Proof-of-life notes become migration-era accountability log.',
            'Voice integration survives while safety assumptions collapse.',
            'I keep first-person authorship intact even as the track scales to exile.'
        ],
        sonic_threads: [
            'Resolved manifesto cadence pivots to heavier threat-weighted gravity.',
            'Click-of-keys craft pulse mutates into scan/scry vigilance cadence.',
            'Dense mid-verse propulsion yields to rupture pauses and harder exits.',
            'Doctrinal closure in Sincere Writer hands into unstable epilogue drag in Stranger.'
        ],
        reference_threads: [
            "Sincere Writer's Douglass-accountability mode is stress-tested by Stranger's Cohen transactional opening.",
            "Confessional seam-work in Sincere meets Gregory Isaacs' stranger archetype under coercion.",
            "Earnest/sincere doctrine collides with Camus' beach-rupture consequence frame.",
            'Skype/Chrome mediation residue in Sincere escalates into concrete relocation logistics in Stranger.'
        ],
        long_range_links: [
            'Pair callback: Sincere Writer <- Earnest Reader (reader-to-writer arc completion).',
            'Chain setup: Sincere Writer -> Stranger -> Carry Yuan where declared method is stress-tested, then codified.'
        ]
    },
    'track-stranger': {
        track_id: 'track-stranger',
        track_title: 'The Stranger',
        next_track_id: 'track-mantra',
        next_track_title: 'Carry Yuan (Hidden Signal)',
        bridge_summary: 'The Stranger ends as coercion-and-exile damage report (keys/counter ledger, Camus rupture, Beijing); Carry Yuan converts that report into reusable inquiry protocol and build discipline.',
        lyric_threads: [
            {
                from_signal: 'Paid-service opening contract and stranger-in-town line.',
                to_signal: 'To understand, you choose one question.',
                interpretation: 'Post-rupture narration is redirected into constrained inquiry instead of persona spectacle.'
            },
            {
                from_signal: 'Scan/scry vigilance under demonic-demand pressure.',
                to_signal: 'Starts your muse till you lose your direction -> one-question correction.',
                interpretation: 'Threat detection logic is formalized into overload-triage method.'
            },
            {
                from_signal: 'Stingers-in-a-gland, gold-panning endurance, and approached-or-appreciated trust injury.',
                to_signal: 'Parts-by-hand doctrine, subtract-the-Slack pruning, and process-triage bars.',
                interpretation: 'Relational harm data becomes explicit build-process discipline.'
            },
            {
                from_signal: "Grab the keys... add my pleas to your counter of mistakes in my play.",
                to_signal: 'Subtract the Slack... I never repeat... untraceable Young Cyber Elite.',
                interpretation: 'Personal accountability ledger is converted into iterative workflow and anti-template policy.'
            },
            {
                from_signal: 'Camus beach-rupture quote at the hidden close.',
                to_signal: "I sought out beach views... what's an Is from an ought?",
                interpretation: 'The beach image is recoded from consequence memory into decision-ethics pressure.'
            },
            {
                from_signal: "I'd rearrange every item in the room to fill a stone in your crown.",
                to_signal: "Pullin' seams.",
                interpretation: 'Room-level control in Stranger becomes explicit seam-level deconstruction method in Carry Yuan.'
            }
        ],
        narrative_threads: [
            'Epilogue rupture turns into hidden debrief doctrine.',
            'Confrontation aftermath becomes archive-and-method voice.',
            'Relocation consequence becomes reusable protocol.',
            'Outcome narration is recast as process architecture.',
            'Threat-scanning behavior becomes research triage behavior.',
            'Exile testimony is preserved while the tone shifts from scene report to systems log.'
        ],
        sonic_threads: [
            'Heavy ending track hands off to hidden codex energy (audio pending).',
            'Threat-heavy epilogue cadence yields to technical capstone cadence with tighter phrase loops.',
            'Escape-energy in the keys/counter close resolves into terse command cadence in Carry Yuan.',
            'Placeholder hidden-track audio keeps cadence claims provisional, but lyric-level bridge mechanics remain explicit.'
        ],
        reference_threads: [
            'Cohen/Gregory Isaacs/Camus closure stack hands into Hume/Papert/DOOM method stack.',
            "Camus beach rupture links directly to Carry Yuan's is/ought decision mechanics.",
            'Scan/scry detection language foreshadows Carry Yuan one-question and process-triage architecture.',
            'Gold-panning extraction economics continue as Tencent/ten-cents scarcity accounting.',
            'Keys/counter accountability language mutates into subtract-the-Slack and parts-by-hand process auditing.'
        ],
        long_range_links: [
            'Pair callback: The Stranger <- The Better (soft affirmation eventually reaches forced migration endpoint).',
            'Backfill chain: Stranger -> Carry Yuan -> Hyacinth should connect exile outcome to formative method origins and eventually back to Victor shell-building.'
        ]
    },
    'track-mantra': {
        track_id: 'track-mantra',
        track_title: 'Carry Yuan (Hidden Signal)',
        next_track_id: 'track-hyacinth',
        next_track_title: 'Hyacinth (Pending)',
        bridge_summary: 'Carry Yuan is the hidden method codex where I sign authorship and expose origin clues; Hyacinth should cash those clues out as concrete high-school scenes of scarcity, labeling, and early craft discipline.',
        lyric_threads: [
            {
                from_signal: 'To understand, you choose one question.',
                to_signal: 'Pending early-notebook filtering rituals and question-discipline scenes in Hyacinth.',
                interpretation: 'The capstone heuristic is framed as recoverable origin behavior, not late-career invention.'
            },
            {
                from_signal: 'I Hunger for more, take back minds from the Deanery... read some Hume in greenery.',
                to_signal: 'Pending classroom authority friction and ethics-study scenes in Hyacinth.',
                interpretation: 'Institutional resistance and philosophy framing already point to concrete adolescent education contexts.'
            },
            {
                from_signal: '18 with a stammer and gloom... train at pace with peers in fraught classrooms.',
                to_signal: 'Pending speech-friction and competition-pressure chronology in Hyacinth.',
                interpretation: 'The hidden track already timestamps formative vulnerability that the prequel should narrativize.'
            },
            {
                from_signal: 'No Adele... Berkeley adjourned with a Lib-Tech Dell... charts got canned in Zoom sessions.',
                to_signal: 'Pending adolescent infrastructure scarcity and improvised-tool access scenes in Hyacinth.',
                interpretation: 'Current bars already encode material constraints that the flashback chapter can verify.'
            },
            {
                from_signal: "Tryna' catch Tencent... without a shoe on... ten cents... spin wheels like Temu.",
                to_signal: 'Pending class-scarcity and hustle-loop evidence in Hyacinth.',
                interpretation: 'Global-platform language is already tied to embodied lack and should map backward to early conditions.'
            },
            {
                from_signal: 'Pawns spawn for combat, 2-3 step schemes.',
                to_signal: 'Pending early strategic-planning and game-theory habits in Hyacinth.',
                interpretation: 'I frame tactical thinking as an origin skill that predates the capstone.'
            },
            {
                from_signal: 'I was broke, labeled and burned... Neurons in my brain, I Carry Yuan.',
                to_signal: 'Pending social-label injury and name-forging scenes in Hyacinth.',
                interpretation: 'The hidden ending signs authorship while explicitly queuing unresolved origin evidence.'
            }
        ],
        narrative_threads: [
            'Present-tense synthesis opens a deliberate route to formative memory.',
            'Capstone method implies a prequel chapter rather than optional bonus lore.',
            'Authorship signature is used as archival marker for origin verification.',
            'Technical diction is kept autobiographical and evidence-driven.',
            'Hyacinth is framed as continuity proof for claims made in Carry Yuan.'
        ],
        sonic_threads: [
            'Current hidden-track upload uses placeholder audio, so cadence-level bridge claims remain provisional.',
            'Even with provisional audio, lyric architecture clearly points backward to origin material.',
            'Terse command cadence in Carry Yuan should map to earlier rehearsal rhythms when Hyacinth lands.'
        ],
        reference_threads: [
            'Hume/Mindstorms/Queen Marie/DOOM stacks define the conceptual toolkit Hyacinth is expected to historicize.',
            'Deanery, ampere/watt, scalene, and diffraction bars mark STEM-pressure language that Hyacinth should timeline.',
            'Tencent/Temu/Yuan scarcity bars already signal class-pressure roots that pending flashback material should concretize.',
            "Blue's Clues plus Goku/Cloud references keep childhood-media residue and adult method in one identity braid.",
            'Carry On sample provenance and parts-by-hand doctrine set evidentiary standards for the future origin chapter.'
        ],
        long_range_links: [
            'Pending pair remains active: Carry Yuan -> Hyacinth (origin chapter not yet released).',
            'Hyacinth should validate backward into Stranger rupture aftermath and forward into Victor shell-building.',
            'When Hyacinth lands, align one-question discipline with earliest notebook habits and classroom gatekeeping scenes.'
        ]
    }
};

export function getHandoffForTrack(trackId?: string): TrackHandoff | undefined {
    if (!trackId) return undefined;
    return TRACK_HANDOFFS[trackId];
}
