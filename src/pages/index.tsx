import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

/* ============================================
   HERO SECTION
   ============================================ */

function HeroSection(): ReactNode {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>
          Now with Claude Code Integration
        </div>

        <h1 className={styles.heroTitle}>
          AI-Powered Data Pipelines,{' '}
          <span className={styles.heroTitleGradient}>Simplified</span>
        </h1>

        <p className={styles.heroSubtitle}>
          Transform complex data workflows into simple YAML. Connect any data source,
          process with AI, and deploy in minutes, not months.
        </p>

        <div className={styles.heroButtons}>
          <Link to="/docs/getting-started/quick-start" className={styles.heroPrimaryBtn}>
            Get Started
            <span>→</span>
          </Link>
          <Link to="/docs/examples" className={styles.heroSecondaryBtn}>
            View Examples
          </Link>
        </div>

        <div className={styles.heroCodeWrapper}>
          <div className={styles.heroCodeContainer}>
            <div className={styles.codeHeader}>
              <span className={`${styles.codeDot} ${styles.codeDotRed}`} />
              <span className={`${styles.codeDot} ${styles.codeDotYellow}`} />
              <span className={`${styles.codeDot} ${styles.codeDotGreen}`} />
              <span className={styles.codeTitle}>config.yaml</span>
            </div>
            <pre className={styles.heroCode}>
{`data_sources:
  customers:
    type: csv
    path: customers.csv

ai_interface:
  prompts:
    insights:
      system: "You are a data analyst"
      user_template: "Analyze: {{customers}}"

output:
  type: file
  path: insights.md`}
            </pre>
            <Link
              className={styles.heroCodeLink}
              to="/docs/claude-code-integration"
              title="Try with Claude Code"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   STATS SECTION
   ============================================ */

function StatsSection(): ReactNode {
  return (
    <section className={styles.trustedBy}>
      <div className={styles.trustedByContent}>
        <p className={styles.trustedByLabel}>Why teams choose ShedBoxAI</p>
        <div className={styles.trustedByStats}>
          <div className={styles.statItem}>
            <div className={`${styles.statValue} ${styles.statValueGradient}`}>10x</div>
            <div className={styles.statLabel}>Faster pipeline development</div>
          </div>
          <div className={styles.statItem}>
            <div className={`${styles.statValue} ${styles.statValueGradient}`}>80+</div>
            <div className={styles.statLabel}>Built-in operations</div>
          </div>
          <div className={styles.statItem}>
            <div className={`${styles.statValue} ${styles.statValueGradient}`}>5min</div>
            <div className={styles.statLabel}>To first working pipeline</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   BENTO FEATURES SECTION
   ============================================ */

function FeaturesSection(): ReactNode {
  return (
    <section className={styles.features}>
      <div className={styles.featuresContent}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Features</span>
          <h2 className={styles.sectionTitle}>Everything you need to build data pipelines</h2>
          <p className={styles.sectionSubtitle}>
            From simple CSV processing to complex multi-source AI workflows, ShedBoxAI handles it all
          </p>
        </div>

        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚙️</div>
            <h3 className={styles.featureTitle}>Configuration-Driven</h3>
            <p className={styles.featureDescription}>
              Define your entire pipeline in YAML. No coding required — just declare data sources, processing steps, and outputs.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.featureIconBlue}`}>🤖</div>
            <h3 className={styles.featureTitle}>AI Model Integration</h3>
            <p className={styles.featureDescription}>
              Native support for Claude, OpenAI, and custom APIs. Batch processing and parallel execution included.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.featureIconPurple}`}>🔗</div>
            <h3 className={styles.featureTitle}>Multi-Source Connectivity</h3>
            <p className={styles.featureDescription}>
              CSV, JSON, REST APIs, and text files with enterprise-grade authentication and automatic retry handling.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.featureIconOrange}`}>⚡</div>
            <h3 className={styles.featureTitle}>80+ Operations</h3>
            <p className={styles.featureDescription}>
              Filtering, format conversion, summarization, relationships, templating, and more built-in functions.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔒</div>
            <h3 className={styles.featureTitle}>Enterprise Security</h3>
            <p className={styles.featureDescription}>
              Multi-stage authentication, secure credential handling, and comprehensive error recovery.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.featureIconBlue}`}>🔍</div>
            <h3 className={styles.featureTitle}>Smart Introspection</h3>
            <p className={styles.featureDescription}>
              Auto-detect schemas, analyze sample data, and generate documentation from a single command.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CLAUDE CODE SECTION
   ============================================ */

function ClaudeCodeSection(): ReactNode {
  return (
    <section className={styles.claudeSection}>
      <div className={styles.claudeContent}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Claude Code Integration</span>
          <h2 className={styles.sectionTitle}>Let AI write your pipelines</h2>
          <p className={styles.sectionSubtitle}>
            The only data framework that generates configurations for you.
            Just describe what you want in plain English.
          </p>
        </div>

        {/* Horizontal Steps Flow */}
        <div className={styles.claudeFlow}>
          <div className={styles.claudeFlowStep}>
            <div className={styles.claudeFlowNumber}>1</div>
            <div className={styles.claudeFlowContent}>
              <h3 className={styles.claudeFlowTitle}>Describe</h3>
              <p className={styles.claudeFlowText}>Tell Claude what you want in plain English</p>
            </div>
          </div>

          <div className={styles.claudeFlowArrow}>→</div>

          <div className={styles.claudeFlowStep}>
            <div className={styles.claudeFlowNumber}>2</div>
            <div className={styles.claudeFlowContent}>
              <h3 className={styles.claudeFlowTitle}>Analyze</h3>
              <p className={styles.claudeFlowText}>Claude introspects your data sources</p>
            </div>
          </div>

          <div className={styles.claudeFlowArrow}>→</div>

          <div className={styles.claudeFlowStep}>
            <div className={styles.claudeFlowNumber}>3</div>
            <div className={styles.claudeFlowContent}>
              <h3 className={styles.claudeFlowTitle}>Generate</h3>
              <p className={styles.claudeFlowText}>Get a working YAML config instantly</p>
            </div>
          </div>
        </div>

        {/* Demo Card */}
        <div className={styles.claudeDemoCard}>
          <div className={styles.claudeDemoLeft}>
            <div className={styles.iMessageBubble}>
              Analyze my customer CSV and create a pipeline that filters active users over 25, then generates AI insights about their behavior
            </div>
          </div>
          <div className={styles.claudeDemoArrow}>→</div>
          <div className={styles.claudeDemoRight}>
            <div className={styles.claudeDemoLabel}>Generated config</div>
            <pre className={styles.claudeDemoCode}>{`data_sources:
  customers: { type: csv, path: customers.csv }
processing:
  filter: { field: age, condition: "> 25" }
ai_interface:
  prompts:
    analysis: "Analyze: {{customers}}"`}</pre>
          </div>
        </div>

        <div className={styles.claudeCta}>
          <Link to="/docs/claude-code-integration" className={styles.heroPrimaryBtn}>
            Try with Claude Code
            <span>→</span>
          </Link>
          <p className={styles.claudeCtaNote}>
            Build complex pipelines without learning YAML syntax
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SOCIAL PROOF SECTION
   ============================================ */

function SocialProofSection(): ReactNode {
  return (
    <section className={styles.socialProof}>
      <div className={styles.socialProofContent}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Why ShedBoxAI</span>
          <h2 className={styles.sectionTitle}>Built for modern data teams</h2>
        </div>

        <div className={styles.socialProofGrid}>
          <div className={styles.proofCard}>
            <div className={styles.proofIcon}>🤖</div>
            <h3 className={styles.proofTitle}>AI-First</h3>
            <p className={styles.proofDesc}>
              The only data pipeline tool with Claude Code integration for automated configuration generation
            </p>
          </div>
          <div className={styles.proofCard}>
            <div className={styles.proofIcon}>⚡</div>
            <h3 className={styles.proofTitle}>10x Faster</h3>
            <p className={styles.proofDesc}>
              What takes 2-4 hours manually becomes 5-10 minutes with AI-assisted pipeline creation
            </p>
          </div>
          <div className={styles.proofCard}>
            <div className={styles.proofIcon}>🏢</div>
            <h3 className={styles.proofTitle}>Enterprise Ready</h3>
            <p className={styles.proofDesc}>
              Production-grade security, authentication, and error handling trusted by data teams
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   GET STARTED SECTION
   ============================================ */

function GetStartedSection(): ReactNode {
  return (
    <section className={styles.getStarted}>
      <div className={styles.getStartedContent}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Quick Start</span>
          <h2 className={styles.sectionTitle}>Up and running in 3 steps</h2>
        </div>

        <div className={styles.stepsGrid}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3 className={styles.stepTitle}>Install</h3>
            <code className={styles.stepCode}>pip install shedboxai</code>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3 className={styles.stepTitle}>Configure</h3>
            <code className={styles.stepCode}>Create config.yaml</code>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3 className={styles.stepTitle}>Run</h3>
            <code className={styles.stepCode}>shedboxai run config.yaml</code>
          </div>
        </div>

        <div className={styles.finalCta}>
          <Link to="/docs/getting-started/installation" className={styles.heroPrimaryBtn}>
            Start Building Now
            <span>→</span>
          </Link>
          <Link
            to="https://github.com/ShedBoxAI/ShedBoxAI"
            className={`${styles.heroSecondaryBtn} ${styles.githubBtn}`}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Star on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   MAIN COMPONENT
   ============================================ */

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title} - AI Data Pipeline Tool`}
      description="Transform complex data workflows into simple YAML. The leading AI-powered data pipeline tool with Claude Code integration.">
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <ClaudeCodeSection />
        <SocialProofSection />
        <GetStartedSection />
      </main>
    </Layout>
  );
}
