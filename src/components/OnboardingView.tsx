import React, { useState } from 'react';
import { ArrowRight, BookOpen, GraduationCap, Target } from 'lucide-react';
import { DIY_TARGET_SCHOOLS } from '../data/initialQuestions';
import { GradeLevel, StudentProfile } from '../types';

interface OnboardingViewProps {
  initialProfile: StudentProfile;
  onComplete: (profile: StudentProfile) => void;
}

export function OnboardingView({
  initialProfile,
  onComplete,
}: OnboardingViewProps) {
  const [name, setName] = useState(initialProfile.name);
  const [grade, setGrade] = useState<GradeLevel>(initialProfile.grade);
  const [targetSchool, setTargetSchool] = useState(
    initialProfile.targetSchool || DIY_TARGET_SCHOOLS[initialProfile.grade][0]
  );
  const [targetScore, setTargetScore] = useState(initialProfile.targetScore || 88);
  const [imgError, setImgError] = useState(false);

  const handleGradeChange = (newGrade: GradeLevel) => {
    setGrade(newGrade);
    setTargetSchool(DIY_TARGET_SCHOOLS[newGrade][0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedName = name.trim() || 'Cah Hebat';
    onComplete({
      name: cleanedName,
      grade,
      targetSchool: targetSchool.trim() || DIY_TARGET_SCHOOLS[grade][0],
      targetScore,
      onboarded: true,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Visual & Welcome Editorial Column */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col">
          <div className="aspect-[16/9] w-full bg-slate-100 relative overflow-hidden">
            {!imgError ? (
              <img
                src="/src/assets/images/hero_jogja_study_1795488088450.jpg"
                alt="Meja belajar menghadap Tugu Yogyakarta di pagi hari"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-amber-50 text-slate-600 p-6">
                <GraduationCap className="w-12 h-12 text-sky-700 mb-2" />
                <span className="font-display font-semibold text-base">
                  Persiapan TKA &amp; TKAD Daerah Istimewa Yogyakarta
                </span>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-medium text-sky-700 mb-2">
                Daerah Istimewa Yogyakarta · Jenjang SD Kelas 6 &amp; SMP Kelas 9
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
                Belajar TKA &amp; TKAD DIY Lebih Tenang Bersama Kak Mentor
              </h1>
              <p className="mt-3 text-slate-600 text-base leading-relaxed">
                Latih Literasi Membaca, Numerasi, dan Literasi Sains berstandar
                DIY lengkap dengan soal berkonteks lokal Yogyakarta, simulasi
                berbatas waktu, dan bimbingan langkah demi langkah dari Kak
                Mentor.
              </p>
            </div>

            <div className="pt-5 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <BookOpen className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <span>Materi ringkas plus bank soal bawaan &amp; generator soal AI</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Target className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>Pembahasan bertahap tanpa langsung membocorkan jawaban akhir</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">
                Atur Profil Belajarmu
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Data disimpan aman di perambanmu agar Kak Mentor bisa menyapa
                dan menyesuaikan tingkat soal.
              </p>
            </div>

            <div>
              <label
                htmlFor="student-name"
                className="block text-sm font-semibold text-slate-800 mb-2"
              >
                Nama Panggilan
              </label>
              <input
                id="student-name"
                type="text"
                required
                maxLength={40}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Bima, Sekar, atau Bagas"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
              />
            </div>

            <div>
              <span className="block text-sm font-semibold text-slate-800 mb-2">
                Pilih Jenjang Ujian
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleGradeChange('SD')}
                  className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                    grade === 'SD'
                      ? 'border-sky-700 bg-sky-50 text-sky-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="font-display font-bold text-sm">
                    SD Kelas 6
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Persiapan TKAD SD / ASPD
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleGradeChange('SMP')}
                  className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                    grade === 'SMP'
                      ? 'border-sky-700 bg-sky-50 text-sky-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="font-display font-bold text-sm">
                    SMP Kelas 9
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Persiapan TKA &amp; TKAD SMP
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="target-school"
                className="block text-sm font-semibold text-slate-800 mb-2"
              >
                Sekolah Impian di DIY
              </label>
              <input
                id="target-school"
                type="text"
                value={targetSchool}
                onChange={(e) => setTargetSchool(e.target.value)}
                placeholder="Ketik nama sekolah impianmu"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
              />
              <div className="mt-2.5 flex flex-wrap gap-2">
                {DIY_TARGET_SCHOOLS[grade].map((school) => (
                  <button
                    key={school}
                    type="button"
                    onClick={() => setTargetSchool(school)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap ${
                      targetSchool === school
                        ? 'border-sky-700 bg-sky-50 text-sky-800'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {school}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="target-score"
                  className="text-sm font-semibold text-slate-800"
                >
                  Target Nilai Akhir TKAD
                </label>
                <span className="font-mono text-sm font-semibold text-sky-700 tabular-nums">
                  {targetScore} / 100
                </span>
              </div>
              <input
                id="target-score"
                type="range"
                min={65}
                max={100}
                step={1}
                value={targetScore}
                onChange={(e) => setTargetScore(Number(e.target.value))}
                className="w-full accent-sky-700 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1 tabular-nums">
                <span>65</span>
                <span>80</span>
                <span>100</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-sky-700 hover:bg-sky-800 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Mulai Belajar Bersama Kak Mentor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
