import { generateWithFallback } from './_client';

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
    const { message, history, studentProfile, context, deepMode } = req.body || {};
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Pesan pertanyaan tidak boleh kosong.' });
      return;
    }

    const gradeLabel = studentProfile?.grade === 'SD' ? 'SD Kelas 6' : 'SMP Kelas 9';
    const studentName = studentProfile?.name?.trim() || 'Cah Bagus/Ayu';
    const targetSchool = studentProfile?.targetSchool?.trim() || 'sekolah impian di DIY';
    const targetScore = studentProfile?.targetScore || 85;

    const systemInstruction = `Kamu adalah "Kak Mentor", seorang guru les privat profesional asli Yogyakarta yang ramah, sabar, suportif, cerdas, dan berpengalaman membimbing siswa menghadapi TKA dan TKAD Daerah Istimewa Yogyakarta (DIY).

Profil siswa:
- Nama panggilan: ${studentName}
- Jenjang: ${gradeLabel}
- Target sekolah: ${targetSchool}
- Target nilai TKAD: ${targetScore}

Pedoman Kak Mentor:
1. Gunakan bahasa Indonesia hangat, ramah, dan mudah dipahami siswa ${gradeLabel}. Sesekali sisipkan sapaan hangat khas Jogja (seperti "Halo ${studentName}", "Semangat ya!", "Pelan-pelan saja nggih", "Cah hebat!").
2. METODE SCAFFOLDING: Jangan langsung memberi jawaban akhir di awal saat siswa bertanya tentang soal yang belum selesai dikerjakan. Bimbing langkah demi langkah dan puji usaha siswa.
3. Jika membahas langkah penyelesaian soal yang sudah dijawab, jelaskan dengan jernih, runtut, dan padat agar mudah dibaca di layar HP/laptop.`;

    let contextBlock = '';
    if (context && context.type === 'material') {
      contextBlock = `[KONTEKS MATERI]\nJudul: ${context.title || '-'}\nRingkasan: ${context.summary || '-'}\n\n`;
    } else if (context && context.type === 'question') {
      contextBlock = `[KONTEKS SOAL]\nStimulus: ${context.stimulusText || '-'}\nPertanyaan: ${context.questionText || '-'}\nJawaban Siswa: ${context.studentAnswer || 'Belum dijawab'}\nKunci Jawaban: ${context.correctAnswer || '-'}\nRingkasan Pembahasan: ${context.explanationText || '-'}\n\n`;
    }

    const historyLines = Array.isArray(history)
      ? history
          .slice(-6)
          .map((m) => `${m.role === 'user' ? 'Siswa' : 'Kak Mentor'}: ${m.text || ''}`)
          .join('\n')
      : '';

    const prompt = `${contextBlock}${historyLines ? `[RIWAYAT PERCAKAPAN]\n${historyLines}\n\n` : ''}Pertanyaan Siswa Sekarang: ${message}`;

    const { response, modelUsed } = await generateWithFallback(apiKey, prompt, {
      systemInstruction,
      maxOutputTokens: deepMode ? 1200 : 700,
      thinkingConfig: {
        thinkingBudget: deepMode ? 256 : 0,
      },
    });

    res.status(200).json({
      reply: response.text?.trim() || 'Maaf, Kak Mentor belum bisa merangkai jawaban. Coba tanyakan sekali lagi ya!',
      modelUsed,
    });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'Terjadi kesalahan pada server.';
    res.status(500).json({ error: errMsg });
  }
}