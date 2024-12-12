import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Vector3 } from 'three'
import { Instance } from '@react-three/drei'
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
  const initialViewportSize = useRef(null)
  
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

  useEffect(() => {
    if (!initialViewportSize.current) {
      initialViewportSize.current = Math.min(viewport.width, viewport.height)
    }
  }, [])

  const baseScale = useMemo(() => {
    if (!initialViewportSize.current) return 0.005
    const baseSize = 0.005
    const viewportFactor = Math.min(viewport.width, viewport.height)
    return baseSize * (initialViewportSize.current / viewportFactor)
  }, [viewport])

  const modelParameters = useMemo(() => {
    if (!initialViewportSize.current) return {
      radius: 0.008,
      layerHeight: 0.005,
      modelsPerLayer: 1
    }
    
    const viewportFactor = Math.min(viewport.width, viewport.height)
    const scaleFactor = initialViewportSize.current / viewportFactor
    
    return {
      radius: 0.008 * scaleFactor,
      layerHeight: 0.005 * scaleFactor,
      modelsPerLayer: 1
    }
  }, [viewport])

  const handlePointerOver = (event) => {
    event.stopPropagation()
    setIsHovered(true)
    
      // workerType에 따른 데이터 키 매핑
  const workerTypeMap = {
    total: "Total Workers",
    line: "Line Workers",
    female: "Female Workers",
    migrant: "Migrant Workers"
  };

    const cityData = workerData.find(data => 
      data["Country / Region"] === country &&
      data[workerTypeMap[workerType]] === totalWorkers
    )
    
    if (cityData) {
      const vector = position.clone()
      vector.project(camera)
      
      const x = (vector.x + 1) * window.innerWidth / 2
      const y = (-vector.y + 1) * window.innerHeight / 2
      
      onHover({ 
        data: cityData, 
        position: { x, y } 
      })
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
      {[...Array(modelCount)].map((_, index) => {
        const { radius, layerHeight, modelsPerLayer } = modelParameters
        const layer = Math.floor(index / modelsPerLayer)
        const indexInLayer = index % modelsPerLayer 

        if (layer >= visibleLayers) return null;
        
        const angleStep = (2 * Math.PI) / modelsPerLayer
        const angle = indexInLayer * angleStep + (layer * Math.PI / modelsPerLayer)
        
        const x = position.x + radius * Math.cos(angle)
        const y = position.y + radius * Math.sin(angle)
        const z = 0.008 + (layer * layerHeight)
        
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
            selectedCountry={selectedCountry}
          />
        )
      })}
    </group>
  )
}

export default City