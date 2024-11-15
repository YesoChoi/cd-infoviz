import React, { useState } from 'react'
import * as S from './styles'

const BUTTONS = [
  { id: 'total', label: 'total workers' },
  { id: 'line', label: 'line workers' },
  { id: 'female', label: 'female workers' },
  { id: 'migrant', label: 'migrant workers' }
]

const COUNTRIES = [
  'vietnam', 'thailand', 'taiwan', 'south korea',
  'japan', 'indonesia', 'india', 'china'
]

export default function UI() {
  const [selectedButton, setSelectedButton] = useState(null)

  return (
    <S.UIContainer>
      {selectedButton && (
        <S.ChipContainer>
          {COUNTRIES.map(country => (
            <S.Chip key={country}>{country}</S.Chip>
          ))}
        </S.ChipContainer>
      )}
      {BUTTONS.map(button => (
        <S.Button
          key={button.id}
          onClick={() => setSelectedButton(button.id)}
          selected={selectedButton === button.id}
        >
          <S.Dot selected={selectedButton === button.id} />
          {button.label}
        </S.Button>
      ))}
    </S.UIContainer>
  )
}   