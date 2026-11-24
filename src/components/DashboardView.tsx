import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Clock,
  MessageSquare,
  Target,
  TrendingUp,
} from 'lucide-react';
import { SUBJECT_META } from '../data/initialQuestions';
import {
  AppSection,
  AttemptRecord,
  Question,
  StudentProfile,
  StudyMaterial,
  SubjectId,
} from '../types';

interface DashboardViewProps {
  profile: StudentProfile;
  questions: Question[];
  materials: StudyMaterial[];
  attempts: AttemptRecord[];
  studiedMaterialIds: string[];
  onNavigate: (section: AppSection) => void;
  onStartTopicPractice: (subject: SubjectId, topic?: string, mode?: 'santai' | 'simulasi') => void;
  onAskMentorGeneral: (starterPrompt?: string) => void;
}

export function DashboardView({
  profile,
  questions,
  materials,
  attempts,
  studiedMaterialIds,
  onNavigate,
  onStartTopicPractice,
  onAskMentorGeneral,
}: DashboardViewProps) {
  const [heroError, setHeroError] = useState(false);

  const gradeQuestions = questions.filter((q) => q.grade === profile.grade);
  const gradeMaterials = materials.filter((m) => m.grade === profile.grade);
  const gradeAttempts = attempts.filter((a) => a.grade === profile.grade);
  const aiCount = gradeQuestions.filter((q) => q.isAiGenerated).length;

  const totalAttempts = gradeAttempts.length;
  const correctAttempts = gradeAttempts.filter((a) => a.isCorrect).length;
  const accuracy =
    totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  const studiedCount = gradeMaterials.filter((m) =>
    studiedMaterialIds.includes(m.id)
  ).length;

  const subjectStats = (['literasi', 'numerasi', 'sains'] as SubjectId[]).map(
    (subject) => {
      const subAttempts = gradeAttempts.filter((a) => a.subject === subject);
      const subCorrect = subAttempts.filter((a) => a.isCorrect).length;
      const subAcc =
        subAttempts.length > 0
          ? Math.round((subCorrect / subAttempts.length) * 100)
          : null;
      const availableCount = gradeQuestions.filter(
        (q) => q.subject === subject
      ).length;
      return {
        subject,
        meta: SUBJECT_META[subject],
        attemptsCount: subAttempts.length,
        accuracy: subAcc,
        availableCount,
      };
    }
  );

  // Recommend topics: unpracticed topics or lowest accuracy topics
  const topicStatsMap = new Map<
    string,
    { subject: SubjectId; topic: string; total: number; correct: number }
  >();
  gradeQuestions.forEach((q) => {
    if (!topicStatsMap.has(q.topic)) {
      topicStatsMap.set(q.topic, {
        subject: q.subject,
        topic: q.topic,
        total: 0,
        correct: 0,
      });
    }
  });
  gradeAttempts.forEach((a) => {
    const entry = topicStatsMap.get(a.topic);
    if (entry) {
      entry.total += 1;
      if (a.isCorrect) entry.correct += 1;
    }
  });

  const recommendedTopics = Array.from(topicStatsMap.values())
    .sort((a, b) => {
      const accA = a.total === 0 ? -1 : a.correct / a.total;
      const accB = b.total === 0 ? -1 : b.correct / b.total;
      return accA - accB;
    })
    .slice(0, 3);

  const gradeLabel = profile.grade === 'SD' ? 'SD Kelas 6' : 'SMP Kelas 9';

  return (
    <div className="space-y-8">
      {/* Hero Split Banner */}
      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div>
            <p className="text-xs font-medium text-slate-500">
              {gradeLabel} · Target {profile.targetSchool} · Nilai Sasaran{' '}
              <span className="tabular-nums">{profile.targetScore}</span>
            </p>
            <h1 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
              Sugeng rawuh, {profile.name}! Siap latihan TKA &amp; TKAD hari ini?
            </h1>
            <p className="mt-3 text-slate-600 text-base leading-relaxed max-w-2xl">
              {totalAttempts === 0
                ? 'Mulai dari membaca ringkasan materi atau langsung kerjakan latihan santai. Kalau bingung di tengah jalan, Kak Mentor siap membimbing pelan-pelan.'
                : `Kamu sudah mengerjakan ${totalAttempts} soal pada jenjang ${gradeLabel} dengan akurasi ${accuracy}%. Terus jaga ritme belajarmu untuk tembus target nilai ${profile.targetScore}!`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onStartTopicPractice('numerasi', undefined, 'santai')}
              className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Mulai Latihan Santai</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onStartTopicPractice('literasi', undefined, 'simulasi')}
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Clock className="w-4 h-4 text-amber-700" />
              <span>Simulasi Ujian TKAD</span>
            </button>
            <button
              type="button"
              onClick={() =>
                onAskMentorGeneral(
                  `Halo Kak Mentor! Aku ${profile.name} (${gradeLabel}), tolong buatkan rencana belajar singkat minggu ini supaya siap TKAD DIY.`
                )
              }
              className="px-4 py-2.5 text-sky-800 hover:bg-sky-50 text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Tanya Kak Mentor</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-100 min-h-[220px] lg:min-h-full relative">
          {!heroError ? (
            <img
              src="/src/assets/images/hero_jogja_study_1795488088450.jpg"
              alt="Suasana belajar pagi di Yogyakarta"
              referrerPolicy="no-referrer"
              onError={() => setHeroError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sky-50 to-emerald-50 p-6 text-slate-600 text-sm font-medium">
              Belajar Terarah TKA &amp; TKAD DIY
            </div>
          )}
        </div>
      </section>

      {/* 4-Column Metric Strip */}
      <section
        aria-label="Ringkasan Progres Belajar"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs font-medium text-slate-500">
            Soal Dikerjakan ({gradeLabel})
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-slate-900 tabular-nums">
            {totalAttempts}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Total bank soal tersedia: {gradeQuestions.length}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs font-medium text-slate-500">
            Akurasi Jawaban
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-slate-900 tabular-nums">
            {totalAttempts > 0 ? `${accuracy}%` : '—'}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {totalAttempts > 0
              ? `${correctAttempts} benar dari ${totalAttempts} percobaan`
              : 'Belum ada jawaban terekam'}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs font-medium text-slate-500">
            Materi Dipelajari
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-slate-900 tabular-nums">
            {studiedCount} / {gradeMaterials.length}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Modul Literasi, Numerasi, &amp; Sains
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs font-medium text-slate-500">
            Soal AI Tersimpan
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-slate-900 tabular-nums">
            {aiCount}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Tersimpan otomatis di perangkatmu
          </div>
        </div>
      </section>

      {/* Subject Mastery & Recommendations Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Mata Uji TKA / TKAD */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Penguasaan per Mata Uji
              </h2>
              <p className="text-sm text-slate-600 mt-0.5">
                Pilih mata uji untuk langsung berlatih soal atau membaca materi.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('materials')}
              className="text-sm font-semibold text-sky-700 hover:text-sky-800 whitespace-nowrap cursor-pointer"
            >
              Lihat Semua Materi
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {subjectStats.map((item) => {
              const statusLabel =
                item.accuracy === null
                  ? 'Belum dicoba'
                  : item.accuracy >= 80
                  ? 'Sudah mantap'
                  : item.accuracy >= 60
                  ? 'Perlu latihan lagi'
                  : 'Prioritas pendalaman';
              const barColor =
                item.accuracy === null
                  ? 'bg-slate-200'
                  : item.accuracy >= 80
                  ? 'bg-emerald-600'
                  : item.accuracy >= 60
                  ? 'bg-amber-500'
                  : 'bg-rose-600';

              return (
                <div
                  key={item.subject}
                  className="py-4 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display font-semibold text-slate-900">
                        {item.meta.label}
                      </span>
                      <span className="text-xs font-medium text-slate-600 tabular-nums">
                        {item.accuracy !== null ? `${item.accuracy}%` : '0%'} ·{' '}
                        {statusLabel}
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                        style={{
                          width: `${item.accuracy !== null ? Math.max(item.accuracy, 6) : 0}%`,
                        }}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-slate-500">
                      {item.availableCount} soal tersedia · {item.attemptsCount}{' '}
                      kali dikerjakan
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onStartTopicPractice(item.subject)}
                    className="px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Latih Soal
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Rekomendasi Topik & Kak Mentor Shortcut */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-700" />
              <h2 className="font-display text-lg font-bold text-slate-900">
                Rekomendasi Topik Hari Ini
              </h2>
            </div>
            <p className="text-sm text-slate-600">
              Fokus pada topik yang belum kamu kuasai atau akurasinya masih di
              bawah target {profile.targetScore}%.
            </p>

            <div className="space-y-3">
              {recommendedTopics.map((rec) => {
                const recAcc =
                  rec.total > 0
                    ? `${Math.round((rec.correct / rec.total) * 100)}% akurat`
                    : 'Belum pernah dicoba';
                return (
                  <div
                    key={rec.topic}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-xs text-slate-500">
                        {SUBJECT_META[rec.subject].shortLabel} · {recAcc}
                      </div>
                      <div className="font-medium text-sm text-slate-900 truncate mt-0.5">
                        {rec.topic}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onStartTopicPractice(rec.subject, rec.topic)}
                      className="px-3 py-1.5 text-xs font-semibold text-sky-800 bg-white hover:bg-sky-50 border border-slate-200 rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Kerjakan
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center gap-4">
            <img
              src="/src/assets/images/avatar_kak_mentor_1795488088402.jpg"
              alt="Ilustrasi Kak Mentor"
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-display font-bold text-slate-900 text-base">
                Bingung materi tertentu?
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Tanyakan langsung ke Kak Mentor untuk dibimbing langkah demi
                langkah.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('mentor')}
                className="mt-2.5 text-xs font-semibold text-sky-700 hover:text-sky-800 inline-flex items-center gap-1 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Buka Ruang Konsultasi Kak Mentor</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
