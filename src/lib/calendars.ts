import type { CollectionEntry } from 'astro:content';

type Calendar = CollectionEntry<'calendars'>['data'];

/** Opens Google Calendar with a prompt to add (subscribe to) the calendar. */
export function subscribeUrl(calendar: Calendar) {
  return `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(calendar.calendarId)}`;
}

/** iCal feed for Apple Calendar, Outlook and others. */
export function icalUrl(calendar: Calendar) {
  return `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendar.calendarId)}/public/basic.ics`;
}
