import { format } from 'date-fns';
import './styles/DailyCalendar.css';
import getDailyEvents from './helpers/getDailyEvents';

const DailyCalendar = ({ currentDate, setSelectedDate }) => {
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

  const dayEvents = getDailyEvents(currentDate);

  return (
    <div className="daily-calendar">
      <ul className="hourly-labels">
        {new Array(24).fill(null).map((_, index) => (
          <li key={index + 'h'} className="hour-label">
            {`${index}:00`}
          </li>
        ))}
      </ul>
      <ul className="weekday-labels">
        <h3>{format(currentDate, 'ccc dd')}</h3>
      </ul>
      <div className="days">
        <ul className="grid">
          {dayEvents.map((e, i) => (
            <div
              key={e.title + `${i}`}
              className="event"
              style={e.style}
              onDoubleClick={() => onEventDoubleClickHandler(e)}
            >
              <div className="span">{e?.title}</div>
              <div className="span">{`${format(e?.start, 'H:m')} - ${format(e?.end, 'H:m')}`}</div>
            </div>
          ))}

          <li className="col">
            {new Array(24).fill(null).map((_, index) => (
              <div
                key={currentDate.toString() + index + 'grid'}
                className="row"
                onClick={() => onGridClickHandler(currentDate)}
                onDoubleClick={() => onGridDoubleClickHandler(currentDate)}
              ></div>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DailyCalendar;
