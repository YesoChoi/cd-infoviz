import { useState } from "react";
import CountrySelector from "./CountrySelector";
import WorkerDiagram from "./WorkerDiagram";

const countriesData = [
  { country: "Vietnam", totalWorkers: 3263, lineWorkers: 2410 },
  { country: "Taiwan", totalWorkers: 3302, lineWorkers: 2046 },
  { country: "China", totalWorkers: 2782, lineWorkers: 1942 },
  { country: "Japan", totalWorkers: 1700, lineWorkers: 1400 },
  { country: "Indonesia", totalWorkers: 543, lineWorkers: 382 },
  { country: "South Korea", totalWorkers: 294, lineWorkers: 153 },
];

const WorkerDisplay = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const selectedData = selectedCountry
    ? countriesData.find((c) => c.country === selectedCountry)
    : null;

  return (
    <div>
      <CountrySelector
        countries={countriesData.map((c) => c.country)}
        onSelectCountry={setSelectedCountry}
      />
      {selectedData && (
        <WorkerDiagram
          totalWorkers={selectedData.totalWorkers}
          lineWorkers={selectedData.lineWorkers}
        />
      )}
    </div>
  );
};

export default WorkerDisplay;