import { useNavigate } from 'react-router';
import styles from './NotFoundPage.module.css';
import Button from '@/components/ui/button/Button';
import { ROUTES } from '@/constants';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <title>Oops... | VIN DECODER</title>

      <div className={styles.container}>
        <div className={styles.badgeContainer}>
          <div className={styles.badge}>4</div>
          <div className={styles.badge}>0</div>
          <div className={styles.badge}>4</div>
        </div>

        <h1 className={styles.title}>Page Not Found</h1>

        <p className={styles.description}>
          The page you are looking for was removed, moved, renamed, <br />
          or might never existed.
        </p>

        <Button onClick={() => navigate(ROUTES.HOME)}>Return Home</Button>
      </div>
    </>
  );
}
