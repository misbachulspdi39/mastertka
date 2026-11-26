import { GoogleGenAI } from '@google/genai';

interface VercelReq {
  method?: string;
  body?: {
    question?: {
      grade?: string;
      subject?: string;
      topic?: string;
      stimulusText?: string;
      questionText?: string;
      options?: string[];
      correctAnswer?: string;
    };
    studentAnswer?: string;
    studentProfile?: {
      name?: string;
      grade?: string;
    };
  };
}

interface VercelRes {
  status: (code: number) => { json: (data: unknown) => void };
}

function getGeminiKeys(): string[] {
  return [
    process.env.GEMINI_API_KEY,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
  ].filter((k): k is string => Boolean(k && k !== 'MY_GEMINI_API_KEY'));
}

async function callGroqExplain(systemInstruction: string, prompt: string): Promise<string> {
  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) {
    throw new Error('GROQ_API_KEY belum terpasang.');
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    signal: AbortSignal.timeout(5500),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${groqKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: prompt },
      ],
      max_tokens: 800,
      temperature: 0.5,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq error (${response.status}): ${errText}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return data.choices?.[0]?.message?.content?.trim() || '';
}

export default async function handler(req: VercelReq, res: VercelRes) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const geminiKeys = getGeminiKeys();
  const groqKey = process.env.GROQ_API_KEY;

  if (geminiKeys.length === 0 && !groqKey) {
    res.status(503).json({
      error: 'Layanan AI belum aktif karena API Key belum terpasang di server.',
    });
    return;
  }

  try {
    const { question, studentAnswer, studentProfile } = req.body || {};

    if (!question || !question.questionText) {
      res.status(400).json({ error: 'Data soal tidak lengkap.' });
      return;
    }

    const gradeLabel = studentProfile?.grade === 'SD' ? 'SD Kelas 6' : 'SMP Kelas 9';
    const studentName = studentProfile?.name?.trim() || 'Cah Bagus/Ayu';
    const systemInstruction =
      'Kamu adalah Kak Mentor, guru les privat ramah asal Yogyakarta. Jelaskan analisis soal secara sabar, runtut, dan mudah dipahami siswa.';

    const prompt = `Siswa (${studentName}, ${gradeLabel}) meminta analisis soal TKA/TKAD DIY:
Mata Uji: ${question.subject} | Topik: ${question.topic}
Stimulus: ${question.stimulusText}
Pertanyaan: ${question.questionText}
${Array.isArray(question.options) ? `Pilihan:\n${question.options.join('\n')}` : ''}
Jawaban Siswa: ${studentAnswer || 'Tidak menjawab'} | Kunci: ${question.correctAnswer}

Berikan penjelasan singkat, jelas, dan terstruktur:
1. **Bedah Petunjuk Penting di Soal**
2. **Langkah Penyelesaian Rinci & Jebakan Pengecoh**
3. **Tips Cepat Menghadapi Soal Serupa di TKAD DIY**`;

    // 1. Jalur cepat utama jika Groq terpasang (< 1 detik)
    if (groqKey) {
      try {
        const groqAnalysis = await callGroqExplain(systemInstruction, prompt);
        if (groqAnalysis) {
          res.status(200).json({
            analysis: groqAnalysis,
            modelUsed: 'groq-llama-3.3-70b',
          });
          return;
        }
      } catch {
        // Lanjut otomatis ke Gemini jika Groq gagal
      }
    }

    // 2. Fallback ke Gemini dengan rotasi API Key
    for (let i = 0; i < geminiKeys.length; i++) {
      try {
        const ai = new GoogleGenAI({ apiKey: geminiKeys[i] });
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction,
            maxOutputTokens: 750,
            thinkingConfig: { thinkingBudget: 0 },
          },
        });
        res.status(200).json({
          analysis: response.text?.trim() || '',
          modelUsed: `gemini-3.8-flash (key-${i + 1})`,
        });
        return;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes('503') || msg.includes('UNAVAILABLE') || msg.includes('429')) {
          await new Promise((resolve) => setTimeout(resolve, 400));
          continue;
        }
        throw err;
      }
    }

    res.status(503).json({
      error:
        'Semua jalur server AI sedang padat antrean sesaat. Tunggu beberapa detik lalu coba klik ulang ya!',
    });
  } catch (err: unknown) {
    const rawMsg = err instanceof Error ? err.message : '';
    const friendlyMsg =
      rawMsg.includes('503') || rawMsg.includes('UNAVAILABLE') || rawMsg.includes('429')
        ? 'Semua jalur server AI sedang padat antrean sesaat. Tunggu beberapa detik lalu coba klik ulang ya!'
        : rawMsg || 'Gagal membuat analisis mendalam.';
    res.status(500).json({ error: friendlyMsg });
  }
}