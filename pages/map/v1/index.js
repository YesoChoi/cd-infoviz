import { useState, useEffect } from 'react'
import MapScene from '../../../components/map/v1'
import Intro from '../../../components/map/v1/intro'
import * as THREE from 'three'

const mapUrl = '/texture/map_texture.png'

const V3Page = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isIntroComplete, setIsIntroComplete] = useState(false)

  useEffect(() => {
    // 인트로 애니메이션 지속 시간
    const introDuration = 12 * 1000 
    const timer = setTimeout(() => {
      setIsIntroComplete(true)
    }, introDuration)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isIntroComplete) {
      // 실제 로딩이 완료되면 인트로가 끝난 후에만 메인 페이지로 전환
      const textureLoader = new THREE.TextureLoader()
      textureLoader.load(mapUrl, () => {
        setIsLoading(false)
      })
    }
  }, [isIntroComplete])

  // Skip 버튼 핸들러 추가
  const handleSkip = () => {
    setIsIntroComplete(true)
  }

  return (
    <div style={{ height: '100%', overflow: 'hidden' }}>
      {isLoading ? (
        <Intro onSkip={handleSkip} />
      ) : (
        <MapScene mapUrl={mapUrl} />
      )}
    </div>
  )
}

export default V3Page