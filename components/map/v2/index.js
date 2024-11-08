import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import * as THREE from 'three';
import ModelScene from './model-scene';
import * as S from './styles';

// Mapbox 액세스 토큰 설정
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// 환경 변수로 관리
const MAP_STYLE_URL = process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL;

const MapWith3DModel = () => {
    // 지도 컨테이너와 지도 인스턴스를 위한 ref
    const mapContainer = useRef(null);
    const map = useRef(null);
    // 3D 모델의 변환 행렬을 위한 상태
    const [modelMatrix, setModelMatrix] = useState(null);

    useEffect(() => {
        if (map.current) return;

        // 지도 초기화 (초기 중심은 기존대로 유지)
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: MAP_STYLE_URL,
            pitch: 60,
            antialias: true,
            center: [126.9779692, 37.5662952],
            zoom: 4
        });

        // 서울의 좌표로 모델 위치 변경
        const modelOrigin = [126.9779692, 37.5662952];  // 서울 중 좌표
        const modelAltitude = 10;  // 고도를 높여서 더 잘 보이게 설정
        const modelRotate = [Math.PI / 2, 0, 0];

        const updateModelMatrix = () => {
            if (!map.current) return;

            const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
                modelOrigin,
                modelAltitude
            );
            
            console.log('Mercator Transform:', {
                original: { lng: modelOrigin[0], lat: modelOrigin[1], altitude: modelAltitude },
                mercator: {
                    x: modelAsMercatorCoordinate.x,
                    y: modelAsMercatorCoordinate.y,
                    z: modelAsMercatorCoordinate.z,
                    meterScale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
                }
            });

            const modelTransform = {
                translateX: modelAsMercatorCoordinate.x,
                translateY: modelAsMercatorCoordinate.y,
                translateZ: modelAsMercatorCoordinate.z,
                rotateX: modelRotate[0],
                rotateY: modelRotate[1],
                rotateZ: modelRotate[2],
                scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
            };

            // 지도의 현재 상태 가져오기
            const mapTransform = map.current.transform;
            
            console.log('Camera Transform:', {
                pitch: mapTransform.pitch,
                bearing: mapTransform.bearing,
                zoom: mapTransform.zoom,
                center: mapTransform.center
            });

            console.log('mapTransform:', mapTransform.mercatorMatrix)
            // 지도의 view matrix 생성
            const viewMatrix = new THREE.Matrix4().makeScale(1, -1, 1);
            const cameraTransform = new THREE.Matrix4()
                .makeRotationX(mapTransform.pitch * (Math.PI / 180))  // pitch를 라디안으로 변환
                .multiply(new THREE.Matrix4().makeRotationZ(-mapTransform.bearing * (Math.PI / 180)));  // bearing을 라디안으로 변환
            
            viewMatrix.multiply(cameraTransform);

            // 모델 변환 행렬 생성
            const matrix = new THREE.Matrix4();
            const rotationX = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(1, 0, 0),
                modelTransform.rotateX
            );
            const rotationY = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(0, 1, 0),
                modelTransform.rotateY
            );
            const rotationZ = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(0, 0, 1),
                modelTransform.rotateZ
            );

            console.log('rotationX:', rotationX)
            console.log('rotationY:', rotationY)
            console.log('rotationZ:', rotationZ)
            // 스케일 팩터를 크게 설정
            const scaleFactor = 100000;  // 모델 크기를 크게 조정

            matrix
                .makeTranslation(
                    modelTransform.translateX,
                    modelTransform.translateY,
                    modelTransform.translateZ
                )
                .scale(
                    new THREE.Vector3(
                        modelTransform.scale * scaleFactor,
                        -modelTransform.scale * scaleFactor,
                        modelTransform.scale * scaleFactor
                    )
                )
                .multiply(rotationX)
                .multiply(rotationY)
                .multiply(rotationZ);
            
            console.log('makeTranslation:', {
                translateX: modelTransform.translateX,
                translateY: modelTransform.translateY,
                translateZ: modelTransform.translateZ
            })
            // 지도의 view matrix를 적용
            matrix.multiply(viewMatrix);

            console.log('Final Model Matrix:', {
                position: new THREE.Vector3().setFromMatrixPosition(matrix),
                scale: new THREE.Vector3().setFromMatrixScale(matrix),
                elements: matrix.elements
            });

            setModelMatrix(matrix);
        };

        
        // 이벤트 리스너 설정
        map.current.on('style.load', updateModelMatrix);
        map.current.on('move', updateModelMatrix);
        map.current.on('zoom', updateModelMatrix);
        map.current.on('pitch', updateModelMatrix);
        map.current.on('rotate', updateModelMatrix);

    }, []);

    return (
        <S.Container>
            <div ref={mapContainer} style={{ position: 'absolute', width: '100%', height: '100%' }} />
            <ModelScene modelMatrix={modelMatrix} />
        </S.Container>
    );
};

export default MapWith3DModel;