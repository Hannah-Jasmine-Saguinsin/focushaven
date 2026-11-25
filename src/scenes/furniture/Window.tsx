import { RoundedBox } from "@react-three/drei";

export default function Window() {
  return (
    <group
      position={[-2.35, 2.35, -0.55]}
      rotation={[0, Math.PI / 2, 0]}
    >
      {/* Window frame */}
      <RoundedBox
        args={[1.75, 1.65, 0.15]}
        radius={0.07}
        castShadow
      >
        <meshStandardMaterial color="#766e60" />
      </RoundedBox>

      {/* Glass panels */}
      {[-0.4, 0.4].map((x) => (
        <RoundedBox
          key={x}
          args={[0.73, 1.42, 0.03]}
          radius={0.03}
          position={[x, 0, 0.09]}
        >
          <meshStandardMaterial
            color="#cbdde1"
            emissive="#dce9ed"
            emissiveIntensity={0.2}
            roughness={0.25}
          />
        </RoundedBox>
      ))}

      {/* Wooden window sill */}
      <RoundedBox
        args={[1.9, 0.13, 0.35]}
        radius={0.05}
        position={[0, -0.88, 0.1]}
        castShadow
      >
        <meshStandardMaterial color="#c3a17b" />
      </RoundedBox>
    </group>
  );
}