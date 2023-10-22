import {
  add,
  eachDayOfInterval,
  eachMinuteOfInterval,
  endOfDay,
  format,
  intervalToDuration,
  isAfter,
  isBefore,
  isSameDay,
  isWithinInterval,
  startOfDay
} from 'date-fns';
import React, { useEffect, useState } from 'react';
import './styles/EventForm.css';

const INTERVAL_TEP_IN_MIN = 15;

const EventForm = ({ currentDate, event, action, setIsOpen }) => {
  const [allEvents, setAllEvents] = useState(JSON?.parse(localStorage?.getItem('events') || '[]'));
  const [newEvent, setNewEvent] = useState({});
  const [hourIntervals, setHourIntervals] = useState(
    eachMinuteOfInterval(
      {
        start: startOfDay(newEvent.start),
        end: endOfDay(newEvent.start)
      },
      { step: INTERVAL_TEP_IN_MIN }
    )
  );
  console.log(newEvent, 'newEvent');

  const dayIntervals = eachDayOfInterval({
    start: add(startOfDay(currentDate), { days: -15 }),
    end: add(startOfDay(currentDate), { days: 15 })
  });

  const submitHandler = (e) => {
    e.preventDefault();

    if (action === 'edit') {
      let allOtherEventInLS = allEvents?.filter((e) => e.id !== event.id);
      localStorage.setItem('events', JSON.stringify([...allOtherEventInLS, newEvent]));
    } else {
      allEvents?.length
        ? localStorage.setItem('events', JSON.stringify([...allEvents, newEvent]))
        : localStorage.setItem('events', JSON.stringify([newEvent]));
    }
    setIsOpen(false);
  };

  const deleteHandler = (e, eventId) => {
    e.preventDefault();
    const filtered = allEvents.filter((e) => e.id !== eventId);
    localStorage.setItem('events', JSON.stringify(filtered));
    setAllEvents(filtered);
    setIsOpen(false);
  };

  const inputTitleHandler = (e) => {
    e.preventDefault();
    setNewEvent({ ...newEvent, title: e.target.value });
  };

  const inputTimeHandler = (e, type) => {
    e.preventDefault();
    setNewEvent({ ...newEvent, [type]: e.target.value });
  };

  const inputDateHandler = (e) => {
    e.preventDefault();
    const selectedDate = new Date(e.target.value);
    console.log(selectedDate, selectedDate instanceof Date, 'selectedDate');

    const { days } = intervalToDuration({ start: newEvent?.start, end: selectedDate });
    console.log(days, 'days');
    let sign = days === 0 || isBefore(newEvent?.start, selectedDate) ? +1 : -1;

    console.log(sign, 'sign * days');
    setNewEvent({
      ...newEvent,
      start: add(newEvent?.start, { days: sign * days }),
      end: add(newEvent?.end, { days: sign * days })
    });
  };

  useEffect(() => {
    if (action === 'edit' && event?.id) {
      const { id, title, start, end } = event;
      setNewEvent({ id, title, start: new Date(start), end: new Date(end) });
    } else {
      const { start, end } = event;
      setNewEvent({
        id: (Math.random() * 10 ** 6).toFixed(0),
        start: new Date(start),
        end: new Date(end)
      });
    }
  }, []);

  useEffect(() => {
    setHourIntervals(
      eachMinuteOfInterval(
        {
          start: startOfDay(new Date(newEvent.start)),
          end: endOfDay(new Date(newEvent.end))
        },
        { step: INTERVAL_TEP_IN_MIN }
      )
    );
  }, [newEvent]);

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="title">
        Title
        <input
          id="title"
          value={newEvent?.title || ''}
          placeholder={'Event title...'}
          onChange={inputTitleHandler}
        />
      </label>
      <label htmlFor="date">
        Date
        <select id="date" value={newEvent?.start} onChange={inputDateHandler}>
          {dayIntervals.map((day) => {
            return (
              <option value={day} key={day + 'day'}>
                {format(day, 'ccc dd')}
              </option>
            );
          })}
        </select>
      </label>
      <label htmlFor="start">
        Start
        <select
          id="start"
          value={newEvent?.start || new Date()}
          onChange={(e) => inputTimeHandler(e, 'start')}
        >
          {hourIntervals.map((time) => (
            <option disabled={time > newEvent?.end} value={new Date(time)} key={time + 'start'}>
              {format(time, 'HH:mm')}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="end">
        End
        <select
          id="end"
          value={newEvent?.end || new Date()}
          onChange={(e) => inputTimeHandler(e, 'end')}
        >
          {hourIntervals.map((time) => (
            <option disabled={time < newEvent?.start} value={new Date(time)} key={time + 'end'}>
              {format(time, 'HH:mm')}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">{`${action[0].toUpperCase()}${action.slice(1)}`}</button>
      <button onClick={(e) => deleteHandler(e, newEvent.id)}>Delete</button>
    </form>
  );
};

export default EventForm;
