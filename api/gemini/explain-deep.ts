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
      targetSchool?: string;
      targetScore?: number;
    };
  };
}

interface VercelRes {
  status: (code: number) => { json: (data: unknown) => void };
}

export default async function handler(req: VercelReq, res: VercelRes) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    res.status(503).json({
      error: 'Layanan AI belum aktif karena GEMINI_API_KEY belum terpasang di server.',
    });
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const { question, studentAnswer, studentProfile } = req.body || {};
    if (!question || !question.questionText) {
      res.status(400).json({ error: 'Data soal tidak lengkap.' });
      return;
    }

    const gradeLabel = studentProfile?.grade === 'SD' ? 'SD Kelas 6' : 'SMP Kelas 9';
    const studentName = studentProfile?.name?.trim() || 'Cah Bagus/Ayu';

    const prompt = `Siswa (${studentName}, ${gradeLabel}) meminta analisis mendalam langkah demi langkah untuk soal TKA/TKAD DIY berikut:
Mata Uji: ${question.subject}
Topik: ${question.topic}
Stimulus: ${question.stimulusText}
Pertanyaan: ${question.questionText}
${Array.isArray(question.options) ? `Pilihan:\n${question.options.join('\n')}` : ''}
Jawaban Siswa: ${studentAnswer || 'Tidak menjawab'}
Kunci Jawaban: ${question.correctAnswer}

Berikan penjelasan yang ringkas, jelas, dan terstruktur:
1. **Bedah Petunjuk Penting di Soal**
2. **Langkah Penyelesaian Rinci & Jebakan Pengecoh**
3. **Tips Cepat Menghadapi Soal Serupa di TKAD DIY**`;

    const modelName = 'gemini-3.8-flash';

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction:
          'Kamu adalah Kak Mentor, guru les privat ramah asal Yogyakarta. Jelaskan analisis soal secara sabar, jernih, dan terstruktur.',
        maxOutputTokens: 1000,
        thinkingConfig: {
          thinkingBudget: 256,
        },
      },
    });

    res.status(200).json({
      analysis: response.text?.trim() || '',
      modelUsed: modelName,
    });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'Gagal membuat analisis mendalam.';
    res.status(500).json({ error: errMsg });
  }
}