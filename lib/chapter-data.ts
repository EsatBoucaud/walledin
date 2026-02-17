
import React from 'react';
import { ASSET_BASE } from './data';

export type ChallengeType = 'tuner' | 'slide-puzzle' | 'tile-swap' | 'construction' | 'memory' | 'lyric-scramble' | 'visual-quiz';

export interface PuzzleData {
  id: string;
  question: string;
  answer: string;
  hint: string;
}

export interface ChallengeData {
  id: string;
  type: ChallengeType;
  title: string;
  description: string;
  hint?: string;
  points: number; // Gamification
  tunerData?: {
    targetFrequency: number;
    tolerance: number;
    quote: string;
    author: string;
    topic: string;
  };
  slideData?: {
    imageUrl: string;
    gridSize: number;
  };
  swapData?: {
    imageUrl: string;
    gridSize: number;
  };
  constructionData?: {
    imageUrl: string;
    gridSize: number;
  };
  memoryData?: {
    images: string[];
    gridSize: number; // usually 4 for 4x4
  };
  scrambleData?: {
    phrase: string; 
    distractors?: string[]; 
  };
  visualQuizData?: {
    imageUrl: string;
    question: string;
    options: string[];
    correctIndex: number;
    cropStyle: React.CSSProperties; 
  };
}

export const LORE_BIBLE = {
    title: "The Furnace and the Veneer",
    subtitle: "A Dialectical Study of Victor Yuan",
    abstract: "This collection operates as a Generative Adversarial Network (GAN) in narrative form, pitting two distinct psychological frameworks against one another to simulate the erosion of the human spirit under late-stage capitalism.",
    sections: {
        dynamics: "Carey Yuan (The Architect) represents the human ideal. Victor Yuan (The Executive) is the vehicle for that intent.",
        themes: "The Contamination of Intimacy, Chronos vs. Kairos, Phonetic Mechanization.",
        cultural: "Heritage: Jamaican-Chinese/Trinidadian."
    },
    carey: {
        role: "The Architect / The Earnest Reader",
        philosophy: "Believes in the inherent dignity of labor. A socialist at heart.",
        flaw: "Earnestness.",
        markers: "Reeds, Beads, Books, Soft Textures."
    },
    victor: {
        role: "The Executive / The Sincere Villain",
        philosophy: "Views the world as a script to be rewritten. Believes Earnestness is a liability.",
        flaw: "Possessiveness.",
        markers: "Clocks, Locks, Sprockets, Steel."
    }
};

export const TRACK_STORIES: Record<string, { title: string; segments: string[] }> = {
  'track-victor-ep': {
      title: "I. THE HOSTILE TAKEOVER",
      segments: ["Let's be clear: I didn't ask to be born.", "I kicked the door open. Not physically—Carey was still standing there wiping his face.", "This track isn't a song; it's a deployment sequence.", "Carey hates me, you know. He thinks I'm cynical."]
  },
  'track-broadripple': {
      title: "II. THE BURNING SUBURB",
      segments: ["I remember the smell of burning leaves in Indiana.", "This was the peak of the 'Accelerant' phase.", "The line 'Get rich off your Ed'—it was a jab at Richard Edwards.", "I felt like the whole town was on fire."]
  },
  'track-cogsci': {
      title: "III. THE KERNEL PANIC",
      segments: ["I sat in the library until the motion sensors turned the lights off.", "It was the ultimate intellectual arrogance.", "But the 'Confined tomb of designs' is real.", "This track is the sound of a brain eating itself."]
  },
  'track-rumdrum': {
      title: "IV. THE LIQUID ASSET",
      segments: ["Carey calls it 'addiction.' I call it 'overhead.'", "The 'Rum Drum' isn't a metaphor.", "I admit, it got messy.", "Carey whines about the 'wood rot'."]
  },
  'track-monumental': {
      title: "V. THE BURSAR'S OFFICE",
      segments: ["There is no monster in the closet. The monster is in the mailbox.", "I remember the day we walked into the administrative building.", "I took over at the front desk.", "The drums on this track sound industrial because they are."]
  },
  'track-lender': {
      title: "VI. THE OVERDRAFT FACILITY",
      segments: ["It's embarrassing to admit, but for a long time, I measured my worth by how useful I was to other people.", "There was this one bus ride.", "The line 'Can you lend me an ear?'—it sounds sweet, right?", "When the beat drops out and it's just that hollow, metallic synth..."]
  },
  'track-gloom': {
      title: "VII. THE WINTER SILENCE",
      segments: ["Carey thinks this song is about a girl. It's not.", "He stopped eating. He stopped sleeping.", "I was furious.", "This track sounds broken because it is."]
  },
  'track-earnest': {
      title: "VIII. THE QUIET REBELLION",
      segments: ["Victor wants to build skyscrapers. He wants to conquer.", "I wrote this watching a stranger in Union Square.", "It felt like a revolution.", "This track is my defense."]
  },
  'track-better': {
      title: "IX. THE CASINO",
      segments: ["Carey calls this 'romance.' I call it 'unsecured gambling.'", "But... I allowed it.", "So I let him roll the dice."]
  },
  'track-momentum': {
      title: "X. THE CORNOER SUITE",
      segments: ["This is it. The peak. The mania.", "But listen closely to the lyrics.", "I told Carey: 'Don't look down.'"]
  },
  'track-kneesocks': {
      title: "XI. THE COLD FRONT",
      segments: ["And then the crash happened.", "Knee Socks is the hangover.", "I tried to make it sound cool."]
  },
  'track-world-jar': {
      title: "XII. THE CONTAINMENT PROTOCOL",
      segments: ["I had to intervene.", "It was a perfect system.", "I thought I was protecting him."]
  },
  'track-liq-tick': {
      title: "XIII. THE MAINTENANCE LOOP",
      segments: ["The Jar was leaking.", "The 'Liq Tick' is the sound of a clock that runs on alcohol.", "It wasn't living. It was maintenance."]
  },
  'track-machine': {
      title: "XIV. THE AUTOMATON",
      segments: ["I forgot my own name.", "'You know I try my best.'", "The beat here is relentless."]
  },
  'track-sincere-writer': {
      title: "XV. THE TRUCE",
      segments: ["Something broke.", "We stopped fighting.", "We met in the middle.", "This track is the handshake."]
  },
  'track-stranger': {
      title: "XVI. THE EXIT",
      segments: ["I am not Carey. I am not Victor.", "I have absorbed them both.", "The town is burning."]
  },
  'track-mantra': {
      title: "XVII. THE HIDDEN SIGNAL",
      segments: ["You found it.", "This is the research log under the album shell.", "Carey is speaking without armor."]
  },
  'default': {
      title: "CORRUPTED LOG",
      segments: ["Sector 7G data missing.", "Reconstructing narrative from 'metal scraps'.", "Please verify 'checksum'."]
  }
};

export const PUZZLES: PuzzleData[] = [
  {
    id: 'p1',
    question: "What is the name of the closed ecosystem Victor is trapped in?",
    answer: "Walled Garden",
    hint: "It's the title of the app."
  }
];

export const CHALLENGES: ChallengeData[] = [
  {
    id: 'jigsaw-construct-victor',
    type: 'construction',
    title: 'IDENTITY ASSEMBLY',
    description: "Reconstruct the fragmented identity. Drag pieces from the bank to the grid.",
    hint: "Drag and drop the pieces. Match 'outie' tabs to 'innie' sockets on the edges.",
    points: 600,
    constructionData: {
        imageUrl: `${ASSET_BASE}/Posters/1.webp`,
        gridSize: 3
    }
  },
  {
    id: 'memory-posters',
    type: 'memory',
    title: 'MNEMONIC RECALL',
    description: "Match the visual artifacts. Find the pairs.",
    hint: "Look for color patterns: Red is Broadripple, Gold is Cog-Sci.",
    points: 500,
    memoryData: {
        images: [
            `${ASSET_BASE}/Posters/3.webp`, // Broadripple
            `${ASSET_BASE}/Posters/4.webp`, // CogSci
            `${ASSET_BASE}/Posters/6.webp`, // RumDrum
            `${ASSET_BASE}/Posters/11.webp`, // Monumental
            `${ASSET_BASE}/Posters/9.webp`, // Lender
            `${ASSET_BASE}/Posters/13.webp`, // Earnest
        ],
        gridSize: 4
    }
  },
  {
    id: 'slide-glitch-1',
    type: 'slide-puzzle',
    title: 'NEURAL DEFRAGMENT',
    description: "Slide the tiles to restore the memory block.",
    hint: "The empty slot allows movement. Restore the burning house.",
    points: 400,
    slideData: {
      imageUrl: `${ASSET_BASE}/Posters/3.webp`,
      gridSize: 3
    }
  },
  {
    id: 'tuner-hauntology',
    type: 'tuner',
    title: 'SIGNAL RECOVERY',
    description: "Tune the frequency to isolate the author's intent.",
    hint: "The frequency lies in the lower bass range, near 82Hz.",
    points: 250,
    tunerData: {
      targetFrequency: 82.4,
      tolerance: 1.5,
      topic: "HAUNTOLOGY",
      author: "Mark Fisher",
      quote: "We are haunted by futures that failed to happen."
    }
  },
  {
    id: 'tile-swap-sincere',
    type: 'tile-swap',
    title: 'SYNTHESIS RESTORATION',
    description: "Swap the tiles to fix the glitch in the 'Sincere Writer' data.",
    hint: "Click one tile, then another to swap positions.",
    points: 400,
    swapData: {
        imageUrl: `${ASSET_BASE}/Posters/14.webp`,
        gridSize: 3
    }
  },
  {
    id: 'scramble-victor-1',
    type: 'lyric-scramble',
    title: 'LYRIC SYNTAX LOCK',
    description: "Reorder the glitched text to match the opening line of Track 01.",
    hint: "The director controls the screenplay.",
    points: 300,
    scrambleData: {
        phrase: "Victor Yuan a director flip a script like Rob Reiner"
    }
  },
  {
    id: 'visual-quiz-rum',
    type: 'visual-quiz',
    title: 'RETINA SCAN',
    description: "Identify the track associated with this visual fragment.",
    hint: "Look for the distortion. It looks like water or liquid.",
    points: 400,
    visualQuizData: {
        imageUrl: `${ASSET_BASE}/Posters/6.webp`,
        question: "Which track is represented by this visual texture?",
        options: ["The Rum Drum", "Broadripple", "Lender", "Gloom"],
        correctIndex: 0,
        cropStyle: { top: '30%', left: '40%', width: '200%', height: '200%' } // Zoom in
    }
  }
];
