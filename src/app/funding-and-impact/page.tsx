import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AcademicCapIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  BuildingLibraryIcon,
  CheckBadgeIcon,
  CircleStackIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  HeartIcon,
  SparklesIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import Header from '@/components/common/Header';
import styles from './funding-impact.module.css';

export const metadata: Metadata = {
  title: 'Funding & Impact | MentalMind Foundation',
  description:
    'Explore MentalMind’s ₹2 crore approved project grant from Let’s Educate India Foundations, its funding plan and its reach of 5,000+ average monthly unique users.',
  alternates: { canonical: 'https://mentalmind.in/funding-and-impact' },
  openGraph: {
    title: 'Funding & Impact | MentalMind Foundation',
    description:
      '₹2 crore in approved project funding. 5,000+ average monthly unique users. A wider circle of mental wellbeing support.',
    url: 'https://mentalmind.in/funding-and-impact',
    type: 'website',
  },
};

const priorities = [
  {
    title: 'A better support experience',
    description: 'Develop the MentalMind initiative and expand the operations behind it.',
    icon: HeartIcon,
    tone: 'green',
  },
  {
    title: 'Stronger technology',
    description:
      'Build the technological infrastructure needed to support the initiative’s growth.',
    icon: CircleStackIcon,
    tone: 'blue',
  },
  {
    title: 'More accessible support',
    description: 'Improve access to technology-enabled mental wellbeing support for young people.',
    icon: GlobeAltIcon,
    tone: 'orange',
  },
  {
    title: 'Closer to student communities',
    description: 'Extend institutional outreach and connect with educational communities.',
    icon: AcademicCapIcon,
    tone: 'purple',
  },
];

const tranches = [
  { number: '01', percent: 10, amount: '₹20 lakh', condition: 'On signing the grant agreement.' },
  { number: '02', percent: 30, amount: '₹60 lakh', condition: 'After tranche 1 reporting.' },
  { number: '03', percent: 30, amount: '₹60 lakh', condition: 'After tranche 2 reporting.' },
  { number: '04', percent: 30, amount: '₹60 lakh', condition: 'After tranche 3 reporting.' },
];

export default function FundingAndImpactPage() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#funding-impact-content">
        Skip to funding and impact content
      </a>
      <Header />
      <main id="funding-impact-content">
        <section className={`${styles.hero} ${styles.container}`} aria-labelledby="impact-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span /> Funding &amp; impact
            </p>
            <h1 id="impact-title">
              Funding for growth.
              <br />
              <em>Impact for people.</em>
            </h1>
            <p className={styles.heroDescription}>
              Let’s Educate India Foundations has approved a ₹2 crore project grant to MentalMind
              Foundation, supporting the next chapter of student mental wellbeing.
            </p>
            <div className={styles.heroActions}>
              <a href="#funding-plan" className={styles.primaryButton}>
                Explore the funding plan <ArrowDownIcon aria-hidden="true" />
              </a>
              <a href="#community-impact" className={styles.textLink}>
                Our community impact <ArrowRightIcon aria-hidden="true" />
              </a>
            </div>
            <div className={styles.heroNote}>
              <HeartIcon aria-hidden="true" />
              <span>Non-repayable project grant · Not towards corpus</span>
            </div>
          </div>

          <div className={styles.grantCard}>
            <div className={styles.grantCardTop}>
              <span>
                <CheckBadgeIcon aria-hidden="true" /> Formally approved
              </span>
              <SparklesIcon aria-hidden="true" />
            </div>
            <div className={styles.grantAmount}>
              ₹2 <span>crore</span>
            </div>
            <p className={styles.grantAmountFull}>INR 2,00,00,000 · Rupees Two Crore Only</p>
            <div className={styles.grantProvider}>
              <span>Approved by</span>
              <strong>Let’s Educate India Foundations</strong>
            </div>
          </div>
        </section>

        <div className={`${styles.contextStrip} ${styles.container}`}>
          <span>
            <BuildingLibraryIcon aria-hidden="true" /> MentalMind Foundation
          </span>
          <span>Student &amp; youth mental wellbeing</span>
        </div>

        <section
          id="community-impact"
          className={`${styles.communitySection} ${styles.container}`}
          aria-labelledby="community-title"
        >
          <div className={styles.communityCopy}>
            <p className={styles.eyebrow}>01 / Our community impact</p>
            <h2 id="community-title">
              A growing circle
              <br />
              <em>of support.</em>
            </h2>
            <p className={styles.heroDescription}>
              MentalMind reaches an average of more than 5,000 unique users every month. Behind that
              number are people making space for their mental wellbeing.
            </p>
            <p className={styles.communityDescription}>
              We’re building on this reach to make student support more accessible, strengthen our
              technology and connect with more educational communities.
            </p>
            <Link href="/about" className={styles.textLink}>
              Meet MentalMind <ArrowRightIcon aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.reachGraphic}>
            <div className={styles.graphicHeader}>
              <span className={styles.miniLabel}>A growing circle of support</span>
              <span className={styles.graphicDot} aria-hidden="true" />
            </div>
            <div className={styles.orbit}>
              <div className={styles.orbitOuter} aria-hidden="true" />
              <div className={styles.orbitInner} aria-hidden="true" />
              <span className={`${styles.orbitNode} ${styles.nodeOne}`} aria-hidden="true">
                <HeartIcon />
              </span>
              <span className={`${styles.orbitNode} ${styles.nodeTwo}`} aria-hidden="true">
                <AcademicCapIcon />
              </span>
              <span className={`${styles.orbitNode} ${styles.nodeThree}`} aria-hidden="true">
                <UserGroupIcon />
              </span>
              <span className={`${styles.orbitNode} ${styles.nodeFour}`} aria-hidden="true">
                <SparklesIcon />
              </span>
              <span className={styles.orbitDotOne} aria-hidden="true" />
              <span className={styles.orbitDotTwo} aria-hidden="true" />
              <div className={styles.reachMetric}>
                <UserGroupIcon aria-hidden="true" />
                <strong>
                  5K<span>+</span>
                </strong>
                <span className={styles.metricLabel}>
                  average monthly
                  <br />
                  unique users
                </span>
              </div>
            </div>
            <div className={styles.graphicFooter}>
              <div className={styles.peopleDots} aria-hidden="true">
                {[0, 1, 2, 3, 4].map((person) => (
                  <span key={person}>
                    <UserGroupIcon />
                  </span>
                ))}
              </div>
              <p>
                Real people.
                <br />
                <strong>Room for more.</strong>
              </p>
            </div>
          </div>
        </section>

        <section
          className={`${styles.prioritiesSection} ${styles.container}`}
          aria-labelledby="priorities-title"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>02 / What comes next</p>
              <h2 id="priorities-title">Turning support into possibility.</h2>
            </div>
            <p>The approved funding is intended to support these areas of the initiative.</p>
          </div>
          <div className={styles.priorityGrid}>
            {priorities.map(({ title, description, icon: Icon, tone }, index) => (
              <article className={styles.priorityCard} key={title}>
                <div className={styles.priorityTop}>
                  <span className={`${styles.priorityIcon} ${styles[tone]}`}>
                    <Icon aria-hidden="true" />
                  </span>
                  <span className={styles.priorityNumber} aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="funding-plan"
          className={`${styles.section} ${styles.container}`}
          aria-labelledby="schedule-title"
        >
          <div className={styles.scheduleCard}>
            <div className={styles.scheduleHeading}>
              <div>
                <p className={styles.eyebrow}>A clear path from approval to action</p>
                <h2 id="schedule-title">How the funding will be released.</h2>
              </div>
              <span className={styles.outlineBadge}>Planned disbursement</span>
            </div>
            <div
              className={styles.trancheBar}
              role="img"
              aria-label="Planned grant split: tranche 1, 10 percent; tranches 2, 3 and 4, 30 percent each. No funds have been disbursed."
            >
              {tranches.map((tranche, index) => (
                <div
                  key={tranche.number}
                  className={styles[`bar${index + 1}`]}
                  style={{ flex: tranche.percent }}
                >
                  {tranche.percent}%
                </div>
              ))}
            </div>
            <ol className={styles.trancheGrid}>
              {tranches.map((tranche, index) => (
                <li key={tranche.number}>
                  <span className={styles.trancheLabel}>
                    <i className={styles[`bar${index + 1}`]} /> Tranche {tranche.number}
                  </span>
                  <strong>{tranche.amount}</strong>
                  <p>{tranche.condition}</p>
                </li>
              ))}
            </ol>
            <div className={styles.reportingNote}>
              <DocumentTextIcon aria-hidden="true" />
              <p>
                Each later tranche requires a utilisation certificate and progress report for the
                previous tranche. The first release is subject to the grant agreement and required
                documentation.
              </p>
            </div>
          </div>
        </section>

        <section
          className={`${styles.container} ${styles.updatesSection}`}
          aria-labelledby="updates-title"
        >
          <div className={styles.updatesIcon} aria-hidden="true">
            <SparklesIcon />
          </div>
          <div>
            <p className={styles.eyebrow}>Our story is still growing</p>
            <h2 id="updates-title">More milestones to share.</h2>
            <p>
              This space will grow with our community: new reach milestones, project updates and
              progress as the grant moves into action.
            </p>
          </div>
          <Link href="/contact" className={styles.textLink}>
            Connect with us <ArrowRightIcon aria-hidden="true" />
          </Link>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <Link href="/homepage" className={styles.footerBrand}>
            <HeartIcon aria-hidden="true" /> MentalMind
          </Link>
          <p>More room for mental wellbeing.</p>
          <nav aria-label="Funding and impact page footer">
            <Link href="/about">About us</Link>
            <Link href="/funding-and-impact" aria-current="page">
              Funding &amp; Impact
            </Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
