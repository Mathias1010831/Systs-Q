import { useState, useEffect, useRef } from 'react';
import { getSortSteps } from '../utils/sortingAlgorithms';
import { SortAlgorithm, SortStep } from '../types';

const ALGOS: SortAlgorithm[] = ['bubble', 'merge', 'quick', 'heap'];
const algoNames: Record<SortAlgorithm, string> = {
  bubble: 'Bubble', selection: 'Selection', insertion: 'Insertion',
  merge: 'Merge', quick: 'Quick', heap: 'Heap',
};
const algoColors: Record<SortAlgorithm, string> = {
  bubble: 'from-red-600 to-red-500', selection: 'from-orange-600 to-orange-500',
  insertion: 'from-yellow-600 to-yellow-500', merge: 'from-green-600 to-green-500',
  quick: 'from-blue-600 to-blue-500', heap: 'from-purple-600 to-purple-500',
};
const barColors: Record<SortAlgorithm, string> = {
  bubble: 'bg-red-500', selection: 'bg-orange-500', insertion: 'bg-yellow-500',
  merge: 'bg-green-500', quick: 'bg-blue-500', heap: 'bg-purple-500',
};

function generateArray(size: number) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 80) + 10);
}

export default function ComparisonTool() {
  const [size] = useState(20);
  const [speed, setSpeed] = useState(60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [states, setStates] = useState<Record<SortAlgorithm, { step: SortStep | null; progress: number; total: number }>>(() => {
    const init: any = {};
    ALGOS.forEach(a => { init[a] = { step: null, progress: 0, total: 0 }; });
    return init;
  });
  const baseArr = useRef(generateArray(size));
  const stepsMap = useRef<Record<string, SortStep[]>>({});
  const idxMap = useRef<Record<string, number>>({});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    baseArr.current = generateArray(size);
    stepsMap.current = {};
    idxMap.current = {};
    setRunning(false);
    setDone(false);
    const init: any = {};
    ALGOS.forEach(a => { init[a] = { step: null, progress: 0, total: 0 }; });
    setStates(init);
  };

  const start = () => {
    if (done) { reset(); return; }
    ALGOS.forEach(a => {
      if (!stepsMap.current[a]) {
        stepsMap.current[a] = getSortSteps(a, [...baseArr.current]);
        idxMap.current[a] = 0;
      }
    });
    setStates(prev => {
      const next = { ...prev };
      ALGOS.forEach(a => {
        next[a] = { ...next[a], total: stepsMap.current[a].length };
      });
      return next;
    });
    setRunning(true);
  };

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      let allDone = true;
      setStates(prev => {
        const next = { ...prev };
        ALGOS.forEach(a => {
          const idx = idxMap.current[a] ?? 0;
          const steps = stepsMap.current[a] ?? [];
          if (idx < steps.length) {
            allDone = false;
            next[a] = { step: steps[idx], progress: idx + 1, total: steps.length };
            idxMap.current[a] = idx + 1;
          }
        });
        return next;
      });
      if (allDone) {
        setRunning(false);
        setDone(true);
      } else {
        timerRef.current = setTimeout(tick, Math.max(5, 200 - speed * 1.9));
      }
    };
    timerRef.current = setTimeout(tick, Math.max(5, 200 - speed * 1.9));
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [running, speed]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 flex-1">
          <label className="text-white/50 text-xs whitespace-nowrap">Velocidad: {speed}</label>
          <input type="range" min={1} max={100} value={speed} onChange={e => setSpeed(+e.target.value)} className="flex-1 accent-indigo-500" />
        </div>
        <div className="flex gap-2">
          <button onClick={reset} disabled={running} className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 text-sm transition-all disabled:opacity-40">↺</button>
          {!running ? (
            <button onClick={start} className="px-5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold transition-all">
              {done ? '↻ Nuevo' : '▶ Comparar'}
            </button>
          ) : (
            <button onClick={() => setRunning(false)} className="px-5 py-1.5 rounded-xl bg-orange-500 text-white text-sm font-semibold">⏸</button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {ALGOS.map(algo => {
          const st = states[algo];
          const arr = st.step?.array ?? baseArr.current;
          const comparing = st.step?.comparing ?? [];
          const swapped = st.step?.swapped ?? [];
          const sorted = st.step?.sorted ?? [];
          const maxVal = Math.max(...arr);
          return (
            <div key={algo} className="bg-white/5 rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${algoColors[algo]}`} />
                  <span className="text-white/80 text-xs font-medium">{algoNames[algo]} Sort</span>
                </div>
                {st.total > 0 && (
                  <span className="text-white/30 text-[10px]">{st.progress}/{st.total}</span>
                )}
              </div>
              <div className="flex items-end gap-[1.5px] h-20">
                {arr.map((val, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 rounded-t-sm transition-all duration-75 ${
                      sorted.includes(idx) ? 'bg-emerald-400'
                      : swapped.includes(idx) ? 'bg-orange-400'
                      : comparing.includes(idx) ? 'bg-white'
                      : barColors[algo]
                    }`}
                    style={{ height: `${(val / maxVal) * 100}%`, opacity: sorted.includes(idx) ? 1 : 0.75 }}
                  />
                ))}
              </div>
              {st.total > 0 && (
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${algoColors[algo]} rounded-full transition-all`}
                    style={{ width: `${(st.progress / st.total) * 100}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {done && <div className="text-center text-emerald-400 text-sm font-medium">✅ ¡Comparación completada!</div>}
    </div>
  );
}
