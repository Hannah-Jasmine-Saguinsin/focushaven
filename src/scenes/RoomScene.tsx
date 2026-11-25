import { Canvas } from "@react-three/fiber";

import {
  OrbitControls,
  ContactShadows,
} from "@react-three/drei";

import Room from "./Room";
import Lighting from "./Lighting";

export default function RoomScene() {
  return (
    <Canvas
      shadows
      orthographic
      dpr={[1, 1.5]}
      frameloop="demand"
      camera={{
        position: [8, 6, 10],
        zoom: 65,
        near: 0.1,
        far: 100,
      }}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      <Lighting />

      <Room />

      <ContactShadows
        position={[0, -0.31, 0]}
        opacity={0.35}
        scale={12}
        blur={2.5}
        far={5}
        resolution={512}
        frames={1}
        color="#826345"
      />

      <OrbitControls
        makeDefault
        target={[0, 1.45, 0]}
        enablePan={false}
        enableZoom
        enableDamping
        dampingFactor={0.08}
        minZoom={40}
        maxZoom={100}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.3}
        minAzimuthAngle={-0.1}
        maxAzimuthAngle={Math.PI / 2}
      />
    </Canvas>
  );
}