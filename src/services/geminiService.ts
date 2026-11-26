import { Question } from '../types';

export interface StudentProfilePayload {
  name?: string;
  grade?: string;
  targetSchool?: string;
  targetScore?: number;
}

export interface ChatContextPayload {
  type?: 'material' | 'question' | string;
  title?: string;
  summary?: string;
  questionText?: string;
  stimulusText?: string;
  options?: string[];
  studentAnswer?: string;
  correctAnswer?: string;
  explanationText?: string;
}

async function postJsonSafe<T>(
  url: string,
  payload: unknown,
  timeoutMs = 9500,
  externalSignal?: AbortSignal
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  if (externalSignal) {
    if (externalSignal.aborted) {
      controller.abort();
    } else {
      externalSignal.addEventListener('abort', () => controller.abort(), { once: true });
    }
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const rawText = await response.text();
    let data: Record<string, unknown> = {};
    try {
      data = rawText ? JSON.parse(rawText) : {};
    } catch {
      throw new Error('Server AI sedang padat antrean sesaat. Silakan klik ulang ya!');
    }

    if (!response.ok) {
      throw new Error(
        typeof data.error === 'string'
          ? data.error
          : 'Server AI sedang sibuk sesaat. Silakan coba lagi!'
      );
    }

    return data as T;
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error(
        externalSignal?.aborted
          ? 'Permintaan dibatalkan.'
          : 'Waktu tunggu server habis (>9 detik). Silakan klik ulang agar dialihkan ke jalur cepat!'
      );
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

export async function checkAiHealth(): Promise<{
  ok: boolean;
  configured?: boolean;
  message?: string;
}> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch('/api/health', { signal: controller.signal });
    if (!res.ok) return { ok: false, configured: false };
    const data = (await res.json()) as { ok?: boolean; configured?: boolean; message?: string };
    return {
      ok: Boolean(data.ok ?? true),
      configured: Boolean(data.configured ?? true),
      message: data.message,
    };
  } catch {
    return { ok: true, configured: true };
  } finally {
    clearTimeout(timer);
  }
}

export async function askKakMentor(params: {
  message: string;
  history?: Array<{ role?: string; text?: string }>;
  studentProfile?: StudentProfilePayload;
  context?: ChatContextPayload;
  deepMode?: boolean;
  signal?: AbortSignal;
}): Promise<string> {
  const trimmedContext = params.context
    ? {
        ...params.context,
        stimulusText: params.context.stimulusText?.slice(0, 900),
        questionText: params.context.questionText?.slice(0, 600),
        summary: params.context.summary?.slice(0, 800),
      }
    : undefined;

  const data = await postJsonSafe<{ reply?: string; text?: string }>(
    '/api/gemini/mentor-chat',
    {
      message: params.message,
      history: (params.history || []).slice(-4),
      studentProfile: params.studentProfile,
      context: trimmedContext,
      deepMode: Boolean(params.deepMode),
    },
    9500,
    params.signal
  );

  return data.reply || data.text || 'Coba tanyakan sekali lagi ya!';
}

export async function generateAiQuestions(params: {
  grade: string;
  subject: string;
  topic: string;
  count: number;
  difficulty: string;
  signal?: AbortSignal;
}): Promise<Question[]> {
  const data = await postJsonSafe<{ questions?: Question[] }>(
    '/api/gemini/generate-questions',
    {
      grade: params.grade,
      subject: params.subject,
      topic: params.topic,
      count: params.count,
      difficulty: params.difficulty,
    },
    9500,
    params.signal
  );

  return Array.isArray(data.questions) ? data.questions : [];
}

export async function requestDeepExplanation(params: {
  question: {
    grade?: string;
    subject?: string;
    topic?: string;
    stimulusText?: string;
    questionText?: string;
    options?: string[];
    correctAnswer?: string;
  };
  studentAnswer?: string;
  studentProfile?: StudentProfilePayload;
  signal?: AbortSignal;
}): Promise<string> {
  const data = await postJsonSafe<{ analysis?: string; explanation?: string; reply?: string }>(
    '/api/gemini/explain-deep',
    {
      question: {
        ...params.question,
        stimulusText: params.question.stimulusText?.slice(0, 900),
        questionText: params.question.questionText?.slice(0, 600),
      },
      studentAnswer: params.studentAnswer,
      studentProfile: params.studentProfile,
    },
    9500,
    params.signal
  );

  return data.analysis || data.explanation || data.reply || '';
}