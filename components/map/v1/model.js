import React from 'react'
// === NIKE MODEL IMPORTS (주석 해제 시 복원) ===
// import { useGLTF } from '@react-three/drei'

const SCALE = 0.001

export function Model(props) {
  // === NIKE MODEL CODE START (주석 해제 시 복원) ===
  /*
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
  */
  // === NIKE MODEL CODE END ===

  // === TEMPORARY SPHERE REPLACEMENT ===
  return (
    <mesh {...props}>
      <sphereGeometry args={[0.003, 8, 8]} />
      <meshStandardMaterial 
        color="#ff0000"
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

// === NIKE MODEL PRELOAD (주석 해제 시 복원) ===
// useGLTF.preload('/3d-model/nike/scene.gltf', true)