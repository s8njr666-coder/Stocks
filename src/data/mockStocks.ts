import { Stock, PricePoint } from '../types';

function generateHistoricalData(basePrice: number, volatility: number = 0.02, trend: number = 0.003): PricePoint[] {
  const points: PricePoint[] = [];
  let current = basePrice * 0.88;
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const noise = (Math.random() - 0.48) * volatility * current;
    current = current * (1 + trend) + noise;
    
    const open = current * (1 + (Math.random() - 0.5) * 0.008);
    const high = Math.max(open, current) * (1 + Math.random() * 0.012);
    const low = Math.min(open, current) * (1 - Math.random() * 0.012);
    const volume = Math.floor(basePrice * 120000 + Math.random() * 8000000);
    const ema20 = current * (0.97 + Math.random() * 0.02);
    const sma50 = current * (0.94 + Math.random() * 0.03);
    const institutionalFlow = Math.floor(Math.random() * 80 + 20);

    points.push({
      date: dateStr,
      price: Number(current.toFixed(2)),
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      volume,
      ema20: Number(ema20.toFixed(2)),
      sma50: Number(sma50.toFixed(2)),
      institutionalFlow
    });
  }
  return points;
}

export const INITIAL_STOCKS: Stock[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Semiconductors / AI',
    price: 128.45,
    change: 3.82,
    changePercent: 3.06,
    marketCap: '$3.15T',
    peRatio: 46.8,
    volume: '54.2M',
    avgVolume: '48.9M',
    sparkline: [118, 120, 119, 122, 125, 124, 128.45],
    historicalPrices: generateHistoricalData(128.45, 0.025, 0.004),
    scores: {
      composite: 8.9,
      fundamental: 9.6,
      technical: 8.4,
      whaleFlow: 9.1,
      sentiment: 8.5,
      fundamentalMetrics: [
        { name: 'Revenue Growth YoY', value: '+122%', score: 9.9, status: 'bullish', explanation: 'AI data center accelerator demand remains in hyper-expansion cycle' },
        { name: 'Operating Margin', value: '62.1%', score: 9.8, status: 'bullish', explanation: 'Best-in-class pricing power with CUDA moat' },
        { name: 'FCF Yield', value: '3.4%', score: 8.2, status: 'bullish', explanation: 'Strong cash conversion despite heavy R&D reinvestment' },
        { name: 'Debt to Equity', value: '0.18', score: 9.5, status: 'bullish', explanation: 'Practically zero default or solvency risk' },
      ],
      technicalMetrics: [
        { name: 'Trend vs 50d SMA', value: '+7.8%', score: 8.7, status: 'bullish', explanation: 'Trading comfortably above institutional support lines' },
        { name: 'Relative Strength (RSI 14)', value: '64.2', score: 7.6, status: 'neutral', explanation: 'Healthy momentum, not yet technically overbought (>70)' },
        { name: 'Volume Profile Breakout', value: '1.24x Avg', score: 8.8, status: 'bullish', explanation: 'Expansion day on above-average institutional participation' },
      ],
      whaleFlowMetrics: [
        { name: 'Dark Pool Buy/Sell Ratio', value: '2.41', score: 9.4, status: 'bullish', explanation: 'Heavy private block accumulation in $124-$126 range' },
        { name: '13F Hedge Fund Net Additions', value: '+18.4M shares', score: 9.0, status: 'bullish', explanation: 'Tier-1 long-only funds expanding allocation' },
        { name: 'Unusual Call Sweep Ratio', value: '78% Bullish', score: 8.8, status: 'bullish', explanation: 'Repeated sweeps in $135 and $140 strike 45-day calls' },
      ],
      sentimentMetrics: [
        { name: 'Wall St. Consensus Upside', value: '+22.4%', score: 8.9, status: 'bullish', explanation: '42 Buy / 3 Hold / 0 Sell rating distribution' },
        { name: 'Retail Sentiment Noise', value: 'High Hype', score: 6.8, status: 'neutral', explanation: 'High social volume introduces short-term headline volatility' },
      ],
    },
    chasingRisk: {
      chasingRiskScore: 48,
      stage: 'Early Breakout',
      distanceFrom20EMA: '+3.9%',
      distanceFromBase: '+5.4%',
      institutionalEntryZone: [124.50, 126.80],
      recommendedOrderType: 'Limit Order (Pullback)',
      retailFomoIndex: 64,
      whaleActivityStatus: 'Aggressive Accumulation',
      warningMessage: 'Stock is in early breakout. Avoid market chasing into opening pumps; use limit bids near $125.50.'
    },
    sellGuidance: {
      stopLossHard: 121.20,
      stopLossPercent: -5.6,
      trailingStopATR: 2.5,
      takeProfit1: { price: 136.50, percent: 6.3, action: 'Sell 35% of position to lock initial profit and move stop to breakeven' },
      takeProfit2: { price: 144.00, percent: 12.1, action: 'Sell next 35% and activate 2.5x ATR trailing stop' },
      takeProfit3: { price: 156.00, percent: 21.4, action: 'Let remaining 30% runner ride until daily close below 20 EMA' },
      timeStopDays: 20,
      thesisInvalidationTrigger: 'Invalidate and EXIT immediately if daily candle closes below $120.50 (key prior resistance turned support).',
      bagholderRiskScore: 32
    },
    backtest: {
      nominalWinRate: 74.2,
      realisticWinRate: 58.6,
      nominalProfitFactor: 2.84,
      realisticProfitFactor: 1.92,
      avgWinPercent: 9.8,
      avgLossPercent: 4.9,
      expectedValuePerThousand: 372.40,
      maxDrawdown: -11.4,
      sharpeRatio: 2.14,
      worstConsecutiveLosses: 4,
      monteCarloP5: -2.1,
      monteCarloP50: +14.8,
      monteCarloP95: +34.2,
      tradeCountAnalyzed: 142
    },
    executiveSummary: {
      verdict: 'High Prob Buy',
      bullet1: 'AI data center demand maintains exceptional gross margins (>62%) with dark pool accumulation backing current move.',
      bullet2: 'Chasing risk is moderate (+3.9% from 20 EMA); best risk-reward occurs on limit bids at $125.00–$126.50 rather than market buying highs.',
      bullet3: 'Unconditional hard stop is strictly $121.20 (-5.6%). First scale-out target is $136.50 (+6.3%).'
    }
  },
  {
    symbol: 'PLTR',
    name: 'Palantir Technologies Inc.',
    sector: 'Enterprise AI / Software',
    price: 34.20,
    change: 1.85,
    changePercent: 5.72,
    marketCap: '$76.4B',
    peRatio: 88.4,
    volume: '68.1M',
    avgVolume: '42.3M',
    sparkline: [29.5, 30.2, 31.0, 31.8, 33.1, 34.2],
    historicalPrices: generateHistoricalData(34.20, 0.032, 0.006),
    scores: {
      composite: 7.9,
      fundamental: 8.2,
      technical: 9.4,
      whaleFlow: 8.5,
      sentiment: 7.6,
      fundamentalMetrics: [
        { name: 'US Commercial Growth', value: '+54% YoY', score: 9.7, status: 'bullish', explanation: 'AIP bootcamps converting enterprise clients at record speed' },
        { name: 'GAAP Net Margin', value: '18.4%', score: 8.0, status: 'bullish', explanation: 'Consistent GAAP profitability and S&P 500 inclusion driver' },
        { name: 'Forward EV/Sales', value: '24.2x', score: 4.8, status: 'bearish', explanation: 'Valuation is stretched; zero margin of error for revenue misses' },
      ],
      technicalMetrics: [
        { name: 'Momentum Breakout', value: 'Multi-year High', score: 9.8, status: 'bullish', explanation: 'Clear cup & handle breakout on expanding volume' },
        { name: 'Distance from 20d EMA', value: '+12.4%', score: 4.2, status: 'bearish', explanation: 'Short-term overextended; rubber band is stretched' },
        { name: 'RSI 14', value: '76.8', score: 3.8, status: 'bearish', explanation: 'Overbought territory — high probability of 3-5 day consolidation' },
      ],
      whaleFlowMetrics: [
        { name: 'Dark Pool Volume', value: '$840M', score: 8.4, status: 'bullish', explanation: 'Significant block absorption by institutional algorithms' },
        { name: 'Option Gamma Squeeze', value: 'High Positive Delta', score: 8.6, status: 'bullish', explanation: 'Market makers forced to buy stock to hedge dealer gamma' },
      ],
      sentimentMetrics: [
        { name: 'Retail Social Mentions', value: '+340%', score: 4.2, status: 'bearish', explanation: 'Extreme retail euphoric buzz increases pullback vulnerability' },
        { name: 'Analyst Target Delta', value: '-8.5% (Over Target)', score: 5.5, status: 'neutral', explanation: 'Trading above mean analyst target ($31.50)' },
      ],
    },
    chasingRisk: {
      chasingRiskScore: 84,
      stage: 'Extended Run',
      distanceFrom20EMA: '+12.4%',
      distanceFromBase: '+19.8%',
      institutionalEntryZone: [30.50, 31.80],
      recommendedOrderType: 'Wait / Avoid (Chasing)',
      retailFomoIndex: 91,
      whaleActivityStatus: 'Holding',
      warningMessage: '⚠️ HIGH CHASING RISK: Stock has surged +19.8% without a pause. Retail traders buying here risk being liquidity for quick mean-reversion pullbacks.'
    },
    sellGuidance: {
      stopLossHard: 31.40,
      stopLossPercent: -8.2,
      trailingStopATR: 2.0,
      takeProfit1: { price: 36.80, percent: 7.6, action: 'Sell 40% if holding from lower entries' },
      takeProfit2: { price: 39.50, percent: 15.5, action: 'Sell 35% at psychological $40 resistance' },
      takeProfit3: { price: 44.00, percent: 28.6, action: 'Keep small runner with tight trailing stop' },
      timeStopDays: 14,
      thesisInvalidationTrigger: 'Cut immediately if stock breaks below $31.40 on heavy volume.',
      bagholderRiskScore: 68
    },
    backtest: {
      nominalWinRate: 69.5,
      realisticWinRate: 46.2,
      nominalProfitFactor: 2.15,
      realisticProfitFactor: 1.34,
      avgWinPercent: 12.4,
      avgLossPercent: 7.8,
      expectedValuePerThousand: 184.20,
      maxDrawdown: -22.1,
      sharpeRatio: 1.45,
      worstConsecutiveLosses: 6,
      monteCarloP5: -8.4,
      monteCarloP50: +9.2,
      monteCarloP95: +38.1,
      tradeCountAnalyzed: 118
    },
    executiveSummary: {
      verdict: 'Trim / Avoid',
      bullet1: 'Outstanding commercial software execution, but stock is currently +12.4% above its 20-day moving average (extreme extension).',
      bullet2: 'Chasing risk score is 84/100. Buying at market now exposes you to standard -6% to -10% mean-reversion pullbacks.',
      bullet3: 'Patient strategy: Wait for a test of the $31.50–$32.00 support zone before deploying fresh capital.'
    }
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Consumer Electronics / Services',
    price: 224.80,
    change: -0.92,
    changePercent: -0.41,
    marketCap: '$3.42T',
    peRatio: 33.5,
    volume: '38.4M',
    avgVolume: '44.1M',
    sparkline: [220, 222, 226, 225, 224, 224.80],
    historicalPrices: generateHistoricalData(224.80, 0.012, 0.001),
    scores: {
      composite: 8.4,
      fundamental: 9.4,
      technical: 7.8,
      whaleFlow: 8.8,
      sentiment: 7.9,
      fundamentalMetrics: [
        { name: 'Services Revenue Growth', value: '+14.1% YoY', score: 9.5, status: 'bullish', explanation: 'High-margin recurring services offset hardware replacement cycle' },
        { name: 'Annual Share Buybacks', value: '$110 Billion', score: 9.9, status: 'bullish', explanation: 'Unprecedented capital return creating massive downside price floor' },
        { name: 'FCF Conversion', value: '104%', score: 9.6, status: 'bullish', explanation: 'Fortress cash generation machine' },
      ],
      technicalMetrics: [
        { name: 'Support Base Consolidation', value: '4-Week Base', score: 9.1, status: 'bullish', explanation: 'Tight volatility contraction pattern forming near all-time highs' },
        { name: 'Distance from 20d EMA', value: '+0.8%', score: 9.4, status: 'bullish', explanation: 'Optimal low-risk entry location resting right on primary moving average' },
        { name: 'RSI 14', value: '52.4', score: 8.5, status: 'bullish', explanation: 'Neutral reset — primed for next impulse leg' },
      ],
      whaleFlowMetrics: [
        { name: 'Institutional Block Buying', value: 'Steady Net Inflow', score: 8.9, status: 'bullish', explanation: 'Buffett/Pension funds maintaining structural core positions' },
        { name: 'Dark Pool Volume Delta', value: '+14% above norm', score: 8.6, status: 'bullish', explanation: 'Quiet accumulation during low-volatility chop' },
      ],
      sentimentMetrics: [
        { name: 'Apple Intelligence Adoption', value: 'Cautious Optimism', score: 7.8, status: 'neutral', explanation: 'Upgrades pending full Siri AI software rollout' },
        { name: 'Analyst Consensus Target', value: '$245.00 (+9.0%)', score: 8.0, status: 'bullish', explanation: 'Upward target revisions from Morgan Stanley and Goldman' },
      ],
    },
    chasingRisk: {
      chasingRiskScore: 18,
      stage: 'Accumulation',
      distanceFrom20EMA: '+0.8%',
      distanceFromBase: '+1.2%',
      institutionalEntryZone: [222.00, 225.50],
      recommendedOrderType: 'Market Order (Early)',
      retailFomoIndex: 32,
      whaleActivityStatus: 'Aggressive Accumulation',
      warningMessage: '✅ LOW CHASING RISK: Stock is coiled at the bottom of a 4-week base. Excellent risk-reward entry zone with tight stop definition.'
    },
    sellGuidance: {
      stopLossHard: 217.50,
      stopLossPercent: -3.2,
      trailingStopATR: 2.2,
      takeProfit1: { price: 234.00, percent: 4.1, action: 'Trim 30% on re-test of prior high' },
      takeProfit2: { price: 242.00, percent: 7.6, action: 'Trim 40% at analyst consensus target' },
      takeProfit3: { price: 255.00, percent: 13.4, action: 'Trail remainder with 20-day EMA' },
      timeStopDays: 25,
      thesisInvalidationTrigger: 'Exit if stock breaks below $217.00 support with expanding volume.',
      bagholderRiskScore: 14
    },
    backtest: {
      nominalWinRate: 71.0,
      realisticWinRate: 64.2,
      nominalProfitFactor: 2.62,
      realisticProfitFactor: 2.24,
      avgWinPercent: 7.2,
      avgLossPercent: 3.1,
      expectedValuePerThousand: 412.50,
      maxDrawdown: -6.8,
      sharpeRatio: 2.48,
      worstConsecutiveLosses: 3,
      monteCarloP5: +1.8,
      monteCarloP50: +11.4,
      monteCarloP95: +24.6,
      tradeCountAnalyzed: 194
    },
    executiveSummary: {
      verdict: 'High Prob Buy',
      bullet1: 'Resting right on its 20-day EMA (+0.8%) inside a healthy 4-week accumulation consolidation.',
      bullet2: 'Chasing risk score is exceptionally low (18/100); low retail hype and heavy $110B buyback support.',
      bullet3: 'Asymmetric risk-reward setup: Tight -3.2% stop loss at $217.50 with multi-target upside to $242.00+.'
    }
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    sector: 'Automotive / Energy / Robotics',
    price: 218.60,
    change: -4.10,
    changePercent: -1.84,
    marketCap: '$698B',
    peRatio: 62.1,
    volume: '72.5M',
    avgVolume: '65.2M',
    sparkline: [235, 230, 226, 222, 220, 218.60],
    historicalPrices: generateHistoricalData(218.60, 0.038, -0.002),
    scores: {
      composite: 5.8,
      fundamental: 5.4,
      technical: 5.6,
      whaleFlow: 6.2,
      sentiment: 6.8,
      fundamentalMetrics: [
        { name: 'Auto Gross Margin (ex-reg)', value: '14.6%', score: 4.8, status: 'bearish', explanation: 'Price cuts continuing to pressure automotive unit profitability' },
        { name: 'Energy Storage Deployment', value: '+158% YoY', score: 9.4, status: 'bullish', explanation: 'Megapack business growing rapidly, becoming a major revenue pillar' },
        { name: 'Free Cash Flow Trend', value: '$1.3B', score: 6.0, status: 'neutral', explanation: 'Heavy AI computing and Robotaxi CAPEX draining near-term cash' },
      ],
      technicalMetrics: [
        { name: 'Position vs 200d SMA', value: 'Testing $212 Support', score: 5.2, status: 'neutral', explanation: 'Challenging critical multi-month floor' },
        { name: 'Trend Direction', value: 'Short-term Downtrend', score: 4.6, status: 'bearish', explanation: 'Making lower highs over the last 14 trading days' },
        { name: 'Implied Volatility Percentile', value: '82%', score: 5.9, status: 'neutral', explanation: 'Options market pricing in wide event swings' },
      ],
      whaleFlowMetrics: [
        { name: 'Dark Pool Sentiment', value: 'Net Outflow -0.8x', score: 5.1, status: 'bearish', explanation: 'Funds taking chips off table into strength' },
        { name: 'Retail Option Skew', value: 'Call Heavy', score: 6.5, status: 'neutral', explanation: 'Retail traders buying out-of-the-money lotto calls' },
      ],
      sentimentMetrics: [
        { name: 'Robotaxi / FSD Catalyst', value: 'High Speculation', score: 7.2, status: 'neutral', explanation: 'Binary regulatory and software execution timeline' },
        { name: 'Wall St. Disagreement', value: 'Wide Spread ($115 - $310)', score: 5.0, status: 'neutral', explanation: 'Huge dispersion in analyst price targets reflects uncertainty' },
      ],
    },
    chasingRisk: {
      chasingRiskScore: 35,
      stage: 'Accumulation',
      distanceFrom20EMA: '-4.2%',
      distanceFromBase: '-8.5%',
      institutionalEntryZone: [205.00, 212.00],
      recommendedOrderType: 'Limit Order (Pullback)',
      retailFomoIndex: 58,
      whaleActivityStatus: 'Neutral',
      warningMessage: 'Stock is currently testing key support. Not overextended, but lacking confirmation momentum.'
    },
    sellGuidance: {
      stopLossHard: 204.00,
      stopLossPercent: -6.7,
      trailingStopATR: 3.0,
      takeProfit1: { price: 232.00, percent: 6.1, action: 'Take 40% off on resistance rebound' },
      takeProfit2: { price: 248.00, percent: 13.4, action: 'Take 30% off near 50-day moving average' },
      takeProfit3: { price: 268.00, percent: 22.6, action: 'Trail remaining 30%' },
      timeStopDays: 15,
      thesisInvalidationTrigger: 'Hard cutoff: If $204 breaks on high volume, full thesis fails (risk of re-testing $180).',
      bagholderRiskScore: 74
    },
    backtest: {
      nominalWinRate: 54.0,
      realisticWinRate: 41.8,
      nominalProfitFactor: 1.58,
      realisticProfitFactor: 1.12,
      avgWinPercent: 11.2,
      avgLossPercent: 8.6,
      expectedValuePerThousand: 84.10,
      maxDrawdown: -28.4,
      sharpeRatio: 0.88,
      worstConsecutiveLosses: 7,
      monteCarloP5: -18.2,
      monteCarloP50: +4.6,
      monteCarloP95: +29.5,
      tradeCountAnalyzed: 168
    },
    executiveSummary: {
      verdict: 'Neutral / Hold',
      bullet1: 'Auto margins remain under pricing pressure, though Energy storage growth provides a secular tailwind.',
      bullet2: 'Stock is in a chop zone testing $212 support; do not deploy aggressive size until a daily close above $225 occurs.',
      bullet3: 'If holding, maintain a non-negotiable stop loss at $204.00 to avoid severe drawdown risk.'
    }
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Cloud & Enterprise Software',
    price: 432.50,
    change: 4.60,
    changePercent: 1.08,
    marketCap: '$3.22T',
    peRatio: 35.8,
    volume: '19.8M',
    avgVolume: '21.4M',
    sparkline: [420, 424, 422, 428, 430, 432.50],
    historicalPrices: generateHistoricalData(432.50, 0.014, 0.002),
    scores: {
      composite: 8.7,
      fundamental: 9.5,
      technical: 8.2,
      whaleFlow: 9.0,
      sentiment: 8.3,
      fundamentalMetrics: [
        { name: 'Azure Cloud Revenue Growth', value: '+29% YoY (cc)', score: 9.6, status: 'bullish', explanation: 'AI services contributing 8 points of incremental Azure growth' },
        { name: 'Copilot Monetization', value: 'Expanding ARPU', score: 8.8, status: 'bullish', explanation: 'Office 365 enterprise seat upgrades gaining traction' },
        { name: 'Operating Margin', value: '44.8%', score: 9.7, status: 'bullish', explanation: 'World-class operating leverage and software unit economics' },
      ],
      technicalMetrics: [
        { name: 'Trend Alignment (20/50/200)', value: 'Triple Bull Stack', score: 9.0, status: 'bullish', explanation: 'All primary moving averages upward sloping in sequence' },
        { name: 'Relative Strength vs SPY', value: '+4.2% Beta Adj', score: 8.1, status: 'bullish', explanation: 'Outperforming broader market during consolidation weeks' },
      ],
      whaleFlowMetrics: [
        { name: 'Dark Pool Volume Delta', value: '+28%', score: 9.2, status: 'bullish', explanation: 'Sustained institutional accumulation with zero block selling' },
      ],
      sentimentMetrics: [
        { name: 'Wall St. Strong Buy Ratio', value: '94%', score: 9.0, status: 'bullish', explanation: 'Overwhelming institutional analyst support' },
      ],
    },
    chasingRisk: {
      chasingRiskScore: 28,
      stage: 'Early Breakout',
      distanceFrom20EMA: '+1.9%',
      distanceFromBase: '+3.1%',
      institutionalEntryZone: [426.00, 431.00],
      recommendedOrderType: 'Market Order (Early)',
      retailFomoIndex: 44,
      whaleActivityStatus: 'Aggressive Accumulation',
      warningMessage: 'Healthy steady uptrend with moderate entry risk. Limit orders around $428–$430 provide ideal risk-reward.'
    },
    sellGuidance: {
      stopLossHard: 418.00,
      stopLossPercent: -3.3,
      trailingStopATR: 2.2,
      takeProfit1: { price: 448.00, percent: 3.6, action: 'Take 33% profit at prior all-time high' },
      takeProfit2: { price: 465.00, percent: 7.5, action: 'Take 33% profit at psychological extension target' },
      takeProfit3: { price: 490.00, percent: 13.3, action: 'Trail remainder with 50-day SMA' },
      timeStopDays: 28,
      thesisInvalidationTrigger: 'Exit if Azure growth deceleration drops below 24% or price breaks under $418 support.',
      bagholderRiskScore: 18
    },
    backtest: {
      nominalWinRate: 72.8,
      realisticWinRate: 63.4,
      nominalProfitFactor: 2.70,
      realisticProfitFactor: 2.18,
      avgWinPercent: 7.9,
      avgLossPercent: 3.4,
      expectedValuePerThousand: 398.20,
      maxDrawdown: -7.4,
      sharpeRatio: 2.35,
      worstConsecutiveLosses: 3,
      monteCarloP5: +2.4,
      monteCarloP50: +12.8,
      monteCarloP95: +27.4,
      tradeCountAnalyzed: 180
    },
    executiveSummary: {
      verdict: 'High Prob Buy',
      bullet1: 'Azure AI contribution accelerating to +29% YoY with dominant enterprise cloud moat.',
      bullet2: 'Low chasing risk (28/100); stock is merely +1.9% above 20 EMA with strong institutional support.',
      bullet3: 'Manage downside strictly with a $418.00 (-3.3%) hard stop; initial target $448.00 (+3.6%).'
    }
  },
  {
    symbol: 'CRWD',
    name: 'CrowdStrike Holdings',
    sector: 'Cybersecurity',
    price: 284.20,
    change: 6.80,
    changePercent: 2.45,
    marketCap: '$69.8B',
    peRatio: 74.2,
    volume: '4.8M',
    avgVolume: '5.1M',
    sparkline: [260, 268, 274, 272, 280, 284.20],
    historicalPrices: generateHistoricalData(284.20, 0.028, 0.003),
    scores: {
      composite: 7.8,
      fundamental: 8.4,
      technical: 7.6,
      whaleFlow: 8.2,
      sentiment: 7.1,
      fundamentalMetrics: [
        { name: 'Annual Recurring Revenue (ARR)', value: '$3.86B (+33% YoY)', score: 9.1, status: 'bullish', explanation: 'Platform consolidation strategy winning multi-module deals' },
        { name: 'Free Cash Flow Margin', value: '34.2%', score: 9.4, status: 'bullish', explanation: 'Strong unit economics and customer retention' },
        { name: 'Post-Outage Recovery Metric', value: '98% Customer Retention', score: 8.0, status: 'bullish', explanation: 'Customer base intact despite July outage impact' },
      ],
      technicalMetrics: [
        { name: 'Gap Fill Progress', value: '72% Completed', score: 8.1, status: 'bullish', explanation: 'Steadily reclaiming structural resistance bands' },
        { name: 'Distance from 20d EMA', value: '+4.8%', score: 7.2, status: 'neutral', explanation: 'Slightly stretched on 3-day bounce' },
      ],
      whaleFlowMetrics: [
        { name: 'Institutional Buy Ratio', value: '1.85', score: 8.4, status: 'bullish', explanation: 'Hedge funds accumulating the recovery thesis' },
      ],
      sentimentMetrics: [
        { name: 'Headline Sentiment', value: 'Improving', score: 7.0, status: 'neutral', explanation: 'Media focus shifting from outage liability to platform resilience' },
      ],
    },
    chasingRisk: {
      chasingRiskScore: 54,
      stage: 'Early Breakout',
      distanceFrom20EMA: '+4.8%',
      distanceFromBase: '+9.2%',
      institutionalEntryZone: [272.00, 278.00],
      recommendedOrderType: 'Limit Order (Pullback)',
      retailFomoIndex: 61,
      whaleActivityStatus: 'Holding',
      warningMessage: 'Recovery rally is healthy but short-term overbought. Bid in the $274–$278 range on intraday dips.'
    },
    sellGuidance: {
      stopLossHard: 265.00,
      stopLossPercent: -6.7,
      trailingStopATR: 2.8,
      takeProfit1: { price: 305.00, percent: 7.3, action: 'Sell 35% on full gap fill test' },
      takeProfit2: { price: 328.00, percent: 15.4, action: 'Sell 35% at major resistance pivot' },
      takeProfit3: { price: 360.00, percent: 26.7, action: 'Hold remaining runner with trailing stop' },
      timeStopDays: 21,
      thesisInvalidationTrigger: 'Hard exit if stock closes below $265 support floor.',
      bagholderRiskScore: 45
    },
    backtest: {
      nominalWinRate: 67.4,
      realisticWinRate: 51.2,
      nominalProfitFactor: 2.10,
      realisticProfitFactor: 1.54,
      avgWinPercent: 10.4,
      avgLossPercent: 6.2,
      expectedValuePerThousand: 228.40,
      maxDrawdown: -18.6,
      sharpeRatio: 1.62,
      worstConsecutiveLosses: 5,
      monteCarloP5: -6.2,
      monteCarloP50: +10.8,
      monteCarloP95: +32.5,
      tradeCountAnalyzed: 124
    },
    executiveSummary: {
      verdict: 'Speculative Buy',
      bullet1: 'Customer retention held firm at >98% post-outage with ARR expanding +33% YoY.',
      bullet2: 'Chasing risk is moderate (54/100); best entry is via limit orders in the $274–$278 pullback zone.',
      bullet3: 'Set stop loss at $265.00 (-6.7%) with primary upside target at $305.00 (+7.3%).'
    }
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    sector: 'E-Commerce & Cloud Infrastructure',
    price: 186.75,
    change: 2.15,
    changePercent: 1.16,
    marketCap: '$1.94T',
    peRatio: 41.2,
    volume: '34.6M',
    avgVolume: '39.2M',
    sparkline: [178, 180, 182, 184, 185, 186.75],
    historicalPrices: generateHistoricalData(186.75, 0.016, 0.002),
    scores: {
      composite: 8.5,
      fundamental: 9.2,
      technical: 8.1,
      whaleFlow: 8.7,
      sentiment: 8.0,
      fundamentalMetrics: [
        { name: 'AWS Cloud Growth YoY', value: '+19%', score: 9.0, status: 'bullish', explanation: 'AWS re-accelerating alongside custom Trainium/Inferentia chips' },
        { name: 'North America Retail Margin', value: '5.8%', score: 8.8, status: 'bullish', explanation: 'Regional fulfillment network driving structural cost per unit down' },
        { name: 'Advertising Services Growth', value: '+20% YoY', score: 9.6, status: 'bullish', explanation: 'Prime Video ads adding high-margin incremental cash flow' },
      ],
      technicalMetrics: [
        { name: 'Base Breakout Setup', value: 'Ascending Triangle', score: 8.6, status: 'bullish', explanation: 'Pressuring the $190 pivot on rising volume' },
        { name: 'Distance from 20d EMA', value: '+2.1%', score: 8.8, status: 'bullish', explanation: 'Reasonable extension; suitable for position building' },
      ],
      whaleFlowMetrics: [
        { name: 'Dark Pool Buying Index', value: '2.10', score: 8.9, status: 'bullish', explanation: 'Persistent institutional bid supporting $182–$185 range' },
      ],
      sentimentMetrics: [
        { name: 'Consensus Wall St Target', value: '$215.00 (+15%)', score: 8.4, status: 'bullish', explanation: 'Strong buy consensus across 50+ sell-side firms' },
      ],
    },
    chasingRisk: {
      chasingRiskScore: 32,
      stage: 'Early Breakout',
      distanceFrom20EMA: '+2.1%',
      distanceFromBase: '+3.8%',
      institutionalEntryZone: [183.50, 186.00],
      recommendedOrderType: 'Limit Order (Pullback)',
      retailFomoIndex: 48,
      whaleActivityStatus: 'Aggressive Accumulation',
      warningMessage: 'Coiling below major $190 all-time resistance. Good entry timing before potential high-volume breakout.'
    },
    sellGuidance: {
      stopLossHard: 178.50,
      stopLossPercent: -4.4,
      trailingStopATR: 2.2,
      takeProfit1: { price: 196.00, percent: 5.0, action: 'Trim 33% as it breaks into blue-sky territory' },
      takeProfit2: { price: 210.00, percent: 12.4, action: 'Trim 33% at $210 psychological milestone' },
      takeProfit3: { price: 228.00, percent: 22.1, action: 'Trail remaining 34% with 20 EMA' },
      timeStopDays: 24,
      thesisInvalidationTrigger: 'Cut if price closes below $178.50 base support.',
      bagholderRiskScore: 21
    },
    backtest: {
      nominalWinRate: 70.2,
      realisticWinRate: 61.5,
      nominalProfitFactor: 2.45,
      realisticProfitFactor: 1.95,
      avgWinPercent: 8.4,
      avgLossPercent: 4.1,
      expectedValuePerThousand: 342.10,
      maxDrawdown: -8.8,
      sharpeRatio: 2.08,
      worstConsecutiveLosses: 4,
      monteCarloP5: +0.6,
      monteCarloP50: +11.9,
      monteCarloP95: +28.1,
      tradeCountAnalyzed: 160
    },
    executiveSummary: {
      verdict: 'High Prob Buy',
      bullet1: 'AWS re-accelerating (+19%) with expanding Prime Video ad margins providing dual earnings catalysts.',
      bullet2: 'Low-to-moderate chasing risk (32/100); coiling right under $190 breakout pivot with dark pool support.',
      bullet3: 'Cut loss strictly at $178.50 (-4.4%); initial target $196.00 (+5.0%) with $210+ secondary target.'
    }
  }
];

export function getStockBySymbol(symbol: string): Stock | undefined {
  return INITIAL_STOCKS.find((s) => s.symbol.toUpperCase() === symbol.toUpperCase());
}

export function createSyntheticStock(symbol: string, customPrice?: number): Stock {
  const sym = symbol.toUpperCase();
  const price = customPrice || Math.floor(Math.random() * 250 + 40);
  const changePercent = Number(((Math.random() - 0.45) * 4).toFixed(2));
  const change = Number(((price * changePercent) / 100).toFixed(2));
  const composite = Number((Math.random() * 3 + 6.5).toFixed(1));
  const chasingRiskScore = Math.floor(Math.random() * 70 + 20);

  return {
    symbol: sym,
    name: `${sym} Corp / Technology`,
    sector: 'Technology / Market Mover',
    price,
    change,
    changePercent,
    marketCap: `$${(Math.random() * 300 + 20).toFixed(1)}B`,
    peRatio: Number((Math.random() * 40 + 18).toFixed(1)),
    volume: `${(Math.random() * 30 + 5).toFixed(1)}M`,
    avgVolume: `${(Math.random() * 25 + 5).toFixed(1)}M`,
    sparkline: [price * 0.95, price * 0.97, price * 0.96, price * 0.99, price],
    historicalPrices: generateHistoricalData(price, 0.02, 0.002),
    scores: {
      composite,
      fundamental: Number((Math.random() * 2 + 7.5).toFixed(1)),
      technical: Number((Math.random() * 2 + 7.5).toFixed(1)),
      whaleFlow: Number((Math.random() * 2 + 7.5).toFixed(1)),
      sentiment: Number((Math.random() * 2 + 7.0).toFixed(1)),
      fundamentalMetrics: [
        { name: 'Revenue Growth', value: '+18% YoY', score: 8.5, status: 'bullish', explanation: 'Healthy core demand acceleration' },
        { name: 'Operating Margin', value: '28.4%', score: 8.2, status: 'bullish', explanation: 'Stable operating leverage' }
      ],
      technicalMetrics: [
        { name: 'Trend vs 50 SMA', value: '+3.4%', score: 7.8, status: 'bullish', explanation: 'Above key institutional moving average' },
        { name: 'RSI 14', value: '58.2', score: 7.5, status: 'neutral', explanation: 'Constructive momentum' }
      ],
      whaleFlowMetrics: [
        { name: 'Dark Pool Volume Delta', value: '+12%', score: 8.1, status: 'bullish', explanation: 'Net institutional accumulation' }
      ],
      sentimentMetrics: [
        { name: 'Analyst Consensus', value: 'Moderate Buy', score: 7.9, status: 'bullish', explanation: 'Positive analyst revision trend' }
      ]
    },
    chasingRisk: {
      chasingRiskScore,
      stage: chasingRiskScore > 70 ? 'Extended Run' : chasingRiskScore > 40 ? 'Early Breakout' : 'Accumulation',
      distanceFrom20EMA: `+${(chasingRiskScore / 15).toFixed(1)}%`,
      distanceFromBase: `+${(chasingRiskScore / 10).toFixed(1)}%`,
      institutionalEntryZone: [Number((price * 0.97).toFixed(2)), Number((price * 0.99).toFixed(2))],
      recommendedOrderType: chasingRiskScore > 70 ? 'Wait / Avoid (Chasing)' : 'Limit Order (Pullback)',
      retailFomoIndex: chasingRiskScore,
      whaleActivityStatus: chasingRiskScore > 70 ? 'Holding' : 'Aggressive Accumulation',
      warningMessage: chasingRiskScore > 70 ? 'High chasing risk detected. Avoid buying opening spikes.' : 'Healthy setup with reasonable entry timing.'
    },
    sellGuidance: {
      stopLossHard: Number((price * 0.95).toFixed(2)),
      stopLossPercent: -5.0,
      trailingStopATR: 2.5,
      takeProfit1: { price: Number((price * 1.06).toFixed(2)), percent: 6.0, action: 'Trim 33% and move stop to breakeven' },
      takeProfit2: { price: Number((price * 1.12).toFixed(2)), percent: 12.0, action: 'Trim 33% at primary resistance' },
      takeProfit3: { price: Number((price * 1.20).toFixed(2)), percent: 20.0, action: 'Trail remainder with 20 EMA' },
      timeStopDays: 20,
      thesisInvalidationTrigger: `Cut trade if daily candle closes below $${(price * 0.95).toFixed(2)}.`,
      bagholderRiskScore: 35
    },
    backtest: {
      nominalWinRate: 68.0,
      realisticWinRate: 54.5,
      nominalProfitFactor: 2.2,
      realisticProfitFactor: 1.65,
      avgWinPercent: 8.5,
      avgLossPercent: 4.8,
      expectedValuePerThousand: 265.00,
      maxDrawdown: -12.5,
      sharpeRatio: 1.85,
      worstConsecutiveLosses: 4,
      monteCarloP5: -4.0,
      monteCarloP50: +11.0,
      monteCarloP95: +28.0,
      tradeCountAnalyzed: 110
    },
    executiveSummary: {
      verdict: composite > 8 ? 'High Prob Buy' : 'Speculative Buy',
      bullet1: `Quantitative model rates ${sym} at ${composite}/10 composite score with healthy underlying fundamentals.`,
      bullet2: `Chasing risk is ${chasingRiskScore}/100. Place limit bids near $${(price * 0.98).toFixed(2)} to avoid slippage.`,
      bullet3: `Hard stop loss at $${(price * 0.95).toFixed(2)} (-5.0%). First profit target $${(price * 1.06).toFixed(2)} (+6.0%).`
    }
  };
}
