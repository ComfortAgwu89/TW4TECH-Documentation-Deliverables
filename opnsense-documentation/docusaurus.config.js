// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'In the margin',
  tagline: 'OPNsense notes kept beside the official handbook',
  favicon: 'img/favicon.ico',

  url: 'https://comfortagwu89.github.io',
  baseUrl: '/TW4TECH-Documentation-Deliverables/',

  organizationName: 'ComfortAgwu89',
  projectName: 'TW4TECH-Documentation-Deliverables',
  trailingSlash: false,

  onBrokenLinks: 'throw',

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
          editUrl:
            'https://github.com/ComfortAgwu89/TW4TECH-Documentation-Deliverables/tree/main/opnsense-documentation/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Journal',
          blogDescription: 'Short notes written while learning the lab box',
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
        title: 'In the margin',
        logo: {
          alt: 'In the margin',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'chapters',
            position: 'left',
            label: 'Chapters',
          },
          {to: '/blog', label: 'Journal', position: 'left'},
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
            title: 'Chapters',
            items: [
              {label: 'Preface', to: '/docs/preface'},
              {label: 'The machine', to: '/docs/the-machine'},
              {label: 'Sign in', to: '/docs/sign-in'},
              {label: 'The room', to: '/docs/the-room'},
            ],
          },
          {
            title: 'Later',
            items: [
              {label: 'A script', to: '/docs/a-script'},
              {label: 'The calls', to: '/docs/the-calls'},
              {label: 'Keep writing', to: '/docs/keep-writing'},
            ],
          },
          {
            title: 'Official',
            items: [
              {label: 'Handbook', href: 'https://docs.opnsense.org/'},
              {label: 'Download', href: 'https://opnsense.org/download/'},
              {label: 'Source', href: 'https://github.com/opnsense/core'},
            ],
          },
        ],
        copyright: `Notes © ${new Date().getFullYear()} Comfort Agwu. OPNsense is a trademark of Deciso B.V.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
