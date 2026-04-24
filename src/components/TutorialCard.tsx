type Props = {
  title: string;
  desc: string;
  color: string;
  duration: string;
  onClick: () => void;
};

export default function TutorialCard({ title, desc, color, duration, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 group cursor-pointer"
    >
      <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-150 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <svg className="w-7 h-7 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        <div className="absolute bottom-1 right-1 bg-black/30 rounded text-white text-[8px] px-1 font-medium">{duration}</div>
      </div>
      <div className="text-center max-w-[72px]">
        <p className="text-white/90 text-xs font-medium leading-tight">{title}</p>
        <p className="text-white/40 text-[10px] leading-tight mt-0.5 line-clamp-2">{desc}</p>
      </div>
    </button>
  );
}
