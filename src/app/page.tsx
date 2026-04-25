import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getLandingPage } from '@/lib/api/wordpress';
import { getUrl } from '@/lib/types';
import { FeatureBlock } from '@/components/FeatureBlock';
import type {
  TextItem,
  ProblemCard,
  FeatureBlock as FeatureBlockType,
} from '@/lib/types';

export default async function Home() {
  const page = await getLandingPage();

  if (!page) {
    notFound();
  }

  const acf = page.acf;

  return (
    <>
      {/* HERO */}
      <section className="bg-[#FFFDE6] py-10 sm:py-[60px] px-4 sm:px-6 flex justify-center">
        <div className="w-full max-w-[1259px] flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-[100px]">
          {/* Text column */}
          <div className="flex flex-col items-start gap-8 sm:gap-10 w-full lg:w-[634px]">
            <div className="flex flex-col items-start gap-[18px] w-full">
              <h1 className="font-semibold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-[1.14] tracking-[-1px] lg:tracking-[-2px] text-[#101828]">
                {acf.hero_heading}
              </h1>
              <p className="font-normal text-[16px] sm:text-[18px] leading-[1.4] text-[#344054] max-w-[529px]">
                {acf.hero_subheading}
              </p>
            </div>

            {/* Email form */}
            <div className="flex flex-col items-start gap-[9px] w-full">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-1.5 w-full sm:w-auto">
                <div className="flex items-center w-full sm:w-[280px] h-12 px-4 bg-white border border-[#98A2B3] rounded">
                  <input
                    type="email"
                    placeholder={acf.hero_email_placeholder || 'Start Free Trial'}
                    className="w-full bg-transparent text-[16px] leading-[22px] text-[#667085] placeholder:text-[#667085] focus:outline-none"
                  />
                </div>
                <a
                  href={getUrl(acf.hero_cta_url)}
                  className="flex justify-center items-center px-[30px] h-12 bg-[#004CE6] rounded text-white font-semibold text-[16px] leading-[22px] whitespace-nowrap hover:bg-[#0040C2] transition"
                >
                  {acf.hero_cta_label || 'Start Free Trial'}
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-1">
                {(acf.hero_trust_badges && acf.hero_trust_badges.length > 0
                  ? acf.hero_trust_badges
                  : [{ text: 'No credit card required' }, { text: '14 days of JustCall AI on us' }]
                ).map((badge: TextItem, i: number) => (
                  <span key={i} className="flex items-center gap-1.5 text-[12px] leading-5 text-[#101828]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.7066 4.86813C11.3765 4.95774 11.1814 5.29795 11.271 5.62806C11.3771 6.01906 11.4309 6.42517 11.4309 6.83477C11.4309 8.06246 10.9528 9.21663 10.0848 10.0848C9.21663 10.9529 8.06246 11.4309 6.83477 11.4309C5.60709 11.4309 4.45291 10.9528 3.58479 10.0848C2.71666 9.21663 2.23867 8.06246 2.23867 6.83477C2.23867 5.60709 2.71678 4.45291 3.58479 3.58479C4.45291 2.71666 5.60709 2.23867 6.83477 2.23867C7.44905 2.23867 8.04511 2.3576 8.60647 2.59236C8.92197 2.72427 9.28477 2.57551 9.41681 2.25988C9.54873 1.94426 9.39997 1.58158 9.08434 1.44954C8.37084 1.15126 7.61404 1 6.83477 1C6.0555 1 5.2831 1.15438 4.56336 1.45877C3.86846 1.75268 3.24458 2.17327 2.70892 2.70892C2.17327 3.24458 1.75268 3.86846 1.45877 4.56336C1.15438 5.28323 1 6.04739 1 6.83477C1 7.62215 1.15438 8.38644 1.45877 9.10618C1.75268 9.80108 2.17327 10.425 2.70892 10.9606C3.24458 11.4963 3.86846 11.9169 4.56336 12.2108C5.2831 12.5152 6.04727 12.6695 6.83477 12.6695C7.62228 12.6695 8.38644 12.5152 9.10618 12.2108C9.80108 11.9169 10.425 11.4963 10.9606 10.9606C11.4963 10.425 11.9169 9.80108 12.2108 9.10618C12.5152 8.38644 12.6695 7.62228 12.6695 6.83477C12.6695 6.31559 12.6013 5.80041 12.4665 5.30369C12.377 4.97359 12.0369 4.77865 11.7066 4.86813Z" fill="#196AFF"/>
                      <path d="M4.90086 6.11596C4.659 5.87409 4.26687 5.87409 4.025 6.11596C3.78313 6.35783 3.78313 6.74995 4.025 6.99182L6.0936 9.06042C6.21004 9.17687 6.36767 9.24176 6.53153 9.24176C6.54302 9.24176 6.55437 9.24139 6.56585 9.24076C6.74183 9.23103 6.90519 9.14679 7.01527 9.00913L11.4368 3.47913C11.6503 3.21193 11.607 2.82229 11.3398 2.60863C11.0726 2.39497 10.683 2.4384 10.4693 2.7056L6.48012 7.69509L4.90086 6.11583V6.11596Z" fill="#196AFF"/>
                    </svg>
                    {badge.text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Image column — image already contains the cards/bubbles, no overlays needed */}
          {acf.hero_image && (
            <div className="relative w-full max-w-[520px] aspect-square mx-auto lg:mx-0 lg:w-[520px] lg:h-[520px] flex-shrink-0">
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

      {/* PROBLEM SECTION */}
      {(acf.problem_heading || (acf.problem_cards && acf.problem_cards.length > 0)) && (
      <section className="bg-white py-10 sm:py-[60px] px-4 sm:px-6 flex flex-col items-center gap-[22px]">
        <div className="flex flex-col items-center gap-[30px] w-full">
          <div className="flex flex-col items-center gap-6 w-full">
            <div className="flex flex-col items-center gap-3 max-w-[906px]">
              <h2 className="font-semibold text-[24px] sm:text-[28px] md:text-[34px] lg:text-[38px] leading-[1.15] tracking-[-1px] text-center text-[#101828]">
                {acf.problem_heading}
              </h2>
              <p className="font-normal text-[15px] sm:text-[16px] md:text-[18px] leading-[1.4] text-center text-[#001233] max-w-[828px]">
                {acf.problem_description}
              </p>
            </div>

            {acf.problem_cards && acf.problem_cards.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center items-stretch gap-4 sm:gap-5 lg:gap-[30px] w-full max-w-[1230px]">
                {acf.problem_cards.map((card: ProblemCard, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-[18px] p-5 bg-[#F2F4F7] rounded-lg min-w-0"
                  >
                    {card.icon && (
                      <div className="flex-shrink-0 w-[50px] h-[50px] bg-white rounded-[5px] flex items-center justify-center">
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
                    <p className="font-normal text-[15px] md:text-[16px] lg:text-[18px] leading-[1.4] text-[#475467]">
                      {card.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {acf.problem_closing && (
            <p className="font-normal text-[15px] sm:text-[16px] md:text-[18px] leading-[1.4] text-center text-[#001233] max-w-[885px]">
              {acf.problem_closing}
            </p>
          )}
        </div>
      </section>
      )}

      {/* FEATURES SECTION */}
      {(acf.features_section_heading || (acf.feature_blocks && acf.feature_blocks.length > 0)) && (
      <section className="bg-white py-10 sm:py-[60px] px-4 sm:px-6 flex flex-col items-center gap-8 sm:gap-10">
        <div className="flex flex-col items-center gap-3 max-w-[1201px]">
          <h2 className="font-semibold text-[24px] sm:text-[28px] md:text-[34px] lg:text-[38px] leading-[1.15] tracking-[-1px] text-center text-[#101828]">
            {acf.features_section_heading}
          </h2>
          <p className="font-normal text-[15px] sm:text-[16px] md:text-[18px] leading-[1.4] text-center text-[#001233] max-w-[1200px]">
            {acf.features_section_subheading}
          </p>
        </div>

        {acf.feature_blocks && acf.feature_blocks.length > 0 && (
          <div className="flex flex-col gap-12 sm:gap-16 w-full max-w-[1200px]">
            {acf.feature_blocks.map((block: FeatureBlockType, i: number) => (
              <FeatureBlock key={i} block={block} />
            ))}
          </div>
        )}
      </section>
      )}

      {/* FINAL CTA */}
      {(acf.cta_heading || acf.cta_description) && (
      <section className="bg-[#FFFDE6] py-10 sm:py-[60px] px-4 sm:px-6 flex justify-center">
        <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-[137px]">
          {/* Text column */}
          <div className="flex flex-col items-start gap-6 w-full lg:w-[644px]">
            <div className="flex flex-col items-start gap-2 w-full">
              <h2 className="font-semibold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-[1.14] tracking-[-1px] lg:tracking-[-2px] text-[#101828]">
                {acf.cta_heading}
              </h2>
              <p className="font-normal text-[16px] sm:text-[18px] leading-[1.4] text-[#001233]">
                {acf.cta_description}
              </p>
            </div>

            <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-[17px]">
              <a
                href={getUrl(acf.cta_primary_url)}
                className="flex justify-center items-center px-[24px] sm:px-[30px] h-12 bg-[#004CE6] rounded text-white font-semibold text-[16px] leading-[22px] whitespace-nowrap hover:bg-[#0040C2] transition"
              >
                {acf.cta_primary_label}
              </a>
              <a
                href={getUrl(acf.cta_secondary_url)}
                className="flex justify-center items-center px-[24px] sm:px-[30px] h-12 border border-[#004CE6] rounded text-[#004CE6] font-semibold text-[16px] leading-[22px] whitespace-nowrap hover:bg-[#004CE6]/5 transition"
              >
                {acf.cta_secondary_label}
              </a>
            </div>
          </div>

          {/* Image column — image only, no decorative shapes */}
          {acf.cta_image && (
            <div className="relative w-full max-w-[406px] aspect-[406/352] mx-auto lg:mx-0 lg:w-[406px] lg:h-[352px] flex-shrink-0">
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
