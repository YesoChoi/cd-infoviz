import React from 'react';
import * as S from './styles';

const Tooltip = ({ data, position }) => {
  if (!data) return null;

  return (
    <S.TooltipContainer style={{ left: position.x, top: position.y }}>
      <S.Title>
        {data.State} / {data["Country / Region"]}
      </S.Title>
      <S.Content>
        <S.Row>
          <span>TOTAL</span>
          <span>{data["Total Workers"].toLocaleString()}</span>
        </S.Row>
        <S.Row>
          <span>LINE</span>
          <span>{data["Line Workers"].toLocaleString()}</span>
        </S.Row>
        <S.Row>
          <span>FEMALE</span>
          <span>{data["Female Workers"].toLocaleString()}</span>
        </S.Row>
        <S.Row>
          <span>MIGRANT</span>
          <span>{data["Migrant Workers"].toLocaleString()}</span>
        </S.Row>
      </S.Content>
    </S.TooltipContainer>
  );
};

export default Tooltip;
