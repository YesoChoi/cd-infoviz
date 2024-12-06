import styled from 'styled-components';

export const TooltipContainer = styled.div`
  position: fixed;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  padding: 12px;
  min-width: 200px;
  pointer-events: none;
  z-index: 1000;
  transform: translate(-50%, -100%);
  margin-top: -10px;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #2B2839;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #2B2839;

  span:first-child {
    font-weight: 500;
  }
`;
