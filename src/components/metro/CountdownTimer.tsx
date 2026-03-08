import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  seconds: number;
  onExpire: () => void;
  label?: string;
}

export function CountdownTimer({ seconds, onExpire, label }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) {
      onExpire();
      return;
    }
    const timer = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(timer);
  }, [remaining, onExpire]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const isLow = remaining < 30;

  return (
    <div className={`flex items-center gap-2 text-sm lg:text-base ${isLow ? 'text-destructive' : 'text-muted-foreground'}`}>
      <Clock className="w-4 h-4" />
      {label && <span>{label}</span>}
      <span className="font-mono font-semibold">
        {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </span>
    </div>
  );
}
