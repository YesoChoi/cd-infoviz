import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Vector3 } from 'three'
import { Instances, Instance } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import workerData from '@/utils/constant/worker-data.json'

const City = ({ position, totalWorkers, country, countries = [], workerType, viewport, onHover }) => {
  const { camera } = useThree()
  const [isHovered, setIsHovered] = useState(false)
  const instances = useRef([])
  const [visibleLayers, setVisibleLayers] = useState(0)
  const time = useRef(0)
  
  const isSelected = countries.length > 0 && countries.includes(country.toLowerCase())
  
  const { modelCount, totalLayers } = useMemo(() => {
    const count = Math.max(1, Math.ceil(totalWorkers / 1000))
    const layers = Math.ceil(count / 1)
    return { modelCount: count, totalLayers: layers }
  }, [totalWorkers])

  const baseScale = useMemo(() => {
    const baseSize = 0.008
    const viewportFactor = Math.min(viewport.width, viewport.height)
    return 0.008 * viewportFactor
  }, [viewport])

  console.log(baseScale)

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



  useFrame((state, delta) => {
    if (isSelected) {
      time.current += delta
      const scale = 1 + Math.sin(time.current * 3) * 0.125
      instances.current.forEach(instance => {
        if (instance) {
          instance.scale.set(
            scale * baseScale,
            scale * baseScale,
            scale * baseScale
          )
        }
      })
    } else {
      instances.current.forEach(instance => {
        if (instance) {
          instance.scale.set(baseScale, baseScale, baseScale)
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

  const getBoxColor = () => {
    if (isSelected) return `hsl(220, 80%, 50%)`  // 더 밝은 하늘색
    if (isHovered) return`hsl(220, 80%, 50%)`  // 더
    return `hsl(220, 80%, 50%)`  // 더
  }

  
  return (
    <group
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <Instances range={modelCount} limit={1000}>
        <boxGeometry />
        <meshStandardMaterial 
          color={getBoxColor()}
          roughness={0.1}
          metalness={0.9}
        />
        {[...Array(modelCount)].map((_, index) => {
          const radius = 0.005
          const modelsPerLayer = 1
          const layerHeight = 0.005

          const layer = Math.floor(index / modelsPerLayer)
          const indexInLayer = index % modelsPerLayer 

          // if (layer >= visibleLayers) return null;
          
          const angleStep = (2 * Math.PI) / modelsPerLayer
          const angle = indexInLayer * angleStep + (layer * Math.PI / modelsPerLayer)
          
          const x = position.x + radius * Math.cos(angle)
          const y = position.y + radius * Math.sin(angle)
          const z = 0.005 + (layer * layerHeight)

          console.log(x, y, z);
          
          return (
            <Instance
              key={index}
              position={[x, y, z]}
              rotation={[Math.PI / 2, -Math.PI / 4, 0]}
              scale={baseScale}
              ref={ref => {
                if (ref) instances.current[index] = ref
              }}
            />
          )
        })}
      </Instances>
    </group>
  )
}

export default City