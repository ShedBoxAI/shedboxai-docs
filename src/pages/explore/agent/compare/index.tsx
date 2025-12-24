import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from '../../explore.module.css';

const comparisons = [
  {
    slug: 'vs-chatgpt',
    name: 'ChatGPT',
    description: 'General AI assistant vs specialized data agent',
  },
  {
    slug: 'vs-cursor',
    name: 'Cursor',
    description: 'AI coding assistant vs data pipeline agent',
  },
  {
    slug: 'vs-github-copilot',
    name: 'GitHub Copilot',
    description: 'Code completion vs full pipeline generation',
  },
  {
    slug: 'vs-claude',
    name: 'Claude (Direct)',
    description: 'Using Claude directly vs ShedBox Agent',
  },
  {
    slug: 'vs-julius-ai',
    name: 'Julius AI',
    description: 'Data analysis tools comparison',
  },
  {
    slug: 'vs-databricks-assistant',
    name: 'Databricks Assistant',
    description: 'Enterprise notebook AI vs lightweight agent',
  },
  {
    slug: 'vs-hex',
    name: 'Hex AI',
    description: 'Notebook-based vs CLI-based approach',
  },
  {
    slug: 'vs-deepnote-ai',
    name: 'Deepnote AI',
    description: 'Collaborative notebook AI comparison',
  },
  {
    slug: 'vs-excel-copilot',
    name: 'Excel Copilot',
    description: 'Spreadsheet AI vs data pipeline agent',
  },
  {
    slug: 'vs-google-sheets-ai',
    name: 'Google Sheets AI',
    description: 'Cloud spreadsheet AI comparison',
  },
];

function CompareHero(): ReactNode {
  return (
    <div className={styles.exploreHero}>
      <span className={styles.exploreBadge}>Agent Comparisons</span>
      <h1 className={styles.exploreTitle}>
        ShedBox Agent vs{' '}
        <span className={styles.exploreTitleGradient}>AI Tools</span>
      </h1>
      <p className={styles.exploreSubtitle}>
        See how ShedBox Agent compares to ChatGPT, Cursor, GitHub Copilot,
        and other AI tools for data work.
      </p>
    </div>
  );
}

function ComparisonGrid(): ReactNode {
  return (
    <section>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Head-to-Head</span>
        <h2 className={styles.sectionTitle}>Compare AI approaches</h2>
        <p className={styles.sectionSubtitle}>
          Detailed comparisons for data processing tasks
        </p>
      </div>

      <div className={styles.categoryGrid}>
        {comparisons.map((comp) => (
          <Link
            key={comp.slug}
            to={`/explore/agent/compare/${comp.slug}`}
            className={styles.categoryCard}
          >
            <div className={`${styles.categoryIcon} ${styles.categoryIconOrange}`}>🤖</div>
            <h3 className={styles.categoryName}>vs {comp.name}</h3>
            <p className={styles.categoryDescription}>{comp.description}</p>
            <span className={styles.categoryCount}>View comparison →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function WhyAgent(): ReactNode {
  return (
    <section style={{marginTop: '4rem'}}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Why ShedBox Agent</span>
        <h2 className={styles.sectionTitle}>Built specifically for data work</h2>
      </div>

      <div className={styles.productGrid}>
        <div className={`${styles.productCard} ${styles.productCardBlue}`}>
          <div className={`${styles.productIcon} ${styles.productIconBlue}`}>📊</div>
          <h3 className={styles.productName}>Data-First Design</h3>
          <p className={styles.productDescription}>
            Unlike general AI assistants, ShedBox Agent understands data schemas,
            knows pipeline patterns, and generates production-ready configurations.
          </p>
        </div>

        <div className={`${styles.productCard} ${styles.productCardTeal}`}>
          <div className={`${styles.productIcon} ${styles.productIconTeal}`}>⚡</div>
          <h3 className={styles.productName}>Execution Built-In</h3>
          <p className={styles.productDescription}>
            ChatGPT gives you code to run. ShedBox Agent executes the pipeline
            for you and returns results directly.
          </p>
        </div>
      </div>
    </section>
  );
}

function CTASection(): ReactNode {
  return (
    <div className={styles.ctaSection}>
      <h2 className={styles.ctaTitle}>ShedBox Agent is coming soon</h2>
      <p className={styles.ctaDescription}>
        In the meantime, try ShedBoxAI with Claude Code integration for
        AI-assisted pipeline generation.
      </p>
      <div className={styles.ctaButtons}>
        <Link to="/docs/claude-code-integration" className={styles.ctaPrimaryBtn}>
          Try Claude Code <span>→</span>
        </Link>
        <Link to="/explore/shedboxai" className={styles.ctaSecondaryBtn}>
          Explore Framework
        </Link>
      </div>
    </div>
  );
}

export default function AgentComparePage(): ReactNode {
  return (
    <Layout
      title="ShedBox Agent vs ChatGPT, Cursor & AI Tools - Comparisons"
      description="Compare ShedBox Agent with ChatGPT, Cursor, GitHub Copilot, and other AI tools. Find the best AI solution for your data work."
    >
      <main className={styles.exploreContainer}>
        <div className={styles.exploreContent}>
          <CompareHero />
          <ComparisonGrid />
          <WhyAgent />
          <CTASection />
        </div>
      </main>
    </Layout>
  );
}
