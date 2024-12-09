import { Suspense } from 'react'
import { useAspect, useVideoTexture, useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export default function Background({ bgUrl }) {
  const { viewport } = useThree()
  
  // viewport 크기보다 더 크게 설정 (예: 1.5배)
  const scale = [viewport.width * 4, viewport.height * 4, 1]
  
  return (
    <mesh scale={scale} position={[0, 0, -0.5]}>
      <planeGeometry />
      <Suspense fallback={<FallbackMaterial url="/texture/map_texture.png" />}>
        <VideoMaterial url={bgUrl} />
      </Suspense>
    </mesh>
  )
}

function VideoMaterial({ url }) {
  const texture = useVideoTexture(url)
  return <meshBasicMaterial map={texture} toneMapped={false} />
}

function FallbackMaterial({ url }) {
  const texture = useTexture(url)
  return <meshBasicMaterial map={texture} toneMapped={false} />
}
