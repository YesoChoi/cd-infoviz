import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Vector3 } from 'three'
import { Instance, Box } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import workerData from '@/utils/constant/worker-data.json'

const City = ({ position, totalWorkers, country, countries = [], workerType, viewport, onHover }) => {
  const { camera } = useThree()
  const [isHovered, setIsHovered] = useState(false)
  
  const time = useRef(0)
  const modelRefs = useRef([])
  const [visibleLayers, setVisibleLayers] = useState(0)
  
  // 선택된 country인지 확인
  const isSelected = countries.length > 0 && countries.includes(country.toLowerCase())
  
  // 모델 개수와 레이어 계산
  const { modelCount, totalLayers } = useMemo(() => {
    const count = Math.max(1, Math.ceil(totalWorkers / 3000))
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

  const handlePointerOver = (event) => {
    event.stopPropagation()
    setIsHovered(true)
    // worker-data에서 해당 도시의 데이터 찾기
    const cityData = workerData.find(data => 
      data["Country / Region"].toLowerCase() === country.toLowerCase() &&
      data["Total Workers"] === totalWorkers
    )
    
    if (cityData) {
      // 3D 좌표를 화면 좌표로 변환
      const vector = position.clone()
      vector.project(camera)
      
      // 화면 좌표를 픽셀 좌표로 변환
      const x = (vector.x + 1) * window.innerWidth / 2
      const y = (-vector.y + 1) * window.innerHeight / 2
      
      onHover({ data: cityData, position: { x, y } })
    }
  }

  const handlePointerOut = () => {
    setIsHovered(false)
    onHover(null)
  }

  // 색상 결정 로직
  const getBoxColor = () => {
    if (isSelected) return "#3B89DB"
    if (isHovered) return "#D9D9D9" // 호버 시 더 밝은 회색
    return "#BCBCBC" // 기본 회색
  }

  return (
    <group
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
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
        const z = 0.005 + (layer * layerHeight)
        
        return (
          <Box
            key={index}
            position={[x, y, z]}
            rotation={[Math.PI / 2, -Math.PI / 4, 0]}
            scale={baseScale}
            ref={ref => {
              if (ref) modelRefs.current[index] = ref
            }}
          >
            <meshStandardMaterial 
              attach="material" 
              color={getBoxColor()}
            />
          </Box>
        )
      })}
    </group>
  )
}

export default City