import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  Zap, 
  ShieldAlert, 
  ShieldCheck, 
  SlidersHorizontal,
  ChevronRight,
  Target
} from 'lucide-react';
import { Stock } from '../types';

interface StockScreenerProps {
  stocks: Stock[];
  selectedStock: Stock;
  onSelectStock: (stock: Stock) => void;
}

export const StockScreener: React.FC<StockScreenerProps> = ({
  stocks,
  selectedStock,
  onSelectStock,
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'highScore' | 'lowChasing' | 'extended'>('all');
  const [sortBy, setSortBy] = useState<'score' | 'chasing' | 'gain' | 'ev'>('score');

  // Filter stocks
  const filteredStocks = stocks.filter((stock) => {
    if (filterCategory === 'highScore') return stock.scores.composite >= 8.0;
    if (filterCategory === 'lowChasing') return stock.chasingRisk.chasingRiskScore <= 40;
    if (filterCategory === 'extended') return stock.chasingRisk.chasingRiskScore >= 60;
    return true;
  });

  // Sort stocks
  const sortedStocks = [...filteredStocks].sort((a, b) => {
    if (sortBy === 'score') return b.scores.composite - a.scores.composite;
    if (sortBy === 'chasing') return a.chasingRisk.chasingRiskScore - b.chasingRisk.chasingRiskScore;
    if (sortBy === 'gain') return b.changePercent - a.changePercent;
    if (sortBy === 'ev') return b.backtest.expectedValuePerThousand - a.backtest.expectedValuePerThousand;
    return 0;
  });

  return (
    <div className="space-y-6" id="stock-screener-view">
      {/* Filter & Sort Controls */}
      <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          <span className="text-slate-400 font-semibold mr-1">Filter By:</span>
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filterCategory === 'all'
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All Universe ({stocks.length})
          </button>
          <button
            onClick={() => setFilterCategory('lowChasing')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 ${
              filterCategory === 'lowChasing'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Safe Accumulation (Low Chasing Risk)
          </button>
          <button
            onClick={() => setFilterCategory('highScore')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 ${
              filterCategory === 'highScore'
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Top AI Composite (≥ 8.0/10)
          </button>
          <button
            onClick={() => setFilterCategory('extended')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 ${
              filterCategory === 'extended'
                ? 'bg-rose-600 text-white font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Extended Run (High Peak Risk)
          </button>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Sort:</span>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-950 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-blue-500 font-medium"
          >
            <option value="score">Highest AI Composite Score</option>
            <option value="chasing">Lowest Chasing Risk (Safest Entry)</option>
            <option value="gain">Today's % Change</option>
            <option value="ev">Realized Expected Value ($/1k)</option>
          </select>
        </div>
      </div>

      {/* Stock Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedStocks.map((stock) => {
          const isSelected = selectedStock?.symbol === stock.symbol;
          const { chasingRisk, scores, sellGuidance, backtest } = stock;
          const isSafeEntry = chasingRisk.chasingRiskScore <= 40;
          const isHighChasing = chasingRisk.chasingRiskScore >= 70;

          return (
            <div
              key={stock.symbol}
              onClick={() => onSelectStock(stock)}
              className={`bg-slate-900 rounded-2xl p-5 border transition-all cursor-pointer hover:shadow-xl hover:border-slate-600 relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-blue-500/10'
                  : 'border-slate-800'
              }`}
            >
              <div>
                {/* Header Row: Symbol, Name, Price */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-lg text-white font-mono">{stock.symbol}</span>
                      <span className="text-xs text-slate-400 truncate max-w-[130px]">{stock.name}</span>
                    </div>
                    <span className="text-[11px] text-slate-500">{stock.sector}</span>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-base text-white">${stock.price.toFixed(2)}</div>
                    <div className={`text-xs font-semibold ${stock.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                    </div>
                  </div>
                </div>

                {/* Score and Chasing Badges */}
                <div className="grid grid-cols-2 gap-2 my-3">
                  {/* AI Composite */}
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">AI Score:</span>
                    <span className={`text-xs font-black font-mono px-1.5 py-0.5 rounded ${
                      scores.composite >= 8.0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      scores.composite >= 6.5 ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {scores.composite} / 10
                    </span>
                  </div>

                  {/* Anti-FOMO Chasing Risk */}
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Chasing:</span>
                    <span className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded ${
                      isHighChasing ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      isSafeEntry ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {chasingRisk.chasingRiskScore} / 100
                    </span>
                  </div>
                </div>

                {/* Sell Guidance Snapshot (Hard Stop & T1) */}
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/50 text-[11px] space-y-1 my-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hard Stop Loss:</span>
                    <span className="font-mono text-rose-400 font-semibold">${sellGuidance.stopLossHard.toFixed(2)} ({sellGuidance.stopLossPercent}%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target 1 (+35% trim):</span>
                    <span className="font-mono text-emerald-400 font-semibold">${sellGuidance.takeProfit1.price.toFixed(2)} (+{sellGuidance.takeProfit1.percent}%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Real Expected Value:</span>
                    <span className="font-mono text-slate-300 font-semibold">+${backtest.expectedValuePerThousand.toFixed(0)} / $1k</span>
                  </div>
                </div>
              </div>

              {/* Action link */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  {chasingRisk.recommendedOrderType}
                </span>
                <span className="text-blue-400 font-semibold flex items-center gap-1 group">
                  Deep Audit <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
