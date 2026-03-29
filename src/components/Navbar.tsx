import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-sage flex items-center justify-center">
            <Leaf className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-charcoal">EcoScan</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#vault" className="hover:text-charcoal transition-colors">Vault</a>
          <a href="#impact" className="hover:text-charcoal transition-colors">Impact</a>
          <a href="#picks" className="hover:text-charcoal transition-colors">Picks</a>
        </div>

        <button className="luxury-btn text-sm py-2 px-5">
          Get Started
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
