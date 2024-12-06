import React from 'react'
import * as S from './styles'

const BUTTONS = [
  { id: 'total', label: 'TOTAL' },
  { id: 'line', label: 'LINE' },
  { id: 'female', label: 'FEMALE' },
  { id: 'migrant', label: 'MIGRANT' }
]

const COUNTRIES = [
  'VIETNAM', 'THAILAND', 'TAIWAN', 'SOUTH KOREA',
  'JAPAN', 'INDONESIA', 'INDIA', 'CHINA'
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

  return (
    <S.UIContainer>
      <div>
        <S.ContainerLabel>
          <S.Icon src="/icon/ic_round-people.svg" /> WORKERS TYPE
        </S.ContainerLabel>
        <S.ChipContainer>
          {BUTTONS.map(button => (
            <S.Chip
              key={button.id}
              onClick={() => {
                setWorkerType(button.id)
                setCountries([])  // workerType 변경 시 countries 리셋
              }}
              selected={workerType === button.id}
            >
              {button.label}
          </S.Chip>
        ))}
        </S.ChipContainer>
      </div>
      <div>
        <S.ContainerLabel>
          <S.Icon src="/icon/ic_token-geo.svg" /> COUNTRIES
        </S.ContainerLabel>
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
      </div>
    </S.UIContainer>
  )
}   