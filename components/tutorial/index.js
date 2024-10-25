import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, Color } from 'three';
import { Sphere, OrbitControls } from '@react-three/drei';
import { containerStyle } from './styles';

function EarthSphere() {
  const earthRef = useRef();
  const colorMap = useLoader(TextureLoader, '/texture/rocky_terrain_02_diff_4k.jpg');
  const displacementMap = useLoader(TextureLoader, '/texture/rocky_terrain_02_disp_4k.png');

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    earthRef.current.rotation.y = elapsedTime / 6;
  });

  return (
    <Sphere ref={earthRef} args={[1, 64, 64]}>
      <meshStandardMaterial 
        map={colorMap} 
        displacementMap={displacementMap}
        displacementScale={0.2} // 이 값을 조절하여 고도 효과의 강도를 변경할 수 있습니다
        emissive={new Color(0x555555)}
        emissiveIntensity={0.1}
      />
    </Sphere>
  );
}

export default function Earth() {
  return (
    <div style={containerStyle}>
      <Canvas>
        <Suspense fallback={null}>
          <EarthSphere />
          <OrbitControls enableZoom={true} />
        </Suspense>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
      </Canvas>
    </div>
  );
}
