import { getDay, intervalToDuration, isSameDay, isSameWeek } from 'date-fns';

const DAY_TO_WEEK_RATIO = 1 / 7;

const getWeeklyEvents = (currentDate) => {
  let events = JSON?.parse(localStorage?.getItem('events') || '[]');
  let result = [];

   events?.length &&
     events?.forEach((event) => {
       let startDate = new Date(event.start);
       let endDate = new Date(event.end);
       event = { ...event, start: startDate, end: endDate };
       if (
         isSameWeek(startDate, currentDate, { weekStartsOn: 1 }) ||
         isSameWeek(endDate, currentDate, { weekStartsOn: 1 })
       ) {
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

           let left = `${
             DAY_TO_WEEK_RATIO *
             100 *
             (getDay(startDate) === 0 ? 6 : getDay(startDate) - 1).toFixed(2)
           }%`;

           let concurrentTasks = 1; // TO DO

           let width = `${((DAY_TO_WEEK_RATIO * 100) / concurrentTasks).toFixed(2)}%`;

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

export default getWeeklyEvents;
