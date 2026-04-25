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

function PhoneOutgoingIcon({ stroke = '#667085' }: { stroke?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g clipPath="url(#clip-phone-out)">
        <path
          d="M4.16667 3.33334H7.5L9.16667 7.5L7.08333 8.75C7.9758 10.5596 9.44039 12.0242 11.25 12.9167L12.5 10.8333L16.6667 12.5V15.8333C16.6667 16.2754 16.4911 16.6993 16.1785 17.0118C15.866 17.3244 15.442 17.5 15 17.5C11.7494 17.3025 8.68346 15.9221 6.38069 13.6193C4.07792 11.3165 2.69754 8.25062 2.5 5C2.5 4.55798 2.67559 4.13405 2.98816 3.82149C3.30072 3.50893 3.72464 3.33334 4.16667 3.33334Z"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 5.83334C12.942 5.83334 13.366 6.00893 13.6785 6.32149C13.9911 6.63405 14.1667 7.05798 14.1667 7.5"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 2.5C13.8261 2.5 15.0979 3.02678 16.0355 3.96447C16.9732 4.90215 17.5 6.17392 17.5 7.5"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip-phone-out">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function MessagesIcon({ stroke = '#196AFF' }: { stroke?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g clipPath="url(#clip-messages)">
        <path
          d="M17.5 11.6667L15 9.16667H9.16671C8.94569 9.16667 8.73373 9.07887 8.57745 8.92259C8.42117 8.76631 8.33337 8.55435 8.33337 8.33333V3.33333C8.33337 3.11232 8.42117 2.90036 8.57745 2.74408C8.73373 2.5878 8.94569 2.5 9.16671 2.5H16.6667C16.8877 2.5 17.0997 2.5878 17.256 2.74408C17.4122 2.90036 17.5 3.11232 17.5 3.33333V11.6667Z"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.6667 12.5V14.1667C11.6667 14.3877 11.5789 14.5996 11.4226 14.7559C11.2663 14.9122 11.0543 15 10.8333 15H5L2.5 17.5V9.16666C2.5 8.94565 2.5878 8.73369 2.74408 8.57741C2.90036 8.42113 3.11232 8.33333 3.33333 8.33333H5"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip-messages">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function PhoneDotsIcon({ stroke = '#667085' }: { stroke?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g clipPath="url(#clip-phone-dots)">
        <path
          d="M4.16667 3.33333H7.5L9.16667 7.5L7.08333 8.75C7.9758 10.5596 9.44039 12.0242 11.25 12.9167L12.5 10.8333L16.6667 12.5V15.8333C16.6667 16.2754 16.4911 16.6993 16.1785 17.0118C15.866 17.3244 15.442 17.5 15 17.5C11.7494 17.3025 8.68346 15.9221 6.38069 13.6193C4.07792 11.3165 2.69754 8.25061 2.5 4.99999C2.5 4.55797 2.67559 4.13404 2.98816 3.82148C3.30072 3.50892 3.72464 3.33333 4.16667 3.33333Z"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12.5 5.83333V5.84166" stroke="#101828" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 5.83333V5.84166" stroke="#101828" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17.5 5.83333V5.84166" stroke="#101828" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip-phone-dots">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const MENU_ICONS = [PhoneOutgoingIcon, MessagesIcon, PhoneDotsIcon];

function DropdownItemIcon({ index }: { index: number }) {
  const Icon = MENU_ICONS[index] ?? PhoneOutgoingIcon;
  return <Icon />;
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
      <div className="w-[280px] bg-white rounded-xl shadow-[0_12px_40px_rgba(8,15,52,0.10)] border border-slate-100 p-3 flex flex-col">
        <ul className="flex flex-col">
          {items.map((item, i) => (
            <li key={i}>
              <a
                href={item.url}
                className="group/item flex items-start gap-3 p-3 rounded-lg hover:bg-[#F6F9FF] transition"
              >
                <span className="flex-shrink-0 mt-0.5">
                  <DropdownItemIcon index={i} />
                </span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[14px] font-semibold leading-[1.3] text-[#101828] group-hover/item:text-[#004CE6]">
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
