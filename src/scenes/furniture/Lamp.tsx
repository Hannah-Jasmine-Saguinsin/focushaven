import { useRoomStore } from "../../stores/roomStore";

export default function Lamp() {
  const lampOn = useRoomStore((state) => state.lampOn);

  const toggleLamp = useRoomStore(
    (state) => state.toggleLamp
  );

  return (
    <group
      position={[-0.85, 1.53, -1.5]}
      onClick={(event) => {
        event.stopPropagation();
        toggleLamp();
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      {/* Lamp base */}
      <mesh position={[0, 0.04, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.2, 0.08, 32]} />
        <meshStandardMaterial color="#71695c" />
      </mesh>

      {/* Lamp pole */}
      <mesh position={[0, 0.33, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.6, 24]} />
        <meshStandardMaterial color="#71695c" />
      </mesh>

      {/* Lamp shade */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.26, 0.35, 32]} />
        <meshStandardMaterial
          color="#f8dfa0"
          emissive="#ffc66d"
          emissiveIntensity={lampOn ? 0.35 : 0}
          roughness={0.8}
        />
      </mesh>

      {/* Functional lighting */}
      {lampOn && (
        <pointLight
          position={[0, 0.5, 0]}
          color="#ffd48c"
          intensity={1.8}
          distance={3}
          decay={2}
        />
      )}
    </group>
  );
}