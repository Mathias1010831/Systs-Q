import { useState } from 'react';
import { getSortSteps } from '../utils/sortingAlgorithms';
import { SortAlgorithm } from '../types';

const algorithms: SortAlgorithm[] = ['bubble', 'selection', 'insertion', 'merge', 'quick', 'heap'];
const algoNames: Record<SortAlgorithm, string> = {
  bubble: 'Bubble Sort', selection: 'Selection Sort', insertion: 'Insertion Sort',
  merge: 'Merge Sort', quick: 'Quick Sort', heap: 'Heap Sort',
};
const algoColors: Record<SortAlgorithm, string> = {
  bubble: 'bg-red-500', selection: 'bg-orange-500', insertion: 'bg-yellow-500',
  merge: 'bg-green-500', quick: 'bg-blue-500', heap: 'bg-purple-500',
};

export default function PerformanceAnalysis() {
  const [results, setResults] = useState<{ algo: SortAlgorithm; steps: number; time: number }[]>([]);
  const [size, setSize] = useState(30);
  const [running, setRunning] = useState(false);

  const runAnalysis = () => {
    setRunning(true);
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 200) + 1);
    const res = algorithms.map(algo => {
      const t0 = performance.now();
      const steps = getSortSteps(algo, [...arr]);
      const t1 = performance.now();
      return { algo, steps: steps.length, time: +(t1 - t0).toFixed(3) };
    });
    setResults(res.sort((a, b) => a.steps - b.steps));
    setRunning(false);
  };

  const maxSteps = results.length ? Math.max(...results.map(r => r.steps)) : 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 flex-1">
          <label className="text-white/50 text-xs whitespace-nowrap">Tamaño del arreglo: {size}</label>
          <input
            type="range" min={10} max={100} value={size}
            onChange={e => setSize(+e.target.value)}
            className="flex-1 accent-indigo-500"
          />
        </div>
        <button
          onClick={runAnalysis}
          disabled={running}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold transition-all disabled:opacity-50"
        >
          {running ? 'Analizando...' : '▶ Analizar'}
        </button>
      </div>

      {results.length > 0 ? (
        <div className="space-y-3">
          {results.map((r, i) => (
            <div key={r.algo} className="bg-white/5 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-white/30 text-xs w-4">#{i + 1}</span>
                  <div className={`w-2.5 h-2.5 rounded-full ${algoColors[r.algo]}`} />
                  <span className="text-white/90 text-sm font-medium">{algoNames[r.algo]}</span>
                </div>
                <div className="flex gap-4 text-xs text-white/50">
                  <span>{r.steps.toLocaleString()} pasos</span>
                  <span>{r.time}ms</span>
                </div>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full ${algoColors[r.algo]} rounded-full transition-all duration-500`}
                  style={{ width: `${(r.steps / maxSteps) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-32 text-white/30 text-sm">
          Presiona Analizar para comparar algoritmos
        </div>
      )}
    </div>
  );
}
