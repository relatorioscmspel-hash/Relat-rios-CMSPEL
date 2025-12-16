import React, { useState, useMemo } from 'react';
import { indicators } from '../data/indicators';
import { IndicatorCard } from './IndicatorCard';
import { LayoutDashboard, Filter, Search, PieChart } from 'lucide-react';
import { Status } from '../types';

export const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'fail'>('all');

  const categories = useMemo(() => {
    return Array.from(new Set(indicators.map(i => i.category)));
  }, []);

  const parseStatus = (data: any) => {
    // Re-implementing simplified logic for filter matching
    // Ideally this logic should be shared or pre-calculated
     const parseValue = (val: string): number => {
      let clean = val.replace(/[^0-9.,]/g, '');
      if (clean.includes(',')) {
        clean = clean.replace(/\./g, '').replace(',', '.');
      } else {
          clean = clean.replace(/\./g, '');
      }
      if (val.includes('<1')) return 0.99;
      return parseFloat(clean);
    };
    
    const current = parseValue(data.value2024);
    const meta = parseValue(data.meta2024);
    
    if (data.direction === 'increase') return current >= meta ? Status.Success : Status.Fail;
    if (data.direction === 'decrease') return current <= meta ? Status.Success : Status.Fail;
    return current >= meta ? Status.Success : Status.Fail;
  };

  const filteredData = useMemo(() => {
    return indicators.filter(item => {
      const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      let matchesStatus = true;
      if (statusFilter !== 'all') {
        const status = parseStatus(item);
        matchesStatus = status === statusFilter;
      }

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategory, statusFilter]);

  const stats = useMemo(() => {
    let success = 0;
    let fail = 0;
    indicators.forEach(i => {
       if (parseStatus(i) === Status.Success) success++;
       else fail++;
    });
    return { total: indicators.length, success, fail, successRate: (success / indicators.length) * 100 };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">PMSPel 2024</h1>
                <p className="text-sm text-slate-500">Painel de Monitoramento de Indicadores de Saúde</p>
              </div>
            </div>
            
            {/* Summary Chips */}
            <div className="flex gap-2 text-sm">
                <div className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 flex flex-col items-center min-w-[80px]">
                    <span className="text-xs text-slate-500 uppercase font-bold">Total</span>
                    <span className="font-bold text-slate-900">{stats.total}</span>
                </div>
                <div className="bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 flex flex-col items-center min-w-[80px]">
                    <span className="text-xs text-emerald-600 uppercase font-bold">Atingidas</span>
                    <span className="font-bold text-emerald-700">{stats.success} ({Math.round(stats.successRate)}%)</span>
                </div>
                <div className="bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100 flex flex-col items-center min-w-[80px]">
                    <span className="text-xs text-rose-600 uppercase font-bold">Pendentes</span>
                    <span className="font-bold text-rose-700">{stats.fail}</span>
                </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Buscar por meta, descrição ou código..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
               <div className="relative min-w-[250px]">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm text-slate-700"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">Todas as Diretrizes</option>
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button 
                   onClick={() => setStatusFilter('all')}
                   className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${statusFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Todos
                </button>
                 <button 
                   onClick={() => setStatusFilter('success')}
                   className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${statusFilter === 'success' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Atingidas
                </button>
                 <button 
                   onClick={() => setStatusFilter('fail')}
                   className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${statusFilter === 'fail' ? 'bg-white text-rose-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Não Atingidas
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((indicator) => (
            <IndicatorCard key={indicator.id} data={indicator} />
          ))}
          {filteredData.length === 0 && (
             <div className="col-span-full py-20 text-center text-slate-400">
                <PieChart className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Nenhum indicador encontrado para os filtros selecionados.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
