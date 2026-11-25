import { useEffect } from "react";
import { useTimerStore } from "../stores/timerStore";

export function useTimerEngine() {
  const running = useTimerStore(
    (state) => state.running
  );

  const tick = useTimerStore(
    (state) => state.tick
  );

  useEffect(() => {
    if (!running) return;

    tick();

    const interval = window.setInterval(
      tick,
      250
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [running, tick]);
}