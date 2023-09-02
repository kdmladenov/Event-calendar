import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isEqual,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek
} from 'date-fns';
import './styles/MonthlyCalendar.css';
import getMonthlyEvents from './helpers/getMonthlyEvents';

const MonthlyCalendar = ({ currentDate, setSelectedDate }) => {
  const daysOfMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 })
  });

  // const onGridClickHandler = (day) => setSelectedDate(day);
  // const onGridDoubleClickHandler = (day) => {
  //   console.log('pop');
  // };
  // const onEventDoubleClickHandler = (event) => {
  //   console.log('ev');
  // };

  const monthlyEvents = getMonthlyEvents(currentDate);

  return (
    <div className="monthly-calendar flex fc">
      <ul className="weekday-labels">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((weekday) => (
          <li className={`weekday`} key={weekday}>
            <h3>{weekday}</h3>
          </li>
        ))}
      </ul>
      <ul
        className="days"
        style={{ gridTemplateRows: `repeat(${(daysOfMonth.length / 7).toFixed(0)}, 1fr)` }}
      >
        {daysOfMonth.map((day) => (
          <li
            style={{ height: `${((80 * 7) / daysOfMonth.length).toFixed(0)}vh` }}
            // onClick={() => onClickHandler(day)}
            // onDoubleClick={() => onDoubleClickHandler(day)}
            className={`flex ${isToday(day) ? 'today' : ''} ${
              isSameMonth(day, currentDate) ? 'current-month' : ''
            } ${isEqual(setSelectedDate, day) ? 'selected' : ''}`}
            key={day.toString()}
          >
            <div className="label">{format(day, 'd')}</div>
            <div className="events-list flex fc">
              {monthlyEvents[format(day, 'dd-MMM')]?.map((e, i) => (
                <div key={e?.title + `${i}`} className="event flex">
                  <div className="span">{e?.title}</div>
                  <div className="span">{format(e?.start, 'H:mm')}</div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlyCalendar;
