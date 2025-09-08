import { SparklineProps } from "@/types";
import { useMemo } from "react";

export function Sparkline({ 
  data, 
  width = 80, 
  height = 24, 
  color = "currentColor" 
}: SparklineProps) {
  const path = useMemo(() => {
    if (!data || data.length < 2) return '';
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1; // Avoid division by zero
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  }, [data, width, height]);

  if (!data || data.length === 0) {
    return (
      <div 
        className="flex items-center justify-center opacity-50"
        style={{ width, height }}
      >
        <div className="w-1 h-1 bg-current rounded-full animate-pulse" />
      </div>
    );
  }

  // Determine trend direction for color
  const isUpTrend = data.length >= 2 && data[data.length - 1] > data[0];
  const strokeColor = color === 'currentColor' 
    ? isUpTrend 
      ? 'hsl(var(--momentum-up))' 
      : 'hsl(var(--momentum-down))'
    : color;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
      style={{ color: strokeColor }}
    >
      <defs>
        <linearGradient id={`gradient-${Math.random()}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Fill area */}
      <path
        d={`${path} L ${width},${height} L 0,${height} Z`}
        fill={`url(#gradient-${Math.random()})`}
        className="opacity-20"
      />
      
      {/* Stroke line */}
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="filter drop-shadow-sm"
      />
      
      {/* End point indicator */}
      {data.length > 0 && (
        <circle
          cx={width}
          cy={height - ((data[data.length - 1] - Math.min(...data)) / (Math.max(...data) - Math.min(...data) || 1)) * height}
          r="1.5"
          fill="currentColor"
          className="filter drop-shadow-sm"
        />
      )}
    </svg>
  );
}