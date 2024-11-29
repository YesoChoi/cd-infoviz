import React,  {useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { SRGBColorSpace } from 'three'
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
        shadows // 그림자 활성화
        gl={{ 
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
          outputColorSpace: SRGBColorSpace,
        }}
      >
        <color attach="background" args={['black']} />
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={0.3} 
          color="white"
        />
        <Map mapUrl={mapUrl} workerType={workerType} countries={countries} />
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
          minDistance={0.6}
          maxDistance={1.0}
          zoomSpeed={0.5}
          minPolarAngle={Math.PI * 0.3}
          maxPolarAngle={Math.PI * 0.5}
          minAzimuthAngle={-Math.PI * 0.1}
          maxAzimuthAngle={Math.PI * 0.1}
          mouseButtons={{
            LEFT: 2,    // 왼쪽 마우스 버튼: PAN
            MIDDLE: 1,  // 중간 버튼: ZOOM
            RIGHT: 0    // 오른쪽 버튼: ROTATE
          }}
          rotateSpeed={0.5}
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
