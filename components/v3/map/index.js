import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { TextureLoader, DoubleSide, Vector3 } from 'three'
import { OrbitControls } from '@react-three/drei'
import { MapContainer } from './styles'
import { CITIES } from '@/utils/constant/test'


const COORDINATES = [{
  lat: 37,
  lng: 71
},{
  lat: 37,
  lng: 135,
},{
  lat: 3,
  lng: 135,
},
{
  lat: 3,
  lng: 71
}]


const City = ({ position }) => (
  <mesh position={position}>
    <sphereGeometry args={[0.005, 32, 32]} />
    <meshBasicMaterial color="red" />
  </mesh>
)


const Map = ({ mapUrl }) => {
  const mesh = useRef()
  const [meshSize, setMeshSize] = useState({ width: 1, height: 1 })
  const texture = useLoader(TextureLoader, mapUrl)
  const { viewport } = useThree()

  useEffect(() => {
    if (mesh.current) {
      const aspectRatio = 16 / 9
      let width, height

      if (viewport.width / viewport.height > aspectRatio) {
        height = Math.min(viewport.height, viewport.width / aspectRatio)
        width = height * aspectRatio
      } else {
        width = viewport.width
        height = width / aspectRatio
      }

      mesh.current.scale.set(width, height, 1)
      setMeshSize({ width, height })
    }
  }, [viewport])

  const latLngToPosition = (lat, lng) => {
    const minLat = Math.min(...COORDINATES.map(c => c.lat))
    const maxLat = Math.max(...COORDINATES.map(c => c.lat))
    const minLng = Math.min(...COORDINATES.map(c => c.lng))
    const maxLng = Math.max(...COORDINATES.map(c => c.lng))

    // 위도를 y 좌표로 변환 (위도가 높을수록 y 값이 커짐)
    const y = ((lat - minLat) / (maxLat - minLat) - 0.5) * meshSize.height
    // 경도를 x 좌표로 변환
    const x = ((lng - minLng) / (maxLng - minLng) - 0.5) * meshSize.width

    return new Vector3(x, y, 0.001)
  }

  return (
    <group>
      <mesh ref={mesh} position={[0, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial 
          map={texture} 
          side={DoubleSide}
        />
      </mesh>
      {CITIES.map((city, index) => (
        <City key={index} position={latLngToPosition(city.lat, city.lng)} />
      ))}
    </group>
  )
}


const MapScene = ({ mapUrl }) => {
  return (
    <MapContainer>
      <Canvas camera={{ position: [0, 0, 1], fov: 50 }}>
        <color attach="background" args={['white']} />
        <ambientLight intensity={0.5} />
        <Map mapUrl={mapUrl} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </MapContainer>
  )
}


export default MapScene
