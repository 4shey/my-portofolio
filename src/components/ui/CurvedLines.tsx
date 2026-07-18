interface CurvedLinesProps {
  className?: string
}

export function CurvedLines({ className = '' }: CurvedLinesProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* kiri atas → tengah */}
      <path
        className="curve-path"
        d="M -20 80 C 280 120, 520 380, 720 450"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="1000"
        strokeLinecap="round"
      />
      {/* kanan atas → tengah */}
      <path
        className="curve-path"
        d="M 1460 60 C 1160 100, 920 360, 720 450"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="1000"
        strokeLinecap="round"
      />
      {/* kiri bawah → tengah */}
      <path
        className="curve-path"
        d="M -20 820 C 300 780, 540 520, 720 450"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="1000"
        strokeLinecap="round"
      />
      {/* kanan bawah → tengah */}
      <path
        className="curve-path"
        d="M 1460 840 C 1140 800, 900 540, 720 450"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="1000"
        strokeLinecap="round"
      />

      {/* titik di ujung lengkungan */}
      <circle className="curve-dot opacity-0" cx="80" cy="80" r="4" fill="currentColor" />
      <circle className="curve-dot opacity-0" cx="1360" cy="60" r="4" fill="currentColor" />
      <circle className="curve-dot opacity-0" cx="80" cy="820" r="4" fill="currentColor" />
      <circle className="curve-dot opacity-0" cx="1360" cy="840" r="4" fill="currentColor" />
    </svg>
  )
}
