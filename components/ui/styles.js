import styled from 'styled-components'

export const UIContainer = styled.div`
  position: absolute;
  right: 0rem;
  top: 0rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 200px;
  height: 100vh;
  padding: 1rem;
  border-radius: 0rem;
  background-color: #E1F8AF;
`

export const ContainerLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #2B2839;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const Button = styled.button`
  background: ${({ selected }) => (selected ? '#F8FFA7' : 'rgba(255, 255, 255, 0.1)')};
  border: none;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: black;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`

export const Icon = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 50%;
`

export const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export const Chip = styled.div`
  background: ${({ selected }) => (selected ? '#F8FFA7' : 'rgba(254, 255, 241, 0.6)')};
  border-radius: 0.125rem;
  padding: 0.4rem 0.75rem;
  color: #2B2839;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: center;

    &:hover {
    background: ${({ selected }) => (selected ? '#E6E68A' : 'rgba(254, 255, 241, 0.8)')};
    transform: scale(1.0125);
`