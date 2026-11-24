import { AttemptRecord, Question, StudentProfile } from '../types';

const PROFILE_KEY = 'mentor_tkad_diy_profile_v1';
const AI_QUESTIONS_KEY = 'mentor_tkad_diy_ai_questions_v1';
const ATTEMPTS_KEY = 'mentor_tkad_diy_attempts_v1';
const STUDIED_MATERIALS_KEY = 'mentor_tkad_diy_studied_v1';

export const DEFAULT_PROFILE: StudentProfile = {
  name: '',
  grade: 'SD',
  targetSchool: 'SMPN 5 Yogyakarta',
  targetScore: 88,
  onboarded: false,
};

export function loadStudentProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw) as Partial<StudentProfile>;
    return {
      name: parsed.name || '',
      grade: parsed.grade === 'SMP' ? 'SMP' : 'SD',
      targetSchool: parsed.targetSchool || 'SMPN 5 Yogyakarta',
      targetScore: typeof parsed.targetScore === 'number' ? parsed.targetScore : 88,
      onboarded: Boolean(parsed.onboarded),
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveStudentProfile(profile: StudentProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function loadAiQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(AI_QUESTIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Question[]) : [];
  } catch {
    return [];
  }
}

export function saveAiQuestions(questions: Question[]): Question[] {
  const existing = loadAiQuestions();
  const merged = [...questions, ...existing];
  localStorage.setItem(AI_QUESTIONS_KEY, JSON.stringify(merged));
  return merged;
}

export function removeAiQuestion(questionId: string): Question[] {
  const filtered = loadAiQuestions().filter((q) => q.id !== questionId);
  localStorage.setItem(AI_QUESTIONS_KEY, JSON.stringify(filtered));
  return filtered;
}

export function loadAttempts(): AttemptRecord[] {
  try {
    const raw = localStorage.getItem(ATTEMPTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AttemptRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveAttempt(attempt: AttemptRecord): AttemptRecord[] {
  const existing = loadAttempts();
  const updated = [attempt, ...existing].slice(0, 300);
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(updated));
  return updated;
}

export function loadStudiedMaterialIds(): string[] {
  try {
    const raw = localStorage.getItem(STUDIED_MATERIALS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function toggleStudiedMaterialId(materialId: string): string[] {
  const current = loadStudiedMaterialIds();
  const exists = current.includes(materialId);
  const updated = exists
    ? current.filter((id) => id !== materialId)
    : [...current, materialId];
  localStorage.setItem(STUDIED_MATERIALS_KEY, JSON.stringify(updated));
  return updated;
}

export function clearLearningProgress(): void {
  localStorage.removeItem(ATTEMPTS_KEY);
  localStorage.removeItem(STUDIED_MATERIALS_KEY);
}
