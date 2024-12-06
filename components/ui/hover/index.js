import React from 'react';
import * as S from './styles';

const Tooltip = ({ tooltipData }) => {

  return (
    <S.TooltipContainer style={{ left: tooltipData ? tooltipData.position.x : 0, top: tooltipData ? tooltipData.position.y : 0, opacity: tooltipData ? 1 : 0 }}>
    {tooltipData && tooltipData.data &&   <>     <S.Title>
        {tooltipData.data.State} / {tooltipData.data["Country / Region"]}
      </S.Title>
      <S.Content>
        <S.Row>
          <span>TOTAL</span>
          <span>{tooltipData.data["Total Workers"].toLocaleString()}</span>
        </S.Row>
        <S.Row>
          <span>LINE</span>
          <span>{tooltipData.data["Line Workers"].toLocaleString()}</span>
        </S.Row>
        <S.Row>
          <span>FEMALE</span>
          <span>{tooltipData.data["Female Workers"].toLocaleString()}</span>
        </S.Row>
        <S.Row>
          <span>MIGRANT</span>
          <span>{tooltipData.data["Migrant Workers"].toLocaleString()}</span>
        </S.Row>
      </S.Content>
      </>}
 
    </S.TooltipContainer>
  );
};

export default Tooltip;
