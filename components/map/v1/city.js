import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Vector3 } from 'three'
import { Instance } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import NikeModel from './model'

const City = ({ position, totalWorkers, country, countries = [], workerType, viewport }) => {
  if (!workerType) return null;

  const time = useRef(0)
  const modelRefs = useRef([])
  const [visibleLayers, setVisibleLayers] = useState(0)
  
  // 모델 개수와 레이어 계산
  const { modelCount, totalLayers } = useMemo(() => {
    const count = Math.max(1, Math.ceil(totalWorkers / 5000))
    const layers = Math.ceil(count / 1) // modelsPerLayer가 1이므로
    return { modelCount: count, totalLayers: layers }
  }, [totalWorkers])

  // workerType이 변경될 때마다 애니메이션 재시작
  useEffect(() => {
    setVisibleLayers(0)
    const interval = setInterval(() => {
      setVisibleLayers(prev => {
        if (prev < totalLayers) return prev + 1
        clearInterval(interval)
        return prev
      })
    }, 60) // 각 레이어가 나타나는 간격 (밀리초)

    return () => clearInterval(interval)
  }, [workerType, totalLayers])

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

  return (
    <group>
      {[...Array(modelCount)].map((_, index) => {
        const radius = 0.008
        const modelsPerLayer = 1
        const layerHeight = 0.005

        const layer = Math.floor(index / modelsPerLayer)
        const indexInLayer = index % modelsPerLayer 

        // 현재 레이어가 visibleLayers보다 크면 렌더링하지 않음
        if (layer >= visibleLayers) return null;

        const angleStep = (2 * Math.PI) / modelsPerLayer
        const angle = indexInLayer * angleStep + (layer * Math.PI / modelsPerLayer)
        
        const x = position.x + radius * Math.cos(angle)
        const y = position.y + radius * Math.sin(angle)
        const z = 0.001 + (layer * layerHeight)
        
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