import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from '../../explore.module.css';

const personas = [
  {
    slug: 'data-analysts',
    name: 'Data Analysts',
    description: 'Query data, build reports, and automate analysis without writing code',
    icon: '📊',
  },
  {
    slug: 'business-analysts',
    name: 'Business Analysts',
    description: 'Get insights faster with natural language data exploration',
    icon: '📈',
  },
  {
    slug: 'product-managers',
    name: 'Product Managers',
    description: 'Track metrics, analyze user behavior, build dashboards',
    icon: '🎯',
  },
  {
    slug: 'marketers',
    name: 'Marketers',
    description: 'Campaign analytics, attribution, audience segmentation',
    icon: '📣',
  },
  {
    slug: 'non-technical-users',
    name: 'Non-Technical Users',
    description: 'Work with data without learning to code or write SQL',
    icon: '👤',
  },
  {
    slug: 'developers',
    name: 'Developers',
    description: 'Skip boilerplate, focus on logic, accelerate data work',
    icon: '💻',
  },
  {
    slug: 'data-engineers',
    name: 'Data Engineers',
    description: 'Prototype pipelines quickly, generate production configs',
    icon: '🔧',
  },
  {
    slug: 'founders',
    name: 'Founders',
    description: 'Get startup data infrastructure without hiring a data team',
    icon: '🚀',
  },
  {
    slug: 'ops-teams',
    name: 'Operations Teams',
    description: 'Automate operational reporting and monitoring',
    icon: '⚙️',
  },
  {
    slug: 'finance-teams',
    name: 'Finance Teams',
    description: 'Financial analysis, reporting automation, reconciliation',
    icon: '💰',
  },
];

function PersonasHero(): ReactNode {
  return (
    <div className={styles.exploreHero}>
      <span className={styles.exploreBadge}>For Your Role</span>
      <h1 className={styles.exploreTitle}>
        ShedBox Agent for{' '}
        <span className={styles.exploreTitleGradient}>Your Team</span>
      </h1>
      <p className={styles.exploreSubtitle}>
        Whether you're a data analyst, product manager, or founder,
        ShedBox Agent adapts to how you work.
      </p>
    </div>
  );
}

function PersonaGrid(): ReactNode {
  return (
    <section>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Personas</span>
        <h2 className={styles.sectionTitle}>Find your role</h2>
        <p className={styles.sectionSubtitle}>
          Use cases and examples tailored for your workflow
        </p>
      </div>

      <div className={styles.categoryGrid}>
        {personas.map((persona) => (
          <Link
            key={persona.slug}
            to={`/explore/agent/personas/${persona.slug}`}
            className={styles.categoryCard}
          >
            <div className={styles.categoryIcon}>{persona.icon}</div>
            <h3 className={styles.categoryName}>{persona.name}</h3>
            <p className={styles.categoryDescription}>{persona.description}</p>
            <span className={styles.categoryCount}>Learn more →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CTASection(): ReactNode {
  return (
    <div className={styles.ctaSection}>
      <h2 className={styles.ctaTitle}>Don't see your role?</h2>
      <p className={styles.ctaDescription}>
        ShedBox Agent works for anyone who needs to process data.
        Explore capabilities to see what's possible.
      </p>
      <div className={styles.ctaButtons}>
        <Link to="/explore/agent/capabilities" className={styles.ctaPrimaryBtn}>
          View Capabilities <span>→</span>
        </Link>
        <Link to="/docs/claude-code-integration" className={styles.ctaSecondaryBtn}>
          Try Claude Code
        </Link>
      </div>
    </div>
  );
}

export default function PersonasPage(): ReactNode {
  return (
    <Layout
      title="ShedBox Agent for Data Analysts, PMs, Developers & More"
      description="Discover how ShedBox Agent helps data analysts, business analysts, product managers, developers, and more work with data using natural language."
    >
      <main className={styles.exploreContainer}>
        <div className={styles.exploreContent}>
          <PersonasHero />
          <PersonaGrid />
          <CTASection />
        </div>
      </main>
    </Layout>
  );
}
