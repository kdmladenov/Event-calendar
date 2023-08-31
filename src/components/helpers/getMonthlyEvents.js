import {
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  startOfWeek
} from 'date-fns';

const getMonthlyEvents = (currentDate) => {
  let events = JSON?.parse(localStorage?.getItem('events') || '[]');
  let result = {};

  const interval = {
    start: startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 })
  };

   events?.length &&
     events?.forEach((event) => {
       let startDate = new Date(event.start);
       let endDate = new Date(event.end);

       event = { ...event, start: startDate, end: endDate };

       if (isWithinInterval(startDate, interval) || isWithinInterval(endDate, interval)) {
         if (isSameDay(startDate, endDate)) {
           let key = format(startDate, 'dd-MMM');
           result[key] = result[key]
             ? [...result[key], event].sort((a, b) => a.start - b.start)
             : [event];
         } else {
           // split
         }
       }
     });

  return result;
};

export default getMonthlyEvents;
