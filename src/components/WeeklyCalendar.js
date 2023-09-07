import { eachDayOfInterval, endOfWeek, format, isToday, startOfWeek } from 'date-fns';
import './styles/WeeklyCalendar.css';
import getWeeklyEvents from './helpers/getWeeklyEvents';

const WeeklyCalendar = ({ currentDate, setSelectedDate }) => {
  const daysOfWeek = eachDayOfInterval({
    start: startOfWeek(currentDate, { weekStartsOn: 1 }),
    end: endOfWeek(currentDate, { weekStartsOn: 1 })
  });

  const onGridClickHandler = (day) => setSelectedDate(day);
  const onGridDoubleClickHandler = (day) => {
    // setCurrentDate(day);
    // setSelectedDate(day);
    // setPeriods('weeks');
    console.log('pop');
  };
  const onEventDoubleClickHandler = (event) => {
    // setCurrentDate(day);
    // setSelectedDate(day);
    // setPeriods('weeks');
    console.log('ev');
  };

  const weekEvents = getWeeklyEvents(currentDate);

  return (
    <div className="weekly-calendar">
      <ul className="hourly-labels">
        {new Array(24).fill(null).map((_, index) => (
          <li key={index + 'h'} className="hour-label">
            {`${index}:00`}
          </li>
        ))}
      </ul>
      <ul className="weekday-labels">
        {daysOfWeek.map((day) => (
          <li className={`weekday ${isToday(day) ? 'today' : ''}`} key={day.toString() + 'label'}>
            <h3>{format(day, 'ccc dd')}</h3>
          </li>
        ))}
      </ul>
      <div className="days">
        <ul className="grid">
          {weekEvents.map((e, i) => (
            <div
              key={e.title + `${i}`}
              className="event"
              style={e.style}
              onDoubleClick={() => onEventDoubleClickHandler(e)}
            >
              <div className="span">{e?.title}</div>
              <div className="span">{`${format(e?.start, 'H:mm')} - ${format(e?.end, 'H:mm')}`}</div>
            </div>
          ))}
          {daysOfWeek.map((day) => (
            <li className="col" key={day.toString()}>
              {new Array(24).fill(null).map((_, index) => (
                <div
                  key={day.toString() + index + 'grid'}
                  className="row"
                  onClick={() => onGridClickHandler(day)}
                  onDoubleClick={() => onGridDoubleClickHandler(day)}
                ></div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeeklyCalendar;
