import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.API_KEY });

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cors());

app.get("/", (req,res)=> {
    res.send("App is Working Properly");
});

app.post('/generate-image', async (req, res) => {
    const { prompt, n ,size } = req.body;
    try {
      const image = await openai.images.generate({
        prompt,
        n,
        size
      });
      
      res.json(image.data);
      console.log(image.data)
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.listen(PORT, () => {
    console.log("Listening on PORT", PORT);
});