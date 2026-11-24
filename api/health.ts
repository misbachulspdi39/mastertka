import { GoogleGenAI } from '@google/genai';

interface VercelReq {
  method?: string;
}

interface VercelRes {
  status: (code: number) => { json: (data: unknown) => void };
}

export default function handler(_req: VercelReq, res: VercelRes) {
  const apiKey = process.env.GEMINI_API_KEY;
  const aiConfigured = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY');
  // Touch GoogleGenAI reference only when needed
  void GoogleGenAI;
  res.status(200).json({ ok: true, aiConfigured });
}
