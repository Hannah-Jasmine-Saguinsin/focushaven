import { RoundedBox, Text, Html } from "@react-three/drei";

import ClockButton from "./ClockButton";
import { useTimerStore } from "../../stores/timerStore";

const modeLabels = {
  focus: "FOCUS",
  shortBreak: "SHORT BREAK",
  longBreak: "LONG BREAK",
};

export default function Clock() {
  const remaining = useTimerStore(
    (state) => state.remaining
  );

  const running = useTimerStore(
    (state) => state.running
  );

  const mode = useTimerStore(
    (state) => state.mode
  );

  const start = useTimerStore(
    (state) => state.start
  );

  const pause = useTimerStore(
    (state) => state.pause
  );

  const reset = useTimerStore(
    (state) => state.reset
  );

  const minutes = Math.floor(remaining / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (remaining % 60)
    .toString()
    .padStart(2, "0");

  return (
    <group position={[0, 1.3, 0]}>

      {/* Main clock body */}

      <RoundedBox
        args={[3.8, 2.5, 0.95]}
        radius={0.25}
        smoothness={6}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#f2cd83"
          roughness={0.65}
        />
      </RoundedBox>

      {/* Front cream panel */}

      <RoundedBox
        args={[3.5, 2.2, 0.15]}
        radius={0.2}
        position={[0, 0, 0.48]}
        castShadow
      >
        <meshStandardMaterial
          color="#fff0cb"
          roughness={0.75}
        />
      </RoundedBox>

      {/* Display frame */}

      <RoundedBox
        args={[3.05, 1.2, 0.12]}
        radius={0.15}
        position={[0, 0.25, 0.57]}
      >
        <meshStandardMaterial
          color="#a78a62"
          roughness={0.8}
        />
      </RoundedBox>

      {/* Dark digital screen */}

      <RoundedBox
        args={[2.85, 1.02, 0.08]}
        radius={0.12}
        position={[0, 0.25, 0.64]}
      >
        <meshStandardMaterial
          color="#39382e"
          roughness={0.55}
        />
      </RoundedBox>

      {/* Functional countdown */}

      <Html
        transform
        occlude
        position={[0, 0.25, 0.69]}
        distanceFactor={3}
        pointerEvents="none"
        style={{ pointerEvents: "none" }}
        >
        <div className="clock-display">
          <span className="clock-mode">
            {modeLabels[mode]}
          </span>

          <span className="clock-digits">
            {minutes}:{seconds}
          </span>

          <span className="clock-status">
            {remaining === 0
              ? "COMPLETE"
              : running
                ? "IN SESSION"
                : "READY"}
          </span>
        </div>
      </Html>

      {/* Physical controls */}

      <ClockButton
        label={running ? "PAUSE" : "START"}
        position={[-0.65, -0.65, 0.65]}
        color="#f2cd83"
        onClick={running ? pause : start}
      />

      <ClockButton
        label="RESET"
        position={[0.65, -0.65, 0.65]}
        color="#e9d4b5"
        onClick={reset}
      />

      {/* Small brand marking */}

      <Text
        position={[0, 0.98, 0.57]}
        fontSize={0.11}
        color="#94734e"
        anchorX="center"
      >
        F O C U S H A V E N
      </Text>

      {/* Clock feet */}

      {[-1.2, 1.2].map((x) => (
        <RoundedBox
          key={x}
          args={[0.55, 0.2, 0.7]}
          radius={0.07}
          position={[x, -1.2, 0]}
          castShadow
        >
          <meshStandardMaterial color="#b99b76" />
        </RoundedBox>
      ))}

    </group>
  );
}