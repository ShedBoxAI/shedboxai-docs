import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from '../../explore.module.css';

const useCases = [
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    description: 'Customer analytics, inventory tracking, sales forecasting',
    icon: '🛒',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    description: 'Patient data processing, HIPAA-compliant pipelines',
    icon: '🏥',
  },
  {
    slug: 'fintech',
    name: 'Fintech',
    description: 'Transaction analysis, fraud detection, reporting',
    icon: '💳',
  },
  {
    slug: 'saas',
    name: 'SaaS',
    description: 'Product analytics, user behavior, churn prediction',
    icon: '☁️',
  },
  {
    slug: 'marketing',
    name: 'Marketing',
    description: 'Campaign analytics, attribution, audience segmentation',
    icon: '📊',
  },
  {
    slug: 'sales-ops',
    name: 'Sales Operations',
    description: 'Pipeline management, lead scoring, forecasting',
    icon: '📈',
  },
  {
    slug: 'data-science',
    name: 'Data Science',
    description: 'ML data prep, feature engineering, model pipelines',
    icon: '🔬',
  },
  {
    slug: 'startups',
    name: 'Startups',
    description: 'Lightweight data infrastructure, rapid iteration',
    icon: '🚀',
  },
  {
    slug: 'customer-analytics',
    name: 'Customer Analytics',
    description: 'CDP alternative, customer 360, segmentation',
    icon: '👥',
  },
  {
    slug: 'etl-automation',
    name: 'ETL Automation',
    description: 'Automated data extraction, transformation, loading',
    icon: '⚙️',
  },
  {
    slug: 'api-aggregation',
    name: 'API Aggregation',
    description: 'Multi-API data collection, unified data views',
    icon: '🔗',
  },
  {
    slug: 'reporting',
    name: 'Automated Reporting',
    description: 'Scheduled reports, dashboards, alerts',
    icon: '📋',
  },
  {
    slug: 'data-migration',
    name: 'Data Migration',
    description: 'System migrations, data transfers, sync',
    icon: '📦',
  },
  {
    slug: 'sentiment-analysis',
    name: 'Sentiment Analysis',
    description: 'Social listening, review analysis, brand monitoring',
    icon: '💬',
  },
  {
    slug: 'competitive-intel',
    name: 'Competitive Intelligence',
    description: 'Market analysis, competitor tracking, trends',
    icon: '🎯',
  },
];

function UseCasesHero(): ReactNode {
  return (
    <div className={styles.exploreHero}>
      <span className={styles.exploreBadge}>Use Cases</span>
      <h1 className={styles.exploreTitle}>
        ShedBoxAI for{' '}
        <span className={styles.exploreTitleGradient}>Your Industry</span>
      </h1>
      <p className={styles.exploreSubtitle}>
        Discover how teams across industries use ShedBoxAI to automate data pipelines,
        generate insights, and save hours every week.
      </p>
    </div>
  );
}

function UseCaseGrid(): ReactNode {
  return (
    <section>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Industries</span>
        <h2 className={styles.sectionTitle}>Find your use case</h2>
        <p className={styles.sectionSubtitle}>
          Real-world examples with sample configurations
        </p>
      </div>

      <div className={styles.categoryGrid}>
        {useCases.map((useCase) => (
          <Link
            key={useCase.slug}
            to={`/explore/shedboxai/use-cases/${useCase.slug}`}
            className={styles.categoryCard}
          >
            <div className={styles.categoryIcon}>{useCase.icon}</div>
            <h3 className={styles.categoryName}>{useCase.name}</h3>
            <p className={styles.categoryDescription}>{useCase.description}</p>
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
      <h2 className={styles.ctaTitle}>Don't see your use case?</h2>
      <p className={styles.ctaDescription}>
        ShedBoxAI is flexible enough to handle almost any data pipeline.
        Start with the quick start guide or browse examples.
      </p>
      <div className={styles.ctaButtons}>
        <Link to="/docs/getting-started/quick-start" className={styles.ctaPrimaryBtn}>
          Quick Start <span>→</span>
        </Link>
        <Link to="/docs/examples" className={styles.ctaSecondaryBtn}>
          Browse Examples
        </Link>
      </div>
    </div>
  );
}

export default function UseCasesPage(): ReactNode {
  return (
    <Layout
      title="ShedBoxAI Use Cases - E-commerce, Healthcare, Fintech & More"
      description="Discover how teams use ShedBoxAI for e-commerce analytics, healthcare data processing, fintech reporting, and 15+ more industries."
    >
      <main className={styles.exploreContainer}>
        <div className={styles.exploreContent}>
          <UseCasesHero />
          <UseCaseGrid />
          <CTASection />
        </div>
      </main>
    </Layout>
  );
}
