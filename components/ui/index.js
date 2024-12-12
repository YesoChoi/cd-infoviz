import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import * as S from './styles'
import workerData from '../../utils/constant/worker-data.json'

const AnimatedValue = ({ value }) => {
  const { number } = useSpring({
    from: { number: value * 0.8},
    number: value || 0,
    delay: 100,
    config: { mass: 1, tension: 180, friction: 12 }
  });

  return (
    <S.h1>
      <animated.span>
        {number.to(n => Math.floor(n).toLocaleString())}
      </animated.span>
    </S.h1>
  );
};

const BUTTONS = [
  { 
    id: 'total', 
    label: 'Total',
    dataKey: 'Total Workers',
    caption: 'All workers in Nike shoes manufacturing facilities'
  },
  { 
    id: 'line', 
    label: 'Line',
    dataKey: 'Line Workers',
    caption: 'Workers directly involved in production lines'
  },
  { 
    id: 'female', 
    label: 'Female',
    dataKey: 'Female Workers',
    caption: 'Female workers across all positions'
  },
  { 
    id: 'migrant', 
    label: 'Migrant',
    dataKey: 'Migrant Workers',
    caption: 'Workers from different regions or countries'
  }
]

const COUNTRIES = [
  'Vietnam', 'Thailand', 'Taiwan', 'South Korea',
  'Japan', 'Indonesia', 'India', 'China'
]

export default function UI({
  workerType,
  setWorkerType,
  selectedCountry,
  setSelectedCountry
}) {
  const toggleCountry = (country) => {
    setSelectedCountry(selectedCountry === country ? '' : country)
  }

  const calculateWorkerSum = (buttonId) => {
    const button = BUTTONS.find(b => b.id === buttonId);
    if (!button) return 0;
    return workerData.reduce((sum, state) => sum + state[button.dataKey], 0);
  };

  return (
    <S.UIContainer data-ui-container>
      <div>
        <S.ContainerLabel1>
          HOW MANY WORKERS MAKE NIKE SHOES
        </S.ContainerLabel1>
        <S.ButtonContainer>
          {BUTTONS.map(button => (
            <div key={button.id}>
              <S.Button
                onClick={() => {
                  setWorkerType(button.id)
                  setSelectedCountry('')
                }}
                selected={workerType === button.id}
              >
                {button.label} Workers
              </S.Button>
              {workerType === button.id && (
                <S.ButtonInfo>
                  <AnimatedValue value={calculateWorkerSum(button.id)} />
                  <S.caption>{button.caption}</S.caption>
                </S.ButtonInfo>
              )}
            </div>
          ))}
        </S.ButtonContainer>
      </div>
      <div>
        <S.ContainerLabel2>
          <S.Icon src="/icon/ic_token-geo.svg" /> Countries
        </S.ContainerLabel2>
        <S.ButtonCountryContainer>
          {COUNTRIES.map(country => (
            <S.ButtonCountry
              key={country}
              onClick={() => toggleCountry(country)}
              selected={selectedCountry === country}
            >
              {country}
            </S.ButtonCountry>
          ))}
        </S.ButtonCountryContainer>
      </div>
    </S.UIContainer>
  )
}   