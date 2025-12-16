import React, { useMemo } from 'react';
import { IndicatorData, Status } from '../types';
import { ArrowDown, ArrowRight, ArrowUp, CheckCircle2, AlertCircle, MinusCircle } from 'lucide-react';

interface IndicatorCardProps {
  data: IndicatorData;
}

const parseValue = (val: string): number => {
  // Remove dots (thousand separators) but keep commas as decimal separators initially
  // Actually, standard PT-BR uses dot for thousands, comma for decimals.
  // JS uses dot for decimal.
  // 1. Remove non-numeric chars except comma and dot
  let clean = val.replace(/[^0-9.,]/g, '');
  
  // Handle cases like "1.158" (one thousand...) vs "2,20" (two point two)
  // Heuristic: If there is a comma, it's the decimal separator.
  if (clean.includes(',')) {
    clean = clean.replace(/\./g, '').replace(',', '.');
  } else {
      // If only dots, assume they are thousands separators UNLESS it's a small number like 1.2.3 (version style?)
      // But looking at data, "1.158" means 1158. "9.813" means 9813.
      // But "750.00" (target) means 750. 
      clean = clean.replace(/\./g, '');
  }
  
  // Edge case: "<1" -> 0.9 (just for comparison logic)
  if (val.includes('<1')) return 0.99;
  
  return parseFloat(clean);
};

export const IndicatorCard: React.FC<IndicatorCardProps> = ({ data }) => {
  const { status, isBetter } = useMemo(() => {
    const current = parseValue(data.value2024);
    const meta = parseValue(data.meta2024);
    const prev = parseValue(data.value2023);

    let stat = Status.Neutral;
    
    // Check success based on direction
    if (data.direction === 'increase') {
      stat = current >= meta ? Status.Success : Status.Fail;
    } else if (data.direction === 'decrease') {
      stat = current <= meta ? Status.Success : Status.Fail;
    } else {
      // maintain: Usually means keeping it high or keeping it low? 
      // Most "Manter" contexts in the PDF imply "Keep at 100%" or "Keep low".
      // We'll treat "Manter" + "100%" as increase-like logic (>=).
      // If data.meta2024 is "100%", >= is pass.
      stat = current >= meta ? Status.Success : Status.Fail;
      // Special override for maintain specific logic if needed, but this covers 90%
    }
    
    // Trend check
    const better = data.direction === 'decrease' ? current < prev : current > prev;

    return { status: stat, isBetter: better };
  }, [data]);

  const statusColor = status === Status.Success ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-rose-700 bg-rose-50 border-rose-200';
  const icon = status === Status.Success ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{data.id}</span>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {icon}
            <span>{status === Status.Success ? 'Meta Atingida' : 'Abaixo da Meta'}</span>
          </div>
        </div>
        <h3 className="text-sm font-semibold text-slate-800 mb-4 min-h-[40px]" title={data.description}>
          {data.description}
        </h3>
        
        <div className="flex items-end gap-2 mb-4">
          <div className="text-3xl font-bold text-slate-900">
            {data.value2024}
          </div>
          <div className="text-xs text-slate-500 mb-1">
             / Meta: <span className="font-semibold text-slate-700">{data.meta2024}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 mt-auto">
        <div className="flex justify-between items-center text-xs text-slate-500">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-400">2022</span>
            <span className="font-medium">{data.value2022}</span>
          </div>
          <ArrowRight className="w-3 h-3 text-slate-300" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-400">2023</span>
            <span className="font-medium">{data.value2023}</span>
          </div>
          <ArrowRight className="w-3 h-3 text-slate-300" />
           <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-400">2024</span>
            <span className={`font-bold ${isBetter ? 'text-emerald-600' : 'text-rose-600'}`}>
              {data.value2024}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
