import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DigitalVault from "@/components/DigitalVault";
import CarbonDashboard from "@/components/CarbonDashboard";
import SmartRecommendations from "@/components/SmartRecommendations";
import StylistChat from "@/components/StylistChat";
import { Leaf } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        <HeroSection />

        <div id="vault">
          <DigitalVault />
        </div>

        <div id="impact">
          <CarbonDashboard />
        </div>

        <div id="picks">
          <SmartRecommendations />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-sage" />
            <span className="text-sm font-semibold text-charcoal">EcoScan</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Building a more sustainable relationship with fashion, one garment at a time.
          </p>
        </div>
      </footer>

      <StylistChat />
    </div>
  );
};

export default Index;
