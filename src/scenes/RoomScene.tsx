import { useLayoutEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
} from "@react-three/drei";
import { OrthographicCamera } from "three";

import Room from "./Room";
import Lighting from "./Lighting";

function AdaptiveCamera() {
  const { camera, size, invalidate } = useThree();

  useLayoutEffect(() => {
    if (camera instanceof OrthographicCamera) {
      camera.zoom = Math.min(
        size.width / 8.8,
        size.height / 8.8
      );

      camera.updateProjectionMatrix();
      invalidate();
    }
  }, [camera, size.width, size.height, invalidate]);

  return null;
}

function RoomControls() {
  const { size } = useThree();

  const safeZoom = Math.min(
    size.width / 8.8,
    size.height / 8.8
  );

  return (
    <OrbitControls
      makeDefault
      target={[0, 1.6, 0]}
      enableRotate
      enableZoom
      enableDamping
      enablePan={false}
      dampingFactor={0.08}
      rotateSpeed={0.6}
      zoomSpeed={0.5}
      minZoom={safeZoom * 0.65}
      maxZoom={safeZoom}
      minPolarAngle={0.2}
      maxPolarAngle={Math.PI / 2}
    />
  );
}

export default function RoomScene() {
  return (
    <Canvas
      shadows
      orthographic
      dpr={[1, 1.5]}
      frameloop="demand"
      camera={{
        position: [8, 6.5, 8],
        near: 0.1,
        far: 100,
      }}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      <AdaptiveCamera />

      <Lighting />

      <Room />

      <ContactShadows
        position={[0, -0.32, 0]}
        opacity={0.25}
        scale={12}
        blur={3.5}
        far={5}
        resolution={512}
        frames={1}
        color="#826345"
      />

      <RoomControls />
    </Canvas>
  );
}