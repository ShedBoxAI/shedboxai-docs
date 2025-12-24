import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from '../../explore.module.css';

const comparisons = [
  {
    slug: 'vs-airflow',
    name: 'Apache Airflow',
    description: 'Complex Python DAGs vs simple YAML configuration',
    category: 'Orchestration',
  },
  {
    slug: 'vs-prefect',
    name: 'Prefect',
    description: 'Modern workflow orchestration comparison',
    category: 'Orchestration',
  },
  {
    slug: 'vs-dagster',
    name: 'Dagster',
    description: 'Software-defined assets vs configuration-driven',
    category: 'Orchestration',
  },
  {
    slug: 'vs-luigi',
    name: 'Luigi',
    description: 'Spotify\'s pipeline tool vs ShedBoxAI',
    category: 'Orchestration',
  },
  {
    slug: 'vs-dbt',
    name: 'dbt',
    description: 'SQL transformation focused vs full pipeline',
    category: 'Transformation',
  },
  {
    slug: 'vs-fivetran',
    name: 'Fivetran',
    description: 'Managed ELT vs lightweight framework',
    category: 'ELT',
  },
  {
    slug: 'vs-airbyte',
    name: 'Airbyte',
    description: 'Open-source data integration comparison',
    category: 'ELT',
  },
];

const alternatives = [
  {
    slug: 'alternatives/airflow',
    name: 'Airflow Alternatives',
    description: 'Best Apache Airflow alternatives in 2025',
  },
  {
    slug: 'alternatives/prefect',
    name: 'Prefect Alternatives',
    description: 'Top Prefect competitors and alternatives',
  },
  {
    slug: 'alternatives/dagster',
    name: 'Dagster Alternatives',
    description: 'Best Dagster alternatives for data pipelines',
  },
  {
    slug: 'alternatives/luigi',
    name: 'Luigi Alternatives',
    description: 'Spotify Luigi replacements and alternatives',
  },
  {
    slug: 'alternatives/dbt',
    name: 'dbt Alternatives',
    description: 'Best dbt alternatives for data transformation',
  },
  {
    slug: 'alternatives/meltano',
    name: 'Meltano Alternatives',
    description: 'Top Meltano competitors in 2025',
  },
  {
    slug: 'alternatives/pentaho',
    name: 'Pentaho Alternatives',
    description: 'Best Pentaho Kettle replacements',
  },
  {
    slug: 'alternatives/talend',
    name: 'Talend Alternatives',
    description: 'Open-source Talend alternatives',
  },
];

function CompareHero(): ReactNode {
  return (
    <div className={styles.exploreHero}>
      <span className={styles.exploreBadge}>Comparisons</span>
      <h1 className={styles.exploreTitle}>
        ShedBoxAI vs{' '}
        <span className={styles.exploreTitleGradient}>Alternatives</span>
      </h1>
      <p className={styles.exploreSubtitle}>
        See how ShedBoxAI compares to popular data pipeline and orchestration tools.
        Find the right solution for your needs.
      </p>
    </div>
  );
}

function DirectComparisons(): ReactNode {
  return (
    <section>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Head-to-Head</span>
        <h2 className={styles.sectionTitle}>ShedBoxAI vs specific tools</h2>
        <p className={styles.sectionSubtitle}>
          Detailed comparisons with features, pricing, and use cases
        </p>
      </div>

      <div className={styles.categoryGrid}>
        {comparisons.map((comp) => (
          <Link
            key={comp.slug}
            to={`/explore/shedboxai/compare/${comp.slug}`}
            className={styles.categoryCard}
          >
            <div className={styles.categoryIcon}>⚖️</div>
            <h3 className={styles.categoryName}>vs {comp.name}</h3>
            <p className={styles.categoryDescription}>{comp.description}</p>
            <span className={styles.categoryCount}>{comp.category} →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function AlternativePages(): ReactNode {
  return (
    <section style={{marginTop: '4rem'}}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Alternative Guides</span>
        <h2 className={styles.sectionTitle}>Looking for alternatives?</h2>
        <p className={styles.sectionSubtitle}>
          Comprehensive guides to alternatives for popular tools
        </p>
      </div>

      <div className={styles.categoryGrid}>
        {alternatives.map((alt) => (
          <Link
            key={alt.slug}
            to={`/explore/shedboxai/compare/${alt.slug}`}
            className={styles.categoryCard}
          >
            <div className={`${styles.categoryIcon} ${styles.categoryIconPurple}`}>🔎</div>
            <h3 className={styles.categoryName}>{alt.name}</h3>
            <p className={styles.categoryDescription}>{alt.description}</p>
            <span className={styles.categoryCount}>View guide →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CTASection(): ReactNode {
  return (
    <div className={styles.ctaSection}>
      <h2 className={styles.ctaTitle}>Ready to try ShedBoxAI?</h2>
      <p className={styles.ctaDescription}>
        See the difference yourself. Install in 30 seconds, build a pipeline in 5 minutes.
      </p>
      <div className={styles.ctaButtons}>
        <Link to="/docs/getting-started/quick-start" className={styles.ctaPrimaryBtn}>
          Get Started <span>→</span>
        </Link>
        <Link to="/explore/shedboxai/use-cases" className={styles.ctaSecondaryBtn}>
          View Use Cases
        </Link>
      </div>
    </div>
  );
}

export default function ComparePage(): ReactNode {
  return (
    <Layout
      title="ShedBoxAI vs Alternatives - Airflow, Prefect, Dagster Comparisons"
      description="Compare ShedBoxAI with Apache Airflow, Prefect, Dagster, Luigi, dbt, and more. Find the best data pipeline tool for your needs."
    >
      <main className={styles.exploreContainer}>
        <div className={styles.exploreContent}>
          <CompareHero />
          <DirectComparisons />
          <AlternativePages />
          <CTASection />
        </div>
      </main>
    </Layout>
  );
}
