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
        <Map mapUrl={mapUrl} />
        <OrbitControls enableZoom={true} enablePan={false} />
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
