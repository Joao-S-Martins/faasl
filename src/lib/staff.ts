// Writes short melodies onto a five-line staff as SVG shapes, for the
// decorative staff patterns in TilePattern. Notation follows the usual
// rules: stems up on the right below the middle line, down on the left from
// it, flags always to the right of the stem, beams joining eighth pairs.

/** A staff step: 0 is the bottom line, 1 the space above it, … 8 the top line. */
type Step = number;

export type Note =
  | { kind: 'whole' | 'half' | 'quarter' | 'eighth'; step: Step }
  | { kind: 'pair'; steps: [Step, Step] };

/** One 4/4 measure. */
export type Measure = Note[];

const BEATS: Record<Note['kind'], number> = { whole: 4, half: 2, quarter: 1, eighth: 0.5, pair: 1 };
const GAP = 6; // between staff lines
const STEM = 17.5;
const HEAD_X = 3.3; // from the head's center to its stem

export interface Shapes {
  /** Staff lines, bar lines and stems (thin strokes). */
  lines: string;
  /** Beams (thick strokes). */
  beams: string;
  /** Flags (filled). */
  flags: string;
  /** Noteheads; open ones are drawn hollow. */
  heads: { x: number; y: number; open: boolean; whole: boolean }[];
}

const fmt = (n: number) => Number(n.toFixed(2));

/**
 * Draws measures on one staff whose top line is at `top`, starting at x = 0.
 * Each measure is `measureWidth` wide and ends with a bar line.
 */
export function writeStaff(measures: Measure[], top: number, measureWidth: number): Shapes {
  const width = measures.length * measureWidth;
  const bottom = top + GAP * 4;
  const yOf = (step: Step) => bottom - (step * GAP) / 2;
  const up = (step: Step) => step < 4;

  const lines: string[] = [];
  const beams: string[] = [];
  const flags: string[] = [];
  const heads: Shapes['heads'] = [];

  for (let i = 0; i < 5; i++) lines.push(`M0 ${top + i * GAP} H${width}`);

  const beat = (measureWidth - 12) / 4;
  measures.forEach((measure, m) => {
    let x = m * measureWidth + 10;
    for (const note of measure) {
      if (note.kind === 'pair') {
        const [a, b] = note.steps;
        const stemUp = up((a + b) / 2);
        const xs = [x, x + beat / 2];
        const ys = [yOf(a), yOf(b)];
        const dir = stemUp ? -1 : 1;
        const sx = xs.map((hx) => hx + (stemUp ? HEAD_X : -HEAD_X));
        // A gentle beam that follows the melody, at least a full stem from both heads.
        const slope = Math.max(-3, Math.min(3, (ys[1] - ys[0]) / 2));
        const first = stemUp
          ? Math.min(ys[0] - STEM, ys[1] - STEM - slope)
          : Math.max(ys[0] + STEM, ys[1] + STEM - slope);
        const ends = [first, first + slope];
        sx.forEach((s, i) => lines.push(`M${fmt(s)} ${fmt(ys[i])} V${fmt(ends[i])}`));
        beams.push(
          `M${fmt(sx[0])} ${fmt(ends[0] - dir * 1.5)} L${fmt(sx[1])} ${fmt(ends[1] - dir * 1.5)}`,
        );
        xs.forEach((hx, i) => heads.push({ x: fmt(hx), y: fmt(ys[i]), open: false, whole: false }));
      } else {
        const y = yOf(note.step);
        const open = note.kind === 'whole' || note.kind === 'half';
        heads.push({ x: fmt(x), y: fmt(y), open, whole: note.kind === 'whole' });
        if (note.kind !== 'whole') {
          const stemUp = up(note.step);
          const s = x + (stemUp ? HEAD_X : -HEAD_X);
          const end = stemUp ? y - STEM : y + STEM;
          lines.push(`M${fmt(s)} ${fmt(y)} V${fmt(end)}`);
          if (note.kind === 'eighth') {
            flags.push(
              stemUp
                ? `M${fmt(s)} ${fmt(end)} c0.6 4 6 5.5 4.6 11.5 c-0.2-4-2.6-6-4.6-7.5 Z`
                : `M${fmt(s)} ${fmt(end)} c0.6-4 6-5.5 4.6-11.5 c-0.2 4-2.6 6-4.6 7.5 Z`,
            );
          }
        }
      }
      x += BEATS[note.kind] * beat;
    }
    lines.push(`M${(m + 1) * measureWidth - 0.5} ${top} V${bottom}`);
  });

  return { lines: lines.join(' '), beams: beams.join(' '), flags: flags.join(' '), heads };
}

/** Eight different 4/4 measures, mixed and matched by the staff patterns. */
export const MEASURES: Measure[] = [
  [
    { kind: 'quarter', step: 2 },
    { kind: 'quarter', step: 4 },
    { kind: 'pair', steps: [3, 5] },
    { kind: 'quarter', step: 6 },
  ],
  [
    { kind: 'half', step: 5 },
    { kind: 'pair', steps: [4, 3] },
    { kind: 'quarter', step: 2 },
  ],
  [
    { kind: 'pair', steps: [1, 2] },
    { kind: 'pair', steps: [3, 4] },
    { kind: 'half', step: 5 },
  ],
  [
    { kind: 'quarter', step: 7 },
    { kind: 'eighth', step: 6 },
    { kind: 'eighth', step: 5 },
    { kind: 'half', step: 4 },
  ],
  [
    { kind: 'pair', steps: [2, 4] },
    { kind: 'quarter', step: 3 },
    { kind: 'pair', steps: [1, 0] },
    { kind: 'quarter', step: 1 },
  ],
  [{ kind: 'whole', step: 2 }],
  [
    { kind: 'quarter', step: 0 },
    { kind: 'quarter', step: 2 },
    { kind: 'quarter', step: 4 },
    { kind: 'quarter', step: 7 },
  ],
  [
    { kind: 'pair', steps: [6, 5] },
    { kind: 'pair', steps: [4, 3] },
    { kind: 'quarter', step: 2 },
    { kind: 'eighth', step: 1 },
    { kind: 'eighth', step: 3 },
  ],
];
