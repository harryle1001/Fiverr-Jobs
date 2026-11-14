// Shared product bottle (demo brand). sweep: 0..1 light-sweep position
window.bottleSVG = function (sweep = 0.5, accent = '#19d3c5') {
  const x = -120 + sweep * 440;
  return `<svg viewBox="0 0 200 420" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g1" x1="0" x2="1"><stop offset="0" stop-color="#0b3a5b"/><stop offset=".45" stop-color="#1b8fb5"/><stop offset="1" stop-color="#062a45"/></linearGradient>
    <linearGradient id="g2" x1="0" x2="1"><stop offset="0" stop-color="#e9f7ff"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#cfe9f7"/></linearGradient>
    <linearGradient id="cap" x1="0" x2="1"><stop offset="0" stop-color="#0a1f33"/><stop offset=".5" stop-color="#25506e"/><stop offset="1" stop-color="#0a1f33"/></linearGradient>
    <linearGradient id="sw" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <clipPath id="body"><path d="M60 90 Q60 70 78 66 L78 40 H122 V66 Q140 70 140 90 V380 Q140 404 116 404 H84 Q60 404 60 380Z"/></clipPath>
  </defs>
  <path d="M60 90 Q60 70 78 66 L78 40 H122 V66 Q140 70 140 90 V380 Q140 404 116 404 H84 Q60 404 60 380Z" fill="url(#g1)"/>
  <rect x="72" y="12" width="56" height="34" rx="8" fill="url(#cap)"/>
  <rect x="60" y="170" width="80" height="150" fill="url(#g2)" clip-path="url(#body)"/>
  <rect x="60" y="170" width="80" height="6" fill="${accent}" clip-path="url(#body)"/>
  <rect x="60" y="314" width="80" height="6" fill="${accent}" clip-path="url(#body)"/>
  <text x="100" y="228" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="16" fill="#062a45" letter-spacing="1">NOBEN</text>
  <text x="100" y="250" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="#1b8fb5" letter-spacing="2">AQUA CARE</text>
  <circle cx="100" cy="285" r="14" fill="none" stroke="${accent}" stroke-width="2"/>
  <path d="M92 285 q4 -8 8 0 t8 0" fill="none" stroke="${accent}" stroke-width="2"/>
  <g clip-path="url(#body)"><rect x="${x}" y="0" width="70" height="420" fill="url(#sw)" transform="skewX(-14)"/></g>
  <path d="M68 100 V370" stroke="#fff" stroke-opacity=".35" stroke-width="5" stroke-linecap="round" clip-path="url(#body)"/>
</svg>`;
};
