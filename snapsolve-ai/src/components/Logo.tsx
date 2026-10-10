export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      role="img"
    >
      <rect width="64" height="64" rx="10" fill="#0f6b5c" />
      <path
        d="M18 40.5c6.5-12 14.5-18 28-19.5"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M20 44h24"
        stroke="#d7ebe6"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="44" cy="22" r="4.5" fill="#ffffff" />
    </svg>
  );
}
