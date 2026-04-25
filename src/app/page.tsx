import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getLandingPage } from '@/lib/api/wordpress';
import { getUrl } from '@/lib/types';
import type {
  TextItem,
  ProblemCard,
  FeatureBlock as FeatureBlockType,
} from '@/lib/types';

import { CheckIcon } from '@/components/CheckIcon';
import { FeatureBlock } from '@/components/FeatureBlock';

const DEFAULT_TRUST_BADGES: TextItem[] = [
  { text: 'No credit card required' },
  { text: '14 days of JustCall AI on us' },
];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLandingPage();
  const acf = page?.acf;

  const title = acf?.seo_title || '';
  const description = acf?.seo_description || '';
  const ogImage = acf && acf.og_image ? acf.og_image : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function Home() {
  const page = await getLandingPage();
  if (!page) notFound();

  const acf = page.acf;

  const trustBadges =
    acf.hero_trust_badges && acf.hero_trust_badges.length > 0
      ? acf.hero_trust_badges
      : DEFAULT_TRUST_BADGES;

  const showProblem =
    Boolean(acf.problem_heading) ||
    (Array.isArray(acf.problem_cards) && acf.problem_cards.length > 0);

  const showFeatures =
    Boolean(acf.features_section_heading) ||
    (Array.isArray(acf.feature_blocks) && acf.feature_blocks.length > 0);

  const showCta = Boolean(acf.cta_heading) || Boolean(acf.cta_description);

  return (
    <>
      {/* HERO ----------------------------------------------------------- */}
      <section className="section flex justify-center bg-cream-25 px-4 sm:px-6">
        <div className="flex w-full max-w-[1259px] flex-col items-center justify-center gap-10 lg:flex-row lg:gap-[100px]">
          <div className="flex w-full flex-col items-start gap-8 sm:gap-10 lg:w-[634px]">
            <div className="flex w-full flex-col items-start gap-[18px]">
              <h1 className="heading-display">{acf.hero_heading}</h1>
              <p className="lead max-w-[529px] text-gray-700">
                {acf.hero_subheading}
              </p>
            </div>

            <div className="flex w-full flex-col items-start gap-[9px]">
              <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-1.5">
                <label className="flex h-12 w-full items-center rounded border border-gray-400 bg-white px-4 sm:w-[280px]">
                  <span className="sr-only">Email address</span>
                  <input
                    type="email"
                    placeholder={acf.hero_email_placeholder || 'Start Free Trial'}
                    className="w-full bg-transparent text-[16px] leading-[22px] text-gray-500 placeholder:text-gray-500 focus:outline-none"
                  />
                </label>
                <a href={getUrl(acf.hero_cta_url)} className="btn-primary btn-lg">
                  {acf.hero_cta_label || 'Start Free Trial'}
                </a>
              </div>

              <ul className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2">
                {trustBadges.map((badge: TextItem, i: number) => (
                  <li
                    key={i}
                    className="flex items-center gap-1.5 text-[12px] leading-5 text-gray-900"
                  >
                    <CheckIcon className="text-brand-400" />
                    {badge.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {acf.hero_image && (
            <div className="relative mx-auto aspect-square w-full max-w-[520px] flex-shrink-0 lg:mx-0 lg:h-[520px] lg:w-[520px]">
              <Image
                src={acf.hero_image}
                alt="Hero illustration"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          )}
        </div>
      </section>

      {/* PROBLEM -------------------------------------------------------- */}
      {showProblem && (
        <section className="section flex flex-col items-center gap-[22px] bg-white px-4 sm:px-6">
          <div className="flex w-full flex-col items-center gap-[30px]">
            <div className="flex w-full flex-col items-center gap-6">
              <div className="flex max-w-[906px] flex-col items-center gap-3">
                <h2 className="heading-section text-center">{acf.problem_heading}</h2>
                <p className="lead-sm max-w-[828px] text-center text-brand-900">
                  {acf.problem_description}
                </p>
              </div>

              {acf.problem_cards && acf.problem_cards.length > 0 && (
                <div className="grid w-full max-w-[1230px] grid-cols-1 items-stretch justify-center gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-[30px]">
                  {acf.problem_cards.map((card: ProblemCard, i: number) => (
                    <div
                      key={i}
                      className="flex min-w-0 items-center gap-[18px] rounded-lg bg-gray-100 p-5"
                    >
                      {card.icon && (
                        <div className="flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center rounded-[5px] bg-white">
                          <Image
                            src={card.icon}
                            alt=""
                            width={36}
                            height={36}
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      )}
                      <p className="text-[15px] font-normal leading-[1.4] text-gray-600 md:text-[16px] lg:text-[18px]">
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {acf.problem_closing && (
              <p className="lead-sm max-w-[885px] text-center text-brand-900">
                {acf.problem_closing}
              </p>
            )}
          </div>
        </section>
      )}

      {/* FEATURES ------------------------------------------------------- */}
      {showFeatures && (
        <section className="section flex flex-col items-center gap-8 bg-white px-4 sm:gap-10 sm:px-6">
          <div className="flex max-w-[1201px] flex-col items-center gap-3">
            <h2 className="heading-section text-center">{acf.features_section_heading}</h2>
            <p className="lead-sm max-w-[1200px] text-center text-brand-900">
              {acf.features_section_subheading}
            </p>
          </div>

          {acf.feature_blocks && acf.feature_blocks.length > 0 && (
            <div className="flex w-full max-w-[1200px] flex-col gap-12 sm:gap-16">
              {acf.feature_blocks.map((block: FeatureBlockType, i: number) => (
                <FeatureBlock key={i} block={block} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* FINAL CTA ------------------------------------------------------ */}
      {showCta && (
        <section className="section flex justify-center bg-cream-25 px-4 sm:px-6">
          <div className="flex w-full max-w-[1200px] flex-col items-center justify-between gap-10 lg:flex-row lg:gap-[137px]">
            <div className="flex w-full flex-col items-start gap-6 lg:w-[644px]">
              <div className="flex w-full flex-col items-start gap-2">
                <h2 className="heading-display lg:max-w-[670px]">{acf.cta_heading}</h2>
                <p className="lead text-brand-900">{acf.cta_description}</p>
              </div>

              <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-[17px]">
                <a href={getUrl(acf.cta_primary_url)} className="btn-primary btn-lg">
                  {acf.cta_primary_label}
                </a>
                <a href={getUrl(acf.cta_secondary_url)} className="btn-secondary btn-lg">
                  {acf.cta_secondary_label}
                </a>
              </div>
            </div>

            {acf.cta_image && (
              <div className="relative mx-auto aspect-[406/352] w-full max-w-[406px] flex-shrink-0 lg:mx-0 lg:h-[352px] lg:w-[406px]">
                <Image
                  src={acf.cta_image}
                  alt="CTA illustration"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
