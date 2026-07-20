import { Link } from 'react-router';
import { ROUTES } from '@/constants';
import { Binary, Car, ShieldCheck, ArrowRight, Layers } from 'lucide-react';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <>
      <title>Home | VIN DECODER</title>

      <div className={styles.container}>
        <div className={styles.glow} />

        <header className={styles.hero}>
          <div className={styles.badge}>
            <Layers size={14} />
            <span>vPIC NHTSA Integrated Platform</span>
          </div>

          <h1 className={styles.title}>
            Advanced Vehicle <br />
            <span className={styles.gradientText}>Intelligence Platform</span>
          </h1>

          <p className={styles.subtitle}>
            Instantly decode 17-character VIN codes, lookup international
            license plates, and explore the complete global vehicle variable
            registry with hardware-accelerated caching.
          </p>

          <div className={styles.ctaGroup}>
            <Link to={ROUTES.DECODE} className={styles.btnPrimary}>
              Decode VIN Now
              <ArrowRight size={16} />
            </Link>
            <Link to={ROUTES.PLATE} className={styles.btnSecondary}>
              Lookup License Plate
            </Link>
          </div>
        </header>

        <section className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <Binary size={20} />
            </div>
            <h3>ISO 3779 Validation</h3>
            <p>
              Proactive input filtering actively strips illegal characters (I,
              O, Q) at the hardware level, preventing broken API submissions.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <ShieldCheck size={20} />
            </div>
            <h3>Intelligent Caching</h3>
            <p>
              Powered by TanStack Query. Repeated requests are served instantly
              from memory with a zero-millisecond render penalty.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <Car size={20} />
            </div>
            <h3>Deep Registry Insights</h3>
            <p>
              Browse and traverse thousands of structural automotive variables
              with optimized doc-style internal navigation controls.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
