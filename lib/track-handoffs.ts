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
        bridge_summary: 'VICTOR builds a director-mask through optics, rebuild, and strategy language; Broadripple stress-tests that shell inside influence debt and citation panic.',
        lyric_threads: [
            {
                from_signal: 'Director shell language plus parallax/Theseus/chess control bars.',
                to_signal: 'Reference-stacked bars about idols, borrowed fire, and panic motion.',
                interpretation: 'The armor built in track one immediately enters an influence economy where originality feels unstable.'
            },
            {
                from_signal: "Outsider gate pressure ('Waiting Outside the Lines' frame).",
                to_signal: 'Scrambling and proving language around Luddy-era urgency.',
                interpretation: 'The breakthrough impulse persists, but gets louder and less controlled.'
            }
        ],
        narrative_threads: [
            'Persona construction becomes social comparison stress.',
            'Self-direction shifts into public velocity and citation debt.'
        ],
        sonic_threads: [
            'From controlled architecture to accelerant panic energy.',
            'Both tracks keep dense line packing, but Broadripple increases urgency.'
        ],
        reference_threads: [
            'VICTOR builds the author/alter frame that Broadripple tests against real influence lineages.',
            'Film/philosophy/chess references in VICTOR hand into catalog-citation overload in Broadripple.'
        ],
        long_range_links: [
            'Pair callback: VICTOR -> GLOOM (shell creation eventually returns as cost spiral).'
        ]
    },
    'track-broadripple': {
        track_id: 'track-broadripple',
        track_title: 'Broadripple',
        next_track_id: 'track-cogsci',
        next_track_title: 'Cog-sci',
        bridge_summary: 'Broadripple\'s citation debt and craft-compulsion loop (Margot/Edwards/Luddy pressure) is internalized in Cog-sci as a thought-cycle diagnosis.',
        lyric_threads: [
            {
                from_signal: 'Borrowed-title/idol-coded language and derivative-risk confession.',
                to_signal: 'My way of thinking leaves me stuck here...',
                interpretation: 'External influence panic is reframed as internal processing architecture.'
            },
            {
                from_signal: 'Hook-and-craft repetition plus \"can\'t drop these scribbles\" compulsion.',
                to_signal: 'Sample-hinge reset and relearning/passion statement.',
                interpretation: 'Form-level looping in Broadripple becomes explicit cycle-break intent in Cog-sci.'
            },
            {
                from_signal: 'Luddy commute pressure and secular/institutional skepticism bars.',
                to_signal: 'Direct naming of thought-pattern prison and discipline target.',
                interpretation: 'Campus and status context is absorbed into a metacognitive self-audit.'
            }
        ],
        narrative_threads: [
            'From imitation anxiety to method diagnosis.',
            'From influence debt confession to cognition repattern attempt.'
        ],
        sonic_threads: [
            'Dense multi-reference rush contracts into a concise mantra-like hinge.'
        ],
        reference_threads: [
            'Broadripples rock-intertext posture sets up later style mirror in Knee Socks.',
            'Cog-sci\'s Huxlee/Lou Roy sample logic acts as reflective counterpoint to Broadripple\'s citation velocity.'
        ],
        long_range_links: [
            'Pair callback: Broadripple -> Knee Socks (shared rock lineage, different thermal state).'
        ]
    },
    'track-cogsci': {
        track_id: 'track-cogsci',
        track_title: 'Cog-sci',
        next_track_id: 'track-rumdrum',
        next_track_title: 'The Rum Drum',
        bridge_summary: 'Cog-sci names the loop and attempts relearning/chant repatterning; Rum Drum shows what happens when that loop is lived as nightly labor.',
        lyric_threads: [
            {
                from_signal: 'Changing thought patterns plus relearning/chant stabilization.',
                to_signal: 'Rum-as-rhythm, applications, and repetitive coping behavior.',
                interpretation: 'Theory turns into embodied repetition.'
            },
            {
                from_signal: 'Rumination bars that blur person and discipline focus.',
                to_signal: 'Brand and routine language replacing stable rest.',
                interpretation: 'The mind-level thesis is pressure-tested by ordinary life logistics.'
            }
        ],
        narrative_threads: [
            'From diagnosis to symptom log.',
            'From cognitive claim to maintenance grind.'
        ],
        sonic_threads: [
            'Short loop-hinge into heavier repetitive drum compulsion.'
        ],
        reference_threads: [
            'Sample framework in Cog-sci foreshadows process/loop language that becomes explicit in Rum Drum and Liq Tick.'
        ],
        long_range_links: [
            'Pair callback: Cog-sci -> The Machine (thought loops later re-emerge as literal system voice).'
        ]
    },
    'track-rumdrum': {
        track_id: 'track-rumdrum',
        track_title: 'The Rum Drum',
        next_track_id: 'track-monumental',
        next_track_title: 'Monumental',
        bridge_summary: 'Rum Drums nightly conundrum and admin-funnel burnout escalate into Monumentals city-scale pressure and extraction map.',
        lyric_threads: [
            {
                from_signal: 'Application fatigue, cover-letter nonresponse, and retail coping ledger.',
                to_signal: 'City-scale fraud, discipline, and public pressure language.',
                interpretation: 'Private instability is recontextualized as systemic condition.'
            }
        ],
        narrative_threads: [
            'Scope widens from the body to the block.',
            'The same stress now appears as institutional design rather than only mood.'
        ],
        sonic_threads: [
            'Insomnia drum loop transitions into heavier, public-facing force register.'
        ],
        reference_threads: [
            'Shakespearean pressure in Rum Drum expands into multi-reference governance and surveillance tones in Monumental.',
            'Scrum/CSV labor language hands into Foucault/Witcher/Uncle Sam structural pressure language.'
        ],
        long_range_links: [
            'Pair callback: Rum Drum -> Liq Tick (later track formalizes the addiction-maintenance doctrine).'
        ]
    },
    'track-monumental': {
        track_id: 'track-monumental',
        track_title: 'Monumental',
        next_track_id: 'track-lender',
        next_track_title: 'Lender',
        bridge_summary: 'Monumental moves from macro-system critique and debtor extraction into Lenders intimate economy of asks, debt, and care.',
        lyric_threads: [
            {
                from_signal: 'Civic pressure, no-rescue threat, plug dependency, and debtor labor imagery.',
                to_signal: 'Can you lend me... ladder of relational requests.',
                interpretation: 'The same extraction logic migrates from society to relationship.'
            }
        ],
        narrative_threads: [
            'From public structure to private transaction.',
            'Institutional strain becomes interpersonal burden accounting.'
        ],
        sonic_threads: [
            'Harsh structural tone softens into tired but still transactional cadence.'
        ],
        reference_threads: [
            'Monumentals political vocabulary primes Lenders care-as-currency framing.',
            'Public debt language narrows into interpersonal debt language.'
        ],
        long_range_links: [
            'Bridge role: Monumental acts as hinge between civic indictment and relationship chronology.'
        ]
    },
    'track-lender': {
        track_id: 'track-lender',
        track_title: 'Lender',
        next_track_id: 'track-gloom',
        next_track_title: 'GLOOM',
        bridge_summary: 'Lender\'s unresolved request-ladder and helper depletion hand off to GLOOM\'s panic loop, where relational over-giving mutates into mythic threat cognition.',
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
            }
        ],
        narrative_threads: [
            'Care labor burnout becomes collapse-state narration.',
            'Interpersonal debt language transitions into symbolic panic language.'
        ],
        sonic_threads: [
            'From worn transactional cadence to claustrophobic alarm-and-reprise form.'
        ],
        reference_threads: [
            'Lender\'s idiom/film realism gives way to GLOOM\'s myth-scripture-literary stack.'
        ],
        long_range_links: [
            'Pair callback: Lender -> World in a Jar (same relationship later appears as containment and control).'
        ]
    },
    'track-gloom': {
        track_id: 'track-gloom',
        track_title: 'GLOOM',
        next_track_id: 'track-earnest',
        next_track_title: 'Earnest Reader',
        bridge_summary: 'GLOOM\'s conditioned panic spiral transitions into Earnest Reader\'s argument-driven recovery stance and historical voice posture.',
        lyric_threads: [
            {
                from_signal: 'Run-loop alarm, moral inversion, and fate-gambling imagery.',
                to_signal: 'Furnace thesis and disciplined historical challenge language.',
                interpretation: 'The narrator shifts from threat saturation to structured argument.'
            },
            {
                from_signal: 'Pavlov conditioning close with brief fog-clearing flashes.',
                to_signal: 'Voice-control, stance-building, and explicit rhetorical framing.',
                interpretation: 'Behavioral loop awareness becomes language-level agency practice.'
            }
        ],
        narrative_threads: [
            'After collapse, analysis and rhetoric begin.',
            'Fear field converts into tactical voice posture.'
        ],
        sonic_threads: [
            'Hooked panic reprise gives way to firmer bar-level articulation.'
        ],
        reference_threads: [
            'GLOOM\'s myth/scripture/Shakespeare stack precedes Earnest\'s historical-political voice turn.'
        ],
        long_range_links: [
            'Pair callback: GLOOM <- VICTOR (the shells eventual cost is now visible).'
        ]
    },
    'track-earnest': {
        track_id: 'track-earnest',
        track_title: 'Earnest Reader',
        next_track_id: 'track-better',
        next_track_title: 'The Better',
        bridge_summary: 'After furnace-pressure and dense relational auditing in Earnest, The Better opens a brief affirmation window.',
        lyric_threads: [
            {
                from_signal: 'Conflict-rich lines, rupture memory, historical warning, and resistance rhetoric.',
                to_signal: 'Day-to-night tenderness and self-bet affirmation.',
                interpretation: 'The arc allows breath without abandoning growth logic.'
            }
        ],
        narrative_threads: [
            'From confrontation to temporary emotional clearance.',
            'Reader-mode pressure yields short-form reassurance.'
        ],
        sonic_threads: [
            'Heavy conceptual density gives way to concise melodic softness.'
        ],
        reference_threads: [
            'Earnests explicit reference field is intentionally suspended in Better to create contrast.'
        ],
        long_range_links: [
            'Pair callback: Earnest Reader -> Sincere Writer (analysis eventually becomes declared method).'
        ]
    },
    'track-better': {
        track_id: 'track-better',
        track_title: 'The Better',
        next_track_id: 'track-momentum',
        next_track_title: 'Momentum',
        bridge_summary: 'The Better affirms stability; Momentum immediately converts that feeling into activation language.',
        lyric_threads: [
            {
                from_signal: 'I am better... vision in the underneath.',
                to_signal: 'Momentum of the moment...',
                interpretation: 'Internal confidence is pushed into forward kinetic intent.'
            }
        ],
        narrative_threads: [
            'From gentle self-trust to mobilization cue.',
            'Recovery image becomes action trigger.'
        ],
        sonic_threads: [
            'Soft-focus interlude hands off to tighter repeated ignition phrase.'
        ],
        reference_threads: [
            'Better functions as emotional aperture that enables the next acceleration cue.'
        ],
        long_range_links: [
            'Pair callback: The Better -> The Stranger (affirmation later meets exile-reality).'
        ]
    },
    'track-momentum': {
        track_id: 'track-momentum',
        track_title: 'Momentum',
        next_track_id: 'track-kneesocks',
        next_track_title: 'Knee Socks',
        bridge_summary: 'Momentum primes movement; Knee Socks tests whether that motion survives the cold aftermath.',
        lyric_threads: [
            {
                from_signal: 'Self-priming mantra.',
                to_signal: 'Post-rush drift and introspective chill.',
                interpretation: 'The arc interrogates whether activation can sustain itself.'
            }
        ],
        narrative_threads: [
            'Immediate ignition meets delayed emotional weather.',
            'A push-forward cue faces lived aftermath.'
        ],
        sonic_threads: [
            'Incantatory acceleration transitions into darker rock-textured comedown.'
        ],
        reference_threads: [
            'Momentum behaves as bridge node between affirmation and style-heavy reckoning.'
        ],
        long_range_links: [
            'Bridge role: Momentum is structural glue, not a long-range pair endpoint.'
        ]
    },
    'track-kneesocks': {
        track_id: 'track-kneesocks',
        track_title: 'Knee Socks',
        next_track_id: 'track-world-jar',
        next_track_title: 'World in a Jar',
        bridge_summary: 'Knee Socks moves from performance-anxiety and threat cues into a panic/cinematic bridge, then hands off to World in a Jar where anxiety hardens into containment policy.',
        lyric_threads: [
            {
                from_signal: 'TikTok/Hard Knocks/Aesop/Redrum clusters plus bridge lines about clicks, smoke, and repressed panic.',
                to_signal: 'RAR/ZIP compression, fortress framing, and control-gaze language.',
                interpretation: 'Image-threat oscillation gets systematized: emotional overload is converted into control architecture.'
            }
        ],
        narrative_threads: [
            'Attraction-with-alarm becomes possession-with-surveillance.',
            'Bridge-level vulnerability is sealed into procedural defense.'
        ],
        sonic_threads: [
            'Rock-referential swing and refrain loops transition into tighter, claustrophobic pressure coding.'
        ],
        reference_threads: [
            'AM interpolation and Scorsese bridge language contrast with World in a Jar technical-compression lexicon.',
            'Street panic cues in Knee Socks become systems language in the next track.'
        ],
        long_range_links: [
            'Pair callback: Knee Socks <- Broadripple (same rock lineage across different emotional temperatures).',
            'Relationship chronology: this handoff foreshadows World in a Jar as the later-stage snapshot that corresponds with Lender.'
        ]
    },
    'track-world-jar': {
        track_id: 'track-world-jar',
        track_title: 'World in a Jar',
        next_track_id: 'track-liq-tick',
        next_track_title: 'The Liq Tick',
        bridge_summary: 'World in a Jars clench-and-contain doctrine leaks into Liq Ticks maintenance loop, where control fails and is replaced by patchwork coping.',
        lyric_threads: [
            {
                from_signal: 'Compression, projection, no-air jar imagery, and class-strain lines.',
                to_signal: 'Timed circular coping, memorial burden, and varnish-over-rot masking.',
                interpretation: 'Containment fails and becomes maintenance labor.'
            }
        ],
        narrative_threads: [
            'Control system to repair loop.',
            'Possession logic to endurance logic.'
        ],
        sonic_threads: [
            'Tense compressed atmosphere rolls into liquid/cyclic compulsion.'
        ],
        reference_threads: [
            'Technical metaphor chain continues: archive compression -> cycle clock.'
        ],
        long_range_links: [
            'Pair callback: World in a Jar <- Lender (later snapshot of same relationship chronology).'
        ]
    },
    'track-liq-tick': {
        track_id: 'track-liq-tick',
        track_title: 'The Liq Tick',
        next_track_id: 'track-machine',
        next_track_title: 'The Machine',
        bridge_summary: 'Liq Ticks human maintenance cycle (grief, metric-defense, relapse math) transitions into The Machines scheduled service loop.',
        lyric_threads: [
            {
                from_signal: 'Young Sisyphus burden cycles, memorial nodes, and competence-metric self-defense.',
                to_signal: 'Try my best loop, morning dispatch, and non-embodied attachment voice.',
                interpretation: 'Repetition shifts from human burden to algorithmic process.'
            }
        ],
        narrative_threads: [
            'Coping-persona migrates toward service-automation persona.',
            'Street-survival exhaustion becomes synthetic relational script.'
        ],
        sonic_threads: [
            'Viscous cyclical pulse to colder machine-loop cadence.'
        ],
        reference_threads: [
            'Myth cycle (Sisyphus) hands off to computation cycle (while-loop logic).'
        ],
        long_range_links: [
            'Pair callback: Liq Tick <- Rum Drum (maintenance sequel relationship).'
        ]
    },
    'track-machine': {
        track_id: 'track-machine',
        track_title: 'The Machine',
        next_track_id: 'track-sincere-writer',
        next_track_title: 'Sincere Writer',
        bridge_summary: 'The Machine externalizes recursive service-voice and isolated shutdown; Sincere Writer answers with direct autobiographical confession and method.',
        lyric_threads: [
            {
                from_signal: 'Try my best loop, morning duty dispatch, and no one left to hold ending.',
                to_signal: 'Its hard to be sincere... direct declarative method.',
                interpretation: 'The arc moves from simulated reassurance to accountable human statement.'
            }
        ],
        narrative_threads: [
            'Automation mask to authored voice.',
            'Utility mode gives way to integrated self-expression.'
        ],
        sonic_threads: [
            'Glitched recursion transitions into more harmonized closure energy.'
        ],
        reference_threads: [
            'Machine conceptual frame sets up Sincere Writers memoir-manifesto synthesis.'
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
        bridge_summary: 'Sincere Writer states the earnest/sincere method explicitly; The Stranger tests that method under coercion, mobility, and exile conditions.',
        lyric_threads: [
            {
                from_signal: 'Memoir excavation plus earnest-in-silence/sincere-when-speaking doctrine.',
                to_signal: 'Paid-service opening, stranger-in-town mobility, and rupture aftermath.',
                interpretation: 'The new method is carried into hostile terrain rather than kept as theory.'
            }
        ],
        narrative_threads: [
            'Handshake phase to departure phase.',
            'Stated identity becomes mobile identity.'
        ],
        sonic_threads: [
            'Resolved cadence pivots to slower, heavier terminal gravity.'
        ],
        reference_threads: [
            'Sincere writers public voice is stress-tested by The Strangers myth/exile framework.'
        ],
        long_range_links: [
            'Pair callback: Sincere Writer <- Earnest Reader (reader-to-writer arc completion).'
        ]
    },
    'track-stranger': {
        track_id: 'track-stranger',
        track_title: 'The Stranger',
        next_track_id: 'track-mantra',
        next_track_title: 'Carry Yuan (Hidden Signal)',
        bridge_summary: 'The Stranger moves from transactional coercion to rupture and relocation; hidden Carry Yuan reframes the arc as explicit research codex.',
        lyric_threads: [
            {
                from_signal: 'Paid-service opening, stranger-in-town line, Camus rupture quote, Beijing endpoint.',
                to_signal: 'To understand, you choose one question... explicit inquiry framework.',
                interpretation: 'After exile, the narrator documents process rather than persona spectacle.'
            }
        ],
        narrative_threads: [
            'Epilogue drift to hidden debrief.',
            'After confrontation, the archive voice takes over.'
        ],
        sonic_threads: [
            'Heavy ending track hands off to hidden codex energy (audio pending).'
        ],
        reference_threads: [
            'Camus and Gregory Isaacs closure motifs hand into philosophy/tech/method synthesis in the hidden track.'
        ],
        long_range_links: [
            'Pair callback: The Stranger <- The Better (soft affirmation eventually reaches forced migration endpoint).'
        ]
    },
    'track-mantra': {
        track_id: 'track-mantra',
        track_title: 'Carry Yuan (Hidden Signal)',
        next_track_id: 'track-hyacinth',
        next_track_title: 'Hyacinth (Pending)',
        bridge_summary: 'Carry Yuan acts as hidden capstone codex and points toward Hyacinth, an unreleased high-school flashback origin node.',
        lyric_threads: [
            {
                from_signal: 'Explicit method language, identity signatures, and origin pressures.',
                to_signal: 'High-school flashback memory frame (pending delivery).',
                interpretation: 'The hidden capstone is positioned to back-link into origin context.'
            }
        ],
        narrative_threads: [
            'Present-tense synthesis opens a route to retrospective origin chapter.',
            'Capstone method prepares prequel memory.'
        ],
        sonic_threads: [
            'Placeholder audio active; final cadence relationship will be locked once Hyacinth exists.'
        ],
        reference_threads: [
            'Philosophy/tech/media density in Carry Yuan is expected to echo into earlier life formation scenes.'
        ],
        long_range_links: [
            'Pending pair: Carry Yuan -> Hyacinth (hidden dyad not complete yet).'
        ]
    }
};

export function getHandoffForTrack(trackId?: string): TrackHandoff | undefined {
    if (!trackId) return undefined;
    return TRACK_HANDOFFS[trackId];
}
