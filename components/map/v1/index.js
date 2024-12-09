import React,  {useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls, Stars , Environment } from '@react-three/drei'
import { MapContainer } from './styles'
import Map from './map'
import UI from '@/components/ui'
import Tooltip from '@/components/ui/hover'
import Background from './background/bg-image'
import BackgroundColor from './background/bg-color'

const MapScene = ({ mapUrl, bgUrl, onLoad }) => {

  const [workerType, setWorkerType] = useState('total')
  const [countries, setCountries] = useState([])
  const [tooltipData, setTooltipData] = useState(null)
  const [sceneState, setSceneState] = useState('loading') // loading, blackout, zoomIn, ready
  const controlsRef = useRef()

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(mapUrl, () => {
      setSceneState('blackout')
      
      setTimeout(() => {
        setSceneState('zoomIn')
        
        if (controlsRef.current) {
          const startZoom = controlsRef.current.target.distanceTo(controlsRef.current.object.position)
          const targetZoom = startZoom * 0.9
          
          const zoomDuration = 1000
          const startTime = Date.now()
          
          const animateZoom = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / zoomDuration, 1)
            
            if (controlsRef.current) {
              controlsRef.current.object.position.z = startZoom + (targetZoom - startZoom) * progress
              controlsRef.current.update()
            }
            
            if (progress < 1) {
              requestAnimationFrame(animateZoom)
            } else {
              setSceneState('ready')
              onLoad?.()
            }
          }
          
          animateZoom()
        }
      }, 500)
    })
  }, [mapUrl, onLoad])

  const handleCityHover = (data) => {
    setTooltipData(data)
  }

  return (
    <MapContainer>
      <Canvas 
        camera={{ 
          position: [0, 0, 1], 
          fov: 50,
          near: 0.01,
          far: 10000
        }}
        shadows
        gl={{ 
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <BackgroundColor />
        <Background bgUrl={bgUrl} />
        <ambientLight intensity={sceneState === 'blackout' ? 0 : 1} />
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={sceneState === 'blackout' ? 0 : 1} 
          color="white"
        />
        <Map 
          mapUrl={mapUrl} 
          workerType={workerType} 
          countries={countries} 
          onCityHover={handleCityHover}
          visible={sceneState !== 'blackout'}
          sceneState={sceneState}
        />
        <OrbitControls 
          ref={controlsRef}
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
          mouseButtons={{
            LEFT: 2,
            MIDDLE: 1,
            RIGHT: 0
          }}
        />
      </Canvas>
      {sceneState === 'ready' && (
        <UI 
          workerType={workerType}
          setWorkerType={setWorkerType}
          countries={countries}
          setCountries={setCountries}
        />
      )}
      {sceneState === 'ready' && (
        <Tooltip tooltipData={tooltipData} />
      )}
    </MapContainer>
  )
}

export default MapScene
