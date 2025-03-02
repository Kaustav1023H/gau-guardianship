
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard = ({ children, className, hoverEffect = false }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "glass rounded-2xl p-6 backdrop-blur-sm bg-white/20 border border-white/30 shadow-lg transition-all duration-300",
        hoverEffect && "hover:shadow-xl hover:scale-[1.02] hover:bg-white/30",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
