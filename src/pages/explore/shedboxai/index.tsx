import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from '../explore.module.css';

function ShedBoxAIHero(): ReactNode {
  return (
    <div className={styles.exploreHero}>
      <span className={styles.exploreBadge}>ShedBoxAI Framework</span>
      <h1 className={styles.exploreTitle}>
        Data Pipelines,{' '}
        <span className={styles.exploreTitleGradient}>Simplified</span>
      </h1>
      <p className={styles.exploreSubtitle}>
        Explore how ShedBoxAI transforms complex data workflows into simple YAML configurations.
        Compare with alternatives, discover use cases, and find integration guides.
      </p>
    </div>
  );
}

function CategoryCards(): ReactNode {
  return (
    <div className={styles.categoryGrid}>
      <Link to="/explore/shedboxai/compare" className={styles.categoryCard}>
        <div className={styles.categoryIcon}>⚖️</div>
        <h3 className={styles.categoryName}>Compare Alternatives</h3>
        <p className={styles.categoryDescription}>
          See how ShedBoxAI stacks up against Apache Airflow, Prefect, Dagster, Luigi, dbt, and more.
        </p>
        <span className={styles.categoryCount}>15 comparisons →</span>
      </Link>

      <Link to="/explore/shedboxai/use-cases" className={styles.categoryCard}>
        <div className={`${styles.categoryIcon} ${styles.categoryIconPurple}`}>💻</div>
        <h3 className={styles.categoryName}>Use Cases</h3>
        <p className={styles.categoryDescription}>
          Find solutions for e-commerce, healthcare, fintech, SaaS, marketing, and 10+ more industries.
        </p>
        <span className={styles.categoryCount}>15 use cases →</span>
      </Link>

      <Link to="/explore/shedboxai/integrations" className={styles.categoryCard}>
        <div className={`${styles.categoryIcon} ${styles.categoryIconBlue}`}>🔗</div>
        <h3 className={styles.categoryName}>Data Integrations</h3>
        <p className={styles.categoryDescription}>
          Connect Salesforce, HubSpot, Stripe, PostgreSQL, MongoDB, REST APIs, and more.
        </p>
        <span className={styles.categoryCount}>15 integrations →</span>
      </Link>
    </div>
  );
}

function WhyShedBoxAI(): ReactNode {
  return (
    <section style={{marginTop: '4rem'}}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Why ShedBoxAI</span>
        <h2 className={styles.sectionTitle}>10x faster than traditional tools</h2>
        <p className={styles.sectionSubtitle}>
          What takes hours with Airflow or Prefect takes minutes with ShedBoxAI
        </p>
      </div>

      <div className={styles.productGrid}>
        <div className={`${styles.productCard} ${styles.productCardTeal}`}>
          <div className={`${styles.productIcon} ${styles.productIconTeal}`}>
            <span>⚡</span>
          </div>
          <h3 className={styles.productName}>5-Minute Setup</h3>
          <p className={styles.productDescription}>
            Install with pip, create a YAML file, and run. No infrastructure setup,
            no complex dependencies, no DAG debugging.
          </p>
          <ul className={styles.productFeatures}>
            <li>Single pip install command</li>
            <li>Zero infrastructure required</li>
            <li>Works locally or in production</li>
          </ul>
        </div>

        <div className={`${styles.productCard} ${styles.productCardBlue}`}>
          <div className={`${styles.productIcon} ${styles.productIconBlue}`}>
            <span>🤖</span>
          </div>
          <h3 className={styles.productName}>AI-First Design</h3>
          <p className={styles.productDescription}>
            Native integration with Claude, OpenAI, and custom LLMs. Process data with AI
            using simple configuration, not complex code.
          </p>
          <ul className={styles.productFeatures}>
            <li>Built-in Claude and OpenAI support</li>
            <li>Batch processing included</li>
            <li>Claude Code generates configs for you</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function PopularComparisons(): ReactNode {
  const comparisons = [
    {name: 'Apache Airflow', slug: 'vs-airflow', desc: 'Complex DAGs vs simple YAML'},
    {name: 'Prefect', slug: 'vs-prefect', desc: 'Modern orchestration comparison'},
    {name: 'Dagster', slug: 'vs-dagster', desc: 'Software-defined assets vs config'},
    {name: 'dbt', slug: 'vs-dbt', desc: 'Transformation-focused comparison'},
  ];

  return (
    <section style={{marginTop: '4rem'}}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Popular Comparisons</span>
        <h2 className={styles.sectionTitle}>How does ShedBoxAI compare?</h2>
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
            <p className={styles.categoryDescription}>{comp.desc}</p>
            <span className={styles.categoryCount}>Read comparison →</span>
          </Link>
        ))}
        <Link to="/explore/shedboxai/compare" className={styles.categoryCard}>
          <div className={`${styles.categoryIcon} ${styles.categoryIconPurple}`}>+</div>
          <h3 className={styles.categoryName}>View All</h3>
          <p className={styles.categoryDescription}>
            See all 15 comparisons including Luigi, Fivetran, Airbyte, and more
          </p>
          <span className={styles.categoryCount}>All comparisons →</span>
        </Link>
      </div>
    </section>
  );
}

function CTASection(): ReactNode {
  return (
    <div className={styles.ctaSection}>
      <h2 className={styles.ctaTitle}>Try ShedBoxAI today</h2>
      <p className={styles.ctaDescription}>
        Install in 30 seconds and build your first pipeline in 5 minutes.
      </p>
      <div className={styles.ctaButtons}>
        <Link to="/docs/getting-started/quick-start" className={styles.ctaPrimaryBtn}>
          Quick Start <span>→</span>
        </Link>
        <Link to="/docs/examples" className={styles.ctaSecondaryBtn}>
          View Examples
        </Link>
      </div>
    </div>
  );
}

export default function ShedBoxAIExplorePage(): ReactNode {
  return (
    <Layout
      title="Explore ShedBoxAI Framework - Comparisons, Use Cases & Integrations"
      description="Discover how ShedBoxAI compares to Apache Airflow, Prefect, Dagster, and more. Find use cases for your industry and integration guides for your data sources."
    >
      <main className={styles.exploreContainer}>
        <div className={styles.exploreContent}>
          <ShedBoxAIHero />
          <CategoryCards />
          <WhyShedBoxAI />
          <PopularComparisons />
          <CTASection />
        </div>
      </main>
    </Layout>
  );
}
