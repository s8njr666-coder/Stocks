import React, { useState } from 'react';
import { 
  DollarSign, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  Calculator, 
  RefreshCw, 
  Lock, 
  HelpCircle,
  Zap,
  Sparkles
} from 'lucide-react';

export const PricingTransparency: React.FC = () => {
  const [testSubscriptionActive, setTestSubscriptionActive] = useState(false);
  const [portfolioSize, setPortfolioSize] = useState<number>(20000);
  const [tradesPerMonth, setTradesPerMonth] = useState<number>(6);

  // Calculate Savings: avoiding 1 bad bagholder loss
  const estimatedBagholderLossAvoided = portfolioSize * 0.12 * 0.5; // Average 12% avoided loss on half position
  const subscriptionCostAnnual = 180; // $15/mo equivalent
  const netRetailValue = estimatedBagholderLossAvoided - subscriptionCostAnnual;

  return (
    <div className="space-y-6" id="pricing-transparency-view">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold px-2.5 py-1 rounded-lg">
                Direct Solution for Complaint #2
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Zero-Dark-Pattern Pricing &amp; Honest Value Guarantee
              </h2>
            </div>
            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              Standard stock apps lock users into <strong className="text-white">$30–$200/month recurring charges</strong> and bury cancellation buttons behind phone calls or dark UI patterns. AlphaTruth AI guarantees 1-click cancellation, transparent math, and free institutional risk tools.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-right min-w-[210px]">
            <div className="text-xs text-slate-400 font-semibold uppercase">Annual Loss Prevention ROI</div>
            <div className="text-2xl font-black text-emerald-400">
              +${netRetailValue.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Net savings from cutting bad trades
            </div>
          </div>
        </div>
      </div>

      {/* The 4 Anti-Dark-Pattern Guarantees */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2.5 border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-white text-sm mb-1">1-Click Instant Cancellation</h4>
          <p className="text-slate-400 leading-relaxed">
            No mandatory customer support emails, no 1-800 phone retention calls, and no 7-step retention survey obstacle courses.
          </p>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2.5 border border-blue-500/20">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-white text-sm mb-1">No Surprise Annual Traps</h4>
          <p className="text-slate-400 leading-relaxed">
            Trials never secretly convert into $240+ non-refundable yearly lock-ins without explicit 48-hour email advance reminders.
          </p>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2.5 border border-purple-500/20">
            <Calculator className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-white text-sm mb-1">Free Core Risk Math</h4>
          <p className="text-slate-400 leading-relaxed">
            Stop loss calculators, slippage models, and chasing risk meters are free for everyone—we never paywall safety.
          </p>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5 border border-amber-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-white text-sm mb-1">Export Everything (CSV/JSON)</h4>
          <p className="text-slate-400 leading-relaxed">
            Your backtest data, paper portfolio logs, and quant factors are always 100% downloadable with zero proprietary lock-in.
          </p>
        </div>
      </div>

      {/* Tier Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tier 1: Open Retail Tier */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Community Tier</span>
                <h3 className="text-xl font-bold text-white mt-0.5">Open AlphaTruth</h3>
              </div>
              <div className="text-2xl font-black text-white font-mono">$0 <span className="text-xs text-slate-400 font-normal">/ forever</span></div>
            </div>

            <p className="text-xs text-slate-300 mb-5">
              Full access to honest risk management tools without needing a credit card.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full Anti-FOMO Chasing Radar &amp; Limit Zones</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dynamic Sell Engine (Hard Stop, T1/T2/T3, ATR)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real-World Slippage &amp; Friction Lab</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Paper Portfolio Tracker with Slippage Accounting</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Executive 3-Bullet Playbook Mode</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <span className="text-xs font-semibold text-emerald-400 block text-center bg-emerald-500/10 py-2.5 rounded-xl border border-emerald-500/20">
              Active by Default (No Signup Required)
            </span>
          </div>
        </div>

        {/* Tier 2: Pro Institutional Simulation */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-cyan-500/30 relative flex flex-col justify-between shadow-xl shadow-cyan-500/5">
          <div className="absolute -top-3 right-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
            100% Fair Pricing
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Institutional Pro</span>
                <h3 className="text-xl font-bold text-white mt-0.5">AlphaTruth Quant Pro</h3>
              </div>
              <div className="text-2xl font-black text-white font-mono">$15 <span className="text-xs text-slate-400 font-normal">/ mo (vs $120+ rivals)</span></div>
            </div>

            <p className="text-xs text-slate-300 mb-5">
              Advanced quant factors, real-time Gemini 2.5 Flash deep dives, and dark pool flow scanner.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Everything in Open Tier</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Live Gemini 2.5 Flash Server-Side Quantitative Audits</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Institutional Dark Pool &amp; 13F Hedge Fund Flow Radar</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Danelfin &amp; TipRanks Rival 1-10 Sub-Metric Breakdown</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>1-Click Guaranteed Cancellation Simulation</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            {testSubscriptionActive ? (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-cyan-400 text-center bg-cyan-500/10 py-2 rounded-xl border border-cyan-500/20">
                  ✅ Simulated Pro Membership Active
                </div>
                <button
                  onClick={() => setTestSubscriptionActive(false)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  Test 1-Click Instant Cancellation
                </button>
              </div>
            ) : (
              <button
                id="test-pro-toggle-btn"
                onClick={() => setTestSubscriptionActive(true)}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                Simulate 1-Click Zero-Risk Trial
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Value Calculator (Cost vs Avoided Losses) */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-blue-400" />
          <h3 className="font-bold text-base text-white">Interactive Subscription ROI vs. Bad Trade Loss Prevention</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Your Active Portfolio Capital:</span>
                <span className="font-mono text-white font-bold">${portfolioSize.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="100000"
                step="2000"
                value={portfolioSize}
                onChange={(e) => setPortfolioSize(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Estimated Trades per Month:</span>
                <span className="font-mono text-cyan-400 font-bold">{tradesPerMonth} trades</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={tradesPerMonth}
                onChange={(e) => setTradesPerMonth(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-center">
            <div className="flex justify-between">
              <span className="text-slate-400">Typical Bagholder Loss Prevented per Year:</span>
              <span className="font-mono font-bold text-emerald-400">+${estimatedBagholderLossAvoided.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Typical App Subscription Cost (Rivals @ $80/mo):</span>
              <span className="font-mono font-bold text-rose-400">-$960/yr</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-800 font-bold">
              <span className="text-slate-200">AlphaTruth Net Advantage:</span>
              <span className="font-mono text-emerald-400 text-sm">
                +${(estimatedBagholderLossAvoided + 960).toFixed(0)} Saved
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
