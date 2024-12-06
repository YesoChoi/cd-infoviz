import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Vector3 } from 'three'
import { Instance, SpotLight } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import NikeModel from './model'

const City = ({ position, totalWorkers, country, countries = [], workerType, viewport }) => {
  if (!workerType) return null;

  const time = useRef(0)
  const modelRefs = useRef([])
  const [visibleLayers, setVisibleLayers] = useState(0)
  const spotLightRef = useRef()
  
  // 선택된 country인지 확인
  const isSelected = countries.length > 0 && countries.includes(country.toLowerCase())
  
  // 모델 개수와 레이어 계산
  const { modelCount, totalLayers } = useMemo(() => {
    const count = Math.max(1, Math.ceil(totalWorkers / 5000))
    const layers = Math.ceil(count / 1)
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
    if (isSelected) {
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
      {/* 선택된 country에만 스포트라이트 추가 */}
      {isSelected && (
        <SpotLight
          ref={spotLightRef}
          position={[position.x, position.y, position.z + 0.1]}
          intensity={10}
          angle={0.1}
          penumbra={0.1}
          distance={0.3}
          color="#ffffff"
          castShadow
          decay={2}
          power={20}
          target-position={[position.x, position.y, 0]}
        />
      )}

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
            modelIdx={index % 3 + 1}
            key={index}
            position={[x, y, z]}
            rotation={[Math.PI / 2, -Math.PI / 4, 0]}
            scale={baseScale}
            ref={ref => {
              if (ref) modelRefs.current[index] = ref
            }}
            isSelected={isSelected}
          />
        )
      })}
    </group>
  )
}

export default City