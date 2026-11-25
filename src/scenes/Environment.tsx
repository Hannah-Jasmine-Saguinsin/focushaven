import { Canvas } from "@react-three/fiber";

function Architecture() {
  return (
    <group>
      {/* Seamless floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[200, 200]} />

        <meshStandardMaterial
          color="#ead6b2"
          roughness={1}
        />
      </mesh>
    </group>
  );
}

export default function Environment() {
  return (
    <div className="environment">
      <Canvas
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
        <color
          attach="background"
          args={["#fff3d6"]}
        />

        <fog
          attach="fog"
          args={["#fff3d6", 8, 38]}
        />

        <ambientLight
          intensity={1.5}
          color="#fff8e8"
        />

        <directionalLight
          position={[-6, 9, 5]}
          intensity={1.2}
          color="#fff1d2"
        />

        <Architecture />
      </Canvas>
    </div>
  );
}