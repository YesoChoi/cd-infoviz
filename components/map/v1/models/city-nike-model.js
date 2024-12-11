import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Vector3 } from 'three'
import { Instance, SpotLight } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

import NikeModel from './model'
import workerData from '@/utils/constant/worker-data.json'

const City = ({ position, totalWorkers, country, selectedCountry, workerType, viewport, onHover }) => {
  if (!workerType) return null;

  const { camera } = useThree()
  const [isHovered, setIsHovered] = useState(false)
  const time = useRef(0)
  const modelRefs = useRef([])
  const [visibleLayers, setVisibleLayers] = useState(0)
  const spotLightRef = useRef()
  
  const isSelected = selectedCountry === country
  
  const { modelCount, totalLayers } = useMemo(() => {
    const count = Math.max(1, Math.ceil(totalWorkers / 5000))
    const layers = Math.ceil(count / 1)
    return { modelCount: count, totalLayers: layers }
  }, [totalWorkers])

  useEffect(() => {
    setVisibleLayers(0)
    const interval = setInterval(() => {
      setVisibleLayers(prev => {
        if (prev < totalLayers) return prev + 1
        clearInterval(interval)
        return prev
      })
    }, 60)

    return () => clearInterval(interval)
  }, [workerType, totalLayers])

  const baseScale = useMemo(() => {
    const baseSize = 0.005
    const viewportFactor = Math.min(viewport.width, viewport.height)
    return baseSize * viewportFactor
  }, [viewport])

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

  const handlePointerOver = (event) => {
    event.stopPropagation()
    setIsHovered(true)
    
    const cityData = workerData.find(data => 
      data["Country / Region"].toLowerCase() === country.toLowerCase() &&
      data["Total Workers"] === totalWorkers
    )
    
    if (cityData) {
      const vector = position.clone()
      vector.project(camera)
      
      const x = (vector.x + 1) * window.innerWidth / 2
      const y = (-vector.y + 1) * window.innerHeight / 2
      
      onHover({ data: cityData, position: { x, y } })
    }
  }

  const handlePointerOut = () => {
    setIsHovered(false)
    onHover(null)
  }

  return (
    <group
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
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
            isHovered={isHovered}
          />
        )
      })}
    </group>
  )
}

export default City