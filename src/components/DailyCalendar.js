import { format } from 'date-fns';
import './styles/DailyCalendar.css';
import getDailyEvents from './helpers/getDailyEvents';
import { useState } from 'react';
import Modal from './Modal';
import EventForm from './EventForm';

const DailyCalendar = ({ currentDate, setSelectedDate }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);

  const onGridClickHandler = (day) => setSelectedDate(day);
  const onGridDoubleClickHandler = (startHour) => {

    let start = new Date(new Date(currentDate).setHours(startHour, 0, 0));
    let end = new Date(new Date(currentDate).setHours(startHour + 1, 0, 0));
    setModalContent(
      <EventForm
        action="create"
        event={{ start, end }}
        currentDate={currentDate}
        setIsOpen={setModalIsOpen}
      />
    );
    setModalIsOpen(true);
  };

  const onEventDoubleClickHandler = (event) => {
    setModalContent(
      <EventForm action="edit" event={event} currentDate={currentDate} setIsOpen={setModalIsOpen} />
    );
    setModalIsOpen(true);
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
              <div className="span">{`${format(e?.start, 'H:mm')} - ${format(e?.end, 'H:mm')}`}</div>
            </div>
          ))}

          <li className="col">
            {new Array(24).fill(null).map((_, index) => (
              <div
                key={currentDate.toString() + index + 'grid'}
                className="row"
                onClick={() => onGridClickHandler(currentDate)}
                onDoubleClick={() => onGridDoubleClickHandler(index)}
              ></div>
            ))}
          </li>
        </ul>
      </div>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default DailyCalendar;
