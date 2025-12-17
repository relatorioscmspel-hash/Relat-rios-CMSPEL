export type ReportCategory = 'Anual' | 'Mensal' | 'Planejamento' | 'Prestação de Contas' | 'Outros';

export interface Report {
  id: string;
  title: string;
  description: string;
  date: string;
  category: ReportCategory;
  fileSize: string;
  fileType: 'pdf' | 'xlsx' | 'docx';
}