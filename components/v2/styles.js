import styled from 'styled-components';
import { FlexCenterStyle, WholeContainer } from '@/styles/common';
export const Container = styled.div`
  // Add any container styles if needed
  ${FlexCenterStyle}
  ${WholeContainer}
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

export const Tab = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${props => props.active ? '#d0e1f2' : '#f0f0f0'};
  border: 1px solid ${props => props.active ? '#aaa' : '#ccc'};
`;

export const Dropdown = styled.select`
  margin: 20px 0;
  padding: 10px;
  font-size: 16px;
`;