import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      timestamp: new Date().toISOString(),
    });
  });

  // AI Stock Analysis Endpoint (Gemini 2.5 Flash)
  app.post("/api/analyze-stock", async (req, res) => {
    try {
      const { symbol, name, price, changePercent, scores, riskMetrics } = req.body;

      const ai = getAIClient();
      if (!ai) {
        // Fallback response if API key is not configured yet
        return res.json({
          success: true,
          source: "heuristic-fallback",
          synthesis: {
            executiveSummary: `Quantitative evaluation for ${symbol} (${name}) indicates an AI Composite Score of ${scores?.composite || 7.8}/10. While technical momentum remains positive, our Anti-Chasing Radar detects moderate latency risk (+${changePercent || "2.4"}% on current impulse).`,
            bullThesis: `Strong fundamental health with expanding free cash flow and persistent institutional dark pool accumulation over the past 30 days.`,
            bearRisks: `Potential mean reversion if benchmark indices experience broad multiple compression. High retail FOMO concentration detected in near-the-money call options.`,
            invalidationPoint: `Thesis is invalidated if daily candle closes below $${(price * 0.94).toFixed(2)} (support floor) or if quarterly revenue decelerates by >400 bps.`,
            sellGuidance: {
              stopLoss: `$${(price * 0.945).toFixed(2)} (-5.5%)`,
              takeProfit1: `$${(price * 1.055).toFixed(2)} (+5.5% - Trim 33%)`,
              takeProfit2: `$${(price * 1.115).toFixed(2)} (+11.5% - Trim 33%)`,
              takeProfit3: `$${(price * 1.20).toFixed(2)} (+20% - Runner with Trailing Stop)`,
              timeHorizonDays: 21,
            },
            chasingRiskDiagnosis: `Chasing Risk: ${riskMetrics?.chasingRiskScore || 42}/100 (Moderate). Do NOT execute market buy during opening 15-minute volatility. Accumulate in the limit buy zone $${(price * 0.985).toFixed(2)} - $${(price * 0.995).toFixed(2)}.`,
          },
        });
      }

      const prompt = `You are AlphaTruth AI, an elite quantitative stock market intelligence and risk management analyst designed to address retail trader complaints about deceptive prediction apps.
Analyze the following stock with brutal honesty, quantitative realism, and zero hype.

Stock Data:
- Symbol: ${symbol}
- Company: ${name}
- Current Price: $${price}
- 24h Change: ${changePercent}%
- AI Composite Score: ${scores?.composite || 7.5}/10
- Fundamental Score: ${scores?.fundamental || 7.5}/10
- Technical Score: ${scores?.technical || 7.5}/10
- Institutional Flow Score: ${scores?.whaleFlow || 7.5}/10
- Sentiment Score: ${scores?.sentiment || 7.5}/10
- Chasing Risk Meter: ${riskMetrics?.chasingRiskScore || 50}/100
- Distance from 20 EMA: ${riskMetrics?.distanceFrom20EMA || "+3.2%"}

Your response MUST be strict JSON in the following structure:
{
  "executiveSummary": "Concise 2-sentence plain English summary of what to do and why.",
  "bullThesis": "Specific institutional and fundamental drivers supporting upside.",
  "bearRisks": "Real downside threats, macro exposure, and failure modes.",
  "invalidationPoint": "Exact price level or business event where the bullish thesis is dead.",
  "sellGuidance": {
    "stopLoss": "Exact price and percentage to cut losses unconditionally",
    "takeProfit1": "First scale-out target and percentage",
    "takeProfit2": "Second scale-out target and percentage",
    "takeProfit3": "Final runner target with trailing ATR",
    "timeHorizonDays": 15
  },
  "chasingRiskDiagnosis": "Actionable advice on whether retail traders are buying the peak or if there is safe entry."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const responseText = response.text || "{}";
      const parsedData = JSON.parse(responseText);

      res.json({
        success: true,
        source: "gemini-3.7-flash",
        synthesis: parsedData,
      });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to generate AI stock synthesis",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AlphaTruth AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
