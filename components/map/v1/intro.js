import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
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
`

const Line = styled.div`
  font-size: 2rem;
  margin-bottom: 0.75rem;
  text-align: left;
  padding-left: ${props => props.indent}px;
  position: relative;
`

//각 단어의 페이드인 애니메이션 duration
const Word = styled.span`
  display: inline-block;
  opacity: 0;
  margin-right: 0.5rem;
  animation: ${fadeIn} 0.9s ease forwards;
  animation-delay: ${props => props.delay}s;
`

const SkipButton = styled.button`
  position: absolute;
  bottom: 40px;
  right: 40px;
  background: transparent;
  border: 1px solid hsl(63, 100%, 83%, 25%);
  background-color: hsl(63, 100%, 83%, 10%);
  color: #F8FFA7;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  opacity: 0;
  animation: ${fadeIn} 0.9s ease forwards;
  animation-delay: 1s;

  &:hover {
    background: hsl(63, 100%, 83%, 40%);
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
      <Line key={lineIndex} indent={indents[lineIndex]}>
        {words.map((word, wordIndex) => (
          <Word
            key={`${lineIndex}-${wordIndex}`}
            delay={baseDelay + (wordIndex * 0.3)} // 각 단어 사이의 간격 (0.3초)
          >
            {word}
          </Word>
        ))}
      </Line>
    )
  }

  return (
    <IntroContainer>
      {lines.map((line, index) => renderLine(line, index))}
      <SkipButton onClick={onSkip}>
        Skip
      </SkipButton>
    </IntroContainer>
  )
}

export default Intro
