import React from 'react'
import * as THREE from 'three'

const BackgroundColor = () => {
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    varying vec2 vUv;
    void main() {
      vec3 topColor = vec3(0.11, 0.11, 0.12); // #1C1C1E
      vec3 bottomColor = vec3(1.0, 1.0, 0.8); // 연한 노란색
      
      // gradient 위치 조정
      float gradientPosition = smoothstep(0.1, 0.4, vUv.y); // 예: 30%~70% 위치에서 그라데이션
      vec3 finalColor = mix(bottomColor, topColor, gradientPosition);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `

  return (
    <mesh scale={100}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        side={THREE.BackSide}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

export default BackgroundColor