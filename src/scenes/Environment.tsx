import { Canvas } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import Lighting from "./Lighting";

function Architecture() {
  return (
    <group>
      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />

        <meshStandardMaterial
          color="#e9d4b5"
          roughness={0.9}
        />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 5, -9]} receiveShadow>
        <planeGeometry args={[100, 30]} />

        <meshStandardMaterial
          color="#fff1d5"
          roughness={1}
        />
      </mesh>

      {/* Left architectural feature */}
      <RoundedBox
        args={[5, 11, 0.5]}
        radius={0.24}
        smoothness={4}
        position={[-7, 2, -6]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#f8e3a5"
          roughness={0.85}
        />
      </RoundedBox>

      {/* Right architectural feature */}
      <RoundedBox
        args={[4, 12, 0.5]}
        radius={0.24}
        smoothness={4}
        position={[9, 3, -7]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#f5e4c7"
          roughness={0.85}
        />
      </RoundedBox>
    </group>
  );
}

export default function Environment() {
  return (
    <div className="environment">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [0, 4, 15],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
        frameloop="demand"
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#fff1d5"]} />

        <fog
          attach="fog"
          args={["#fff1d5", 22, 65]}
        />

        <Lighting />
        <Architecture />
      </Canvas>
    </div>
  );
}