import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from '../../explore.module.css';

const integrations = [
  {
    slug: 'salesforce',
    name: 'Salesforce',
    description: 'CRM data export, opportunity tracking, lead analysis',
    category: 'CRM',
    icon: '☁️',
  },
  {
    slug: 'hubspot',
    name: 'HubSpot',
    description: 'Marketing automation, contact sync, deal pipelines',
    category: 'CRM',
    icon: '🧡',
  },
  {
    slug: 'stripe',
    name: 'Stripe',
    description: 'Payment data, subscription analytics, revenue metrics',
    category: 'Payments',
    icon: '💳',
  },
  {
    slug: 'quickbooks',
    name: 'QuickBooks',
    description: 'Accounting data, financial reports, invoice tracking',
    category: 'Finance',
    icon: '📒',
  },
  {
    slug: 'zendesk',
    name: 'Zendesk',
    description: 'Support tickets, customer satisfaction, agent metrics',
    category: 'Support',
    icon: '🎧',
  },
  {
    slug: 'google-analytics',
    name: 'Google Analytics',
    description: 'Website traffic, user behavior, conversion data',
    category: 'Analytics',
    icon: '📊',
  },
  {
    slug: 'shopify',
    name: 'Shopify',
    description: 'E-commerce orders, inventory, customer data',
    category: 'E-commerce',
    icon: '🛒',
  },
  {
    slug: 'notion',
    name: 'Notion',
    description: 'Database export, page content, workspace data',
    category: 'Productivity',
    icon: '📝',
  },
  {
    slug: 'airtable',
    name: 'Airtable',
    description: 'Base data, record sync, automation triggers',
    category: 'Productivity',
    icon: '📋',
  },
  {
    slug: 'mongodb',
    name: 'MongoDB',
    description: 'Document database queries, aggregation pipelines',
    category: 'Database',
    icon: '🍃',
  },
  {
    slug: 'postgresql',
    name: 'PostgreSQL',
    description: 'SQL queries, data extraction, sync',
    category: 'Database',
    icon: '🐘',
  },
  {
    slug: 'mysql',
    name: 'MySQL',
    description: 'Database queries, data export, transformations',
    category: 'Database',
    icon: '🐬',
  },
  {
    slug: 'rest-apis',
    name: 'REST APIs',
    description: 'Any REST API with authentication and pagination',
    category: 'Generic',
    icon: '🔌',
  },
  {
    slug: 'csv-json',
    name: 'CSV & JSON',
    description: 'Local files, cloud storage, data processing',
    category: 'Files',
    icon: '📄',
  },
  {
    slug: 'webhooks',
    name: 'Webhooks',
    description: 'Real-time data ingestion, event processing',
    category: 'Real-time',
    icon: '⚡',
  },
];

const categories = [...new Set(integrations.map((i) => i.category))];

function IntegrationsHero(): ReactNode {
  return (
    <div className={styles.exploreHero}>
      <span className={styles.exploreBadge}>Integrations</span>
      <h1 className={styles.exploreTitle}>
        Connect{' '}
        <span className={styles.exploreTitleGradient}>Any Data Source</span>
      </h1>
      <p className={styles.exploreSubtitle}>
        ShedBoxAI connects to CRMs, databases, APIs, and files. Pull data from anywhere
        and process it with a single YAML configuration.
      </p>
    </div>
  );
}

function IntegrationGrid(): ReactNode {
  return (
    <section>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Data Sources</span>
        <h2 className={styles.sectionTitle}>Connect and process</h2>
        <p className={styles.sectionSubtitle}>
          Step-by-step guides with example configurations
        </p>
      </div>

      <div className={styles.categoryGrid}>
        {integrations.map((integration) => (
          <Link
            key={integration.slug}
            to={`/explore/shedboxai/integrations/${integration.slug}`}
            className={styles.categoryCard}
          >
            <div className={styles.categoryIcon}>{integration.icon}</div>
            <h3 className={styles.categoryName}>{integration.name}</h3>
            <p className={styles.categoryDescription}>{integration.description}</p>
            <span className={styles.categoryCount}>{integration.category} →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CTASection(): ReactNode {
  return (
    <div className={styles.ctaSection}>
      <h2 className={styles.ctaTitle}>Don't see your data source?</h2>
      <p className={styles.ctaDescription}>
        ShedBoxAI can connect to any REST API. Check the documentation for
        custom data source configuration.
      </p>
      <div className={styles.ctaButtons}>
        <Link to="/docs/configuration/data-sources" className={styles.ctaPrimaryBtn}>
          Data Sources Docs <span>→</span>
        </Link>
        <Link to="/docs/examples" className={styles.ctaSecondaryBtn}>
          Browse Examples
        </Link>
      </div>
    </div>
  );
}

export default function IntegrationsPage(): ReactNode {
  return (
    <Layout
      title="ShedBoxAI Integrations - Salesforce, HubSpot, Stripe & More"
      description="Connect ShedBoxAI to Salesforce, HubSpot, Stripe, PostgreSQL, MongoDB, and 15+ data sources. Step-by-step integration guides."
    >
      <main className={styles.exploreContainer}>
        <div className={styles.exploreContent}>
          <IntegrationsHero />
          <IntegrationGrid />
          <CTASection />
        </div>
      </main>
    </Layout>
  );
}
