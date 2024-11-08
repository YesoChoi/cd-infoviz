import styled from 'styled-components'
import { FlexCenterStyle, WholeContainer } from '@/styles/common';

export const UIContainer = styled.div`
  width: 100%;
  height: 10vh;

  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: absolute;
  bottom: 0;
  left: 0;
`