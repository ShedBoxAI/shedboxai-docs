import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from '../../explore.module.css';

const capabilities = [
  {
    slug: 'csv-analysis',
    name: 'Analyze CSV Files',
    description: 'Upload a CSV and ask questions in plain English',
    icon: '📄',
  },
  {
    slug: 'api-integration',
    name: 'Connect APIs',
    description: 'Pull data from any REST API with natural language',
    icon: '🔌',
  },
  {
    slug: 'data-cleaning',
    name: 'Clean Data',
    description: 'Remove duplicates, fix formats, handle missing values',
    icon: '🧹',
  },
  {
    slug: 'report-generation',
    name: 'Generate Reports',
    description: 'Create formatted reports from your data automatically',
    icon: '📋',
  },
  {
    slug: 'data-transformation',
    name: 'Transform Data',
    description: 'Filter, aggregate, join, and reshape datasets',
    icon: '🔄',
  },
  {
    slug: 'sentiment-analysis',
    name: 'Sentiment Analysis',
    description: 'Analyze text sentiment using AI models',
    icon: '💬',
  },
  {
    slug: 'dashboard-creation',
    name: 'Create Dashboards',
    description: 'Build visualizations from natural language descriptions',
    icon: '📊',
  },
  {
    slug: 'data-merging',
    name: 'Merge Datasets',
    description: 'Combine multiple data sources intelligently',
    icon: '🔗',
  },
  {
    slug: 'trend-analysis',
    name: 'Analyze Trends',
    description: 'Identify patterns and trends in your data',
    icon: '📈',
  },
  {
    slug: 'anomaly-detection',
    name: 'Detect Anomalies',
    description: 'Find outliers and unusual patterns automatically',
    icon: '🔍',
  },
];

function CapabilitiesHero(): ReactNode {
  return (
    <div className={styles.exploreHero}>
      <span className={styles.exploreBadge}>Capabilities</span>
      <h1 className={styles.exploreTitle}>
        What Can You{' '}
        <span className={styles.exploreTitleGradient}>Do?</span>
      </h1>
      <p className={styles.exploreSubtitle}>
        From simple CSV analysis to complex multi-source pipelines,
        describe what you want and ShedBox Agent handles the rest.
      </p>
    </div>
  );
}

function CapabilityGrid(): ReactNode {
  return (
    <section>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Natural Language</span>
        <h2 className={styles.sectionTitle}>Just describe what you need</h2>
        <p className={styles.sectionSubtitle}>
          Examples and guides for common data tasks
        </p>
      </div>

      <div className={styles.categoryGrid}>
        {capabilities.map((cap) => (
          <Link
            key={cap.slug}
            to={`/explore/agent/capabilities/${cap.slug}`}
            className={styles.categoryCard}
          >
            <div className={`${styles.categoryIcon} ${styles.categoryIconPurple}`}>{cap.icon}</div>
            <h3 className={styles.categoryName}>{cap.name}</h3>
            <p className={styles.categoryDescription}>{cap.description}</p>
            <span className={styles.categoryCount}>See examples →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ExamplePrompts(): ReactNode {
  const examples = [
    '"Analyze my sales.csv and find the top 10 customers by revenue"',
    '"Connect to the Stripe API and get all transactions from last month"',
    '"Clean this customer data and remove duplicate emails"',
    '"Generate a weekly report showing sales trends by region"',
  ];

  return (
    <section style={{marginTop: '4rem'}}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Example Prompts</span>
        <h2 className={styles.sectionTitle}>Just say it</h2>
      </div>

      <div className={styles.productGrid}>
        {examples.map((example, i) => (
          <div key={i} className={styles.productCard}>
            <p className={styles.productDescription} style={{fontStyle: 'italic'}}>
              {example}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection(): ReactNode {
  return (
    <div className={styles.ctaSection}>
      <h2 className={styles.ctaTitle}>Ready to try natural language data?</h2>
      <p className={styles.ctaDescription}>
        ShedBox Agent is coming soon. Try Claude Code integration now
        for AI-assisted configuration generation.
      </p>
      <div className={styles.ctaButtons}>
        <Link to="/docs/claude-code-integration" className={styles.ctaPrimaryBtn}>
          Try Claude Code <span>→</span>
        </Link>
        <Link to="/explore/agent/personas" className={styles.ctaSecondaryBtn}>
          Find Your Role
        </Link>
      </div>
    </div>
  );
}

export default function CapabilitiesPage(): ReactNode {
  return (
    <Layout
      title="ShedBox Agent Capabilities - CSV Analysis, Reports, Data Cleaning"
      description="Explore what ShedBox Agent can do: analyze CSVs, connect APIs, clean data, generate reports, and more using natural language."
    >
      <main className={styles.exploreContainer}>
        <div className={styles.exploreContent}>
          <CapabilitiesHero />
          <CapabilityGrid />
          <ExamplePrompts />
          <CTASection />
        </div>
      </main>
    </Layout>
  );
}
