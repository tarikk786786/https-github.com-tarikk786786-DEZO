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
      <rect width="64" height="64" rx="16" fill="#0b1224" />
      <path
        d="M14 40c8-18 28-22 36-10"
        stroke="#22d3ee"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="42" cy="24" r="8" fill="#8b5cf6" />
      <path d="M22 44h20" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
