import { getUrl } from '@/lib/types';
import { SocialIcon } from '@/components/SocialIcon';
import type { LandingPageACF, LinkItem, SocialLink } from '@/lib/types';

interface FooterProps {
  acf: LandingPageACF | null;
}

export function Footer({ acf }: FooterProps) {
  if (!acf) return null;

  return (
    <footer className="relative bg-[#001233] text-white overflow-hidden">
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
        {(acf.footer_address || acf.footer_copyright) && (
          <div className="text-[13px] sm:text-[14px] leading-[1.6] text-white">
            {acf.footer_address && (
              <p className="whitespace-pre-line">{acf.footer_address}</p>
            )}
            {acf.footer_copyright && <p className="mt-2">{acf.footer_copyright}</p>}
          </div>
        )}

        {acf.footer_links && (
          <div className="flex flex-wrap gap-6 sm:gap-8 lg:gap-12 text-[13px] sm:text-[14px] text-white">
            {acf.footer_links.map((link: LinkItem, i: number) => (
              <a
                key={i}
                href={getUrl(link.url)}
                className="hover:opacity-80 transition"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {acf.footer_social && (
          <div className="flex items-center gap-5 sm:gap-6">
            {acf.footer_social.map((s: SocialLink, i: number) => (
              <a
                key={i}
                href={getUrl(s.url)}
                className="flex items-center justify-center hover:opacity-80 transition"
                aria-label={s.platform}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon platform={s.platform} />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Decorative chat-bubble pattern at bottom */}
      <div
        className="relative w-full h-[80px] sm:h-[110px] lg:h-[140px] bg-repeat-x bg-bottom"
        style={{ backgroundImage: "url('/Mask group.png')", backgroundSize: 'auto 100%' }}
        aria-hidden="true"
      />
    </footer>
  );
}
