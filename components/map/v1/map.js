import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { TextureLoader, DoubleSide, Vector3, NearestFilter, LinearMipmapLinearFilter, sRGBEncoding } from 'three'
import { CITIES, calculateTotalWorkers } from '@/utils/constant/test'
import City from './city'


const COORDINATES = [{
  lat: 60.9,
  lng: 51.9
},{
  lat: 60.9,
  lng: 210.7,
},{
  lat: -19.60,
  lng: 210.7,
},
{
  lat: -19.60,
  lng: 51.9
}]


const Map = ({ mapUrl, workerType, countries }) => {
  const mesh = useRef()
  const [meshSize, setMeshSize] = useState({ width: 1, height: 1 })
  const texture = useLoader(TextureLoader, mapUrl)
  texture.magFilter = LinearMipmapLinearFilter;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.encoding = sRGBEncoding;
  texture.anisotropy = 16;
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

    // const xOffset = -.679;
    // const yOffset = -0.025;
    return new Vector3(x, y, 0.001)
  }

  const citiesWithPositions = useMemo(() => 
    CITIES.map(city => ({
      ...city,
      position: latLngToPosition(city.lat, city.lng)
    })),
    [meshSize]
  )


  const citiesWithPositionsAndWorkers = useMemo(() => 
    citiesWithPositions.map(city => ({
      ...city,
      totalWorkers: calculateTotalWorkers(city.country, workerType)
    })),
    [citiesWithPositions, workerType]
  )

  return (
    <group>
      <mesh ref={mesh} position={[0, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial 
          map={texture} 
          side={DoubleSide}
          toneMapped={false}
        />
      </mesh>
      {citiesWithPositionsAndWorkers.map((city, index) => (
        <City key={index} 
          totalWorkers={city.totalWorkers}
          position={city.position}
        />
      ))}
    </group>
  )
}



export default Map