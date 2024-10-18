import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 300px;
  height: 100px;
  margin-top: 20px;
  border: 1px solid #ccc;
  background-color: #eef2f7;
`;

export const SolidBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  background-color: #d0e1f2;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #aac;
  box-sizing: border-box;
`;

export const StripedBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.5) 5px, rgba(255,255,255,0.5) 10px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #aac;
`;

export const Label = styled.span`
  font-size: 12px;
  color: #333;
  z-index: 1;
`;