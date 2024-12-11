import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useTexture } from '@react-three/drei'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

const fadeInBg = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%);
  }
  100% {
    opacity: 0.3;
    transform: translate(-50%, -50%);
  }
`

const slowZoom = keyframes`
  from {
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    transform: translate(-50%, -50%) scale(2);
  }
`

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`
const blinkBg = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 0.2; }
  100% { opacity: 0.3; }
`

const IntroContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: black;
  color: #F8FFA7;
  padding: 0 20px;
  position: relative;
`

const Line = styled.div`
  font-size: 2rem;
  margin-bottom: 0.75rem;
  text-align: left;
  padding-left: ${props => props.$indent}px;
  position: relative;
`

//각 단어의 페이드인 애니메이션 duration
const Word = styled.span`
  display: inline-block;
  opacity: 0;
  margin-right: 0.5rem;
  animation: ${fadeIn} 0.9s ease forwards;
  animation-delay: ${props => props.$delay}s;
`

const SkipButton = styled.button`
  position: absolute;
  bottom: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  color: hsl(63, 100%, 83%, 70%);
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
  transition: all 0.3s ease;
  opacity: 0;
  z-index: 100;
  animation: 
    ${fadeIn} 0.9s ease forwards,
    ${blink} 2s ease-in-out infinite;
  animation-delay: 1s, 2s;
`

const BgImage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  aspect-ratio: 1;
  background-image: url('./bg-img/nike-shoe.webp');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  z-index: 1;
  will-change: transform, opacity;
  animation: 
    ${fadeInBg} 2s cubic-bezier(.77,-0.01,.87,.48) forwards,
    ${slowZoom} 240s ease-out forwards,
    ${blinkBg} 5s ease-in-out infinite;
  animation-delay: 0s, 2s, 2s;

  &.loaded {
    transition: transform 0.2s ease-out;
    transform: translate(-50%, -50%) perspective(1000px);
  }
`

const Intro = ({ onSkip }) => {
  const lines = [
    "How many people are in my Nike shoes?",
    "Hidden hands behind every step.",
    "From rubber trees to bustling factories.",
    "Through countless hands to my every step."
  ]

  const renderLine = (text, lineIndex) => {
    const words = text.split(' ')
    const baseDelay = lineIndex * 2.85 // 각 라인은 2.85초 간격
    
    const indents = [0, 120, 0, 240] // 각 라인의 들여쓰기 픽셀값
    
    return (
      <Line key={lineIndex} $indent={indents[lineIndex]}>
        {words.map((word, wordIndex) => (
          <Word
            key={`${lineIndex}-${wordIndex}`}
            $delay={baseDelay + (wordIndex * 0.3)}
          >
            {word}
          </Word>
        ))}
      </Line>
    )
  }

  return (
    <IntroContainer>
      <BgImage />
      {lines.map((line, index) => renderLine(line, index))}
      <SkipButton onClick={onSkip}>
        Skip
      </SkipButton>
    </IntroContainer>
  )
}

export default Intro
