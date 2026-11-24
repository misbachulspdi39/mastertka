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

function getGeminiKeys(): string[] {
  return [
    process.env.GEMINI_API_KEY,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
  ].filter((k): k is string => Boolean(k && k !== 'MY_GEMINI_API_KEY'));
}

async function callGroqChat(
  systemInstruction: string,
  prompt: string,
  maxTokens: number
): Promise<string> {
  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) {
    throw new Error('GROQ_API_KEY belum terpasang.');
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
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
      max_tokens: maxTokens,
      temperature: 0.6,
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
    const maxTokens = deepMode ? 900 : 450;

    // 1. Coba jalur utama: Gemini (rotasi semua API Key yang tersedia)
    for (let i = 0; i < geminiKeys.length; i++) {
      try {
        const ai = new GoogleGenAI({ apiKey: geminiKeys[i] });
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction,
            maxOutputTokens: maxTokens,
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
          await new Promise((resolve) => setTimeout(resolve, 400));
          continue;
        }
        // Jika error lain selain sibuk dan Groq tersedia, lanjut ke Groq
        if (groqKey) break;
        throw err;
      }
    }

    // 2. Jalur cadangan kilat: Groq (Llama 3.3 70B)
    if (groqKey) {
      const groqReply = await callGroqChat(systemInstruction, prompt, maxTokens);
      res.status(200).json({
        reply: groqReply || 'Coba tanyakan sekali lagi ya!',
        modelUsed: 'groq-llama-3.3-70b',
      });
      return;
    }

    res.status(503).json({
      error:
        'Semua jalur server AI sedang padat antrean sesaat. Tunggu 3 detik lalu klik Kirim ulang nggih!',
    });
  } catch (err: unknown) {
    const rawMsg = err instanceof Error ? err.message : '';
    const friendlyMsg =
      rawMsg.includes('503') || rawMsg.includes('UNAVAILABLE') || rawMsg.includes('429')
        ? 'Semua jalur server AI sedang padat antrean sesaat. Tunggu beberapa detik lalu coba klik ulang ya!'
        : rawMsg || 'Terjadi gangguan sementara pada server AI.';
    res.status(500).json({ error: friendlyMsg });
  }
}