import { useTexture } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

export default function Background({ bgUrls, count = 100 }) {
  const { viewport } = useThree()
  const meshRefs = useRef([])
  const [textureIndices, setTextureIndices] = useState([])
  const columnPositions = useRef([])  // 각 column의 y 위치를 추적
  
  const textures = useTexture(bgUrls)
  const baseWidth = viewport.width / 2
  const gridSize = Math.sqrt(count)
  const spacing = viewport.width / 2
  
  // column 위치 초기화
  useEffect(() => {
    columnPositions.current = Array(gridSize).fill(0)
  }, [gridSize])
  
  // 애니메이션 속도 설정
  const speed = 0.00005
  
  // y축 애니메이션
  useFrame(() => {
    meshRefs.current.forEach((mesh, index) => {
      if (!mesh) return
      
      const columnIndex = Math.floor(index / gridSize)
      const direction = columnIndex % 2 === 0 ? 1 : -1  // 교차 방향
      
      // 현재 column의 y 위치 업데이트
      columnPositions.current[columnIndex] += speed * direction
      
      // 그리드 영역을 벗어났는지 체크
      const maxOffset = (spacing * gridSize) / 2
      if (Math.abs(columnPositions.current[columnIndex]) > maxOffset) {
        columnPositions.current[columnIndex] = -maxOffset * Math.sign(direction)
      }
      
      // mesh 위치 업데이트
      const rowIndex = index % gridSize
      mesh.position.y = columnPositions.current[columnIndex] + 
                       (rowIndex - gridSize/2 + 0.5) * spacing
    })
  })
  
  const getScaleForTexture = (textureIndex) => {
    const texture = Array.isArray(textures) ? textures[textureIndex] : textures
    if (!texture) return [baseWidth, baseWidth, 1]
    
    const imageAspect = texture.image.width / texture.image.height
    return [baseWidth, baseWidth / imageAspect, 1]
  }
  
  useEffect(() => {
    const gridSize = Math.sqrt(count)
    const grid = Array(gridSize).fill().map(() => Array(gridSize).fill(-1))
    
    const getValidTextureIndex = (row, col) => {
      const usedIndices = new Set()
      
      if (row > 0) usedIndices.add(grid[row-1][col])
      if (col > 0) usedIndices.add(grid[row][col-1])
      if (row > 0 && col > 0) usedIndices.add(grid[row-1][col-1])
      if (row > 0 && col < gridSize-1) usedIndices.add(grid[row-1][col+1])
      
      const availableIndices = Array.from({ length: bgUrls.length }, (_, i) => i)
        .filter(index => !usedIndices.has(index))
      
      return availableIndices[Math.floor(Math.random() * availableIndices.length)]
    }
    
    for(let i = 0; i < gridSize; i++) {
      for(let j = 0; j < gridSize; j++) {
        grid[i][j] = getValidTextureIndex(i, j)
      }
    }
    
    const indices = grid.flat()
    setTextureIndices(indices)
    
  }, [count, bgUrls.length])
  
  const matrices = useMemo(() => {
    if (textureIndices.length === 0) return []
    
    const temp = new THREE.Matrix4()
    const matrices = []
    let index = 0
    
    for(let i = 0; i < gridSize; i++) {
      for(let j = 0; j < gridSize; j++) {
        const position = new THREE.Vector3(
          (i - gridSize/2 + 0.5) * spacing,
          (j - gridSize/2 + 0.5) * spacing,
          -0.5
        )
        
        const textureIndex = textureIndices[index]
        const scale = getScaleForTexture(textureIndex)
        
        const matrix = temp.clone()
          .setPosition(position)
          .scale(new THREE.Vector3(...scale))
        
        matrices.push({
          matrix,
          textureIndex,
          columnIndex: i  // column 인덱스 추가
        })
        index++
      }
    }
    
    return matrices
  }, [viewport, count, textureIndices, textures])

  return (
    <>
      {matrices.map((data, index) => (
        <mesh
          key={index}
          ref={el => meshRefs.current[index] = el}
          position={[data.matrix.elements[12], data.matrix.elements[13], data.matrix.elements[14]]}
          scale={getScaleForTexture(data.textureIndex)}
        >
          <planeGeometry />
          <meshBasicMaterial
            map={Array.isArray(textures) ? textures[data.textureIndex] : textures}
            toneMapped={false}
            transparent={true}
            opacity={0.1}
          />
        </mesh>
      ))}
    </>
  )
}