import { Event } from '../lib/types';

// Function to validate if event start date is ahead of current date
export const isEventInFuture = (startDate: string): boolean => {
  try {
    const eventDate = new Date(startDate);
    const currentDate = new Date();
    return eventDate > currentDate;
  } catch {
    return false;
  }
};

// Function to validate if event start date is in the past
export const isEventInPast = (startDate: string): boolean => {
  try {
    const eventDate = new Date(startDate);
    const currentDate = new Date();
    return eventDate < currentDate;
  } catch {
    return false;
  }
};

// Function to get the next future event from a list of events
export const getNextFutureEvents = (events: Event[]): Event[] | null => {
  if (!Array.isArray(events) || events.length === 0) {
    return null;
  }

  const futureEvents = events.filter(
    event =>
      event &&
      typeof event.start_date === 'string' &&
      isEventInFuture(event.start_date)
  );

  if (futureEvents.length === 0) {
    return null;
  }

  // Sort by start date and return the earliest future event
  return futureEvents.sort(
    (a, b) =>
      new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  );
};

// Function to get past events from a list of events
export const getPastEvents = (events: Event[]): Event[] | null => {
  if (!Array.isArray(events) || events.length === 0) {
    return null;
  }

  const pastEvents = events.filter(
    event =>
      event &&
      typeof event.start_date === 'string' &&
      isEventInPast(event.start_date)
  );

  if (pastEvents.length === 0) {
    return null;
  }

  // Sort by start date (most recent first) and return past events
  return pastEvents.sort(
    (a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );
};
