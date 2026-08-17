import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Zap, 
  Sliders, 
  DollarSign, 
  Layers, 
  Target,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { MainTab } from '../types';

interface ComplaintAuditViewProps {
  onNavigateTab: (tab: MainTab) => void;
}

export const ComplaintAuditView: React.FC<ComplaintAuditViewProps> = ({ onNavigateTab }) => {
  const [selectedComplaint, setSelectedComplaint] = useState<number>(0);

  const complaints = [
    {
      id: 1,
      title: "The 'Win Rate' Illusion & Lack of Context",
      complaintText: "Users buy a signal or recommendation expecting a guaranteed return, only for the trade to fail. Even a platform boasting a '60% win rate' means 4 out of 10 trades will lose money. Apps rarely factor in trading fees, order execution speed, or emotional discipline—meaning a user's real-world outcome often doesn't match the app's theoretical backtest.",
      industryFlaw: "Marketed with cherry-picked backtests, zero-slippage assumptions, and hiding severe negative skew (e.g. 1 loss wiping out 5 wins).",
      alphaTruthSolution: "Real-World Friction & Slippage Engine with customizable broker latency, commission impact, Monte Carlo return distribution (1,000 runs), and strict Expected Value (EV) math.",
      actionTab: 'frictionLab' as MainTab,
      actionLabel: 'Open Friction & Slippage Lab',
      icon: Sliders,
      tagColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    },
    {
      id: 2,
      title: "Expensive Recurring Subscriptions & Hard-to-Cancel Trials",
      complaintText: "A significant portion of 1-star reviews on app stores relate to billing—such as high monthly tier prices ($30 to $200+/month) or free trials automatically converting into non-refundable annual charges.",
      industryFlaw: "Predatory dark patterns: buried cancellation buttons, mandatory phone calls, high recurring prices that exceed the portfolio profits of retail users.",
      alphaTruthSolution: "100% Zero-Dark-Pattern policy. Transparent tiers, 1-click test billing toggle, free institutional-grade risk calculators, and full calculation explainability.",
      actionTab: 'pricingTransparency' as MainTab,
      actionLabel: 'View Zero-Dark-Pattern Pricing',
      icon: DollarSign,
      tagColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    },
    {
      id: 3,
      title: "Lagging or Delayed Data & Peak-Buying Trap",
      complaintText: "Algorithmic buy signals often alert retail users after a stock has already surged 10% or 15%. By the time the user acts on the 'prediction,' the big institutional money has already moved, leaving the retail trader buying at the peak.",
      industryFlaw: "Alerts trigger on simple momentum lagging indicators (e.g. MACD crossovers), broadcasting signals after institutions have already completed their run.",
      alphaTruthSolution: "Anti-FOMO Chasing Radar with 0-100 extension gauge, distance from 20-day EMA, dark pool institutional accumulation tracking, and recommended Limit Order pullback zones.",
      actionTab: 'screener' as MainTab,
      actionLabel: 'Inspect Anti-FOMO Radar on Screener',
      icon: Zap,
      tagColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    },
    {
      id: 4,
      title: "Interface Complexity and Overwhelming Signals",
      complaintText: "Beginners often download these apps hoping for a simple 'click here to make money' button, only to be met with dozens of complex indicators, charts, and conflicting signals that require solid technical analysis knowledge to interpret properly.",
      industryFlaw: "Indicator clutter: RSI says overbought, MACD says buy, Analyst target says neutral, creating total analysis paralysis and conflicting signals.",
      alphaTruthSolution: "Tri-Mode Adaptive Interface: Executive Mode (3-bullet plain-English clarity + Gemini Deep Dive), Quant Factor Mode (1-10 scores with full explainability), and Decision Playbook (deterministic IF/THEN rules).",
      actionTab: 'screener' as MainTab,
      actionLabel: 'Test Tri-Mode Interface',
      icon: Layers,
      tagColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
    },
    {
      id: 5,
      title: "No Risk Management & Missing 'Sell' Guidance (Bagholding)",
      complaintText: "Many prediction apps are great at telling users when to buy, but provide zero guidance on when to sell or where to cut losses. Users end up holding a falling stock long after the original prediction failed.",
      industryFlaw: "Apps wash their hands after the buy alert, ignoring trade exits, stop-loss placement, scale-out profit taking, and thesis invalidation.",
      alphaTruthSolution: "Dynamic Exit Engine: Mandatory Hard Stop-Loss price, staged 3-tier Take Profit targets (T1, T2, T3), Trailing ATR stops, Time Stops (e.g. 20-day limit), and 1-2% account sizing calculator.",
      actionTab: 'exitEngine' as MainTab,
      actionLabel: 'Launch Dynamic Sell Engine',
      icon: Target,
      tagColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },
  ];

  const current = complaints[selectedComplaint];
  const Icon = current.icon;

  return (
    <div className="space-y-6" id="complaints-benchmark-view">
      {/* Header */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold px-2.5 py-1 rounded-lg">
            Direct Industry Benchmark
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            How AlphaTruth AI Fixes the Top 5 Prediction Complaints
          </h2>
        </div>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          Consumer reviews across app stores and trading forums reveal standard recurring complaints about platforms like Danelfin, TipRanks, Trade Ideas, and alert newsletters. Here is the direct architectural blueprint solving each one.
        </p>
      </div>

      {/* 5 Tab Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {complaints.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => setSelectedComplaint(idx)}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedComplaint === idx
                ? 'bg-slate-800 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/50'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Complaint #{c.id}
            </div>
            <div className="font-semibold text-xs text-slate-200 line-clamp-2">
              {c.title}
            </div>
          </button>
        ))}
      </div>

      {/* Selected Complaint Deep Dive Card */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${current.tagColor}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Complaint #{current.id} Deep Dive
              </span>
              <h3 className="font-bold text-lg text-white">{current.title}</h3>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab(current.actionTab)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            {current.actionLabel}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* User Voice / The Exact Complaint */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            The Consumer App Store Complaint
          </div>
          <p className="text-slate-300 text-xs italic leading-relaxed">
            "{current.complaintText}"
          </p>
        </div>

        {/* Side-by-Side Comparison: Shady Apps vs AlphaTruth AI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Traditional Prediction Services */}
          <div className="bg-rose-950/10 border border-rose-500/20 rounded-xl p-4.5 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <XCircle className="w-4 h-4" />
              Traditional Prediction Apps
            </div>
            <p className="text-slate-300 leading-relaxed">
              {current.industryFlaw}
            </p>
          </div>

          {/* AlphaTruth AI Solution */}
          <div className="bg-emerald-950/10 border border-emerald-500/20 rounded-xl p-4.5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              AlphaTruth AI Engineered Solution
            </div>
            <p className="text-slate-200 font-medium leading-relaxed">
              {current.alphaTruthSolution}
            </p>
          </div>
        </div>

        {/* Competitor Matrix Grid */}
        <div className="pt-2">
          <h4 className="font-bold text-xs text-slate-300 uppercase tracking-wider mb-3">
            Feature-by-Feature Competitor Benchmark
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="py-2.5 px-3">Evaluation Metric</th>
                  <th className="py-2.5 px-3">Danelfin</th>
                  <th className="py-2.5 px-3">TipRanks</th>
                  <th className="py-2.5 px-3">Trade Ideas</th>
                  <th className="py-2.5 px-3 text-emerald-400 bg-emerald-500/5">AlphaTruth AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-2.5 px-3 font-medium text-white">Slippage &amp; Friction Modeling</td>
                  <td className="py-2.5 px-3 text-rose-400">❌ None (0.0% idealized)</td>
                  <td className="py-2.5 px-3 text-rose-400">❌ None</td>
                  <td className="py-2.5 px-3 text-amber-400">⚠️ Limited</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold bg-emerald-500/5">✅ Full Friction Lab (EV &amp; Latency)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-white">Anti-FOMO / Peak-Buying Warning</td>
                  <td className="py-2.5 px-3 text-rose-400">❌ No chasing meter</td>
                  <td className="py-2.5 px-3 text-rose-400">❌ Missing</td>
                  <td className="py-2.5 px-3 text-amber-400">⚠️ Complex charts</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold bg-emerald-500/5">✅ 0-100 Chasing Radar &amp; Limit Zones</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-white">Automated "When to Sell" Rules</td>
                  <td className="py-2.5 px-3 text-rose-400">❌ Missing sell triggers</td>
                  <td className="py-2.5 px-3 text-rose-400">❌ Only analyst targets</td>
                  <td className="py-2.5 px-3 text-amber-400">⚠️ Manual trailing stops</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold bg-emerald-500/5">✅ Hard Stop + T1/T2/T3 + Time Stops</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-white">Adaptive Plain-English Mode</td>
                  <td className="py-2.5 px-3 text-amber-400">⚠️ Numeric only</td>
                  <td className="py-2.5 px-3 text-amber-400">⚠️ Scores only</td>
                  <td className="py-2.5 px-3 text-rose-400">❌ High complexity</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold bg-emerald-500/5">✅ Executive + Gemini Deep Synthesis</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-white">Dark Pattern &amp; Trial Traps</td>
                  <td className="py-2.5 px-3 text-amber-400">⚠️ $52/mo recurring</td>
                  <td className="py-2.5 px-3 text-amber-400">⚠️ $30–$60/mo billed annually</td>
                  <td className="py-2.5 px-3 text-rose-400">❌ $118–$228/mo high barrier</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold bg-emerald-500/5">✅ Zero Dark Patterns + Free Tools</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
