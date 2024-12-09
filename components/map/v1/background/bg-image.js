import { useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { LayerMaterial, Base, Depth, Noise } from 'lamina'

export default function Background({ bgUrl, count = 100 }) {
  const { viewport } = useThree()
  const texture = useTexture(bgUrl)
  const meshRef = useRef()
  
  const scale = [viewport.width/4, viewport.height/4, 1]
  
  const matrices = useMemo(() => {
    const temp = new THREE.Matrix4()
    const matrices = []
    
    const gridSize = Math.sqrt(count)
    const spacing = viewport.width / 2
    
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
        
        matrices.push(matrix)
      }
    }
    
    return matrices
  }, [viewport, count, scale])

  useEffect(() => {
    if (meshRef.current) {
      matrices.forEach((matrix, i) => {
        meshRef.current.setMatrixAt(i, matrix)
      })
      meshRef.current.instanceMatrix.needsUpdate = true
    }
  }, [matrices])

  return (
    <>


      {/* 기존 이미지 배경은 bgUrl이 있을 때만 렌더링 */}
      {bgUrl && (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
          <planeGeometry />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </instancedMesh>
      )}
    </>
  )
}