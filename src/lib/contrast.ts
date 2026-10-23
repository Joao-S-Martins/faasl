/** WCAG contrast ratio between two hex colors, e.g. contrast('#355749', '#ffffff') → 8.04. */
export function contrast(a: string, b: string) {
  const luminance = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(bl);
  };
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
}

/** WCAG 2.2 AA verdict for a contrast ratio. */
export function rating(ratio: number) {
  if (ratio >= 4.5) return 'AA: any text';
  if (ratio >= 3) return 'AA: large text only';
  return 'Fails: decoration only';
}
