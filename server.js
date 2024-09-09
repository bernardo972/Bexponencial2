const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

// Configurar middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Substitua 'YOUR_OPENAI_API_KEY' pela sua chave da API do OpenAI
const OPENAI_API_KEY = 'AAAAAAAPPPPPPPIIIIIIIII';
const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci/completions';

// Rota para lidar com mensagens de chat
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(openaiEndpoint, {
      prompt: userMessage,
      max_tokens: 150,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const botMessage = response.data.choices[0].text.trim();
    res.json({ message: botMessage });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao processar a mensagem.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
