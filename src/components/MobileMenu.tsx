'use client';

import { useEffect, useState } from 'react';

import type { GlobalContent, NavDropdownItem, NavLink } from '@/lib/types';

interface MobileMenuProps {
  global: GlobalContent;
}

function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6l12 12M6 18L18 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      className={open ? 'rotate-180' : ''}
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

function NavSection({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const hasDropdown =
    link.has_dropdown &&
    Array.isArray(link.dropdown_items) &&
    link.dropdown_items.length > 0;

  if (!hasDropdown) {
    return (
      <a
        href={link.url}
        onClick={onNavigate}
        className="block px-4 py-3 text-[16px] font-medium text-gray-900 hover:bg-gray-50"
      >
        {link.label}
      </a>
    );
  }

  const items = link.dropdown_items as NavDropdownItem[];

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-[16px] font-medium text-gray-900 hover:bg-gray-50"
      >
        {link.label}
        <ChevronIcon open={expanded} />
      </button>

      {expanded && (
        <ul className="bg-gray-50 px-4 pb-3">
          {items.map((item, i) => (
            <li key={i}>
              <a
                href={item.url}
                onClick={onNavigate}
                className="block py-2.5"
              >
                <span className="block text-[14px] font-semibold text-gray-700">
                  {item.title}
                </span>
                <span className="mt-0.5 block whitespace-pre-line text-[12px] text-gray-400">
                  {item.description}
                </span>
              </a>
            </li>
          ))}
          {link.textlabel && (
            <li>
              <a
                href={link.texturl}
                onClick={onNavigate}
                className="block pt-2 text-[14px] font-semibold text-brand-500"
              >
                {link.textlabel} →
              </a>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export function MobileMenu({ global }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center rounded text-gray-700 hover:bg-gray-100 lg:hidden"
      >
        <MenuIcon />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Scrim */}
          <div
            className="absolute inset-0 bg-gray-900/40"
            onClick={close}
            aria-hidden
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 flex h-full w-[88%] max-w-[360px] flex-col bg-white shadow-xl">
            <div className="flex h-14 items-center justify-between border-b border-gray-100 px-4 sm:h-16">
              <span className="text-[15px] font-semibold text-gray-900">Menu</span>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded text-gray-700 hover:bg-gray-100"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-2">
              {global.nav_links.map((link, i) => (
                <NavSection key={i} link={link} onNavigate={close} />
              ))}
            </nav>

            <div className="flex flex-col gap-3 border-t border-gray-100 p-4">
              {global.nav_cta_secondary_label && (
                <a
                  href={global.nav_cta_secondary_url}
                  onClick={close}
                  className="btn-secondary btn-lg w-full"
                >
                  {global.nav_cta_secondary_label}
                </a>
              )}
              {global.nav_cta_primary_label && (
                <a
                  href={global.nav_cta_primary_url}
                  onClick={close}
                  className="btn-primary btn-lg w-full"
                >
                  {global.nav_cta_primary_label}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
