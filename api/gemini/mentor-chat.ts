import { GoogleGenAI } from '@google/genai';

interface VercelReq {
  method?: string;
  body?: {
    message?: string;
    history?: Array<{ role?: string; text?: string }>;
    studentProfile?: {
      name?: string;
      grade?: string;
      targetSchool?: string;
      targetScore?: number;
    };
    context?: {
      type?: string;
      title?: string;
      summary?: string;
      questionText?: string;
      stimulusText?: string;
      options?: string[];
      studentAnswer?: string;
      correctAnswer?: string;
      explanationText?: string;
    };
    deepMode?: boolean;
  };
}

interface VercelRes {
  status: (code: number) => { json: (data: unknown) => void };
}

const MODELS = ['gemini-3.8-flash', 'gemini-3.8-flash-lite', 'gemini-3.0-flash'];

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
    const { message, history, studentProfile, context, deepMode } = req.body || {};

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Pesan pertanyaan tidak boleh kosong.' });
      return;
    }

    const gradeLabel = studentProfile?.grade === 'SD' ? 'SD Kelas 6' : 'SMP Kelas 9';
    const studentName = studentProfile?.name?.trim() || 'Cah Bagus/Ayu';
    const targetSchool = studentProfile?.targetSchool?.trim() || 'sekolah impian di DIY';
    const targetScore = studentProfile?.targetScore || 85;

    const systemInstruction = `Kamu adalah "Kak Mentor", guru les privat profesional asli Yogyakarta yang ramah, sabar, dan berpengalaman membimbing siswa menghadapi TKA dan TKAD DIY.
Profil siswa: Nama ${studentName}, Jenjang ${gradeLabel}, Target ${targetSchool} (nilai ${targetScore}).
Pedoman:
1. Gunakan bahasa Indonesia hangat dan sapaan khas Jogja ("Halo ${studentName}", "Pelan-pelan saja nggih", "Cah hebat!").
2. METODE SCAFFOLDING: Jangan langsung memberi jawaban akhir jika soal belum selesai dikerjakan. Bimbing langkah demi langkah.
3. Jelaskan dengan jernih, runtut, dan padat.`;

    let contextBlock = '';
    if (context?.type === 'material') {
      contextBlock = `[KONTEKS MATERI]\nJudul: ${context.title || '-'}\nRingkasan: ${context.summary || '-'}\n\n`;
    } else if (context?.type === 'question') {
      contextBlock = `[KONTEKS SOAL]\nStimulus: ${context.stimulusText || '-'}\nPertanyaan: ${context.questionText || '-'}\nJawaban Siswa: ${context.studentAnswer || 'Belum dijawab'}\nKunci: ${context.correctAnswer || '-'}\n\n`;
    }

    const historyLines = Array.isArray(history)
      ? history
          .slice(-6)
          .map((m) => `${m.role === 'user' ? 'Siswa' : 'Kak Mentor'}: ${m.text || ''}`)
          .join('\n')
      : '';

    const prompt = `${contextBlock}${historyLines ? `[RIWAYAT]\n${historyLines}\n\n` : ''}Pertanyaan Siswa: ${message}`;

    let lastError: unknown;
    for (const model of MODELS) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction,
            maxOutputTokens: deepMode ? 1200 : 700,
            thinkingConfig: { thinkingBudget: deepMode ? 256 : 0 },
          },
        });
        res.status(200).json({
          reply: response.text?.trim() || 'Coba tanyakan sekali lagi ya!',
          modelUsed: model,
        });
        return;
      } catch (err: unknown) {
        lastError = err;
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes('503') || msg.includes('UNAVAILABLE') || msg.includes('429')) {
          continue;
        }
        throw err;
      }
    }

    throw lastError;
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'Terjadi kesalahan pada server.';
    res.status(500).json({ error: errMsg });
  }
}