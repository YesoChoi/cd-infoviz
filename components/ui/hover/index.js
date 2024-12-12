import React, { useRef, useEffect, useState } from 'react';
import * as S from './styles';
import * as UI from '../styles';

const Tooltip = ({ tooltipData, workerType }) => {
  const tooltipRef = useRef(null);

  // workerType에 따른 데이터 키와 레이블 매핑
  const workerTypeMap = {
    total: { key: "Total Workers", label: "Total Workers" },
    line: { key: "Line Workers", label: "Line Workers" },
    female: { key: "Female Workers", label: "Female Workers" },
    migrant: { key: "Migrant Workers", label: "Migrant Workers" }
  };

  // 디버깅을 위한 console.log 추가
  console.log({
    tooltipData,
    workerType,
    mappedKey: workerTypeMap[workerType]?.key,
    workerCount: tooltipData?.data?.[workerTypeMap[workerType]?.key]
  });

  // 안전하게 데이터 접근
  const workerCount = tooltipData?.data?.[workerTypeMap[workerType]?.key];

  return (
    <S.TooltipContainer
      ref={tooltipRef}
      style={{
        opacity: tooltipData ? 1 : 0,
        pointerEvents: tooltipData ? 'auto' : 'none',
      }}
    >
      {tooltipData?.data && (
        <>
          <S.Title>
            {tooltipData.data.State}
            <S.Subtitle>
              {tooltipData.data["Country / Region"]}
            </S.Subtitle>
          </S.Title>
          <S.Content>
            <S.Row>
              <span>{workerTypeMap[workerType]?.label}</span>
              <UI.h1 style={{ textAlign: 'right' }}>
                {workerCount?.toLocaleString()}
              </UI.h1>
            </S.Row>
          </S.Content>
        </>
      )}
    </S.TooltipContainer>
  );
};

export default Tooltip;
