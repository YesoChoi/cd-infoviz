import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './model';
import * as THREE from 'three';

// 카메라 동기화를 위한 컴포넌트
const CameraController = ({ modelMatrix }) => {
    const { camera } = useThree();

    useFrame(() => {
        if (modelMatrix) {
            // Mapbox의 view matrix를 Three.js 카메라에 적용
            const cameraMat = new THREE.Matrix4().fromArray(modelMatrix.elements);
            camera.projectionMatrix = cameraMat;
            camera.updateMatrixWorld();
        }
    });

    return null;
};

const ModelScene = ({ modelMatrix }) => {
    return (
        <Canvas
            camera={{ 
                position: [0, 0, 20],
                fov: 75,
                near: 0.1,
                far: 1000000,
                // 카메라 매트릭스 자동 업데이트 비활성화
                matrixAutoUpdate: false
            }}
            style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                pointerEvents: 'none'
            }}
            // Mapbox GL과 동일한 좌표계 사용
            gl={{
                antialias: true,
                alpha: true,
            }}
        >
            <CameraController modelMatrix={modelMatrix} />
            
            <ambientLight intensity={0.7} />
            <directionalLight position={[0, -70, 100]} intensity={1.2} />
            <directionalLight position={[0, 70, 100]} intensity={1.2} />
            
            {modelMatrix && <Model modelMatrix={modelMatrix} />}
            
            <OrbitControls 
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
            />
        </Canvas>
    );
};

export default ModelScene;