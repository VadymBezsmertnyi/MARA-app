import { TEvents, TUpcomingEvent } from "./events.types";

export const getSortEvents = (oldEvents: TEvents): TUpcomingEvent[] => {
  const nowDateMilliseconds = new Date().getTime();
  return oldEvents
    .map((event) => ({
      ...event,
      isNow:
        event.date.start < nowDateMilliseconds &&
        event.date.finish > nowDateMilliseconds,
      isOld: event.date.finish < nowDateMilliseconds,
    }))
    .sort((a, b) => {
      if (a.isNow) return -1;
      if (b.isNow) return 1;
      if (a.isOld) return 1;
      if (b.isOld) return -1;
      return a.date.start < b.date.start ? -1 : 1;
    });
};
