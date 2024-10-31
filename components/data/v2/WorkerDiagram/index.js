import * as S from './styles';

export default function WorkerDiagram({ data }) {
  if (!data) {
    return <div>No data available.</div>;
  }

  const { totalWorkers, lineWorkers } = data;

  if (totalWorkers === 0 || lineWorkers === 0) {
    return <div>No workers available for this country.</div>;
  }

  const maxBoxWidth = 1500;
  const maxBoxHeight = 500;
  const totalWorkerPercentage = Math.min((totalWorkers / 335536) * 100, 100);
  const lineWorkerPercentage = (lineWorkers / totalWorkers) * 100;

  const solidBoxWidth = (totalWorkerPercentage / 100) * maxBoxWidth;
  const solidBoxHeight = maxBoxHeight;
  const stripedBoxWidth = (lineWorkerPercentage / 100) * solidBoxWidth;
  const stripedBoxHeight = solidBoxHeight;

  return (
    <S.Container>
      <S.SolidBox width={solidBoxWidth} height={solidBoxHeight}>
        <S.Label>Total Workers: {totalWorkers}</S.Label>
      </S.SolidBox>
      <S.StripedBox width={stripedBoxWidth} height={stripedBoxHeight}>
        <S.Label>Line Workers: {lineWorkers}</S.Label>
      </S.StripedBox>
    </S.Container>
  );
}