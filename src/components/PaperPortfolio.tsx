import React from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  TrendingDown, 
  AlertOctagon, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  DollarSign,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { PaperTrade, Stock } from '../types';

interface PaperPortfolioProps {
  trades: PaperTrade[];
  onRemoveTrade: (id: string) => void;
  onUpdateTradePrice?: (id: string, newPrice: number) => void;
  onNavigateToStock: (symbol: string) => void;
  stocks: Stock[];
}

export const PaperPortfolio: React.FC<PaperPortfolioProps> = ({
  trades,
  onRemoveTrade,
  onUpdateTradePrice,
  onNavigateToStock,
  stocks,
}) => {
  // Aggregate stats
  const totalCost = trades.reduce((acc, t) => acc + t.totalCost, 0);
  const totalValue = trades.reduce((acc, t) => acc + t.currentPrice * t.shares, 0);
  const totalSlippageIncurred = trades.reduce((acc, t) => acc + t.slippageIncurred, 0);
  const netPnL = totalValue - totalCost - totalSlippageIncurred;
  const netPnLPercent = totalCost > 0 ? (netPnL / totalCost) * 100 : 0;

  return (
    <div className="space-y-6" id="paper-portfolio-view">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold px-2.5 py-1 rounded-lg">
                Honest Execution Simulation
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Paper Trading &amp; Slippage-Adjusted Portfolio
              </h2>
            </div>
            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              Track your trade setups in real time. Unlike fake prediction paper accounts, AlphaTruth actively deducts realistic broker slippage and enforces non-negotiable stop-loss alarms.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-right min-w-[170px]">
              <div className="text-xs text-slate-400 font-semibold uppercase">Net Slippage-Adj P&amp;L</div>
              <div className={`text-xl font-black font-mono ${netPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {netPnL >= 0 ? '+' : ''}${netPnL.toFixed(2)} ({netPnLPercent >= 0 ? '+' : ''}{netPnLPercent.toFixed(2)}%)
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Total Slippage Paid: ${totalSlippageIncurred.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trade Table */}
      {trades.length === 0 ? (
        <div className="bg-slate-900 rounded-2xl p-12 border border-slate-800 text-center space-y-3">
          <Briefcase className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-200">No Active Paper Trades</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Select any stock from the Screener or Dynamic Sell Engine and click "Deploy Honest Paper Trade" to track your exit targets.
          </p>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-slate-400 font-semibold">
                  <th className="py-3 px-4">Symbol / Stock</th>
                  <th className="py-3 px-4">Entry / Shares</th>
                  <th className="py-3 px-4">Current Price</th>
                  <th className="py-3 px-4">Stop Loss</th>
                  <th className="py-3 px-4">Target 1 / 2</th>
                  <th className="py-3 px-4">Slippage Cost</th>
                  <th className="py-3 px-4">Net P&amp;L</th>
                  <th className="py-3 px-4">Status / Alert</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {trades.map((trade) => {
                  const currentValue = trade.currentPrice * trade.shares;
                  const tradePnL = currentValue - trade.totalCost - trade.slippageIncurred;
                  const tradePnLPercent = (tradePnL / trade.totalCost) * 100;
                  const isStoppedOut = trade.currentPrice <= trade.stopLoss;
                  const isTP1Hit = trade.currentPrice >= trade.target1;

                  return (
                    <tr key={trade.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => onNavigateToStock(trade.symbol)}
                          className="font-bold text-sm text-white hover:text-blue-400 flex items-center gap-1.5 cursor-pointer"
                        >
                          {trade.symbol}
                        </button>
                        <div className="text-[11px] text-slate-400 truncate max-w-[130px]">{trade.name}</div>
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <div className="text-slate-200">${trade.entryPrice.toFixed(2)}</div>
                        <div className="text-[11px] text-slate-400">{trade.shares} shares (${trade.totalCost.toFixed(0)})</div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-slate-100">
                        ${trade.currentPrice.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-rose-400">
                        ${trade.stopLoss.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-emerald-400">
                        <div>T1: ${trade.target1.toFixed(2)}</div>
                        <div className="text-[10px] text-slate-400">T2: ${trade.target2.toFixed(2)}</div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-400">
                        -${trade.slippageIncurred.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold">
                        <span className={tradePnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                          {tradePnL >= 0 ? '+' : ''}${tradePnL.toFixed(2)} ({tradePnLPercent.toFixed(2)}%)
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        {isStoppedOut ? (
                          <span className="bg-rose-500/20 text-rose-400 font-bold px-2 py-0.5 rounded text-[10px] border border-rose-500/30 flex items-center gap-1 w-fit">
                            <AlertOctagon className="w-3 h-3" />
                            STOP TRIGGERED
                          </span>
                        ) : isTP1Hit ? (
                          <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-500/30 flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3" />
                            T1 HIT (LOCK 35%)
                          </span>
                        ) : (
                          <span className="bg-blue-500/10 text-blue-400 font-medium px-2 py-0.5 rounded text-[10px] border border-blue-500/20 w-fit">
                            Active Holding
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onRemoveTrade(trade.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                          title="Close trade and remove from log"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
