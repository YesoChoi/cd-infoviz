import { useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useMemo, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

export default function Background({ bgUrls, count = 100 }) {
  const { viewport } = useThree()
  const meshRef = useRef()
  const [textureIndices, setTextureIndices] = useState([])
  
  const textures = useTexture(bgUrls)
  const scale = [viewport.width/4, viewport.height/4, 1]
  
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
        
        const matrix = temp.clone()
          .setPosition(position)
          .scale(new THREE.Vector3(...scale))
        
        matrices.push({
          matrix,
          textureIndex: textureIndices[index++]
        })
      }
    }
    
    return matrices
  }, [viewport, count, scale, textureIndices])

  return (
    <>
      {matrices.map((data, index) => (
        <mesh
          key={index}
          position={[data.matrix.elements[12], data.matrix.elements[13], data.matrix.elements[14]]}
          scale={scale}
        >
          <planeGeometry />
          <meshBasicMaterial
            map={Array.isArray(textures) ? textures[data.textureIndex] : textures}
            toneMapped={false}
          />
        </mesh>
      ))}
    </>
  )
}