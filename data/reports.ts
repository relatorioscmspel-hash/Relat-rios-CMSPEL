import { Report } from '../types';

export const reports: Report[] = [
  {
    id: 'REP-001',
    title: 'Relatório Anual de Gestão 2023',
    description: 'Documento consolidado com os resultados e investimentos do ano anterior.',
    date: '15/01/2024',
    category: 'Anual',
    fileSize: '4.2 MB',
    fileType: 'pdf'
  },
  {
    id: 'REP-002',
    title: 'Plano Municipal de Saúde 2022-2025',
    description: 'Diretrizes estratégicas e objetivos de longo prazo para a saúde municipal.',
    date: '10/05/2022',
    category: 'Planejamento',
    fileSize: '8.1 MB',
    fileType: 'pdf'
  },
  {
    id: 'REP-003',
    title: 'Prestação de Contas - 3º Quadrimestre 2023',
    description: 'Detalhamento financeiro e execução orçamentária do último período.',
    date: '28/02/2024',
    category: 'Prestação de Contas',
    fileSize: '2.5 MB',
    fileType: 'pdf'
  },
  {
    id: 'REP-004',
    title: 'Boletim Epidemiológico Mensal - Março',
    description: 'Monitoramento de doenças transmissíveis e agravos no município.',
    date: '05/04/2024',
    category: 'Mensal',
    fileSize: '1.2 MB',
    fileType: 'pdf'
  },
  {
    id: 'REP-005',
    title: 'Indicadores de Desempenho RAS - 2024.1',
    description: 'Planilha detalhada de monitoramento da Rede de Atenção à Saúde.',
    date: '12/03/2024',
    category: 'Outros',
    fileSize: '450 KB',
    fileType: 'xlsx'
  }
];