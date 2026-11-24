import React, { useState } from 'react';
import { RotateCcw, Save, X } from 'lucide-react';
import { DIY_TARGET_SCHOOLS } from '../data/initialQuestions';
import { GradeLevel, StudentProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  profile: StudentProfile;
  builtInCount: number;
  aiQuestionCount: number;
  aiConfigured: boolean | null;
  onClose: () => void;
  onSave: (profile: StudentProfile) => void;
  onResetProgress: () => void;
}

export function ProfileModal({
  isOpen,
  profile,
  builtInCount,
  aiQuestionCount,
  aiConfigured,
  onClose,
  onSave,
  onResetProgress,
}: ProfileModalProps) {
  const [name, setName] = useState(profile.name);
  const [grade, setGrade] = useState<GradeLevel>(profile.grade);
  const [targetSchool, setTargetSchool] = useState(profile.targetSchool);
  const [targetScore, setTargetScore] = useState(profile.targetScore);
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleGradeSwitch = (nextGrade: GradeLevel) => {
    setGrade(nextGrade);
    if (!DIY_TARGET_SCHOOLS[nextGrade].includes(targetSchool)) {
      setTargetSchool(DIY_TARGET_SCHOOLS[nextGrade][0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...profile,
      name: name.trim() || 'Cah Hebat',
      grade,
      targetSchool: targetSchool.trim() || DIY_TARGET_SCHOOLS[grade][0],
      targetScore,
      onboarded: true,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="profile-modal-title"
              className="font-display text-xl font-bold text-slate-900"
            >
              Profil &amp; Target Belajar
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ubah jenjang ujian SD/SMP atau target sekolah impianmu kapan saja.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal profil"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="edit-name"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Nama Panggilan
            </label>
            <input
              id="edit-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div>
            <span className="block text-xs font-semibold text-slate-700 mb-1.5">
              Jenjang
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleGradeSwitch('SD')}
                className={`py-2.5 px-3 rounded-lg border text-xs font-semibold cursor-pointer ${
                  grade === 'SD'
                    ? 'border-sky-700 bg-sky-50 text-sky-900'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                SD Kelas 6
              </button>
              <button
                type="button"
                onClick={() => handleGradeSwitch('SMP')}
                className={`py-2.5 px-3 rounded-lg border text-xs font-semibold cursor-pointer ${
                  grade === 'SMP'
                    ? 'border-sky-700 bg-sky-50 text-sky-900'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                SMP Kelas 9
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="edit-school"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Sekolah Impian di DIY
            </label>
            <input
              id="edit-school"
              type="text"
              value={targetSchool}
              onChange={(e) => setTargetSchool(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="edit-score"
                className="text-xs font-semibold text-slate-700"
              >
                Target Nilai Akhir
              </label>
              <span className="font-mono text-xs font-semibold text-sky-700 tabular-nums">
                {targetScore} / 100
              </span>
            </div>
            <input
              id="edit-score"
              type="range"
              min={65}
              max={100}
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              className="w-full accent-sky-700 cursor-pointer"
            />
          </div>

          {/* Hybrid Storage Info */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800">
              Status Bank Soal Hybrid &amp; Layanan AI
            </div>
            <div className="tabular-nums">
              Soal bawaan: {builtInCount} soal · Soal AI tersimpan lokal:{' '}
              {aiQuestionCount} soal
            </div>
            <div>
              Layanan Gemini Server:{' '}
              <span className="font-medium text-slate-800">
                {aiConfigured === null
                  ? 'Memeriksa...'
                  : aiConfigured
                  ? 'Aktif (siap pakai)'
                  : 'Menunggu konfigurasi GEMINI_API_KEY di lingkungan server'}
              </span>
            </div>
          </div>

          {/* Reset Progress */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="text-xs font-medium text-rose-700 hover:text-rose-800 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Riwayat Nilai</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-rose-700 font-medium">Yakin reset?</span>
                <button
                  type="button"
                  onClick={() => {
                    onResetProgress();
                    setConfirmReset(false);
                  }}
                  className="px-2.5 py-1 bg-rose-600 text-white rounded-md font-semibold cursor-pointer"
                >
                  Ya, Reset
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="px-2 py-1 text-slate-600 cursor-pointer"
                >
                  Batal
                </button>
              </div>
            )}

            <button
              type="submit"
              className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold rounded-xl inline-flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Profil</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
