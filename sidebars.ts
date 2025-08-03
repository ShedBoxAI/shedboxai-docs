import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // ShedBoxAI Documentation Structure
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/quick-start', 
        'getting-started/first-pipeline',
      ],
    },
    {
      type: 'doc',
      id: 'claude-code-integration',
      label: 'Claude Code Integration',
    },
    {
      type: 'category',
      label: 'Configuration',
      items: [
        'configuration/data-sources',
        'configuration/ai-interface',
        'configuration/output-formats',
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      items: [
        'operations/index',
        'operations/contextual-filtering',
        'operations/format-conversion',
        'operations/summarization',
        'operations/relationships',
        'operations/templates',
        'operations/advanced-operations',
      ],
    },
    {
      type: 'category',
      label: 'Introspection',
      items: [
        'introspection/overview',
        'introspection/analyzers',
        'introspection/documentation-generation',
      ],
    },
    {
      type: 'category',
      label: 'CLI Reference',
      items: [
        'cli-reference/run-command',
        'cli-reference/introspect-command',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        'troubleshooting/common-issues',
        'troubleshooting/debugging',
        'troubleshooting/performance',
      ],
    },
  ],
};

export default sidebars;
