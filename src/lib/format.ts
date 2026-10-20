const TIME_ZONE = 'America/Los_Angeles';

/** "Sat, Nov 14" */
export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/** "6:00 pm" (the site's one time format; see docs/content.md §1). */
export function formatClock(date: Date) {
  return date
    .toLocaleTimeString('en-US', { timeZone: TIME_ZONE, hour: 'numeric', minute: '2-digit' })
    .replace(' AM', ' am')
    .replace(' PM', ' pm');
}

/** Human-readable date and time for a calendar event. */
export function formatEventWhen(event: { start: string; end: string; allDay: boolean }) {
  if (event.allDay) {
    // All-day events are plain dates; anchor them at noon to avoid timezone shifts.
    return formatDate(new Date(`${event.start}T12:00:00`));
  }
  const start = new Date(event.start);
  const end = new Date(event.end);
  return `${formatDate(start)} · ${formatClock(start)} – ${formatClock(end)}`;
}
