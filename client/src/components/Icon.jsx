// Single-source inline SVG icon set, replacing decorative/UI emojis site-wide.
// Stroke-based, inherits color via currentColor, sized by the `size` prop.
// Usage: <Icon name="search" size={18} className="..." />
const PATHS = {
  search: <><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
  download: <><path d="M12 3v12" /><path d="m7 12 5 5 5-5" /><path d="M5 21h14" /></>,
  trash: <><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M6 6l1 14h10l1-14" /><line x1="10" y1="10" x2="10" y2="17" /><line x1="14" y1="10" x2="14" y2="17" /></>,
  warning: <><path d="M12 3 2 20h20L12 3Z" /><line x1="12" y1="9" x2="12" y2="14" /><line x1="12" y1="17.5" x2="12" y2="17.6" /></>,
  print: <><path d="M6 9V3h12v6" /><path d="M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="7" /></>,
  rings: <><circle cx="9" cy="14" r="6" /><circle cx="15" cy="14" r="6" /><path d="M9 8l1.5-4h3L15 8" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 5a3.5 3.5 0 0 1 0 6.5" /><path d="M17 14.5a6 6 0 0 1 4 5.5" /></>,
  chair: <><path d="M6 4v8h12V4" /><path d="M5 12h14" /><path d="M7 12l-1 8" /><path d="M17 12l1 8" /><path d="M6 16h12" /></>,
  celebrate: <><path d="M3 21l6-14 8 8-14 6Z" /><path d="M14 4l1 2" /><path d="M19 3l-1 2" /><path d="M20 8l-2 1" /><path d="M15 9l2 2" /></>,
  building: <><rect x="5" y="3" width="14" height="18" /><line x1="9" y1="7" x2="9" y2="7.1" /><line x1="15" y1="7" x2="15" y2="7.1" /><line x1="9" y1="11" x2="9" y2="11.1" /><line x1="15" y1="11" x2="15" y2="11.1" /><path d="M10 21v-4h4v4" /></>,
  check: <><path d="M4 12l5 5L20 6" /></>,
  checkCircle: <><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></>,
  close: <><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></>,
  edit: <><path d="M4 20h4L19 9l-4-4L4 16v4Z" /><line x1="14" y1="6" x2="18" y2="10" /></>,
  heart: <><path d="M12 20s-7-4.5-9.5-9A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9.5 5c-2.5 4.5-9.5 9-9.5 9Z" /></>,
  star: <><path d="M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.3l6-.8L12 3Z" /></>,
  map: <><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" /><line x1="9" y1="4" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="20" /></>,
  clipboard: <><rect x="6" y="4" width="12" height="17" rx="1" /><path d="M9 4V3h6v1" /><path d="M9 10h6" /><path d="M9 14h6" /><path d="M9 18h4" /></>,
  calendar: <><rect x="4" y="5" width="16" height="16" rx="1" /><line x1="4" y1="9" x2="20" y2="9" /><line x1="9" y1="3" x2="9" y2="6" /><line x1="15" y1="3" x2="15" y2="6" /></>,
  compare: <><path d="M12 3v18" /><path d="M7 7 3 13h8L7 7Z" /><path d="M17 7l-4 6h8l-4-6Z" /><path d="M5 20h14" /></>,
  plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
  sparkles: <><path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z" /><path d="M18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 15Z" /></>,
  bulb: <><path d="M9 18h6" /><path d="M10 21h4" /><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.2 1 2.5h6c0-1.3.3-1.8 1-2.5A6 6 0 0 0 12 3Z" /></>,
  phone: <><path d="M4 4h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2Z" /></>,
  link: <><path d="M9 15l6-6" /><path d="M10 6l1-1a4 4 0 0 1 6 6l-1 1" /><path d="M14 18l-1 1a4 4 0 0 1-6-6l1-1" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z" /></>,
  arrowUp: <><line x1="12" y1="20" x2="12" y2="5" /><path d="m6 11 6-6 6 6" /></>,
  arrowRight: <><line x1="4" y1="12" x2="20" y2="12" /><path d="m14 6 6 6-6 6" /></>,
  bed: <><path d="M3 8v12" /><path d="M3 14h18v6" /><path d="M21 20v-6a3 3 0 0 0-3-3H3" /><path d="M7 11V9a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2" /></>,
  utensils: <><path d="M5 3v7a2 2 0 0 0 4 0V3" /><path d="M7 10v11" /><path d="M17 3c-1.5 0-3 1.5-3 5s1.5 4 3 4v9" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  droplet: <><path d="M12 3s6 6.5 6 10.5a6 6 0 0 1-12 0C6 9.5 12 3 12 3Z" /></>,
  wind: <><path d="M3 8h11a3 3 0 1 0-3-3" /><path d="M3 12h15a3 3 0 1 1-3 3" /><path d="M3 16h7a2.5 2.5 0 1 1-2.5 2.5" /></>,
  cloud: <><path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.5-1.5A4 4 0 0 1 17 18H7Z" /></>,
  gem: <><path d="M6 3h12l3 5-9 13L3 8l3-5Z" /><path d="M3 8h18" /><path d="M9 3 6 8l6 13 6-13-3-5" /></>,
  wallet: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /><circle cx="16" cy="14" r="1.2" /></>,
  camera: <><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" /><circle cx="12" cy="13" r="3.5" /></>,
  music: <><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></>,
  flower: <><circle cx="12" cy="12" r="2.5" /><path d="M12 9.5c0-3 2.5-4 2.5-4S16 8 12 9.5ZM12 9.5c0-3-2.5-4-2.5-4S8 8 12 9.5ZM14.5 12c3 0 4 2.5 4 2.5S16 16 14.5 12ZM9.5 12c-3 0-4 2.5-4 2.5S8 16 9.5 12ZM12 14.5c0 3 2.5 4 2.5 4S8 18 12 14.5Z" /><path d="M12 14.5v6" /></>,
  cake: <><path d="M4 21h16v-7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7Z" /><path d="M4 16c2 0 2 1.5 4 1.5s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" /><path d="M12 8V5" /><circle cx="12" cy="3.5" r="1" /></>,
  car: <><path d="M3 13l2-5a2 2 0 0 1 2-1.3h10A2 2 0 0 1 19 8l2 5" /><path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4Z" /><circle cx="7" cy="15.5" r="1" /><circle cx="17" cy="15.5" r="1" /></>,
  dress: <><path d="M10 3l2 2 2-2" /><path d="M12 5v3l4 3-2 3 3 7H7l3-7-2-3 4-3" /></>,
  box: <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="M4 7.5 12 12l8-4.5" /><path d="M12 12v9" /></>,
  seedling: <><path d="M12 21v-8" /><path d="M12 13C12 9 8 8 5 8c0 4 4 5 7 5Z" /><path d="M12 13c0-3 3-4 6-4 0 3-3 4-6 4Z" /></>,
  flag: <><path d="M5 21V4" /><path d="M5 4h11l-2 3 2 3H5" /></>,
  hourglass: <><path d="M6 3h12" /><path d="M6 21h12" /><path d="M7 3c0 5 5 6 5 9 0-3 5-4 5-9" /><path d="M7 21c0-5 5-6 5-9 0 3 5 4 5 9" /></>,
  xCircle: <><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6" /><path d="M15 9l-6 6" /></>,
  send: <><path d="M21 3 10 14" /><path d="M21 3l-7 18-4-8-8-4 19-6Z" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  upload: <><path d="M12 15V4" /><path d="m7 9 5-5 5 5" /><path d="M5 19h14" /></>,
  book: <><path d="M5 4a2 2 0 0 1 2-2h12v18H7a2 2 0 0 0-2 2V4Z" /><path d="M19 20H7a2 2 0 0 0-2 2" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" /></>,
  flagFinish: <><path d="M5 21V4" /><path d="M5 4h14v9H5" /><path d="M5 4h3.5v3H5M8.5 7H12v3H8.5M12 4h3.5v3H12M15.5 7H19v3h-3.5" /></>,
  chevronUp: <><path d="m6 15 6-6 6 6" /></>,
  chevronDown: <><path d="m6 9 6 6 6-6" /></>,
  menu: <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>,
}

export default function Icon({ name, size = 24, strokeWidth = 1.8, filled = false, className = '', style }) {
  const path = PATHS[name]
  if (!path) return null
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {path}
    </svg>
  )
}
