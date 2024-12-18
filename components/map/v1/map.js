import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { TextureLoader, DoubleSide, Vector3, NearestFilter, LinearMipmapLinearFilter, SRGBColorSpace } from 'three'
import workerData from '@/utils/constant/worker-data.json'
import City from './models/city-nike-model'


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


const Map = ({ mapUrl, workerType, selectedCountry, onCityHover, visible, sceneState }) => {
  const mesh = useRef()
  const [meshSize, setMeshSize] = useState({ width: 1, height: 1 })
  const { viewport, camera } = useThree()
  
  const texture = useLoader(TextureLoader, mapUrl)
  
  useEffect(() => {
    if (texture) {
      texture.minFilter = LinearMipmapLinearFilter
      texture.magFilter = NearestFilter
      texture.colorSpace = SRGBColorSpace
    }
  }, [texture])

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
      setMeshSize({ width, height })
    }
  }, [viewport])

  const latLngToPosition = (lat, lng) => {
    const minLat = Math.min(...COORDINATES.map(c => c.lat))
    const maxLat = Math.max(...COORDINATES.map(c => c.lat))
    const minLng = Math.min(...COORDINATES.map(c => c.lng))
    const maxLng = Math.max(...COORDINATES.map(c => c.lng))

    const y = ((lat - minLat) / (maxLat - minLat) - 0.5) * meshSize.height
    const x = ((lng - minLng) / (maxLng - minLng) - 0.5) * meshSize.width

    const yOffset = -0.033
    return new Vector3(x, y+yOffset, 0.001)
  }

  const citiesWithPositions = useMemo(() => 
    workerData.map(city => ({
      name: city.State,
      country: city["Country / Region"],
      position: latLngToPosition(city.Latitude, city.Longitude)
    })),
    [meshSize]
  )

  const citiesWithPositionsAndWorkers = useMemo(() => 
    citiesWithPositions.map(city => {
      // worker-data.json에서 해당 도시 찾기
      const cityData = workerData.find(data => data.State === city.name);
      
      // workerType에 따라 다른 worker 수 반환
      let workers;
      switch(workerType) {
        case 'line':
          workers = cityData["Line Workers"];
          break;
        case 'female':
          workers = cityData["Female Workers"];
          break;
        case 'migrant':
          workers = cityData["Migrant Workers"];
          break;
        case 'total':
        default:
          workers = cityData["Total Workers"];
      }

      return {
        ...city,
        totalWorkers: workers
      };
    }),
    [citiesWithPositions, workerType]
  )

  return (
    <group rotation={[- Math.PI * 0.3, 0, 0]}>
      <mesh ref={mesh} position={[0, 0, 0]} visible={visible} receiveShadow>
        <planeGeometry args={[meshSize.width, meshSize.height]} />
        <meshBasicMaterial 
          map={texture} 
          side={DoubleSide}
          toneMapped={false}
        />
      </mesh>
      {sceneState === 'ready' && citiesWithPositionsAndWorkers.map((city, index) => (
        <City 
          key={index} 
          totalWorkers={city.totalWorkers}
          position={city.position}
          country={city.country}
          selectedCountry={selectedCountry}
          workerType={workerType}
          viewport={viewport}
          onHover={onCityHover}
          delay={index * 100}
        />
      ))}
    </group>
  )
}



export default Map