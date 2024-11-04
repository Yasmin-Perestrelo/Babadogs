import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config(); // Carrega variáveis de ambiente

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Olá" }],
    },
    {
      role: "model",
      parts: [{ text: "Olá! Como poderia te ajudar?" }],
    },
  ],
});


async function runChat() {
  let result = await chat.sendMessage("Eu tenho dois cachorros na minha casa.");
  console.log(result.response.text());
  
  result = await chat.sendMessage("Quantas patinhas eu tenho na minha casa?");
  console.log(result.response.text());
}


runChat().catch(console.error);
