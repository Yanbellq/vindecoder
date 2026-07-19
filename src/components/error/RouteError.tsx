import { useRouteError, useNavigate } from 'react-router';
import Button from '../ui/button/Button';
import styles from './RouteError.module.css';

export default function RouteError() {
  const error = useRouteError() as any;
  const navigate = useNavigate();

  const isNetworkError =
    error?.code === 'ERR_NETWORK' || error?.message?.includes('Network Error');

  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>{isNetworkError ? '📡' : '⚠️'}</div>
      <h2 className={styles.title}>
        {isNetworkError ? 'Connection Lost' : 'Something went wrong'}
      </h2>
      <p className={styles.message}>
        {isNetworkError
          ? 'Could not connect to the NHTSA servers. Please check your internet connection and try again.'
          : error?.message ||
            'An unexpected error occurred while loading this page.'}
      </p>
      <div className={styles.buttonContainer}>
        <Button onClick={() => navigate(0)}>Retry Connection</Button>
      </div>
    </div>
  );
}
