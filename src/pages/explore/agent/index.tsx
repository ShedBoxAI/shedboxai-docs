import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from '../explore.module.css';

function AgentHero(): ReactNode {
  return (
    <div className={styles.exploreHero}>
      <span className={styles.exploreBadge}>Coming Soon</span>
      <h1 className={styles.exploreTitle}>
        ShedBox{' '}
        <span className={styles.exploreTitleGradient}>Agent</span>
      </h1>
      <p className={styles.exploreSubtitle}>
        Describe what you want in plain English. The agent analyzes your data,
        generates configurations, and executes pipelines automatically.
      </p>
    </div>
  );
}

function CategoryCards(): ReactNode {
  return (
    <div className={styles.categoryGrid}>
      <Link to="/explore/agent/compare" className={styles.categoryCard}>
        <div className={`${styles.categoryIcon} ${styles.categoryIconOrange}`}>🤖</div>
        <h3 className={styles.categoryName}>Compare AI Tools</h3>
        <p className={styles.categoryDescription}>
          See how ShedBox Agent compares to ChatGPT, Cursor, GitHub Copilot, and other AI tools for data work.
        </p>
        <span className={styles.categoryCount}>10 comparisons →</span>
      </Link>

      <Link to="/explore/agent/personas" className={styles.categoryCard}>
        <div className={styles.categoryIcon}>👤</div>
        <h3 className={styles.categoryName}>For Your Role</h3>
        <p className={styles.categoryDescription}>
          Solutions tailored for data analysts, business analysts, developers, PMs, and more.
        </p>
        <span className={styles.categoryCount}>10 personas →</span>
      </Link>

      <Link to="/explore/agent/capabilities" className={styles.categoryCard}>
        <div className={`${styles.categoryIcon} ${styles.categoryIconPurple}`}>⚡</div>
        <h3 className={styles.categoryName}>Capabilities</h3>
        <p className={styles.categoryDescription}>
          Discover what you can do: CSV analysis, report generation, data cleaning, and more.
        </p>
        <span className={styles.categoryCount}>10 capabilities →</span>
      </Link>
    </div>
  );
}

function HowItWorks(): ReactNode {
  return (
    <section style={{marginTop: '4rem'}}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>How It Works</span>
        <h2 className={styles.sectionTitle}>From English to executed pipeline</h2>
        <p className={styles.sectionSubtitle}>
          No YAML knowledge required. The agent handles everything.
        </p>
      </div>

      <div className={styles.productGrid}>
        <div className={`${styles.productCard} ${styles.productCardBlue}`}>
          <div className={`${styles.productIcon} ${styles.productIconBlue}`}>1</div>
          <h3 className={styles.productName}>Describe Your Goal</h3>
          <p className={styles.productDescription}>
            Tell the agent what you want in plain English: "Analyze my sales CSV and find
            customers who spent over $1000 last month."
          </p>
          <ul className={styles.productFeatures}>
            <li>Natural language input</li>
            <li>No coding required</li>
            <li>Understands complex requests</li>
          </ul>
        </div>

        <div className={`${styles.productCard} ${styles.productCardTeal}`}>
          <div className={`${styles.productIcon} ${styles.productIconTeal}`}>2</div>
          <h3 className={styles.productName}>Agent Analyzes & Plans</h3>
          <p className={styles.productDescription}>
            The agent introspects your data sources, understands schemas, and creates
            an execution plan with the right operations.
          </p>
          <ul className={styles.productFeatures}>
            <li>Auto-detects data schemas</li>
            <li>Intelligent task planning</li>
            <li>Generates optimal YAML</li>
          </ul>
        </div>
      </div>

      <div className={styles.productGrid} style={{marginTop: '1.5rem'}}>
        <div className={`${styles.productCard} ${styles.productCardBlue}`}>
          <div className={`${styles.productIcon} ${styles.productIconBlue}`}>3</div>
          <h3 className={styles.productName}>Review & Execute</h3>
          <p className={styles.productDescription}>
            Review the generated configuration, make adjustments if needed, then let
            the agent execute the pipeline and return results.
          </p>
          <ul className={styles.productFeatures}>
            <li>Human-in-the-loop control</li>
            <li>Iterative refinement</li>
            <li>Results in seconds</li>
          </ul>
        </div>

        <div className={`${styles.productCard} ${styles.productCardTeal}`}>
          <div className={`${styles.productIcon} ${styles.productIconTeal}`}>⚡</div>
          <h3 className={styles.productName}>Works With Any LLM</h3>
          <p className={styles.productDescription}>
            Choose your preferred AI provider: Claude (Anthropic), OpenAI, or run
            locally with Ollama and other local models.
          </p>
          <ul className={styles.productFeatures}>
            <li>Claude, OpenAI, local models</li>
            <li>100+ providers via LiteLLM</li>
            <li>Your API keys, your data</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function ForWho(): ReactNode {
  const personas = [
    {name: 'Data Analysts', slug: 'data-analysts', desc: 'Query data without SQL'},
    {name: 'Business Analysts', slug: 'business-analysts', desc: 'Get insights faster'},
    {name: 'Developers', slug: 'developers', desc: 'Skip boilerplate code'},
    {name: 'Non-Technical Users', slug: 'non-technical-users', desc: 'No coding needed'},
  ];

  return (
    <section style={{marginTop: '4rem'}}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Built For You</span>
        <h2 className={styles.sectionTitle}>Who uses ShedBox Agent?</h2>
      </div>

      <div className={styles.categoryGrid}>
        {personas.map((persona) => (
          <Link
            key={persona.slug}
            to={`/explore/agent/personas/${persona.slug}`}
            className={styles.categoryCard}
          >
            <div className={styles.categoryIcon}>👤</div>
            <h3 className={styles.categoryName}>{persona.name}</h3>
            <p className={styles.categoryDescription}>{persona.desc}</p>
            <span className={styles.categoryCount}>Learn more →</span>
          </Link>
        ))}
        <Link to="/explore/agent/personas" className={styles.categoryCard}>
          <div className={`${styles.categoryIcon} ${styles.categoryIconPurple}`}>+</div>
          <h3 className={styles.categoryName}>View All</h3>
          <p className={styles.categoryDescription}>
            See all personas including PMs, founders, ops teams, and more
          </p>
          <span className={styles.categoryCount}>All personas →</span>
        </Link>
      </div>
    </section>
  );
}

function CTASection(): ReactNode {
  return (
    <div className={styles.ctaSection}>
      <h2 className={styles.ctaTitle}>Get notified when Agent launches</h2>
      <p className={styles.ctaDescription}>
        ShedBox Agent is coming soon. In the meantime, try ShedBoxAI framework
        with Claude Code integration.
      </p>
      <div className={styles.ctaButtons}>
        <Link to="/docs/claude-code-integration" className={styles.ctaPrimaryBtn}>
          Try Claude Code Integration <span>→</span>
        </Link>
        <Link to="/explore/shedboxai" className={styles.ctaSecondaryBtn}>
          Explore ShedBoxAI Framework
        </Link>
      </div>
    </div>
  );
}

export default function AgentExplorePage(): ReactNode {
  return (
    <Layout
      title="ShedBox Agent - Natural Language Data Processing"
      description="ShedBox Agent: Describe what you want in plain English, and let AI generate and execute data pipelines automatically. Compare with ChatGPT, Cursor, and more."
    >
      <main className={styles.exploreContainer}>
        <div className={styles.exploreContent}>
          <AgentHero />
          <CategoryCards />
          <HowItWorks />
          <ForWho />
          <CTASection />
        </div>
      </main>
    </Layout>
  );
}
