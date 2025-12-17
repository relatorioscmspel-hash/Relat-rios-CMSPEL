import React, { useState, useMemo } from 'react';
import { reports } from '../data/reports';
import { ReportCard } from './ReportCard';
import { FileText, Search, Filter, FolderOpen, ListFilter } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    return Array.from(new Set(reports.map(r => r.category)));
  }, []);

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            report.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white py-12 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
              <FolderOpen className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Relatórios CMSPEL</h1>
              <p className="text-slate-400 font-medium">Painel Central de Transparência e Documentação Técnica</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-8">
        {/* Navigation & Search */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 mb-10 border border-slate-100">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Pesquisar por nome ou conteúdo do relatório..." 
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4">
              <div className="relative min-w-[200px]">
                <ListFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select 
                  className="w-full pl-11 pr-8 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none text-sm font-semibold text-slate-600 cursor-pointer"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">Categorias</option>
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Filter className="w-4 h-4" />
            {filteredReports.length} {filteredReports.length === 1 ? 'Relatório Encontrado' : 'Relatórios Encontrados'}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
          
          {filteredReports.length === 0 && (
             <div className="col-span-full py-24 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <FileText className="w-16 h-16 mx-auto mb-4 text-slate-200" />
                <h3 className="text-xl font-bold text-slate-400">Nenhum documento encontrado</h3>
                <p className="text-slate-400 max-w-xs mx-auto mt-2">Tente ajustar seus termos de pesquisa ou selecionar outra categoria.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};