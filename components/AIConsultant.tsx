
import React, { useState } from 'react';
import { Sparkles, BrainCircuit, Loader2 } from 'lucide-react';
import { analyzePipeline } from '../services/geminiService';
import { FundingProposal } from '../types';

interface AIConsultantProps {
  data: FundingProposal[];
}

export const AIConsultant: React.FC<AIConsultantProps> = ({ data }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzePipeline(data);
    setAnalysis(result || "Analysis failed.");
    setLoading(false);
  };

  return (
    <div className="w-full px-8 mb-8">
      <div className="bg-gradient-to-br from-[#002147] to-[#003366] rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BrainCircuit size={120} />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <Sparkles className="text-orange-400" size={24} />
              Inteligencia Halcyon AI
            </h2>
            <p className="text-blue-100/60 text-xs font-bold uppercase tracking-widest mt-2">
              Análisis predictivo de pipeline & estrategia de subvenciones
            </p>
          </div>
          
          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
            {loading ? 'Consultando...' : 'Generar Reporte Estratégico'}
          </button>
        </div>

        {analysis && (
          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl animate-fade-in">
            <h3 className="text-orange-400 text-[10px] font-black uppercase tracking-widest mb-4">Insights de la Cruzada</h3>
            <div className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap font-medium italic">
              {analysis}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
