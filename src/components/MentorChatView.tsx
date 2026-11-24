import React, { useEffect, useRef, useState } from 'react';
import { Loader2, RotateCcw, Send } from 'lucide-react';
import { askKakMentor } from '../services/geminiService';
import {
  ChatMessage,
  MentorContextPayload,
  StudentProfile,
} from '../types';

interface MentorChatViewProps {
  profile: StudentProfile;
  initialPrompt?: string;
  initialContext?: MentorContextPayload;
  onClearInitialPrompt?: () => void;
}

export function MentorChatView({
  profile,
  initialPrompt,
  initialContext,
  onClearInitialPrompt,
}: MentorChatViewProps) {
  const gradeLabel = profile.grade === 'SD' ? 'SD Kelas 6' : 'SMP Kelas 9';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-mentor',
      role: 'mentor',
      text: `Halo ${profile.name}, sugeng sinau! Aku Kak Mentor, guru les privatmu dari Jogja.\n\nKita lagi fokus nyiapin TKA & TKAD ${gradeLabel} buat tembus ${profile.targetSchool} ya. Ada soal yang bikin bingung atau materi yang ingin kita bedah pelan-pelan hari ini? Ceritakan saja, nanti Kak Mentor bimbing langkah demi langkah!`,
      modelUsed: 'gemini-3.8-flash',
      timestamp: new Date().toISOString(),
    },
  ]);

  const [input, setInput] = useState('');
  const [deepMode, setDeepMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeContext, setActiveContext] = useState<
    MentorContextPayload | undefined
  >(initialContext);
  const listEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setActiveContext(initialContext);
  }, [initialContext]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      void sendMessage(initialPrompt, initialContext);
      onClearInitialPrompt?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (
    customText?: string,
    overrideContext?: MentorContextPayload
  ) => {
    const text = (customText ?? input).trim();
    if (!text || loading) return;

    setErrorMsg(null);
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toISOString(),
    };
    const prevMessages = [...messages];
    setMessages([...prevMessages, userMsg]);
    if (!customText) setInput('');
    setLoading(true);

    try {
      const res = await askKakMentor({
        message: text,
        history: prevMessages,
        studentProfile: profile,
        context: overrideContext ?? activeContext,
        deepMode,
      });

      const mentorMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        role: 'mentor',
        text: res.reply,
        modelUsed: res.modelUsed,
        timestamp: new Date().toISOString(),
      };
      setMessages((curr) => [...curr, mentorMsg]);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Gagal menghubungi Kak Mentor.'
      );
    } finally {
      setLoading(false);
    }
  };

  const starterPrompts =
    profile.grade === 'SD'
      ? [
          'Kak, ajarin cara bedain kalimat utama sama kalimat penjelas dong.',
          'Aku sering keliru soal pecahan dari sisa, bimbing aku pelan-pelan ya Kak.',
          'Gimana cara gampang mengingat perpindahan panas konduksi, konveksi, radiasi?',
        ]
      : [
          'Kak, tolong bimbing cara cepat menyusun persamaan dari soal cerita SPLDV.',
          'Gimana cara membedakan kalimat fakta dan opini di teks panjang TKAD?',
          'Bantu aku paham rumus kalor Q = m·c·ΔT lewat contoh sehari-hari dong, Kak.',
        ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Persona & Mode Card */}
      <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-4">
          <img
            src="/src/assets/images/avatar_kak_mentor_1795488088402.jpg"
            alt="Potret ilustrasi Kak Mentor"
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
          />
          <div>
            <h1 className="font-display text-lg font-bold text-slate-900">
              Kak Mentor DIY
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Guru Les Privat · {gradeLabel}
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Kak Mentor membimbingmu dengan metode bertahap (<em>scaffolding</em>)
          agar kamu benar-benar paham konsepnya, bukan sekadar menghafal kunci
          jawaban.
        </p>

        <div className="pt-4 border-t border-slate-100 space-y-2.5">
          <span className="block text-xs font-semibold text-slate-700">
            Mode Respons AI
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setDeepMode(false)}
              className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                !deepMode
                  ? 'border-sky-700 bg-sky-50 text-sky-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="text-xs font-bold">Respons Cepat</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Gemini 2.5 Flash
              </div>
            </button>
            <button
              type="button"
              onClick={() => setDeepMode(true)}
              className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                deepMode
                  ? 'border-sky-700 bg-sky-50 text-sky-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="text-xs font-bold">Pembahasan Dalam</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Gemini 2.5 Pro
              </div>
            </button>
          </div>
        </div>

        {activeContext && activeContext.type === 'material' && (
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-900">
                Topik Aktif
              </span>
              <button
                type="button"
                onClick={() => setActiveContext(undefined)}
                className="text-xs text-amber-800 underline cursor-pointer"
              >
                Lepas
              </button>
            </div>
            <p className="text-xs text-amber-950 font-medium">
              {activeContext.title}
            </p>
          </div>
        )}

        <div className="pt-2 space-y-2">
          <div className="text-xs font-semibold text-slate-700">
            Contoh Pertanyaan Pemantik
          </div>
          <div className="space-y-2">
            {starterPrompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => sendMessage(p)}
                className="w-full text-left p-2.5 text-xs text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Right Chat Stream */}
      <section className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl flex flex-col h-[640px]">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-base text-slate-900">
              Ruang Mentoring Pribadi
            </h2>
            <p className="text-xs text-slate-500">
              Mode aktif: {deepMode ? 'Gemini 2.5 Pro (Analisis Kompleks)' : 'Gemini 2.5 Flash (Cepat)'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveContext(undefined);
              setMessages([messages[0]]);
            }}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Obrolan Baru</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-sky-700 text-white'
                    : 'bg-slate-50 border border-slate-200 text-slate-800'
                }`}
              >
                <div className="text-[11px] font-semibold mb-1 opacity-75">
                  {msg.role === 'user'
                    ? profile.name
                    : `Kak Mentor${msg.modelUsed ? ` · ${msg.modelUsed}` : ''}`}
                </div>
                <div className="whitespace-pre-line">{msg.text}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-50 border border-slate-200 text-slate-600 rounded-2xl px-4 py-3 text-sm inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-sky-700" />
                <span>Kak Mentor sedang menuliskan bimbingan...</span>
              </div>
            </div>
          )}
          <div ref={listEndRef} />
        </div>

        {errorMsg && (
          <div className="mx-6 mb-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
            {errorMsg}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="p-4 border-t border-slate-200 flex items-center gap-2.5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis pertanyaanmu atau ceritakan bagian yang bikin bingung..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-600"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 disabled:opacity-40 text-white text-sm font-semibold rounded-xl inline-flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
            <span>Kirim</span>
          </button>
        </form>
      </section>
    </div>
  );
}
