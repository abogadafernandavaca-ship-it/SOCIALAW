
export type Status = 'SENT' | 'DECLINED' | 'SUCCESS' | 'DRAFT';

export interface FundingProposal {
  id: string;
  org: string;
  activo: string;
  monto: number;
  email: string;
  estado: Status;
  date?: string;
}

export interface DashboardStats {
  totalCapital: number;
  activeProposals: number;
  successRate: number;
  pendingAmount: number;
}
