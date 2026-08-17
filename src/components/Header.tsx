import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Compass, 
  Sliders, 
  DollarSign, 
  BookOpen, 
  TrendingUp, 
  Sparkles, 
  AlertTriangle,
  Flame,
  Search
} from 'lucide-react';
import { MainTab, InterfaceMode, Stock } from '../types';

interface HeaderProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  interfaceMode: InterfaceMode;
  onSelectMode: (mode: InterfaceMode) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  interfaceMode,
  onSelectMode,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  stocks,
  onSelectStock,
}) => {
  const [showSearchDropdown, setShowSearchDropdown] = React.useState(false);

  const filteredSearch = stocks.filter(
    (s) =>
      s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-lg" id="main-header">
      {/* Top Utility / Market Regime Strip */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-slate-400">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Honest Alpha Engine: Real-Time Active
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="hidden sm:inline">
            <strong className="text-slate-300">VIX:</strong> 14.82 <span className="text-emerald-400">(-3.1% Low Volatility)</span>
          </span>
          <span className="text-slate-500 hidden md:inline">|</span>
          <span className="hidden md:inline">
            <strong className="text-slate-300">Market Breadth:</strong> 64.2% &gt; 50 EMA <span className="text-emerald-400">(Expansionary)</span>
          </span>
          <span className="text-slate-500 hidden lg:inline">|</span>
          <span className="hidden lg:inline">
            <strong className="text-slate-300">Dark Pool Flow:</strong> Net Institutional Inflow (+$2.8B)
          </span>
        </div>

        {/* Interface Complexity Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800" id="mode-switcher-container">
          <span className="text-slate-400 px-2 py-0.5 font-medium hidden sm:inline text-[11px]">View Mode:</span>
          <button
            id="mode-btn-executive"
            onClick={() => onSelectMode('executive')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
              interfaceMode === 'executive'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Simplified, zero-clutter 3-bullet execution summary"
          >
            <Sparkles className="w-3 h-3" />
            Executive
          </button>
          <button
            id="mode-btn-quant"
            onClick={() => onSelectMode('quant')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
              interfaceMode === 'quant'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Institutional quant scorecards rivaling Danelfin & TipRanks"
          >
            <Activity className="w-3 h-3" />
            Quant Factor
          </button>
          <button
            id="mode-btn-playbook"
            onClick={() => onSelectMode('playbook')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
              interfaceMode === 'playbook'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Step-by-step decision rules & invalidation triggers"
          >
            <Compass className="w-3 h-3" />
            Playbook
          </button>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
          {/* Logo & Value Proposition */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('screener')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-black text-xl tracking-tight">
              α
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg text-white tracking-tight">AlphaTruth AI</h1>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  Anti-Hype Prediction Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Solving the 5 major flaws in retail stock prediction tools
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-xs sm:max-w-md">
            <form onSubmit={onSearchSubmit} className="relative">
              <input
                id="stock-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="Search ticker (e.g. NVDA, PLTR, AAPL)..."
                className="w-full bg-slate-950/80 border border-slate-700/80 text-slate-200 pl-9 pr-20 py-2 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg font-medium transition-colors border border-slate-700"
              >
                Analyze
              </button>
            </form>

            {/* Auto-suggest dropdown */}
            {showSearchDropdown && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden max-h-64 overflow-y-auto">
                {filteredSearch.length > 0 ? (
                  filteredSearch.map((stock) => (
                    <div
                      key={stock.symbol}
                      onClick={() => {
                        onSelectStock(stock);
                        setShowSearchDropdown(false);
                      }}
                      className="px-3.5 py-2 hover:bg-slate-800/80 cursor-pointer flex items-center justify-between border-b border-slate-800/50 last:border-0"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-white text-sm">{stock.symbol}</span>
                        <span className="text-xs text-slate-400 truncate max-w-[140px]">{stock.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-300 font-mono">${stock.price.toFixed(2)}</span>
                        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                          stock.changePercent >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    onClick={(e) => {
                      onSearchSubmit(e);
                      setShowSearchDropdown(false);
                    }}
                    className="p-3 text-xs text-blue-400 hover:bg-slate-800/80 cursor-pointer text-center"
                  >
                    Generate AI Quant Analysis for <strong className="text-white font-bold">"{searchQuery.toUpperCase()}"</strong> →
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-2 overflow-x-auto pt-3.5 scrollbar-none text-sm" id="main-nav-tabs">
          <button
            id="tab-screener"
            onClick={() => onSelectTab('screener')}
            className={`px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-2 text-xs sm:text-sm ${
              currentTab === 'screener'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            AI Rankings &amp; Screener
          </button>

          <button
            id="tab-friction-lab"
            onClick={() => onSelectTab('frictionLab')}
            className={`px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-2 text-xs sm:text-sm ${
              currentTab === 'frictionLab'
                ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Real Friction &amp; Slippage Lab
            <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
              Anti-Win-Rate Illusion
            </span>
          </button>

          <button
            id="tab-exit-engine"
            onClick={() => onSelectTab('exitEngine')}
            className={`px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-2 text-xs sm:text-sm ${
              currentTab === 'exitEngine'
                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Dynamic Exit &amp; Sell Engine
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
              No More Bagholding
            </span>
          </button>

          <button
            id="tab-paper-portfolio"
            onClick={() => onSelectTab('paperPortfolio')}
            className={`px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-2 text-xs sm:text-sm ${
              currentTab === 'paperPortfolio'
                ? 'bg-amber-600/20 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Activity className="w-4 h-4" />
            Paper Portfolio Tracker
          </button>

          <button
            id="tab-complaint-audit"
            onClick={() => onSelectTab('complaintAudit')}
            className={`px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-2 text-xs sm:text-sm ${
              currentTab === 'complaintAudit'
                ? 'bg-rose-600/20 text-rose-400 border border-rose-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            Top 5 Complaints Benchmark
          </button>

          <button
            id="tab-pricing-transparency"
            onClick={() => onSelectTab('pricingTransparency')}
            className={`px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-2 text-xs sm:text-sm ${
              currentTab === 'pricingTransparency'
                ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            Zero-Dark-Pattern Pricing
          </button>
        </nav>
      </div>
    </header>
  );
};
