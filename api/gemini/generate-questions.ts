interface VercelReq {
  method?: string;
  body?: {
    grade?: string;
    subject?: string;
    topic?: string;
    count?: number;
    difficulty?: string;
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

function extractQuestionsArray(rawText: string): unknown[] {
  const cleaned = rawText
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim();

  try {
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray((parsed as { questions?: unknown[] }).questions)) {
      return (parsed as { questions: unknown[] }).questions;
    }
  } catch {
    const objMatch = cleaned.match(/\{[\s\S]*\}/);
    if (objMatch) {
      const parsedObj = JSON.parse(objMatch[0]) as { questions?: unknown[] };
      if (Array.isArray(parsedObj.questions)) return parsedObj.questions;
    }
    const arrMatch = cleaned.match(/\[[\s\S]*\]/);
    if (arrMatch) {
      const parsedArr = JSON.parse(arrMatch[0]);
      if (Array.isArray(parsedArr)) return parsedArr;
    }
  }
  return [];
}

async function callGroqQuestionsSingleModel(
  groqKey: string,
  model: string,
  systemPrompt: string,
  prompt: string
): Promise<unknown[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6500);

  try {
    const lower = model.toLowerCase();
    const payload: Record<string, unknown> = {
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 2400,
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
    const content = data.choices?.[0]?.message?.content || '';
    const questions = extractQuestionsArray(content);
    if (questions.length === 0) {
      throw new Error(`Output JSON soal kosong dari ${model}`);
    }
    return questions;
  } finally {
    clearTimeout(timer);
  }
}

async function callGeminiQuestionsDirect(
  apiKey: string,
  systemPrompt: string,
  prompt: string
): Promise<unknown[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 7500);

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          maxOutputTokens: 2000,
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
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const questions = extractQuestionsArray(content);
    if (questions.length === 0) {
      throw new Error('Output JSON soal Gemini kosong');
    }
    return questions;
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

  const {
    grade = 'SD',
    subject = 'numerasi',
    topic = 'Umum',
    count = 2,
    difficulty = 'Menengah',
  } = req.body || {};

  const safeCount = Math.min(Math.max(Number(count) || 2, 1), 3);
  const isSmpEnglish = grade === 'SMP' && subject === 'inggris';
  const gradeLabel = grade === 'SD' ? 'SD Kelas 6' : 'SMP Kelas 9';
  const subjectLabel = isSmpEnglish
    ? 'Bahasa Inggris (TKAD SMP DIY)'
    : subject === 'literasi'
    ? 'Literasi Membaca'
    : subject === 'numerasi'
    ? 'Numerasi / Matematika'
    : 'Literasi Sains / IPA';

  const systemPrompt = `Kamu adalah penulis soal TKA & TKAD Dinas Pendidikan DIY.
Output WAJIB HANYA berupa JSON valid tanpa teks pengantar maupun markdown:
{
  "questions": [
    {
      "topic": "string",
      "type": "pilihan_ganda",
      "difficulty": "Dasar | Menengah | HOTS",
      "stimulusTitle": "string",
      "stimulusText": "string",
      "questionText": "string",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctAnswer": "teks lengkap pilihan yang benar (contoh: A. ...)",
      "explanation": {
        "konsepDasar": "string",
        "langkahPengerjaan": ["langkah 1", "langkah 2"],
        "tipsCepat": "string"
      }
    }
  ]
}`;

  const prompt = isSmpEnglish
    ? `Buatlah ${safeCount} soal latihan baru mata uji Bahasa Inggris berstandar TKAD SMP DIY untuk SMP Kelas 9, topik "${topic}", tingkat kesulitan "${difficulty}". ATURAN BAHASA: stimulusTitle, stimulusText, questionText, options (A., B., C., D.), dan correctAnswer WAJIB ditulis dalam Bahasa Inggris yang natural berlatar Yogyakarta/kehidupan pelajar SMP, sedangkan bagian explanation (konsepDasar, langkahPengerjaan, tipsCepat) ditulis dalam Bahasa Indonesia yang jelas. Pastikan correctAnswer berisi teks lengkap pilihan yang benar.`
    : `Buatlah ${safeCount} soal latihan baru berstandar TKA & TKAD DIY untuk jenjang ${gradeLabel}, mata uji ${subjectLabel}, topik "${topic}", tingkat kesulitan "${difficulty}" dengan stimulus singkat konteks Daerah Istimewa Yogyakarta. Opsi pilihan ganda diawali huruf A., B., C., D. dan correctAnswer berisi teks lengkap pilihan yang benar.`;

  let rawQuestions: unknown[] | null = null;
  const errors: string[] = [];

  // 1. Jalur Utama: Groq auto-model
  if (groqKey) {
    const models = await getActiveGroqChatModels(groqKey);
    for (const model of models) {
      try {
        rawQuestions = await callGroqQuestionsSingleModel(groqKey, model, systemPrompt, prompt);
        break;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(`Groq: ${msg}`);
      }
    }
  }

  // 2. Fallback: Gemini REST langsung
  if (rawQuestions === null && geminiKeys.length > 0) {
    for (let i = 0; i < Math.min(geminiKeys.length, 2); i++) {
      try {
        rawQuestions = await callGeminiQuestionsDirect(geminiKeys[i], systemPrompt, prompt);
        break;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(`Gemini-${i + 1}: ${msg}`);
      }
    }
  }

  if (!rawQuestions || rawQuestions.length === 0) {
    res.status(503).json({
      error: `Gagal membuat soal baru (${errors.join(' | ') || 'Server sibuk'}). Silakan klik ulang!`,
    });
    return;
  }

  const nowIso = new Date().toISOString();
  const normalized = rawQuestions.map((item, idx) => {
    const q = item as Record<string, unknown>;
    const exp = (q.explanation || {}) as Record<string, unknown>;
    const qType = q.type === 'isian_singkat' ? 'isian_singkat' : 'pilihan_ganda';
    const diff =
      q.difficulty === 'Dasar' || q.difficulty === 'HOTS' ? q.difficulty : 'Menengah';

    const validSubject =
      subject === 'literasi' ||
      subject === 'sains' ||
      (grade === 'SMP' && subject === 'inggris')
        ? subject
        : 'numerasi';

    return {
      id: `ai-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
      grade: grade === 'SMP' ? 'SMP' : 'SD',
      subject: validSubject,
      topic: String(q.topic || topic),
      type: qType,
      difficulty: diff,
      stimulusTitle: String(q.stimulusTitle || `Konteks ${topic}`),
      stimulusText: String(q.stimulusText || ''),
      questionText: String(q.questionText || ''),
      options:
        qType === 'pilihan_ganda' && Array.isArray(q.options)
          ? q.options.map(String)
          : undefined,
      correctAnswer: String(q.correctAnswer || ''),
      explanation: {
        konsepDasar: String(exp.konsepDasar || ''),
        langkahPengerjaan: Array.isArray(exp.langkahPengerjaan)
          ? exp.langkahPengerjaan.map(String)
          : [],
        tipsCepat: String(exp.tipsCepat || ''),
      },
      isAiGenerated: true,
      createdAt: nowIso,
    };
  });

  res.status(200).json({ questions: normalized });
}