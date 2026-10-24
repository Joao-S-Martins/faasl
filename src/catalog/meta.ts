// Types for the component catalog (/design/components, beta only;
// docs/design-system.md §7). Each component has a folder in src/catalog with
// a meta.ts and one small .astro file per example.
import type { ComponentProps } from 'astro/types';

export type Group = 'Blocks' | 'Content' | 'Layout' | 'Patterns';

export interface Option {
  /** Allowed values, e.g. "plain · tint · green" or "string". */
  values: string;
  default?: string;
  description: string;
}

export interface Example {
  /** File name in this folder, without .astro. */
  file: string;
  title: string;
  notes?: string;
  /** Also show in phone, tablet and desktop frames (layout changes by width). */
  viewports?: boolean;
}

export interface Meta<P> {
  title: string;
  group: Group;
  /** One or two sentences: what it is and when to use it. */
  description: string;
  /** Path of the component, for the "Source" line. */
  source: string;
  /** Every option must be documented: a missing one fails `astro check`. */
  options: { [K in keyof P]-?: Option };
  /** What goes in the default slot, if anything. */
  slot?: string;
  examples: Example[];
  /** Usage notes and rules ("Do", "Don't"). */
  notes?: string[];
  order?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function defineMeta<C extends (...args: any[]) => any>(
  _component: C,
  meta: Meta<ComponentProps<C>>,
) {
  return meta;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyMeta = Meta<any>;
