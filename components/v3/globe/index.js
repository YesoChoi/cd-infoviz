import React, { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { OrbitControls } from '@react-three/drei'

const Globe = () => {
  const meshRef = useRef()
  const diffuseMap = useLoader(TextureLoader, '/texture/usa_diffuse.jpg')
  const heightMap = useLoader(TextureLoader, '/texture/usa_height.jpg')

  const vertexShader = `
    varying vec2 vUv;
    uniform sampler2D heightMap;
    void main() {
      vUv = uv;
      vec4 heightColor = texture2D(heightMap, uv);
      vec3 newPosition = position + normal * heightColor.r * 0.5;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `

  const fragmentShader = `
    uniform sampler2D diffuseMap;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(diffuseMap, vUv);
      gl_FragColor = color;
    }
  `

  const uniforms = useMemo(() => ({
    diffuseMap: { value: diffuseMap },
    heightMap: { value: heightMap }
  }), [diffuseMap, heightMap])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
  })

  return (
    <>
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={meshRef}>
        <planeGeometry args={[10, 5, 200, 200]} /> {/* 더 많은 세그먼트 추가 */}
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
    </>
  )
}

export default Globe
