// TrendScouter Type Definitions

export interface Trend {
  id: string;
  name: string;
  summary: string;
  momentum_score: number; // 0-100
  change_30d_pct: number; // percentage change
  image_url?: string;
}

export interface Subtrend {
  id: string;
  trend_id: string;
  name: string;
  description: string;
  momentum_score: number;
  sparkline: number[]; // array of daily values for last 30 days
}

export interface Startup {
  id: string;
  name: string;
  one_liner: string;
  logo_url?: string;
  tags: string[];
  website_url: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// Component prop types
export interface MomentumBadgeProps {
  score: number;
  change?: number;
  size?: 'sm' | 'md' | 'lg';
}

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}