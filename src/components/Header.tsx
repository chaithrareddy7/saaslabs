import Image from 'next/image';
import { getUrl } from '@/lib/types';
import { Button } from '@/components/Button';
import type { LandingPageACF, LinkItem } from '@/lib/types';

interface HeaderProps {
  acf: LandingPageACF | null;
}

export function Header({ acf }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-100">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 lg:gap-10 min-w-0">
          {acf?.nav_logo && (
            <Image
              src={acf.nav_logo}
              alt="Logo"
              width={120}
              height={36}
              className="h-7 sm:h-8 w-auto object-contain flex-shrink-0"
              unoptimized
            />
          )}
          {acf?.nav_links && (
            <nav className="hidden lg:flex items-center gap-7 text-[15px] text-slate-700">
              {acf.nav_links.map((link: LinkItem, i: number) => (
                <a
                  key={i}
                  href={getUrl(link.url)}
                  className="hover:text-slate-900 transition"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>

        {acf && (
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {acf.nav_cta_secondary_label && (
              <Button
                variant="secondary"
                label={acf.nav_cta_secondary_label}
                href={acf.nav_cta_secondary_url}
                className="hidden md:inline-block !px-4 !py-2"
              />
            )}
            {acf.nav_cta_primary_label && (
              <Button
                variant="primary"
                label={acf.nav_cta_primary_label}
                href={acf.nav_cta_primary_url}
                className="!px-3 sm:!px-4 !py-2 !text-[14px] sm:!text-[15px]"
              />
            )}
          </div>
        )}
      </div>
    </header>
  );
}
