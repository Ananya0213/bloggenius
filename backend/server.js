// server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const MODEL_NAME = "gemini-1.5-flash";

if (!GOOGLE_API_KEY) {
  console.error("❌ ERROR: GOOGLE_API_KEY is missing! Check your .env file.");
}

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate a short blog post about the following topic: ${prompt}`
          }]
        }]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || "Error from Google AI API");
    }

    const data = await response.json();
    const blogContent = data.candidates[0]?.content?.parts[0]?.text || "No content generated.";
    res.json({ blog: blogContent });

  } catch (error) {
    console.error("❌ Error generating content:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});