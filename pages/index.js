// pages/index.js
import { useState } from 'react';
import WorkerDiagram from '/components/v2/WorkerDiagram';

// 신발 구성 요소별 국가 및 국가별 근로자 데이터
const shoeData = {
  Upper: ['Vietnam', 'China', 'Taiwan', 'Indonesia', 'Japan', 'Thailand', 'South Korea'],
  Sole: ['Indonesia', 'Vietnam', 'South Korea'],
  'Sub-material': ['Vietnam', 'China'],
  'Finished Goods': [
    'Vietnam', 'Indonesia', 'China', 'India', 'Brazil', 
    'Taiwan', 'South Korea', 'Bosnia', 'Italy', 'Argentina', 'Japan'
  ],
};

// 구성 요소별 국가별 근로자 데이터
const workerData = {
  Upper: {
    Vietnam: { totalWorkers: 10167, lineWorkers: 8640 },
    China: { totalWorkers: 7513, lineWorkers: 5637 },
    Taiwan: { totalWorkers: 4298, lineWorkers: 2672 },
    Indonesia: { totalWorkers: 2454, lineWorkers: 1711 },
    Japan: { totalWorkers: 1883, lineWorkers: 1560 },
    Thailand: { totalWorkers: 1132, lineWorkers: 812 },
    'South Korea': { totalWorkers: 522, lineWorkers: 283 },
  },
  Sole: {
    Indonesia: { totalWorkers: 816, lineWorkers: 643 },
    Vietnam: { totalWorkers: 323, lineWorkers: 178 },
    'South Korea': { totalWorkers: 105, lineWorkers: 50 },
  },
  'Sub-material': {
    Vietnam: { totalWorkers: 5918, lineWorkers: 4489 },
    China: { totalWorkers: 1800, lineWorkers: 950 },
  },
  'Finished Goods': {
    Vietnam: { totalWorkers: 335536, lineWorkers: 296842 },
    Indonesia: { totalWorkers: 237600, lineWorkers: 208917 },
    China: { totalWorkers: 84689, lineWorkers: 71621 },
    India: { totalWorkers: 29773, lineWorkers: 28083 },
    Brazil: { totalWorkers: 13015, lineWorkers: 11555 },
    Taiwan: { totalWorkers: 4213, lineWorkers: 1097 },
    'South Korea': { totalWorkers: 2507, lineWorkers: 905 },
    Bosnia: { totalWorkers: 1998, lineWorkers: 1835 },
    Italy: { totalWorkers: 501, lineWorkers: 425 },
    Argentina: { totalWorkers: 340, lineWorkers: 330 },
    Japan: { totalWorkers: 5, lineWorkers: 4 },
  },
};

export default function Home() {
  // 상태 관리: 선택된 구성 요소 및 국가
  const [selectedType, setSelectedType] = useState('Upper');
  const [selectedCountry, setSelectedCountry] = useState(shoeData['Upper'][0]);

  // 탭 선택 시 호출되는 함수
  const handleTypeChange = (type) => {
    setSelectedType(type);
    setSelectedCountry(shoeData[type][0]); // 첫 번째 국가를 기본값으로 설정
  };

  // 국가 선택 시 호출되는 함수
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div>
      {/* 구성 요소 선택 탭 */}
      <div style={styles.tabContainer}>
        {Object.keys(shoeData).map((type) => (
          <button
            key={type}
            onClick={() => handleTypeChange(type)}
            style={selectedType === type ? styles.activeTab : styles.tab}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 국가 선택 드롭다운 */}
      <select value={selectedCountry} onChange={handleCountryChange} style={styles.dropdown}>
        {shoeData[selectedType].map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* 근로자 다이어그램 */}
      {workerData[selectedType][selectedCountry] ? (
        <WorkerDiagram data={workerData[selectedType][selectedCountry]} />
      ) : (
        <p>No data available for this country.</p>
      )}
    </div>
  );
}

// 간단한 스타일 정의
const styles = {
  tabContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
  },
  activeTab: {
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#d0e1f2',
    border: '1px solid #aaa',
  },
  dropdown: {
    margin: '20px 0',
    padding: '10px',
    fontSize: '16px',
  },
};