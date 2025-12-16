export type GoalDirection = 'increase' | 'decrease' | 'maintain';

export interface IndicatorData {
  id: string;
  description: string;
  category: string; // e.g., "Acesso e Qualificação (RAS)"
  direction: GoalDirection;
  unit: string;
  value2022: string;
  value2023: string;
  value2024: string;
  meta2024: string;
  notes?: string;
}

export interface ParsedValue {
  original: string;
  numeric: number;
}

export enum Status {
  Success = 'success',
  Fail = 'fail',
  Neutral = 'neutral'
}