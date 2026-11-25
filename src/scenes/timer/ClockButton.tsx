import { useState } from "react";
import { RoundedBox, Text } from "@react-three/drei";

interface ClockButtonProps {
  label: string;
  position: [number, number, number];
  color: string;
  onClick: () => void;
}

export default function ClockButton({
  label,
  position,
  color,
  onClick,
}: ClockButtonProps) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={position}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        setPressed(false);
        document.body.style.cursor = "default";
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
        setPressed(true);
      }}
      onPointerUp={() => setPressed(false)}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      <group position={[0, 0, pressed ? -0.05 : 0]}>
        <RoundedBox
          args={[0.95, 0.36, 0.18]}
          radius={0.08}
          smoothness={4}
          castShadow
        >
          <meshStandardMaterial
            color={color}
            roughness={0.65}
            emissive={color}
            emissiveIntensity={hovered ? 0.1 : 0}
          />
        </RoundedBox>

        <Text
          position={[0, 0, 0.1]}
          fontSize={0.105}
          color="#624832"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </group>
  );
}