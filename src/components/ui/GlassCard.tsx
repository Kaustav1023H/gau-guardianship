
import { cn } from "@/lib/utils";
import { ReactNode, MouseEvent } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

const GlassCard = ({ children, className, hoverEffect = false, onClick }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "glass rounded-2xl p-6 backdrop-blur-sm bg-white/20 border border-white/30 shadow-lg transition-all duration-300",
        hoverEffect && "hover:shadow-xl hover:bg-white/30 hover:border-white/40 cursor-pointer",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
