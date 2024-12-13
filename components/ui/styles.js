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
  gap: 4rem;

  @media (max-width: 768px) {
  width: 100%;
  max-width: none;
  height: auto;
  top: 0;
  right: auto;
  left: 0;
  box-sizing: border-box;
  gap: 1rem;
  }
`

export const ContainerLabel1 = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 120%;
  color: #2B2839;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
`

export const ContainerLabel2 = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #2B2839;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const Icon = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 50%;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;

  > div {
    width: 100%;
  }

  @media (max-width: 768px) {
    gap: 0.25rem;
  }
`

export const Button = styled.div`
  background: ${({ selected }) => (selected ? '#2B2839' : 'none')};
  display: flex;
  padding: 0.25rem 0.5rem;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  color: ${({ selected }) => (selected ? '#E1F8AF' : '#9C9C9C')};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  border-top: ${({ selected }) => (selected ? 'none' : '1px solid #2B2839')};

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-bottom: 0.1rem;
  }
`

export const ButtonInfo = styled.div` 
  display: flex;
  flex-direction: column;
  padding: 0.2rem 0.5rem 1rem;
  align-items: flex-start;
  align-self: stretch;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 0.2rem 0.5rem 0.5rem;
    gap: 0.5rem;
  }
`

export const h1 = styled.h1`
  color: #2B2839;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`

export const caption = styled.caption`
  color: #2B2839;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 100%;
  text-align: left;
`

export const ButtonCountryContainer = styled.div`
  
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 0.5rem;
  align-self: stretch;
  flex-wrap: wrap;
  bottom: 0;
`
export const ButtonCountry = styled.div`
  background: ${({ selected }) => (selected ? '#C5C3D1' : 'none')};
  display: flex;
  padding: 0.125rem 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  color: #2B2839;
  border: 1px solid #2B2839;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
`