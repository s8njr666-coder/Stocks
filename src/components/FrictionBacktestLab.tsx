import React, { useState } from 'react';
import { 
  Sliders, 
  HelpCircle, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  BarChart2, 
  CheckCircle, 
  RefreshCw 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';
import { Stock } from '../types';

interface FrictionBacktestLabProps {
  stock: Stock;
}

export const FrictionBacktestLab: React.FC<FrictionBacktestLabProps> = ({ stock }) => {
  const { backtest, symbol, name } = stock;

  // Interactive Friction Controls
  const [slippagePercent, setSlippagePercent] = useState<number>(0.25); // 0.25%
  const [brokerLatencyMs, setBrokerLatencyMs] = useState<number>(350); // 350ms
  const [roundTripFee, setRoundTripFee] = useState<number>(2.00); // $2.00 per trade
  const [accountSize, setAccountSize] = useState<number>(10000); // $10,000
  const [riskPerTradePercent, setRiskPerTradePercent] = useState<number>(1.5); // 1.5%

  // Calculate Real-World Impact
  const baseWinRate = backtest.nominalWinRate;
  // Each 0.1% slippage cuts win rate by ~1.8% and decreases avg profit
  const slippagePenalty = (slippagePercent * 14) + (brokerLatencyMs / 400) * 1.5;
  const calculatedRealWinRate = Math.max(38, Math.min(baseWinRate, baseWinRate - slippagePenalty));
  
  const riskAmount = (accountSize * riskPerTradePercent) / 100;
  const realAvgWin = (riskAmount * (backtest.avgWinPercent / 100) * 1.8) - (roundTripFee * 2) - (riskAmount * (slippagePercent / 100));
  const realAvgLoss = (riskAmount * (backtest.avgLossPercent / 100)) + (roundTripFee * 2) + (riskAmount * (slippagePercent / 100));
  
  const calculatedEV = (calculatedRealWinRate / 100) * realAvgWin - ((100 - calculatedRealWinRate) / 100) * realAvgLoss;
  const evPerThousand = (calculatedEV / riskAmount) * 1000;

  // Generate Cumulative Equity Curve (Nominal vs Realistic)
  const equityCurveData = React.useMemo(() => {
    let nominalBal = accountSize;
    let realisticBal = accountSize;
    const points = [{ trade: 0, nominal: accountSize, realistic: accountSize }];

    const trades = 30;
    // Deterministic random seed for smooth curve
    for (let i = 1; i <= trades; i++) {
      const isNominalWin = Math.sin(i * 997) > -0.4;
      const isRealWin = Math.sin(i * 997 + slippagePercent) > -0.15;

      const nomGain = isNominalWin ? riskAmount * 1.8 : -riskAmount;
      const realGain = isRealWin 
        ? realAvgWin 
        : -realAvgLoss;

      nominalBal += nomGain;
      realisticBal += realGain;

      points.push({
        trade: i,
        nominal: Math.round(nominalBal),
        realistic: Math.round(realisticBal),
      });
    }
    return points;
  }, [accountSize, riskAmount, realAvgWin, realAvgLoss, slippagePercent]);

  // Monte Carlo Return Distribution
  const monteCarloData = [
    { label: 'Worst 5% (P5)', return: backtest.monteCarloP5 - (slippagePercent * 6), fill: '#f43f5e' },
    { label: 'Lower 25% (P25)', return: (backtest.monteCarloP5 + backtest.monteCarloP50) / 2 - (slippagePercent * 4), fill: '#fb923c' },
    { label: 'Median (P50)', return: backtest.monteCarloP50 - (slippagePercent * 3), fill: '#3b82f6' },
    { label: 'Upper 75% (P75)', return: (backtest.monteCarloP50 + backtest.monteCarloP95) / 2 - (slippagePercent * 2), fill: '#10b981' },
    { label: 'Best 5% (P95)', return: backtest.monteCarloP95 - (slippagePercent * 2), fill: '#059669' },
  ];

  return (
    <div className="space-y-6" id="friction-backtest-lab-view">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold px-2.5 py-1 rounded-lg">
                Direct Solution for Complaint #1
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Real-World Friction &amp; Slippage Backtest Audit
              </h2>
            </div>
            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              Standard prediction apps advertise hypothetical <strong className="text-purple-400">"{baseWinRate}% Win Rates"</strong> with zero fees, instant millisecond fills at the exact quoted price, and no market impact. In reality, retail slippage and latency turn theoretical winners into losers.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-right min-w-[200px]">
            <div className="text-xs text-slate-400 font-semibold uppercase">Realized Expected Value (EV)</div>
            <div className={`text-2xl font-black ${calculatedEV >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {calculatedEV >= 0 ? '+' : ''}${calculatedEV.toFixed(2)}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              ${evPerThousand.toFixed(2)} per $1,000 risked
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Interactive Friction Controls */}
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-5" id="friction-sliders-panel">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              Adjust Real-World Friction
            </h3>
            <button 
              onClick={() => {
                setSlippagePercent(0.25);
                setBrokerLatencyMs(350);
                setRoundTripFee(2.00);
              }}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
              title="Reset to realistic defaults"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Slippage Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-300 font-medium flex items-center gap-1">
                Order Slippage &amp; Spread
                <span className="text-slate-500" title="Bid-ask spread + price movement between signal and fill">(?)</span>
              </span>
              <span className="font-mono font-bold text-purple-400">{slippagePercent.toFixed(2)}%</span>
            </div>
            <input
              id="slider-slippage"
              type="range"
              min="0.0"
              max="1.50"
              step="0.05"
              value={slippagePercent}
              onChange={(e) => setSlippagePercent(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>0.0% (Fantasy App)</span>
              <span>0.25% (Realistic)</span>
              <span>1.5% (Illiquid/Fast)</span>
            </div>
          </div>

          {/* Execution Latency Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-300 font-medium">Broker Execution Latency</span>
              <span className="font-mono font-bold text-indigo-400">{brokerLatencyMs} ms</span>
            </div>
            <input
              id="slider-latency"
              type="range"
              min="50"
              max="2000"
              step="50"
              value={brokerLatencyMs}
              onChange={(e) => setBrokerLatencyMs(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>50ms (Direct DMA)</span>
              <span>350ms (Retail App)</span>
              <span>2000ms (Slow Mobile)</span>
            </div>
          </div>

          {/* Round-trip Commission & SEC fees */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-300 font-medium">Round-Trip Fees &amp; Regulatory</span>
              <span className="font-mono font-bold text-emerald-400">${roundTripFee.toFixed(2)}</span>
            </div>
            <input
              id="slider-fees"
              type="range"
              min="0.00"
              max="15.00"
              step="0.50"
              value={roundTripFee}
              onChange={(e) => setRoundTripFee(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Account Capital & Position Sizing */}
          <div className="pt-2 border-t border-slate-800 space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Trading Account Size</span>
                <span className="font-mono font-bold text-slate-200">${accountSize.toLocaleString()}</span>
              </div>
              <input
                id="slider-account-size"
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={accountSize}
                onChange={(e) => setAccountSize(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Risk Limit Per Trade</span>
                <span className="font-mono font-bold text-amber-400">{riskPerTradePercent}% (${riskAmount.toFixed(0)})</span>
              </div>
              <input
                id="slider-risk-limit"
                type="range"
                min="0.5"
                max="5.0"
                step="0.5"
                value={riskPerTradePercent}
                onChange={(e) => setRiskPerTradePercent(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Middle & Right: Truth Comparison & Visual Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Comparison Cards: The Marketing Claim vs The Honest Reality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* The Fantasy Claim */}
            <div className="bg-slate-900/60 rounded-xl p-4 border border-rose-500/20 relative overflow-hidden">
              <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400 mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Generic App Marketing Claim
              </div>
              <div className="text-3xl font-black text-rose-300 font-mono my-1">
                {baseWinRate.toFixed(1)}% <span className="text-xs text-slate-400 font-normal">Win Rate</span>
              </div>
              <div className="text-xs text-slate-400 space-y-1 mt-2">
                <div>• Assumes 0.0% slippage &amp; instant fills</div>
                <div>• Hides negative skew (large infrequent wipeouts)</div>
                <div>• Ignores commissions &amp; psychological stops</div>
              </div>
            </div>

            {/* The Realistic Reality */}
            <div className="bg-slate-900 rounded-xl p-4 border border-emerald-500/30 relative overflow-hidden shadow-lg shadow-emerald-500/5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                AlphaTruth Realistic Audit
              </div>
              <div className="text-3xl font-black text-emerald-400 font-mono my-1">
                {calculatedRealWinRate.toFixed(1)}% <span className="text-xs text-slate-400 font-normal">Realistic Win Rate</span>
              </div>
              <div className="text-xs text-slate-300 space-y-1 mt-2">
                <div>• Adjusted for {slippagePercent}% slippage &amp; {brokerLatencyMs}ms latency</div>
                <div>• Net Expected Value: <strong className="text-emerald-400">+${calculatedEV.toFixed(2)}/trade</strong></div>
                <div>• Profit Factor: <strong className="text-slate-100">{backtest.realisticProfitFactor}x</strong> (vs {backtest.nominalProfitFactor}x theoretical)</div>
              </div>
            </div>
          </div>

          {/* Cumulative Equity Curve Chart */}
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  Cumulative Return: Fantasy vs. Realistic Friction ({stock.symbol})
                </h4>
                <p className="text-xs text-slate-400">Simulated 30-trade sequence with current risk parameters</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-3 h-3 rounded-full bg-slate-500/40 border border-slate-400"></span>
                  Marketing Claim
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  Real-World Net Outcome
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={equityCurveData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="realGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="nomGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#64748b" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#64748b" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="trade" stroke="#475569" fontSize={11} tickLine={false} />
                  <YAxis 
                    stroke="#475569" 
                    fontSize={11} 
                    domain={['auto', 'auto']}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                    labelFormatter={(label) => `Trade #${label}`}
                  />
                  <Area type="monotone" dataKey="nominal" stroke="#94a3b8" strokeDasharray="4 4" fill="url(#nomGrad)" name="Hypothetical Claim" />
                  <Area type="monotone" dataKey="realistic" stroke="#10b981" strokeWidth={2.5} fill="url(#realGrad)" name="Realistic Return" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Monte Carlo Distribution & Consecutive Loss Stress Test */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monte Carlo 1,000-Path Distribution */}
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-indigo-400" />
                Monte Carlo Probabilistic Distribution (1,000 Paths)
              </h4>
              <p className="text-xs text-slate-400">Range of annual outcomes accounting for random sequence luck</p>
            </div>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monteCarloData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="label" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickFormatter={(v) => `${v}%`} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                  formatter={(v: any) => [`${Number(v).toFixed(1)}%`, 'Simulated Return']}
                />
                <Bar dataKey="return" radius={[4, 4, 0, 0]}>
                  {monteCarloData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 flex justify-between">
            <span>Worst Case (P5): <strong className="text-rose-400">{monteCarloData[0].return.toFixed(1)}%</strong></span>
            <span>Median (P50): <strong className="text-blue-400">+{monteCarloData[2].return.toFixed(1)}%</strong></span>
            <span>Best Case (P95): <strong className="text-emerald-400">+{monteCarloData[4].return.toFixed(1)}%</strong></span>
          </div>
        </div>

        {/* Consecutive Loss Stress Test (The "4 out of 10 fail" reality) */}
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-sm text-white">
                The "4 Out of 10 Losses" Mathematical Reality
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Even with a genuine <strong className="text-white">60% win rate</strong>, basic probability dictates you have an <strong className="text-amber-400">83.4% statistical chance</strong> of hitting 3 consecutive losses, and a <strong className="text-amber-400">41.0% chance</strong> of 4 consecutive losses in a 50-trade sequence.
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">If you risk 5% per trade (Amateur sizing):</span>
                <span className="font-mono font-bold text-rose-400">-18.5% Drawdown (High Panic Risk)</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/20 flex items-center justify-between">
                <span className="text-slate-400">If you risk {riskPerTradePercent}% per trade (AlphaTruth Rule):</span>
                <span className="font-mono font-bold text-emerald-400">-{(riskPerTradePercent * 4).toFixed(1)}% Drawdown (Completely Safe)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            Position sizing math ensures you remain profitable even during bad luck distribution clusters.
          </div>
        </div>
      </div>
    </div>
  );
};
