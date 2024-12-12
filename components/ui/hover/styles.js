import styled from 'styled-components';

export const TooltipContainer = styled.div`
  position: fixed;
  right: 28rem;
  bottom: 14rem;
  transform: translate(100%, 100%);
  pointer-events: none;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  padding: 12px;
  min-width: 200px;
  
  transition: opacity 0.3s ease-in-out;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2B2839;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const Subtitle = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #2B2839;
  margin-bottom: 0.5rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1rem;
  color: #2B2839;

  span:first-child {
    font-weight: 500;
  }
`;
