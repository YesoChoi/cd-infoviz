import { Suspense } from 'react'
import { useAspect, useVideoTexture, useTexture } from '@react-three/drei'

export default function Background({ bgUrl }) {
  const size = useAspect(1920, 1080)
  return (
    <mesh scale={size} position={[0, 0, -2]}>
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
