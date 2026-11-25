import { RoundedBox } from "@react-three/drei";
import { useRoomStore } from "../../stores/roomStore";

export default function Desk() {
  const color = useRoomStore(
    (state) => state.furnitureColor
  );

  return (
    <group position={[0.2, 0, -1.25]}>
      {/* Desktop */}
      <RoundedBox
        args={[2.8, 0.16, 1.15]}
        radius={0.07}
        position={[0, 1.45, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={color}
          roughness={0.75}
        />
      </RoundedBox>

      {/* Desk side supports */}
      {[-1.23, 1.23].map((x) => (
        <RoundedBox
          key={x}
          args={[0.16, 1.4, 1.05]}
          radius={0.05}
          position={[x, 0.7, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={color} />
        </RoundedBox>
      ))}

      {/* Back support */}
      <RoundedBox
        args={[2.4, 0.3, 0.12]}
        radius={0.03}
        position={[0, 1.15, -0.45]}
        castShadow
      >
        <meshStandardMaterial color={color} />
      </RoundedBox>
    </group>
  );
}