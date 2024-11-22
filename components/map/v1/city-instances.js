import React, { useMemo, useRef } from 'react'
import { Vector3 } from 'three'
import { Instance, Instances } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { NikeModel } from './model'

const City = ({ position, totalWorkers, country, countries = [], workerType }) => {
  if (!workerType) return null;

  const time = useRef(0)
  const instances = useRef([])

  // model 크기 변화 애니메이션
  useFrame((state, delta) => {
    if (countries.length > 0 && countries.includes(country.toLowerCase())) {
      time.current += delta
      const scale = 1 + Math.sin(time.current * 3) * 0.3
      
      instances.current.forEach(instance => {
        if (instance) {
          instance.scale.set(scale, scale, scale)
        }
      })
    } else {
      instances.current.forEach(instance => {
        if (instance) {
          instance.scale.set(1, 1, 1)
        }
      })
      time.current = 0
    }
  })

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

  const isActive = countries.length === 0 || countries.includes(country.toLowerCase())

  return (
    <>
      <Instances range={workerDots.length} limit={1000}>
        <sphereGeometry args={[0.003, 16, 16]} />
        <meshStandardMaterial 
          color={isActive ? "#3B89DB" : "#BCBCBC"}
          metalness={isActive ? 0.8 : 0.3}
          roughness={isActive ? 0.2 : 0.7}
          // opacity={isActive ? 1 : 0.7}
          transparent={true}
        />
        {workerDots.map((pos, index) => (
          <Instance 
            key={index} 
            position={pos}
            ref={ref => {
              if (ref) instances.current[index] = ref
            }}
          />
        ))}
      </Instances>
    </>
  )
}

export default City