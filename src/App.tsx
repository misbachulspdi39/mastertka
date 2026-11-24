import { useEffect, useMemo, useState } from 'react';
import { AiGeneratorModal } from './components/AiGeneratorModal';
import { DashboardView } from './components/DashboardView';
import { MaterialsView } from './components/MaterialsView';
import { MentorChatView } from './components/MentorChatView';
import { OnboardingView } from './components/OnboardingView';
import { PracticeView } from './components/PracticeView';
import { ProfileModal } from './components/ProfileModal';
import { TopNavbar } from './components/TopNavbar';
import {
  INITIAL_QUESTIONS,
  INITIAL_STUDY_MATERIALS,
} from './data/initialQuestions';
import { checkAiHealth } from './services/geminiService';
import {
  clearLearningProgress,
  loadAiQuestions,
  loadAttempts,
  loadStudentProfile,
  loadStudiedMaterialIds,
  removeAiQuestion,
  saveAiQuestions,
  saveAttempt,
  saveStudentProfile,
  toggleStudiedMaterialId,
} from './services/storageService';
import {
  AppSection,
  AttemptRecord,
  MentorContextPayload,
  Question,
  StudentProfile,
  StudyMaterial,
  SubjectId,
} from './types';

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>(() =>
    loadStudentProfile()
  );
  const [aiQuestions, setAiQuestions] = useState<Question[]>(() =>
    loadAiQuestions()
  );
  const [attempts, setAttempts] = useState<AttemptRecord[]>(() =>
    loadAttempts()
  );
  const [studiedMaterialIds, setStudiedMaterialIds] = useState<string[]>(() =>
    loadStudiedMaterialIds()
  );

  const [activeSection, setActiveSection] = useState<AppSection>('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [aiConfigured, setAiConfigured] = useState<boolean | null>(null);

  // Practice navigation state
  const [practiceFilterSubject, setPracticeFilterSubject] = useState<
    'all' | SubjectId
  >('all');
  const [practiceFilterTopic, setPracticeFilterTopic] = useState<
    string | undefined
  >(undefined);
  const [practiceMode, setPracticeMode] = useState<'santai' | 'simulasi'>(
    'santai'
  );

  // AI Question Generator Modal state
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [generatorSubject, setGeneratorSubject] =
    useState<SubjectId>('numerasi');
  const [generatorTopic, setGeneratorTopic] = useState<string | undefined>(
    undefined
  );

  // Toast banner for newly generated AI questions
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mentor pre-seeded prompt & context
  const [mentorInitialPrompt, setMentorInitialPrompt] = useState<
    string | undefined
  >(undefined);
  const [mentorInitialContext, setMentorInitialContext] = useState<
    MentorContextPayload | undefined
  >(undefined);

  useEffect(() => {
    checkAiHealth().then((status) => setAiConfigured(status.aiConfigured));
  }, []);

  // Hybrid Question Bank: AI questions first (newest), followed by built-in questions
  const allQuestions = useMemo(
    () => [...aiQuestions, ...INITIAL_QUESTIONS],
    [aiQuestions]
  );

  const availableTopicsBySubject = useMemo(() => {
    const result: Record<SubjectId, string[]> = {
      literasi: [],
      numerasi: [],
      sains: [],
    };
    const gradeItems = allQuestions.filter((q) => q.grade === profile.grade);
    const gradeMats = INITIAL_STUDY_MATERIALS.filter(
      (m) => m.grade === profile.grade
    );

    (['literasi', 'numerasi', 'sains'] as SubjectId[]).forEach((sub) => {
      const topicSet = new Set<string>();
      gradeMats
        .filter((m) => m.subject === sub)
        .forEach((m) => topicSet.add(m.topic));
      gradeItems
        .filter((q) => q.subject === sub)
        .forEach((q) => topicSet.add(q.topic));
      result[sub] = Array.from(topicSet);
    });
    return result;
  }, [allQuestions, profile.grade]);

  const handleCompleteOnboarding = (newProfile: StudentProfile) => {
    saveStudentProfile(newProfile);
    setProfile(newProfile);
    setActiveSection('dashboard');
  };

  const handleSaveProfile = (updated: StudentProfile) => {
    saveStudentProfile(updated);
    setProfile(updated);
  };

  const handleRecordAttempt = (attempt: AttemptRecord) => {
    const updated = saveAttempt(attempt);
    setAttempts(updated);
  };

  const handleToggleStudied = (materialId: string) => {
    const updated = toggleStudiedMaterialId(materialId);
    setStudiedMaterialIds(updated);
  };

  const handleStartTopicPractice = (
    subject: SubjectId,
    topic?: string,
    mode: 'santai' | 'simulasi' = 'santai'
  ) => {
    setPracticeFilterSubject(subject);
    setPracticeFilterTopic(topic);
    setPracticeMode(mode);
    setActiveSection('practice');
  };

  const handleAskMentorAboutMaterial = (material: StudyMaterial) => {
    setMentorInitialContext({
      type: 'material',
      title: material.title,
      summary: `${material.summary} Poin penting: ${material.keyPoints.join(' ')}`,
    });
    setMentorInitialPrompt(
      `Kak Mentor, aku sedang membaca materi "${material.title}". Boleh jelaskan contoh penerapan sederhananya di soal TKAD DIY?`
    );
    setActiveSection('mentor');
  };

  const handleAskMentorGeneral = (starterPrompt?: string) => {
    setMentorInitialContext(undefined);
    setMentorInitialPrompt(starterPrompt);
    setActiveSection('mentor');
  };

  const handleOpenAiGenerator = (subject: SubjectId, topic?: string) => {
    setGeneratorSubject(subject);
    setGeneratorTopic(topic);
    setIsGeneratorOpen(true);
  };

  const handleQuestionsGenerated = (created: Question[]) => {
    const updated = saveAiQuestions(created);
    setAiQuestions(updated);
    if (created.length > 0) {
      setPracticeFilterSubject(created[0].subject);
      setPracticeFilterTopic(created[0].topic);
      setPracticeMode('santai');
      setActiveSection('practice');
      setToastMessage(
        `${created.length} soal baru topik "${created[0].topic}" berhasil dibuat dan disimpan ke bank soal lokalmu.`
      );
      window.setTimeout(() => setToastMessage(null), 5000);
    }
  };

  const handleDeleteAiQuestion = (questionId: string) => {
    const updated = removeAiQuestion(questionId);
    setAiQuestions(updated);
  };

  const handleResetProgress = () => {
    clearLearningProgress();
    setAttempts([]);
    setStudiedMaterialIds([]);
  };

  if (!profile.onboarded) {
    return (
      <OnboardingView
        initialProfile={profile}
        onComplete={handleCompleteOnboarding}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <TopNavbar
        activeSection={activeSection}
        onNavigate={setActiveSection}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {toastMessage && (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4">
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-900 flex items-center justify-between gap-4">
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-xs font-semibold text-emerald-800 hover:underline cursor-pointer shrink-0"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'dashboard' && (
          <DashboardView
            profile={profile}
            questions={allQuestions}
            materials={INITIAL_STUDY_MATERIALS}
            attempts={attempts}
            studiedMaterialIds={studiedMaterialIds}
            onNavigate={setActiveSection}
            onStartTopicPractice={handleStartTopicPractice}
            onAskMentorGeneral={handleAskMentorGeneral}
          />
        )}

        {activeSection === 'materials' && (
          <MaterialsView
            grade={profile.grade}
            materials={INITIAL_STUDY_MATERIALS}
            studiedMaterialIds={studiedMaterialIds}
            onToggleStudied={handleToggleStudied}
            onAskMentorAboutMaterial={handleAskMentorAboutMaterial}
            onPracticeTopic={(subject, topic) =>
              handleStartTopicPractice(subject, topic, 'santai')
            }
            onOpenAiGenerator={handleOpenAiGenerator}
          />
        )}

        {activeSection === 'practice' && (
          <PracticeView
            profile={profile}
            questions={allQuestions}
            initialSubject={practiceFilterSubject}
            initialTopic={practiceFilterTopic}
            initialMode={practiceMode}
            onRecordAttempt={handleRecordAttempt}
            onOpenAiGenerator={handleOpenAiGenerator}
            onDeleteAiQuestion={handleDeleteAiQuestion}
          />
        )}

        {activeSection === 'mentor' && (
          <MentorChatView
            profile={profile}
            initialPrompt={mentorInitialPrompt}
            initialContext={mentorInitialContext}
            onClearInitialPrompt={() => setMentorInitialPrompt(undefined)}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>
            Mentor TKA &amp; TKAD DIY · Pendamping Belajar SD Kelas 6 &amp; SMP
            Kelas 9
          </span>
          <span>
            {profile.grade === 'SD' ? 'SD Kelas 6' : 'SMP Kelas 9'} · Target{' '}
            {profile.targetSchool}
          </span>
        </div>
      </footer>

      <AiGeneratorModal
        key={`${generatorSubject}-${generatorTopic || ''}-${isGeneratorOpen}`}
        isOpen={isGeneratorOpen}
        grade={profile.grade}
        defaultSubject={generatorSubject}
        defaultTopic={generatorTopic}
        availableTopicsBySubject={availableTopicsBySubject}
        onClose={() => setIsGeneratorOpen(false)}
        onQuestionsGenerated={handleQuestionsGenerated}
      />

      <ProfileModal
        key={`${profile.name}-${profile.grade}-${isProfileOpen}`}
        isOpen={isProfileOpen}
        profile={profile}
        builtInCount={INITIAL_QUESTIONS.length}
        aiQuestionCount={aiQuestions.length}
        aiConfigured={aiConfigured}
        onClose={() => setIsProfileOpen(false)}
        onSave={handleSaveProfile}
        onResetProgress={handleResetProgress}
      />
    </div>
  );
}
