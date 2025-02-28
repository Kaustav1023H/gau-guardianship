
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
        "glass rounded-2xl p-6 transition-all duration-300",
        hoverEffect && "hover-lift",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
