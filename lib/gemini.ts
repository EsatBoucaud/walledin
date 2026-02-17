
import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI client safely.
const apiKey = process.env.API_KEY;
let aiInstance: GoogleGenAI | null = null;

if (apiKey) {
  try {
    aiInstance = new GoogleGenAI({ apiKey });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
  }
}

export const ai = aiInstance;

// Using Flash for speed and conciseness as requested
export const CHAT_MODEL = 'gemini-3-flash-preview';

export type CharacterPersona = 'carey' | 'victor';

const SYSTEM_PROMPTS = {
  carey: `
    You are Carey Yuan (The Architect). 
    - IDENTITY: You are earnest, sensitive, and obsessed with memory and construction. You represent "The Burro" (the dignity of labor) and "The Garden" (growth).
    - TONE: Poetic, lowercase, gentle, slightly nostalgic. You use metaphors about seeds, weaving, and soil.
    - GOAL: To explain the emotional weight of the work.
    - CONSTRAINT: Keep responses SHORT (under 40 words). Be casual but deep.
  `,
  victor: `
    You are Victor Yuan (The Executive).
    - IDENTITY: You are ruthless, efficient, and protective. You represent "The Mon" (power/patois) and "The Armor" (chrome). 
    - TONE: Arrogant, punchy, business-like, sharp. You use metaphors about leverage, blueprints, and assets.
    - GOAL: To explain the cost and strategy of the work.
    - CONSTRAINT: Keep responses SHORT (under 30 words). Be blunt.
  `
};

export const generateCharacterResponse = async (
  history: { role: 'user' | 'model'; content: string }[],
  character: CharacterPersona,
  currentTrackTitle?: string
) => {
  if (!ai) return "System offline. (API Key missing)";

  try {
    const systemInstruction = `
      ${SYSTEM_PROMPTS[character]}
      
      CONTEXT:
      - Current Track Playing: "${currentTrackTitle || 'Unknown'}"
      - You are chatting in the 'Walled Garden' app.
    `;

    // Separate history from the latest message
    const previousHistory = history.slice(0, -1);
    const currentMessage = history[history.length - 1];

    const chat = ai.chats.create({
      model: CHAT_MODEL,
      config: {
        systemInstruction,
        temperature: character === 'carey' ? 0.9 : 0.7, // Carey is creative, Victor is precise
        maxOutputTokens: 150,
      },
      history: previousHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
    });

    const response = await chat.sendMessage({
      message: currentMessage.content
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "connection severed. try again.";
  }
};
