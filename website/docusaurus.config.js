// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OPNsense',
  tagline: 'Open-source firewall — this is the platform we document',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://comfortagwu89.github.io',
  baseUrl: '/TW4TECH-Documentation-Deliverables/',

  organizationName: 'ComfortAgwu89',
  projectName: 'TW4TECH-Documentation-Deliverables',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/ComfortAgwu89/TW4TECH-Documentation-Deliverables/tree/main/website/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'ignore',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'OPNsense',
        logo: {
          alt: 'OPNsense',
          src: 'img/logo.svg',
        },
        items: [
          {
            to: '/docs/about',
            label: 'About',
            position: 'left',
          },
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            to: '/docs/developer/overview',
            label: 'Developers',
            position: 'left',
          },
          {
            to: '/docs/api/overview',
            label: 'API',
            position: 'left',
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'left',
          },
          {
            href: 'https://github.com/ComfortAgwu89/TW4TECH-Documentation-Deliverables',
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
              {label: 'About', to: '/docs/about'},
              {label: 'Quickstart', to: '/docs/quickstart'},
              {label: 'Installation', to: '/docs/installation'},
              {label: 'User guide', to: '/docs/user-guide'},
              {label: 'Developers', to: '/docs/developer/overview'},
              {label: 'API', to: '/docs/api/overview'},
              {label: 'OpenAPI', to: '/docs/api/openapi'},
              {label: 'Blog', to: '/blog'},
            ],
          },
          {
            title: 'Project',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/ComfortAgwu89/TW4TECH-Documentation-Deliverables',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} TW4 docs authors. OPNsense is a trademark of Deciso B.V.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
