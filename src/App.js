import { endOfToday, format } from 'date-fns';
import './App.css';
import { useState } from 'react';
import ButtonGroup from './components/ButtonGroup';
import PeriodsToggle from './components/PeriodsToggle';
import AnnualCalendar from './components/AnnualCalendar';
import WeeklyCalendar from './components/WeeklyCalendar';
import DailyCalendar from './components/DailyCalendar';
import MonthlyCalendar from './components/MonthlyCalendar';

const App = () => {
  const today = endOfToday();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentDate, setCurrentDate] = useState(today);
  const [periods, setPeriods] = useState('months');

  return (
    <div className="calendar flex fc">
      <PeriodsToggle periods={periods} setPeriods={setPeriods} />
      <div className="header flex space-b">
        <h2>{format(currentDate, periods === 'years' ? 'yyyy' : 'MMM yyyy')}</h2>
        <ButtonGroup
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          setSelectedDate={setSelectedDate}
          periods={periods}
        />
      </div>
      {periods === 'days' ? (
        <DailyCalendar currentDate={currentDate} setSelectedDate={setSelectedDate} />
      ) : periods === 'weeks' ? (
        <WeeklyCalendar currentDate={currentDate} setSelectedDate={setSelectedDate} />
      ) : periods === 'months' ? (
        <MonthlyCalendar
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setPeriods={setPeriods}
        />
      ) : (
        <AnnualCalendar
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setPeriods={setPeriods}
        />
      )}
    </div>
  );
};

export default App;
