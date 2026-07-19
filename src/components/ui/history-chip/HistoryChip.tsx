import styles from './HistoryChip.module.css';
import { Copy } from 'lucide-react';

interface Props {
  vin: string;
  onClick?: () => void;
}

export function HistoryChip({ vin, onClick }: Props) {
  return (
    <li className={styles.historyChip} onClick={onClick}>
      <div className={styles.iconWrapper}>
        <Copy
          size={12}
          className={`${styles.icon} ${styles.iconVisible}`}
        />
      </div>
      <span className={styles.vinText}>{vin}</span>
    </li>
  );
}
