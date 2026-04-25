import Image from 'next/image';
import type { GlobalContent, NavLink, NavDropdownItem } from '@/lib/types';

interface HeaderProps {
  global: GlobalContent | null;
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DefaultDropdownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"
        stroke="#667085"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MegaMenu({
  items,
  ctaLabel,
  ctaUrl,
}: {
  items: NavDropdownItem[];
  ctaLabel: string;
  ctaUrl: string;
}) {
  return (
    <div className="absolute left-0 top-full pt-3 hidden group-hover:block z-50">
      <div className="w-[360px] bg-white rounded-xl shadow-[0_12px_40px_rgba(8,15,52,0.10)] border border-slate-100 p-3">
        <ul className="flex flex-col">
          {items.map((item, i) => (
            <li key={i}>
              <a
                href={item.url}
                className="group/item flex items-start gap-3 p-3 rounded-lg hover:bg-[#F6F9FF] transition"
              >
                <span className="flex-shrink-0 mt-0.5">
                  {item.icon ? (
                    <Image
                      src={item.icon}
                      alt=""
                      width={20}
                      height={20}
                      className="object-contain"
                      unoptimized
                    />
                  ) : (
                    <DefaultDropdownIcon />
                  )}
                </span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[14px] font-semibold text-[#101828] group-hover/item:text-[#004CE6]">
                    {item.title}
                  </span>
                  <span className="text-[12px] leading-[1.4] text-[#667085] whitespace-pre-line">
                    {item.description}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
        {ctaLabel && (
          <a
            href={ctaUrl}
            className="flex items-center gap-1.5 px-3 py-3 mt-1 text-[14px] font-semibold text-[#004CE6] hover:gap-2.5 transition-all"
          >
            {ctaLabel}
            <ArrowRightIcon />
          </a>
        )}
      </div>
    </div>
  );
}

function NavItem({ link }: { link: NavLink }) {
  const hasMenu =
    link.has_dropdown &&
    Array.isArray(link.dropdown_items) &&
    link.dropdown_items.length > 0;

  if (!hasMenu) {
    return (
      <a href={link.url} className="text-[15px] text-slate-700 hover:text-slate-900 transition">
        {link.label}
      </a>
    );
  }

  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 text-[15px] text-slate-700 hover:text-[#004CE6] group-hover:text-[#004CE6] transition cursor-pointer"
      >
        {link.label}
        <ChevronDownIcon />
      </button>
      <MegaMenu
        items={link.dropdown_items as NavDropdownItem[]}
        ctaLabel={link.textlabel}
        ctaUrl={link.texturl}
      />
    </div>
  );
}

export function Header({ global }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-100 relative z-40">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 h-14 sm:h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 lg:gap-10 min-w-0">
          {global?.nav_logo && (
            <a href="/" className="flex-shrink-0">
              <Image
                src={global.nav_logo}
                alt="Logo"
                width={120}
                height={36}
                className="h-7 sm:h-8 w-auto object-contain"
                unoptimized
              />
            </a>
          )}
          {global?.nav_links && global.nav_links.length > 0 && (
            <nav className="hidden lg:flex items-center gap-7">
              {global.nav_links.map((link, i) => (
                <NavItem key={i} link={link} />
              ))}
            </nav>
          )}
        </div>

        {global && (
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {global.nav_cta_secondary_label && (
              <a
                href={global.nav_cta_secondary_url}
                className="hidden md:inline-flex items-center justify-center px-4 py-2 border border-[#004CE6] rounded text-[#004CE6] font-semibold text-[14px] sm:text-[15px] hover:bg-[#004CE6]/5 transition"
              >
                {global.nav_cta_secondary_label}
              </a>
            )}
            {global.nav_cta_primary_label && (
              <a
                href={global.nav_cta_primary_url}
                className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-[#004CE6] rounded text-white font-semibold text-[14px] sm:text-[15px] hover:bg-[#0040C2] transition"
              >
                {global.nav_cta_primary_label}
              </a>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
