import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'ShedBoxAI',
  tagline: 'Lightweight AI-powered data processing framework',
  favicon: 'img/logo_without_text.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://shedboxai.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ShedBoxAI', // Usually your GitHub org/user name.
  projectName: 'shedboxai-docs', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ShedBoxAI/shedboxai-docs/tree/main/',
          // Version configuration
          lastVersion: 'v1.0',
          versions: {
            'v1.0': {
              label: 'v1.0',
              path: '/',
            },
          },
          onlyIncludeVersions: ['v1.0'],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ShedBoxAI/shedboxai-docs/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: null,
          ignorePatterns: [
            '/tags/**',
            '/docs/features',
            '/docs/hooks', 
            '/docs/installation',
            '/docs/integrations',
            '/docs/project-structure',
            '/docs/troubleshooting',
            '/docs/tools',
            '/docs/typescript', 
            '/docs/workflows',
            '/docs/api-reference',
            '/docs/quickstart',
            '/docs/templates',
            '/docs/configuration',
            '/docs/custom-commands',
            '/docs/deployment'
          ],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            
            return items.map((item) => {
              // Homepage gets highest priority
              if (item.url === 'https://shedboxai.com/') {
                return {...item, priority: 1.0, changefreq: 'daily'};
              }
              
              // Landing pages get high priority
              if (item.url.includes('/claude-code-integration') ||
                  item.url.includes('/ai-configuration-generation') ||
                  item.url.includes('/social-media-demographics') ||
                  item.url.includes('/weather-ecommerce') ||
                  item.url.includes('/economic-retail-analytics') ||
                  item.url.includes('/brand-reputation-analytics')) {
                return {...item, priority: 0.9, changefreq: 'weekly'};
              }
              
              // Blog posts get medium-high priority
              if (item.url.includes('/blog/') && !item.url.includes('/blog/tags') && 
                  !item.url.includes('/blog/archive') && !item.url.includes('/blog/authors')) {
                return {...item, priority: 0.8, changefreq: 'weekly'};
              }
              
              // Key documentation pages
              if (item.url.includes('/docs/getting-started/') || 
                  item.url.includes('/docs/claude-code-integration')) {
                return {...item, priority: 0.7, changefreq: 'weekly'};
              }
              
              // Other documentation
              if (item.url.includes('/docs/')) {
                return {...item, priority: 0.6, changefreq: 'weekly'};
              }
              
              // Main section pages
              if (item.url.includes('/community') || 
                  item.url.includes('/marketplace')) {
                return {...item, priority: 0.5, changefreq: 'weekly'};
              }
              
              // Utility and tag pages get lower priority
              if (item.url.includes('/tags/') || 
                  item.url.includes('/archive') || 
                  item.url.includes('/authors') ||
                  item.url.includes('/markdown-page')) {
                return {...item, priority: 0.3, changefreq: 'monthly'};
              }
              
              // Default for other pages
              return {...item, priority: 0.4, changefreq: 'weekly'};
            });
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-T2YHM6JEG0',
        anonymizeIP: true,
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // Redirect missing docs URLs to existing equivalents
          {
            to: '/docs/getting-started/installation',
            from: ['/docs/installation', '/docs/quickstart'],
          },
          {
            to: '/docs/configuration/data-sources',
            from: '/docs/configuration',
          },
          {
            to: '/docs/operations/templates',
            from: '/docs/templates',
          },
          {
            to: '/docs/troubleshooting/common-issues',
            from: '/docs/troubleshooting',
          },
          {
            to: '/docs/getting-started/installation',
            from: ['/docs/features', '/docs/hooks', '/docs/integrations', '/docs/project-structure', '/docs/tools', '/docs/typescript', '/docs/workflows', '/docs/api-reference', '/docs/custom-commands', '/docs/deployment'],
          },
        ],
      },
    ],
  ],
  themeConfig: {
    // Replace with your project's social card
    image: 'img/logo.png',
    metadata: [
    {name: 'description', content: 'ShedBoxAI — Lightweight AI-powered data processing framework. Official website & documentation.'},
    {name: 'keywords', content: 'shedboxai, shed box ai, ai framework, data processing, open source ai, ai pipeline'},
    {property: 'og:title', content: 'ShedBoxAI — Official Site'},
    {property: 'og:description', content: 'Lightweight AI-powered data processing framework. Official docs, blog & community.'},
    {property: 'og:url', content: 'https://shedboxai.com'},
    {property: 'og:image', content: 'https://shedboxai.com/img/logo.png'},
    {property: 'twitter:card', content: 'summary_large_image'},
    {property: 'twitter:site', content: '@ShedboxAI'}
  ],
  headTags: [
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        "name": "ShedBoxAI",
        "alternateName": ["shedboxai","Shed Box AI", "shedbox ai", "ShedBox AI"],
        "url": "https://shedboxai.com",
        "codeRepository": "https://github.com/ShedBoxAI/ShedBoxAI",
        "programmingLanguage": ["Python","TypeScript"],
        "author": { "@type": "Organization", "name": "ShedBoxAI" },
        "sameAs": [
          "https://github.com/ShedBoxAI/ShedBoxAI",
          "https://shedboxai.com",
          "https://x.com/ShedboxAI",
          "https://shedboxai.com/docs/getting-started/installation"
        ]
      }),
    },
  ],
    navbar: {
      title: 'ShedBoxAI',
      logo: {
        alt: 'ShedBoxAI Logo',
        src: 'img/logo_without_text.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/docs/examples', label: 'Examples', position: 'left'},
        {to: '/marketplace', label: 'Marketplace', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/community', label: 'Community', position: 'left'},
        {
          href: 'https://github.com/ShedBoxAI/ShedBoxAI',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/installation',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/shedboxai',
            },
            {
              label: 'X',
              href: 'https://x.com/ShedboxAI',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ShedBoxAI/ShedBoxAI',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ShedBoxAI. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'yaml', 'json', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
