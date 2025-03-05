
import { cn } from "@/lib/utils";

interface CowSilhouettesProps {
  className?: string;
}

const CowSilhouettes = ({ className }: CowSilhouettesProps) => {
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1200 300" 
        className="w-full h-full fill-gauseva-bark"
        preserveAspectRatio="xMidYMax slice"
      >
        <g>
          {/* Cow silhouette 1 */}
          <path d="M50,200 C70,180 100,190 120,200 C130,180 150,180 160,200 C180,190 200,200 220,210 C240,220 260,200 280,210 C290,190 310,190 320,210 C350,220 380,200 400,220 L400,300 L50,300 Z" />
          
          {/* Cow silhouette 2 */}
          <path d="M450,220 C470,200 500,210 520,220 C530,200 550,200 560,220 C580,210 600,220 620,230 C640,240 660,220 680,230 C690,210 710,210 720,230 C750,240 780,220 800,240 L800,300 L450,300 Z" />
          
          {/* Cow silhouette 3 */}
          <path d="M850,210 C870,190 900,200 920,210 C930,190 950,190 960,210 C980,200 1000,210 1020,220 C1040,230 1060,210 1080,220 C1090,200 1110,200 1120,220 C1150,230 1180,210 1200,230 L1200,300 L850,300 Z" />
        </g>
      </svg>
    </div>
  );
};

export default CowSilhouettes;
