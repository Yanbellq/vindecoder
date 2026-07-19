import { NavLink, Outlet, useNavigation } from 'react-router';
import styles from './Layout.module.css';
import { ROUTES } from '@/constants';

export default function Layout() {
  const currentYear = new Date().getFullYear();
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <NavLink to={ROUTES.HOME} className={styles.logo}>
            VIN<span>DECODER</span>
          </NavLink>
          <nav className={styles.nav}>
            <NavLink
              to={ROUTES.HOME}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.activeLink : ''}`
              }
            >
              Decoder
            </NavLink>
            <NavLink
              to={ROUTES.VARIABLES}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.activeLink : ''}`
              }
            >
              Variables
            </NavLink>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        {isNavigating ? <progress style={{ width: '100%' }} /> : <Outlet />}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <p className={styles.footerText}>
            &copy; {currentYear} VIN DECODER. Made by Yanbellq. Powered by NHTSA vPIC API.
          </p>
          <div className={styles.footerLinks}>
            <a
              href='https://vpic.nhtsa.dot.gov/api/'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.footerLink}
            >
              API Docs
            </a>
            <a
              href='https://github.com/Yanbellq/vindecoder'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.footerLink}
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
