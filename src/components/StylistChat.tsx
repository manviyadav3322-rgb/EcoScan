import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  text: string;
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    text: "Welcome to EcoScan. I'm your personal sustainability concierge. I've analyzed your wardrobe — you have 6 garments with an average sustainability score of 66%. How can I help today?",
  },
];

const sampleResponses: Record<string, string> = {
  default:
    "Based on your wardrobe data, I'd suggest starting with your Synthetic Blouse — it accounts for 28% of your total footprint. A switch to organic silk could save 3.1 kg CO₂ annually.",
  polyester:
    "Polyester releases microplastics with every wash. Your Synthetic Blouse sheds approximately 700,000 fibers per cycle. I recommend our Organic Silk alternative — same drape, 72% less environmental impact.",
  sustainable:
    "Your top performers are the Organic Cotton Tee (95/100) and Vintage Denim Jacket (92/100). These represent the gold standard — high wear count, low impact materials, and excellent longevity.",
};

const StylistChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const lower = input.toLowerCase();
    let responseKey = "default";
    if (lower.includes("polyester") || lower.includes("synthetic")) responseKey = "polyester";
    if (lower.includes("sustainable") || lower.includes("best")) responseKey = "sustainable";

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: sampleResponses[responseKey] },
      ]);
    }, 800);

    setInput("");
  };

  return (
    <>
      {/* Floating trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-2xl bg-sage flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            style={{ boxShadow: "0 8px 32px -8px hsl(163 18% 58% / 0.4)" }}
          >
            <MessageCircle className="h-6 w-6 text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-6 bottom-6 top-6 w-[380px] z-50 bg-card rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-sage-light flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-sage" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-charcoal">EcoScan Stylist</h3>
                  <p className="text-[11px] text-muted-foreground">Personal Concierge</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="h-7 w-7 rounded-lg bg-sage-light flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="h-3.5 w-3.5 text-sage" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-sage text-primary-foreground rounded-br-md"
                        : "bg-secondary text-charcoal rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="px-5 py-4 border-t border-border">
              <div className="flex items-center gap-2 bg-secondary rounded-xl px-4 py-2.5">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about your wardrobe..."
                  className="flex-1 bg-transparent text-sm text-charcoal placeholder:text-muted-foreground outline-none"
                />
                <button
                  onClick={handleSend}
                  className="h-8 w-8 rounded-lg bg-sage flex items-center justify-center hover:bg-sage/90 transition-colors"
                >
                  <Send className="h-3.5 w-3.5 text-primary-foreground" />
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
