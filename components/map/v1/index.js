import React,  {useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {  sRGBEncoding } from 'three'
import { OrbitControls, Stars } from '@react-three/drei'
import { MapContainer } from './styles'
import Map from './map'
import UI from '@/components/ui'


const MapScene = ({ mapUrl }) => {

  const [workerType, setWorkerType] = useState(null)
  const [countries, setCountries] = useState([])


  return (
    <MapContainer>
      <Canvas camera={{ position: [0, 0, 1], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
          outputEncoding: sRGBEncoding,
        }}
      >
        <color attach="background" args={['black']} />
        <ambientLight intensity={2} />
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={1.5} 
          color="white"
        />
        <Map mapUrl={mapUrl} workerType={workerType} countries={countries} />
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={false}
          minDistance={0.6}
          maxDistance={1.2}
          zoomSpeed={0.5}
          mouseButtons={{
            LEFT: 2,    // 왼쪽 마우스 버튼을 PAN으로 설정 (2는 PAN을 의미)
            MIDDLE: 1,  // 중간 버튼
            RIGHT: 0    // 오른쪽 버튼
          }}
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
