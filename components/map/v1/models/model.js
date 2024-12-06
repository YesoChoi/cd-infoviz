import React, { forwardRef, useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

const PATH01 = '/3d-model/nike04/nikeModel-mono-01.glb'
const PATH02 = '/3d-model/nike04/nikeModel-mono-02.glb'
const PATH03 = '/3d-model/nike04/nikeModel-mono-03.glb'

const NikeModel = forwardRef(({ modelIdx = 1, isSelected, ...props }, ref) => {
  // modelIdx에 따라 경로 선택
  const modelPath = useMemo(() => {
    switch(modelIdx) {
      case 1:
        return PATH01
      case 2:
        return PATH02
      case 3:
        return PATH03
      default:
        return PATH01
    }
  }, [modelIdx])

  const { nodes, materials } = useGLTF(modelPath)

  useEffect(() => {
    Object.values(materials).forEach(material => {
      material.emissive.set(isSelected ? '#404040' : '#202020')
      material.emissiveIntensity = isSelected ? 1 : 0.3
      material.needsUpdate = true
    })
  }, [isSelected, materials])

  return (
    <group ref={ref} {...props} dispose={null}>
      <group position={[-0.007, 0.999, -0.791]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012.geometry}
          material={materials['Material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012_1.geometry}
          material={materials['Material.006']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012_2.geometry}
          material={materials['Material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012_3.geometry}
          material={materials.SVGMat}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012_4.geometry}
          material={materials['Material.005']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012_5.geometry}
          material={materials['SVGMat.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012_6.geometry}
          material={materials['Material.004']}
        />
      </group>
    </group>
  )
})

export default NikeModel

// 모든 모델 미리 로드
useGLTF.preload(PATH01)
useGLTF.preload(PATH02)
useGLTF.preload(PATH03)