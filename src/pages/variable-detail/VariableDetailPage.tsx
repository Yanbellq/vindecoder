import { Link, useParams } from 'react-router';
import styles from './VariableDetailPage.module.css';
import { useGetVariableDetail } from '@/hooks/queries';
import { ROUTES } from '@/constants';
import type { IVariable } from '@/types';
import { CheckCircle, Copy } from 'lucide-react';
import { useCopyToClipboard } from 'usehooks-ts';
import { toast } from 'sonner';
import { useState } from 'react';

interface IDataProps {
  variable: IVariable;
  prevVariable: IVariable;
  nextVariable: IVariable;
}

export default function VariableDetailPage() {
  const { variableId } = useParams<{ variableId: string }>();
  const { data }: { data: IDataProps } = useGetVariableDetail(variableId!);

  if (!data) return null;
  const { variable, prevVariable, nextVariable } = data;

  const [isCopied, setIsCopied] = useState(false);
  const [_, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        setIsCopied(true);
        toast.success('Copied!', { description: text });
        setTimeout(() => setIsCopied(false), 4000);
      })
      .catch((error) => {
        toast.error('Failed to copy!', { description: error });
      });
  };

  return (
    <>
      <title>{`Variable n.${variableId} | VIN DECODER`}</title>

      <div>
        <div className={styles.contentHeader}>
          <Link to={ROUTES.VARIABLES} className={styles.navBtn}>
            &larr; Back to Variables
          </Link>

          <div className={styles.navControls}>
            {prevVariable ? (
              <Link
                to={`${ROUTES.VARIABLES}/${prevVariable.ID}`}
                className={styles.navBtn}
                title={`Previous: ${prevVariable.Name}`}
              >
                &larr; Prev
              </Link>
            ) : (
              <span className={`${styles.navBtn} ${styles.disabled}`}>
                &larr; Prev
              </span>
            )}

            <span className={styles.navDivider}>|</span>

            {nextVariable ? (
              <Link
                to={`${ROUTES.VARIABLES}/${nextVariable.ID}`}
                className={styles.navBtn}
                title={`Next: ${nextVariable.Name}`}
              >
                Next &rarr;
              </Link>
            ) : (
              <span className={`${styles.navBtn} ${styles.disabled}`}>
                Next &rarr;
              </span>
            )}
          </div>
        </div>

        {variable && (
          <article className={styles.detailCard}>
            <div className={styles.metaInfo}>
              <span className={styles.idBadge}>
                Variable ID: {variable.ID || ''}
              </span>{' '}
              <span className={styles.badge}>{variable.DataType}</span>
            </div>

            <h1 className={styles.varName}>
              {variable.Name}{' '}
              <button
                className={styles.copyBtn}
                onClick={handleCopy(variable.Name)}
                aria-label='Copy variable name'
              >
                <div className={styles.iconWrapper}>
                  <Copy
                    size={14}
                    className={`${styles.icon} ${isCopied ? styles.iconHidden : styles.iconVisible}`}
                  />
                  <CheckCircle
                    size={14}
                    className={`${styles.icon} ${isCopied ? styles.iconVisible : styles.iconHidden}`}
                  />
                </div>
              </button>
            </h1>

            <hr className={styles.divider} />

            <h2 className={styles.sectionTitle}>Description</h2>

            <div
              className={styles.descriptionBox}
              dangerouslySetInnerHTML={{ __html: variable.Description }}
            />
          </article>
        )}
      </div>
    </>
  );
}
