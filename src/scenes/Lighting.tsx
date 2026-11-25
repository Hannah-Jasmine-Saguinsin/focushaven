export default function Lighting() {
  return (
    <>
      <ambientLight
        intensity={1.1}
        color="#fff5e5"
      />

      <hemisphereLight
        args={["#fff9ee", "#c9a982", 1.5]}
      />

      <directionalLight
        position={[-5, 9, 7]}
        intensity={1.8}
        color="#fff2d8"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-normalBias={0.025}
        shadow-radius={4}
      />

      <directionalLight
        position={[6, 4, 5]}
        intensity={0.7}
        color="#fff5e4"
      />
    </>
  );
}