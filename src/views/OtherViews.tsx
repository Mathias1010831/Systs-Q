import { useState } from 'react';
import SortingVisualizer from '../components/SortingVisualizer';
import PerformanceAnalysis from '../components/PerformanceAnalysis';
import ComparisonTool from '../components/ComparisonTool';
import { SortAlgorithm, AppView } from '../types';

type PlaceholderProps = { view: AppView };

const viewTitles: Record<AppView, { title: string; desc: string; emoji: string }> = {
  discover: { title: 'Descubrir', desc: '', emoji: '🔍' },
  applications: { title: 'Aplicaciones', desc: 'Todas las herramientas de visualización de algoritmos', emoji: '📱' },
  games: { title: 'Juegos', desc: 'Aprende algoritmos jugando', emoji: '🎮' },
  arcade: { title: 'Arcade', desc: 'Modo arcade de algoritmos', emoji: '🕹️' },
  create: { title: 'Crear', desc: 'Crea tus propios arreglos', emoji: '✏️' },
  work: { title: 'Trabajar', desc: 'Herramientas para el trabajo', emoji: '💼' },
  play: { title: 'Jugar', desc: 'Modo de juego libre', emoji: '🎯' },
  develop: { title: 'Desarrollar', desc: 'Herramientas para desarrolladores', emoji: '⚙️' },
  categories: { title: 'Categorías', desc: 'Todos los algoritmos por categoría', emoji: '🗂️' },
  updates: { title: 'Actualizaciones', desc: 'Últimas novedades de Systs-Q', emoji: '🔄' },
};

const ALGOS: { id: SortAlgorithm; name: string; color: string; emoji: string; desc: string }[] = [
  { id: 'bubble', name: 'Bubble Sort', color: 'bg-gradient-to-br from-red-700 to-red-500', emoji: '🫧', desc: 'O(n²) — El más simple' },
  { id: 'selection', name: 'Selection Sort', color: 'bg-gradient-to-br from-orange-700 to-orange-500', emoji: '🎯', desc: 'O(n²) — Selección mínima' },
  { id: 'insertion', name: 'Insertion Sort', color: 'bg-gradient-to-br from-yellow-700 to-yellow-500', emoji: '🃏', desc: 'O(n²) — Inserción ordenada' },
  { id: 'merge', name: 'Merge Sort', color: 'bg-gradient-to-br from-green-700 to-green-500', emoji: '🔀', desc: 'O(n log n) — Divide y vencerás' },
  { id: 'quick', name: 'Quick Sort', color: 'bg-gradient-to-br from-blue-700 to-blue-500', emoji: '⚡', desc: 'O(n log n) — El más rápido en práctica' },
  { id: 'heap', name: 'Heap Sort', color: 'bg-gradient-to-br from-purple-700 to-purple-500', emoji: '🏔️', desc: 'O(n log n) — Basado en montículo' },
];

export function ApplicationsView() {
  const [active, setActive] = useState<SortAlgorithm | null>(null);
  if (active) return <SortingVisualizer algorithm={active} onClose={() => setActive(null)} />;
  return (
    <div className="p-6 space-y-6 overflow-y-auto flex-1">
      <div>
        <h2 className="text-white text-2xl font-bold mb-1">📱 Aplicaciones</h2>
        <p className="text-white/50 text-sm">Selecciona un algoritmo para visualizarlo</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {ALGOS.map(algo => (
          <button
            key={algo.id}
            onClick={() => setActive(algo.id)}
            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-5 flex items-start gap-4 transition-all duration-200 hover:scale-[1.01] text-left cursor-pointer"
          >
            <div className={`w-14 h-14 rounded-2xl ${algo.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
              {algo.emoji}
            </div>
            <div>
              <h3 className="text-white font-semibold">{algo.name}</h3>
              <p className="text-white/50 text-sm mt-0.5">{algo.desc}</p>
              <span className="inline-block mt-2 text-xs text-blue-400 font-medium">Abrir visualizador →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function DevelopView() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto flex-1">
      <div>
        <h2 className="text-white text-2xl font-bold mb-1">⚙️ Desarrollar</h2>
        <p className="text-white/50 text-sm">Herramientas avanzadas para desarrolladores</p>
      </div>
      <div className="space-y-4">
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
          <h3 className="text-white font-semibold mb-3">📊 Análisis de Rendimiento</h3>
          <PerformanceAnalysis />
        </div>
      </div>
    </div>
  );
}

export function WorkView() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto flex-1">
      <div>
        <h2 className="text-white text-2xl font-bold mb-1">💼 Herramientas de Comparación</h2>
        <p className="text-white/50 text-sm">Compara algoritmos en tiempo real</p>
      </div>
      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
        <ComparisonTool />
      </div>
    </div>
  );
}

export function CategoriesView() {
  const categories = [
    { name: 'Cuadráticos O(n²)', algos: ['Bubble Sort', 'Selection Sort', 'Insertion Sort'], color: 'from-red-700 to-orange-700', emoji: '🐌' },
    { name: 'Logarítmicos O(n log n)', algos: ['Merge Sort', 'Quick Sort', 'Heap Sort'], color: 'from-green-700 to-teal-700', emoji: '🚀' },
    { name: 'Estables', algos: ['Bubble Sort', 'Insertion Sort', 'Merge Sort'], color: 'from-blue-700 to-indigo-700', emoji: '⚖️' },
    { name: 'In-Place', algos: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Heap Sort'], color: 'from-purple-700 to-violet-700', emoji: '💾' },
  ];
  return (
    <div className="p-6 space-y-4 overflow-y-auto flex-1">
      <div>
        <h2 className="text-white text-2xl font-bold mb-1">🗂️ Categorías</h2>
        <p className="text-white/50 text-sm">Algoritmos organizados por característica</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {categories.map(cat => (
          <div key={cat.name} className={`rounded-2xl p-5 bg-gradient-to-br ${cat.color} border border-white/10`}>
            <div className="text-3xl mb-2">{cat.emoji}</div>
            <h3 className="text-white font-bold text-sm">{cat.name}</h3>
            <div className="mt-3 space-y-1">
              {cat.algos.map(a => (
                <div key={a} className="text-white/70 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
                  {a}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UpdatesView() {
  const updates = [
    { version: '2.0.0', date: '2024-01', desc: 'Herramienta de comparación en paralelo. Nuevo diseño inspirado en macOS App Store.', badge: 'Nuevo' },
    { version: '1.5.0', date: '2023-11', desc: 'Análisis de rendimiento avanzado. Soporte para Heap Sort.', badge: 'Mejora' },
    { version: '1.2.0', date: '2023-08', desc: 'Tutoriales interactivos. Quick Sort optimizado.', badge: 'Mejora' },
    { version: '1.0.0', date: '2023-05', desc: 'Lanzamiento inicial con Bubble, Selection, Insertion y Merge Sort.', badge: 'Inicial' },
  ];
  return (
    <div className="p-6 space-y-4 overflow-y-auto flex-1">
      <div>
        <h2 className="text-white text-2xl font-bold mb-1">🔄 Actualizaciones</h2>
        <p className="text-white/50 text-sm">Historial de versiones de Systs-Q</p>
      </div>
      <div className="space-y-3">
        {updates.map(u => (
          <div key={u.version} className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-bold">v{u.version}</span>
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-xs">{u.date}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.badge === 'Nuevo' ? 'bg-blue-500/20 text-blue-400' : u.badge === 'Inicial' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}`}>{u.badge}</span>
              </div>
            </div>
            <p className="text-white/60 text-sm">{u.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GamesView() {
  return <PlaceholderView view="games" />;
}
export function ArcadeView() {
  return <PlaceholderView view="arcade" />;
}
export function CreateView() {
  return <PlaceholderView view="create" />;
}
export function PlayView() {
  return <PlaceholderView view="play" />;
}

function PlaceholderView({ view }: PlaceholderProps) {
  const info = viewTitles[view];
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="text-6xl mb-4">{info.emoji}</div>
      <h2 className="text-white text-2xl font-bold mb-2">{info.title}</h2>
      <p className="text-white/50 text-sm max-w-sm">{info.desc || 'Esta sección estará disponible próximamente.'}</p>
      <div className="mt-6 px-4 py-1.5 bg-white/10 text-white/60 text-sm rounded-full">Próximamente</div>
    </div>
  );
}
