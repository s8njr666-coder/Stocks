import React from 'react';
import { AlertCircle, CheckCircle2, ShieldAlert, Zap, Clock, TrendingUp, DollarSign } from 'lucide-react';
import { Stock, ChasingRiskMetrics } from '../types';

interface ChasingRadarProps {
  stock: Stock;
}

export const ChasingRadar: React.FC<ChasingRadarProps> = ({ stock }) => {
  const { chasingRisk, price, symbol } = stock;
  const {
    chasingRiskScore,
    stage,
    distanceFrom20EMA,
    distanceFromBase,
    institutionalEntryZone,
    recommendedOrderType,
    retailFomoIndex,
    whaleActivityStatus,
    warningMessage,
  } = chasingRisk;

  // Determine color and status
  const getRiskTier = (score: number) => {
    if (score >= 75) {
      return {
        label: 'EXTREME CHASING RISK',
        color: 'text-rose-400',
        bgColor: 'bg-rose-500/10',
        borderColor: 'border-rose-500/30',
        barColor: 'bg-rose-500',
        description: 'Retail FOMO Trap Alert: Stock is heavily extended. Big funds are likely looking for exit liquidity.',
      };
    }
    if (score >= 45) {
      return {
        label: 'MODERATE EXTENSION',
        color: 'text-amber-400',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30',
        barColor: 'bg-amber-500',
        description: 'Active breakout phase. Market orders carry slippage risk. Use disciplined limit bids on intraday pullbacks.',
      };
    }
    return {
      label: 'SAFE ACCUMULATION ZONE',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      barColor: 'bg-emerald-500',
      description: 'Optimal Institutional Entry: Price is resting close to structural support and key exponential moving averages.',
    };
  };

  const tier = getRiskTier(chasingRiskScore);

  return (
    <div className={`rounded-2xl p-5 border ${tier.bgColor} ${tier.borderColor} transition-all`} id="chasing-radar-card">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className={`w-5 h-5 ${tier.color}`} />
            <h3 className="font-bold text-base text-white tracking-tight">
              Anti-FOMO &amp; Chasing Risk Radar
            </h3>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${tier.bgColor} ${tier.borderColor} ${tier.color}`}>
              {tier.label}
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-xl">
            Solves Complaint #3 (Lagging signals &amp; buying the peak). Measures how much of the move has already been realized before retail alerts fired.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Chasing Risk Score</div>
            <div className={`text-2xl font-black ${tier.color}`}>
              {chasingRiskScore}<span className="text-xs text-slate-400 font-normal"> / 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Meter Bar */}
      <div className="my-4">
        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 flex gap-1 border border-slate-700/50">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${tier.barColor}`}
            style={{ width: `${chasingRiskScore}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
          <span>0 (Base / Accumulation)</span>
          <span>45 (Breakout Pivot)</span>
          <span>75 (Extended)</span>
          <span>100 (Exhaustion Peak)</span>
        </div>
      </div>

      {/* Warning or Directive Message */}
      {warningMessage && (
        <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800 mb-4 flex items-start gap-2.5">
          {chasingRiskScore >= 70 ? (
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          )}
          <div className="text-xs">
            <span className="font-semibold text-slate-200">Execution Directive: </span>
            <span className="text-slate-300">{warningMessage}</span>
          </div>
        </div>
      )}

      {/* Grid of Key Timing Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-[11px] mb-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
            Dist from 20 EMA
          </div>
          <div className="font-bold text-sm text-slate-100 font-mono">{distanceFrom20EMA}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {parseFloat(distanceFrom20EMA) > 8 ? 'Stretched > 2.5σ' : 'Healthy compression'}
          </div>
        </div>

        <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-[11px] mb-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            Run from Base
          </div>
          <div className="font-bold text-sm text-slate-100 font-mono">{distanceFromBase}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Stage: {stage}</div>
        </div>

        <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-[11px] mb-1 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            Optimal Limit Zone
          </div>
          <div className="font-bold text-sm text-emerald-400 font-mono">
            ${institutionalEntryZone[0].toFixed(2)} - ${institutionalEntryZone[1].toFixed(2)}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Institutional bid wall</div>
        </div>

        <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-[11px] mb-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-purple-400" />
            Recommended Order
          </div>
          <div className="font-bold text-sm text-slate-100 truncate">
            {recommendedOrderType}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Whale status: {whaleActivityStatus}</div>
        </div>
      </div>
    </div>
  );
};
