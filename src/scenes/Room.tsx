import { RoundedBox } from "@react-three/drei";

import Desk from "./furniture/Desk";
import Chair from "./furniture/Chair";
import Computer from "./furniture/Computer";
import Bookshelf from "./furniture/Bookshelf";
import Lamp from "./furniture/Lamp";
import Window from "./furniture/Window";

import { useRoomStore } from "../stores/roomStore";

export default function Room() {
  const wallColor = useRoomStore(
    (state) => state.wallColor
  );

  const floorColor = useRoomStore(
    (state) => state.floorColor
  );

  return (
    <group>
      {/* Rounded miniature room platform */}
      <RoundedBox
        args={[5.2, 0.3, 4.6]}
        radius={0.14}
        smoothness={6}
        position={[0, -0.15, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={floorColor}
          roughness={0.85}
        />
      </RoundedBox>

      {/* Back wall */}
      <RoundedBox
        args={[5.2, 3.7, 0.22]}
        radius={0.1}
        smoothness={6}
        position={[0, 1.85, -2.2]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={wallColor}
          roughness={0.95}
        />
      </RoundedBox>

      {/* Left wall */}
      <RoundedBox
        args={[0.22, 3.7, 4.6]}
        radius={0.1}
        smoothness={6}
        position={[-2.5, 1.85, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={wallColor}
          roughness={0.95}
        />
      </RoundedBox>

      {/* Furniture */}
      <Desk />
      <Chair />
      <Computer />
      <Bookshelf />
      <Lamp />
      <Window />

      {/* Minimal wall decoration */}
      <RoundedBox
        args={[0.8, 0.65, 0.08]}
        radius={0.04}
        position={[0.5, 2.95, -2.04]}
      >
        <meshStandardMaterial color="#b99b76" />
      </RoundedBox>

      <mesh position={[0.5, 2.95, -1.99]}>
        <planeGeometry args={[0.68, 0.53]} />
        <meshStandardMaterial color="#fff4da" />
      </mesh>
    </group>
  );
}