import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './model';

const ModelScene = ({ modelMatrix }) => {
    return (
        <Canvas
            // Three.js 카메라 설정
            camera={{ 
                position: [0, 0, 20],
                fov: 75,          // 시야각
                near: 0.1,        // 가까운 클리핑 평면
                far: 1000000      // 먼 클리핑 평면
            }}
            style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                pointerEvents: 'none'  // 마우스 이벤트를 지도에 전달
            }}
        >
            {/* 조명 설정 */}
            <ambientLight intensity={0.7} />  // 전역 조명
            <directionalLight position={[0, -70, 100]} intensity={1.2} />  // 방향성 조명 1
            <directionalLight position={[0, 70, 100]} intensity={1.2} />   // 방향성 조명 2
            
            {/* 3D 모델 렌더링 */}
            {modelMatrix && <Model modelMatrix={modelMatrix} />}
            
            {/* 카메라 컨트롤 (비활성화) */}
            <OrbitControls 
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
            />
        </Canvas>
    );
};

export default ModelScene;