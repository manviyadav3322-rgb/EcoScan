import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Terminal } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  text: string;
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    text: "[SYS] EcoScan Stylist v3.2 initialized. 8 assets indexed. Average sustainability: 71%. 3 items flagged. How can I assist?",
  },
];

const sampleResponses: Record<string, string> = {
  default:
    "Analysis: Synthetic Blouse (ECO-002) accounts for 28% of total footprint. Recommend swap to Organic Silk — estimated 3.1 kg CO₂ reduction/year.",
  polyester:
    "Polyester alert: ECO-002 releases ~700K microfibers per wash cycle. Flagged for replacement. Organic Silk alternative identified — 72% lower environmental payload.",
  sustainable:
    "Top assets: Organic Cotton Tee (95/100) and Vintage Denim Jacket (92/100). High wear count + low impact materials = optimal sustainability profile.",
  pattern:
    "Pattern analysis complete. Your wardrobe contains: 2× Geometric, 2× Solid, 1× Floral, 1× Block Print, 1× Animal Print, 1× Vintage Motif. Floral item (ECO-002) flagged — synthetic base.",
};

const StylistChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);

    const lower = input.toLowerCase();
    let key = "default";
    if (lower.includes("polyester") || lower.includes("synthetic")) key = "polyester";
    if (lower.includes("sustainable") || lower.includes("best")) key = "sustainable";
    if (lower.includes("pattern") || lower.includes("print")) key = "pattern";

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", text: sampleResponses[key] }]);
    }, 800);
    setInput("");
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, hsl(var(--neon-blue) / 0.2), hsl(var(--neon-purple) / 0.2))",
              border: "1px solid hsl(var(--neon-blue) / 0.3)",
              boxShadow: "0 0 30px -8px hsl(var(--neon-blue) / 0.4)",
            }}
          >
            <MessageCircle className="h-6 w-6 text-primary" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-6 bottom-6 top-6 w-[380px] z-50 rounded-xl flex flex-col overflow-hidden"
            style={{
              background: "hsl(var(--card) / 0.85)",
              backdropFilter: "blur(20px)",
              border: "1px solid hsl(var(--neon-blue) / 0.15)",
              boxShadow: "0 0 40px -10px hsl(var(--neon-blue) / 0.2)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--neon-blue) / 0.1)", border: "1px solid hsl(var(--neon-blue) / 0.2)" }}>
                  <Terminal className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">EcoScan AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    <p className="mono-data text-[10px] text-muted-foreground">ONLINE</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="h-6 w-6 rounded-md flex items-center justify-center flex-shrink-0 mt-1" style={{ background: "hsl(var(--neon-cyan) / 0.1)", border: "1px solid hsl(var(--neon-cyan) / 0.2)" }}>
                      <Bot className="h-3 w-3 text-accent" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded-xl text-[12px] leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-sm"
                      : "rounded-bl-sm mono-data"
                  }`} style={msg.role === "user"
                    ? { background: "hsl(var(--neon-blue) / 0.15)", color: "hsl(var(--neon-blue))", border: "1px solid hsl(var(--neon-blue) / 0.2)" }
                    : { background: "hsl(var(--secondary))", color: "hsl(var(--foreground))" }
                  }>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="px-5 py-4 border-t border-border">
              <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "hsl(var(--secondary))" }}>
                <span className="mono-data text-[10px] text-primary">{">"}</span>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Query wardrobe data..."
                  className="flex-1 bg-transparent mono-data text-xs text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button onClick={handleSend} className="h-7 w-7 rounded-md flex items-center justify-center transition-colors" style={{ background: "hsl(var(--neon-blue) / 0.15)", border: "1px solid hsl(var(--neon-blue) / 0.2)" }}>
                  <Send className="h-3 w-3 text-primary" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StylistChat;
