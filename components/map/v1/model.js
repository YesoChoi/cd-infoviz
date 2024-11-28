import React from 'react'
// === NIKE MODEL IMPORTS (주석 해제 시 복원) ===
import { useGLTF } from '@react-three/drei'

const SCALE = 0.004
const PATH = '/3d-model/nike03/nikeModel.glb'

export function NikeModel(props) {
  const { nodes, materials } = useGLTF(PATH)
  return (
    <group {...props} dispose={null} scale={[SCALE, SCALE, SCALE]}>
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
}

useGLTF.preload(PATH)