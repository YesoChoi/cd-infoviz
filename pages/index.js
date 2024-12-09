import styled, { createGlobalStyle } from 'styled-components';
import { useState, useEffect } from 'react'
import MapScene from '@/components/map/v1'
import Intro from '@/components/map/v1/intro'
import * as THREE from 'three'
import Background from '@/components/map/v1/background'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100vh !important;
    box-sizing: border-box;
  }

  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const mapUrl = '/texture/map_texture.png'
const bgUrl = '/texture/dummy.mp4'

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
        <MapScene mapUrl={mapUrl} bgUrl={bgUrl} />
      )}
    </div>
  )
}

export default V3Page