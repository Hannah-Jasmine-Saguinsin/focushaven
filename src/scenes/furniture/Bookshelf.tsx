import { RoundedBox } from "@react-three/drei";
import { useRoomStore } from "../../stores/roomStore";

export default function Bookshelf() {
  const color = useRoomStore(
    (state) => state.furnitureColor
  );

  return (
    <group position={[1.95, 0, -1.65]}>
      {/* Side panels */}
      {[-0.36, 0.36].map((x) => (
        <RoundedBox
          key={x}
          args={[0.12, 2.8, 0.65]}
          radius={0.05}
          position={[x, 1.4, 0]}
          castShadow
        >
          <meshStandardMaterial color={color} />
        </RoundedBox>
      ))}

      {/* Back panel */}
      <RoundedBox
        args={[0.8, 2.8, 0.1]}
        radius={0.04}
        position={[0, 1.4, -0.29]}
      >
        <meshStandardMaterial color={color} />
      </RoundedBox>

      {/* Shelves */}
      {[0.08, 0.75, 1.4, 2.05, 2.72].map((y) => (
        <RoundedBox
          key={y}
          args={[0.8, 0.12, 0.65]}
          radius={0.04}
          position={[0, y, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={color} />
        </RoundedBox>
      ))}

      {/* Small collection of books */}
      {["#e8d6ae", "#b5b99c", "#e9bc83"].map(
        (bookColor, i) => (
          <RoundedBox
            key={i}
            args={[0.12, 0.4 + i * 0.03, 0.32]}
            radius={0.02}
            position={[
              -0.22 + i * 0.15,
              1.66 + i * 0.015,
              0,
            ]}
          >
            <meshStandardMaterial color={bookColor} />
          </RoundedBox>
        )
      )}
    </group>
  );
}