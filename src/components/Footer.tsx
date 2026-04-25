import { SocialIcon } from '@/components/SocialIcon';
import type { GlobalContent } from '@/lib/types';

interface FooterProps {
  global: GlobalContent | null;
}

export function Footer({ global }: FooterProps) {
  if (!global) return null;

  return (
    <footer className="relative bg-[#001233] text-white overflow-hidden">
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
        {(global.footer_address || global.footer_copyright) && (
          <div className="text-[13px] sm:text-[14px] leading-[1.6] text-white">
            {global.footer_address && (
              <p className="whitespace-pre-line">{global.footer_address}</p>
            )}
            {global.footer_copyright && (
              <p className="mt-2">{global.footer_copyright}</p>
            )}
          </div>
        )}

        {global.footer_links && global.footer_links.length > 0 && (
          <div className="flex flex-wrap gap-6 sm:gap-8 lg:gap-12 text-[13px] sm:text-[14px] text-white">
            {global.footer_links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                className="hover:opacity-80 transition"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {global.footer_social && global.footer_social.length > 0 && (
          <div className="flex items-center gap-5 sm:gap-6">
            {global.footer_social.map((s, i) => (
              <a
                key={i}
                href={s.url}
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
