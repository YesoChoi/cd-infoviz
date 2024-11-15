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

export default function UI({
  workerType,
  setWorkerType,
  countries,
  setCountries
}) {
 

  const toggleChip = (country) => {
    setCountries(prev =>
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    )
  }

  console.log(countries)

  return (
    <S.UIContainer>
      {workerType && (
        <S.ChipContainer>
          {COUNTRIES.map(country => (
            <S.Chip
              key={country}
              onClick={() => toggleChip(country)}
              selected={countries.includes(country)}
            >
              {country}
            </S.Chip>
          ))}
        </S.ChipContainer>
      )}
      {BUTTONS.map(button => (
        <S.Button
          key={button.id}
          onClick={() => setWorkerType(button.id)}
          selected={workerType === button.id}
        >
          <S.Dot selected={workerType === button.id} />
          {button.label}
        </S.Button>
      ))}
    </S.UIContainer>
  )
}   