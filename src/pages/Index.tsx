import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import StatusBar from "@/components/StatusBar";
import WardrobeGrid from "@/components/WardrobeGrid";
import AITerminal from "@/components/AITerminal";
import ImpactRadar from "@/components/ImpactRadar";
import CarbonAlertBanner from "@/components/CarbonAlertBanner";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full scanline-overlay">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="flex items-center border-b border-border bg-card/30 backdrop-blur-sm">
            <SidebarTrigger className="ml-2 text-muted-foreground hover:text-foreground" />
            <div className="px-4 py-3">
              <h1 className="text-sm neon-text-blue">Project: Eco-Scan</h1>
              <p className="text-[10px] text-muted-foreground font-mono">
                AI Fashion Sustainability Command Center
              </p>
            </div>
          </header>

          <StatusBar />

          {/* Main content */}
          <main className="flex-1 p-6 space-y-6 overflow-y-auto">
            <CarbonAlertBanner />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Main grid area */}
              <div className="xl:col-span-2">
                <WardrobeGrid />
              </div>

              {/* Right panel */}
              <div className="space-y-6">
                <ImpactRadar />
                <div className="h-[350px]">
                  <AITerminal />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
