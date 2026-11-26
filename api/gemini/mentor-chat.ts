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
  ]
    .map((k) => k?.trim() || '')
    .filter((k) => Boolean(k && k !== 'MY_GEMINI_API_KEY'));
}

async function getActiveGroqChatModels(groqKey: string): Promise<string[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    const res = await fetch('https://api.groq.com/openai/v1/models', {
      signal: controller.signal,
      headers: { Authorization: `Bearer ${groqKey}` },
    });
    if (!res.ok) return ['openai/gpt-oss-120b', 'qwen/qwen3-32b'];
    const data = (await res.json()) as { data?: Array<{ id?: string; active?: boolean }> };
    const ids = (data.data || [])
      .filter((m) => m.active !== false)
      .map((m) => m.id || '')
      .filter(Boolean);

    // Filter keluar hanya model non-chat (audio, TTS, STT, guard, orpheus)
    const chatModels = ids.filter((id) => {
      const lower = id.toLowerCase();
      return (
        !lower.includes('whisper') &&
        !lower.includes('guard') &&
        !lower.includes('tts') &&
        !lower.includes('stt') &&
        !lower.includes('audio') &&
        !lower.includes('orpheus') &&
        !lower.includes('canopylabs') &&
        !lower.includes('playai')
      );
    });

    // Urutkan model teks paling stabil & cepat di atas
    const priorityKeywords = [
      'gpt-oss-20b',
      'gpt-oss-120b',
      'qwen',
      'kimi',
      'llama',
      'gemma',
      'mistral',
      'mixtral',
      'deepseek',
    ];

    chatModels.sort((a, b) => {
      const idxA = priorityKeywords.findIndex((kw) => a.toLowerCase().includes(kw));
      const idxB = priorityKeywords.findIndex((kw) => b.toLowerCase().includes(kw));
      const scoreA = idxA === -1 ? 99 : idxA;
      const scoreB = idxB === -1 ? 99 : idxB;
      return scoreA - scoreB;
    });

    return chatModels.length > 0
      ? chatModels.slice(0, 3)
      : ['openai/gpt-oss-120b', 'qwen/qwen3-32b'];
  } catch {
    return ['openai/gpt-oss-120b', 'qwen/qwen3-32b'];
  } finally {
    clearTimeout(timer);
  }
}

async function callGroqSingleModel(
  groqKey: string,
  model: string,
  systemInstruction: string,
  prompt: string,
  maxTokens: number
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);

  try {
    const isReasoningModel =
      model.toLowerCase().includes('qwen') ||
      model.toLowerCase().includes('gpt-oss') ||
      model.toLowerCase().includes('deepseek');

    const payload: Record<string, unknown> = {
      model,
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: prompt },
      ],
      // Beri ruang token cukup besar agar model reasoning tetap menyisakan output teks penuh
      max_tokens: isReasoningModel ? Math.max(maxTokens, 1600) : maxTokens,
      temperature: 0.6,
    };

    if (model.toLowerCase().includes('gpt-oss')) {
      payload.reasoning_effort = 'low';
    } else if (model.toLowerCase().includes('qwen')) {
      payload.reasoning_effort = 'none';
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${groqKey}`,
      },
      body: JSON.stringify(payload),
    });

    const rawText = await response.text();
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} (${model}): ${rawText.slice(0, 120)}`);
    }

    const data = JSON.parse(rawText) as {
      choices?: Array<{
        message?: { content?: string };
      }>;
    };

    // Bersihkan tag <think>...</think> jika ada
    const rawContent = data.choices?.[0]?.message?.content || '';
    const reply = rawContent.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

    if (!reply) {
      throw new Error(`Konten kosong dari model ${model}`);
    }
    return reply;
  } finally {
    clearTimeout(timer);
  }
}

async function callGeminiDirect(
  apiKey: string,
  systemInstruction: string,
  prompt: string,
  maxTokens: number
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 7500);

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature: 0.6,
        },
      }),
    });

    const rawText = await response.text();
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${rawText.slice(0, 120)}`);
    }

    const data = JSON.parse(rawText) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    if (!reply) throw new Error('Respons Gemini kosong');
    return reply;
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req: VercelReq, res: VercelRes) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const geminiKeys = getGeminiKeys();
  const groqKey = process.env.GROQ_API_KEY?.trim() || '';

  if (geminiKeys.length === 0 && !groqKey) {
    res.status(503).json({
      error: 'API Key Groq maupun Gemini belum terbaca di server Vercel.',
    });
    return;
  }

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
  const maxTokens = deepMode ? 900 : 500;

  const errors: string[] = [];

  // 1. Jalur Utama: Groq model aktif (< 1.5 detik)
  if (groqKey) {
    const models = await getActiveGroqChatModels(groqKey);
    for (const model of models) {
      try {
        const reply = await callGroqSingleModel(
          groqKey,
          model,
          systemInstruction,
          prompt,
          maxTokens
        );
        res.status(200).json({
          reply,
          modelUsed: `groq · ${model}`,
        });
        return;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(`Groq: ${msg}`);
      }
    }
  }

  // 2. Jalur Cadangan: Gemini 3.8 Flash
  for (let i = 0; i < Math.min(geminiKeys.length, 2); i++) {
    try {
      const geminiReply = await callGeminiDirect(
        geminiKeys[i],
        systemInstruction,
        prompt,
        maxTokens
      );
      res.status(200).json({
        reply: geminiReply,
        modelUsed: `gemini-3.8-flash (key-${i + 1})`,
      });
      return;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`Gemini-${i + 1}: ${msg}`);
    }
  }

  res.status(503).json({
    error: `Gagal terhubung ke AI (${errors.join(' | ')}).`,
  });
}