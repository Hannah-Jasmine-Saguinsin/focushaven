import { RoundedBox } from "@react-three/drei";

export default function Computer() {
  return (
    <group position={[0.1, 1.53, -1.5]}>
      {/* Monitor body */}
      <RoundedBox
        args={[1.55, 0.95, 0.14]}
        radius={0.06}
        position={[0, 0.78, 0]}
        castShadow
      >
        <meshStandardMaterial color="#615b51" />
      </RoundedBox>

      {/* Display */}
      <RoundedBox
        args={[1.42, 0.82, 0.025]}
        radius={0.03}
        position={[0, 0.78, 0.078]}
      >
        <meshStandardMaterial
          color="#343b39"
          emissive="#61736b"
          emissiveIntensity={0.15}
        />
      </RoundedBox>

      {/* Subtle code-like lines */}
      {Array.from({ length: 7 }, (_, i) => (
        <mesh
          key={i}
          position={[
            -0.25 + (i % 3) * 0.05,
            1.05 - i * 0.075,
            0.095,
          ]}
        >
          <planeGeometry
            args={[0.35 + (i % 4) * 0.12, 0.018]}
          />
          <meshBasicMaterial
            color={
              ["#e6cc8c", "#a7bca1", "#c2c7bb"][i % 3]
            }
          />
        </mesh>
      ))}

      {/* Monitor stand */}
      <RoundedBox
        args={[0.15, 0.4, 0.12]}
        radius={0.04}
        position={[0, 0.27, -0.02]}
      >
        <meshStandardMaterial color="#8c8170" />
      </RoundedBox>

      <RoundedBox
        args={[0.55, 0.07, 0.35]}
        radius={0.03}
        position={[0, 0.035, 0]}
      >
        <meshStandardMaterial color="#8c8170" />
      </RoundedBox>

      {/* Keyboard */}
      <RoundedBox
        args={[0.9, 0.07, 0.32]}
        radius={0.03}
        position={[0, 0.035, 0.48]}
        castShadow
      >
        <meshStandardMaterial color="#e7dcc7" />
      </RoundedBox>

      {/* Keyboard keys */}
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 12 }, (_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[
              -0.385 + col * 0.07,
              0.082,
              0.375 + row * 0.07,
            ]}
          >
            <boxGeometry args={[0.055, 0.02, 0.055]} />
            <meshStandardMaterial color="#faf0da" />
          </mesh>
        ))
      )}

      {/* Mouse */}
      <RoundedBox
        args={[0.19, 0.1, 0.29]}
        radius={0.045}
        position={[0.65, 0.05, 0.48]}
        castShadow
      >
        <meshStandardMaterial color="#eee1c8" />
      </RoundedBox>
    </group>
  );
}