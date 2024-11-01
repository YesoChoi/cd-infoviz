import styled from 'styled-components';
import { FlexCenterStyle, WholeContainer } from '@/styles/common';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    
    .mapboxgl-canvas {
        ${WholeContainer}
        ${FlexCenterStyle}
        position: relative;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }
`;