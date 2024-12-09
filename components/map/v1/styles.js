import styled from 'styled-components'
import { FlexCenterStyle, WholeContainer } from '@/styles/common';

export const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  position: relative;

  canvas {
    ${WholeContainer}
    height: 100vh;
  }
`
