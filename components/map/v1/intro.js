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
  margin-bottom: 1.5rem;
  text-align: center;
`

const Word = styled.span`
  display: inline-block;
  opacity: 0;
  margin-right: 0.5rem;
  animation: ${fadeIn} 0.9s ease forwards;
  animation-delay: ${props => props.delay}s;
`

const Credit = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  font-size: 0.9rem;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: 8s;
`

const Intro = () => {
  const lines = [
    "How many people are in my Nike shoes?",
    "Hidden hands behind every step.",
    "From rubber trees to bustling factories.",
    "Through countless hands to my every step."
  ]

  const renderLine = (text, lineIndex) => {
    const words = text.split(' ')
    const baseDelay = lineIndex * 2 // 각 라인은 2초 간격으로 시작

    return (
      <Line key={lineIndex}>
        {words.map((word, wordIndex) => (
          <Word
            key={`${lineIndex}-${wordIndex}`}
            delay={baseDelay + (wordIndex * 0.2)} // 각 단어는 0.2초 간격
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
      <Credit>A project by Yeso Choi</Credit>
    </IntroContainer>
  )
}

export default Intro
