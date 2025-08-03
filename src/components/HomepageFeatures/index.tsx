import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Configuration-Driven Development',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Build complex data processing pipelines using simple <strong>YAML configuration</strong> files. 
        No coding required - just define your data sources, operations, and outputs. 
        Deploy in minutes, not months.
      </>
    ),
  },
  {
    title: 'AI Model Integration',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Seamlessly integrate with <strong>Claude, OpenAI, and custom APIs</strong> to add intelligence 
        to your workflows. Batch processing, parallel execution, and advanced templating included.
      </>
    ),
  },
  {
    title: 'Multi-Source Connectivity',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Connect to <strong>CSV, JSON, REST APIs, and text files</strong> with enterprise-grade 
        authentication. OAuth flows, token management, and automatic retry handling.
      </>
    ),
  },
  {
    title: 'Advanced Operations',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        <strong>6 operation types with 80+ functions</strong>: filtering, format conversion, 
        summarization, relationships, aggregations, and templating. Expression engine included.
      </>
    ),
  },
  {
    title: 'Enterprise Security',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        <strong>Production-ready security</strong> with multi-stage authentication, environment 
        variable management, secure credential handling, and comprehensive error recovery.
      </>
    ),
  },
  {
    title: 'Automated Documentation',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        <strong>Introspection system</strong> automatically analyzes your data sources, detects 
        schemas, finds relationships, and generates professional documentation.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--6 col--lg-4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
