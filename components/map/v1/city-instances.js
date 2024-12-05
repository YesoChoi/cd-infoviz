import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Vector3 } from 'three'
import { Instance, Instances } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

const City = ({ position, totalWorkers, country, countries = [], workerType }) => {
  if (!workerType) return null;

  const { camera } = useThree()
  const time = useRef(0)
  const instances = useRef([])
  const [visibleLayers, setVisibleLayers] = useState(0)

  const sphereSize = useMemo(() => {
    return 0.005 * (camera.position.z)
  }, [camera.position.z])

  useFrame((state, delta) => {
    if (countries.length > 0 && countries.includes(country.toLowerCase())) {
      time.current += delta
      const scale = 1 + Math.sin(time.current * 3) * 0.3
      
      instances.current.forEach(instance => {
        if (instance) {
          const baseScale = camera.position.z * 0.003
          instance.scale.set(
            baseScale * scale, 
            baseScale * scale, 
            baseScale * scale
          )
        }
      })
    } else {
      instances.current.forEach(instance => {
        if (instance) {
          const baseScale = camera.position.z * 0.003
          instance.scale.set(baseScale, baseScale, baseScale)
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

      // 원형 배치 계산
      const angleStep = (2 * Math.PI) / dotsPerLayer
      const angle = indexInLayer * angleStep + (layer * Math.PI / dotsPerLayer)
      
      // 기본 x, y 위치 (원형)
      const x = position.x + radius * Math.cos(angle)
      const y = position.y + radius * Math.sin(angle)
      const z = position.z + 0.01 + (layer * layerHeight)

      dots.push(new Vector3(x, y, z))
    }
    return dots
  }, [position, totalWorkers])

  useEffect(() => {
    setVisibleLayers(0)
    const interval = setInterval(() => {
      setVisibleLayers(prev => {
        if (prev < Math.ceil(totalWorkers / 500 / 4)) return prev + 1
        clearInterval(interval)
        return prev
      })
    }, 60) // 각 레이어가 나타나는 간격 (밀리초)

    return () => clearInterval(interval)
  }, [workerType, totalWorkers])

  const isActive = countries.length === 0 || countries.includes(country.toLowerCase())

  return (
    <Instances range={workerDots.length} limit={1000}>
      <sphereGeometry args={[sphereSize, 16, 16]} />
      <meshStandardMaterial 
        color={isActive ? "#3B89DB" : "#BCBCBC"}
        metalness={isActive ? 0.8 : 0.3}
        roughness={isActive ? 0.2 : 0.7}
        transparent={true}
        emissive={isActive ? "#3B89DB" : "#BCBCBC"}
        emissiveIntensity={0.5}
      />
      {workerDots.map((pos, index) => {
        const layer = Math.floor(index / 4)
        if (layer >= visibleLayers) return null
        return (
          <Instance 
            key={index} 
            position={pos}
            ref={ref => {
              if (ref) instances.current[index] = ref
            }}
          />
        )
      })}
    </Instances>
  )
}

export default City