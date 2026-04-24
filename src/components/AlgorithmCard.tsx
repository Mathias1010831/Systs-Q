type Props = {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  onClick: () => void;
};

export default function AlgorithmCard({ title, subtitle, emoji, color, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 group cursor-pointer"
    >
      <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-105 transition-transform duration-150`}>
        {emoji}
      </div>
      <div className="text-center">
        <p className="text-white/90 text-xs font-medium leading-tight">{title}</p>
        <p className="text-white/40 text-[10px] leading-tight mt-0.5">{subtitle}</p>
      </div>
    </button>
  );
}
