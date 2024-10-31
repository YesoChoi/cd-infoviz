import React from 'react';

const CountrySelector = ({ countries, onSelectCountry }) => (
  <select onChange={(e) => onSelectCountry(e.target.value)}>
    <option value="">Select a country</option>
    {countries.map((country) => (
      <option key={country} value={country}>
        {country}
      </option>
    ))}
  </select>
);

export default CountrySelector;
