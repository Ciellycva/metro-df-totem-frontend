import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface AutoResetSessionProps {
  seconds: number;
  redirectTo?: string;
}

export function AutoResetSession({ seconds, redirectTo = "/kiosk/idle" }: AutoResetSessionProps) {
  const navigate = useNavigate();

  const reset = useCallback(() => {
    navigate(redirectTo);
  }, [navigate, redirectTo]);

  useEffect(() => {
    const timer = setTimeout(reset, seconds * 1000);
    return () => clearTimeout(timer);
  }, [seconds, reset]);

  return null;
}
