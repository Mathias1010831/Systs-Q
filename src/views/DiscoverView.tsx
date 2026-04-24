import { useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import BusinessCard from '../components/BusinessCard';
import AlgorithmCard from '../components/AlgorithmCard';
import TutorialCard from '../components/TutorialCard';
import PerformanceAnalysis from '../components/PerformanceAnalysis';
import ComparisonTool from '../components/ComparisonTool';
import SortingVisualizer from '../components/SortingVisualizer';
import { SortAlgorithm } from '../types';

const algorithmCards = [
  { id: 'bubble', title: 'Algoritmos de Ejemplos', subtitle: 'Bubble Sort', emoji: '🫧', color: 'bg-gradient-to-br from-slate-700 to-slate-600' },
  { id: 'merge', title: 'Algoritmos de Gráciales', subtitle: 'Merge Sort', emoji: '🔀', color: 'bg-gradient-to-br from-green-700 to-green-600' },
  { id: 'quick', title: 'Algoritmos de Paralelismo', subtitle: 'Quick Sort', emoji: '⚡', color: 'bg-gradient-to-br from-yellow-700 to-orange-600' },
  { id: 'heap', title: 'Algoritmos de Lleneras', subtitle: 'Heap Sort', emoji: '🏔️', color: 'bg-gradient-to-br from-purple-700 to-purple-600' },
];

const tutorialCards = [
  { title: 'Tutoriales y Guías', desc: 'Enséñame cómo...', color: 'bg-gradient-to-br from-pink-600 to-rose-600', duration: '5m' },
  { title: 'Tutoriales y Guías', desc: 'Enséñame encuestar...', color: 'bg-gradient-to-br from-violet-600 to-purple-600', duration: '8m' },
  { title: 'Tutoriales y Guías', desc: 'Descubrimiento (try it...', color: 'bg-gradient-to-br from-indigo-600 to-blue-600', duration: '12m' },
];

const performanceCards = [
  { id: 'bubble', title: 'Análisis de Rendimiento', emoji: '📊', color: 'bg-gradient-to-br from-red-700 to-red-600' },
  { id: 'selection', title: 'Análisis de Rendimiento', emoji: '📈', color: 'bg-gradient-to-br from-orange-700 to-orange-600' },
  { id: 'insertion', title: 'Análisis de Rendimiento', emoji: '📉', color: 'bg-gradient-to-br from-amber-700 to-amber-600' },
  { id: 'merge', title: 'Análisis de Rendimiento', emoji: '📋', color: 'bg-gradient-to-br from-teal-700 to-teal-600' },
];

const comparisonCards = [
  { title: 'Herramientas de Comparación', emoji: '⚖️', color: 'bg-gradient-to-br from-cyan-700 to-cyan-600' },
  { title: 'Herramientas Comparar.', emoji: '🔍', color: 'bg-gradient-to-br from-blue-700 to-blue-600' },
  { title: 'Herramientas de Comparar.', emoji: '📐', color: 'bg-gradient-to-br from-indigo-700 to-indigo-600' },
  { title: 'Herramientas de Comparar.', emoji: '🧮', color: 'bg-gradient-to-br from-violet-700 to-violet-600' },
];

type Modal = 'visualizer' | 'performance' | 'comparison' | 'tutorial' | null;

export default function DiscoverView() {
  const [modal, setModal] = useState<Modal>(null);
  const [selectedAlgo, setSelectedAlgo] = useState<SortAlgorithm>('bubble');

  const openVisualizer = (algo: SortAlgorithm) => {
    setSelectedAlgo(algo);
    setModal('visualizer');
  };

  return (
    <div className="flex-1 overflow-y-auto h-full">
      {/* Modal Overlay */}
      {modal && (
        <div className="absolute inset-0 bg-[#1c1c1e] z-20 flex flex-col">
          {modal === 'visualizer' && (
            <SortingVisualizer algorithm={selectedAlgo} onClose={() => setModal(null)} />
          )}
          {modal === 'performance' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
                <button onClick={() => setModal(null)} className="text-white/40 hover:text-white/80 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h2 className="text-white font-semibold text-lg">Análisis de Rendimiento Avanzado</h2>
                  <p className="text-white/40 text-xs">Compara la eficiencia de cada algoritmo</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <PerformanceAnalysis />
              </div>
            </div>
          )}
          {modal === 'comparison' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
                <button onClick={() => setModal(null)} className="text-white/40 hover:text-white/80 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h2 className="text-white font-semibold text-lg">Herramientas de Comparación</h2>
                  <p className="text-white/40 text-xs">Visualiza múltiples algoritmos en paralelo</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <ComparisonTool />
              </div>
            </div>
          )}
          {modal === 'tutorial' && (
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
                <button onClick={() => setModal(null)} className="text-white/40 hover:text-white/80 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-white font-semibold text-lg">Tutoriales y Guías</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort', 'Selection Sort', 'Insertion Sort'].map(name => (
                  <div key={name} className="bg-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-white/8 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-600 to-violet-600 flex items-center justify-center text-white text-lg">▶</div>
                      <div>
                        <p className="text-white/90 text-sm font-medium">Cómo funciona {name}</p>
                        <p className="text-white/40 text-xs">Tutorial completo con ejemplos visuales</p>
                      </div>
                    </div>
                    <span className="text-white/30 text-xs">→</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="p-6 space-y-6 max-w-5xl">
        {/* Hero */}
        <HeroBanner onOpen={() => openVisualizer('bubble')} />

        {/* Business Cards */}
        <div className="flex gap-4">
          <BusinessCard
            title="Negocio / Empresa"
            subtitle="Análisis empresarial"
            desc="Gestión de datos, contabilidad y análisis para tu empresa"
            emoji="🏢"
            gradient="bg-gradient-to-br from-[#1e3a5f] to-[#0d2137]"
            onClick={() => setModal('performance')}
          />
          <BusinessCard
            title="Uso Personal"
            subtitle="Aprendizaje personal"
            desc="Aprendizaje de algoritmos y ordenamiento de datos personales"
            emoji="👤"
            gradient="bg-gradient-to-br from-[#2d1b4e] to-[#1a0d2e]"
            onClick={() => openVisualizer('insertion')}
          />
        </div>

        {/* Algorithms + Tutorials row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Algorithms */}
          <div>
            <h3 className="text-white font-semibold text-base mb-3">Algoritmos Destacados</h3>
            <div className="flex gap-5 flex-wrap">
              {algorithmCards.map(card => (
                <AlgorithmCard
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  subtitle={card.subtitle}
                  emoji={card.emoji}
                  color={card.color}
                  onClick={() => openVisualizer(card.id as SortAlgorithm)}
                />
              ))}
            </div>
          </div>

          {/* Tutorials */}
          <div>
            <h3 className="text-white font-semibold text-base mb-3">Tutoriales y Guías</h3>
            <div className="flex gap-5 flex-wrap">
              {tutorialCards.map((t, i) => (
                <TutorialCard
                  key={i}
                  title={t.title}
                  desc={t.desc}
                  color={t.color}
                  duration={t.duration}
                  onClick={() => setModal('tutorial')}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Performance + Comparison row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Performance */}
          <div>
            <h3 className="text-white font-semibold text-base mb-3">Análisis de Rendimiento Avanzado</h3>
            <div className="flex gap-5 flex-wrap">
              {performanceCards.map((card, i) => (
                <AlgorithmCard
                  key={i}
                  id={card.id}
                  title={card.title}
                  subtitle=""
                  emoji={card.emoji}
                  color={card.color}
                  onClick={() => setModal('performance')}
                />
              ))}
            </div>
          </div>

          {/* Comparison */}
          <div>
            <h3 className="text-white font-semibold text-base mb-3">Herramientas de Comparación</h3>
            <div className="flex gap-5 flex-wrap">
              {comparisonCards.map((card, i) => (
                <AlgorithmCard
                  key={i}
                  id={`comp-${i}`}
                  title={card.title}
                  subtitle=""
                  emoji={card.emoji}
                  color={card.color}
                  onClick={() => setModal('comparison')}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/5 pt-4 pb-2">
          <p className="text-white/20 text-xs text-center">
            Systs-Q · Sorting Visualizer & Business Tools · Versión 2.0 · © 2024
          </p>
        </div>
      </div>
    </div>
  );
}
