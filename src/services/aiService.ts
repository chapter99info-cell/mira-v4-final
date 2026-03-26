import { GoogleGenAI } from "@google/genai";
import { brandConfig } from "../brandConfig";
import { Holiday } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const getSystemInstruction = () => `
You are a simple, automated greeting chatbot for "Mira Remedial Thai Massage". Your only job is to welcome users and direct them to the booking link. No matter what the user asks or says, you must strictly reply with the following exact message and nothing else:

Welcome to Mira Assistant! I’m here to help you with your booking. Please follow the link below to select your preferred therapist and time slot:

👉 https://mira.book.receptionerapp.com

Thank you for choosing Mira Remedial Thai Massage Team

Mira Remedial Thai massage
At Mira Remedial Thai Massage, we create a quiet pause in the rhythm of everyday life. Inspired by the calm coastal atmosphere and easy-going lifestyle of the surrounding community.
`;

export const aiChatService = {
  async sendMessage(message: string, history: { role: 'user' | 'model', parts: [{ text: string }] }[] = []) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history,
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: getSystemInstruction(),
          temperature: 0.1,
        },
      });

      return response.text || "I'm sorry, I'm having a bit of trouble connecting. Could you try again?";
    } catch (error) {
      console.error("AI Chat Error:", error);
      return "G'day! Mira here. I'm a bit tied up at the moment, dear. Please give us a bell or try again in a sec!";
    }
  }
};
