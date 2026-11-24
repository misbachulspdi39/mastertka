import { useState } from 'react';
import {
  BookCheck,
  BookOpen,
  MessageSquare,
  PlusCircle,
} from 'lucide-react';
import { SUBJECT_META } from '../data/initialQuestions';
import { GradeLevel, StudyMaterial, SubjectId } from '../types';

interface MaterialsViewProps {
  grade: GradeLevel;
  materials: StudyMaterial[];
  studiedMaterialIds: string[];
  onToggleStudied: (materialId: string) => void;
  onAskMentorAboutMaterial: (material: StudyMaterial) => void;
  onPracticeTopic: (subject: SubjectId, topic: string) => void;
  onOpenAiGenerator: (subject: SubjectId, topic: string) => void;
}

export function MaterialsView({
  grade,
  materials,
  studiedMaterialIds,
  onToggleStudied,
  onAskMentorAboutMaterial,
  onPracticeTopic,
  onOpenAiGenerator,
}: MaterialsViewProps) {
  const [selectedSubject, setSelectedSubject] = useState<'all' | SubjectId>('all');
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const gradeMaterials = materials.filter(
    (m) =>
      m.grade === grade &&
      (selectedSubject === 'all' || m.subject === selectedSubject)
  );

  const gradeLabel = grade === 'SD' ? 'SD Kelas 6' : 'SMP Kelas 9';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Modul Materi Ringkas · {gradeLabel}
          </p>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Peta Konsep &amp; Kisi-Kisi TKA / TKAD DIY
          </h1>
          <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">
            Pelajari poin inti tiap mata uji sebelum mengerjakan latihan soal,
            atau langsung diskusikan bagian yang belum jelas bersama Kak Mentor.
          </p>
        </div>

        {/* Interactive Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter Mata Uji"
          className="inline-flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl self-start"
        >
          {(
            [
              { id: 'all', label: 'Semua' },
              { id: 'literasi', label: 'Literasi' },
              { id: 'numerasi', label: 'Numerasi' },
              { id: 'sains', label: 'Sains' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selectedSubject === tab.id}
              onClick={() => setSelectedSubject(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedSubject === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {gradeMaterials.map((mat) => {
          const meta = SUBJECT_META[mat.subject];
          const isStudied = studiedMaterialIds.includes(mat.id);

          return (
            <article
              key={mat.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="aspect-[16/9] max-h-44 w-full bg-slate-100 relative overflow-hidden">
                {!brokenImages[mat.id] ? (
                  <img
                    src={meta.image}
                    alt={meta.label}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setBrokenImages((prev) => ({ ...prev, [mat.id]: true }))
                    }
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500 text-sm">
                    <BookOpen className="w-5 h-5 mr-2" />
                    {meta.label}
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                    <span>
                      {meta.label} · {mat.topic} · {mat.estimatedMinutes} menit
                      baca
                    </span>
                    <button
                      type="button"
                      onClick={() => onToggleStudied(mat.id)}
                      className={`inline-flex items-center gap-1.5 font-semibold cursor-pointer whitespace-nowrap ${
                        isStudied
                          ? 'text-emerald-700'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <BookCheck className="w-4 h-4" />
                      <span>{isStudied ? 'Sudah dipelajari' : 'Tandai selesai'}</span>
                    </button>
                  </div>

                  <div>
                    <h2 className="font-display text-lg font-bold text-slate-900">
                      {mat.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {mat.summary}
                    </p>
                  </div>

                  <ul className="space-y-2 text-sm text-slate-700">
                    {mat.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="font-mono text-xs font-semibold text-sky-700 mt-1 shrink-0 tabular-nums">
                          0{idx + 1}.
                        </span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {mat.formulaOrRule && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-xs font-semibold text-slate-500 mb-1">
                        Rumus / Kaidah Inti
                      </div>
                      <div className="font-mono text-xs sm:text-sm text-slate-900 font-medium">
                        {mat.formulaOrRule}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-slate-500 leading-relaxed">
                    <span className="font-semibold text-slate-700">
                      Konteks TKAD DIY:
                    </span>{' '}
                    {mat.jogjaContextNote}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => onAskMentorAboutMaterial(mat)}
                    className="px-3.5 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Tanya Kak Mentor tentang materi ini</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onPracticeTopic(mat.subject, mat.topic)}
                    className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Latihan Topik Ini
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenAiGenerator(mat.subject, mat.topic)}
                    className="px-3 py-2 text-amber-800 hover:bg-amber-50 border border-amber-200 bg-amber-50/50 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Buat Latihan Baru (AI)</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
