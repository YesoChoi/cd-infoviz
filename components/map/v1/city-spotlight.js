import { SpotLight, useHelper } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

const CitySpotLight = ({ position, setHasSpotlight }) => {
  const spotLightRef = useRef()
  
  // useHelper를 사용하여 SpotLight 디버깅
  useHelper(spotLightRef, THREE.SpotLightHelper, 'red')

  useEffect(() => {
    setHasSpotlight(true)
    return () => setHasSpotlight(false)
  }, [setHasSpotlight])

  return (
    <SpotLight
      ref={spotLightRef}
      position={[position.x, position.y, position.z + 1]}
      angle={Math.PI / 500}
      penumbra={0.8}
      intensity={3}
      distance={1}
      decay={20}
      color="#ffffff"
      castShadow={true}
      target-position={[position.x, position.y, 0]}
    />
  )
}

export default CitySpotLight