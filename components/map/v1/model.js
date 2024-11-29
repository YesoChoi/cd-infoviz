import React, { forwardRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

const PATH = '/3d-model/nike03/nikeModel.glb'

const NikeModel = forwardRef(({ isSelected, ...props }, ref) => {
  const { nodes, materials } = useGLTF(PATH)

  // material 밝기 조절
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

useGLTF.preload(PATH)