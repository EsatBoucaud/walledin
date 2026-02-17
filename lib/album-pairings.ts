export type PairingStatus = 'active' | 'pending';

export interface AlbumPairing {
    id: string;
    label: string;
    relationship_axis: string;
    track_ids_in_order: [string, string];
    opening_snapshot: string;
    later_snapshot: string;
    connective_thread: string;
    style_links?: string[];
    status: PairingStatus;
}

export interface TrackPairingContext {
    pair_id: string;
    pair_label: string;
    relationship_axis: string;
    track_id: string;
    track_title: string;
    stage_index: 1 | 2;
    stage_label: string;
    partner_track_id: string;
    partner_track_title: string;
    partner_available: boolean;
    opening_snapshot: string;
    later_snapshot: string;
    connective_thread: string;
    style_links: string[];
    status: PairingStatus;
    short_reminder: string;
}

const TRACK_TITLES: Record<string, string> = {
    'track-victor-ep': 'VICTOR',
    'track-gloom': 'GLOOM',
    'track-broadripple': 'Broadripple',
    'track-kneesocks': 'Knee Socks',
    'track-lender': 'Lender',
    'track-world-jar': 'World in a Jar',
    'track-rumdrum': 'The Rum Drum',
    'track-liq-tick': 'The Liq Tick',
    'track-earnest': 'Earnest Reader',
    'track-sincere-writer': 'Sincere Writer',
    'track-better': 'The Better',
    'track-stranger': 'The Stranger',
    'track-cogsci': 'Cog-sci',
    'track-machine': 'The Machine',
    'track-mantra': 'Carry Yuan (Hidden Signal)',
    'track-hyacinth': 'Hyacinth (Hidden - pending)'
};

export const ALBUM_PAIRINGS: AlbumPairing[] = [
    {
        id: 'pair-victor-gloom',
        label: 'Armor and Collapse',
        relationship_axis: 'persona construction -> psychological consequence',
        track_ids_in_order: ['track-victor-ep', 'track-gloom'],
        opening_snapshot: 'Victor builds the executive shell and directs self-image under pressure.',
        later_snapshot: 'Gloom shows the cost: mythic panic loops, conditioning, and threat saturation.',
        connective_thread: 'The same protective persona becomes the engine of suffocation when stress compounds.',
        style_links: ['persona rap architecture', 'mythic/depressive descent'],
        status: 'active'
    },
    {
        id: 'pair-broadripple-kneesocks',
        label: 'Borrowed Fire and Cold Aftermath',
        relationship_axis: 'influence acceleration -> hangover isolation',
        track_ids_in_order: ['track-broadripple', 'track-kneesocks'],
        opening_snapshot: 'Broadripple burns hot with Margot-lineage citation panic and hustle velocity.',
        later_snapshot: 'Knee Socks cools into post-surge introspection, drift, and self-audit.',
        connective_thread: 'Both tracks use rock-referential DNA while shifting from manic ignition to frozen reckoning.',
        style_links: ['Margot and the Nuclear So and So\'s', 'Arctic Monkeys'],
        status: 'active'
    },
    {
        id: 'pair-lender-worldjar',
        label: 'Relation Drift: Open Need to Containment',
        relationship_axis: 'same relationship, early dependence -> later control spiral',
        track_ids_in_order: ['track-lender', 'track-world-jar'],
        opening_snapshot: 'Lender shows early-stage over-giving and repeated asks across one relationship.',
        later_snapshot: 'World in a Jar captures later-stage compression, control, and surveillance inside that same bond.',
        connective_thread: 'Track order defines chronology: Lender first, then World in a Jar as the hardened snapshot.',
        style_links: ['service-economy language', 'containment/compression metaphors'],
        status: 'active'
    },
    {
        id: 'pair-rumdrum-liqtick',
        label: 'Maintenance Loop',
        relationship_axis: 'coping rhythm -> addiction logistics',
        track_ids_in_order: ['track-rumdrum', 'track-liq-tick'],
        opening_snapshot: 'The Rum Drum frames repetitive stress, applications, and self-medication cadence.',
        later_snapshot: 'The Liq Tick extends it into circular burden math and survival varnish logic.',
        connective_thread: 'The same cycle moves from mood-state soundtrack to explicit maintenance doctrine.',
        style_links: ['drum-loop compulsion', 'street-scarcity allegory'],
        status: 'active'
    },
    {
        id: 'pair-earnest-sincere',
        label: 'Reader to Writer',
        relationship_axis: 'private decoding -> public method statement',
        track_ids_in_order: ['track-earnest', 'track-sincere-writer'],
        opening_snapshot: 'Earnest Reader audits coercive loops and rebuilds agency through analysis.',
        later_snapshot: 'Sincere Writer externalizes that work into direct, biographical, consequence-bearing speech.',
        connective_thread: 'The pair tracks an identity shift from interpretation to authored declaration.',
        style_links: ['historical rhetoric anchors', 'memoir-to-manifesto turn'],
        status: 'active'
    },
    {
        id: 'pair-better-stranger',
        label: 'Soft Aperture to Exile Exit',
        relationship_axis: 'affirmation interlude -> migration epilogue',
        track_ids_in_order: ['track-better', 'track-stranger'],
        opening_snapshot: 'The Better offers brief affirmation and temporal soft-focus recovery.',
        later_snapshot: 'The Stranger closes with rupture, relocation (Beijing), and outsider re-entry.',
        connective_thread: 'A short confidence window precedes final displacement and integrated operator stance.',
        style_links: ['time-passage affirmation', 'drifter archetype / end-quote epilogue'],
        status: 'active'
    },
    {
        id: 'pair-cogsci-machine',
        label: 'Cognitive Loop and System Voice',
        relationship_axis: 'thought-pattern diagnosis -> literal AI narrator',
        track_ids_in_order: ['track-cogsci', 'track-machine'],
        opening_snapshot: 'Cog-sci names the cycle trap and desire to repattern thought toward purpose.',
        later_snapshot: 'The Machine performs that tension as a literal service-voice feedback loop.',
        connective_thread: 'The pair reframes internal cognition as externalized machine process.',
        style_links: ['sample hinge track', 'algorithmic refrain structure'],
        status: 'active'
    },
    {
        id: 'pair-carry-hyacinth',
        label: 'Hidden Dyad: Present Codex and Flashback',
        relationship_axis: 'capstone synthesis -> high-school origin memory',
        track_ids_in_order: ['track-mantra', 'track-hyacinth'],
        opening_snapshot: 'Carry Yuan is the hidden capstone method log currently present in the build.',
        later_snapshot: 'Hyacinth is reserved as a high-school flashback counterpart and is not added yet.',
        connective_thread: 'This pair is intentionally incomplete until Hyacinth is delivered and placed.',
        style_links: ['hidden-track architecture', 'origin-story backfill'],
        status: 'pending'
    }
];

const PAIRING_BY_TRACK_ID: Record<string, AlbumPairing> = {};
for (const pairing of ALBUM_PAIRINGS) {
    PAIRING_BY_TRACK_ID[pairing.track_ids_in_order[0]] = pairing;
    PAIRING_BY_TRACK_ID[pairing.track_ids_in_order[1]] = pairing;
}

function titleFor(trackId: string): string {
    return TRACK_TITLES[trackId] || trackId;
}

export function getPairingForTrack(trackId?: string): TrackPairingContext | undefined {
    if (!trackId) return undefined;
    const pairing = PAIRING_BY_TRACK_ID[trackId];
    if (!pairing) return undefined;

    const [firstTrackId, secondTrackId] = pairing.track_ids_in_order;
    const isFirst = trackId === firstTrackId;
    const partnerTrackId = isFirst ? secondTrackId : firstTrackId;
    const stageIndex: 1 | 2 = isFirst ? 1 : 2;

    return {
        pair_id: pairing.id,
        pair_label: pairing.label,
        relationship_axis: pairing.relationship_axis,
        track_id: trackId,
        track_title: titleFor(trackId),
        stage_index: stageIndex,
        stage_label: stageIndex === 1 ? 'opening snapshot' : 'later snapshot',
        partner_track_id: partnerTrackId,
        partner_track_title: titleFor(partnerTrackId),
        partner_available: !partnerTrackId.includes('hyacinth'),
        opening_snapshot: pairing.opening_snapshot,
        later_snapshot: pairing.later_snapshot,
        connective_thread: pairing.connective_thread,
        style_links: pairing.style_links || [],
        status: pairing.status,
        short_reminder: stageIndex === 1
            ? `This is the first half of ${pairing.label}.`
            : `This is the second half of ${pairing.label}.`
    };
}

