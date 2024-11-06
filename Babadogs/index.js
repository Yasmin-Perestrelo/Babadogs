import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); 

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat();

app.post('/api/sendMessage', async (req, res) => {
  const { message } = req.body;
  try {
    const result = await chat.sendMessage(message);
    res.json({ reply: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar mensagem." });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
