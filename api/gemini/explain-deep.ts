\interface VercelReq {
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
    if (!res.ok) return ['openai/gpt-oss-20b', 'openai/gpt-oss-120b', 'qwen/qwen3-32b'];
    const data = (await res.json()) as { data?: Array<{ id?: string; active?: boolean }> };
    const ids = (data.data || [])
      .filter((m) => m.active !== false)
      .map((m) => m.id || '')
      .filter(Boolean);

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
      : ['openai/gpt-oss-20b', 'openai/gpt-oss-120b', 'qwen/qwen3-32b'];
  } catch {
    return ['openai/gpt-oss-20b', 'openai/gpt-oss-120b', 'qwen/qwen3-32b'];
  } finally {
    clearTimeout(timer);
  }
}

async function callGroqExplainSingleModel(
  groqKey: string,
  model: string,
  systemInstruction: string,
  prompt: string
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5500);

  try {
    const lower = model.toLowerCase();
    const isReasoningModel =
      lower.includes('qwen') || lower.includes('gpt-oss') || lower.includes('deepseek');

    const payload: Record<string, unknown> = {
      model,
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: prompt },
      ],
      max_tokens: isReasoningModel ? 1800 : 850,
      temperature: 0.5,
    };

    if (lower.includes('gpt-oss')) {
      payload.reasoning_effort = 'low';
    } else if (lower.includes('qwen')) {
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
      choices?: Array<{ message?: { content?: string } }>;
    };
    const rawContent = data.choices?.[0]?.message?.content || '';
    const analysis = rawContent.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

    if (!analysis) {
      throw new Error(`Konten analisis kosong dari ${model}`);
    }
    return analysis;
  } finally {
    clearTimeout(timer);
  }
}

async function callGeminiExplainDirect(
  apiKey: string,
  systemInstruction: string,
  prompt: string
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
          maxOutputTokens: 850,
          temperature: 0.5,
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
    const analysis = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    if (!analysis) {
      throw new Error('Respons analisis Gemini kosong');
    }
    return analysis;
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
      error: 'Layanan AI belum aktif karena API Key belum terpasang di server.',
    });
    return;
  }

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

  const errors: string[] = [];

  // 1. Jalur Utama: Groq auto-model (< 1 detik)
  if (groqKey) {
    const models = await getActiveGroqChatModels(groqKey);
    for (const model of models) {
      try {
        const groqAnalysis = await callGroqExplainSingleModel(
          groqKey,
          model,
          systemInstruction,
          prompt
        );
        res.status(200).json({
          analysis: groqAnalysis,
          modelUsed: `groq · ${model}`,
        });
        return;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(`Groq: ${msg}`);
      }
    }
  }

  // 2. Fallback: Gemini 3.8 Flash REST langsung
  for (let i = 0; i < Math.min(geminiKeys.length, 2); i++) {
    try {
      const geminiAnalysis = await callGeminiExplainDirect(
        geminiKeys[i],
        systemInstruction,
        prompt
      );
      res.status(200).json({
        analysis: geminiAnalysis,
        modelUsed: `gemini-3.8-flash (key-${i + 1})`,
      });
      return;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`Gemini-${i + 1}: ${msg}`);
    }
  }

  res.status(503).json({
    error: `Gagal membuat analisis mendalam (${errors.join(' | ') || 'Server sibuk'}). Silakan klik ulang!`,
  });
}