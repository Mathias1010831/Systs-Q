import { useState, useEffect } from 'react';

type Props = {
  onOpen: () => void;
};

const BAR_COUNT = 28;

function generateBars() {
  return Array.from({ length: BAR_COUNT }, () => Math.floor(Math.random() * 70) + 20);
}

export default function HeroBanner({ onOpen }: Props) {
  const [bars, setBars] = useState(generateBars());
  const [highlightIdx, setHighlightIdx] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev => {
        const next = [...prev];
        const i = Math.floor(Math.random() * BAR_COUNT);
        const j = Math.floor(Math.random() * BAR_COUNT);
        setHighlightIdx(i);
        [next[i], next[j]] = [next[j], next[i]];
        return next;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const maxVal = Math.max(...bars);

  const colors = [
    '#818cf8', '#6366f1', '#8b5cf6', '#a78bfa',
    '#c084fc', '#e879f9', '#f472b6', '#fb7185',
    '#fb923c', '#fbbf24', '#a3e635', '#34d399',
    '#22d3ee', '#38bdf8', '#60a5fa', '#818cf8',
  ];

  return (
    <div
      onClick={onOpen}
      className="relative w-full h-44 rounded-2xl overflow-hidden cursor-pointer group bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Left text */}
      <div className="absolute left-6 top-0 bottom-0 flex flex-col justify-center z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div className="w-2 h-2 rounded-full bg-green-400" />
          </div>
        </div>
        <h1 className="text-white font-bold text-xl leading-tight">Systs-Q: Visualizador</h1>
        <h2 className="text-white/90 font-bold text-xl leading-tight">de Ordenamiento</h2>
        <p className="text-white/50 text-sm mt-2">Visualizador para seguro de ordenamiento</p>
        <div className="mt-4">
          <span className="inline-block px-4 py-1.5 bg-white/15 hover:bg-white/25 text-white text-sm rounded-full font-medium transition-colors">
            Explorar →
          </span>
        </div>
      </div>

      {/* Animated bars */}
      <div className="absolute right-4 top-4 bottom-4 flex items-end gap-[3px] w-52">
        {bars.map((val, idx) => (
          <div
            key={idx}
            className="flex-1 rounded-t-sm transition-all duration-300"
            style={{
              height: `${(val / maxVal) * 100}%`,
              backgroundColor: colors[idx % colors.length],
              opacity: idx === highlightIdx ? 1 : 0.7,
              transform: idx === highlightIdx ? 'scaleY(1.05)' : 'scaleY(1)',
            }}
          />
        ))}
      </div>

      {/* Shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
    </div>
  );
}
