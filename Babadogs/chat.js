// import dotenv from 'dotenv';

// import { GoogleGenerativeAI } from '@google/generative-ai';

// dotenv.config(); // Carrega variáveis de ambiente

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// const chat = model.startChat({
//   history: [
//     {
//       role: "user",
//       parts: [{ text: "Olá" }],
//     },
//     {
//       role: "model",
//       parts: [{ text: "Olá! Como poderia te ajudar?" }],
//     },
//   ],
// });


// async function runChat() {
//   let result = await chat.sendMessage("Eu tenho dois cachorros na minha casa.");
//   console.log(result.response.text());
  
//   result = await chat.sendMessage("Quantas patinhas eu tenho na minha casa?");
//   console.log(result.response.text());
// }


// runChat().catch(console.error);

import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import readline from 'readline';

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

// Configura o readline para ler a entrada do usuário no terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function runChat() {
  console.log("Oi! Sou seu assistente virtual do Babadog's e estou aqui para ajudar 😊. Para começarmos, é só enviar uma mensagem. E, quando quiser encerrar a conversa, digite 'sair'. Vamos lá?");

  while (true) {
    // Captura a entrada do usuário
    const question = await new Promise(resolve => {
      rl.question("Você: ", resolve);
    });

    // Encerra o loop se o usuário digitar 'sair'
    if (question.toLowerCase() === 'sair') {
      console.log("Conversa encerrada.");
      rl.close();
      break;
    }

    // Envia a pergunta do usuário para o modelo
    const result = await chat.sendMessage(question);
    console.log("Babadog's:", result.response.text());
  }
}

runChat().catch(console.error);
