import { useState } from 'react';
import WorkerDiagram from './WorkerDiagram';
import { shoeData, workerData } from './_data';
import  * as S from './styles';

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
    <S.Container>
      <S.TabContainer>
        {Object.keys(shoeData).map((type) => (
          <S.Tab
            key={type}
            onClick={() => handleTypeChange(type)}
            active={selectedType === type}
          >
            {type}
          </S.Tab>
        ))}
      </S.TabContainer>

      <S.Dropdown value={selectedCountry} onChange={handleCountryChange}>
        {shoeData[selectedType].map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </S.Dropdown>

      {workerData[selectedType][selectedCountry] ? (
        <WorkerDiagram data={workerData[selectedType][selectedCountry]} />
      ) : (
        <p>No data available for this country.</p>
      )}
    </S.Container>
  );
}
