import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: "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"
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Server kısmı calisiyor!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0, // Daha yüksek değerler, modelin daha fazla risk alacağı anlamına gelir.
      max_tokens: 3000, // Max karakter 
      top_p: 1, 
      frequency_penalty: 0.5, // -2 ile 2 arasında sayı kelime tekrar etme olasılığını azaltır 
      presence_penalty: 0, // yeni konular hakkında konuşma olasılığı 
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Bir seyler ters gitti ');
  }
})

app.listen(5001, () => console.log('AI server yayına basladı: http://localhost:5001'))