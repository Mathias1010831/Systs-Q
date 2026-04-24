import { useState, useEffect, useRef, useCallback } from 'react';
import { getSortSteps } from '../utils/sortingAlgorithms';
import { SortStep, SortAlgorithm } from '../types';

type Props = {
  algorithm: SortAlgorithm;
  onClose: () => void;
};

const algorithmInfo: Record<SortAlgorithm, { name: string; timeAvg: string; timeWorst: string; space: string; stable: boolean; desc: string }> = {
  bubble: { name: 'Bubble Sort', timeAvg: 'O(n²)', timeWorst: 'O(n²)', space: 'O(1)', stable: true, desc: 'Compara e intercambia elementos adyacentes repetidamente.' },
  selection: { name: 'Selection Sort', timeAvg: 'O(n²)', timeWorst: 'O(n²)', space: 'O(1)', stable: false, desc: 'Selecciona el mínimo en cada pasada y lo coloca en su posición.' },
  insertion: { name: 'Insertion Sort', timeAvg: 'O(n²)', timeWorst: 'O(n²)', space: 'O(1)', stable: true, desc: 'Inserta cada elemento en su posición correcta dentro de la parte ordenada.' },
  merge: { name: 'Merge Sort', timeAvg: 'O(n log n)', timeWorst: 'O(n log n)', space: 'O(n)', stable: true, desc: 'Divide el arreglo en mitades, las ordena y las fusiona.' },
  quick: { name: 'Quick Sort', timeAvg: 'O(n log n)', timeWorst: 'O(n²)', space: 'O(log n)', stable: false, desc: 'Utiliza un pivote para particionar y ordenar recursivamente.' },
  heap: { name: 'Heap Sort', timeAvg: 'O(n log n)', timeWorst: 'O(n log n)', space: 'O(1)', stable: false, desc: 'Construye un montículo máximo y extrae elementos en orden.' },
};

function generateArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

export default function SortingVisualizer({ algorithm, onClose }: Props) {
  const [arraySize, setArraySize] = useState(40);
  const [speed, setSpeed] = useState(50);
  const [array, setArray] = useState<number[]>(() => generateArray(40));
  const [currentStep, setCurrentStep] = useState<SortStep | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const stepsRef = useRef<SortStep[]>([]);
  const stepIdxRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const info = algorithmInfo[algorithm];

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const newArr = generateArray(arraySize);
    setArray(newArr);
    setCurrentStep(null);
    setIsRunning(false);
    setIsDone(false);
    setStepCount(0);
    setTotalSteps(0);
    stepsRef.current = [];
    stepIdxRef.current = 0;
  }, [arraySize]);

  useEffect(() => { reset(); }, [algorithm, arraySize]);

  const runStep = useCallback(() => {
    if (stepIdxRef.current >= stepsRef.current.length) {
      setIsRunning(false);
      setIsDone(true);
      return;
    }
    const step = stepsRef.current[stepIdxRef.current];
    setCurrentStep(step);
    setStepCount(stepIdxRef.current + 1);
    stepIdxRef.current++;
    timerRef.current = setTimeout(runStep, Math.max(5, 210 - speed * 2));
  }, [speed]);

  const start = useCallback(() => {
    if (isDone) { reset(); return; }
    if (stepsRef.current.length === 0) {
      const steps = getSortSteps(algorithm, array);
      stepsRef.current = steps;
      setTotalSteps(steps.length);
    }
    setIsRunning(true);
  }, [algorithm, array, isDone, reset]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setTimeout(runStep, Math.max(5, 210 - speed * 2));
      return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, [isRunning, runStep, speed]);

  const pause = () => {
    setIsRunning(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const displayArr = currentStep ? currentStep.array : array;
  const comparing = currentStep?.comparing ?? [];
  const swapped = currentStep?.swapped ?? [];
  const sorted = currentStep?.sorted ?? [];
  const maxVal = Math.max(...displayArr);

  const getBarColor = (idx: number) => {
    if (sorted.includes(idx)) return 'bg-emerald-400';
    if (swapped.includes(idx)) return 'bg-orange-400';
    if (comparing.includes(idx)) return 'bg-blue-400';
    return 'bg-indigo-500/80';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="text-white/40 hover:text-white/80 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h2 className="text-white font-semibold text-lg">{info.name}</h2>
            <p className="text-white/40 text-xs">{info.desc}</p>
          </div>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 bg-white/10 rounded-md text-white/60">Tiempo: {info.timeAvg}</span>
          <span className="px-2 py-1 bg-white/10 rounded-md text-white/60">Espacio: {info.space}</span>
          <span className={`px-2 py-1 rounded-md text-xs ${info.stable ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {info.stable ? 'Estable' : 'Inestable'}
          </span>
        </div>
      </div>

      {/* Visualizer */}
      <div className="flex-1 flex flex-col px-6 py-4 gap-4">
        {/* Bars */}
        <div className="flex-1 flex items-end gap-[2px] bg-white/3 rounded-xl p-4 min-h-0">
          {displayArr.map((val, idx) => (
            <div
              key={idx}
              className={`flex-1 rounded-t-sm transition-all duration-75 ${getBarColor(idx)}`}
              style={{ height: `${(val / maxVal) * 100}%`, minWidth: '2px' }}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-xs text-white/50 justify-center">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-indigo-500/80" /><span>Normal</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-blue-400" /><span>Comparando</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-orange-400" /><span>Intercambiando</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-emerald-400" /><span>Ordenado</span></div>
        </div>

        {/* Progress */}
        {totalSteps > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-white/40">
              <span>Progreso</span>
              <span>{stepCount} / {totalSteps} pasos</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all"
                style={{ width: `${(stepCount / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 flex-1">
            <label className="text-white/50 text-xs whitespace-nowrap">Tamaño: {arraySize}</label>
            <input
              type="range" min={10} max={80} value={arraySize}
              onChange={e => { if (!isRunning) setArraySize(+e.target.value); }}
              disabled={isRunning}
              className="flex-1 accent-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2 flex-1">
            <label className="text-white/50 text-xs whitespace-nowrap">Velocidad: {speed}</label>
            <input
              type="range" min={1} max={100} value={speed}
              onChange={e => setSpeed(+e.target.value)}
              className="flex-1 accent-indigo-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            disabled={isRunning}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 text-sm font-medium transition-all disabled:opacity-40"
          >
            ↺ Reiniciar
          </button>
          {!isRunning ? (
            <button
              onClick={start}
              className="px-8 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-900/40"
            >
              {isDone ? '↻ Nuevo' : stepsRef.current.length > 0 ? '▶ Continuar' : '▶ Iniciar'}
            </button>
          ) : (
            <button
              onClick={pause}
              className="px-8 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-all"
            >
              ⏸ Pausar
            </button>
          )}
        </div>

        {isDone && (
          <div className="text-center text-emerald-400 text-sm font-medium animate-pulse">
            ✅ ¡Ordenamiento completado en {stepCount} pasos!
          </div>
        )}
      </div>
    </div>
  );
}
