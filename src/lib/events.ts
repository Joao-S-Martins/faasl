import { getCollection, type CollectionEntry } from 'astro:content';
import { isVisible } from './site';
import { localDateOf } from './format';

type CalendarEvent = CollectionEntry<'events'>;
type Writeup = CollectionEntry<'eventWriteups'>;

/** Calendars whose events get their own pages. Lessons and rehearsals don't. */
export const PAGE_CALENDARS = ['performances', 'social'];

export function slugify(text: string) {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** "2026-11-07-festival-das-filarmonicas-2026": date + title, stable while both are. */
export function eventSlug(event: CalendarEvent['data']) {
  return `${localDateOf(event)}-${slugify(event.title)}`;
}

export interface EventPage {
  slug: string;
  /** The calendar entry while the event is upcoming. */
  event?: CalendarEvent['data'];
  /** A write-up keeps the page after the event has passed. */
  writeup?: Writeup;
}

/**
 * Every event page: upcoming performances and social events from the
 * calendar, plus any event with a write-up (kept after it has passed).
 * Past events without a write-up drop off at the next weekly refresh.
 */
export async function getEventPages(): Promise<EventPage[]> {
  const today = new Date().toISOString().slice(0, 10);
  const events = (
    await getCollection('events', ({ data }) => PAGE_CALENDARS.includes(data.calendar.id))
  ).filter(({ data }) => data.end.slice(0, 10) >= today);
  const writeups = await getCollection('eventWriteups', isVisible);

  const pages = new Map<string, EventPage>();
  for (const { data } of events) {
    let slug = eventSlug(data);
    // Two events with the same date and title get -2, -3…
    for (let n = 2; pages.has(slug); n++) slug = `${eventSlug(data)}-${n}`;
    pages.set(slug, { slug, event: data });
  }
  for (const writeup of writeups) {
    const page = pages.get(writeup.id) ?? { slug: writeup.id };
    pages.set(writeup.id, { ...page, writeup });
  }
  return [...pages.values()];
}

/** The page address for a calendar event, if it has one. */
export function eventHref(event: CalendarEvent['data']) {
  return PAGE_CALENDARS.includes(event.calendar.id) ? `/events/${eventSlug(event)}` : undefined;
}
