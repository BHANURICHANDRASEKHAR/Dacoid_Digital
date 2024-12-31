import toast from "react-hot-toast";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
export function onSuccess(msg)
{
    toast.success(msg);
}
export function onError(msg)
{
    toast.error(msg);
}


const isOverlapping = (newEvent, events) => {
  return events.some((event) => {
    if (event.selectedDate !== newEvent.selectedDate) return false;

    const newEventStart = dayjs(`${newEvent.selectedDate} ${newEvent.startTime}`);
    const newEventEnd = dayjs(`${newEvent.selectedDate} ${newEvent.endTime}`);
    const eventStart = dayjs(`${event.selectedDate} ${event.startTime}`);
    const eventEnd = dayjs(`${event.selectedDate} ${event.endTime}`);

    return (
      (newEventStart.isAfter(eventStart) && newEventStart.isBefore(eventEnd)) || // New start is within existing event
      (newEventEnd.isAfter(eventStart) && newEventEnd.isBefore(eventEnd)) ||   // New end is within existing event
      (newEventStart.isSameOrBefore(eventStart) && newEventEnd.isSameOrAfter(eventEnd)) // New event completely overlaps existing
    );
  });
};

export default function filter(data, events, setEventsData,EditIndex) {
  
  if (!data.startTime || !data.eventName || !data.selectedDate || !data.endTime) {
    onError("Please fill out all fields");
    return false;
  }
  if(EditIndex==data.id)
  {
   
    const newEvents=events.toSpliced(EditIndex,1)
   
    if (isOverlapping(data, newEvents)) {
      onError("Event time overlaps with an existing event");
      return false;
    }
    events[EditIndex]=data;
    setEventsData(events)
    localStorage.setItem('events', JSON.stringify(events));
    return true;

  }
  else{
    if (isOverlapping(data, events)) {
      onError("Event time overlaps with an existing event");
      return false;
    }
    const updatedEvents = [...events, data];
    setEventsData(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    onSuccess("Event added successfully");
    return true;
  }
}
