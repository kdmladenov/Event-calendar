import { intervalToDuration, isSameDay } from 'date-fns';

const getDailyEvents = (currentDate) => {
  let events = JSON.parse(localStorage.getItem('events') || '[]');
  let result = [];

  events?.length &&
    events?.forEach((event) => {
      let startDate = new Date(event.start);
      let endDate = new Date(event.end);
      event = { ...event, start: startDate, end: endDate };

      if (isSameDay(startDate, currentDate) || isSameDay(endDate, currentDate)) {
        if (isSameDay(startDate, endDate)) {
          let duration = intervalToDuration({
            start: startDate,
            end: endDate
          });

          let height = `${(((duration.hours * 60 + duration.minutes) * 100) / (60 * 24)).toFixed(
            2
          )}%`;

          let top = `${(
            ((startDate.getHours() * 60 + startDate.getMinutes()) * 100) /
            (60 * 24)
          ).toFixed(2)}%`;

          let concurrentTasks = 1; // TO DO
          let left = `0%`; // To update with concurrency

          let width = `100%`; // To update with concurrency

          result.push({
            ...event,
            style: {
              top,
              height,
              left,
              width
            }
          });
        } else {
          // split
        }
      }
    });

  return result;
};

export default getDailyEvents;
