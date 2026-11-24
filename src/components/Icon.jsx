export default function Icon({ name, size = 20, className = '' }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
    focusable: false,
  }

  const paths = {
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    external: <><path d="M14 4h6v6" /><path d="m20 4-9 9" /><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" /></>,
    up: <><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></>,
    down: <><path d="m6 9 6 6 6-6" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    discord: <><path d="M7.2 8.3c1.6-1.2 3.2-1.5 4.8-1.5s3.2.3 4.8 1.5c1.3 1.9 2.1 4.1 2.3 6.4-1.4 1.5-2.9 2.2-4.3 2.6l-.9-1.4c.5-.2.9-.4 1.3-.7-2 .9-4.3.9-6.4 0 .4.3.9.5 1.3.7l-.9 1.4c-1.4-.4-2.9-1.1-4.3-2.6.2-2.3 1-4.5 2.3-6.4Z" /><circle cx="9.5" cy="12.2" r=".8" fill="currentColor" stroke="none" /><circle cx="14.5" cy="12.2" r=".8" fill="currentColor" stroke="none" /></>,
    pin: <><path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" /><circle cx="12" cy="10" r="2.2" /></>,
    spark: <><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" /><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    youtube: <><path d="M21 8.2a2.6 2.6 0 0 0-1.8-1.8C17.6 6 12 6 12 6s-5.6 0-7.2.4A2.6 2.6 0 0 0 3 8.2 27 27 0 0 0 2.6 12a27 27 0 0 0 .4 3.8 2.6 2.6 0 0 0 1.8 1.8C6.4 18 12 18 12 18s5.6 0 7.2-.4a2.6 2.6 0 0 0 1.8-1.8 27 27 0 0 0 .4-3.8 27 27 0 0 0-.4-3.8Z" /><path d="m10 9 5 3-5 3V9Z" /></>,
    facebook: <path d="M14 21v-8h3l.5-3H14V8c0-.9.3-1.5 1.6-1.5H18V3.8c-.8-.1-1.8-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.9V10H8v3h2.5v8H14Z" />,
    tiktok: <><path d="M14 4v10.3a3.6 3.6 0 1 1-3-3.6" /><path d="M14 4c.5 2.8 2.2 4.3 5 4.6" /></>,
  }

  return <svg {...common}>{paths[name] || paths.spark}</svg>
}