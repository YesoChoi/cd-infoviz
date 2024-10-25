import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100vh !important;
    box-sizing: border-box;
  }

  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const LandingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
`;

const Message = styled.h1`
  font-size: 2rem;
  color: #333;
`;

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <LandingContainer>
        <Message>작업중</Message>
      </LandingContainer>
    </>
  );
}
