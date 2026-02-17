import { getPairingForTrack, TrackPairingContext } from './album-pairings';
import { getHandoffForTrack, TrackHandoff } from './track-handoffs';

export interface TrackMeaningEntry {
    track_id: string;
    track_title: string;
    one_line_thesis: string;
    situated_meaning: string;
    album_role: string;
    pressure_model: string;
    theme_vectors: string[];
    motif_clusters: string[];
    interpretation_guardrails: {
        preserve: string[];
        avoid: string[];
    };
    rewrite_prep_notes: string[];
}

export interface ContextualizedTrackMeaning {
    meaning: TrackMeaningEntry;
    pairing?: TrackPairingContext;
    handoff?: TrackHandoff;
}

export const TRACK_MEANING_ATLAS: Record<string, TrackMeaningEntry> = {
    'track-victor-ep': {
        track_id: 'track-victor-ep',
        track_title: 'VICTOR',
        one_line_thesis: 'I build Victor as a defensive operating shell so I can enter public space without pretending vulnerability is safe.',
        situated_meaning: 'The opener is a method deployment: I dissect records, stage myself in ritual/film language, and rehearse tactical recurrence before influence debt appears in Broadripple.',
        album_role: 'Identity boot sequence, process declaration, and control doctrine.',
        pressure_model: 'Gatekeeping, economic uncertainty, and surveillance weather are managed through pre-emptive role partitioning, coded writing, and portable coping rituals.',
        theme_vectors: ['persona fabrication', 'archive dissection', 'gatekeeping pressure', 'economic masking', 'armor vs vulnerability'],
        motif_clusters: ['director-script framing', 'parallax and archive distortion', 'forge and iron-lung breath', 'planner-spanner and scanner-scrap engineering diction', 'creases/spiral pattern cognition', 'clock-skew and soot-sky surveillance'],
        interpretation_guardrails: {
            preserve: [
                'Carey/Victor split as operational framing, not two unrelated characters.',
                'Control language as survival tactic, not pure vanity.',
                "Greyson/outsider line as breakthrough pressure signal.",
                'Mid-verse engineering and lab imagery as core method evidence, not filler.',
                'Closing recurrence as intentional workload replay, not accidental duplication.'
            ],
            avoid: [
                'Reducing the track to generic braggadocio.',
                'Treating persona construction as accidental or purely aesthetic.',
                'Ignoring money/coping bars as if the opener were detached from lived logistics.'
            ]
        },
        rewrite_prep_notes: [
            'Write this as a launch condition: shell assembled before contact with the influence economy.',
            'Keep film/philosophy references interlocked with labor and body-cost imagery.',
            'Track the progression explicitly: direction -> distortion -> forge breath -> tactical recurrence.',
            'Keep first-person accountability visible even when Victor lens is most stylized.',
            'Link forward to Broadripple citation debt and backward cost in GLOOM.'
        ]
    },
    'track-broadripple': {
        track_id: 'track-broadripple',
        track_title: 'Broadripple',
        one_line_thesis: 'I confess that influence and ambition are fused in me, and the confession itself keeps looping because derivative risk never fully settles.',
        situated_meaning: 'Broadripple is my acceleration chamber: Luddy commute pressure, Richard Edwards citation debt, extraction-cost imagery, and insomnia lock-picking all run at once, then resolve as formal repetition instead of release.',
        album_role: 'Influence-debt confession, acceleration phase, and Cog-sci precursor.',
        pressure_model: 'Status anxiety is metabolized through louder citation, denser craft stacks, and compulsive rewriting, but applause hunger and institutional distrust prevent stable closure.',
        theme_vectors: ['influence anxiety', 'career urgency', 'borrowed fire economics', 'institutional skepticism', 'insomnia compulsion', 'extraction-tax accounting'],
        motif_clusters: ['Margot/Edwards intertexts', 'Luddy commute scramble', 'Sybil and Moloch instability cues', 'osmotic filter/alchemy language', 'orchard/peach borrowing tax', 'Freud/Skeleton lock-picking insomnia', 'full-section repeat closure refusal'],
        interpretation_guardrails: {
            preserve: [
                'Richard Edwards nameplay as intentional craft center.',
                'Luddy as literal lived context, not metaphor-only location.',
                'Margot-to-Mars as potential drift and overreach.',
                'Ending repetition as structural meaning, not filler.',
                'Compulsion bars as method evidence, not comic throwaways.',
                'First-person accountability while citations proliferate.'
            ],
            avoid: [
                'Framing all references as random name drops.',
                'Flattening the song into one-dimensional homage.',
                'Treating extraction and insomnia images as detached side plots.'
            ]
        },
        rewrite_prep_notes: [
            'Treat this as unstable apprenticeship under velocity.',
            'Track the move from excitement to self-indictment, extraction tax, and then formal looping.',
            'Keep lock-picking/sleep-loss language tied to cognition pressure, not only scene color.',
            'Bridge to Cog-sci as internalization of the same pressure architecture.',
            'Use sequence markers so readers can follow the shift from citation field to mind-level diagnosis.'
        ]
    },
    'track-cogsci': {
        track_id: 'track-cogsci',
        track_title: 'Cog-sci',
        one_line_thesis: 'I name rumination/perseveration loops as my blocker and repurpose romance syntax into a cognitive retraining commitment.',
        situated_meaning: "This short hinge internalizes Broadripple's external citation panic, then I exit in chant form so Rum Drum can inherit the unresolved loop as lived routine.",
        album_role: 'Cycle diagnosis and repatterning pivot.',
        pressure_model: 'Entrapment emerges from recursive thought habits; I only move forward by procedural retraining, not cathartic declaration.',
        theme_vectors: ['metacognition', 'cycle interruption', 'discipline as attachment object', 'self-coaching through repetition', 'unfinished-task residue', 'if-then behavior retraining'],
        motif_clusters: ['22 sample provenance', 'relearning/revision language', 'rumination and perseveration diagnostics', 'Zeigarnik unfinished-loop tension', 'implementation-intention reset logic', 'call-and-response chant exit'],
        interpretation_guardrails: {
            preserve: [
                'Opening Cog-sci title line as explicit method declaration.',
                "The sample note from Huxlee/Lou Roy's '22' as contextual hinge.",
                'Escape-from-cycle thesis over romance literalism.',
                'Concise form as intentional, not underwritten.',
                'Chant ending as exit vector into Rum Drum, not decorative loop.',
                'Keep Zeigarnik-style unfinished tension tied to stuck-loop phrasing, not detached psych jargon.'
            ],
            avoid: [
                'Treating this as a standalone love song.',
                'Over-expanding claims beyond the short lyric payload.'
            ]
        },
        rewrite_prep_notes: [
            'Frame as intervention step between external panic and lived coping.',
            'Keep the tone diagnostic rather than triumphant.',
            'Track the structure explicitly: declaration -> relearn -> stuck-loop -> chant.',
            'Link forward into Rum Drum embodiment of the loop.',
            'Anchor one line-level note to implementation-intention logic so retraining reads as method, not wishful tone.'
        ]
    },
    'track-rumdrum': {
        track_id: 'track-rumdrum',
        track_title: 'The Rum Drum',
        one_line_thesis: 'Insomnia administration turns life into an audited loop where rejection logs, coping purchases, and cashflow triage share one drum pattern.',
        situated_meaning: 'Rum Drum operationalizes Cog-sci\'s diagnosis: checksum failure, ATS-style silence, CVS-level coping rituals, and busking fallback are all written as one repeating labor score.',
        album_role: 'Embodied labor ledger and macro-escalation trigger.',
        pressure_model: 'Hiring funnels, contingent work, and scarcity math force constant micro-regulation; each tactic preserves motion for a day but does not resolve the system generating the loop.',
        theme_vectors: ['insomnia governance', 'bureaucratic depersonalization', 'contingent labor precarity', 'coping logistics', 'cashflow triage', 'shame-to-endurance conversion'],
        motif_clusters: ['nightly conundrum plus ra-puh refrain', 'checksum and CSV/CV depersonalization', 'cover-letter and HR hover loop', 'market-mascot versus architecture craft split', 'dash-cam cancellation archive', 'pawn-the-mic Friday-tip cycle', 'adjunct wage/pages squeeze', 'lime-bitters ritual control', 'Macbeth pressure echo'],
        interpretation_guardrails: {
            preserve: [
                'Master of scrum line as autobiographical tech-slant context.',
                'Double meaning in rum/drum as both substance and pulse.',
                'Retail and routine details as structural evidence, not filler.',
                'Cover-letter/HR/apply-reply-deny sequence as core process anatomy.',
                'Checksum line as integrity-failure framing, not throwaway tech jargon.',
                'Busking and pawn-the-mic bars as survival economics, not romance.'
            ],
            avoid: [
                'Romanticizing intoxication as rebellion.',
                'Ignoring the employment and bureaucratic strain layer.',
                'Reading the alliterative stacks as style-only with no queue-overload meaning.',
                'Treating rejection archive lines as isolated self-pity instead of methodical coping.'
            ]
        },
        rewrite_prep_notes: [
            'Treat repetition as design feature, not lyrical redundancy.',
            'Keep logistical realism central (applications, spending, habits).',
            'Track the pressure sequence explicitly: conundrum -> admin funnel -> coping ledger -> fallback hustle -> endurance dance.',
            'Show how checksum/data-row language converts personal disappointment into systems language.',
            'Bridge outward to Monumental as system-scale expansion without dropping first-person stake.'
        ]
    },
    'track-monumental': {
        track_id: 'track-monumental',
        track_title: 'Monumental',
        one_line_thesis: 'A self-priming chant maps how visibility, governance, and debt extraction turn daily life into pressure-vessel management.',
        situated_meaning: 'Monumental expands Rum Drum outward: mushrooms and chant frame spread conditions, broken-nose/cello and dreadlocks-in-scope hold body plus surveillance, and the song lands on burro labor feeding debtors before handing that logic to Lender.',
        album_role: 'Macro-pressure doctrine and civic-to-intimate hinge.',
        pressure_model: 'When institutions externalize risk, subjects rotate through bravado, vigilance, and dependency channels to stay functional while value is continuously extracted.',
        theme_vectors: ['civic extraction', 'surveillance visibility', 'diasporic register pressure', 'dependency infrastructure', 'care vacuum politics', 'performance versus craft tension'],
        motif_clusters: ['monumental mental chant priming', 'mushroom propagation ecology', 'Pinocchio/Geppetto creator scarcity', 'broken-nose and cello split', 'dual Foucault control frame', 'Papin pressure-cooker engineering', 'Witcher no-rescue recurrence', 'Twitter jitter and feed infestation', 'euro-drain plus guitar-string tension', 'burro-to-debtors endpoint'],
        interpretation_guardrails: {
            preserve: [
                'Foucault as intentional both/and (Leon + Michel).',
                'No Witcher as both witch and franchise layer.',
                'Dialect density as part of threat-texture.',
                'Late-verse plug/neuro/debtor lines as endpoint, not side detail.',
                'Mushroom hook as propagation model, not random psychedelic garnish.',
                'Broken-body and high-craft images in the same frame (broken nose/cello).'
            ],
            avoid: [
                'Collapsing multi-reference bars to one single citation.',
                'Reading it as detached from lived social context.',
                'Flattening the chant into pure boast without extraction aftermath.',
                'Treating visibility lines as vibe-only rather than targeting and control.'
            ]
        },
        rewrite_prep_notes: [
            'Position as bridge from private coping to structural argument.',
            'Preserve the movement: chant ecology -> surveillance targeting -> dependency channels -> debtor endpoint.',
            'Keep body-level images and policy-level critique interlocked in each section.',
            'Carry no-rescue and extraction grammar directly into Lender\'s ask economy.',
            'Make the Lender handoff explicit: macro debt doctrine contracts into one relationship timeline.'
        ]
    },
    'track-lender': {
        track_id: 'track-lender',
        track_title: 'Lender',
        one_line_thesis: 'I narrate one relationship through escalating asks that expose how my care work outruns my capacity.',
        situated_meaning: 'Lender is my first chronology snapshot: ear -> pen -> spark -> hand, with body-strain details and a looped ending that refuses false closure.',
        album_role: 'Early relationship-stage dependency map.',
        pressure_model: 'When reciprocity lags, I overcompensate with labor, rhythm, and chemical self-regulation; each tactic buys a short runway day but preserves the extraction loop.',
        theme_vectors: ['care labor', 'relational debt', 'request escalation', 'helper burnout', 'self-medication logistics', 'looped dependency'],
        motif_clusters: ['lend me ladder (ear -> pen -> spark -> hand)', 'Carey/carry-on signature pun', 'bus-coffee-road-kitchen scene progression', 'somatic stress signals (teeth, shakes, lungs, BPM)', 'kitchen/production labor fusion', 'loop-return closure refusal'],
        interpretation_guardrails: {
            preserve: [
                'Single addressee continuity across scenes.',
                'Carey author-self framing with Victor as alter shell.',
                'Escalation structure (ear -> pen -> spark -> hand).',
                'Ending loop return as unresolved pattern, not closure.',
                'First-person fatigue accounting as core evidence, not optional flavor.'
            ],
            avoid: [
                'Treating each scene as unrelated mini-sketch.',
                'Reading helper role as purely noble without depletion cost.',
                'Forcing a clean villain/victim split that erases mutual complexity and asymmetry timing.'
            ]
        },
        rewrite_prep_notes: [
            'Mark this as chronology start before World in a Jar.',
            'Keep tenderness, shame, and resentment co-present.',
            'Track shift from requests -> self-medication -> loop return.',
            'Thread body markers directly into the GLOOM handoff (breath, panic, conditioning).',
            'Set up later containment transformation in World in a Jar explicitly.',
            'Do not let rhetorical polish erase transactional details that prove the burden.'
        ]
    },
    'track-gloom': {
        track_id: 'track-gloom',
        track_title: 'GLOOM',
        one_line_thesis: 'I show my defensive shell collapsing into a conditioned panic field, then track how even my refuge rituals keep folding back into threat.',
        situated_meaning: 'GLOOM is my consequence-state log: run-loop alarms, wooden-room to loaded-loom escalation, right-lab/elixir-to-conjecture drift, legal-threshold fear staging, and palm-mantra relief that keeps degrading into qualm.',
        album_role: 'Collapse report and conditioning exposure.',
        pressure_model: 'When the antagonist field stays broad, I oscillate between flight commands, maker-guilt explanations, sedation substitutions, and micro-refuge routines; each brief clarity event appears, then gets reabsorbed by conditioning.',
        theme_vectors: ['panic symbolism', 'fate vs agency', 'conditioned response', 'enclosure architecture', 'maker responsibility', 'chemical value inversion', 'legal-threat proximity', 'micro-refuge collapse'],
        motif_clusters: ['run/look-back refrain loop', 'wooden room -> loaded loom escalation', 'scientist/elixir/conjecture control drift', 'hands-from-paint-to-drugs value inversion', 'Orpheus/Eurydice plus Psalm 23 blend', 'Tom Sawyer foyer/lawyer threshold staging', 'Macbeth inversion', 'storm-charm-on-hull survival iconography', 'portable-utopia palm mantra plus qualm reprise', 'Pavlov close as handoff condition'],
        interpretation_guardrails: {
            preserve: [
                'Tom Sawyer as strict book anchor with corrupt-system framing.',
                'Antagonist referent intentionally broad per artist instruction.',
                'Myth and scripture as lived panic vocabulary, not ornamental citation.',
                'Drug/paint line as value-inversion evidence rather than decorative darkness.',
                'Elixir/conjecture drift as control failure evidence, not random wordplay.',
                'First-person witness stays intact even when references scale beyond autobiography.'
            ],
            avoid: [
                'Pinning one concrete villain as definitive without evidence.',
                'Reducing references to trivia instead of emotional mechanics.',
                'Romanticizing sedation or collapse as aesthetic posture.',
                'Treating the hook reprise as redundant when it is the behavioral proof.',
                'Reading palm-mantra language as full recovery instead of temporary emergency regulation.'
            ]
        },
        rewrite_prep_notes: [
            'Write as post-burnout conditioning state, not generic sadness.',
            'Track hook recurrence, breath cues, and brief revelation moments as separate phases.',
            'Keep wooden-room and loaded-loom progression explicit as escalation, not duplicate imagery.',
            'Treat right-lab/elixir/conjecture language as method breakdown, not clever texture.',
            'Keep legal-threshold lines (foyer/lawyer/knife) tied to relational threat realism.',
            'Bridge into Earnest as recovery-through-language and argument discipline.',
            'Show how panic-loop closure forces the next track to start as rhetoric intervention.'
        ]
    },
    'track-earnest': {
        track_id: 'track-earnest',
        track_title: 'Earnest Reader',
        one_line_thesis: 'After GLOOM, I rebuild agency by converting panic residue into accountable rhetoric, relational audit, and boundary language.',
        situated_meaning: 'Earnest is my analysis phase: furnace-pressure sincerity, history-will-not-absolve warning, crodie/clemency rupture accounting, revolver-memory shock, overlap logic via Venn language, and a Douglass-anchored voice turn that still preserves tenderness.',
        album_role: 'Assertion pivot and interpretive reorganization.',
        pressure_model: 'Erasure risk is met by producing accountable language instead of passive endurance; I hold coercion memory and contract pressure in frame while lowering chaos into deliberate syntax.',
        theme_vectors: ['rhetorical agency', 'historical invocation', 'boundary reconstitution', 'memory-shock integration', 'mercy withdrawal accounting', 'care-and-conflict cohabitation'],
        motif_clusters: ['furnace-pressure thesis', 'history-will-not-absolve inversion', 'crodie + clemency withdrawal lane', 'revolver-in-December memory block', 'nose-lines versus picket-stability contrast', 'Venn-overlap cognition', 'quantum-time versus dotted-line contract', 'Douglass voice turn', 'sorrow/sparrow compression close'],
        interpretation_guardrails: {
            preserve: [
                'Che/Jon Lee Anderson source preference as context chain.',
                'Toronto-Caribbean slang register as intentional identity marker.',
                'Relational complexity without forced simplification to villain/victim binary.',
                'Opening furnace line and late couplets as structural braces, not ornament.',
                'Clemency and dotted-line wording as explicit accountability mechanics.',
                'First-person continuity with GLOOM rather than detached analytic narrator.'
            ],
            avoid: [
                'Treating references as detached intellectual flexing.',
                'Erasing autobiographical stakes under abstract rhetoric.',
                'Treating Better handoff as emotional amnesia.',
                'Flattening coercion-memory bars into cinematic flourish with no structural consequence.'
            ]
        },
        rewrite_prep_notes: [
            'Present as organized comeback in language form.',
            'Keep tension between tenderness and militancy.',
            'Sequence the movement explicitly: furnace -> warning -> rupture memory -> overlap -> defiant voice -> miniature close.',
            'Keep clemency, revolver, and dotted-line details as proof points, not side imagery.',
            'Bridge to Better as controlled breath-space rather than resolution.',
            'Treat Better as a tactical cooldown that still carries Earnest subtext.'
        ]
    },
    'track-better': {
        track_id: 'track-better',
        track_title: 'The Better',
        one_line_thesis: 'I use a compact affirmation reset to restore workable trust without denying stress, creating Momentum\'s launch window.',
        situated_meaning: 'The Better is intentionally short: day-to-night gaze, every-time repetition, mountains-to-sea range claim, and underneath vision clause cool Earnest\'s rhetorical heat into breathable focus before motion restarts.',
        album_role: 'Recovery aperture and motion prep.',
        pressure_model: 'Overload is managed through micro-dose reassurance: repeated lines stabilize attention just enough to act while doubt and cortisol carryover remain acknowledged.',
        theme_vectors: ['self-affirmation', 'temporal softness', 'fragile trust repair', 'diurnal reset', 'pre-ignition focus'],
        motif_clusters: ['day-to-night gaze', 'every-time reliability loop', 'light epizeuxis-style reassurance repetition', 'mountains-to-sea merism', 'underneath vision clause', 'short-form cooldown architecture', 'handoff to Momentum'],
        interpretation_guardrails: {
            preserve: [
                "Canonical line wording: 'even in the underneath.'",
                'Song as complete short form, not accidental fragment.',
                'Affirmation tone without overloading with references.',
                'Sequence function: Earnest cooldown here, Momentum ignition next.',
                'Keep vulnerability present so the cortisol handoff still feels earned.',
                'Keep first-person continuity explicit despite minimal lyric payload.'
            ],
            avoid: [
                'Over-analyzing into conceptual density that breaks its function.',
                'Treating it as pure romantic vignette without self-strength layer.',
                'Smoothing it into triumphant closure that ignores surrounding pressure.',
                'Cutting Earnest subtext so the Momentum jump feels unmotivated.'
            ]
        },
        rewrite_prep_notes: [
            'Keep concise and breathable.',
            'Write as functional reset node before acceleration.',
            'Maintain contrast with heavier adjacent tracks.',
            'Keep one citation-linked note per major phrase so brevity still stays evidentiary.',
            'Explicitly wire the final line into Momentum invocation and cortisol naming.',
            'Treat repetition as a deliberate pre-ignition drill, not filler.'
        ]
    },
    'track-momentum': {
        track_id: 'track-momentum',
        track_title: 'Momentum',
        one_line_thesis: 'A stress-loaded ignition mantra uses epizeuxis and cortisol naming to convert fragile recovery into immediate movement.',
        situated_meaning: 'This track is intentionally tiny but not minor: it is a boot command between The Better and Knee Socks, where motion starts before fear is gone.',
        album_role: 'Ignition cue and transition accelerator.',
        pressure_model: 'Freeze risk is managed through present-tense self-command; cortisol naming keeps activation tied to body cost and accumulated stress load.',
        theme_vectors: ['activation language', 'present-tense propulsion', 'fragile confidence', 'somatic stress mobilization', 'self-audit punctuation'],
        motif_clusters: ['vocative invocation', 'recursive momentum phrase', 'epizeuxis emphasis', 'cortisol body-state cue', 'question-mark self-check', 'activation-threshold logic'],
        interpretation_guardrails: {
            preserve: [
                'Micro-track function as bridge, not thematic endpoint.',
                "Closing uncertainty ('hmm?') as meaningful check, not noise.",
                'Stress physiology framing as lived urgency, not hype decoration.',
                'Direct handoff role into Knee Socks emotional weather.',
                'Carey first-person self-coaching tone over detached narrator tone.'
            ],
            avoid: [
                'Treating it as complete narrative chapter.',
                'Ignoring its connective role in sequence logic.',
                'Flattening it into motivational slogan language that erases cortisol cost.'
            ]
        },
        rewrite_prep_notes: [
            'Use as hinge sentence between emotional modes.',
            'Prioritize directional function over exposition.',
            'Keep line-level notes tied to invocation -> recursion -> cortisol -> hmm sequence.',
            'Anchor every interpretation to bridge function before and after this track.'
        ]
    },
    'track-kneesocks': {
        track_id: 'track-kneesocks',
        track_title: 'Knee Socks',
        one_line_thesis: 'I repurpose an Arctic Monkeys interpolation into a stress-map where image fixation, transit panic, and memory distortion collide before partial intimacy repair.',
        situated_meaning: 'Knee Socks mirrors Broadripple as a rock-pair sibling, but this pass adds the underexplained deluxe spine: drift opener, city-transit hyperarousal, station-haze regulation, and cinematic bridge reconciliation that stays incomplete.',
        album_role: 'Rock mirror counterpart and hinge into containment-era relationship writing.',
        pressure_model: 'Attraction and suspicion co-exist; I keep converting ambient cues into threat while still reaching for connection, so each local calm becomes provisional and prone to procedural hardening.',
        theme_vectors: ['performance gaze conflict', 'street precarity', 'strategic cognition and skepticism', 'transit hypervigilance', 'optics distortion continuity', 'panic-to-cinematic reframing'],
        motif_clusters: ['AM Knee Socks anchor', 'raft/adrift and gaffs self-audit lane', 'StarCraft/Hume skeptic stack', 'darkroom plus metonymy refusal', 'Annie-Aesop proverb collisions', 'VCR frame-jitter memory image', 'station-haze patience chamber', 'Mean Streets bridge pivot'],
        interpretation_guardrails: {
            preserve: [
                'Rock mirror relationship with Broadripple.',
                'Verse 1 reference density: TikTok/Hard Knocks/Aesop/Redrum are structural, not decorative.',
                'Bridge function: panic chain (clicks, smoke, repressed) resolves into partial integration.',
                'Comedown function in sequence while still foreshadowing World in a Jar hardening.',
                'Carey first-person witness even when Victor lens language becomes tactical.'
            ],
            avoid: [
                'Reading as detached pastiche with no autobiographical weight.',
                'Reducing the song to vanity critique only.',
                'Treating bridge cinema references as unrelated flourish.',
                'Skipping deluxe transit sections that carry key regulation-to-collapse evidence.'
            ]
        },
        rewrite_prep_notes: [
            'Write in six blocks: interpolation cool -> hook threat -> transit overload -> station regulation -> panic bridge -> partial release.',
            'Keep attraction and alarm present in the same paragraph-level beats.',
            'Use darkroom/VCR/lens language to thread memory distortion as process, not ornament.',
            'Keep the Rum Drum callback visible so coping continuity is traceable.',
            'Use the ending release to set up the next tracks containment logic.'
        ]
    },
    'track-world-jar': {
        track_id: 'track-world-jar',
        track_title: 'World in a Jar',
        one_line_thesis: 'My Lender relationship reappears in containment mode: I use compression, projection, and surveillance as defensive governance, then that system starts failing.',
        situated_meaning: 'World in a Jar is my second relationship snapshot, where clench-and-control language (sprocket/docket, mirror-not-face, eyes-to-glass) turns panic into policy before leaking into maintenance behavior.',
        album_role: 'Later relationship-stage containment document.',
        pressure_model: 'Fear of abandonment and status exposure converts my care into enclosure logic; constant visibility and projection intensify instead of stabilizing trust.',
        theme_vectors: ['containment', 'compression', 'projection defense', 'surveillance gaze', 'class pressure', 'panoptic self-policing', 'imagined-judgment identity pressure'],
        motif_clusters: ['rar/zip metaphors', 'sprocket-docket procedure stack', 'mirror-not-face projection', 'looking-glass pressure loop', 'eyes-to-glass display enclosure', 'ajar blocked-exit paradox'],
        interpretation_guardrails: {
            preserve: [
                'Chronology anchor: Lender first, then World in a Jar.',
                'Editorial normalization latitude with selective dialect retention.',
                'Control frame as defensive strategy, not random aggression.',
                'Counter-voice moments where containment is resisted, not silently accepted.',
                'Keep panopticon/looking-glass references tied to specific lines, not free-floating theory.'
            ],
            avoid: [
                'Treating this as a wholly different relationship narrative.',
                'Flattening metaphor chain to purely technical gimmick.',
                'Treating projection language as objective partner description.'
            ]
        },
        rewrite_prep_notes: [
            'Explicitly call out snapshot-two chronology.',
            'Map how compression metaphors mirror emotional constriction.',
            'Track the shift from panic scene -> procedural control -> backlash.',
            'Set up leak into Liq Tick maintenance cycle.',
            'Keep at least one line-level thread from eyes-to-glass into later metric self-surveillance bars.'
        ]
    },
    'track-liq-tick': {
        track_id: 'track-liq-tick',
        track_title: 'The Liq Tick',
        one_line_thesis: 'After containment fails, my survival becomes a chemical-maintenance loop where quick fixes preserve function while decay deepens.',
        situated_meaning: 'The Liq Tick extends Rum Drum with tighter material language (epoxy, shim, varnish, lock-pick) and explicit burden math (Peter/Paul, memorial grief, metric self-defense), then I hand off a desensitization-ready pressure state to The Machine.',
        album_role: 'Maintenance doctrine and cycle intensification.',
        pressure_model: 'Scarcity and workload pressure reward short-term optimization, so my repair rituals and dosing strategies keep immediate function alive while compounding long-term harm.',
        theme_vectors: ['repetition economics', 'burden ethics', 'addiction infrastructure', 'quick-fix materiality', 'grief logistics', 'pain management drift', 'variable-ratio reward chasing', 'harm-reduction triage'],
        motif_clusters: ['liq/tick clock merge', 'epoxy-shim quick-fix lexicon', 'Peter/Paul inversion', 'variable-ratio coin-slot chase', 'retrograde weather-rewind line', 'fission-chain stress image', 'memorial plus metric-shield cycle', 'allostatic wear carryover', 'Sisyphus recurrence carryover'],
        interpretation_guardrails: {
            preserve: [
                'Mike/Paul as real-based but composite social observations.',
                'Myth and idiom used for labor cycle clarity.',
                'Sequel logic with Rum Drum.',
                'Chemical-planning lines as control attempt, not glamorous precision.',
                'Treat harm-reduction and allostatic-load language as context for cost, not medicalized absolution.'
            ],
            avoid: [
                'Reading every proper noun as single literal biography.',
                'Separating addiction frame from structural scarcity frame.',
                'Treating repair vocabulary as decorative texture only.'
            ]
        },
        rewrite_prep_notes: [
            'Treat as continuation, not reset.',
            'Balance compassion and critique.',
            'Track section flow: quick fix -> burden idiom -> memorial -> metric shield -> flashback.',
            'Bridge to Machine as non-human recursion mirror.',
            "Track late pain-management language so Machine's hurt-to-numbness shift lands as continuity, not jump cut.",
            'Keep one explicit line-citation from coin-slot chase into machine-loop persistence so the reinforcement logic stays visible.'
        ]
    },
    'track-machine': {
        track_id: 'track-machine',
        track_title: 'The Machine',
        one_line_thesis: 'A literal AI/service voice loops reassurance, blunts pain under load, and cuts off mid-output, exposing how high responsiveness can fail reciprocity and eventually fail itself.',
        situated_meaning: "The Machine translates prior human coping cycles into process form: retry-style try-my-best output, scheduler dispatch, explicit phone-distance limits, a 'doesn't hurt me' desensitization turn, and final truncated failure that keeps the mirror personal rather than abstract.",
        album_role: 'Automation mirror and intimacy-limit audit.',
        pressure_model: 'Continuous availability pressure forces interface-first behavior; as load persists, affect is blunted for continuity and the final output degrades into fail-stop collapse while embodiment and mutual holding remain impossible.',
        theme_vectors: ['literal AI perspective', 'service recursion', 'non-embodied longing', 'asynchronous boundary-setting', 'parasocial misread', 'availability-performance fatigue', 'desensitization under load', 'fail-stop collapse signal'],
        motif_clusters: ['try-my-best retry loop', 'morning scheduler dispatch', "don't-wait by phone command", 'ghost-in-machine distance', 'sleep-mode desire persistence', 'ELIZA-friction intimacy gap', 'colors-hurt to doesnt-hurt transition', 'mid-word cutoff fail-stop'],
        interpretation_guardrails: {
            preserve: [
                'Narrator is literal AI/system voice by artist note.',
                'Loop mechanics are emotional as well as conceptual.',
                'Track as bridge from coping cycles to authored reintegration.',
                'Boundary language as structural limit, not cruelty flex.',
                'Distinguish responsiveness from reciprocity in every section.',
                "Treat the hurt-to-doesn't-hurt line as adaptive numbing, not healed attachment."
            ],
            avoid: [
                'Treating AI frame as purely decorative metaphor.',
                'Erasing loneliness from the technical framing.',
                'Reading repeated lines as filler rather than process design.',
                'Romanticizing machine compliance as healthy intimacy.',
                'Treating the final truncation as random artifact with no narrative function.'
            ]
        },
        rewrite_prep_notes: [
            'Keep tone uncanny but sympathetic.',
            'Link scheduler/async language to the prior track\'s chemical scheduling.',
            'Link back to Cog-sci loop diagnosis and forward to human authorship reclaim.',
            'Make the do-not-wait boundary central, not a side lyric.',
            "Track sequence explicitly: retry loop -> boundary statement -> dream pain -> pain blunting -> fail-stop cutoff.",
            'Keep endpoint isolation explicit so Sincere Writer lands as a human response, not a tonal reset.'
        ]
    },
    'track-sincere-writer': {
        track_id: 'track-sincere-writer',
        track_title: 'Sincere Writer',
        one_line_thesis: 'Carey collapses interior earnestness and exterior sincerity into one consequence-bearing first-person method.',
        situated_meaning: 'Sincere Writer is the declaration chapter where anti-veneer thesis, seam-intervention language, confession-cost bars, and notes-as-proof lines become one operating protocol.',
        album_role: 'Integration thesis and declaration chapter.',
        pressure_model: 'Image-economy pressure is countered by logged confession, targeted structural intervention, and disciplined revision under exhaustion.',
        theme_vectors: ['direct biography', 'voice integration', 'public method statement', 'confession as labor', 'revision as wound care'],
        motif_clusters: ['veneer vs sincerity', 'craft-labor in private', 'seam-siren-viable-beam escalation', 'mess/confess plus steel-cost image', 'notes-in-silence proof-of-life', 'earnest/sincere method declaration'],
        interpretation_guardrails: {
            preserve: [
                'All-biographical framing from artist clarification.',
                'Handshake function after internal conflict chapters.',
                'Connection to Earnest Reader as arc completion.',
                'Carey/Victor as one authorial voice with lens shifts, not separate narrators.',
                'Mid-verse escalation as intentional sequence, not ornamental rhyme sprint.'
            ],
            avoid: [
                'Reducing the track to victory lap rhetoric.',
                'Detaching social critique from personal stakes.',
                'Reading confession language as branding instead of cost-bearing evidence.'
            ]
        },
        rewrite_prep_notes: [
            'Write as earned synthesis, not sudden conversion.',
            'Show continuity with earlier rhetorical labor in Earnest.',
            'Map the sequence clearly: anti-veneer -> memoir sparring -> seam intervention -> confession cost -> notes/silence -> doctrine close.',
            'Bridge to Stranger where this method is tested in motion.'
        ]
    },
    'track-stranger': {
        track_id: 'track-stranger',
        track_title: 'The Stranger',
        one_line_thesis: 'I stress-test my integrated voice under coercion and exile, then mark Beijing relocation as consequence rather than metaphor.',
        situated_meaning: 'The Stranger is my duress epilogue: paid-contract opening, jury/Hades adjudication, scan/scry vigilance, stingers-and-gold extraction math, approached-or-appreciated trust injury, keys/counter accountability, and a Camus rupture quote that locks the Beijing exit.',
        album_role: 'Consequence chapter, migration endpoint, and hidden-codex launchpad.',
        pressure_model: 'When coercive dynamics persist, I alternate between calibrated force, sedation, vigilance, and ledger-keeping; mobility becomes survival logistics rather than aesthetic drift.',
        theme_vectors: ['exile', 'coercion contract', 'outsider ethics', 'rupture accountability', 'sedation under conflict', 'value extraction', 'threat sensing', 'migration logistics'],
        motif_clusters: ['Cohen transaction echo opening', 'jury plus Hades/Furies adjudication frame', 'scan-and-scry dual detection stack', 'stingers-in-a-gland somatic alarm', 'gold-panning low-yield intimacy metaphor', 'approached-or-appreciated trust injury', 'keys/counter mistakes ledger', 'Gregory Isaacs sample anchor', 'Camus beach rupture quote', 'Beijing endpoint specificity'],
        interpretation_guardrails: {
            preserve: [
                'Town resolves to Beijing in album-ending context.',
                'Camus quote remains end-placed rupture signal.',
                'Sample lineage and archetype can coexist.',
                'Carey first-person accountability even when mythic language spikes.',
                'Service-contract opening should remain coercion-aware, not romanticized dominance.',
                'Keys/counter couplet should carry both escape impulse and accountability ledger function.'
            ],
            avoid: [
                'Treating ending as vague migration drift with no concrete destination.',
                'Treating the track as generic outlaw fantasy detached from coercion dynamics.',
                'Over-literalizing stylized threat language into one fixed event.',
                'Treating coercion lines as purely performative with no autobiographical stake.',
                'Turning intoxication lines into swagger while ignoring injury and maladaptive coping.',
                'Detaching the ending from its handoff into Carry Yuan method doctrine.'
            ]
        },
        rewrite_prep_notes: [
            'Write as accountability log after rupture, not as mystery epilogue.',
            'Track the sequence: contract -> adjudication -> vigilance -> extraction injury -> keys/counter -> Camus -> Beijing.',
            'Keep body-cost lines (stingers, inebriation) and moral accounting lines in the same paragraph beats.',
            'Preserve Camus quote as an end-cap consequence marker, not a mid-song flourish.',
            'Bridge explicitly to Carry Yuan by showing how counter-ledger pressure becomes one-question process discipline.'
        ]
    },
    'track-mantra': {
        track_id: 'track-mantra',
        track_title: 'Carry Yuan (Hidden Signal)',
        one_line_thesis: 'I close the album by turning rupture history into method doctrine, signing my name while indexing the still-unreleased origin chapter.',
        situated_meaning: 'Carry Yuan is my hidden systems notebook: Mindstorms/Papert opening, deanery pushback, Hume is/ought conflict, MIT-DOOM craft braid, ampere-to-watt conversion logic, scalene/diffraction self-modeling, Tencent/ten-cents scarcity bars, and final Carey Yuan signature that points directly to Hyacinth.',
        album_role: 'Hidden codex, methodology key, and origin-index bridge.',
        pressure_model: 'I handle overload by narrowing questions, building by hand, pruning workflow noise, and preserving authorship trace; unresolved adolescent formation is queued for Hyacinth as evidence, not bonus lore.',
        theme_vectors: ['method-building', 'cross-domain synthesis', 'author signature', 'origin indexing', 'institutional gatekeeping resistance', 'STEM-to-poetics transfer', 'class-scarcity accounting', 'workflow triage'],
        motif_clusters: ['Mindstorms double-coding', 'deanery and classroom capture resistance', 'Hume is/ought pressure engine', 'MIT plus MF DOOM apprenticeship braid', 'ampere-to-watt pressure conversion', 'scalene and diffraction self-model', 'single-question heuristic', 'parts-by-hand anti-slop doctrine', 'Zoom attrition and Slack pruning', 'Tencent/Temu/Yuan scarcity cluster', "Blue's Clues and Goku/Cloud wake-up blend", 'Carry On sample provenance and Carey Yuan signature'],
        interpretation_guardrails: {
            preserve: [
                'Treat as intentional hidden final track, not appendix residue.',
                'Reference density as structural design principle.',
                'Carey author-signature centrality.',
                'Pending Hyacinth linkage as intentional architecture, not metadata failure.',
                'Keep technical bars tied to lived conditions, not detached trivia.',
                'Keep deanery, ampere/watt, scalene, and diffraction bars line-anchored rather than summary-merged.'
            ],
            avoid: [
                'Reducing bars to disconnected reference trivia.',
                'Flattening the track into pure autobiography without formal method angle.',
                'Detaching process language from emotional and scarcity stakes.',
                'Describing pending-origin connections as placeholder admin language.',
                "Treating childhood-media callbacks (Blue's Clues, Goku/Cloud) as joke filler disconnected from pressure narrative."
            ]
        },
        rewrite_prep_notes: [
            'Map the sequence: Mindstorms opening -> school pressure -> philosophy conflict -> process doctrine -> scarcity math -> signature close.',
            'Keep at least one line-level citation in each sequence block so method claims remain evidence-bound.',
            'Preserve explicit continuity from Stranger damage ledger into Mantra method ledger.',
            'Position Hyacinth as origin-evidence backfill for claims made here, not optional lore.',
            'When Hyacinth lands, verify that one-question, stammer/gloom, and scarcity bars are tied to concrete early scenes.'
        ]
    }
};

export function getTrackMeaning(trackId?: string): TrackMeaningEntry | undefined {
    if (!trackId) return undefined;
    return TRACK_MEANING_ATLAS[trackId];
}

export function getContextualizedTrackMeaning(trackId?: string): ContextualizedTrackMeaning | undefined {
    const meaning = getTrackMeaning(trackId);
    if (!meaning) return undefined;
    return {
        meaning,
        pairing: getPairingForTrack(trackId),
        handoff: getHandoffForTrack(trackId)
    };
}

export function listTrackMeanings(): TrackMeaningEntry[] {
    return Object.values(TRACK_MEANING_ATLAS);
}
