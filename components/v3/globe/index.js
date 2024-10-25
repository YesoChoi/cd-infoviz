import React, { useRef } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { OrbitControls } from '@react-three/drei'
import { MapContainer } from './styles'

const Map = ({ mapUrl }) => {
  const mesh = useRef()
  const texture = useLoader(TextureLoader, mapUrl)

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[16, 9, 0.1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

const MapScene = ({ mapUrl }) => {
  return (
    <MapContainer>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Map mapUrl={mapUrl} />
        <OrbitControls />
      </Canvas>
    </MapContainer>
  )
}

export default MapScene
