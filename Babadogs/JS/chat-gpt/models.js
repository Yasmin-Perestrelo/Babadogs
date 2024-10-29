const axios = require('axios');

const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/models'

const prompt = 'Fale sobre as maiores doenças que cachorros normalmente possuem';

axios.get(apiUrl, {
    headers: {
        'Content-Type': 'application/Jason',
        'Authorization': `Bearer ${apiKey}`
    }
})

    .then(response => {
        console.log(response.data.data.map(i => i.id))
    })
    .catch(error => console.log(error));