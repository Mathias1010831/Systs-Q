import { AppView } from '../types';

type Props = {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
};

const navItems = [
  { id: 'discover', label: 'Descubrir', icon: '🔍', color: 'text-blue-400' },
  { id: 'applications', label: 'Aplicaciones', icon: '📱', color: 'text-blue-500' },
  { id: 'games', label: 'Juegos', icon: '🎮', color: 'text-orange-400' },
  { id: 'arcade', label: 'Arcade', icon: '🕹️', color: 'text-pink-400' },
  { id: 'create', label: 'Crear', icon: '✏️', color: 'text-yellow-400' },
  { id: 'work', label: 'Trabajar', icon: '💼', color: 'text-green-400' },
  { id: 'play', label: 'Jugar', icon: '🎯', color: 'text-purple-400' },
  { id: 'develop', label: 'Desarrollar', icon: '⚙️', color: 'text-cyan-400' },
  { id: 'categories', label: 'Categorías', icon: '🗂️', color: 'text-indigo-400' },
  { id: 'updates', label: 'Actualizaciones', icon: '🔄', color: 'text-teal-400' },
];

export default function Sidebar({ activeView, onNavigate }: Props) {
  return (
    <aside className="w-52 flex-shrink-0 h-full flex flex-col bg-[#1c1c1e] border-r border-white/5">
      {/* Traffic lights */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer transition-colors" />
        <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer transition-colors" />
        <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer transition-colors" />
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
          <svg className="w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-white/30 text-sm">Buscar</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as AppView)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 mb-0.5 text-left ${
              activeView === item.id
                ? 'bg-white/15 text-white font-medium'
                : 'text-white/60 hover:text-white hover:bg-white/8'
            }`}
          >
            <span className="text-base leading-none">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/5">
        <p className="text-white/20 text-xs text-center">Versión 2.0</p>
      </div>
    </aside>
  );
}
