import { AppSection } from '../types';

interface TopNavbarProps {
  activeSection: AppSection;
  onNavigate: (section: AppSection) => void;
  onOpenProfile: () => void;
}

const NAV_ITEMS: { id: AppSection; label: string }[] = [
  { id: 'dashboard', label: 'Beranda' },
  { id: 'materials', label: 'Materi' },
  { id: 'practice', label: 'Latihan Soal' },
  { id: 'mentor', label: 'Kak Mentor' },
];

export function TopNavbar({
  activeSection,
  onNavigate,
  onOpenProfile,
}: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600"
        >
          Mentor TKA &amp; TKAD DIY
        </button>

        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium whitespace-nowrap shrink-0 pb-1 transition-colors cursor-pointer border-b-2 ${
                  isActive
                    ? 'text-sky-700 border-sky-600'
                    : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="shrink-0">
          <button
            type="button"
            onClick={onOpenProfile}
            className="px-4 py-2 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          >
            Profil Belajar
          </button>
        </div>
      </div>

      {/* Mobile secondary single-row tab strip (compact, under 15% viewport height) */}
      <nav
        aria-label="Navigasi Seluler"
        className="md:hidden border-t border-slate-100 px-3 py-1.5 flex items-center justify-between gap-1 bg-white overflow-x-auto"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isActive
                  ? 'bg-sky-50 text-sky-800'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
