import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './explore.module.css';

function ExploreHero(): ReactNode {
  return (
    <div className={styles.exploreHero}>
      <span className={styles.exploreBadge}>Explore ShedBoxAI</span>
      <h1 className={styles.exploreTitle}>
        Find the Right{' '}
        <span className={styles.exploreTitleGradient}>Solution</span>
      </h1>
      <p className={styles.exploreSubtitle}>
        Discover how ShedBoxAI compares to alternatives, explore use cases for your industry,
        and learn how to integrate with your existing data sources.
      </p>
    </div>
  );
}

function ProductCards(): ReactNode {
  return (
    <div className={styles.productGrid}>
      {/* ShedBoxAI Framework Card */}
      <Link to="/explore/shedboxai" className={`${styles.productCard} ${styles.productCardTeal}`}>
        <div className={`${styles.productCardGlow} ${styles.productCardGlowTeal}`} />
        <div className={`${styles.productIcon} ${styles.productIconTeal}`}>
          <span>⚙️</span>
        </div>
        <div className={`${styles.productLabel} ${styles.productLabelTeal}`}>Framework</div>
        <h2 className={styles.productName}>ShedBoxAI</h2>
        <p className={styles.productDescription}>
          YAML-based data processing framework. Connect any data source, process with 80+ operations,
          and integrate AI models with simple configuration.
        </p>
        <ul className={styles.productFeatures}>
          <li>Configuration-driven pipelines</li>
          <li>80+ built-in operations</li>
          <li>Native AI model integration</li>
          <li>Multi-source connectivity</li>
        </ul>
        <div className={styles.productCta}>
          Explore ShedBoxAI <span>→</span>
        </div>
      </Link>

      {/* ShedBox Agent Card */}
      <Link to="/explore/agent" className={`${styles.productCard} ${styles.productCardBlue}`}>
        <div className={`${styles.productCardGlow} ${styles.productCardGlowBlue}`} />
        <div className={`${styles.productIcon} ${styles.productIconBlue}`}>
          <span>🤖</span>
        </div>
        <div className={`${styles.productLabel} ${styles.productLabelBlue}`}>Coming Soon</div>
        <h2 className={styles.productName}>ShedBox Agent</h2>
        <p className={styles.productDescription}>
          Conversational AI layer for ShedBoxAI. Describe what you want in plain English,
          and let the agent generate and execute data pipelines automatically.
        </p>
        <ul className={styles.productFeatures}>
          <li>Natural language interface</li>
          <li>Auto-generates YAML configs</li>
          <li>Works with Claude, OpenAI, local models</li>
          <li>Intelligent task planning</li>
        </ul>
        <div className={styles.productCta}>
          Explore Agent <span>→</span>
        </div>
      </Link>
    </div>
  );
}

function QuickLinks(): ReactNode {
  return (
    <section>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Quick Links</span>
        <h2 className={styles.sectionTitle}>Jump to what you need</h2>
        <p className={styles.sectionSubtitle}>
          Find comparisons, use cases, and integration guides
        </p>
      </div>

      <div className={styles.categoryGrid}>
        <Link to="/explore/shedboxai/compare" className={styles.categoryCard}>
          <div className={styles.categoryIcon}>⚖️</div>
          <h3 className={styles.categoryName}>Comparisons</h3>
          <p className={styles.categoryDescription}>
            See how ShedBoxAI stacks up against Airflow, Prefect, Dagster, and other tools
          </p>
          <span className={styles.categoryCount}>15+ comparisons →</span>
        </Link>

        <Link to="/explore/shedboxai/use-cases" className={styles.categoryCard}>
          <div className={`${styles.categoryIcon} ${styles.categoryIconPurple}`}>💻</div>
          <h3 className={styles.categoryName}>Use Cases</h3>
          <p className={styles.categoryDescription}>
            Discover solutions for e-commerce, healthcare, fintech, marketing, and more
          </p>
          <span className={styles.categoryCount}>15+ industries →</span>
        </Link>

        <Link to="/explore/shedboxai/integrations" className={styles.categoryCard}>
          <div className={`${styles.categoryIcon} ${styles.categoryIconBlue}`}>🔗</div>
          <h3 className={styles.categoryName}>Integrations</h3>
          <p className={styles.categoryDescription}>
            Connect Salesforce, HubSpot, Stripe, PostgreSQL, and dozens of data sources
          </p>
          <span className={styles.categoryCount}>15+ integrations →</span>
        </Link>

        <Link to="/explore/agent/compare" className={styles.categoryCard}>
          <div className={`${styles.categoryIcon} ${styles.categoryIconOrange}`}>🤖</div>
          <h3 className={styles.categoryName}>Agent Comparisons</h3>
          <p className={styles.categoryDescription}>
            Compare ShedBox Agent with ChatGPT, Cursor, and other AI tools for data work
          </p>
          <span className={styles.categoryCount}>10+ comparisons →</span>
        </Link>

        <Link to="/explore/agent/personas" className={styles.categoryCard}>
          <div className={styles.categoryIcon}>👤</div>
          <h3 className={styles.categoryName}>For Your Role</h3>
          <p className={styles.categoryDescription}>
            Solutions for data analysts, business analysts, developers, and more
          </p>
          <span className={styles.categoryCount}>10+ personas →</span>
        </Link>

        <Link to="/explore/agent/capabilities" className={styles.categoryCard}>
          <div className={`${styles.categoryIcon} ${styles.categoryIconPurple}`}>⚡</div>
          <h3 className={styles.categoryName}>Capabilities</h3>
          <p className={styles.categoryDescription}>
            Explore what you can do with natural language: CSV analysis, reports, and more
          </p>
          <span className={styles.categoryCount}>10+ capabilities →</span>
        </Link>
      </div>
    </section>
  );
}

function CTASection(): ReactNode {
  return (
    <div className={styles.ctaSection}>
      <h2 className={styles.ctaTitle}>Ready to get started?</h2>
      <p className={styles.ctaDescription}>
        Install ShedBoxAI in minutes and build your first data pipeline today.
      </p>
      <div className={styles.ctaButtons}>
        <Link to="/docs/getting-started/quick-start" className={styles.ctaPrimaryBtn}>
          Get Started <span>→</span>
        </Link>
        <Link to="/docs/examples" className={styles.ctaSecondaryBtn}>
          View Examples
        </Link>
      </div>
    </div>
  );
}

export default function ExplorePage(): ReactNode {
  return (
    <Layout
      title="Explore ShedBoxAI - Comparisons, Use Cases & Integrations"
      description="Discover how ShedBoxAI compares to alternatives, explore use cases for your industry, and learn how to integrate with your existing data sources."
    >
      <main className={styles.exploreContainer}>
        <div className={styles.exploreContent}>
          <ExploreHero />
          <ProductCards />
          <QuickLinks />
          <CTASection />
        </div>
      </main>
    </Layout>
  );
}
