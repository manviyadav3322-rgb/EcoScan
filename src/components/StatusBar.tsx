import { Activity, Clock, Database, Wifi } from "lucide-react";
import { useEffect, useState } from "react";

const StatusBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/40 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Activity className="h-3 w-3 text-accent" />
          <span className="text-[10px] text-muted-foreground font-mono">LIVE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Database className="h-3 w-3 text-primary" />
          <span className="text-[10px] text-muted-foreground font-mono">8 ASSETS</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Wifi className="h-3 w-3 text-accent" />
          <span className="text-[10px] text-muted-foreground font-mono">CONNECTED</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <Clock className="h-3 w-3 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground font-mono">
          {time.toLocaleTimeString("en-US", { hour12: false })}
        </span>
      </div>
    </div>
  );
};

export default StatusBar;
