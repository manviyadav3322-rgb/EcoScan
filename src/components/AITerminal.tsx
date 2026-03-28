import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Terminal, ChevronRight } from "lucide-react";

const systemMessages = [
  { type: "system" as const, text: "[SYS] Eco-Scan Engine v3.2.1 initialized" },
  { type: "system" as const, text: "[SYS] Wardrobe neural map loaded — 8 assets indexed" },
  { type: "ai" as const, text: "Analysis complete. 3 items flagged as HIGH EMISSION. Polyester and Nylon-based garments contribute 73% of your wardrobe's total carbon footprint." },
  { type: "ai" as const, text: "Recommendation: Replace Polyester Bomber (ECO-003) with a recycled-fiber alternative. Estimated CO₂ reduction: 14.2 kg/year." },
  { type: "system" as const, text: "[SYS] Sustainability score recalculating..." },
  { type: "ai" as const, text: "Current outfit simulation: 67/100 sustainability index. Swap the Nylon Windbreaker for a hemp-based layer to reach 82/100." },
];

const AITerminal = () => {
  const [visibleMessages, setVisibleMessages] = useState<typeof systemMessages>([]);
  const [thinking, setThinking] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < systemMessages.length) {
        setVisibleMessages((prev) => [...prev, systemMessages[i]]);
        i++;
        setThinking(true);
        setTimeout(() => setThinking(i < systemMessages.length), 800);
      } else {
        clearInterval(interval);
        setThinking(false);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel-glow flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <Terminal className="h-4 w-4 text-primary" />
        <span className="text-xs font-display tracking-wider text-primary">AI Stylist</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className={`h-2 w-2 rounded-full ${thinking ? "bg-accent animate-pulse" : "bg-primary"}`} />
          <span className="text-[10px] text-muted-foreground font-mono">
            {thinking ? "PROCESSING" : "READY"}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
        {visibleMessages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex gap-2 ${msg.type === "system" ? "" : ""}`}
          >
            {msg.type === "ai" ? (
              <Bot className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" />
            )}
            <span className={msg.type === "system" ? "text-accent" : "text-foreground leading-relaxed"}>
              {msg.text}
            </span>
          </motion.div>
        ))}

        {thinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <Bot className="h-3.5 w-3.5 text-primary" />
            <span>System thinking...</span>
            <span className="inline-block w-2 h-3 bg-primary animate-pulse" />
          </motion.div>
        )}
      </div>

      {/* Input bar */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2 bg-muted/50 rounded px-3 py-2">
          <ChevronRight className="h-3 w-3 text-primary" />
          <input
            type="text"
            placeholder="Query the AI stylist..."
            className="bg-transparent text-xs font-mono text-foreground placeholder:text-muted-foreground outline-none flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default AITerminal;
