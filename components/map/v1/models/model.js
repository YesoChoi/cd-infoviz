import React, { forwardRef, useEffect, useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'

const PATH01 = '/3d-model/nike04/nikeModel-mono-01.glb'
const PATH02 = '/3d-model/nike04/nikeModel-mono-02.glb'
const PATH03 = '/3d-model/nike04/nikeModel-mono-03.glb'

const NikeModel = forwardRef(({ modelIdx = 1, isSelected, selectedCountry, ...props }, ref) => {
  const modelPath = useMemo(() => {
    switch(modelIdx) {
      case 1: return PATH01
      case 2: return PATH02
      case 3: return PATH03
      default: return PATH01
    }
  }, [modelIdx])

  const { nodes, materials } = useGLTF(modelPath)
  
  // 각 인스턴스별로 독립적인 materials 생성
  const instanceMaterials = useMemo(() => {
    const newMaterials = {}
    Object.entries(materials).forEach(([key, mat]) => {
      newMaterials[key] = mat.clone() // material을 복제하여 독립적인 인스턴스 생성
    })
    return newMaterials
  }, [materials])

  const rotationSpeeds = useRef({
    x: Math.random() * 0.5 - 1,
    y: Math.random() * 0.5 - 1,
    z: Math.random() * 0.5 - 1
  }).current

  const groupRef = useRef()

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += rotationSpeeds.x * delta
      groupRef.current.rotation.y += rotationSpeeds.y * delta
      groupRef.current.rotation.z += rotationSpeeds.z * delta
    }
  })

  useEffect(() => {
    Object.values(instanceMaterials).forEach(material => {
      material.transparent = true
      
      if (selectedCountry === '') {  // selectedCountry가 비어있는 경우
        material.emissive.setHex(0x000000)
        material.emissiveIntensity = 0
        material.opacity = 1.0
      } else if (isSelected) {  // 특정 country가 선택되고, 해당 모델이 선택된 경우
        material.emissive.setHex(0x000000)
        material.emissiveIntensity = 0.5
        material.opacity = 1.0
      } else {  // 특정 country가 선택되었지만, 해당 모델은 선택되지 않은 경우
        material.emissive.setHex(0x101010)
        material.emissiveIntensity = 0.1
        material.opacity = 0.3
      }
    })
  }, [isSelected, instanceMaterials, selectedCountry])  // selectedCountry 의존성 추가

  return (
    <group ref={ref} {...props}>
      <group 
        ref={groupRef}
        position={[-0.007, 0.999, -0.791]} 
        rotation={[Math.PI / 2, 0, 0]} 
        scale={0.01}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012.geometry}
          material={instanceMaterials['Material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012_1.geometry}
          material={instanceMaterials['Material.006']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012_2.geometry}
          material={instanceMaterials['Material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012_3.geometry}
          material={instanceMaterials['SVGMat']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012_4.geometry}
          material={instanceMaterials['Material.005']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012_5.geometry}
          material={instanceMaterials['SVGMat.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane012_6.geometry}
          material={instanceMaterials['Material.004']}
        />
      </group>
    </group>
  )
})

export default NikeModel

useGLTF.preload(PATH01)
useGLTF.preload(PATH02)
useGLTF.preload(PATH03)