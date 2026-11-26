import React, { useEffect, useRef, useState } from 'react';
import { Loader2, PlusCircle, X } from 'lucide-react';
import { SUBJECT_META } from '../data/initialQuestions';
import { generateAiQuestions } from '../services/geminiService';
import { DifficultyLevel, GradeLevel, Question, SubjectId } from '../types';

interface AiGeneratorModalProps {
  isOpen: boolean;
  grade: GradeLevel;
  defaultSubject: SubjectId;
  defaultTopic?: string;
  availableTopicsBySubject: Record<SubjectId, string[]>;
  onClose: () => void;
  onQuestionsGenerated: (questions: Question[]) => void;
}

export function AiGeneratorModal({
  isOpen,
  grade,
  defaultSubject,
  defaultTopic,
  availableTopicsBySubject,
  onClose,
  onQuestionsGenerated,
}: AiGeneratorModalProps) {
  const [subject, setSubject] = useState<SubjectId>(defaultSubject);
  const [topic, setTopic] = useState<string>(
    defaultTopic || availableTopicsBySubject[defaultSubject][0] || 'Umum'
  );
  const [customTopic, setCustomTopic] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Menengah');
  const [count, setCount] = useState<number>(2);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSubject(defaultSubject);
      setTopic(defaultTopic || availableTopicsBySubject[defaultSubject]?.[0] || 'Umum');
      setErrorMsg(null);
    }
  }, [isOpen, defaultSubject, defaultTopic, availableTopicsBySubject]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  if (!isOpen) return null;

  const topicsForSubject = availableTopicsBySubject[subject] || [];
  const gradeLabel = grade === 'SD' ? 'SD Kelas 6' : 'SMP Kelas 9';

  const handleClose = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setLoading(false);
    setErrorMsg(null);
    onClose();
  };

  const handleSubjectChange = (nextSub: SubjectId) => {
    setSubject(nextSub);
    const list = availableTopicsBySubject[nextSub] || [];
    setTopic(list[0] || '');
    setCustomTopic('');
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const finalTopic = customTopic.trim() || topic || SUBJECT_META[subject].label;
    setLoading(true);

    try {
      const created = await generateAiQuestions({
        grade,
        subject,
        topic: finalTopic,
        count,
        difficulty,
        signal: controller.signal,
      });

      if (controller.signal.aborted) return;

      onQuestionsGenerated(created);
      setLoading(false);
      onClose();
    } catch (err: unknown) {
      if (controller.signal.aborted) return;
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Gagal membuat soal baru. Coba lagi beberapa saat.'
      );
      setLoading(false);
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-gen-title"
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-sky-700">
              Bank Soal Dinamis · {gradeLabel}
            </p>
            <h2
              id="ai-gen-title"
              className="font-display text-xl font-bold text-slate-900 mt-0.5"
            >
              Buat Latihan Baru (AI)
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Tutup modal"
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-600">
          Soal baru akan disusun otomatis berstandar TKA &amp; TKAD DIY lengkap
          dengan stimulus konteks Yogyakarta serta pembahasan langkah demi langkah,
          lalu disimpan ke perangkatmu.
        </p>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <span className="block text-xs font-semibold text-slate-700 mb-1.5">
              Mata Uji
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['literasi', 'numerasi', 'sains'] as SubjectId[]).map((sub) => (
                <button
                  key={sub}
                  type="button"
                  disabled={loading}
                  onClick={() => handleSubjectChange(sub)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer disabled:opacity-60 ${
                    subject === sub
                      ? 'border-sky-700 bg-sky-50 text-sky-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {SUBJECT_META[sub].shortLabel}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="gen-topic-select"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Pilih Topik Materi
            </label>
            <select
              id="gen-topic-select"
              value={topic}
              disabled={loading}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-sky-600 disabled:opacity-60"
            >
              {topicsForSubject.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="gen-custom-topic"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Atau Tulis Topik Khusus (Opsional)
            </label>
            <input
              id="gen-custom-topic"
              type="text"
              value={customTopic}
              disabled={loading}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Misal: Teorema Pythagoras, Kalimat Efektif, Tata Surya"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-600 disabled:opacity-60"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tingkat Kesulitan
              </span>
              <div className="flex gap-1.5">
                {(['Dasar', 'Menengah', 'HOTS'] as DifficultyLevel[]).map(
                  (lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      disabled={loading}
                      onClick={() => setDifficulty(lvl)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer disabled:opacity-60 ${
                        difficulty === lvl
                          ? 'border-sky-700 bg-sky-50 text-sky-900'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {lvl}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-1.5">
                Jumlah Soal Baru
              </span>
              <div className="flex gap-2">
                {[2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    disabled={loading}
                    onClick={() => setCount(num)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer tabular-nums disabled:opacity-60 ${
                      count === num
                        ? 'border-sky-700 bg-sky-50 text-sky-900'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {num} Soal
                  </button>
                ))}
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800">
              {errorMsg}
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 disabled:opacity-60 text-white text-sm font-semibold rounded-xl inline-flex items-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyusun Soal TKAD...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Generate &amp; Simpan Soal</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}