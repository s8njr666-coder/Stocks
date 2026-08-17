import React, { useState } from 'react';
import { 
  Activity, 
  BarChart3, 
  Layers, 
  DollarSign, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertCircle, 
  MinusCircle,
  HelpCircle
} from 'lucide-react';
import { Stock, FactorScores, FactorSubMetric } from '../types';

interface FactorScorecardProps {
  stock: Stock;
}

export const FactorScorecard: React.FC<FactorScorecardProps> = ({ stock }) => {
  const { scores, symbol, name } = stock;
  const [activePillar, setActivePillar] = useState<'fundamental' | 'technical' | 'whaleFlow' | 'sentiment'>('fundamental');

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 7.0) return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    if (score >= 5.0) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  const getPillarData = (pillar: 'fundamental' | 'technical' | 'whaleFlow' | 'sentiment') => {
    switch (pillar) {
      case 'fundamental':
        return {
          title: 'Fundamental Quality & Profitability',
          score: scores.fundamental,
          metrics: scores.fundamentalMetrics,
          description: 'Evaluates free cash flow conversion, revenue acceleration, operating leverage, and debt safety.',
        };
      case 'technical':
        return {
          title: 'Technical Momentum & Market Structure',
          score: scores.technical,
          metrics: scores.technicalMetrics,
          description: 'Calculates multi-timeframe moving average alignment, volume breakout expansion, and RSI squeeze.',
        };
      case 'whaleFlow':
        return {
          title: 'Institutional Dark Pool & Whale Flow',
          score: scores.whaleFlow,
          metrics: scores.whaleFlowMetrics,
          description: 'Tracks private off-exchange block trading, 13F fund positioning, and smart money options flow.',
        };
      case 'sentiment':
        return {
          title: 'Market Sentiment & Social Noise Delta',
          score: scores.sentiment,
          metrics: scores.sentimentMetrics,
          description: 'Analyzes Wall Street consensus revisions vs retail social hype noise ratio.',
        };
    }
  };

  const currentPillar = getPillarData(activePillar);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-6" id="quant-factor-scorecard">
      {/* Top Banner: Composite AI Score vs Rivals */}
      <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold px-2 py-0.5 rounded">
              Danelfin &amp; TipRanks Smart Score Rival
            </span>
            <h3 className="font-bold text-lg text-white">
              AI Factor Scorecard &amp; Factor Attribution
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Replaces 50 conflicting indicators with an interpretable 1-10 institutional quant matrix.
          </p>
        </div>

        {/* Big Composite Badge */}
        <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Composite AI Score</div>
            <div className="text-2xl font-black text-white font-mono flex items-center justify-end gap-1">
              <span className={`px-2 py-0.5 rounded-lg border text-xl ${getScoreColor(scores.composite)}`}>
                {scores.composite}
              </span>
              <span className="text-xs text-slate-400 font-normal">/ 10</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Factor Pillar Navigation Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { key: 'fundamental', label: 'Fundamental', score: scores.fundamental, icon: DollarSign },
          { key: 'technical', label: 'Technical', score: scores.technical, icon: BarChart3 },
          { key: 'whaleFlow', label: 'Whale Flow', score: scores.whaleFlow, icon: Layers },
          { key: 'sentiment', label: 'Sentiment', score: scores.sentiment, icon: Users },
        ].map(({ key, label, score, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActivePillar(key as any)}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              activePillar === key
                ? 'bg-slate-800/90 border-blue-500 shadow-md'
                : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 text-blue-400" />
                {label}
              </span>
              <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded border ${getScoreColor(score)}`}>
                {score}
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  score >= 8.5 ? 'bg-emerald-500' : score >= 7.0 ? 'bg-blue-500' : score >= 5.0 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${score * 10}%` }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Active Pillar Deep Dive Sub-Metrics Table */}
      <div className="bg-slate-950 rounded-xl p-5 border border-slate-800/80">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-bold text-sm text-slate-100">{currentPillar.title}</h4>
            <p className="text-xs text-slate-400">{currentPillar.description}</p>
          </div>
          <span className={`text-sm font-bold font-mono px-2.5 py-1 rounded-lg border ${getScoreColor(currentPillar.score)}`}>
            Pillar Score: {currentPillar.score} / 10
          </span>
        </div>

        <div className="space-y-3 mt-4">
          {currentPillar.metrics.map((metric, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-2.5">
                {metric.status === 'bullish' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : metric.status === 'neutral' ? (
                  <MinusCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-white">{metric.name}</span>
                    <span className="font-mono text-xs font-bold text-slate-300">({metric.value})</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{metric.explanation}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <span className={`text-xs font-bold px-2 py-0.5 rounded border ${getScoreColor(metric.score)}`}>
                  {metric.score} / 10
                </span>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  metric.status === 'bullish' ? 'bg-emerald-500/20 text-emerald-400' :
                  metric.status === 'neutral' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-rose-500/20 text-rose-400'
                }`}>
                  {metric.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
