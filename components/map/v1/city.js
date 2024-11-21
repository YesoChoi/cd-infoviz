import React, { useMemo } from 'react'
import { Vector3 } from 'three'
import { Instance, Instances } from '@react-three/drei'
import { Model } from './model'

const City = ({ position, totalWorkers, country, activeCountries = [], workerType }) => {
  if (!workerType) return null;

  const workerDots = useMemo(() => {
    const dots = []
    const radius = 0.008
    const workerCount = Math.ceil(totalWorkers / 500)
    const dotsPerLayer = 4
    const layerHeight = 0.004

    const totalLayers = Math.ceil(workerCount / dotsPerLayer)
    const middleLayer = Math.floor(totalLayers / 2)

    for (let i = 0; i < workerCount; i++) {
      const layer = Math.floor(i / dotsPerLayer)
      const indexInLayer = i % dotsPerLayer

      const angleStep = (2 * Math.PI) / dotsPerLayer
      const angle = indexInLayer * angleStep + (layer * Math.PI / dotsPerLayer)
      
      const x = position.x + radius * Math.cos(angle)
      const y = position.y + radius * Math.sin(angle)
      
      const zOffset = (layer - middleLayer) * layerHeight
      const z = 0.001 + zOffset
      
      dots.push(new Vector3(x, y, z))
    }
    return dots
  }, [position, totalWorkers])

  const isActive = activeCountries.length === 0 || activeCountries.includes(country.toLowerCase())

  return (
    <>
      <Instances range={workerDots.length} limit={1000}>
        <sphereGeometry args={[0.003, 16, 16]} />
        <meshStandardMaterial 
          color={isActive ? "#fefce7" : "#4a4a4a"}
          metalness={isActive ? 0.8 : 0.3}
          roughness={isActive ? 0.2 : 0.7}
          opacity={isActive ? 1 : 0.7}
          transparent={true}
        />
        {workerDots.map((pos, index) => (
          <Instance key={index} position={pos} />
        ))}
      </Instances>
      
      {workerDots.map((pos, index) => (
        <Model key={index} position={pos} />
      ))}
    </>
  )
}

export default City