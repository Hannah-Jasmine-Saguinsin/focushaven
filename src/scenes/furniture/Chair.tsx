import { RoundedBox } from "@react-three/drei";
import { useRoomStore } from "../../stores/roomStore";

export default function Chair() {
  const color = useRoomStore(
    (state) => state.chairColor
  );

  return (
    <group
      position={[-0.1, 0, 0.25]}
      rotation={[0, -0.15, 0]}
    >
      {/* Seat cushion */}
      <RoundedBox
        args={[0.85, 0.18, 0.8]}
        radius={0.08}
        position={[0, 0.83, 0]}
        castShadow
      >
        <meshStandardMaterial
          color={color}
          roughness={0.95}
        />
      </RoundedBox>

      {/* Backrest */}
      <RoundedBox
        args={[0.85, 0.95, 0.18]}
        radius={0.08}
        position={[0, 1.35, 0.38]}
        rotation={[-0.1, 0, 0]}
        castShadow
      >
        <meshStandardMaterial
          color={color}
          roughness={0.95}
        />
      </RoundedBox>

      {/* Armrests */}
      {[-0.48, 0.48].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <RoundedBox
            args={[0.12, 0.12, 0.65]}
            radius={0.05}
            position={[0, 1.1, 0]}
            castShadow
          >
            <meshStandardMaterial color={color} />
          </RoundedBox>

          <mesh position={[0, 0.95, 0.2]}>
            <boxGeometry args={[0.08, 0.3, 0.08]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </group>
      ))}

      {/* Central support */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.12, 0.65, 24]} />
        <meshStandardMaterial color="#514d46" />
      </mesh>

      {/* Five-star base */}
      {Array.from({ length: 5 }, (_, index) => (
        <group
          key={index}
          rotation={[0, (index * Math.PI * 2) / 5, 0]}
        >
          <RoundedBox
            args={[0.1, 0.1, 0.52]}
            radius={0.04}
            position={[0, 0.15, 0.25]}
            castShadow
          >
            <meshStandardMaterial color="#514d46" />
          </RoundedBox>

          <mesh position={[0, 0.09, 0.49]} castShadow>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color="#45423d" />
          </mesh>
        </group>
      ))}
    </group>
  );
}