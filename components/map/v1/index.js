import React,  {useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls, Stars } from '@react-three/drei'
import { MapContainer } from './styles'
import Map from './map'
import UI from '@/components/ui'


const MapScene = ({ mapUrl, onLoad }) => {

  const [workerType, setWorkerType] = useState(null)
  const [countries, setCountries] = useState([])

  useEffect(() => {
    // 텍스처 로딩이 완료되면 호출
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(mapUrl, () => {
      onLoad?.()
    })
  }, [mapUrl, onLoad])

  return (
    <MapContainer>
      <Canvas 
        camera={{ 
          position: [0, 0, 1], 
          fov: 50,
          near: 0.01,
          far: 1000
        }}
        shadows
        gl={{ 
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <color attach="background" args={['black']} />
        <ambientLight intensity={0.9} />
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={0.7} 
          color="white"
        />
        <Map mapUrl={mapUrl} workerType={workerType} countries={countries} />
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
          // 모든 제한 설정 주석 처리
          // minDistance={0.6}
          // maxDistance={10}
          // zoomSpeed={0.5}
          // minPolarAngle={Math.PI * 0.3}
          // maxPolarAngle={Math.PI * 0.5 *10}
          // minAzimuthAngle={-Math.PI * 0.1}
          // maxAzimuthAngle={Math.PI * 0.1}
          mouseButtons={{
            LEFT: 2,    // 왼쪽 마우스 버튼: PAN
            MIDDLE: 1,  // 중간 버튼: ZOOM
            RIGHT: 0    // 오른쪽 버튼: ROTATE
          }}
          // rotateSpeed={0.5}
        />
        <Stars />
      </Canvas>
      <UI 
        workerType={workerType}
        setWorkerType={setWorkerType}
        countries={countries}
        setCountries={setCountries}
      />
    </MapContainer>
  )
}

export default MapScene
