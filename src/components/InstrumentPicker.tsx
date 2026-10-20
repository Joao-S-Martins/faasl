import { useState } from 'react';
import styles from './InstrumentPicker.module.css';

export interface Instrument {
  id: string;
  name: string;
  beginnerFriendly: boolean;
  demoStartSeconds?: number;
}

interface Props {
  videoId: string;
  instruments: Instrument[];
}

/**
 * Instrument list with a demo video. The YouTube player only loads after a
 * visitor picks an instrument, so the page stays fast.
 */
export default function InstrumentPicker({ videoId, instruments }: Props) {
  const [selected, setSelected] = useState<Instrument | null>(null);

  const src = selected
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&start=${selected.demoStartSeconds ?? 0}`
    : null;

  return (
    <div className={styles.picker}>
      <ul className={styles.list}>
        {instruments.map((instrument) => (
          <li key={instrument.id}>
            <button
              type="button"
              className={styles.option}
              aria-pressed={selected?.id === instrument.id}
              disabled={instrument.demoStartSeconds === undefined}
              onClick={() => setSelected(instrument)}
            >
              {instrument.name}
              {instrument.beginnerFriendly && <span title="Common for beginners"> ★</span>}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.video}>
        {src ? (
          <iframe
            key={src}
            src={src}
            title={`Demo of the ${selected?.name}`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <p className={styles.prompt}>Pick an instrument to hear what it sounds like.</p>
        )}
      </div>
    </div>
  );
}
