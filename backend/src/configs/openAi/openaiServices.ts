import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askGPT = async (text) => {
  const prompt = `
Extract multiple-choice questions from the following text and return ONLY in this JSON format:

[
  {
    "question": "What is the capital of France?",
    "options": ["Paris", "London", "Berlin", "Rome"],
    "correctAnswer": "Paris"
  },
  ...
]

Text:
${text}
`;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o", // or "gpt-3.5-turbo"
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that extracts MCQ questions.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = chatCompletion.choices[0].message.content;
    return JSON.parse(content);
  } catch (err) {
    console.error("OpenAI error:", err);
    return [];
  }
};
