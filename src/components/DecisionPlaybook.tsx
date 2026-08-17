import React from 'react';
import { Compass, CheckCircle, ArrowRight, ShieldCheck, Target, AlertTriangle } from 'lucide-react';
import { Stock } from '../types';

interface DecisionPlaybookProps {
  stock: Stock;
}

export const DecisionPlaybook: React.FC<DecisionPlaybookProps> = ({ stock }) => {
  const { symbol, price, chasingRisk, sellGuidance, scores } = stock;

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-6" id="decision-playbook-panel">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-white">Rule-Based Execution Decision Tree</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Step-by-step IF/THEN protocol to eliminate emotional trading errors.
          </p>
        </div>
        <span className="text-xs bg-emerald-500/10 text-emerald-400 font-bold px-2.5 py-1 rounded-lg border border-emerald-500/20">
          Deterministic Playbook
        </span>
      </div>

      <div className="space-y-4 text-xs">
        {/* Step 1: Pre-Entry Validation */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 mt-0.5">
            1
          </div>
          <div className="space-y-1">
            <div className="font-bold text-slate-200 text-sm">Step 1: Check Chasing Status</div>
            <p className="text-slate-300">
              <strong className="text-white">Rule:</strong> Is Chasing Risk &lt; 65/100?{' '}
              {chasingRisk.chasingRiskScore < 65 ? (
                <span className="text-emerald-400 font-bold">YES ({chasingRisk.chasingRiskScore}/100) — Approved to Enter.</span>
              ) : (
                <span className="text-rose-400 font-bold">NO ({chasingRisk.chasingRiskScore}/100) — DO NOT MARKET BUY. Place limit orders in pullback zone.</span>
              )}
            </p>
            <div className="text-[11px] text-slate-400">
              Entry Zone: <span className="font-mono text-emerald-400">${chasingRisk.institutionalEntryZone[0].toFixed(2)} - ${chasingRisk.institutionalEntryZone[1].toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Step 2: Risk Sizing Guardrail */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center shrink-0 mt-0.5">
            2
          </div>
          <div className="space-y-1">
            <div className="font-bold text-slate-200 text-sm">Step 2: Set Maximum Dollar Risk (1.5% Rule)</div>
            <p className="text-slate-300">
              <strong className="text-white">Rule:</strong> Calculate shares so that if price drops to hard stop (${sellGuidance.stopLossHard.toFixed(2)}), you lose no more than 1.5% of total account equity.
            </p>
            <div className="text-[11px] text-slate-400">
              Stop Distance: <span className="font-mono text-rose-400">{sellGuidance.stopLossPercent}%</span> (${(price - sellGuidance.stopLossHard).toFixed(2)} per share risk).
            </div>
          </div>
        </div>

        {/* Step 3: Target 1 Scale-Out & Breakeven Shift */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 mt-0.5">
            3
          </div>
          <div className="space-y-1">
            <div className="font-bold text-slate-200 text-sm">Step 3: First Profit Milestone (${sellGuidance.takeProfit1.price.toFixed(2)})</div>
            <p className="text-slate-300">
              <strong className="text-white">Rule:</strong> When price touches Target 1 (+{sellGuidance.takeProfit1.percent}%), immediately sell 35% of shares and move stop loss on remaining 65% to your entry price ($ {price.toFixed(2)}).
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold">
              Trade becomes 100% risk-free freeroll from this point onward.
            </div>
          </div>
        </div>

        {/* Step 4: Time Horizon Invalidation */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 mt-0.5">
            4
          </div>
          <div className="space-y-1">
            <div className="font-bold text-slate-200 text-sm">Step 4: Time Invalidation Check ({sellGuidance.timeStopDays} Days)</div>
            <p className="text-slate-300">
              <strong className="text-white">Rule:</strong> If neither Stop Loss nor Target 1 is hit after {sellGuidance.timeStopDays} trading days, close the trade at market to free up portfolio capital.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
