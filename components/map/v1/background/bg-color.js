
import React from 'react'
import * as THREE from 'three'

const BackgroundColor = () => {
  return (
    <mesh scale={100}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial
        side={THREE.BackSide}
        color="#444466"
        emissive="#2233ff"
        emissiveIntensity={0.2}
        transparent
        opacity={1}
      />
    </mesh>
  )
}

export default BackgroundColor