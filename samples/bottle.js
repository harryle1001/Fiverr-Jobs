// Shared product: perfume bottle for fictional brand "AURÉA" (demo). sweep: 0..1 light-sweep position
window.bottleSVG = function (sweep = 0.5, accent = '#d9b46a') {
  const x = -120 + sweep * 440;
  return `<svg viewBox="0 0 200 420" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gl" x1="0" x2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".5" stop-color="#ffffff" stop-opacity=".12"/><stop offset="1" stop-color="#ffffff" stop-opacity=".4"/></linearGradient>
    <linearGradient id="lq" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f0b27a"/><stop offset=".55" stop-color="#d9784f"/><stop offset="1" stop-color="#8a2f3d"/></linearGradient>
    <linearGradient id="au" x1="0" x2="1"><stop offset="0" stop-color="#8a6a2a"/><stop offset=".35" stop-color="#f5dc9a"/><stop offset=".65" stop-color="#c9a24d"/><stop offset="1" stop-color="#7a5a20"/></linearGradient>
    <linearGradient id="sw" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <clipPath id="body"><rect x="42" y="96" width="116" height="300" rx="16"/></clipPath>
  </defs>
  <!-- cap + neck -->
  <rect x="76" y="14" width="48" height="58" rx="6" fill="url(#au)"/>
  <rect x="76" y="62" width="48" height="8" fill="#6a4d18" opacity=".5"/>
  <rect x="88" y="70" width="24" height="28" fill="url(#au)"/>
  <!-- glass body -->
  <rect x="42" y="96" width="116" height="300" rx="16" fill="#f3dfd6" fill-opacity=".18" stroke="#fff" stroke-opacity=".55" stroke-width="2"/>
  <!-- liquid -->
  <rect x="50" y="150" width="100" height="238" rx="10" fill="url(#lq)"/>
  <ellipse cx="100" cy="150" rx="50" ry="3" fill="#ffd9a8" opacity=".8"/>
  <!-- label -->
  <rect x="64" y="228" width="72" height="86" fill="#fbf5ea"/>
  <rect x="64" y="228" width="72" height="3" fill="${accent}"/><rect x="68" y="311" width="64" height="3" fill="${accent}"/>
  <text x="100" y="262" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="15" fill="#3a1a24" letter-spacing="1.5">AURÉA</text>
  <line x1="84" y1="272" x2="116" y2="272" stroke="${accent}" stroke-width="1"/>
  <text x="100" y="288" text-anchor="middle" font-family="Georgia,serif" font-size="5.6" fill="#6a4a3a" letter-spacing="1">EAU DE PARFUM</text>
  <text x="100" y="302" text-anchor="middle" font-family="Arial,sans-serif" font-size="5" fill="#8a6a5a" letter-spacing=".8">50 ML · 1.7 FL OZ</text>
  <!-- glass highlights -->
  <rect x="42" y="96" width="116" height="300" rx="16" fill="url(#gl)" opacity=".5"/>
  <path d="M54 112 V372" stroke="#fff" stroke-opacity=".7" stroke-width="5" stroke-linecap="round"/>
  <g clip-path="url(#body)"><rect x="${x}" y="0" width="64" height="420" fill="url(#sw)" transform="skewX(-14)"/></g>
</svg>`;
};
