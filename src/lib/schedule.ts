import { getCollection } from 'astro:content';
import { getSite } from './site';

/** "18:30" → "6:30 pm" (the site's one time format). */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h < 12 ? 'am' : 'pm';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${suffix}`;
}

/** 45 → "45 minutes", 120 → "2 hours", 90 → "1 hour 30 minutes". */
export function formatLength(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  const parts = [];
  if (hours) parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
  if (rest) parts.push(`${rest} minutes`);
  return parts.join(' ');
}

/** Weekly schedule from src/content/schedule.yaml, in start-time order. */
export async function getSchedule() {
  const entries = await getCollection('schedule');
  return entries
    .map(({ id, data }) => ({
      id,
      ...data,
      time: formatTime(data.start),
      length: formatLength(data.minutes),
    }))
    .sort((a, b) => a.start.localeCompare(b.start));
}

/**
 * Fills {{tokens}} in copy (FAQ answers, page text) from the schedule and
 * site facts, so days and times are written in exactly one place.
 *
 * Tokens: {{<id>.time}} "6:30 pm", {{<id>.day}} "Friday", {{<id>.days}}
 * "Fridays", {{<id>.length}} "45 minutes", {{<id>.label}}, {{<id>.note}},
 * {{schedule}} one-line summary, {{address}} clubhouse street and city.
 * An unknown token throws, so typos fail the build.
 */
export async function fillTokens(text: string) {
  const [schedule, site] = await Promise.all([getSchedule(), getSite()]);
  const values: Record<string, string> = {
    address: `${site.clubhouse.street}, ${site.clubhouse.city}`,
    schedule: summarize(schedule),
  };
  for (const item of schedule) {
    values[`${item.id}.time`] = item.time;
    values[`${item.id}.day`] = item.day;
    values[`${item.id}.days`] = `${item.day}s`;
    values[`${item.id}.length`] = item.length;
    values[`${item.id}.label`] = item.label;
    if (item.note) values[`${item.id}.note`] = item.note;
  }
  return text.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key: string) => {
    if (!(key in values)) throw new Error(`Unknown token {{${key}}} in: ${text}`);
    return values[key];
  });
}

/** "Fridays: Beginner class 6:30 pm · Intermediate class 7:15 pm · Band rehearsal 8:00 pm" */
function summarize(schedule: Awaited<ReturnType<typeof getSchedule>>) {
  const days = [...new Set(schedule.map((item) => item.day))];
  return days
    .map(
      (day) =>
        `${day}s: ` +
        schedule
          .filter((item) => item.day === day)
          .map((item) => `${item.label} ${item.time}`)
          .join(' · '),
    )
    .join('; ');
}

/** Schedule items keyed by id: `(await getScheduleMap()).beginner.time`. */
export async function getScheduleMap() {
  const schedule = await getSchedule();
  return Object.fromEntries(schedule.map((item) => [item.id, item])) as Record<
    string,
    (typeof schedule)[number]
  >;
}
