import React from 'react';
import './styles/PeriodsToggle.css';

const PeriodsToggle = ({ periods, setPeriods }) => {
  const periodsMap = {
    Day: 'days',
    Week: 'weeks',
    Month: 'months',
    Year: 'years'
  };
  return (
    <div className="periods-toggle flex">
      {['Day', 'Week', 'Month', 'Year'].map((period) => (
        <button
          key={period}
          className={`flex ${periods === periodsMap[period] ? 'selected' : ''}`}
          onClick={() => setPeriods(periodsMap[period])}
        >
          {period}
        </button>
      ))}
    </div>
  );
};

export default PeriodsToggle;
