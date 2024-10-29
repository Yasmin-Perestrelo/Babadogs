require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';

const prompt = 'Fale sobre as maiores doenças que cachorros normalmente possuem';

async function makeRequest(retries = 3, delay = 2000) {
    try {
        const response = await axios.post(apiUrl, {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.8,
            max_tokens: 64,
            top_p: 1
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        console.log(response.data.choices[0].message.content);
    } catch (error) {
        if (error.response && error.response.status === 429 && retries > 0) {
            console.log(`Rate limit exceeded. Retrying in ${delay}ms...`);
            setTimeout(() => makeRequest(retries - 1, delay * 2), delay); 
        } else {
            console.error('Erro:', error.message);
        }
    }
}

// Chama a função para fazer a requisição
makeRequest();
