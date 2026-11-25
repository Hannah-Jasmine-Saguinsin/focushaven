import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TimerMode =
  | "focus"
  | "shortBreak"
  | "longBreak";

interface Session {
  id: string;
  mode: TimerMode;
  duration: number;
  completedAt: string;
}

interface TimerState {
  mode: TimerMode;
  durations: Record<TimerMode, number>;
  remaining: number;
  running: boolean;
  endTime: number | null;
  sessions: Session[];

  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
  setMode: (mode: TimerMode) => void;
  setDuration: (
    mode: TimerMode,
    minutes: number
  ) => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      mode: "focus",

      durations: {
        focus: 25,
        shortBreak: 5,
        longBreak: 15,
      },

      remaining: 25 * 60,
      running: false,
      endTime: null,
      sessions: [],

      start: () => {
        const state = get();

        if (state.running || state.remaining <= 0) return;

        set({
          running: true,
          endTime:
            Date.now() + state.remaining * 1000,
        });
      },

      pause: () => {
        get().tick();

        set({
          running: false,
          endTime: null,
        });
      },

      reset: () => {
        const { mode, durations } = get();

        set({
          remaining: durations[mode] * 60,
          running: false,
          endTime: null,
        });
      },

      setMode: (mode) => {
        set({
          mode,
          remaining: get().durations[mode] * 60,
          running: false,
          endTime: null,
        });
      },

      setDuration: (mode, minutes) => {
        if (!Number.isFinite(minutes)) return;

        const value = Math.min(
          120,
          Math.max(1, Math.round(minutes))
        );

        const state = get();

        set({
          durations: {
            ...state.durations,
            [mode]: value,
          },

          ...(state.mode === mode
            ? {
                remaining: value * 60,
                running: false,
                endTime: null,
              }
            : {}),
        });
      },

      tick: () => {
        const state = get();

        if (!state.running || state.endTime === null) {
          return;
        }

        const remaining = Math.max(
          0,
          Math.ceil(
            (state.endTime - Date.now()) / 1000
          )
        );

        if (remaining === 0) {
          const session: Session = {
            id: crypto.randomUUID(),
            mode: state.mode,
            duration: state.durations[state.mode],
            completedAt: new Date(
              state.endTime
            ).toISOString(),
          };

          set({
            remaining: 0,
            running: false,
            endTime: null,
            sessions: [...state.sessions, session],
          });

          return;
        }

        if (remaining !== state.remaining) {
          set({ remaining });
        }
      },
    }),

    {
      name: "focushaven-timer",
    }
  )
);