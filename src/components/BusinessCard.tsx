type Props = {
  title: string;
  subtitle: string;
  desc: string;
  emoji: string;
  gradient: string;
  onClick: () => void;
};

export default function BusinessCard({ title, subtitle, desc, emoji, gradient, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`relative flex-1 h-28 rounded-2xl overflow-hidden ${gradient} border border-white/10 hover:border-white/20 group transition-all duration-200 hover:scale-[1.02] text-left cursor-pointer`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
      <div className="relative h-full flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-sm">{title}</h3>
        <p className="text-white/70 font-medium text-xs">{subtitle}</p>
        <p className="text-white/50 text-[10px] mt-0.5 leading-tight">{desc}</p>
      </div>
      <div className="absolute right-4 top-3 text-3xl">{emoji}</div>
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
    </button>
  );
}
