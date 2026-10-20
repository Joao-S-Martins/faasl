#!/usr/bin/env node
// Copies upcoming events from the public Google Calendars into
// src/content/events.json, which the site lists at build time.
//
//   node scripts/fetch-events.mjs              fetch the live calendars, write events.json
//   node scripts/fetch-events.mjs --sample     use scripts/fixtures/*.ics instead (offline)
//   node scripts/fetch-events.mjs --report     print a summary only, don't write
//   node scripts/fetch-events.mjs --months 6   how far ahead to look (default 12)
//
// The output has no timestamps, so an unchanged calendar produces an identical
// file and the weekly content release can skip it (docs/deployment.md §6).
// Any fetch or parse error exits non-zero, so nothing stale or broken ships.

import { readFile, writeFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';
import ICAL from 'ical.js';
import YAML from 'yaml';

const ROOT = new URL('../', import.meta.url);
const OUTPUT = new URL('src/content/events.json', ROOT);
const TIME_ZONE = 'America/Los_Angeles';
const MAX_OCCURRENCES = 500;

const { values: args } = parseArgs({
  options: {
    sample: { type: 'boolean', default: false },
    report: { type: 'boolean', default: false },
    months: { type: 'string', default: '12' },
  },
});

const calendars = YAML.parse(await readFile(new URL('src/content/calendars.yaml', ROOT), 'utf8'));
const listed = calendars.filter((calendar) => calendar.listEvents);

// Window: from the start of today (Pacific) to N months ahead.
const today = new Date(new Date().toLocaleDateString('en-CA', { timeZone: TIME_ZONE }));
const windowStart = ICAL.Time.fromJSDate(today, true);
const windowEnd = windowStart.clone();
windowEnd.month += Number(args.months);

const events = [];
for (const calendar of listed) {
  const ics = await loadCalendar(calendar);
  events.push(...expand(ics, calendar.id));
}
events.sort((a, b) => a.start.localeCompare(b.start) || a.title.localeCompare(b.title));

if (args.report) {
  printReport(events);
} else {
  await writeFile(OUTPUT, JSON.stringify(events, null, 2) + '\n');
  console.log(`Wrote ${events.length} events to ${OUTPUT.pathname}`);
}

async function loadCalendar(calendar) {
  if (args.sample) {
    return readFile(new URL(`scripts/fixtures/${calendar.id}.ics`, ROOT), 'utf8');
  }
  const url = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendar.calendarId)}/public/basic.ics`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${calendar.id}: ${response.status} ${response.statusText}`);
  const text = await response.text();
  if (!text.startsWith('BEGIN:VCALENDAR')) throw new Error(`${calendar.id}: not an iCalendar feed`);
  return text;
}

/** Turns one iCalendar feed into a flat list of occurrences inside the window. */
function expand(ics, calendarId) {
  const root = new ICAL.Component(ICAL.parse(ics));
  for (const vtimezone of root.getAllSubcomponents('vtimezone')) {
    ICAL.TimezoneService.register(new ICAL.Timezone(vtimezone));
  }

  // Group by UID so moved or edited single occurrences override their series.
  const series = new Map();
  const exceptions = [];
  for (const vevent of root.getAllSubcomponents('vevent')) {
    const event = new ICAL.Event(vevent);
    if (event.isRecurrenceException()) exceptions.push(event);
    else series.set(event.uid, event);
  }
  for (const exception of exceptions) series.get(exception.uid)?.relateException(exception);

  const results = [];
  for (const event of series.values()) {
    if (event.component.getFirstPropertyValue('status') === 'CANCELLED') continue;

    const iterator = event.iterator();
    for (let i = 0, next; i < MAX_OCCURRENCES && (next = iterator.next()); i++) {
      if (next.compare(windowEnd) >= 0) break;
      const details = event.getOccurrenceDetails(next);
      if (details.endDate.compare(windowStart) <= 0) continue;
      if (details.item.component.getFirstPropertyValue('status') === 'CANCELLED') continue;
      results.push(toEvent(details, calendarId));
      if (!event.isRecurring()) break;
    }
  }
  return results;
}

function toEvent({ item, startDate, endDate }, calendarId) {
  const allDay = startDate.isDate;
  const start = allDay ? startDate.toString() : startDate.toJSDate().toISOString();
  return {
    id: `${calendarId}-${item.uid}-${start}`.replace(/[^\w.-]+/g, '-'),
    calendar: calendarId,
    title: clean(item.summary),
    start,
    end: allDay ? endDate.toString() : endDate.toJSDate().toISOString(),
    allDay,
    location: clean(item.location) || undefined,
    description: htmlToText(item.description) || undefined,
    sample: args.sample || undefined,
  };
}

function clean(text) {
  return (text ?? '').replace(/\s+/g, ' ').trim();
}

/** Google Calendar descriptions are light HTML; keep the text and line breaks. */
function htmlToText(html) {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li)>/gi, '\n')
    .replace(/<a\s[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, (_, href, label) =>
      label.trim() === href ? href : `${label} (${href})`,
    )
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** A summary for sizing the design: how many events, how often, how long. */
function printReport(list) {
  const days = (n) => Date.now() + n * 864e5;
  console.log(
    `Upcoming events over the next ${args.months} months (${args.sample ? 'sample' : 'live'} calendars)\n`,
  );
  for (const calendar of listed) {
    const own = list.filter((event) => event.calendar === calendar.id);
    const starts = own.map((event) => new Date(event.start).getTime());
    const perMonth = {};
    for (const event of own) {
      const month = event.start.slice(0, 7);
      perMonth[month] = (perMonth[month] ?? 0) + 1;
    }
    const descriptions = own.map((event) => event.description?.length ?? 0);
    console.log(`${calendar.name} (${calendar.id})`);
    console.log(`  total: ${own.length}`);
    console.log(
      `  next 30 / 90 / 180 days: ${[30, 90, 180].map((n) => starts.filter((t) => t < days(n)).length).join(' / ')}`,
    );
    console.log(`  busiest month: ${Math.max(0, ...Object.values(perMonth))}`);
    console.log(
      `  per month: ${
        Object.entries(perMonth)
          .map(([m, n]) => `${m}:${n}`)
          .join('  ') || 'none'
      }`,
    );
    console.log(
      `  all-day: ${own.filter((e) => e.allDay).length}, with location: ${own.filter((e) => e.location).length}, with description: ${descriptions.filter(Boolean).length}`,
    );
    console.log(
      `  description length: longest ${Math.max(0, ...descriptions)} chars, average ${own.length ? Math.round(descriptions.reduce((a, b) => a + b, 0) / own.length) : 0}`,
    );
    console.log(
      `  next 3: ${
        own
          .slice(0, 3)
          .map((e) => `${e.start.slice(0, 10)} ${e.title}`)
          .join(' | ') || 'none'
      }\n`,
    );
  }
}
