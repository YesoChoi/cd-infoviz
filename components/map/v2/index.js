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

        // Mapbox 지도 초기화
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v11',
            style: MAP_STYLE_URL,
            pitch: 60,  // 지도 기울기 각도
            antialias: true,  // 부드러운 렌더링을 위한 안티앨리어싱
            center: [108.01819614324278, 13.640768620677855],  // 초기 중심 좌표
            zoom: 4  // 초기 줌 레벨
        });

        // 3D 모델의 위치와 회전 설정
        const modelOrigin = [108.01819614324278, 13.640768620677855];  // 모델이 위치할 좌표
        const modelAltitude = 0;  // 고도
        const modelRotate = [Math.PI / 2, 0, 0];  // X, Y, Z축 회전 각도

        // 모델 행렬 업데이트 함수
        const updateModelMatrix = () => {
            // 위경도 좌표를 Mercator 좌표로 변환
            const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
                modelOrigin,
                modelAltitude
            );

            // 모델 변환 정보 설정
            const modelTransform = {
                translateX: modelAsMercatorCoordinate.x,
                translateY: modelAsMercatorCoordinate.y,
                translateZ: modelAsMercatorCoordinate.z,
                rotateX: modelRotate[0],
                rotateY: modelRotate[1],
                rotateZ: modelRotate[2],
                scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
            };

            // Three.js 변환 행렬 생성
            const matrix = new THREE.Matrix4();
            // 각 축에 대한 회전 행�� 생성
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

            const scaleFactor = 1000000;
            // 최종 변환 행렬 계산
            matrix
                .makeTranslation(
                    modelTransform.translateX,
                    modelTransform.translateY,
                    modelTransform.translateZ
                )
                .scale(
                    new THREE.Vector3(
                        modelTransform.scale * scaleFactor,
                        -modelTransform.scale * scaleFactor,  // Y축 반전
                        modelTransform.scale * scaleFactor
                    )
                )
                .multiply(rotationX)
                .multiply(rotationY)
                .multiply(rotationZ);

            setModelMatrix(matrix);
        };

        // 지도 이벤트에 따른 모델 업데이트
        map.current.on('style.load', updateModelMatrix);  // 스타일 로드 완료 시
        map.current.on('move', updateModelMatrix);        // 지도 이동 시
        map.current.on('zoom', updateModelMatrix);        // 줌 변경 시
        map.current.on('pitch', updateModelMatrix);       // 기울기 변경 시
        map.current.on('rotate', updateModelMatrix);      // 회전 시

    }, []);

    return (
        <S.Container>
            <div ref={mapContainer} style={{ position: 'absolute', width: '100%', height: '100%' }} />
            <ModelScene modelMatrix={modelMatrix} />
        </S.Container>
    );
};

export default MapWith3DModel;