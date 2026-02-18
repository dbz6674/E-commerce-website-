import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: req.body.message }],
  });

  res.json({ reply: response.choices[0].message.content });
});

app.listen(process.env.PORT || 3000);
