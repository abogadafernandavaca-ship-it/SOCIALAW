
import React from 'react';
import { TrendingUp, Target, ShieldCheck, DollarSign } from 'lucide-react';
import { DashboardStats } from '../types';

interface StatsCardsProps {
  stats: DashboardStats;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-8 -mt-10">
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-50 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Capital en Gestión</p>
          <p className="text-2xl font-black text-[#002147] tabular-nums">${stats.totalCapital.toLocaleString()}</p>
        </div>
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
          <DollarSign size={24} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-50 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cruzada 100 Goal</p>
          <p className="text-2xl font-black text-[#002147] tabular-nums">{stats.activeProposals}%</p>
        </div>
        <div className="p-3 bg-pink-50 text-pink-600 rounded-2xl">
          <Target size={24} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-50 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tasa de Éxito</p>
          <p className="text-2xl font-black text-[#002147] tabular-nums">{stats.successRate}%</p>
        </div>
        <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
          <ShieldCheck size={24} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-50 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pendiente (Drafts)</p>
          <p className="text-2xl font-black text-[#002147] tabular-nums">${stats.pendingAmount.toLocaleString()}</p>
        </div>
        <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
          <TrendingUp size={24} />
        </div>
      </div>
    </div>
  );
};
