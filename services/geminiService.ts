
import { GoogleGenAI } from "@google/genai";
import { FundingProposal } from "../types";

export const analyzePipeline = async (data: FundingProposal[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const prompt = `
    Analyze the following social impact funding pipeline for "Socialaw".
    Data: ${JSON.stringify(data)}
    
    Provide exactly 3 strategic, executive-level insights for the CEO. 
    Focus on conversion rates, potential risks, and recommendations for the "Cruzada de las 100".
    Format the response as clear bullet points.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a world-class venture philanthropy consultant and strategist.",
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return "The AI consultant is currently unavailable. Please ensure your strategy session is booked.";
  }
};
