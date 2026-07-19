import { ROUTES } from '@/constants';
import type { IVariable } from '@/types';
import { Link } from 'react-router';
import styles from './VariableCard.module.css';
import { getFirstParagraphText } from '@/utils';

interface Props {
  variable: IVariable;
}

export function VariableCard({ variable: v }: Props) {
	const shortDescription = getFirstParagraphText(v.Description);

  return (
    <li className={styles.variableCard} key={v.ID}>
      <div className={styles.cardHeader}>
        <span className={styles.badge}>ID: {v.ID}</span>
        <h2 className={styles.varName}>{v.Name}</h2>
        <p className={styles.varDescription}>{shortDescription}</p>
      </div>
      <Link to={ROUTES.VARIABLE(`${v.ID}`)} className={styles.viewLink}>
        View Details &rarr;
      </Link>
    </li>
  );
}
