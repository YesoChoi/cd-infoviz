import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'


const SCALE = 0.001

export function Model(props) {
  const { nodes, materials } = useGLTF('/3d-model/nike/scene.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.object_0_object_0_object_0__RGB_dffdb16d093e4af68_0.geometry}
        material={materials.object_0__RGB_dffdb16d093e4af68}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[SCALE, SCALE, SCALE]}
      />
    </group>
  )
}

useGLTF.preload('/3d-model/nike/scene.gltf')
