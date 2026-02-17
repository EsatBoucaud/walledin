type LyricWord = {
    text: string;
    start: number;
};

type LyricLine = {
    text: string;
    words: LyricWord[];
};

type LyricSection = {
    type: string;
    lines: LyricLine[];
};

type LyricPayload = {
    title: string;
    sections: LyricSection[];
};

type SectionSeed = {
    type: string;
    lines: string[];
};

const DEFAULT_WORD_STEP_SECONDS = 0.34;

function lineWithTiming(text: string, startSeconds: number, stepSeconds: number = DEFAULT_WORD_STEP_SECONDS): LyricLine {
    const words = text
        .split(/\s+/)
        .filter(Boolean)
        .map((token, index) => ({
            text: token,
            start: Number((startSeconds + index * stepSeconds).toFixed(2))
        }));

    return {
        text,
        words
    };
}

function buildTimedSections(seeds: SectionSeed[], initialStartSeconds: number = 0): LyricSection[] {
    let cursor = initialStartSeconds;
    return seeds.map((seed) => {
        const lines = seed.lines.map((line) => {
            const timed = lineWithTiming(line, cursor);
            const words = line.split(/\s+/).filter(Boolean).length;
            cursor += Math.max(2.4, words * 0.32 + 0.8);
            return timed;
        });
        cursor += 1.6;
        return { type: seed.type, lines };
    });
}

const TRACK_LYRIC_OVERRIDES: Record<string, LyricPayload> = {
    'track-better': {
        title: 'The Better',
        sections: [
            {
                type: 'Lyrics',
                lines: [
                    lineWithTiming('Getting lost in your eyes, watching the day turn to night.', 0),
                    lineWithTiming('It gets me every time... Every time.', 4.6),
                    lineWithTiming('I am better, from the mountains to the sea,', 7.3),
                    lineWithTiming('I see the vision even in the underneath.', 11.2)
                ]
            }
        ]
    },
    'track-mantra': {
        title: 'Carry Yuan (Hidden Signal)',
        sections: buildTimedSections([
            {
                type: 'Verse 1',
                lines: [
                    'I wander mind storms for a change of scenery,',
                    'I ponder kind forms brains, minds, machinery.',
                    'I blunder find scorn, break confines like Queen Marie,',
                    'I Hunger for more, take back Minds from the Deanery.',
                    'for lore I perused, read some Hume in greenery.',
                    'Ah tour of a muse, rap like DOOM while at MIT.',
                    'I learned to enthuse, Glamoured flume of thought.',
                    '18, with a stammer and the gloom that I brought.',
                    "Train at pace with peers Enamoured, in classrooms we're fraught.",
                    'Gain pace, in tears they clamor, till they bloom or they blot.',
                    'Fail to face myself, programmer Gg2Plot.',
                    'I scale weights under pressure I ampere to the Watt.',
                    'I sought out each use to deduce the thought.',
                    "I'm scalene, with cues, in the lines that I jot.",
                    'I sought out beach views, to compute the dot.',
                    "Carey can't choose, what's an Is from an ought?"
                ]
            },
            {
                type: 'Chorus',
                lines: [
                    'To understand, you choose one question.',
                    'Starts your muse till you lose your direction,',
                    'Parts by hand, leave more room for impression.',
                    'Charts got canned in a sieve of Zoom sessions,',
                    'Research progressions,',
                    'Grieve concessions,',
                    'And no funds doubled pane like Argon.',
                    "Neurons in my brain, I'm Carey Yuan."
                ]
            },
            {
                type: 'Verse 2',
                lines: [
                    'Trapped in a Concept, (Trapped in a Concept - xxxtentacion sample from Carry On)',
                    'Hear the track when I abstract on concepts,',
                    'when I lack context I diffract the words',
                    'Clear thoughts turn to walked steps,',
                    'Lines mentors spoke earn lessons learned.',
                    'I was broke, labeled and burned,',
                    'I spoke affirmed and oak tables turned.',
                    'No Adele,',
                    'Berkeley adjourned with a Lib-Tech Dell. (Ay)',
                    'Right hand rules the passage,',
                    '21 I learn savage.',
                    'Scalable, with them vector graphics,',
                    'Like Unattainable collectors classics,',
                    'Facts is, I pestor your Praxis and I never repeat,',
                    "I distract. I'm a, untraceable Young Cyber Elite.",
                    'EMP, back with the Booster Seat,',
                    'I sought out what I conduce the heat,',
                    'From feedback attack to produce the beat,',
                    'Subtract the Slack, to reduce conceit.',
                    'Contacts talk quick, cause they tik like me.',
                    'Kant lawn talks in slacks watch that flick Wall-E.',
                    'Pawns spawn for combat, 2 - 3 step schemes.',
                    'I stack racks and pack snacks, react with tactile dreams.',
                    "Pullin' Seams."
                ]
            },
            {
                type: 'Chorus (Reprise)',
                lines: [
                    'To understand, you choose one question.',
                    'Starts your muse till you lose your direction,',
                    'Parts by hand, leave more room for impression.',
                    'Charts got canned in a sieve of Zoom sessions,',
                    'Research progressions,',
                    'Grieve concessions,',
                    'And no funds doubled pane like Argon.',
                    'Neurons in my brain, I Carry Yuan.'
                ]
            },
            {
                type: 'Verse 3',
                lines: [
                    "Tryna' Catch Tencent,",
                    "without a shoe on or a Yuan, anybody spare' a ten cents?",
                    'Spin wheels like Temu,',
                    'fortunate son count bills like Un Deux.',
                    "In the streets I'm Boocoo,",
                    'Green sweater-like blues clues,',
                    'stick in a stream no Roku.',
                    'Scream loud like Goku,',
                    'Stuck on a dream-like cloud till I woke you.'
                ]
            }
        ], 0)
    }
};

export function getLyricOverride(trackId: string): LyricPayload | undefined {
    return TRACK_LYRIC_OVERRIDES[trackId];
}
