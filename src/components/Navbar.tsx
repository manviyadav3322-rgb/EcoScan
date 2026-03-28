import { motion } from "framer-motion";
import { Cpu, Zap, Shield, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40 border-b border-border"
      style={{ background: "hsl(var(--background) / 0.8)", backdropFilter: "blur(20px)" }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(var(--neon-blue) / 0.2), hsl(var(--neon-purple) / 0.2))", border: "1px solid hsl(var(--neon-blue) / 0.3)" }}>
            <Cpu className="h-4 w-4 text-primary" />
          </div>
          <span className="text-lg font-semibold tracking-tight neon-text">EcoScan</span>
          <span className="mono-data text-[10px] text-muted-foreground ml-1">v3.2</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#vault" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <Shield className="h-3 w-3" /> Vault
          </a>
          <a href="#patterns" className="hover:text-primary transition-colors">Patterns</a>
          <a href="#impact" className="hover:text-primary transition-colors">Impact</a>
          <a href="#picks" className="hover:text-primary transition-colors">Picks</a>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="h-9 px-3 rounded-lg flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-all border border-border hover:border-primary/30"
          >
            {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            <span className="mono-data hidden sm:inline">
              {theme === "dark" ? "LIGHT_MODE" : "DARK_MODE"}
            </span>
          </button>

          <button className="cyber-btn text-xs py-2 px-4">
            <Zap className="h-3.5 w-3.5" />
            Initialize
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
