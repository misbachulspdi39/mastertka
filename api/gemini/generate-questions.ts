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

    let responseText = '[]';
    let lastError: unknown;

    for (const model of MODELS) {
      try {
        const response = await ai.models.generateContent({
          model,
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
        responseText = (response.text || '[]').trim();
        lastError = null;
        break;
      } catch (err: unknown) {
        lastError = err;
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes('503') || msg.includes('UNAVAILABLE') || msg.includes('429')) {
          continue;
        }
        throw err;
      }
    }

    if (lastError) throw lastError;

    const parsed = JSON.parse(responseText);
    const nowIso = new Date().toISOString();

    const normalized = (Array.isArray(parsed) ? parsed : []).map((q, idx) => {
      const qType = q.type === 'isian_singkat' ? 'isian_singkat' : 'pilihan_ganda';
      const diff =
        q.difficulty === 'Dasar' || q.difficulty === 'HOTS' ? q.difficulty : 'Menengah';
      return {
        id: `ai-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
        grade: grade === 'SMP' ? 'SMP' : 'SD',
        subject: subject === 'literasi' || subject === 'sains' ? subject : 'numerasi',
        topic: q.topic || topic,
        type: qType,
        difficulty: diff,
        stimulusTitle: q.stimulusTitle || `Konteks ${topic}`,
        stimulusText: q.stimulusText || '',
        questionText: q.questionText || '',
        options: qType === 'pilihan_ganda' && Array.isArray(q.options) ? q.options : undefined,
        correctAnswer: String(q.correctAnswer || ''),
        explanation: {
          konsepDasar: q.explanation?.konsepDasar || '',
          langkahPengerjaan: Array.isArray(q.explanation?.langkahPengerjaan)
            ? q.explanation.langkahPengerjaan
            : [],
          tipsCepat: q.explanation?.tipsCepat || '',
        },
        isAiGenerated: true,
        createdAt: nowIso,
      };
    });

    res.status(200).json({ questions: normalized });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'Gagal membuat soal baru dengan AI.';
    res.status(500).json({ error: errMsg });
  }
}