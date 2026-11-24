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

function getApiKeys(): string[] {
  return [
    process.env.GEMINI_API_KEY,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
  ].filter((k): k is string => Boolean(k && k !== 'MY_GEMINI_API_KEY'));
}

export default async function handler(req: VercelReq, res: VercelRes) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKeys = getApiKeys();
  if (apiKeys.length === 0) {
    res.status(503).json({
      error: 'Layanan AI belum aktif karena GEMINI_API_KEY belum terpasang di server.',
    });
    return;
  }

  try {
    const { message, history, studentProfile, context, deepMode } = req.body || {};

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Pesan pertanyaan tidak boleh kosong.' });
      return;
    }

    const gradeLabel = studentProfile?.grade === 'SD' ? 'SD Kelas 6' : 'SMP Kelas 9';
    const studentName = studentProfile?.name?.trim() || 'Cah Bagus/Ayu';
    const targetSchool = studentProfile?.targetSchool?.trim() || 'sekolah impian di DIY';
    const targetScore = studentProfile?.targetScore || 85;

    const modeRule = deepMode
      ? 'Berikan penjelasan mendalam, langkah demi langkah yang lengkap, beserta contoh penerapannya.'
      : 'Berikan jawaban ringkas, langsung ke inti, maksimal 2-3 paragraf pendek.';

    const systemInstruction = `Kamu adalah "Kak Mentor", guru les privat profesional asli Yogyakarta yang ramah, sabar, dan berpengalaman membimbing siswa menghadapi TKA dan TKAD DIY.
Profil siswa: Nama ${studentName}, Jenjang ${gradeLabel}, Target ${targetSchool} (nilai ${targetScore}).
Pedoman:
1. Gunakan bahasa Indonesia hangat dan sapaan khas Jogja ("Halo ${studentName}", "Pelan-pelan saja nggih", "Cah hebat!").
2. METODE SCAFFOLDING: Jangan langsung memberi jawaban akhir jika soal belum selesai dikerjakan. Bimbing langkah demi langkah.
3. ${modeRule}`;

    let contextBlock = '';
    if (context?.type === 'material') {
      contextBlock = `[KONTEKS MATERI]\nJudul: ${context.title || '-'}\nRingkasan: ${context.summary || '-'}\n\n`;
    } else if (context?.type === 'question') {
      contextBlock = `[KONTEKS SOAL]\nStimulus: ${context.stimulusText || '-'}\nPertanyaan: ${context.questionText || '-'}\nJawaban Siswa: ${context.studentAnswer || 'Belum dijawab'}\nKunci: ${context.correctAnswer || '-'}\n\n`;
    }

    const historyLines = Array.isArray(history)
      ? history
          .slice(-4)
          .map((m) => `${m.role === 'user' ? 'Siswa' : 'Kak Mentor'}: ${m.text || ''}`)
          .join('\n')
      : '';

    const prompt = `${contextBlock}${historyLines ? `[RIWAYAT]\n${historyLines}\n\n` : ''}Pertanyaan Siswa: ${message}`;

    let isBusy = false;

    // Putar semua API Key yang tersedia secara bergantian
    for (let i = 0; i < apiKeys.length; i++) {
      try {
        const ai = new GoogleGenAI({ apiKey: apiKeys[i] });
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction,
            maxOutputTokens: deepMode ? 900 : 450,
            thinkingConfig: { thinkingBudget: 0 },
          },
        });
        res.status(200).json({
          reply: response.text?.trim() || 'Coba tanyakan sekali lagi ya!',
          modelUsed: `gemini-3.8-flash (key-${i + 1})`,
        });
        return;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes('503') || msg.includes('UNAVAILABLE') || msg.includes('429')) {
          isBusy = true;
          await new Promise((resolve) => setTimeout(resolve, 600));
          continue;
        }
        throw err;
      }
    }

    if (isBusy) {
      res.status(503).json({
        error:
          'Semua jalur server AI Google sedang padat antrean sesaat. Tunggu 3 detik lalu klik Kirim ulang nggih!',
      });
      return;
    }
  } catch (err: unknown) {
    const errMsg =
      err instanceof Error ? err.message : 'Terjadi gangguan sementara pada server AI.';
    res.status(500).json({ error: errMsg });
  }
}