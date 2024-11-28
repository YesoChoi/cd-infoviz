import React, { useMemo, useRef } from 'react'
import { Vector3 } from 'three'
import { Instance } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import NikeModel from './model'

const City = ({ position, totalWorkers, country, countries = [], workerType, viewport }) => {
  if (!workerType) return null;

  const time = useRef(0)
  const modelRefs = useRef([])

  // viewport 크기에 따른 기본 scale 계산
  const baseScale = useMemo(() => {
    const baseSize = 0.008
    const viewportFactor = Math.min(viewport.width, viewport.height)
    return baseSize * viewportFactor
  }, [viewport])

  // 크기 변화 애니메이션
  useFrame((state, delta) => {
    if (countries.length > 0 && countries.includes(country.toLowerCase())) {
      time.current += delta
      const scale = 1 + Math.sin(time.current * 3) * 0.125
      modelRefs.current.forEach(ref => {
        if (ref) {
          ref.scale.set(
            scale * baseScale, 
            scale * baseScale, 
            scale * baseScale
          )
        }
      })
    } else {
      modelRefs.current.forEach(ref => {
        if (ref) {
          ref.scale.set(baseScale, baseScale, baseScale)
        }
      })
      time.current = 0
    }
  })

  const modelCount = useMemo(() => {
    // 모든 worker type에 대해 5000명당 1개, 최소 1개 보장
    return Math.max(1, Math.ceil(totalWorkers / 5000))
  }, [totalWorkers])

  return (
    <group>
      {[...Array(modelCount)].map((_, index) => {
        const radius = 0.008  // 원형 배치의 반지름
        const modelsPerLayer = 1// 한 층당 모델 개수
        const layerHeight = 0.005

        const layer = Math.floor(index / modelsPerLayer) // 현재 층 번호
        const indexInLayer = index % modelsPerLayer 

        const angleStep = (2 * Math.PI) / modelsPerLayer
        const angle = indexInLayer * angleStep + (layer * Math.PI / modelsPerLayer)
        
        const x = position.x + radius * Math.cos(angle)
        const y = position.y + radius * Math.sin(angle)
        
        const totalLayers = Math.ceil(modelCount / modelsPerLayer)
        // const middleLayer = Math.floor(totalLayers / 2)
        // const zOffset = (layer - middleLayer) * layerHeight
        const zOffset = layer * layerHeight // 층별 z축 높이
        const z = 0.001 + zOffset // 최종 z축 위치
        
        return (
          <NikeModel
            key={index}
            position={[x, y, z]}
            rotation={[Math.PI / 2, -Math.PI / 4, 0]}
            scale={baseScale}
            ref={ref => {
              if (ref) modelRefs.current[index] = ref
            }}
          />
        )
      })}
    </group>
  )
}

export default City