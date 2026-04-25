import { getUrl, type ACFUrl } from '@/lib/types';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'md' | 'lg';

interface ButtonProps {
  variant: ButtonVariant;
  label: string;
  href: ACFUrl;
  size?: ButtonSize;
  className?: string;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  md: 'btn-md',
  lg: 'btn-lg',
};

export function Button({
  variant,
  label,
  href,
  size = 'md',
  className = '',
}: ButtonProps) {
  return (
    <a
      href={getUrl(href)}
      className={`${VARIANT_CLASS[variant]} ${SIZE_CLASS[size]} ${className}`.trim()}
    >
      {label}
    </a>
  );
}
