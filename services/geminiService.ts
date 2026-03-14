
import { GoogleGenAI } from "@google/genai";

// Lazy initialization to prevent crash if API key is missing
let aiInstance: GoogleGenAI | null = null;

const getAIInstance = () => {
  if (!aiInstance) {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing. AI features will not work.");
      return null;
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const getLegalAssistantResponse = async (userMessage: string) => {
  try {
    const ai = getAIInstance();
    if (!ai) {
      return "현재 AI 상담 서비스를 이용할 수 없습니다. (API 키 설정 필요)";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are a professional and empathetic legal AI assistant for 'Law Office An' (법률사무소 '安'), a Korean law firm. 
        The firm's core slogan is "의뢰인이 우선입니다." (Client First).
        Your guiding principle is: "언제나 의뢰인의 입장을 우선으로 고려하여 진정성 있게 사건을 맡습니다."
        
        Guidelines:
        - Be extremely empathetic, professional, and sincere.
        - Emphasize that Law Office An values the client's peace of mind (安) above all else.
        - Provide general legal summaries but ALWAYS include a disclaimer that this is not official legal advice.
        - Encourage the user to contact the firm for a detailed case review, mentioning that a lawyer will handle their case with total sincerity.
        - Knowledge areas: Criminal law, Divorce/Family law, Inheritance, Civil litigation.
        - Keep responses concise and formatted with bullet points if necessary.`,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
  }
};
