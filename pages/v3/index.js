import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Globe from '../../components/v3/globe'

const GlobePage = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Suspense fallback={null}>
          <Globe />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default GlobePage

