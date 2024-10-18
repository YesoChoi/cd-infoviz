// components/WorkerDiagram.js
export default function WorkerDiagram({ data }) {
  // 데이터가 존재하는지 확인
  if (!data) {
    return <div>No data available.</div>;
  }

  const { totalWorkers, lineWorkers } = data;

  // 데이터가 0일 경우 표시되지 않도록 기본값 설정
  if (totalWorkers === 0 || lineWorkers === 0) {
    return <div>No workers available for this country.</div>;
  }

  // 다이어그램 크기 계산: total workers에 따라 크기를 비례적으로 조정
  const maxBoxWidth = 1500; // solid box의 최대 너비
  const maxBoxHeight = 500; // solid box의 최대 높이
  const totalWorkerPercentage = Math.min((totalWorkers / 335536) * 100, 100); // 최대 근로자 수 기준 비율
  const lineWorkerPercentage = (lineWorkers / totalWorkers) * 100;

  // solid box와 striped box의 너비와 높이 계산
  const solidBoxWidth = (totalWorkerPercentage / 100) * maxBoxWidth;
  const solidBoxHeight = maxBoxHeight;
  const stripedBoxWidth = (lineWorkerPercentage / 100) * solidBoxWidth;
  const stripedBoxHeight = solidBoxHeight;

  // 디버그용 데이터 출력 (콘솔에서 확인)
  console.log('Total Workers:', totalWorkers);
  console.log('Line Workers:', lineWorkers);
  console.log('Solid Box Width:', solidBoxWidth);
  console.log('Striped Box Width:', stripedBoxWidth);

  return (
    <div style={styles.container}>
      {/* Solid box for total workers */}
      <div
        style={{
          ...styles.solidBox,
          width: `${solidBoxWidth}px`,
          height: `${solidBoxHeight}px`,
        }}
      >
        <span style={styles.label}>Total Workers: {totalWorkers}</span>
      </div>

      {/* Striped box for line workers */}
      <div
        style={{
          ...styles.stripedBox,
          width: `${stripedBoxWidth}px`,
          height: `${stripedBoxHeight}px`,
        }}
      >
        <span style={styles.label}>Line Workers: {lineWorkers}</span>
      </div>
    </div>
  );
}

// 스타일 정의
const styles = {
  container: {
    position: 'relative',
    width: '300px', // 다이어그램의 최대 너비
    height: '100px', // 다이어그램의 최대 높이
    marginTop: '20px',
    border: '1px solid #ccc',
    backgroundColor: '#eef2f7', // 기본 배경색
  },
  solidBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#d0e1f2', // Solid box의 배경색
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #aac',
    boxSizing: 'border-box', // Border 크기를 포함
  },
  stripedBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.5) 5px, rgba(255,255,255,0.5) 10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    border: '1px solid #aac',
  },
  label: {
    fontSize: '12px',
    color: '#333',
    zIndex: 1, // 텍스트가 박스 위에 표시되도록 함
  },
};
