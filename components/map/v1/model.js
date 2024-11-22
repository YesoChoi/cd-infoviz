import React from 'react'
// === NIKE MODEL IMPORTS (주석 해제 시 복원) ===
import { useGLTF } from '@react-three/drei'

const SCALE = 0.01
const PATH = '/3d-model/nike02/scene.gltf'


export function NikeModel(props) {
  const { nodes, materials } = useGLTF(PATH)
  return (
    <group {...props} dispose={null}
      scale={[SCALE, SCALE, SCALE]}
    >
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.494}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group position={[-115.396, 107.813, -79.139]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Render001_Material_0.geometry}
              material={materials.Material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Render001_Material006_0.geometry}
              material={materials['Material.006']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Render001_Material002_0.geometry}
              material={materials['Material.002']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Render001_Material002_0_1.geometry}
              material={materials['Material.002']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Render001_Material002_0_2.geometry}
              material={materials['Material.002']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Render001_SVGMat_0.geometry}
              material={materials.SVGMat}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Render001_Material005_0.geometry}
              material={materials['Material.005']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Render001_SVGMat002_0.geometry}
              material={materials['SVGMat.002']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Render001_Material001_0.geometry}
              material={materials['Material.001']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Render001_Material003_0.geometry}
              material={materials['Material.003']}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(PATH)

