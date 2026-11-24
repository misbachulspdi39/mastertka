import { GoogleGenAI, Type } from '@google/genai';

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
  ].filter((k): k is string => Boolean(k && k !== 'MY_GEMINI_API_KEY'));
}

async function callGroqQuestions(prompt: string): Promise<unknown[]> {
  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) {
    throw new Error('GROQ_API_KEY belum terpasang.');
  }

  const systemPrompt = `Kamu adalah penulis soal TKA & TKAD Dinas Pendidikan DIY.
Output WAJIB berupa JSON valid dengan format objek:
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

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${groqKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
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
  const rawJson = data.choices?.[0]?.message?.content || '{"questions":[]}';
  const parsed = JSON.parse(rawJson) as { questions?: unknown[] };
  return Array.isArray(parsed.questions) ? parsed.questions : [];
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
    const {
      grade = 'SD',
      subject = 'numerasi',
      topic = 'Umum',
      count = 2,
      difficulty = 'Menengah',
    } = req.body || {};

    const safeCount = Math.min(Math.max(Number(count) || 2, 1), 3);
    const gradeLabel = grade === 'SD' ? 'SD Kelas 6' : 'SMP Kelas 9';
    const subjectLabel =
      subject === 'literasi'
        ? 'Literasi Membaca'
        : subject === 'numerasi'
        ? 'Numerasi / Matematika'
        : 'Literasi Sains / IPA';

    const prompt = `Buatlah ${safeCount} soal latihan baru berstandar TKA & TKAD DIY untuk jenjang ${gradeLabel}, mata uji ${subjectLabel}, topik "${topic}", tingkat kesulitan "${difficulty}" dengan stimulus kearifan lokal Daerah Istimewa Yogyakarta. Pastikan opsi pilihan ganda diawali huruf A., B., C., D. dan correctAnswer berisi teks lengkap pilihan yang benar.`;

    let rawQuestions: unknown[] | null = null;
    let lastError: unknown;

    // 1. Coba jalur utama: Gemini
    for (let i = 0; i < geminiKeys.length; i++) {
      try {
        const ai = new GoogleGenAI({ apiKey: geminiKeys[i] });
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction:
              'Kamu adalah penulis soal TKA & TKAD Dinas Pendidikan DIY. Output wajib JSON valid sesuai skema.',
            thinkingConfig: { thinkingBudget: 0 },
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  topic: { type: Type.STRING },
                  type: { type: Type.STRING },
                  difficulty: { type: Type.STRING },
                  stimulusTitle: { type: Type.STRING },
                  stimulusText: { type: Type.STRING },
                  questionText: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctAnswer: { type: Type.STRING },
                  explanation: {
                    type: Type.OBJECT,
                    properties: {
                      konsepDasar: { type: Type.STRING },
                      langkahPengerjaan: { type: Type.ARRAY, items: { type: Type.STRING } },
                      tipsCepat: { type: Type.STRING },
                    },
                    required: ['konsepDasar', 'langkahPengerjaan', 'tipsCepat'],
                  },
                },
                required: [
                  'topic',
                  'type',
                  'difficulty',
                  'stimulusTitle',
                  'stimulusText',
                  'questionText',
                  'options',
                  'correctAnswer',
                  'explanation',
                ],
              },
            },
          },
        });
        const parsed = JSON.parse((response.text || '[]').trim());
        rawQuestions = Array.isArray(parsed) ? parsed : [];
        lastError = null;
        break;
      } catch (err: unknown) {
        lastError = err;
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes('503') || msg.includes('UNAVAILABLE') || msg.includes('429')) {
          await new Promise((resolve) => setTimeout(resolve, 400));
          continue;
        }
        if (groqKey) break;
        throw err;
      }
    }

    // 2. Jalur cadangan kilat: Groq
    if (rawQuestions === null && groqKey) {
      rawQuestions = await callGroqQuestions(prompt);
      lastError = null;
    }

    if (lastError && rawQuestions === null) throw lastError;

    const nowIso = new Date().toISOString();
    const normalized = (rawQuestions || []).map((item, idx) => {
      const q = item as Record<string, unknown>;
      const exp = (q.explanation || {}) as Record<string, unknown>;
      const qType = q.type === 'isian_singkat' ? 'isian_singkat' : 'pilihan_ganda';
      const diff =
        q.difficulty === 'Dasar' || q.difficulty === 'HOTS' ? q.difficulty : 'Menengah';

      return {
        id: `ai-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
        grade: grade === 'SMP' ? 'SMP' : 'SD',
        subject: subject === 'literasi' || subject === 'sains' ? subject : 'numerasi',
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
  } catch (err: unknown) {
    const rawMsg = err instanceof Error ? err.message : '';
    const friendlyMsg =
      rawMsg.includes('503') || rawMsg.includes('UNAVAILABLE') || rawMsg.includes('429')
        ? 'Semua jalur server AI sedang padat antrean sesaat. Tunggu beberapa detik lalu coba klik ulang ya!'
        : rawMsg || 'Gagal membuat soal baru dengan AI.';
    res.status(500).json({ error: friendlyMsg });
  }
}