import { useTexture } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

export default function Background({ bgUrls, count = 100 }) {
  const { viewport } = useThree()
  const meshRefs = useRef([])
  const [textureIndices, setTextureIndices] = useState([])
  
  const textures = useTexture(bgUrls)
  const baseWidth = viewport.width / 4
  
  // 각 이미지마다 다른 회전 속도를 가지도록 설정
  const rotationSpeeds = useMemo(() => {
    return Array(count).fill().map(() => 
      (Math.random() * 0.001) - 0.001 // -0.0005 ~ 0.0005 사이의 랜덤한 속도
    )
  }, [count])
  
  // 회전 애니메이션
  useFrame(() => {
    meshRefs.current.forEach((mesh, index) => {
      if (mesh) {
        mesh.rotation.y += rotationSpeeds[index]
      }
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
    
    const gridSize = Math.sqrt(count)
    const spacing = viewport.width / 2
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
          textureIndex
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
            opacity={0.5}
          />
        </mesh>
      ))}
    </>
  )
}