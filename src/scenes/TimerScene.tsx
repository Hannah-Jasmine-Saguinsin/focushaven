import { useLayoutEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";

import { OrthographicCamera } from "three";

import Clock from "./timer/Clock";
import Lighting from "./Lighting";

function AdaptiveCamera() {
  const { camera, size, invalidate } = useThree();

  useLayoutEffect(() => {
    if (camera instanceof OrthographicCamera) {
      camera.zoom = Math.min(
        size.width / 5.8,
        size.height / 5.8
      );

      camera.updateProjectionMatrix();
      invalidate();
    }
  }, [camera, size.width, size.height, invalidate]);

  return null;
}

export default function TimerScene() {
  return (
    <Canvas
      shadows
      orthographic
      dpr={[1, 1.5]}
      frameloop="demand"
      camera={{
        position: [3, 3, 10],
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

      <Clock />

      <ContactShadows
        position={[0, -0.03, 0]}
        opacity={0.25}
        scale={7}
        blur={3}
        far={4}
        resolution={256}
        frames={1}
        color="#826345"
      />

      <OrbitControls
        makeDefault
        target={[0, 1.3, 0]}
        enableRotate
        enableDamping
        enableZoom={false}
        enablePan={false}
        dampingFactor={0.08}
        rotateSpeed={0.6}
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}