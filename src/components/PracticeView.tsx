import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  HelpCircle,
  Loader2,
  MessageSquare,
  PlusCircle,
  RotateCcw,
  Send,
  Trash2,
  XCircle,
} from 'lucide-react';
import { SUBJECT_META } from '../data/initialQuestions';
import { askKakMentor, requestDeepExplanation } from '../services/geminiService';
import {
  AttemptRecord,
  ChatMessage,
  Question,
  StudentProfile,
  SubjectId,
} from '../types';

interface PracticeViewProps {
  profile: StudentProfile;
  questions: Question[];
  initialSubject: 'all' | SubjectId;
  initialTopic?: string;
  initialMode: 'santai' | 'simulasi';
  onRecordAttempt: (attempt: AttemptRecord) => void;
  onOpenAiGenerator: (subject: SubjectId, topic?: string) => void;
  onDeleteAiQuestion: (questionId: string) => void;
}

function normalizeAnswer(val: string): string {
  return val.trim().toLowerCase().replace(/\./g, '').replace(',', '.');
}

function isAnswerCorrect(question: Question, userAnswer: string): boolean {
  if (!userAnswer.trim()) return false;
  if (question.type === 'pilihan_ganda') {
    return userAnswer.trim() === question.correctAnswer.trim();
  }
  return normalizeAnswer(userAnswer) === normalizeAnswer(question.correctAnswer);
}

export function PracticeView({
  profile,
  questions,
  initialSubject,
  initialTopic,
  initialMode,
  onRecordAttempt,
  onOpenAiGenerator,
  onDeleteAiQuestion,
}: PracticeViewProps) {
  const [mode, setMode] = useState<'santai' | 'simulasi'>(initialMode);
  const [selectedSubject, setSelectedSubject] = useState<'all' | SubjectId>(
    initialSubject
  );
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopic || 'all');
  const [currentIdx, setCurrentIdx] = useState(0);

  // Answers map by question id
  const [draftAnswers, setDraftAnswers] = useState<Record<string, string>>({});
  const [checkedSantai, setCheckedSantai] = useState<Record<string, boolean>>({});

  // Simulation exam state
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  // Deep explanation (gemini-2.5-pro) state per question
  const [deepAnalyses, setDeepAnalyses] = useState<Record<string, string>>({});
  const [deepLoadingId, setDeepLoadingId] = useState<string | null>(null);
  const [deepError, setDeepError] = useState<string | null>(null);

  // Inline "Tanya Lebih Lanjut" & pre-answer scaffolding mini-chat per question
  const [questionChats, setQuestionChats] = useState<Record<string, ChatMessage[]>>({});
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  // Sync external navigation filter changes
  useEffect(() => {
    setSelectedSubject(initialSubject);
    setSelectedTopic(initialTopic || 'all');
    setMode(initialMode);
    setCurrentIdx(0);
    setExamStarted(false);
    setExamFinished(false);
  }, [initialSubject, initialTopic, initialMode]);

  const gradeQuestions = useMemo(
    () => questions.filter((q) => q.grade === profile.grade),
    [questions, profile.grade]
  );

  const availableTopics = useMemo(() => {
    const filteredBySub =
      selectedSubject === 'all'
        ? gradeQuestions
        : gradeQuestions.filter((q) => q.subject === selectedSubject);
    return Array.from(new Set(filteredBySub.map((q) => q.topic)));
  }, [gradeQuestions, selectedSubject]);

  const activeQuestions = useMemo(() => {
    return gradeQuestions.filter((q) => {
      if (selectedSubject !== 'all' && q.subject !== selectedSubject) return false;
      if (selectedTopic !== 'all' && q.topic !== selectedTopic) return false;
      return true;
    });
  }, [gradeQuestions, selectedSubject, selectedTopic]);

  const safeIdx =
    activeQuestions.length > 0
      ? Math.min(currentIdx, activeQuestions.length - 1)
      : 0;
  const currentQuestion = activeQuestions[safeIdx];

  // Exam timer tick
  useEffect(() => {
    if (mode !== 'simulasi' || !examStarted || examFinished) return;
    if (secondsLeft <= 0) {
      setExamFinished(true);
      return;
    }
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setExamFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [mode, examStarted, examFinished, secondsLeft]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSelectMode = (nextMode: 'santai' | 'simulasi') => {
    setMode(nextMode);
    setCurrentIdx(0);
    setExamStarted(false);
    setExamFinished(false);
  };

  const handleStartSimulation = () => {
    setDraftAnswers({});
    setExamFinished(false);
    setCurrentIdx(0);
    setSecondsLeft(Math.max(activeQuestions.length * 120, 180)); // 2 menit per soal, minimal 3 menit
    setExamStarted(true);
  };

  const handleFinishSimulation = () => {
    activeQuestions.forEach((q) => {
      const userAns = draftAnswers[q.id] || '';
      onRecordAttempt({
        id: `att-${Date.now()}-${q.id}`,
        questionId: q.id,
        subject: q.subject,
        grade: q.grade,
        topic: q.topic,
        isCorrect: isAnswerCorrect(q, userAns),
        userAnswer: userAns || '(Kosong)',
        mode: 'simulasi',
        timestamp: new Date().toISOString(),
      });
    });
    setExamFinished(true);
    setCurrentIdx(0);
  };

  const handleCheckSantai = () => {
    if (!currentQuestion) return;
    const userAns = draftAnswers[currentQuestion.id] || '';
    if (!userAns.trim()) return;
    setCheckedSantai((prev) => ({ ...prev, [currentQuestion.id]: true }));
    onRecordAttempt({
      id: `att-${Date.now()}-${currentQuestion.id}`,
      questionId: currentQuestion.id,
      subject: currentQuestion.subject,
      grade: currentQuestion.grade,
      topic: currentQuestion.topic,
      isCorrect: isAnswerCorrect(currentQuestion, userAns),
      userAnswer: userAns,
      mode: 'santai',
      timestamp: new Date().toISOString(),
    });
  };

  const handleRequestDeep = async (q: Question) => {
    setDeepError(null);
    setDeepLoadingId(q.id);
    try {
      const res = await requestDeepExplanation({
        question: q,
        studentAnswer: draftAnswers[q.id] || '',
        studentProfile: profile,
      });
      setDeepAnalyses((prev) => ({ ...prev, [q.id]: res.analysis }));
    } catch (err: unknown) {
      setDeepError(
        err instanceof Error ? err.message : 'Gagal memuat analisis mendalam.'
      );
    } finally {
      setDeepLoadingId(null);
    }
  };

  const sendQuestionChat = async (customPrompt?: string) => {
    if (!currentQuestion) return;
    const textToSend = (customPrompt ?? chatInput).trim();
    if (!textToSend || chatLoading) return;

    setChatError(null);
    const qId = currentQuestion.id;
    const existing = questionChats[qId] || [];
    const userMsg: ChatMessage = {
      id: `msg-u-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toISOString(),
    };
    const nextHistory = [...existing, userMsg];
    setQuestionChats((prev) => ({ ...prev, [qId]: nextHistory }));
    if (!customPrompt) setChatInput('');
    setChatLoading(true);

    const isRevealed =
      mode === 'santai' ? Boolean(checkedSantai[qId]) : examFinished;

    try {
      const res = await askKakMentor({
        message: textToSend,
        history: existing,
        studentProfile: profile,
        context: {
          type: 'question',
          stimulusText: currentQuestion.stimulusText,
          questionText: currentQuestion.questionText,
          options: currentQuestion.options,
          studentAnswer: draftAnswers[qId] || 'Belum dijawab',
          correctAnswer: isRevealed
            ? currentQuestion.correctAnswer
            : 'RAHASIAKAN — siswa belum selesai menjawab, bimbing bertahap saja!',
          explanationText: isRevealed
            ? `${currentQuestion.explanation.konsepDasar} Langkah: ${currentQuestion.explanation.langkahPengerjaan.join(' -> ')}`
            : 'Belum ditampilkan. Gunakan metode scaffolding untuk memandu siswa menemukan konsepnya sendiri.',
        },
      });

      const mentorMsg: ChatMessage = {
        id: `msg-m-${Date.now()}`,
        role: 'mentor',
        text: res.reply,
        modelUsed: res.modelUsed,
        timestamp: new Date().toISOString(),
      };
      setQuestionChats((prev) => ({
        ...prev,
        [qId]: [...nextHistory, mentorMsg],
      }));
    } catch (err: unknown) {
      setChatError(
        err instanceof Error ? err.message : 'Gagal menghubungi Kak Mentor.'
      );
    } finally {
      setChatLoading(false);
    }
  };

  const isCurrentRevealed = currentQuestion
    ? mode === 'santai'
      ? Boolean(checkedSantai[currentQuestion.id])
      : examFinished
    : false;

  const currentUserAnswer = currentQuestion
    ? draftAnswers[currentQuestion.id] || ''
    : '';
  const currentCorrect = currentQuestion
    ? isAnswerCorrect(currentQuestion, currentUserAnswer)
    : false;

  const simCorrectCount = activeQuestions.filter((q) =>
    isAnswerCorrect(q, draftAnswers[q.id] || '')
  ).length;
  const simScore =
    activeQuestions.length > 0
      ? Math.round((simCorrectCount / activeQuestions.length) * 100)
      : 0;

  const generatorSubject: SubjectId =
    selectedSubject === 'all' ? 'numerasi' : selectedSubject;

  return (
    <div className="space-y-6">
      {/* Control Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Segmented Toggle */}
          <div className="inline-flex p-1 bg-slate-100 border border-slate-200 rounded-xl">
            <button
              type="button"
              onClick={() => handleSelectMode('santai')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                mode === 'santai'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Latihan Santai
            </button>
            <button
              type="button"
              onClick={() => handleSelectMode('simulasi')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                mode === 'simulasi'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Simulasi Ujian TKAD
            </button>
          </div>

          <select
            aria-label="Filter Mata Uji"
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value as 'all' | SubjectId);
              setSelectedTopic('all');
              setCurrentIdx(0);
              setExamStarted(false);
              setExamFinished(false);
            }}
            className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-600"
          >
            <option value="all">Semua Mata Uji</option>
            <option value="literasi">Literasi Membaca</option>
            <option value="numerasi">Numerasi &amp; Matematika</option>
            <option value="sains">Literasi Sains &amp; IPA</option>
          </select>

          <select
            aria-label="Filter Topik"
            value={selectedTopic}
            onChange={(e) => {
              setSelectedTopic(e.target.value);
              setCurrentIdx(0);
              setExamStarted(false);
              setExamFinished(false);
            }}
            className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-800 max-w-[230px] focus:outline-none focus:ring-2 focus:ring-sky-600"
          >
            <option value="all">Semua Topik ({gradeQuestions.length})</option>
            {availableTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          {mode === 'simulasi' && examStarted && !examFinished && (
            <div className="px-3.5 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-mono text-sm font-semibold inline-flex items-center gap-2 tabular-nums">
              <Clock className="w-4 h-4" />
              <span>{formatTimer(secondsLeft)}</span>
            </div>
          )}

          <button
            type="button"
            onClick={() =>
              onOpenAiGenerator(
                generatorSubject,
                selectedTopic !== 'all' ? selectedTopic : undefined
              )
            }
            className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Buat Latihan Baru (AI)</span>
          </button>
        </div>
      </div>

      {/* Empty Filter State */}
      {activeQuestions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-4">
          <p className="font-display font-bold text-lg text-slate-900">
            Belum ada soal untuk filter ini
          </p>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Kamu bisa menekan tombol Buat Latihan Baru (AI) untuk membuat soal
            baru secara instan atau kembali ke semua topik.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedSubject('all');
              setSelectedTopic('all');
            }}
            className="px-4 py-2 bg-sky-700 text-white text-sm font-semibold rounded-xl cursor-pointer"
          >
            Tampilkan Semua Soal
          </button>
        </div>
      ) : mode === 'simulasi' && !examStarted ? (
        /* Simulation Start Screen */
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto space-y-5">
          <div>
            <p className="text-xs font-medium text-amber-700">
              Mode Simulasi Ujian TKAD DIY
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-slate-900">
              Siap Uji Ketahanan Waktu, {profile.name}?
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Dalam mode simulasi, pembahasan tidak langsung muncul sampai kamu
              menyelesaikan semua soal atau waktu habis.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-200 text-center">
            <div>
              <div className="text-xs text-slate-500">Jumlah Soal</div>
              <div className="mt-1 font-display text-xl font-bold text-slate-900 tabular-nums">
                {activeQuestions.length}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Alokasi Waktu</div>
              <div className="mt-1 font-display text-xl font-bold text-slate-900 tabular-nums">
                {Math.max(activeQuestions.length * 2, 3)} Menit
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Target Nilai</div>
              <div className="mt-1 font-display text-xl font-bold text-sky-700 tabular-nums">
                {profile.targetScore}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartSimulation}
            className="w-full py-3 bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Mulai Simulasi Sekarang
          </button>
        </div>
      ) : (
        /* Main Practice Split Layout */
        <div className="space-y-6">
          {/* Simulation Score Summary Banner when finished */}
          {mode === 'simulasi' && examFinished && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Hasil Simulasi TKAD DIY
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold text-slate-900 tabular-nums">
                  Skor Kamu: {simScore} / 100 ({simCorrectCount} dari{' '}
                  {activeQuestions.length} benar)
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {simScore >= profile.targetScore
                    ? `Mantap, ${profile.name}! Nilaimu sudah melampaui target ${profile.targetScore}.`
                    : `Terus semangat! Yuk cek pembahasan tiap nomor di bawah agar nilaimu naik ke ${profile.targetScore}.`}
                </p>
              </div>
              <button
                type="button"
                onClick={handleStartSimulation}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl inline-flex items-center gap-2 whitespace-nowrap cursor-pointer self-start"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Simulasi</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left/Main Question Stage */}
            <div className="lg:col-span-8 space-y-6">
              {currentQuestion && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
                  {/* Question Metadata Header (Zero-pill discipline) */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-slate-800 tabular-nums">
                        Soal {safeIdx + 1} dari {activeQuestions.length}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{SUBJECT_META[currentQuestion.subject].label}</span>
                      <span aria-hidden="true">·</span>
                      <span>{currentQuestion.topic}</span>
                      <span aria-hidden="true">·</span>
                      <span>Tingkat {currentQuestion.difficulty}</span>
                      {currentQuestion.isAiGenerated && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-sky-700">
                            Soal Baru AI
                          </span>
                        </>
                      )}
                    </div>

                    {currentQuestion.isAiGenerated && (
                      <button
                        type="button"
                        onClick={() => onDeleteAiQuestion(currentQuestion.id)}
                        title="Hapus soal AI ini"
                        className="text-xs text-slate-400 hover:text-rose-600 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    )}
                  </div>

                  {/* Stimulus */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    {currentQuestion.stimulusTitle && (
                      <h3 className="font-display font-bold text-sm text-slate-900">
                        {currentQuestion.stimulusTitle}
                      </h3>
                    )}
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                      {currentQuestion.stimulusText}
                    </p>

                    {currentQuestion.dataTable && (
                      <div className="overflow-x-auto pt-2">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm bg-white border border-slate-200 rounded-lg">
                          <thead>
                            <tr className="bg-slate-100 text-slate-800">
                              {currentQuestion.dataTable.headers.map((h, i) => (
                                <th
                                  key={i}
                                  className="px-3 py-2 font-semibold border-b border-slate-200"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {currentQuestion.dataTable.rows.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className="border-b border-slate-100 last:border-b-0"
                              >
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className="px-3 py-2 text-slate-700 tabular-nums"
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Question Text */}
                  <div>
                    <p className="font-display font-semibold text-base sm:text-lg text-slate-900 leading-snug">
                      {currentQuestion.questionText}
                    </p>
                  </div>

                  {/* Answer Input Area */}
                  {currentQuestion.type === 'pilihan_ganda' &&
                  currentQuestion.options ? (
                    <div className="space-y-2.5">
                      {currentQuestion.options.map((opt) => {
                        const isSelected = currentUserAnswer === opt;
                        const isCorrectOpt =
                          opt.trim() === currentQuestion.correctAnswer.trim();

                        let optClass =
                          'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50';
                        if (isCurrentRevealed) {
                          if (isCorrectOpt) {
                            optClass =
                              'border-emerald-600 bg-emerald-50 text-emerald-950 font-medium';
                          } else if (isSelected && !isCorrectOpt) {
                            optClass =
                              'border-rose-500 bg-rose-50 text-rose-950';
                          } else {
                            optClass =
                              'border-slate-200 bg-slate-50/50 text-slate-500';
                          }
                        } else if (isSelected) {
                          optClass =
                            'border-sky-700 bg-sky-50 text-sky-950 font-medium';
                        }

                        return (
                          <button
                            key={opt}
                            type="button"
                            disabled={isCurrentRevealed}
                            onClick={() =>
                              setDraftAnswers((prev) => ({
                                ...prev,
                                [currentQuestion.id]: opt,
                              }))
                            }
                            className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm sm:text-base transition-colors flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default ${optClass}`}
                          >
                            <span>{opt}</span>
                            {isCurrentRevealed && isCorrectOpt && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                            )}
                            {isCurrentRevealed && isSelected && !isCorrectOpt && (
                              <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label
                        htmlFor="short-answer-input"
                        className="block text-xs font-semibold text-slate-700"
                      >
                        Jawaban Isian Singkat
                      </label>
                      <input
                        id="short-answer-input"
                        type="text"
                        disabled={isCurrentRevealed}
                        value={currentUserAnswer}
                        onChange={(e) =>
                          setDraftAnswers((prev) => ({
                            ...prev,
                            [currentQuestion.id]: e.target.value,
                          }))
                        }
                        placeholder="Ketik jawaban singkatmu di sini..."
                        className="w-full sm:max-w-sm px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-600 disabled:bg-slate-50"
                      />
                      {isCurrentRevealed && (
                        <p className="text-sm font-medium text-emerald-800">
                          Kunci Jawaban:{' '}
                          <span className="font-mono font-bold">
                            {currentQuestion.correctAnswer}
                          </span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      {mode === 'santai' && !isCurrentRevealed && (
                        <button
                          type="button"
                          disabled={!currentUserAnswer.trim()}
                          onClick={handleCheckSantai}
                          className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                        >
                          Periksa Jawaban
                        </button>
                      )}

                      {!isCurrentRevealed && (
                        <button
                          type="button"
                          onClick={() =>
                            sendQuestionChat(
                              'Kak Mentor, aku masih bingung cara mulai mengerjakan soal ini. Tolong beri petunjuk langkah pertamanya saja ya, jangan langsung jawabannya.'
                            )
                          }
                          className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <HelpCircle className="w-4 h-4 text-sky-700" />
                          <span>Minta Petunjuk Kak Mentor</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={safeIdx === 0}
                        onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                        className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Sebelumnya</span>
                      </button>

                      {safeIdx < activeQuestions.length - 1 ? (
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentIdx((i) =>
                              Math.min(activeQuestions.length - 1, i + 1)
                            )
                          }
                          className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Berikutnya</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : mode === 'simulasi' && !examFinished ? (
                        <button
                          type="button"
                          onClick={handleFinishSimulation}
                          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg cursor-pointer"
                        >
                          Selesai &amp; Kumpulkan
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}

              {/* Pembahasan Cerdas (Structured Explanation) */}
              {currentQuestion && isCurrentRevealed && (
                <section
                  aria-label="Pembahasan Cerdas"
                  className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      {currentCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-rose-600" />
                      )}
                      <h3 className="font-display text-lg font-bold text-slate-900">
                        {currentCorrect
                          ? 'Jawabanmu Tepat! Ini Pembahasan Lengkapnya'
                          : 'Belum Tepat, Yuk Pelajari Langkah Benarnya'}
                      </h3>
                    </div>

                    <button
                      type="button"
                      disabled={deepLoadingId === currentQuestion.id}
                      onClick={() => handleRequestDeep(currentQuestion)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {deepLoadingId === currentQuestion.id ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Menganalisis (Pro)...</span>
                        </>
                      ) : (
                        <span>Minta Analisis Mendalam (Pro)</span>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-xs font-semibold text-slate-500 mb-1">
                        01. Konsep Dasar
                      </div>
                      <p className="text-sm text-slate-800 leading-relaxed">
                        {currentQuestion.explanation.konsepDasar}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-xs font-semibold text-slate-500 mb-2">
                        02. Langkah Pengerjaan
                      </div>
                      <ol className="space-y-2 text-sm text-slate-800">
                        {currentQuestion.explanation.langkahPengerjaan.map(
                          (step, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="font-mono text-xs font-semibold text-sky-700 mt-0.5 tabular-nums">
                                {i + 1}.
                              </span>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          )
                        )}
                      </ol>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                      <div className="text-xs font-semibold text-amber-800 mb-1">
                        03. Tips Cepat TKAD DIY
                      </div>
                      <p className="text-sm text-amber-950 leading-relaxed">
                        {currentQuestion.explanation.tipsCepat}
                      </p>
                    </div>
                  </div>

                  {deepError && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800">
                      {deepError}
                    </div>
                  )}

                  {deepAnalyses[currentQuestion.id] && (
                    <div className="p-5 rounded-xl bg-sky-50/50 border border-sky-200 space-y-2">
                      <div className="text-xs font-semibold text-sky-800">
                        Analisis Mendalam Kak Mentor (Gemini 3.8 Flash + Groq (Mendalam))
                      </div>
                      <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                        {deepAnalyses[currentQuestion.id]}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* Contextual "Tanya Lebih Lanjut" Mini-Chat */}
              {currentQuestion && (
                <section
                  aria-label="Tanya Lebih Lanjut Kak Mentor"
                  className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="/src/assets/images/avatar_kak_mentor_1795488088402.jpg"
                      alt="Kak Mentor"
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <h3 className="font-display font-bold text-sm text-slate-900">
                        Tanya Lebih Lanjut tentang Soal Ini
                      </h3>
                      <p className="text-xs text-slate-500">
                        Terhubung langsung dengan konteks soal nomor{' '}
                        <span className="tabular-nums">{safeIdx + 1}</span>
                      </p>
                    </div>
                  </div>

                  {/* Quick question chips */}
                  {isCurrentRevealed && (
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Kak, kenapa langkah nomor 2 bisa dapat hasil segitu?',
                        'Beri 1 contoh angka lain yang mirip soal ini dong, Kak.',
                      ].map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => sendQuestionChat(prompt)}
                          className="px-3 py-1.5 text-xs text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg cursor-pointer text-left"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}

                  {(questionChats[currentQuestion.id] || []).length > 0 && (
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                      {(questionChats[currentQuestion.id] || []).map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-3.5 rounded-xl text-sm leading-relaxed ${
                            msg.role === 'user'
                              ? 'bg-sky-700 text-white ml-8'
                              : 'bg-slate-50 border border-slate-200 text-slate-800 mr-8'
                          }`}
                        >
                          <div className="text-xs font-semibold mb-1 opacity-75">
                            {msg.role === 'user' ? profile.name : 'Kak Mentor'}
                          </div>
                          <div className="whitespace-pre-line">{msg.text}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {chatError && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800">
                      {chatError}
                    </div>
                  )}

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendQuestionChat();
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Tanya Kak Mentor bagian yang masih bikin bingung..."
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-600"
                    />
                    <button
                      type="submit"
                      disabled={chatLoading || !chatInput.trim()}
                      className="px-4 py-2.5 bg-sky-700 hover:bg-sky-800 disabled:opacity-40 text-white text-sm font-semibold rounded-xl inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {chatLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      <span>Kirim</span>
                    </button>
                  </form>
                </section>
              )}
            </div>

            {/* Right Navigation Sidebar */}
            <aside className="lg:col-span-4 space-y-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-sm text-slate-900">
                    Navigasi Nomor Soal
                  </h3>
                  <span className="text-xs text-slate-500 tabular-nums">
                    {Object.keys(draftAnswers).filter((id) =>
                      activeQuestions.some((q) => q.id === id && draftAnswers[id])
                    ).length}{' '}
                    / {activeQuestions.length} terjawab
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {activeQuestions.map((q, idx) => {
                    const isCurrent = idx === safeIdx;
                    const answered = Boolean((draftAnswers[q.id] || '').trim());
                    const revealed =
                      mode === 'santai'
                        ? Boolean(checkedSantai[q.id])
                        : examFinished;
                    const correct = revealed
                      ? isAnswerCorrect(q, draftAnswers[q.id] || '')
                      : false;

                    let btnStyle =
                      'border-slate-200 bg-white text-slate-700 hover:bg-slate-50';
                    if (revealed) {
                      btnStyle = correct
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                        : 'border-rose-500 bg-rose-50 text-rose-900';
                    } else if (answered) {
                      btnStyle = 'border-sky-700 bg-sky-50 text-sky-900';
                    }

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-10 rounded-lg border text-xs font-semibold tabular-nums transition-colors cursor-pointer ${btnStyle} ${
                          isCurrent ? 'ring-2 ring-sky-600 ring-offset-1' : ''
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                  <div>
                    Putih: Belum dijawab · Biru: Sudah diisi
                  </div>
                  <div>Hijau: Benar · Merah: Perlu diperbaiki</div>
                </div>

                {mode === 'simulasi' && !examFinished && (
                  <button
                    type="button"
                    onClick={handleFinishSimulation}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Akhiri &amp; Nilai Simulasi
                  </button>
                )}
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-display font-bold text-sm">
                  <MessageSquare className="w-4 h-4 text-sky-700" />
                  <span>Tips Belajar Kak Mentor</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Jangan terburu-buru melihat kunci jawaban, Cah Bagus/Ayu.
                  Kalau masih buntu, pakai tombol{' '}
                  <span className="font-semibold text-slate-800">
                    Minta Petunjuk Kak Mentor
                  </span>{' '}
                  supaya kamu terlatih menemukan langkahnya sendiri saat ujian
                  TKAD nanti.
                </p>
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
