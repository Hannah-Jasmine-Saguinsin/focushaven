import { useLayoutEffect, useRef, type ComponentRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
} from "@react-three/drei";
import { Box3, OrthographicCamera, Sphere, Vector3, type Group } from "three";

import Room from "./Room";
import Lighting from "./Lighting";

const DEFAULT_ZOOM = 85;

function RoomView() {
  const room = useRef<Group>(null);
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const bounds = useRef<Sphere>(null);
  const camera = useThree((state) => state.camera);
  const { width, height } = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);

  useLayoutEffect(() => {
    if (
      !(camera instanceof OrthographicCamera) ||
      !room.current ||
      !controls.current ||
      width <= 0 ||
      height <= 0
    ) return;

    if (!bounds.current) {
      bounds.current = new Box3()
        .setFromObject(room.current)
        .getBoundingSphere(new Sphere());
      const center = bounds.current.center;
      camera.position.add(center.clone().sub(new Vector3(0, 1.6, 0)));
      controls.current.target.copy(center);
      controls.current.update();
    }

    // Fit the room at the default zoom in either orientation, with room to orbit.
    const scale = (bounds.current.radius * 1.1 * DEFAULT_ZOOM) / Math.min(width, height);
    camera.right = width * scale;
    camera.left = -camera.right;
    camera.top = height * scale;
    camera.bottom = -camera.top;
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, height, invalidate, width]);

  return (
    <>
      <Lighting />

      <group ref={room}>
        <Room />
      </group>

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

      <OrbitControls
        ref={controls}
        makeDefault
        enablePan={false}
        enableZoom
        enableDamping
        dampingFactor={0.08}
        minZoom={35}
        maxZoom={120}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.3}
        minAzimuthAngle={0}
        maxAzimuthAngle={Math.PI / 2}
      />
    </>
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
        manual: true,
        position: [8, 6.5, 8],
        zoom: DEFAULT_ZOOM,
        near: 0.1,
        far: 100,
      }}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      <RoomView />
    </Canvas>
  );
}
