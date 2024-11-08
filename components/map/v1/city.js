import React, {  useMemo } from 'react'
import {  Vector3,  } from 'three'

import { Model } from './model'



const City = ({ position, totalWorkers }) => {
    const workerDots = useMemo(() => {
      const dots = []
      const radius = 0.008
      const workerCount = Math.ceil(totalWorkers / 500)
      const dotsPerLayer = 4
      const layerHeight = 0.004
  
      // 총 층수 계산
      const totalLayers = Math.ceil(workerCount / dotsPerLayer)
      // 중간 층 계산 (0을 중심으로 위아래로 퍼지도록)
      const middleLayer = Math.floor(totalLayers / 2)
  
      for (let i = 0; i < workerCount; i++) {
        const layer = Math.floor(i / dotsPerLayer)
        const indexInLayer = i % dotsPerLayer
  
        const angleStep = (2 * Math.PI) / dotsPerLayer
        const angle = indexInLayer * angleStep + (layer * Math.PI / dotsPerLayer)
        
        const x = position.x + radius * Math.cos(angle)
        const y = position.y + radius * Math.sin(angle)
        
        // z축 위치를 중심을 기준으로 양방향으로 계산
        const zOffset = (layer - middleLayer) * layerHeight
        const z = 0.001 + zOffset
        
        dots.push(new Vector3(x, y, z))
      }
      return dots
    }, [position, totalWorkers])
  
    return (
      <>
        {workerDots.map((pos, index) => (
          <mesh key={index} position={pos}>
            <sphereGeometry args={[0.003, 16, 16]} />
            <meshStandardMaterial 
              color="#fefce7"
              metalness={0.8}
              roughness={0.2}
            />
                <Model />
          </mesh>
        ))}
    
      </>
    )
  }

  
  export default City;