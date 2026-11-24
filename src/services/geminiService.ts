import {
  ChatMessage,
  DifficultyLevel,
  GradeLevel,
  MentorContextPayload,
  Question,
  StudentProfile,
  SubjectId,
} from '../types';

export interface AiHealthStatus {
  ok: boolean;
  aiConfigured: boolean;
}

export async function checkAiHealth(): Promise<AiHealthStatus> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return { ok: false, aiConfigured: false };
    return (await res.json()) as AiHealthStatus;
  } catch {
    return { ok: false, aiConfigured: false };
  }
}

export async function askKakMentor(params: {
  message: string;
  history: ChatMessage[];
  studentProfile: StudentProfile;
  context?: MentorContextPayload;
  deepMode?: boolean;
}): Promise<{ reply: string; modelUsed: string }> {
  const res = await fetch('/api/gemini/mentor-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: params.message,
      history: params.history.map((h) => ({ role: h.role, text: h.text })),
      studentProfile: params.studentProfile,
      context: params.context,
      deepMode: Boolean(params.deepMode),
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Gagal menghubungi Kak Mentor.');
  }

  return {
    reply: data.reply || '',
    modelUsed: data.modelUsed || 'gemini-3.8-flash',
  };
}

export async function requestDeepExplanation(params: {
  question: Question;
  studentAnswer: string;
  studentProfile: StudentProfile;
}): Promise<{ analysis: string; modelUsed: string }> {
  const res = await fetch('/api/gemini/explain-deep', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Gagal memuat analisis mendalam.');
  }

  return {
    analysis: data.analysis || '',
    modelUsed: data.modelUsed || 'gemini-2.5-pro',
  };
}

export async function generateAiQuestions(params: {
  grade: GradeLevel;
  subject: SubjectId;
  topic: string;
  count: number;
  difficulty: DifficultyLevel;
}): Promise<Question[]> {
  const res = await fetch('/api/gemini/generate-questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Gagal membuat soal baru dengan AI.');
  }

  if (!Array.isArray(data.questions) || data.questions.length === 0) {
    throw new Error('AI tidak mengembalikan soal baru. Silakan coba lagi.');
  }

  return data.questions as Question[];
}
