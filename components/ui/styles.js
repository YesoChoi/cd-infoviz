import styled from 'styled-components'
import { FlexCenterStyle, WholeContainer } from '@/styles/common'

export const UIContainer = styled.div`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  // background-color: blue;
  max-width: 180px;
`

export const Button = styled.button`
  background: ${({ selected }) => (selected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)')};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  padding: 0.8rem 1.5rem;
  color: ${({ selected }) => (selected ? '#ffff00' : 'white')};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: 180px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`

export const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ selected }) => (selected ? '#ffff00' : 'white')};
`

export const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  // background-color: red;
`

export const Chip = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: white;
  font-size: 0.8rem;
  text-align: center;
`