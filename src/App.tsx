import React, { useState } from 'react';
import { Stock, MainTab, InterfaceMode, PaperTrade } from './types';
import { INITIAL_STOCKS, getStockBySymbol, createSyntheticStock } from './data/mockStocks';
import { Header } from './components/Header';
import { StockScreener } from './components/StockScreener';
import { StockDetailView } from './components/StockDetailView';
import { FrictionBacktestLab } from './components/FrictionBacktestLab';
import { DynamicSellEngine } from './components/DynamicSellEngine';
import { ComplaintAuditView } from './components/ComplaintAuditView';
import { PricingTransparency } from './components/PricingTransparency';
import { PaperPortfolio } from './components/PaperPortfolio';
import { AlertTriangle, ShieldCheck, Zap, Sliders, DollarSign, Sparkles } from 'lucide-react';

export default function App() {
  const [stocks, setStocks] = useState<Stock[]>(INITIAL_STOCKS);
  const [selectedStock, setSelectedStock] = useState<Stock>(INITIAL_STOCKS[0]);
  const [currentTab, setCurrentTab] = useState<MainTab>('screener');
  const [interfaceMode, setInterfaceMode] = useState<InterfaceMode>('executive');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Initial Paper Trades for realistic demonstration
  const [paperTrades, setPaperTrades] = useState<PaperTrade[]>([
    {
      id: 'trade-init-1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      entryDate: '2026-08-10',
      entryPrice: 222.50,
      shares: 35,
      totalCost: 7787.50,
      currentPrice: 224.80,
      stopLoss: 217.50,
      target1: 234.00,
      target2: 242.00,
      slippageIncurred: 19.50,
      pnl: 61.00,
      pnlPercent: 0.78,
      status: 'OPEN',
      notes: 'Accumulation base breakout entry. Stop at $217.50.',
    },
    {
      id: 'trade-init-2',
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      entryDate: '2026-08-12',
      entryPrice: 124.80,
      shares: 60,
      totalCost: 7488.00,
      currentPrice: 128.45,
      stopLoss: 121.20,
      target1: 136.50,
      target2: 144.00,
      slippageIncurred: 18.70,
      pnl: 200.30,
      pnlPercent: 2.67,
      status: 'OPEN',
      notes: 'Early breakout limit buy in institutional zone.',
    }
  ]);

  // Handle Search Submission (e.g. searching "GOOGL", "AMD", "LLY", etc.)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const existing = getStockBySymbol(searchQuery);
    if (existing) {
      setSelectedStock(existing);
      setCurrentTab('stockDetail');
      setSearchQuery('');
    } else {
      // Generate synthetic quant stock
      const synthetic = createSyntheticStock(searchQuery);
      setStocks((prev) => [synthetic, ...prev]);
      setSelectedStock(synthetic);
      setCurrentTab('stockDetail');
      setSearchQuery('');
    }
  };

  const handleSelectStock = (stock: Stock) => {
    setSelectedStock(stock);
    setCurrentTab('stockDetail');
  };

  const handleAddPaperTrade = (trade: PaperTrade) => {
    setPaperTrades((prev) => [trade, ...prev]);
  };

  const handleRemovePaperTrade = (id: string) => {
    setPaperTrades((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white" id="alpha-truth-root">
      {/* Navigation Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        interfaceMode={interfaceMode}
        onSelectMode={setInterfaceMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        stocks={stocks}
        onSelectStock={handleSelectStock}
      />

      {/* Hero Solutions Banner Strip */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-b border-slate-800/80 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto text-[11px] text-slate-300">
          <div className="flex items-center gap-6 whitespace-nowrap">
            <span className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Retail Protection Protocol Active:
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              Slippage &amp; Latency Modeled
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Anti-FOMO Peak Chasing Warnings
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Automated Hard Stop-Loss &amp; Scale-Outs
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Zero-Dark-Pattern Transparency
            </span>
          </div>

          <button
            onClick={() => setCurrentTab('complaintAudit')}
            className="text-xs font-bold text-blue-400 hover:text-blue-300 whitespace-nowrap underline underline-offset-4 cursor-pointer hidden md:inline"
          >
            Review 5 Common Flaws Benchmark →
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'screener' && (
          <StockScreener
            stocks={stocks}
            selectedStock={selectedStock}
            onSelectStock={handleSelectStock}
          />
        )}

        {currentTab === 'stockDetail' && (
          <StockDetailView
            stock={selectedStock}
            onBack={() => setCurrentTab('screener')}
            interfaceMode={interfaceMode}
            onAddPaperTrade={handleAddPaperTrade}
          />
        )}

        {currentTab === 'frictionLab' && (
          <FrictionBacktestLab stock={selectedStock} />
        )}

        {currentTab === 'exitEngine' && (
          <DynamicSellEngine stock={selectedStock} onAddPaperTrade={handleAddPaperTrade} />
        )}

        {currentTab === 'paperPortfolio' && (
          <PaperPortfolio
            trades={paperTrades}
            onRemoveTrade={handleRemovePaperTrade}
            onNavigateToStock={(sym) => {
              const stock = getStockBySymbol(sym);
              if (stock) {
                setSelectedStock(stock);
                setCurrentTab('stockDetail');
              }
            }}
            stocks={stocks}
          />
        )}

        {currentTab === 'complaintAudit' && (
          <ComplaintAuditView onNavigateTab={setCurrentTab} />
        )}

        {currentTab === 'pricingTransparency' && (
          <PricingTransparency />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-6 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">AlphaTruth AI</span>
            <span>— The Honest Quantitative Stock Intelligence Platform.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Server-side Gemini 2.5 Flash Integration</span>
            <span>•</span>
            <span>Real-World Slippage Engine</span>
            <span>•</span>
            <span>Zero Dark Patterns</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
