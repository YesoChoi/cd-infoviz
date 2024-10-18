import { useState } from 'react';
import WorkerDiagram from './WorkerDiagram';
import { shoeData, workerData } from './data';

export default function ShoeWorkerDisplay() {
  const [selectedType, setSelectedType] = useState('Upper');
  const [selectedCountry, setSelectedCountry] = useState(shoeData['Upper'][0]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setSelectedCountry(shoeData[type][0]);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div>
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

      <select value={selectedCountry} onChange={handleCountryChange} style={styles.dropdown}>
        {shoeData[selectedType].map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {workerData[selectedType][selectedCountry] ? (
        <WorkerDiagram data={workerData[selectedType][selectedCountry]} />
      ) : (
        <p>No data available for this country.</p>
      )}
    </div>
  );
}

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

