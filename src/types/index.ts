export type GradeLevel = 'SD' | 'SMP';

export type SubjectId = 'literasi' | 'numerasi' | 'sains' | 'inggris';

export type QuestionType = 'pilihan_ganda' | 'isian_singkat';

export type DifficultyLevel = 'Dasar' | 'Menengah' | 'HOTS';

export type AppSection = 'dashboard' | 'materials' | 'practice' | 'mentor';

export interface QuestionExplanation {
  konsepDasar: string;
  langkahPengerjaan: string[];
  tipsCepat: string;
}

export interface DataTable {
  headers: string[];
  rows: string[][];
}

export interface Question {
  id: string;
  grade: GradeLevel;
  subject: SubjectId;
  topic: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  stimulusTitle?: string;
  stimulusText: string;
  dataTable?: DataTable;
  questionText: string;
  options?: string[];
  correctAnswer: string;
  explanation: QuestionExplanation;
  isAiGenerated?: boolean;
  createdAt?: string;
}

export interface StudyMaterial {
  id: string;
  grade: GradeLevel;
  subject: SubjectId;
  topic: string;
  title: string;
  summary: string;
  keyPoints: string[];
  formulaOrRule?: string;
  jogjaContextNote: string;
  estimatedMinutes: number;
}

export interface StudentProfile {
  name: string;
  grade: GradeLevel;
  targetSchool: string;
  targetScore: number;
  onboarded: boolean;
}

export interface AttemptRecord {
  id: string;
  questionId: string;
  subject: SubjectId;
  grade: GradeLevel;
  topic: string;
  isCorrect: boolean;
  userAnswer: string;
  mode: 'santai' | 'simulasi';
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'mentor';
  text: string;
  modelUsed?: string;
  timestamp: string;
}

export interface MentorContextPayload {
  type: 'general' | 'material' | 'question';
  title?: string;
  summary?: string;
  questionText?: string;
  stimulusText?: string;
  options?: string[];
  studentAnswer?: string;
  correctAnswer?: string;
  explanationText?: string;
}