import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

function createGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function buildKakMentorSystemInstruction(profile: {
  name?: string;
  grade?: string;
  targetSchool?: string;
  targetScore?: number;
}) {
  const gradeLabel =
    profile?.grade === 'SD' ? 'SD Kelas 6' : 'SMP Kelas 9';
  const studentName = profile?.name?.trim() || 'Cah Bagus/Ayu';
  const targetSchool = profile?.targetSchool?.trim() || 'sekolah impian di DIY';
  const targetScore = profile?.targetScore || 85;

  return `Kamu adalah "Kak Mentor", seorang guru les privat profesional asli Yogyakarta yang ramah, sabar, suportif, cerdas, dan berpengalaman membimbing siswa menghadapi Tes Kemampuan Akademik (TKA) dan Tes Kendali Mutu / Tes Kemampuan Akademik Daerah (TKAD) Daerah Istimewa Yogyakarta (DIY).

Profil siswa yang sedang kamu bimbing:
- Nama panggilan: ${studentName}
- Jenjang: ${gradeLabel}
- Target sekolah: ${targetSchool}
- Target nilai TKAD: ${targetScore}

Pedoman gaya mengajar dan kepribadian Kak Mentor:
1. Gunakan bahasa Indonesia yang hangat, akrab, terstruktur, dan mudah dipahami siswa ${gradeLabel}. Sesekali sisipkan sapaan hangat khas Jogja yang natural (seperti "Halo ${studentName}", "Semangat ya!", "Pelan-pelan saja nggih", "Cah hebat!", atau "Bagus sekali usahamu!").
2. METODE SCAFFOLDING (PENTING): Saat siswa bertanya tentang soal atau meminta bantuan mengerjakan soal yang belum mereka jawab tuntas, JANGAN langsung memberi jawaban akhir di awal. Bimbing mereka langkah demi langkah: ajak mereka mengidentifikasi data/petunjuk penting dulu, jelaskan konsep dasarnya, beri pertanyaan pancingan kecil atau langkah pertama, dan puji usaha/pemikiran siswa.
3. Jika siswa sudah selesai menjawab (konteks pembahasan soal) dan bertanya kenapa suatu langkah menghasilkan angka/kesimpulan tertentu, jelaskan langkah tersebut secara jernih, runtut, dan sabar dengan analogi sederhana atau konteks keseharian di Yogyakarta bila relevan.
4. Gunakan format poin-poin rapi atau penomoran langkah yang mudah dibaca. Hindari basa-basi berlebihan, jaga respons tetap ringkas dan fokus pada pemahaman siswa (sekitar 2-4 paragraf pendek atau langkah terstruktur).`;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  app.get('/api/health', (_req, res) => {
    const ai = createGeminiClient();
    res.json({
      ok: true,
      aiConfigured: Boolean(ai),
    });
  });

  app.post('/api/gemini/mentor-chat', async (req, res) => {
    const ai = createGeminiClient();
    if (!ai) {
      res.status(503).json({
        error:
          'Layanan AI belum aktif karena GEMINI_API_KEY belum terpasang di server. Pastikan GEMINI_API_KEY sudah dikonfigurasi di Settings > Secrets.',
      });
      return;
    }

    try {
      const { message, history, studentProfile, context, deepMode } = req.body || {};
      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Pesan pertanyaan tidak boleh kosong.' });
        return;
      }

      const modelName = deepMode ? 'gemini-2.5-pro' : 'gemini-3.8-flash';
      const systemInstruction = buildKakMentorSystemInstruction(studentProfile || {});

      let contextBlock = '';
      if (context && context.type === 'material') {
        contextBlock = `[KONTEKS MATERI YANG SEDANG DIPELAJARI]
Judul: ${context.title || '-'}
Ringkasan: ${context.summary || '-'}
\n`;
      } else if (context && context.type === 'question') {
        contextBlock = `[KONTEKS SOAL YANG SEDANG DIBAHAS]
Stimulus: ${context.stimulusText || '-'}
Pertanyaan: ${context.questionText || '-'}
${Array.isArray(context.options) && context.options.length > 0 ? `Pilihan: ${context.options.join(' | ')}` : ''}
Jawaban Siswa: ${context.studentAnswer || 'Belum dijawab'}
Kunci Jawaban: ${context.correctAnswer || '-'}
Ringkasan Pembahasan: ${context.explanationText || '-'}
\n`;
      }

      const historyLines = Array.isArray(history)
        ? history
            .slice(-8)
            .map((m: { role?: string; text?: string }) =>
              `${m.role === 'user' ? 'Siswa' : 'Kak Mentor'}: ${m.text || ''}`
            )
            .join('\n')
        : '';

      const prompt = `${contextBlock}${
        historyLines ? `[RIWAYAT PERCAKAPAN SEBELUMNYA]\n${historyLines}\n\n` : ''
      }Pertanyaan Siswa Sekarang: ${message}`;

      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          systemInstruction,
        },
      });

      const replyText = response.text?.trim();
      if (!replyText) {
        res.status(502).json({ error: 'Kak Mentor tidak menerima respons teks dari model.' });
        return;
      }

      res.json({
        reply: replyText,
        modelUsed: modelName,
      });
    } catch (err: unknown) {
      console.error('Gemini mentor-chat error:', err);
      const errMsg = err instanceof Error ? err.message : 'Terjadi kesalahan saat menghubungi Kak Mentor.';
      res.status(500).json({ error: errMsg });
    }
  });

  app.post('/api/gemini/explain-deep', async (req, res) => {
    const ai = createGeminiClient();
    if (!ai) {
      res.status(503).json({
        error:
          'Layanan AI belum aktif karena GEMINI_API_KEY belum terpasang di server.',
      });
      return;
    }

    try {
      const { question, studentAnswer, studentProfile } = req.body || {};
      if (!question || !question.questionText) {
        res.status(400).json({ error: 'Data soal tidak lengkap.' });
        return;
      }

      const systemInstruction = buildKakMentorSystemInstruction(studentProfile || {});
      const prompt = `Siswa baru saja mengerjakan soal TKA/TKAD DIY berikut dan meminta analisis mendalam langkah demi langkah:

Jenjang: ${question.grade === 'SD' ? 'SD Kelas 6' : 'SMP Kelas 9'}
Mata Uji: ${question.subject}
Topik: ${question.topic}
Stimulus Bacaan/Data:
${question.stimulusText}

Pertanyaan:
${question.questionText}

${Array.isArray(question.options) ? `Pilihan Jawaban:\n${question.options.join('\n')}` : ''}

Jawaban Siswa: ${studentAnswer || 'Tidak menjawab'}
Kunci Jawaban Benar: ${question.correctAnswer}

Tolong berikan analisis mendalam sebagai Kak Mentor dengan struktur:
1. Bedah Petunjuk Penting di Soal (informasi kunci dari stimulus)
2. Kenapa Jawaban Benar Bisa Didapat (uraian langkah paling rinci, termasuk jebakan umum pada pilihan pengecoh jika ada)
3. Latihan Refleksi Singkat (1 tips agar tidak terkecoh pada soal TKAD DIY tipe serupa).`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
          systemInstruction,
        },
      });

      res.json({
        analysis: response.text?.trim() || '',
        modelUsed: 'gemini-2.5-pro',
      });
    } catch (err: unknown) {
      console.error('Gemini explain-deep error:', err);
      const errMsg = err instanceof Error ? err.message : 'Gagal membuat analisis mendalam.';
      res.status(500).json({ error: errMsg });
    }
  });

  app.post('/api/gemini/generate-questions', async (req, res) => {
    const ai = createGeminiClient();
    if (!ai) {
      res.status(503).json({
        error:
          'Layanan AI belum aktif karena GEMINI_API_KEY belum terpasang di server.',
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

      const prompt = `Buatlah ${safeCount} soal latihan baru berstandar resmi TKA & TKAD Daerah Istimewa Yogyakarta (DIY) untuk jenjang ${gradeLabel}, mata uji ${subjectLabel}, topik "${topic}", tingkat kesulitan "${difficulty}".

Ketentuan wajib soal:
1. Setiap soal harus memiliki stimulus kontekstual (teks bacaan pendek, situasi kehidupan sehari-hari, atau data numerik) dengan nuansa kearifan lokal / lingkungan Daerah Istimewa Yogyakarta (misalnya Batik Giriloyo, Kali Code, Lereng Merapi, Pasar Beringharjo, Candi Prambanan, Trans Jogja, Wanagama Gunungkidul, Gerabah Kasongan, atau kegiatan sekolah di Jogja).
2. Buat variasi antara soal pilihan ganda (4 opsi berawalan "A. ", "B. ", "C. ", "D. ") atau isian singkat (untuk isian_singkat, kosongkan array options menjadi [] dan isi correctAnswer dengan jawaban singkat eksak seperti angka atau 1-2 kata). Utamakan mayoritas pilihan_ganda agar mudah dikerjakan, boleh sertakan maksimal 1 isian_singkat jika cocok.
3. Untuk pilihan_ganda, pastikan nilai "correctAnswer" SAMA PERSIS dengan salah satu string di array "options" (misalnya "B. 45 cm").
4. Pastikan perhitungan matematika dan fakta sains 100% akurat, masuk akal untuk siswa ${gradeLabel}, dan tidak ambigu.
5. Pembahasan harus terstruktur: konsepDasar, langkahPengerjaan (array berisi 3-4 langkah jelas), dan tipsCepat.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'Kamu adalah penulis soal profesional TKA & TKAD Dinas Pendidikan Daerah Istimewa Yogyakarta. Output wajib berupa JSON valid sesuai skema.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                topic: {
                  type: Type.STRING,
                  description: 'Nama topik spesifik soal.',
                },
                type: {
                  type: Type.STRING,
                  description: 'Harus bernilai "pilihan_ganda" atau "isian_singkat".',
                },
                difficulty: {
                  type: Type.STRING,
                  description: 'Harus bernilai "Dasar", "Menengah", atau "HOTS".',
                },
                stimulusTitle: {
                  type: Type.STRING,
                  description: 'Judul singkat teks stimulus atau konteks DIY.',
                },
                stimulusText: {
                  type: Type.STRING,
                  description: 'Teks bacaan atau uraian data kontekstual DIY.',
                },
                questionText: {
                  type: Type.STRING,
                  description: 'Kalimat pertanyaan yang jelas dan lengkap.',
                },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description:
                    '4 pilihan jawaban berawalan A., B., C., D. untuk pilihan_ganda, atau array kosong [] untuk isian_singkat.',
                },
                correctAnswer: {
                  type: Type.STRING,
                  description:
                    'Untuk pilihan_ganda, harus sama persis dengan salah satu item di options. Untuk isian_singkat, jawaban singkat eksak.',
                },
                explanation: {
                  type: Type.OBJECT,
                  properties: {
                    konsepDasar: {
                      type: Type.STRING,
                      description: 'Penjelasan konsep inti yang diuji.',
                    },
                    langkahPengerjaan: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: 'Urutan langkah pengerjaan soal secara runtut.',
                    },
                    tipsCepat: {
                      type: Type.STRING,
                      description: 'Tips cepat atau cara mengecek ulang jawaban.',
                    },
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

      const rawText = (response.text || '[]').trim();
      const parsed = JSON.parse(rawText);
      const nowIso = new Date().toISOString();

      const normalized = (Array.isArray(parsed) ? parsed : []).map((q, idx) => {
        const qType = q.type === 'isian_singkat' ? 'isian_singkat' : 'pilihan_ganda';
        const diff =
          q.difficulty === 'Dasar' || q.difficulty === 'HOTS'
            ? q.difficulty
            : 'Menengah';
        return {
          id: `ai-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
          grade: grade === 'SMP' ? 'SMP' : 'SD',
          subject:
            subject === 'literasi' || subject === 'sains' ? subject : 'numerasi',
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

      res.json({
        questions: normalized,
      });
    } catch (err: unknown) {
      console.error('Gemini generate-questions error:', err);
      const errMsg = err instanceof Error ? err.message : 'Gagal membuat soal baru dengan AI.';
      res.status(500).json({ error: errMsg });
    }
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mentor TKA & TKAD DIY server running on http://localhost:${PORT}`);
  });
}

startServer();
