import { eachMonthOfInterval, endOfYear, format, startOfYear } from 'date-fns';
import React from 'react';
import './styles/AnnualCalendar.css';
import MonthlySmallCalendar from './MonthlySmallCalendar';

const AnnualCalendar = ({
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
  setPeriods
}) => {
  const monthsOfYear = eachMonthOfInterval({
    start: startOfYear(currentDate),
    end: endOfYear(currentDate)
  });
  return (
    <ul className="annual-calendar">
      {monthsOfYear.map((startOfMonth) => (
        <div className="container" key={format(startOfMonth, 'MMM-yyyy')}>
          <h1>{format(startOfMonth, 'MMMM')}</h1>
          <MonthlySmallCalendar
            currentDate={startOfMonth}
            setCurrentDate={setCurrentDate}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setPeriods={setPeriods}
          />
        </div>
      ))}
    </ul>
  );
};

export default AnnualCalendar;
