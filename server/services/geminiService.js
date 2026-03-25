// import dotenv from "dotenv";
// dotenv.config();
// import OpenAI from "openai";

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const generateFromAI = async (userPrompt) => {
//   const systemPrompt = `
// You are a Chrome Extension Generator.

// Return ONLY JSON:

// {
//   "manifest": "",
//   "content": "",
//   "popup_html": "",
//   "popup_js": ""
// }
// `;

//   const response = await client.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//       { role: "system", content: systemPrompt },
//       { role: "user", content: userPrompt }
//     ],
//   });

//   return JSON.parse(response.choices[0].message.content);
// };


import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

console.log(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateFromAI = async (userPrompt) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

  const prompt = `
You are a Chrome Extension Generator.

Return ONLY JSON:

{
  "manifest": "",
  "content": "",
  "popup_html": "",
  "popup_js": ""
}

User Request:
${userPrompt}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return JSON.parse(text);
};