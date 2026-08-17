export type InterfaceMode = 'executive' | 'quant' | 'playbook';

export type MainTab = 
  | 'screener' 
  | 'stockDetail' 
  | 'frictionLab' 
  | 'exitEngine' 
  | 'paperPortfolio' 
  | 'complaintAudit' 
  | 'pricingTransparency';

export type SetupStage = 'Accumulation' | 'Early Breakout' | 'Extended Run' | 'Exhaustion Top';

export interface PricePoint {
  date: string;
  price: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  ema20: number;
  sma50: number;
  institutionalFlow?: number;
}

export interface FactorSubMetric {
  name: string;
  value: string | number;
  score: number; // 1 - 10
  status: 'bullish' | 'neutral' | 'bearish';
  explanation: string;
}

export interface FactorScores {
  composite: number; // 1.0 - 10.0 (like Danelfin / TipRanks Smart Score)
  fundamental: number;
  technical: number;
  whaleFlow: number; // Institutional Dark pool / 13F / Block flow
  sentiment: number;
  fundamentalMetrics: FactorSubMetric[];
  technicalMetrics: FactorSubMetric[];
  whaleFlowMetrics: FactorSubMetric[];
  sentimentMetrics: FactorSubMetric[];
}

export interface ChasingRiskMetrics {
  chasingRiskScore: number; // 0 - 100 (0=Safe Base, 100=Extreme FOMO Trap)
  stage: SetupStage;
  distanceFrom20EMA: string; // e.g. "+8.4%"
  distanceFromBase: string; // e.g. "+14.2% from breakout"
  institutionalEntryZone: [number, number]; // [min, max]
  recommendedOrderType: 'Limit Order (Pullback)' | 'Market Order (Early)' | 'Wait / Avoid (Chasing)';
  retailFomoIndex: number; // 0-100
  whaleActivityStatus: 'Aggressive Accumulation' | 'Holding' | 'Distributing / Selling' | 'Neutral';
  warningMessage?: string;
}

export interface SellGuidance {
  stopLossHard: number;
  stopLossPercent: number; // e.g. -4.8%
  trailingStopATR: number; // e.g. 2.5x ATR
  takeProfit1: { price: number; percent: number; action: string };
  takeProfit2: { price: number; percent: number; action: string };
  takeProfit3: { price: number; percent: number; action: string };
  timeStopDays: number;
  thesisInvalidationTrigger: string;
  bagholderRiskScore: number; // 0-100 (how dangerous is it to hold through drawdown)
}

export interface BacktestRealism {
  nominalWinRate: number; // e.g. 68% (what shady apps market)
  realisticWinRate: number; // e.g. 52% (after slippage & latency)
  nominalProfitFactor: number;
  realisticProfitFactor: number;
  avgWinPercent: number;
  avgLossPercent: number;
  expectedValuePerThousand: number; // Realized $ EV per $1,000 risked
  maxDrawdown: number; // e.g. -14.2%
  sharpeRatio: number;
  worstConsecutiveLosses: number; // e.g. 5 trades in a row
  monteCarloP5: number; // 5th percentile outcome (worst case)
  monteCarloP50: number; // Median outcome
  monteCarloP95: number; // 95th percentile outcome
  tradeCountAnalyzed: number;
}

export interface Stock {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  peRatio: number;
  volume: string;
  avgVolume: string;
  sparkline: number[];
  historicalPrices: PricePoint[];
  scores: FactorScores;
  chasingRisk: ChasingRiskMetrics;
  sellGuidance: SellGuidance;
  backtest: BacktestRealism;
  executiveSummary: {
    verdict: 'High Prob Buy' | 'Speculative Buy' | 'Neutral / Hold' | 'Trim / Avoid';
    bullet1: string;
    bullet2: string;
    bullet3: string;
  };
}

export interface PaperTrade {
  id: string;
  symbol: string;
  name: string;
  entryDate: string;
  entryPrice: number;
  shares: number;
  totalCost: number;
  currentPrice: number;
  stopLoss: number;
  target1: number;
  target2: number;
  slippageIncurred: number;
  pnl: number;
  pnlPercent: number;
  status: 'OPEN' | 'TP1_HIT' | 'STOPPED_OUT' | 'CLOSED';
  notes: string;
}

export interface GeminiSynthesis {
  executiveSummary: string;
  bullThesis: string;
  bearRisks: string;
  invalidationPoint: string;
  sellGuidance: {
    stopLoss: string;
    takeProfit1: string;
    takeProfit2: string;
    takeProfit3: string;
    timeHorizonDays: number;
  };
  chasingRiskDiagnosis: string;
}
