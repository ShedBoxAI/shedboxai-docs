import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Advanced Data Pipeline Tools with Agentic AI Analysis
        </Heading>
        <p className="hero__subtitle">
          The only data pipeline tool designed for AI agents to autonomously discover business insights. 
          Unlike traditional data pipeline tools, ShedBoxAI enables true agentic data analysis with 
          AI-powered configuration generation, Claude Code integration, and MCP-native automation.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/quick-start">
            Get Started in 5 Minutes 🚀
          </Link>
          <Link
            className="button button--outline button--lg margin-left--md"
            to="/docs/examples">
            View Examples
          </Link>
        </div>
        <div className={styles.quickPreview}>
          <pre className={styles.codePreview}>
{`# Transform any data into AI insights
data_sources:
  sales_data:
    type: csv
    path: quarterly_sales.csv
  market_trends:
    type: rest
    url: https://api.trends.com/data

processing:
  contextual_filtering:
    sales_data:
      - field: revenue
        condition: "revenue > avg(revenue) * 1.5"

ai_interface:
  prompts:
    strategic_analysis: |
      Analyze this data and provide strategic recommendations:
      {{sales_data}} {{market_trends}}

output:
  type: file
  path: strategic_insights.md`}
          </pre>
        </div>
      </div>
    </header>
  );
}

function SocialProofSection(): ReactNode {
  return (
    <section className={styles.socialProof}>
      <div className="container">
        <div className="row">
          <div className="col col--12 text--center">
            <h2>Why ShedBoxAI Beats Traditional Data Pipeline Tools</h2>
            <div className={styles.comparison}>
              <div className={styles.comparisonItem}>
                <h4>🆚 Fivetran, Airbyte, Mage AI</h4>
                <p><strong>Them:</strong> Human-designed workflows with AI assistance<br/>
                <strong>ShedBoxAI:</strong> AI agents autonomously discover insights</p>
              </div>
              <div className={styles.comparisonItem}>
                <h4>🆚 Traditional ETL Tools</h4>
                <p><strong>Them:</strong> Manual configuration, hours of setup<br/>
                <strong>ShedBoxAI:</strong> YAML data pipelines generated in minutes</p>
              </div>
              <div className={styles.comparisonItem}>
                <h4>🆚 Code-First Platforms</h4>
                <p><strong>Them:</strong> Engineers build complex workflows<br/>
                <strong>ShedBoxAI:</strong> AI agents build workflows autonomously</p>
              </div>
            </div>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <h3>🤖 Agentic AI</h3>
                <p>First data pipeline tool designed for autonomous AI agents and MCP integration</p>
              </div>
              <div className={styles.statItem}>
                <h3>⚡ 10x Faster</h3>
                <p>From 2-4 hours manual configuration to 5-10 minutes with AI generation</p>
              </div>
              <div className={styles.statItem}>
                <h3>🏢 Agent-Ready</h3>
                <p>Built for the emerging agent economy with autonomous insight discovery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AgenticDataAnalysisSection(): ReactNode {
  return (
    <section className={styles.agenticAnalysis}>
      <div className="container">
        <div className="row">
          <div className="col col--12 text--center">
            <h2>🤖 Agentic Data Analysis: Beyond AI-Assisted to AI-Autonomous</h2>
            <p className={styles.agenticSubtitle}>
              While other data pipeline tools help humans analyze faster, ShedBoxAI enables 
              <strong> AI agents to discover insights completely autonomously</strong>
            </p>
            <div className={styles.agenticDemo}>
              <div className={styles.agenticStep}>
                <h3>Agent Input</h3>
                <div className={styles.agentRequest}>
                  "Analyze customer churn and find main drivers"
                </div>
              </div>
              <div className={styles.arrow}>→</div>
              <div className={styles.agenticStep}>
                <h3>Autonomous Process</h3>
                <div className={styles.autonomousProcess}>
                  <ul>
                    <li>🔍 Introspects data automatically</li>
                    <li>🧠 Generates optimal configuration</li>
                    <li>⚡ Runs analysis independently</li>
                    <li>💡 Discovers insights autonomously</li>
                  </ul>
                </div>
              </div>
              <div className={styles.arrow}>→</div>
              <div className={styles.agenticStep}>
                <h3>Agent Output</h3>
                <div className={styles.agentInsight}>
                  "High churn correlates with customers who don't use Feature X within 30 days"
                </div>
              </div>
            </div>
            <div className={styles.agenticFeatures}>
              <div className={styles.agenticFeature}>
                <h4>🧠 Autonomous Insight Discovery</h4>
                <p>AI agents do all analytical thinking - no human intervention required</p>
              </div>
              <div className={styles.agenticFeature}>
                <h4>🔗 MCP-Native Integration</h4>
                <p>Built for the agent ecosystem with native MCP server support</p>
              </div>
              <div className={styles.agenticFeature}>
                <h4>🚀 Agent-First Design</h4>
                <p>YAML configs perfect for AI generation, introspection API for agent understanding</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClaudeCodeSection(): ReactNode {
  return (
    <section className={styles.claudeCode}>
      <div className="container">
        <div className="row">
          <div className="col col--12 text--center">
            <h2>🤖 Works Seamlessly with Claude Code</h2>
            <p className={styles.claudeSubtitle}>
              The only AI data framework that <strong>writes configurations for you</strong>
            </p>
            <div className={styles.claudeDemo}>
              <div className={styles.claudeStep}>
                <h3>1. Just Tell Claude What You Want</h3>
                <div className={styles.chatBubble}>
                  "Analyze my customer CSV and create a pipeline that filters active users over 25, 
                  then generates AI insights about their behavior patterns"
                </div>
              </div>
              <div className={styles.arrow}>→</div>
              <div className={styles.claudeStep}>
                <h3>2. Claude Introspects Your Data</h3>
                <div className={styles.introspectionBox}>
                  <strong>Automatically detects:</strong>
                  <ul>
                    <li>✅ Schema & data types</li>
                    <li>✅ Sample data & patterns</li>
                    <li>✅ Relationships between sources</li>
                    <li>✅ Optimal operations to use</li>
                  </ul>
                </div>
              </div>
              <div className={styles.arrow}>→</div>
              <div className={styles.claudeStep}>
                <h3>3. Complete Config Generated</h3>
                <div className={styles.generatedConfig}>
                  <pre>{`# Generated by Claude Code
data_sources:
  customers:
    type: csv
    path: customers.csv
processing:
  contextual_filtering:
    customers:
      - field: age
        condition: "age > 25 && status == 'active'"
ai_interface:
  prompts:
    behavior_analysis:
      system: "You are a customer behavior analyst"
      user_template: "Analyze patterns in: {{customers}}"
output:
  type: file
  path: customer_insights.json`}</pre>
                </div>
              </div>
            </div>
            <div className={styles.claudeFeatures}>
              <div className={styles.feature}>
                <h4>🔍 Smart Data Introspection</h4>
                <p>Claude analyzes your data sources and understands structure, types, and relationships automatically</p>
              </div>
              <div className={styles.feature}>
                <h4>⚡ Instant Configuration</h4>
                <p>From idea to working pipeline in seconds. No manual YAML writing or data exploration needed</p>
              </div>
              <div className={styles.feature}>
                <h4>🧠 Intelligent Recommendations</h4>
                <p>Claude suggests optimal operations, filters, and AI prompts based on your data patterns</p>
              </div>
            </div>
            <div className={styles.claudeCta}>
              <Link
                className="button button--primary button--lg"
                to="/docs/claude-code-integration">
                Try with Claude Code Now
              </Link>
              <p className={styles.claudeNote}>
                💡 <strong>Pro tip:</strong> Use Claude Code to build complex pipelines without learning YAML syntax
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GetStartedSection(): ReactNode {
  return (
    <section className={styles.getStarted}>
      <div className="container">
        <div className="row">
          <div className="col col--12 text--center">
            <h2>Get Started in 3 Steps</h2>
            <div className={styles.stepsGrid}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <h3>Install</h3>
                <code>pip install shedboxai</code>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <h3>Configure</h3>
                <code>Create config.yaml</code>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <h3>Run</h3>
                <code>shedboxai run config.yaml</code>
              </div>
            </div>
            <div className={styles.finalCta}>
              <Link
                className="button button--primary button--lg"
                to="/docs/getting-started/installation">
                Start Building Now
              </Link>
              <Link
                className="button button--outline button--lg margin-left--md"
                to="https://github.com/shedboxai/shedboxai">
                ⭐ Star on GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Advanced Data Pipeline Tools with Agentic AI Analysis`}
      description="The only data pipeline tool designed for AI agents to autonomously discover business insights. Features agentic data analysis, MCP integration, and AI-powered YAML configuration generation.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <AgenticDataAnalysisSection />
        <ClaudeCodeSection />
        <SocialProofSection />
        <GetStartedSection />
      </main>
    </Layout>
  );
}
