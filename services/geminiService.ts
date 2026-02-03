import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Create a persistent chat session
let chatSession: Chat | null = null;
let isQuotaExceeded = false; // Circuit breaker for 429 errors

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getChatSession();
    const result = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the sawdust servers right now. Please try again later.";
  }
};

export const generateProductImage = async (productName: string, description: string): Promise<string | null> => {
  // If we've already hit the rate limit, fail fast to save resources and avoid console spam
  if (isQuotaExceeded) return null;

  try {
    // Check for API key to avoid errors if not set in dev environment
    if (!process.env.API_KEY) return null;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Create a photorealistic product image of a single piece of lumber.
            Product Name: ${productName}
            Material Description: ${description}
            
            Visual Requirements:
            - Show a close-up, angled view of the wood board/post.
            - HIGHLIGHT THE WOOD GRAIN AND GRADE:
              - If the name contains "Knotty" or "STK", show tight, natural knots.
              - If the name contains "Clear" or "CVG", show a smooth, knot-free surface.
              - If it is "Incense Cedar", show rich reddish-brown tones.
              - If it is "Douglas Fir", show the characteristic straight grain and light red/orange hue.
            - Studio lighting, neutral soft white background.
            - The image should look like a material sample from a high-end lumber yard.
            - No text, labels, or watermarks in the image.`
          }
        ]
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error: any) {
    // Check for quota exhaustion (429)
    const isQuotaError = 
      error?.status === 429 || 
      error?.response?.status === 429 || 
      error?.message?.includes('429') || 
      error?.message?.includes('Quota') ||
      error?.message?.includes('RESOURCE_EXHAUSTED') ||
      (error?.error && error.error.code === 429);

    if (isQuotaError) {
      if (!isQuotaExceeded) {
        console.warn("Gemini API Quota Exceeded. Switching to static placeholders for remaining images.");
        isQuotaExceeded = true;
      }
      return null;
    }

    console.error("Image Gen Error:", error);
    return null;
  }
};