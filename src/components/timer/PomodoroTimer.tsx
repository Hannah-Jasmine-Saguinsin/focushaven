import { useState } from "react";

import TimerScene from "../../scenes/TimerScene";

import {
  useTimerStore,
  type TimerMode,
} from "../../stores/timerStore";

import "./PomodoroTimer.css";

const modes: {
  label: string;
  value: TimerMode;
}[] = [
  { label: "Focus", value: "focus" },
  { label: "Short Break", value: "shortBreak" },
  { label: "Long Break", value: "longBreak" },
];

export default function PomodoroTimer() {
  const [showSettings, setShowSettings] =
    useState(false);

  const {
    mode,
    durations,
    running,
    remaining,
    sessions,
    setMode,
    setDuration,
    start,
    pause,
    reset,
  } = useTimerStore();

  const today = new Date().toDateString();

  const completedToday = sessions.filter(
    (session) =>
      session.mode === "focus" &&
      new Date(
        session.completedAt
      ).toDateString() === today
  ).length;

  return (
    <section
      className="pomodoro"
      aria-label="Pomodoro timer"
    >
      <div className="timer-heading">
        <h1>Time to focus.</h1>
        <p>One session at a time.</p>
      </div>

      {/* Timer modes */}

      <div className="timer-modes">
        {modes.map((item) => (
          <button
            key={item.value}
            className={
              mode === item.value
                ? "mode-button selected"
                : "mode-button"
            }
            aria-pressed={mode === item.value}
            onClick={() => setMode(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Actual 3D clock */}

      <div className="timer-canvas">
        <TimerScene />
      </div>

      {/* Accessible controls */}

      <div className="timer-controls">
        <button
          onClick={running ? pause : start}
          disabled={remaining === 0}
        >
          {running ? "Pause" : "Start"}
        </button>

        <button onClick={reset}>
          Reset
        </button>

        <button
          aria-expanded={showSettings}
          onClick={() =>
            setShowSettings(!showSettings)
          }
        >
          Customize
        </button>
      </div>

      {/* Custom durations */}

      {showSettings && (
        <div className="timer-settings">
          {modes.map((item) => (
            <label key={item.value}>
              <span>{item.label}</span>

              <input
                type="number"
                min={1}
                max={120}
                defaultValue={durations[item.value]}
                onBlur={(event) =>
                  setDuration(
                    item.value,
                    event.currentTarget.valueAsNumber
                  )
                }
              />

              <span>min</span>
            </label>
          ))}
        </div>
      )}

      {/* Session progress */}

      <div className="session-progress">
        <div className="session-blooms">
          {Array.from({ length: 4 }, (_, index) => (
            <img
              key={index}
              src={
                `${import.meta.env.BASE_URL}` +
                "branding/bloom.webp"
              }
              alt=""
              className={
                index < completedToday
                  ? "session-bloom completed"
                  : "session-bloom"
              }
            />
          ))}
        </div>

        <p>
          {completedToday} focus sessions today
        </p>
      </div>
    </section>
  );
}