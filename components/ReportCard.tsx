import React from 'react';
import { Report } from '../types';
import { FileText, Download, Calendar, Tag, FileSpreadsheet, FileCode } from 'lucide-react';

interface ReportCardProps {
  report: Report;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  const getIcon = () => {
    switch (report.fileType) {
      case 'xlsx': return <FileSpreadsheet className="w-8 h-8 text-emerald-500" />;
      case 'docx': return <FileCode className="w-8 h-8 text-blue-500" />;
      default: return <FileText className="w-8 h-8 text-rose-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-blue-300 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-slate-50 p-3 rounded-lg group-hover:bg-blue-50 transition-colors">
          {getIcon()}
        </div>
        <button className="text-slate-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-all">
          <Download className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4">
        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">
          {report.category}
        </span>
        <h3 className="text-lg font-bold text-slate-800 mt-2 line-clamp-2 leading-tight">
          {report.title}
        </h3>
        <p className="text-sm text-slate-500 mt-2 line-clamp-2 italic">
          {report.description}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{report.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Tag className="w-3.5 h-3.5" />
          <span>{report.fileSize}</span>
        </div>
      </div>
    </div>
  );
};