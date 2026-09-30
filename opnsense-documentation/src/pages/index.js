import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const chapters = [
  {
    n: 'I',
    title: 'Preface',
    time: '4 min',
    text: 'What this booklet is, and what it refuses to be.',
    to: '/docs/preface',
  },
  {
    n: 'II',
    title: 'The machine',
    time: '8 min',
    text: 'An image, a virtual machine, and why there is no container to start.',
    to: '/docs/the-machine',
  },
  {
    n: 'III',
    title: 'Sign in',
    time: '6 min',
    text: 'Two accounts, one address, and the certificate warning.',
    to: '/docs/sign-in',
  },
  {
    n: 'IV',
    title: 'The room',
    time: '7 min',
    text: 'LAN, WAN, DHCP, and the screens you will actually open.',
    to: '/docs/the-room',
  },
  {
    n: 'V',
    title: 'A script',
    time: '8 min',
    text: 'One key, one GET, and the moment a POST is allowed.',
    to: '/docs/a-script',
  },
  {
    n: 'VI',
    title: 'The calls',
    time: '10 min',
    text: 'The handful of routes this booklet names, plus the spec file.',
    to: '/docs/the-calls',
  },
  {
    n: 'VII',
    title: 'Keep writing',
    time: '4 min',
    text: 'How to add a chapter here without breaking the build.',
    to: '/docs/keep-writing',
  },
];

export default function Home() {
  return (
    <Layout
      title="In the margin"
      description="Comfort Agwu's booklet beside the official OPNsense handbook: a lab machine, the GUI, and a few HTTP calls.">
      <main>
        <div className={styles.cover}>
          <p className={styles.eyebrow}>OPNsense · a lab booklet</p>
          <Heading as="h1">In the margin</Heading>
          <hr className={styles.rule} />
          <p className={styles.deck}>
            The official handbook is the book. These chapters are what I write
            beside it so a first afternoon does not depend on memory. The
            firewall itself stays in{' '}
            <Link to="https://github.com/opnsense/core">opnsense/core</Link>.
          </p>
          <ol className={styles.contents}>
            {chapters.map((chapter) => (
              <li key={chapter.n}>
                <span className={styles.index}>{chapter.n}</span>
                <span>
                  <Link to={chapter.to}>
                    <strong>{chapter.title}</strong>
                  </Link>
                  <br />
                  {chapter.text}
                </span>
                <span className={styles.time}>{chapter.time}</span>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </Layout>
  );
}
