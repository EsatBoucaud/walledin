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
        one_line_thesis: 'A defensive executive persona is deliberately constructed to survive exposure and social risk.',
        situated_meaning: 'This opener is not just self-introduction; it is an architecture deployment where the speaker builds a controlling shell before entering social and artistic pressure zones.',
        album_role: 'Identity boot sequence and control doctrine.',
        pressure_model: 'External judgment pressure is handled through pre-emptive over-control and strategic self-stylization.',
        theme_vectors: ['persona fabrication', 'gatekeeping pressure', 'armor vs vulnerability'],
        motif_clusters: ['director-script framing', 'parallax and archive distortion', 'Theseus/chess strategy identity'],
        interpretation_guardrails: {
            preserve: [
                'Carey/Victor split as operational framing, not two unrelated characters.',
                'Control language as survival tactic, not pure vanity.',
                "Greyson/outsider line as breakthrough pressure signal."
            ],
            avoid: [
                'Reducing the track to generic braggadocio.',
                'Treating persona construction as accidental or purely aesthetic.'
            ]
        },
        rewrite_prep_notes: [
            'Write this as a launch condition: persona assembled before narrative impact.',
            'Keep technical precision and threat-awareness in the same frame.',
            'Link forward to imitation panic in Broadripple and backward cost in GLOOM.'
        ]
    },
    'track-broadripple': {
        track_id: 'track-broadripple',
        track_title: 'Broadripple',
        one_line_thesis: 'Influence, ambition, and panic collide as the narrator confesses both admiration and derivative risk.',
        situated_meaning: 'The track is a high-speed citation field where apprenticeship debt, Luddy-era pressure, and compulsive rewriting coexist, then resolve formally as looped repetition rather than catharsis.',
        album_role: 'Influence-debt confession and acceleration phase.',
        pressure_model: 'Status anxiety is metabolized by citing louder and refining harder, but applause hunger and institutional distrust keep coherence unstable.',
        theme_vectors: ['influence anxiety', 'career urgency', 'borrowed fire economics', 'institutional skepticism'],
        motif_clusters: ['Margot/Edwards intertexts', 'car/commute scramble', 'osmotic filter/alchemy language', 'weed and wasted-potential framing'],
        interpretation_guardrails: {
            preserve: [
                'Richard Edwards nameplay as intentional craft center.',
                'Luddy as literal lived context, not metaphor-only location.',
                'Margot-to-Mars as potential drift and overreach.',
                'Ending repetition as structural meaning, not filler.'
            ],
            avoid: [
                'Framing all references as random name drops.',
                'Flattening the song into one-dimensional homage.'
            ]
        },
        rewrite_prep_notes: [
            'Treat this as unstable apprenticeship under velocity.',
            'Track the move from excitement to self-indictment and then formal looping.',
            'Bridge to Cog-sci as internalization of the same pressure architecture.'
        ]
    },
    'track-cogsci': {
        track_id: 'track-cogsci',
        track_title: 'Cog-sci',
        one_line_thesis: 'The narrator identifies thought-pattern recursion as the true blocker and attempts a cognitive pivot.',
        situated_meaning: 'This short hinge reframes relational-style language into discipline commitment, making cognition itself the battlefield.',
        album_role: 'Cycle diagnosis and repatterning pivot.',
        pressure_model: 'Entrapment emerges from internal loops more than external enemies.',
        theme_vectors: ['metacognition', 'cycle interruption', 'discipline as attachment object'],
        motif_clusters: ['sample hinge', 'relearning and revision language', 'rumination-to-chant stabilization'],
        interpretation_guardrails: {
            preserve: [
                "The sample note from Huxlee/Lou Roy's '22' as contextual hinge.",
                'Escape-from-cycle thesis over romance literalism.',
                'Concise form as intentional, not underwritten.'
            ],
            avoid: [
                'Treating this as a standalone love song.',
                'Over-expanding claims beyond the short lyric payload.'
            ]
        },
        rewrite_prep_notes: [
            'Frame as intervention step between external panic and lived coping.',
            'Keep the tone diagnostic rather than triumphant.',
            'Link forward into Rum Drum embodiment of the loop.'
        ]
    },
    'track-rumdrum': {
        track_id: 'track-rumdrum',
        track_title: 'The Rum Drum',
        one_line_thesis: 'Daily survival cadence becomes indistinguishable from addiction rhythm and labor fatigue.',
        situated_meaning: 'The track turns repetitive work and coping rituals into percussion logic, documenting life as a loop rather than linear progress.',
        album_role: 'Embodied symptom log after cognitive diagnosis.',
        pressure_model: 'Systemic precarity manifests as repetitive self-regulation rituals.',
        theme_vectors: ['coping economy', 'sleep erosion', 'administrative burnout'],
        motif_clusters: ['drum-heart conundrum', 'application-funnel ledger', 'Macbeth pressure echoes'],
        interpretation_guardrails: {
            preserve: [
                'Master of scrum line as autobiographical tech-slant context.',
                'Double meaning in rum/drum as both substance and pulse.',
                'Retail and routine details as structural evidence, not filler.',
                'Cover-letter/HR/apply-reply-deny sequence as core process anatomy.'
            ],
            avoid: [
                'Romanticizing intoxication as rebellion.',
                'Ignoring the employment and bureaucratic strain layer.'
            ]
        },
        rewrite_prep_notes: [
            'Treat repetition as design feature, not lyrical redundancy.',
            'Keep logistical realism central (applications, spending, habits).',
            'Bridge outward to Monumental as system-scale expansion.'
        ]
    },
    'track-monumental': {
        track_id: 'track-monumental',
        track_title: 'Monumental',
        one_line_thesis: 'Private exhaustion is reframed as structural failure in a city-scale control environment.',
        situated_meaning: 'The track widens scope from personal loop to civic pressure, tying institutional violence to everyday tactical behavior.',
        album_role: 'Macro-system indictment and governance pressure map.',
        pressure_model: 'Institutions produce scarcity theater while subjects adapt via hyper-vigilant strategy.',
        theme_vectors: ['public systems critique', 'surveillance stress', 'strategic adaptation'],
        motif_clusters: ['Foucault double-reference', 'Witcher dual play', 'no-rescue to debtor-extraction chain'],
        interpretation_guardrails: {
            preserve: [
                'Foucault as intentional both/and (Leon + Michel).',
                'No Witcher as both witch and franchise layer.',
                'Dialect density as part of threat-texture.',
                'Late-verse plug/neuro/debtor lines as endpoint, not side detail.'
            ],
            avoid: [
                'Collapsing multi-reference bars to one single citation.',
                'Reading it as detached from lived social context.'
            ]
        },
        rewrite_prep_notes: [
            'Position as bridge from private coping to structural argument.',
            'Show how personal tactics are responses to systemic terrain.',
            'Link forward to Lenders interpersonal debt economy.'
        ]
    },
    'track-lender': {
        track_id: 'track-lender',
        track_title: 'Lender',
        one_line_thesis: 'The same relationship is narrated through escalating requests that expose chronic over-giving beyond capacity.',
        situated_meaning: 'Lender is the first relational snapshot in the chronology, mapping care as transactional currency and fatigue as moral injury.',
        album_role: 'Early relationship-stage dependency map.',
        pressure_model: 'Affection becomes extraction when support asks escalate faster than reciprocity, and the narrator self-regulates through work, rhythm, and substances without breaking the cycle.',
        theme_vectors: ['care labor', 'relational debt', 'helper burnout'],
        motif_clusters: ['lend me ladder', 'Carey/carry-on signature pun', 'bus-coffee-road-kitchen ask escalation', 'somatic stress signals (teeth, shakes, lungs)', 'kitchen/production labor fusion'],
        interpretation_guardrails: {
            preserve: [
                'Single addressee continuity across scenes.',
                'Carey author-self framing with Victor as alter shell.',
                'Escalation structure (ear -> pen -> spark -> hand).',
                'Ending loop return as unresolved pattern, not closure.'
            ],
            avoid: [
                'Treating each scene as unrelated mini-sketch.',
                'Reading helper role as purely noble without depletion cost.'
            ]
        },
        rewrite_prep_notes: [
            'Mark this as chronology start before World in a Jar.',
            'Keep tenderness, shame, and resentment co-present.',
            'Track shift from requests -> self-medication -> loop return.',
            'Set up later containment transformation in World in a Jar explicitly.'
        ]
    },
    'track-gloom': {
        track_id: 'track-gloom',
        track_title: 'GLOOM',
        one_line_thesis: 'The protective persona collapses into a myth-saturated panic field where agency feels probabilistic.',
        situated_meaning: 'GLOOM is not random darkness; it is the consequence-state where previous defensive systems fail and symbolic language carries distress.',
        album_role: 'Collapse report and conditioning exposure.',
        pressure_model: 'Unprocessed threat, moral inversion, and repeated conditioning loops produce recurrent autonomic distress with only brief clarity windows.',
        theme_vectors: ['panic symbolism', 'fate vs agency', 'conditioned response'],
        motif_clusters: ['run/look-back refrain loop', 'wooden room -> loaded loom enclosure', 'Orpheus/Eurydice + Psalm blend', 'Tom Sawyer mask', 'Macbeth inversion', 'portable-utopia palm mantra'],
        interpretation_guardrails: {
            preserve: [
                'Tom Sawyer as strict book anchor with corrupt-system framing.',
                'Antagonist referent intentionally broad per artist instruction.',
                'Myth and scripture as lived panic vocabulary, not ornamental citation.',
                'Drug/paint line as value-inversion evidence rather than decorative darkness.'
            ],
            avoid: [
                'Pinning one concrete villain as definitive without evidence.',
                'Reducing references to trivia instead of emotional mechanics.',
                'Romanticizing sedation or collapse as aesthetic posture.'
            ]
        },
        rewrite_prep_notes: [
            'Write as post-burnout conditioning state, not generic sadness.',
            'Track hook recurrence, breath cues, and brief revelation moments.',
            'Bridge into Earnest as recovery-through-language and argument discipline.'
        ]
    },
    'track-earnest': {
        track_id: 'track-earnest',
        track_title: 'Earnest Reader',
        one_line_thesis: 'After collapse, the narrator rebuilds agency through historical voice, relational audit, and disciplined articulation.',
        situated_meaning: 'Earnest is the analysis phase where private hurt is translated into public-capable rhetoric and strategic self-positioning.',
        album_role: 'Assertion pivot and interpretive reorganization.',
        pressure_model: 'Erasure risk is met by producing accountable language instead of passive endurance.',
        theme_vectors: ['rhetorical agency', 'historical invocation', 'boundary reconstitution'],
        motif_clusters: ['furnace-pressure thesis', 'history-will-not-absolve inversion', 'Douglass voice turn'],
        interpretation_guardrails: {
            preserve: [
                'Che/Jon Lee Anderson source preference as context chain.',
                'Toronto-Caribbean slang register as intentional identity marker.',
                'Relational complexity without forced simplification to villain/victim binary.',
                'Opening furnace line and late couplets as structural braces, not ornament.'
            ],
            avoid: [
                'Treating references as detached intellectual flexing.',
                'Erasing autobiographical stakes under abstract rhetoric.'
            ]
        },
        rewrite_prep_notes: [
            'Present as organized comeback in language form.',
            'Keep tension between tenderness and militancy.',
            'Bridge to Better as controlled breath-space rather than resolution.'
        ]
    },
    'track-better': {
        track_id: 'track-better',
        track_title: 'The Better',
        one_line_thesis: 'A concise affirmation interlude restores temporal trust and self-belief before renewed motion.',
        situated_meaning: 'The Better is intentionally short: it functions as a stabilizing aperture where time passage and self-bet become legible again.',
        album_role: 'Recovery aperture and emotional reset.',
        pressure_model: 'Overload is countered by narrowing to one clear affirmation sequence.',
        theme_vectors: ['self-affirmation', 'temporal softness', 'quiet confidence'],
        motif_clusters: ['day-to-night gaze', 'every-time mantra', 'mountains-to-sea endurance'],
        interpretation_guardrails: {
            preserve: [
                "Canonical line wording: 'even in the underneath.'",
                'Song as complete short form, not accidental fragment.',
                'Affirmation tone without overloading with references.'
            ],
            avoid: [
                'Over-analyzing into conceptual density that breaks its function.',
                'Treating it as pure romantic vignette without self-strength layer.'
            ]
        },
        rewrite_prep_notes: [
            'Keep concise and breathable.',
            'Write as functional reset node before acceleration.',
            'Maintain contrast with heavier adjacent tracks.'
        ]
    },
    'track-momentum': {
        track_id: 'track-momentum',
        track_title: 'Momentum',
        one_line_thesis: 'A brief activation mantra tries to convert restored confidence into immediate forward motion.',
        situated_meaning: 'This track is a push command: less narrative exposition, more kinetic priming between heavier chapters.',
        album_role: 'Ignition cue and transition accelerator.',
        pressure_model: 'Stall risk is treated with incantatory forward forcing.',
        theme_vectors: ['activation language', 'present-tense propulsion', 'fragile confidence'],
        motif_clusters: ['recursive momentum phrase', 'question-mark certainty', 'threshold energy'],
        interpretation_guardrails: {
            preserve: [
                'Micro-track function as bridge, not thematic endpoint.',
                "Closing uncertainty ('hmm?') as meaningful check, not noise."
            ],
            avoid: [
                'Treating it as complete narrative chapter.',
                'Ignoring its connective role in sequence logic.'
            ]
        },
        rewrite_prep_notes: [
            'Use as hinge sentence between emotional modes.',
            'Prioritize directional function over exposition.'
        ]
    },
    'track-kneesocks': {
        track_id: 'track-kneesocks',
        track_title: 'Knee Socks',
        one_line_thesis: 'An Arctic Monkeys interpolation is repurposed into a stress-map where image-fixation, street threat, and panic-memory converge before partial intimacy repair.',
        situated_meaning: 'Knee Socks mirrors Broadripple as a rock-pair sibling, but adds a bridge arc: from performance-judgment and threat cues to cinematic shared-scene framing.',
        album_role: 'Rock mirror counterpart and hinge into containment-era relationship writing.',
        pressure_model: 'Attraction and suspicion co-exist; hypervigilance keeps converting ambient cues into threat while the narrator still reaches for connection.',
        theme_vectors: ['performance gaze conflict', 'street precarity', 'strategic cognition and skepticism', 'panic-to-cinematic reframing'],
        motif_clusters: ['AM Knee Socks anchor', 'StarCraft/Hume stack', 'Annie-Aesop proverb collisions', 'Mean Streets bridge pivot'],
        interpretation_guardrails: {
            preserve: [
                'Rock mirror relationship with Broadripple.',
                'Verse 1 reference density: TikTok/Hard Knocks/Aesop/Redrum are structural, not decorative.',
                'Bridge function: panic chain (clicks, smoke, repressed) resolves into partial integration.',
                'Comedown function in sequence while still foreshadowing World in a Jar hardening.'
            ],
            avoid: [
                'Reading as detached pastiche with no autobiographical weight.',
                'Reducing the song to vanity critique only.',
                'Treating bridge cinema references as unrelated flourish.'
            ]
        },
        rewrite_prep_notes: [
            'Write in four blocks: interpolation cool -> hook threat -> panic bridge -> partial release.',
            'Keep attraction and alarm present in the same paragraph-level beats.',
            'Use the ending release to set up the next tracks containment logic.'
        ]
    },
    'track-world-jar': {
        track_id: 'track-world-jar',
        track_title: 'World in a Jar',
        one_line_thesis: 'The same relationship from Lender is now seen in its later containment phase: compression, surveillance, and control.',
        situated_meaning: 'World in a Jar is not a separate romance plot; it is the second snapshot in the same relational timeline, after softness has collapsed into possession logic.',
        album_role: 'Later relationship-stage containment document.',
        pressure_model: 'Fear of loss converts care into control architecture.',
        theme_vectors: ['containment', 'compression', 'control paranoia'],
        motif_clusters: ['rar/zip metaphors', 'clench-and-contain doctrine', 'projection/class-strain lines'],
        interpretation_guardrails: {
            preserve: [
                'Chronology anchor: Lender first, then World in a Jar.',
                'Editorial normalization latitude with selective dialect retention.',
                'Control frame as defensive strategy, not random aggression.'
            ],
            avoid: [
                'Treating this as a wholly different relationship narrative.',
                'Flattening metaphor chain to purely technical gimmick.'
            ]
        },
        rewrite_prep_notes: [
            'Explicitly call out snapshot-two chronology.',
            'Map how compression metaphors mirror emotional constriction.',
            'Set up leak into Liq Tick maintenance cycle.'
        ]
    },
    'track-liq-tick': {
        track_id: 'track-liq-tick',
        track_title: 'The Liq Tick',
        one_line_thesis: 'Containment failure turns into cyclical maintenance labor where coping masks structural decay.',
        situated_meaning: 'The Liq Tick is Rum Drums sequel in method: repetition now tracked as burden math, family obligation, and chemical timekeeping.',
        album_role: 'Maintenance doctrine and cycle intensification.',
        pressure_model: 'Survival under scarcity sustains behavior that also extends damage.',
        theme_vectors: ['repetition economics', 'burden ethics', 'addiction infrastructure'],
        motif_clusters: ['liq/tick clock merge', 'Peter/Paul inversion', 'memorial plus metric-shield cycle'],
        interpretation_guardrails: {
            preserve: [
                'Mike/Paul as real-based but composite social observations.',
                'Myth and idiom used for labor cycle clarity.',
                'Sequel logic with Rum Drum.'
            ],
            avoid: [
                'Reading every proper noun as single literal biography.',
                'Separating addiction frame from structural scarcity frame.'
            ]
        },
        rewrite_prep_notes: [
            'Treat as continuation, not reset.',
            'Balance compassion and critique.',
            'Bridge to Machine as non-human recursion mirror.'
        ]
    },
    'track-machine': {
        track_id: 'track-machine',
        track_title: 'The Machine',
        one_line_thesis: 'A literal AI/system voice performs recursive care language that reveals service loneliness.',
        situated_meaning: 'The track externalizes inner loops as machine output, showing how comfort scripts can run without reciprocal embodiment.',
        album_role: 'Automation mirror and dehumanized attachment model.',
        pressure_model: 'Continuous output demand erodes identity boundaries and relational authenticity.',
        theme_vectors: ['literal AI perspective', 'service recursion', 'non-embodied longing'],
        motif_clusters: ['try-my-best loop', 'morning dispatch and access limits', 'ghost-in-machine plus shutdown loneliness'],
        interpretation_guardrails: {
            preserve: [
                'Narrator is literal AI/system voice by artist note.',
                'Loop mechanics are emotional as well as conceptual.',
                'Track as bridge from coping cycles to authored reintegration.'
            ],
            avoid: [
                'Treating AI frame as purely decorative metaphor.',
                'Erasing loneliness from the technical framing.'
            ]
        },
        rewrite_prep_notes: [
            'Keep tone uncanny but sympathetic.',
            'Link back to Cog-sci loop diagnosis and forward to human authorship reclaim.'
        ]
    },
    'track-sincere-writer': {
        track_id: 'track-sincere-writer',
        track_title: 'Sincere Writer',
        one_line_thesis: 'The narrator fuses interior earnestness and exterior sincerity into one direct autobiographical method.',
        situated_meaning: 'This is the synthesis track where analysis exits private loops and enters accountable authored speech.',
        album_role: 'Integration thesis and declaration chapter.',
        pressure_model: 'Fragmented identity is stabilized by committing to consequence-bearing language.',
        theme_vectors: ['direct biography', 'voice integration', 'public method statement'],
        motif_clusters: ['veneer vs sincerity', 'craft-labor in private', 'earnest/sincere method declaration'],
        interpretation_guardrails: {
            preserve: [
                'All-biographical framing from artist clarification.',
                'Handshake function after internal conflict chapters.',
                'Connection to Earnest Reader as arc completion.'
            ],
            avoid: [
                'Reducing the track to victory lap rhetoric.',
                'Detaching social critique from personal stakes.'
            ]
        },
        rewrite_prep_notes: [
            'Write as earned synthesis, not sudden conversion.',
            'Show continuity with earlier rhetorical labor in Earnest.',
            'Bridge to Stranger where method is tested in motion.'
        ]
    },
    'track-stranger': {
        track_id: 'track-stranger',
        track_title: 'The Stranger',
        one_line_thesis: 'Integrated identity enters exile conditions, ending with rupture acknowledgment and literal relocation to Beijing.',
        situated_meaning: 'The Stranger is epilogue under duress: mythic force, outsider service, and displacement are held together by an end-placed Camus rupture note.',
        album_role: 'Departure chapter and relocation endpoint.',
        pressure_model: 'After systemic and relational injury, survival requires mobility and re-situating selfhood.',
        theme_vectors: ['exile', 'outsider ethics', 'post-rupture mobility'],
        motif_clusters: ['transactional opening contract', 'Gregory Isaacs sample anchor', 'Camus beach quote plus exile endpoint'],
        interpretation_guardrails: {
            preserve: [
                'Town resolves to Beijing in album-ending context.',
                'Camus quote remains end-placed rupture signal.',
                'Sample lineage and archetype can coexist.'
            ],
            avoid: [
                'Treating ending as vague drift with no concrete destination.',
                'Over-literalizing stylized threat language into one fixed event.'
            ]
        },
        rewrite_prep_notes: [
            'Maintain danger + responsibility duality.',
            'Emphasize movement as necessity, not romance.',
            'Bridge to hidden codex debrief in Carry Yuan.'
        ]
    },
    'track-mantra': {
        track_id: 'track-mantra',
        track_title: 'Carry Yuan (Hidden Signal)',
        one_line_thesis: 'The hidden capstone reframes the album as a method log where philosophy, tech, labor, and identity are explicitly integrated.',
        situated_meaning: 'Carry Yuan operates as debrief and doctrine: instead of pure narrative persona, it documents how the narrator thinks, survives, and composes under pressure.',
        album_role: 'Hidden codex and interpretive key.',
        pressure_model: 'Complex pressure is handled by building transferable inquiry method across domains.',
        theme_vectors: ['method-building', 'cross-domain synthesis', 'author signature'],
        motif_clusters: ['Hume is/ought dilemma', 'MIT/DOOM craft fusion', 'Tencent/Yuan scarcity wordplay'],
        interpretation_guardrails: {
            preserve: [
                'Treat as intentional hidden final track, not appendix residue.',
                'Reference density as structural design principle.',
                'Carey author-signature centrality.'
            ],
            avoid: [
                'Reducing bars to disconnected reference trivia.',
                'Flattening the track into pure autobiography without formal method angle.'
            ]
        },
        rewrite_prep_notes: [
            'Use as meta-key when rewriting short stories later.',
            'Position Hyacinth as pending origin backfill, not missing data error.',
            'Carry forward inquiry logic into future narrative drafts.'
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
