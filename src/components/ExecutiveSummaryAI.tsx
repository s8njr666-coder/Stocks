import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Flame, 
  ArrowRight, 
  BrainCircuit, 
  Loader2,
  HelpCircle
} from 'lucide-react';
import { Stock, GeminiSynthesis } from '../types';

interface ExecutiveSummaryAIProps {
  stock: Stock;
}

export const ExecutiveSummaryAI: React.FC<ExecutiveSummaryAIProps> = ({ stock }) => {
  const { executiveSummary, symbol, name, price, changePercent, scores, chasingRisk } = stock;
  const [aiSynthesis, setAiSynthesis] = useState<GeminiSynthesis | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleGenerateAISynthesis = async () => {
    setIsLoadingAI(true);
    setAiError(null);
    try {
      const response = await fetch('/api/analyze-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol,
          name,
          price,
          changePercent,
          scores,
          riskMetrics: chasingRisk,
        }),
      });
      const data = await response.json();
      if (data.success && data.synthesis) {
        setAiSynthesis(data.synthesis);
      } else {
        setAiError('Failed to generate AI synthesis. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Network error communicating with Gemini API');
    } finally {
      setIsLoadingAI(false);
    }
  };

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'High Prob Buy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Speculative Buy':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Neutral / Hold':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-5" id="executive-summary-panel">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Executive Synthesis &amp; Action Plan</h3>
            <p className="text-xs text-slate-400">Zero jargon, actionable 3-bullet execution clarity</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getVerdictBadge(executiveSummary.verdict)}`}>
            Verdict: {executiveSummary.verdict}
          </span>
        </div>
      </div>

      {/* 3 Direct Bullets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              1. Institutional Thesis
            </div>
            <p className="text-slate-200 leading-relaxed">{executiveSummary.bullet1}</p>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              2. Chasing &amp; Timing Risk
            </div>
            <p className="text-slate-200 leading-relaxed">{executiveSummary.bullet2}</p>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
              3. Hard Exit &amp; Sell Plan
            </div>
            <p className="text-slate-200 leading-relaxed">{executiveSummary.bullet3}</p>
          </div>
        </div>
      </div>

      {/* Live Gemini Deep AI Synthesis Section */}
      <div className="pt-2">
        {!aiSynthesis ? (
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <BrainCircuit className="w-5 h-5 text-indigo-400" />
              <div>
                <div className="text-xs font-bold text-white">Generate Real-Time Gemini 2.5 Flash Deep Risk Audit</div>
                <div className="text-[11px] text-slate-400">Evaluates live macro regime, latency traps, and thesis invalidation points.</div>
              </div>
            </div>
            <button
              id="generate-gemini-btn"
              onClick={handleGenerateAISynthesis}
              disabled={isLoadingAI}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoadingAI ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Generating Quant Audit...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Deep AI Audit ({symbol})
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="bg-slate-950 rounded-xl p-5 border border-indigo-500/30 space-y-4" id="gemini-synthesis-output">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
                <BrainCircuit className="w-4 h-4" />
                Gemini 2.5 Flash Institutional Risk Audit
              </div>
              <button
                onClick={handleGenerateAISynthesis}
                disabled={isLoadingAI}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-indigo-400" /> Re-Analyze
              </button>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed font-medium bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
              {aiSynthesis.executiveSummary}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">Bull Drivers:</span>
                <p className="text-slate-300">{aiSynthesis.bullThesis}</p>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <span className="text-rose-400 font-bold block mb-1">Downside Vulnerabilities:</span>
                <p className="text-slate-300">{aiSynthesis.bearRisks}</p>
              </div>
            </div>

            <div className="bg-rose-950/20 border border-rose-500/30 p-3 rounded-lg text-xs">
              <span className="text-rose-400 font-bold flex items-center gap-1 mb-0.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Thesis Invalidation Line in the Sand:
              </span>
              <p className="text-slate-300">{aiSynthesis.invalidationPoint}</p>
            </div>
          </div>
        )}

        {aiError && (
          <div className="text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20 mt-2">
            {aiError}
          </div>
        )}
      </div>
    </div>
  );
};
