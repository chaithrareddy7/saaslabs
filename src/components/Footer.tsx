import { SocialIcon } from '@/components/SocialIcon';
import type { GlobalContent } from '@/lib/types';

interface FooterProps {
  global: GlobalContent | null;
}

const FOOTER_PATTERN = "url('/Mask group.png')";

export function Footer({ global }: FooterProps) {
  if (!global) return null;

  const hasAddress = Boolean(global.footer_address || global.footer_copyright);
  const hasLinks = Array.isArray(global.footer_links) && global.footer_links.length > 0;
  const hasSocial = Array.isArray(global.footer_social) && global.footer_social.length > 0;

  return (
    <footer className="relative overflow-hidden bg-brand-900 text-white">
      <div className="container-page relative z-10 flex flex-col items-start justify-between gap-6 py-8 sm:py-10 lg:flex-row lg:items-center lg:gap-8">
        {hasAddress && (
          <div className="text-[13px] leading-[1.6] text-white sm:text-[14px]">
            {global.footer_address && (
              <p className="whitespace-pre-line">{global.footer_address}</p>
            )}
            {global.footer_copyright && (
              <p className="mt-2">{global.footer_copyright}</p>
            )}
          </div>
        )}

        {hasLinks && (
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-6 text-[13px] sm:gap-8 sm:text-[14px] lg:gap-12"
          >
            {global.footer_links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                className="text-white transition hover:opacity-80"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {hasSocial && (
          <ul className="flex items-center gap-5 sm:gap-6">
            {global.footer_social.map((social, i) => (
              <li key={i}>
                <a
                  href={social.url}
                  className="flex items-center justify-center transition hover:opacity-80"
                  aria-label={social.platform}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon platform={social.platform} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Decorative chat-bubble pattern */}
      <div
        aria-hidden="true"
        className="relative h-[80px] w-full bg-bottom bg-repeat-x sm:h-[110px] lg:h-[140px]"
        style={{ backgroundImage: FOOTER_PATTERN, backgroundSize: 'auto 100%' }}
      />
    </footer>
  );
}
