import { getUrl, type ACFUrl } from '@/lib/types';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  label: string;
  href: ACFUrl;
  className?: string;
}

export function Button({ variant, label, href, className = '' }: ButtonProps) {
  const base =
    'px-6 py-3 rounded-md font-semibold text-[15px] transition whitespace-nowrap text-center inline-block';
  const variants = {
    primary:
      'bg-[var(--color-brand-blue)] text-white hover:bg-[var(--color-brand-blue-hover)]',
    secondary:
      'border border-[var(--color-brand-blue)] text-[var(--color-brand-blue)] hover:bg-blue-50',
  };

  return (
    <a href={getUrl(href)} className={`${base} ${variants[variant]} ${className}`}>
      {label}
    </a>
  );
}
