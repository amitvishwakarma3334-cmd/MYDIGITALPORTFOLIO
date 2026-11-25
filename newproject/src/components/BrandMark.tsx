export function BrandMark({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="av-bg-grad" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#102544" />
          <stop offset="100%" stopColor="#071224" />
        </linearGradient>
        <linearGradient id="av-v-grad" x1="36" y1="20" x2="51" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#av-bg-grad)" />
      <rect
        x="1.5"
        y="1.5"
        width="61"
        height="61"
        rx="14.5"
        stroke="#60A5FA"
        strokeOpacity="0.32"
        strokeWidth="1.5"
      />
      <path
        d="M13 43.5L20.5 20.5L28 43.5"
        stroke="#FFFFFF"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 36H25"
        stroke="#FFFFFF"
        strokeWidth="3.8"
        strokeLinecap="round"
      />
      <path
        d="M36 20.5L43.5 43.5L51 20.5"
        stroke="url(#av-v-grad)"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
