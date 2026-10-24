import { defineMeta } from '../meta';
import TilePattern from '../../components/patterns/TilePattern.astro';

export default defineMeta(TilePattern, {
  title: 'TilePattern',
  group: 'Patterns',
  order: 1,
  description:
    "The musical tile and staff patterns as SVG. Most pages use them through TileBand, TileWall and Surface's field; use this directly for something new.",
  source: 'src/components/patterns/TilePattern.astro',
  options: {
    variant: {
      values: 'staff · rosette · checker · line · field',
      default: 'staff',
      description: 'Wall tiles (staff, rosette, checker) or staff lines (line, field).',
    },
    ink: { values: 'CSS color', default: 'hunter green', description: 'Line color.' },
    accent: {
      values: 'CSS color',
      default: 'gold',
      description: 'Accent color (tile corners, rosette ring).',
    },
    ground: { values: 'CSS color', default: 'white', description: 'Tile face or background.' },
    grout: {
      values: 'CSS color',
      default: 'off-white',
      description: 'The gap between wall tiles.',
    },
    height: { values: 'CSS length', default: '7rem', description: 'Height of the pattern area.' },
    tile: {
      values: '48 · 64 · 96 · 128',
      default: '96',
      description: 'Tile size in pixels (whole-pixel sizes only).',
    },
    frame: {
      values: 'boolean',
      default: 'true',
      description: 'Rounded outline around the pattern.',
    },
    center: {
      values: 'x · both',
      description: 'Center the grid so cut tiles are equal on both sides.',
    },
  },
  examples: [
    { file: 'rosette', title: 'Rosette' },
    { file: 'checker', title: 'Checker' },
    { file: 'line', title: 'Staff line' },
  ],
  notes: ['Rules: docs/brand.md (Portuguese motifs).'],
});
