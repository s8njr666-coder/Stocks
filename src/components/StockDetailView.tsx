import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  Target, 
  Sliders, 
  Compass, 
  Layers, 
  TrendingUp, 
  DollarSign, 
  Activity,
  BarChart2
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Line } from 'recharts';
import { Stock, InterfaceMode, PaperTrade } from '../types';
import { ChasingRadar } from './ChasingRadar';
import { FactorScorecard } from './FactorScorecard';
import { DynamicSellEngine } from './DynamicSellEngine';
import { FrictionBacktestLab } from './FrictionBacktestLab';
import { ExecutiveSummaryAI } from './ExecutiveSummaryAI';
import { DecisionPlaybook } from './DecisionPlaybook';

interface StockDetailViewProps {
  stock: Stock;
  onBack: () => void;
  interfaceMode: InterfaceMode;
  onAddPaperTrade: (trade: PaperTrade) => void;
}

export const StockDetailView: React.FC<StockDetailViewProps> = ({
  stock,
  onBack,
  interfaceMode,
  onAddPaperTrade,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'factors' | 'exit' | 'friction' | 'playbook'>('overview');

  return (
    <div className="space-y-6" id="stock-detail-view-container">
      {/* Top Breadcrumb & Quick Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to AI Screener
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Viewing: <strong className="text-white font-mono">{stock.symbol}</strong> ({stock.name})</span>
        </div>
      </div>

      {/* Hero Stock Header */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex items-start justify-between gap-6 flex-wrap lg:flex-nowrap">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                {stock.symbol}
              </h2>
              <span className="text-sm font-semibold text-slate-300">
                {stock.name}
              </span>
              <span className="bg-slate-800 text-slate-400 text-xs px-2.5 py-0.5 rounded-full border border-slate-700">
                {stock.sector}
              </span>
            </div>

            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-3xl font-black text-white font-mono">
                ${stock.price.toFixed(2)}
              </span>
              <span className={`text-sm font-bold font-mono px-2 py-0.5 rounded ${
                stock.changePercent >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
              }`}>
                {stock.changePercent >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%)
              </span>
              <span className="text-xs text-slate-500">Volume: {stock.volume}</span>
            </div>
          </div>

          {/* Quick Stat Badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI Composite</div>
              <div className="text-lg font-black text-emerald-400 font-mono">{stock.scores.composite} / 10</div>
            </div>

            <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Chasing Risk</div>
              <div className={`text-lg font-black font-mono ${
                stock.chasingRisk.chasingRiskScore >= 70 ? 'text-rose-400' : 'text-emerald-400'
              }`}>
                {stock.chasingRisk.chasingRiskScore} / 100
              </div>
            </div>

            <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hard Stop</div>
              <div className="text-lg font-black text-rose-400 font-mono">${stock.sellGuidance.stopLossHard.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* 30-Day Historical Price & EMA/SMA Chart with Institutional Volume */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-4 text-slate-400">
              <span className="font-semibold text-slate-200">30-Day Price Action &amp; Trend Structure</span>
              <span className="flex items-center gap-1 text-blue-400">
                <span className="w-2.5 h-0.5 bg-blue-400 inline-block"></span> 20-Day EMA
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                <span className="w-2.5 h-0.5 bg-purple-400 inline-block"></span> 50-Day SMA
              </span>
            </div>
            <span className="text-slate-500 font-mono text-[11px]">Dark Pool Block Volume Bar (Bottom)</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stock.historicalPrices} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis 
                  stroke="#475569" 
                  fontSize={10} 
                  domain={['auto', 'auto']} 
                  tickFormatter={(v) => `$${v}`}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }}
                  formatter={(v: any, name: any) => [`$${Number(v).toFixed(2)}`, name === 'price' ? 'Close Price' : name === 'ema20' ? '20 EMA' : '50 SMA']}
                />
                <Area type="monotone" dataKey="price" stroke="#60a5fa" strokeWidth={2} fill="url(#priceGrad)" name="price" />
                <Line type="monotone" dataKey="ema20" stroke="#38bdf8" strokeWidth={1.5} dot={false} name="ema20" />
                <Line type="monotone" dataKey="sma50" stroke="#a855f7" strokeWidth={1.5} strokeDasharray="3 3" dot={false} name="sma50" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Anti-FOMO Chasing Radar always highlighted */}
      <ChasingRadar stock={stock} />

      {/* Sub-Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs sm:text-sm border-b border-slate-800" id="stock-detail-tabs">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-4 py-2.5 font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'overview'
              ? 'text-blue-400 border-blue-500 bg-slate-900/50'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Executive Synthesis &amp; AI Audit
        </button>

        <button
          onClick={() => setActiveSubTab('factors')}
          className={`px-4 py-2.5 font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'factors'
              ? 'text-indigo-400 border-indigo-500 bg-slate-900/50'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          Danelfin &amp; TipRanks Factor Scorecard
        </button>

        <button
          onClick={() => setActiveSubTab('exit')}
          className={`px-4 py-2.5 font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'exit'
              ? 'text-emerald-400 border-emerald-500 bg-slate-900/50'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Target className="w-4 h-4" />
          Dynamic Exit &amp; Position Sizer
        </button>

        <button
          onClick={() => setActiveSubTab('friction')}
          className={`px-4 py-2.5 font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'friction'
              ? 'text-purple-400 border-purple-500 bg-slate-900/50'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Sliders className="w-4 h-4" />
          Real Slippage &amp; EV Backtest
        </button>

        <button
          onClick={() => setActiveSubTab('playbook')}
          className={`px-4 py-2.5 font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'playbook'
              ? 'text-emerald-400 border-emerald-500 bg-slate-900/50'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          Deterministic Decision Playbook
        </button>
      </div>

      {/* Sub-Tab View Rendering */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          <ExecutiveSummaryAI stock={stock} />
          {interfaceMode === 'quant' && <FactorScorecard stock={stock} />}
          {interfaceMode === 'playbook' && <DecisionPlaybook stock={stock} />}
        </div>
      )}

      {activeSubTab === 'factors' && (
        <FactorScorecard stock={stock} />
      )}

      {activeSubTab === 'exit' && (
        <DynamicSellEngine stock={stock} onAddPaperTrade={onAddPaperTrade} />
      )}

      {activeSubTab === 'friction' && (
        <FrictionBacktestLab stock={stock} />
      )}

      {activeSubTab === 'playbook' && (
        <DecisionPlaybook stock={stock} />
      )}
    </div>
  );
};
