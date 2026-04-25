interface CheckIconProps {
  size?: number;
  className?: string;
}

export function CheckIcon({ size = 18, className = '' }: CheckIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="10" fill="var(--color-brand-blue)" />
      <path
        d="M8 12.5l2.5 2.5L16 9.5"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
