import Image from 'next/image';

import { MobileMenu } from '@/components/MobileMenu';
import type { GlobalContent, NavDropdownItem, NavLink } from '@/lib/types';

interface HeaderProps {
  global: GlobalContent | null;
}

/* -------------------------------------------------------------------------
 * Inline icons — kept local to avoid an extra component layer and an icon
 * dependency. All use `currentColor` so they inherit text-* utilities.
 * ----------------------------------------------------------------------- */

function ChevronDownIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 10H16M16 10L11 5M16 10L11 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneOutgoingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4.166 3.333H7.5l1.667 4.167-2.083 1.25c.892 1.81 2.357 3.275 4.166 4.167l1.25-2.084 4.167 1.667v3.333c0 .442-.176.866-.488 1.179a1.667 1.667 0 0 1-1.179.488c-3.25-.197-6.317-1.578-8.62-3.881-2.302-2.303-3.683-5.369-3.88-8.619 0-.442.175-.866.488-1.179.313-.312.737-.488 1.178-.488Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 5.833a1.666 1.666 0 0 1 1.667 1.667"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 2.5a5 5 0 0 1 5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MessagesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M17.5 11.667 15 9.167H9.167a.833.833 0 0 1-.834-.834v-5c0-.221.088-.433.245-.589a.833.833 0 0 1 .589-.244h7.5c.22 0 .433.088.589.244.156.156.244.368.244.59v8.333Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.667 12.5v1.667a.833.833 0 0 1-.834.833H5L2.5 17.5V9.167c0-.221.088-.434.244-.59a.833.833 0 0 1 .59-.244H5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneDotsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4.166 3.333H7.5l1.667 4.167-2.083 1.25c.892 1.81 2.357 3.275 4.166 4.167l1.25-2.084 4.167 1.667v3.333c0 .442-.176.866-.488 1.179a1.667 1.667 0 0 1-1.179.488c-3.25-.197-6.317-1.578-8.62-3.881-2.302-2.303-3.683-5.369-3.88-8.619 0-.442.175-.866.488-1.179.313-.312.737-.488 1.178-.488Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.5 5.833v.008" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 5.833v.008" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.5 5.833v.008" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const DROPDOWN_ICONS = [PhoneOutgoingIcon, MessagesIcon, PhoneDotsIcon];

/* -------------------------------------------------------------------------
 * Mega menu
 * ----------------------------------------------------------------------- */

interface MegaMenuProps {
  items: NavDropdownItem[];
  ctaLabel: string;
  ctaUrl: string;
}

function MegaMenu({ items, ctaLabel, ctaUrl }: MegaMenuProps) {
  return (
    <div className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 group-hover:block group-focus-within:block">
      <div className="flex w-[280px] flex-col rounded-b-xl border-x border-b border-gray-100 bg-white p-3 shadow-[0_12px_40px_rgba(8,15,52,0.10)]">
        <ul className="flex flex-col">
          {items.map((item, i) => {
            const Icon = DROPDOWN_ICONS[i] ?? PhoneOutgoingIcon;
            return (
              <li key={i}>
                <a
                  href={item.url}
                  className="group/item flex items-start gap-3 rounded-lg p-3 transition hover:bg-brand-50"
                >
                  <span className="mt-0.5 flex-shrink-0 text-gray-500 transition-colors group-hover/item:text-brand-400">
                    <Icon />
                  </span>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-[12px] font-semibold leading-[20px] text-gray-500 group-hover/item:text-brand-500">
                      {item.title}
                    </span>
                    <span className="whitespace-pre-line text-[12px] font-normal leading-[17px] text-gray-400">
                      {item.description}
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        {ctaLabel && (
          <a
            href={ctaUrl}
            className="mt-1 flex items-center gap-1.5 px-3 py-3 text-[14px] font-semibold text-brand-500 transition-all hover:gap-2.5"
          >
            {ctaLabel}
            <ArrowRightIcon />
          </a>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Nav item — flat link or mega-menu trigger.
 * ----------------------------------------------------------------------- */

function NavItem({ link }: { link: NavLink }) {
  const hasDropdown =
    link.has_dropdown &&
    Array.isArray(link.dropdown_items) &&
    link.dropdown_items.length > 0;

  if (!hasDropdown) {
    return (
      <a
        href={link.url}
        className="flex h-full items-center text-[15px] text-gray-700 transition hover:text-gray-900"
      >
        {link.label}
      </a>
    );
  }

  return (
    <div className="group relative flex h-full items-center">
      <button
        type="button"
        className="flex h-full cursor-pointer items-center gap-1 text-[15px] text-gray-700 transition hover:text-brand-500 focus:outline-none group-hover:text-brand-500 group-focus-within:text-brand-500"
      >
        {link.label}
        <span className="inline-flex group-hover:rotate-180 group-focus-within:rotate-180">
          <ChevronDownIcon />
        </span>
      </button>
      <MegaMenu
        items={link.dropdown_items as NavDropdownItem[]}
        ctaLabel={link.textlabel}
        ctaUrl={link.texturl}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Header
 * ----------------------------------------------------------------------- */

export function Header({ global }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white">
      <div className="container-page flex h-14 items-stretch justify-between gap-4 sm:h-16">
        <div className="flex min-w-0 items-stretch gap-6 lg:gap-10">
          {global?.nav_logo && (
            <a href="/" className="flex flex-shrink-0 items-center">
              <Image
                src={global.nav_logo}
                alt="Logo"
                width={120}
                height={36}
                className="h-7 w-auto object-contain sm:h-8"
                unoptimized
              />
            </a>
          )}
          {global?.nav_links && global.nav_links.length > 0 && (
            <nav className="hidden items-stretch gap-7 lg:flex">
              {global.nav_links.map((link, i) => (
                <NavItem key={i} link={link} />
              ))}
            </nav>
          )}
        </div>

        {global && (
          <div className="flex flex-shrink-0 items-center gap-2 self-center sm:gap-3">
            {global.nav_cta_secondary_label && (
              <a
                href={global.nav_cta_secondary_url}
                className="btn-secondary btn-md hidden lg:inline-flex"
              >
                {global.nav_cta_secondary_label}
              </a>
            )}
            {global.nav_cta_primary_label && (
              <a
                href={global.nav_cta_primary_url}
                className="btn-primary btn-md hidden sm:inline-flex"
              >
                {global.nav_cta_primary_label}
              </a>
            )}
            <MobileMenu global={global} />
          </div>
        )}
      </div>
    </header>
  );
}
