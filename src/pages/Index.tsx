import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DigitalVault from "@/components/DigitalVault";
import PatternLibrary from "@/components/PatternLibrary";
import CarbonDashboard from "@/components/CarbonDashboard";
import SmartRecommendations from "@/components/SmartRecommendations";
import StylistChat from "@/components/StylistChat";
import { Cpu, Activity } from "lucide-react";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background scanline-overlay">
        <Navbar />

        <main className="pt-16">
          <HeroSection />

          <div id="vault">
            <DigitalVault />
          </div>

          <div id="patterns">
            <PatternLibrary />
          </div>

          <div id="impact">
            <CarbonDashboard />
          </div>

          <div id="picks">
            <SmartRecommendations />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-10 px-6" style={{ background: "hsl(var(--surface))" }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Cpu className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold neon-text">EcoScan</span>
              <span className="mono-data text-[10px] text-muted-foreground">v3.2.1</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-3 w-3 text-accent" />
              <p className="mono-data text-[10px] text-muted-foreground">
                Neural engine active • All systems nominal
              </p>
            </div>
          </div>
        </footer>

        <StylistChat />
      </div>
    </ThemeProvider>
  );
};

export default Index;
