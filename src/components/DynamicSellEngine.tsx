import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Target, 
  Clock, 
  TrendingDown, 
  ArrowRight, 
  Check, 
  Calculator, 
  AlertOctagon, 
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { Stock, PaperTrade } from '../types';

interface DynamicSellEngineProps {
  stock: Stock;
  onAddPaperTrade?: (trade: PaperTrade) => void;
}

export const DynamicSellEngine: React.FC<DynamicSellEngineProps> = ({ stock, onAddPaperTrade }) => {
  const { sellGuidance, price, symbol, name } = stock;
  const {
    stopLossHard,
    stopLossPercent,
    trailingStopATR,
    takeProfit1,
    takeProfit2,
    takeProfit3,
    timeStopDays,
    thesisInvalidationTrigger,
    bagholderRiskScore,
  } = sellGuidance;

  // Interactive Position Sizing State
  const [accountSize, setAccountSize] = useState<number>(25000);
  const [riskPercent, setRiskPercent] = useState<number>(1.5);
  const [tradeAddedToast, setTradeAddedToast] = useState(false);

  // Position Sizing Calculations
  const maxRiskDollars = (accountSize * riskPercent) / 100;
  const lossPerShare = price - stopLossHard;
  const recommendedShares = lossPerShare > 0 ? Math.floor(maxRiskDollars / lossPerShare) : 10;
  const totalPositionCost = recommendedShares * price;
  const portfolioAllocationPercent = ((totalPositionCost / accountSize) * 100).toFixed(1);

  // Potential Gains at targets
  const gainT1 = (takeProfit1.price - price) * (recommendedShares * 0.35);
  const gainT2 = (takeProfit2.price - price) * (recommendedShares * 0.35);
  const gainT3 = (takeProfit3.price - price) * (recommendedShares * 0.30);
  const totalProjectedGain = gainT1 + gainT2 + gainT3;
  const riskRewardRatio = (totalProjectedGain / maxRiskDollars).toFixed(2);

  const handleCreatePaperTrade = () => {
    if (!onAddPaperTrade) return;

    const newTrade: PaperTrade = {
      id: `trade-${Date.now()}`,
      symbol,
      name,
      entryDate: new Date().toISOString().split('T')[0],
      entryPrice: price,
      shares: recommendedShares,
      totalCost: totalPositionCost,
      currentPrice: price,
      stopLoss: stopLossHard,
      target1: takeProfit1.price,
      target2: takeProfit2.price,
      slippageIncurred: Number((price * 0.0025 * recommendedShares).toFixed(2)),
      pnl: 0,
      pnlPercent: 0,
      status: 'OPEN',
      notes: `Rule-based entry with ${riskPercent}% risk ($${maxRiskDollars.toFixed(0)} max loss). Hard stop: $${stopLossHard}.`,
    };

    onAddPaperTrade(newTrade);
    setTradeAddedToast(true);
    setTimeout(() => setTradeAddedToast(false), 3000);
  };

  return (
    <div className="space-y-6" id="dynamic-sell-engine-view">
      {/* Header Info */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-2.5 py-1 rounded-lg">
                Direct Solution for Complaint #5
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Dynamic Trade Lifecycle &amp; "When to Sell" Engine
              </h2>
            </div>
            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              Most stock prediction apps scream <span className="text-emerald-400 font-semibold">"BUY"</span> but provide zero exit rules, leaving retail traders to baghold severe -30% drawdowns. AlphaTruth provides explicit, automated exit targets, trailing stop protocols, and hard thesis invalidation triggers.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-right">
            <div className="text-xs text-slate-400 font-semibold uppercase">Bagholder Vulnerability</div>
            <div className={`text-2xl font-black ${bagholderRiskScore > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {bagholderRiskScore}<span className="text-xs text-slate-400 font-normal"> / 100</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {bagholderRiskScore > 60 ? 'High downside skew if unstopped' : 'Controlled historical drawdown'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Exit Strategy & Position Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: The Staged Exit Plan (Hard Stop + T1, T2, T3) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Hard Stop Loss Card */}
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5" id="hard-stop-loss-card">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-sm text-white">Unconditional Hard Stop-Loss</h3>
                  <p className="text-xs text-rose-300/80">Cut immediately with zero emotion if triggered</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-mono font-bold text-rose-400">${stopLossHard.toFixed(2)}</div>
                <div className="text-xs text-rose-300 font-semibold">{stopLossPercent}% from current ${price}</div>
              </div>
            </div>
          </div>

          {/* Staged Take Profit Targets */}
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4" id="take-profit-targets-panel">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                Staged Take-Profit Scale-Out Ladder
              </h3>
              <span className="text-xs text-slate-400">Lock gains systematically</span>
            </div>

            {/* Target 1 */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/20">
                  T1
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Target 1: <span className="font-mono text-emerald-400">${takeProfit1.price.toFixed(2)}</span>
                    <span className="text-emerald-400 font-normal ml-1">(+{takeProfit1.percent}%)</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{takeProfit1.action}</div>
                </div>
              </div>
              <div className="text-right font-mono text-xs text-emerald-400 font-semibold">
                +${gainT1.toFixed(0)}
              </div>
            </div>

            {/* Target 2 */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/20">
                  T2
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Target 2: <span className="font-mono text-emerald-400">${takeProfit2.price.toFixed(2)}</span>
                    <span className="text-emerald-400 font-normal ml-1">(+{takeProfit2.percent}%)</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{takeProfit2.action}</div>
                </div>
              </div>
              <div className="text-right font-mono text-xs text-emerald-400 font-semibold">
                +${gainT2.toFixed(0)}
              </div>
            </div>

            {/* Target 3 */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/20">
                  T3
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Target 3 (Runner): <span className="font-mono text-emerald-400">${takeProfit3.price.toFixed(2)}</span>
                    <span className="text-emerald-400 font-normal ml-1">(+{takeProfit3.percent}%)</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{takeProfit3.action}</div>
                </div>
              </div>
              <div className="text-right font-mono text-xs text-emerald-400 font-semibold">
                +${gainT3.toFixed(0)}
              </div>
            </div>
          </div>

          {/* Time Stop & Invalidation Triggers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-1">
                <Clock className="w-4 h-4 text-amber-400" />
                Time Invalidation Horizon
              </div>
              <div className="text-lg font-bold text-amber-400 font-mono">{timeStopDays} Trading Days</div>
              <div className="text-[11px] text-slate-400 mt-1">
                If trade does not progress towards T1 within {timeStopDays} days, close position to preserve capital velocity.
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-1">
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                Thesis Invalidation Point
              </div>
              <div className="text-[11px] text-slate-300 leading-snug mt-1">
                {thesisInvalidationTrigger}
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 cols: Interactive Position Sizing & 1-2% Account Risk Calculator */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between" id="position-sizing-panel">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Calculator className="w-4 h-4 text-blue-400" />
                Risk-Based Position Sizer
              </h3>
              <span className="text-[11px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-medium border border-blue-500/20">
                1-2% Account Rule
              </span>
            </div>

            {/* Sizing inputs */}
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1 font-medium">
                  <span>Your Total Portfolio Capital:</span>
                  <span className="font-mono text-white font-bold">${accountSize.toLocaleString()}</span>
                </div>
                <input
                  id="calc-account-size"
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={accountSize}
                  onChange={(e) => setAccountSize(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1 font-medium">
                  <span>Max Risk per Trade (%):</span>
                  <span className="font-mono text-amber-400 font-bold">{riskPercent}% (${maxRiskDollars.toFixed(0)})</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 mt-1">
                  {[1.0, 1.5, 2.0, 3.0].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => setRiskPercent(pct)}
                      className={`py-1.5 rounded-lg font-medium transition-all text-xs ${
                        riskPercent === pct
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Results Table */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-2.5 mt-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Recommended Shares:</span>
                  <span className="font-mono font-bold text-base text-white">{recommendedShares} shares</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Total Capital Outlay:</span>
                  <span className="font-mono font-bold text-slate-200">
                    ${totalPositionCost.toLocaleString()} ({portfolioAllocationPercent}% of portfolio)
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Max Dollar Loss (if stopped):</span>
                  <span className="font-mono font-bold text-rose-400">-${maxRiskDollars.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Projected Gain (T1+T2+T3):</span>
                  <span className="font-mono font-bold text-emerald-400">+${totalProjectedGain.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800 font-semibold">
                  <span className="text-slate-300">Risk-to-Reward Ratio:</span>
                  <span className="font-mono text-emerald-400 text-sm">1 : {riskRewardRatio}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-5 pt-3 border-t border-slate-800">
            <button
              id="add-paper-trade-btn"
              onClick={handleCreatePaperTrade}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
            >
              {tradeAddedToast ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  Added to Paper Portfolio!
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4 text-white" />
                  Deploy Honest Paper Trade ({recommendedShares} {symbol} @ ${price})
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
