import { motion } from "framer-motion";
import { Subtrend } from "@/types";
import { MomentumBadge } from "@/components/ui/momentum-badge";
import { Sparkline } from "@/components/ui/sparkline";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SubtrendTileProps {
  subtrend: Subtrend;
  index: number;
  onClick?: () => void;
  className?: string;
}

export function SubtrendTile({ subtrend, index, onClick, className }: SubtrendTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn("cursor-pointer group", className)}
      onClick={onClick}
    >
      <Card className="glass p-4 h-full hover:shadow-momentum/50 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors truncate">
              {subtrend.name}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {subtrend.description}
            </p>
          </div>
          
          <div className="ml-3 flex-shrink-0">
            <MomentumBadge score={subtrend.momentum_score} size="sm" />
          </div>
        </div>
        
        {/* Sparkline */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">30-day trend</span>
            <span className="text-xs font-mono text-muted-foreground">
              {subtrend.sparkline.length} points
            </span>
          </div>
          
          <div className="flex justify-center">
            <Sparkline 
              data={subtrend.sparkline}
              width={120}
              height={32}
            />
          </div>
        </div>
        
        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-lg" />
      </Card>
    </motion.div>
  );
}