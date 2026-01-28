
import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, LayoutGrid, List, ChevronRight } from 'lucide-react';
import { MOCK_DATA, COLORS } from './constants';
import { StatsCards } from './components/StatsCards';
import { AIConsultant } from './components/AIConsultant';
import { FundingProposal, DashboardStats } from './types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const stats: DashboardStats = useMemo(() => {
    const total = MOCK_DATA.reduce((acc, curr) => acc + curr.monto, 0);
    const success = MOCK_DATA.filter(i => i.estado === 'SUCCESS').length;
    const active = MOCK_DATA.length;
    return {
      totalCapital: total,
      activeProposals: active,
      successRate: Math.round((success / active) * 100),
      pendingAmount: MOCK_DATA.filter(i => i.estado === 'DRAFT').reduce((acc, curr) => acc + curr.monto, 0)
    };
  }, []);

  const filteredData = useMemo(() => 
    MOCK_DATA.filter(item => 
      item.org.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.activo.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const chartData = useMemo(() => {
    return filteredData
      .filter(d => d.monto > 0)
      .slice(0, 5)
      .map(d => ({
        name: d.org.substring(0, 10) + '...',
        amount: d.monto,
        original: d.org
      }));
  }, [filteredData]);

  return (
    <div className="w-full min-h-screen bg-[#fffaff] font-sans text-slate-800 pb-20">
      {/* Top Banner Decoration */}
      <div className="h-2 w-full bg-gradient-to-r from-pink-300 via-orange-300 to-indigo-400"></div>

      {/* Main Header */}
      <header className="w-full bg-white border-b border-gray-100 px-8 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="bg-[#002147] w-16 h-20 flex items-center justify-center font-black text-white text-5xl italic rounded-3xl shadow-2xl">S</div>
            <div>
              <h1 className="text-4xl font-black text-[#002147] tracking-tighter uppercase leading-none">Socialaw</h1>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-[#002147] text-[10px] font-black tracking-[0.3em] uppercase opacity-40">Master CRM</span>
                <span className="h-px w-8 bg-orange-200"></span>
                <span className="text-orange-500 text-[10px] font-black tracking-[0.2em] uppercase">Pipeline Post-Halcyon</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="text-right mb-4">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Cruzada de las 100</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400" style={{ width: '27%' }}></div>
                </div>
                <span className="text-[11px] font-black text-[#002147]">27%</span>
              </div>
            </div>
            <button className="px-6 py-2 bg-[#002147] text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-navy-800 transition-colors">
              <Plus size={14} /> Nueva Propuesta
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 space-y-8">
        {/* Statistics Layer */}
        <StatsCards stats={stats} />

        {/* AI Analysis Tool */}
        <AIConsultant data={MOCK_DATA} />

        {/* Data & Charts Layer */}
        <div className="px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main List Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar fondos, activos u organizaciones..."
                  className="w-full pl-12 pr-4 py-2 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-orange-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 ml-4">
                <button 
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-xl ${viewMode === 'table' ? 'bg-[#002147] text-white' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                  <List size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('cards')}
                  className={`p-2 rounded-xl ${viewMode === 'cards' ? 'bg-[#002147] text-white' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                  <LayoutGrid size={20} />
                </button>
              </div>
            </div>

            {viewMode === 'table' ? (
              <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-gray-100">
                      <th className="px-8 py-5 w-16">ID</th>
                      <th className="px-8 py-5">Fondo / Organización</th>
                      <th className="px-8 py-5 text-right">Monto (USD)</th>
                      <th className="px-8 py-5 text-center">Estatus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredData.map((item) => (
                      <tr key={item.id} className="group hover:bg-[#fffaff] transition-all cursor-pointer">
                        <td className="px-8 py-6 text-xs font-bold text-slate-300 italic">#{item.id}</td>
                        <td className="px-8 py-6">
                          <p className="font-black text-[#002147] text-sm uppercase tracking-tight group-hover:text-orange-500 transition-colors">{item.org}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">{item.activo}</p>
                        </td>
                        <td className="px-8 py-6 text-right font-mono text-sm text-slate-500 font-bold">
                          {item.monto > 0 ? `$${item.monto.toLocaleString()}` : '—'}
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex justify-center">
                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
                              item.estado === 'SUCCESS' ? 'bg-green-50 text-green-600 border-green-100' :
                              item.estado === 'DECLINED' ? 'bg-gray-50 text-gray-400 border-gray-200' :
                              'bg-blue-50 text-blue-600 border-blue-100'
                            }`}>
                              {item.estado}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredData.map(item => (
                  <div key={item.id} className="bg-white p-6 rounded-3xl shadow-lg border border-gray-50 hover:border-orange-200 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-black text-slate-300 italic">#{item.id}</span>
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                         item.estado === 'SUCCESS' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {item.estado}
                      </span>
                    </div>
                    <h3 className="font-black text-[#002147] text-base uppercase mb-1">{item.org}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">{item.activo}</p>
                    <div className="flex justify-between items-center border-t border-gray-50 pt-4">
                      <p className="text-xl font-black text-slate-800 tabular-nums">${item.monto.toLocaleString()}</p>
                      <button className="p-2 text-orange-400 group-hover:translate-x-1 transition-transform">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar Charts */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
              <h3 className="text-[11px] font-black text-[#002147] uppercase tracking-[0.2em] mb-8 border-b border-slate-50 pb-4">Funding Distribution</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 900 }} 
                    />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{ fill: '#fffaff' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-[#002147] p-3 rounded-2xl shadow-2xl border border-white/10">
                              <p className="text-[10px] text-orange-400 font-black uppercase mb-1">{payload[0].payload.original}</p>
                              <p className="text-white font-black text-sm">${payload[0].value?.toLocaleString()}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="amount" radius={[8, 8, 8, 8]} barSize={30}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#fdba74' : '#fbcfe8'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-orange-50 p-8 rounded-[2.5rem] border border-white shadow-lg">
              <h3 className="text-[10px] font-black text-[#002147] uppercase tracking-widest mb-4">Meta Estratégica</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                "La Cruzada de las 100 no es solo volumen, es la diversificación de activos sociales para la resiliencia institucional de Socialaw."
              </p>
              <div className="mt-6 p-4 bg-white/40 rounded-2xl">
                <p className="text-[9px] font-black text-[#002147] uppercase tracking-widest mb-2">Próximo Hito</p>
                <p className="text-sm font-bold text-slate-700">Audit de Proyectos BID</p>
                <p className="text-[10px] text-orange-500 font-black mt-1">15 DE JUNIO, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Persistent Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-100 px-8 py-4 flex flex-col md:flex-row justify-between items-center z-50">
        <p className="text-[9px] font-black text-[#002147] tracking-[0.4em] uppercase opacity-50">
          Socialaw Asistencia | Asset Value $1.68M USD | Lead Researcher 2024
        </p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="flex items-center gap-2 text-[9px] font-black text-green-600 uppercase">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            Sistema Operativo
          </span>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
            v3.2.1 Stable
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
