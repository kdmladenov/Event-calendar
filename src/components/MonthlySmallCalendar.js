import {
  eachDayOfInterval,
  endOfMonth,
  endOfToday,
  endOfWeek,
  format,
  isEqual,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek
} from 'date-fns';
import './styles/MonthlySmallCalendar.css';
import getMonthlyEvents from './helpers/getMonthlyEvents';

const MonthlySmallCalendar = ({
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
  setPeriods
}) => {
  const today = endOfToday();
  const daysOfMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 })
  });

  const onClickHandler = (day) => setSelectedDate(day);
  const onDoubleClickHandler = (day) => {
    setCurrentDate(day);
    setSelectedDate(day);
    setPeriods('weeks');
  };
  const monthlyEvents = getMonthlyEvents(currentDate);

  return (
    <div className="monthly-small-calendar flex fc">
      <ul className="weekdays week">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((weekday, indx) => (
          <li className="flex" key={indx}>
            {weekday}
          </li>
        ))}
      </ul>
      <ul className="days week">
        {daysOfMonth.map((day) => (
          <li
            className={`flex fc ${isToday(day) ? 'today' : ''} ${
              isSameMonth(day, currentDate) ? 'current-month' : ''
            } ${isEqual(selectedDate, day) ? 'selected' : ''}`}
            key={day.toString()}
          >
            <button
              onClick={() => onClickHandler(day)}
              onDoubleClick={() => onDoubleClickHandler(day)}
            >
              {format(day, 'd')}
            </button>

            <div
              className={`dot ${monthlyEvents[format(day, 'dd-MMM')]?.length ? '' : 'hidden'}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlySmallCalendar;
