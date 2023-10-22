import { add, endOfToday } from 'date-fns';
import React from 'react';

const ButtonGroup = ({ currentDate, setCurrentDate, setSelectedDate, periods }) => {
  const today = endOfToday();
  const periodToggle = (direction) => {
    let firstDayNextMonth = add(currentDate, {
      [periods]: direction === 'prev' ? -1 : 1
    });
    setCurrentDate(firstDayNextMonth);
  };

  const todayHandler = () => {
    setCurrentDate(today);
    setSelectedDate(today);
  };
  return (
    <div className="btn-group">
      <button className="prev" onClick={() => periodToggle('prev')}>
        {'<'}
      </button>
      <button className="prev" onClick={todayHandler}>
        Today
      </button>
      <button className="next" onClick={() => periodToggle('next')}>
        {'>'}
      </button>
    </div>
  );
};

export default ButtonGroup;
