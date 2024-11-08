import React, { useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

const SCALE = 0.001

export function Model(props) {
  const { nodes, materials } = useGLTF('/3d-model/nike/scene.gltf', true)

  const geometry = useMemo(() => nodes.object_0_object_0_object_0__RGB_dffdb16d093e4af68_0.geometry, [nodes])
  const material = useMemo(() => materials.object_0__RGB_dffdb16d093e4af68, [materials])

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow={false}
        receiveShadow={false}
        geometry={geometry}
        material={material}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[SCALE, SCALE, SCALE]}
      />
    </group>
  )
}

useGLTF.preload('/3d-model/nike/scene.gltf', true)
