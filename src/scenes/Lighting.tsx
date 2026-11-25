export default function Lighting() {
  return (
    <>
      {/* Soft environmental light */}
      <ambientLight intensity={0.8} color="#fff4df" />

      {/* Natural sky and floor lighting */}
      <hemisphereLight
        args={["#fff8e8", "#c3a17b", 1.4]}
      />

      {/* Main sunlight */}
      <directionalLight
        position={[-6, 9, 5]}
        intensity={2.2}
        color="#fff1d2"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-normalBias={0.03}
      />

      {/* Gentle fill light */}
      <directionalLight
        position={[7, 4, -3]}
        intensity={0.5}
        color="#ffe5ba"
      />
    </>
  );
}