import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import { Matrix4 } from 'three';

const Model = ({ modelMatrix }) => {
    // GLTF 모델 로드
    const gltf = useGLTF('https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf');
    
    // 모델 행렬 업데이트
    useEffect(() => {
        if (modelMatrix && gltf.scene) {
            // Mapbox 변환 행렬을 Three.js 행렬로 변환
            const matrix = new Matrix4().fromArray(modelMatrix.elements);
            // 모델의 변환 행렬 업데이트
            gltf.scene.matrix.copy(matrix);
            // 자동 행렬 업데이트 비활성화 (수동 제어)
            gltf.scene.matrixAutoUpdate = false;
        }
    }, [modelMatrix, gltf.scene]);
    
    // 3D 모델 렌더링
    return <primitive object={gltf.scene} />;
};

export default Model;