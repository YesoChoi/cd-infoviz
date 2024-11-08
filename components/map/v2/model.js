import { useGLTF } from '@react-three/drei';

const Model = ({ modelTransform }) => {
    const gltf = useGLTF('https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf');
    
    return (
        <primitive 
            object={gltf.scene} 
            position={[modelTransform?.translateX || 0, modelTransform?.translateY || 0, modelTransform?.translateZ || 0]}
            scale={[modelTransform?.scale || 1, modelTransform?.scale || 1, modelTransform?.scale || 1]}
            rotation={[modelTransform?.rotateX || 0, modelTransform?.rotateY || 0, modelTransform?.rotateZ || 0]}
        />
    );

    console.log()
};

export default Model;