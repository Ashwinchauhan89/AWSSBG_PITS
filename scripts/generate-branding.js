const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const BRANDING_DIR = path.join(PUBLIC_DIR, 'images', 'branding');
const PITS_EMBLEM_PATH = path.join(PUBLIC_DIR, 'images', 'pits-emblem.png');

if (!fs.existsSync(BRANDING_DIR)) {
  fs.mkdirSync(BRANDING_DIR, { recursive: true });
}

const pitsEmblemB64 = fs.readFileSync(PITS_EMBLEM_PATH).toString('base64');

// Colors
const COLOR_BG = '#080A0F';
const COLOR_PURPLE = '#A855F7';
const COLOR_PURPLE_LIGHT = '#C084FC';
const COLOR_PURPLE_DARK = '#7E22CE';
const COLOR_AMBER = '#FF9900';
const COLOR_AMBER_LIGHT = '#FDBA74';
const COLOR_WHITE = '#FFFFFF';
const COLOR_SLATE_200 = '#E2E8F0';
const COLOR_SLATE_400 = '#94A3B8';

// ============================================================================
// 1. Standalone Emblem Mark SVG (Shared Symbol)
// ============================================================================
function generateEmblemMarkSvg(size = 600, includeGlow = true) {
  const center = size / 2;
  const chipSize = size * 0.88;
  const chipHalf = chipSize / 2;
  const emblemSize = size * 0.54;
  const emblemOffset = (size - emblemSize) / 2;

  // Pin calculations (3 pins per side, matching Image 1)
  const pinWidth = size * 0.052;
  const pinLen = size * 0.058;
  const pinSpacing = size * 0.11;

  // Outer frame bounds
  const frameStart = center - chipHalf + pinLen;
  const frameEnd = center + chipHalf - pinLen;
  const frameW = frameEnd - frameStart;

  return `
    <g id="community-emblem-mark">
      <defs>
        <radialGradient id="purpleGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${COLOR_PURPLE}" stop-opacity="0.35" />
          <stop offset="60%" stop-color="${COLOR_PURPLE}" stop-opacity="0.1" />
          <stop offset="100%" stop-color="${COLOR_PURPLE}" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="purpleLinear" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${COLOR_PURPLE_LIGHT}" />
          <stop offset="50%" stop-color="${COLOR_PURPLE}" />
          <stop offset="100%" stop-color="${COLOR_PURPLE_DARK}" />
        </linearGradient>
        <linearGradient id="amberLinear" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFB347" />
          <stop offset="100%" stop-color="${COLOR_AMBER}" />
        </linearGradient>
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      ${includeGlow ? `<circle cx="${center}" cy="${center}" r="${size * 0.46}" fill="url(#purpleGlow)" />` : ''}

      <!-- Outer Microchip Pins (Inspired by Image 1, 3 pins per side) -->
      <!-- Top Pins -->
      <rect x="${center - pinSpacing - pinWidth/2}" y="${center - chipHalf}" width="${pinWidth}" height="${pinLen}" rx="2" fill="url(#purpleLinear)" />
      <rect x="${center - pinWidth/2}" y="${center - chipHalf}" width="${pinWidth}" height="${pinLen}" rx="2" fill="url(#purpleLinear)" />
      <rect x="${center + pinSpacing - pinWidth/2}" y="${center - chipHalf}" width="${pinWidth}" height="${pinLen}" rx="2" fill="url(#purpleLinear)" />

      <!-- Bottom Pins -->
      <rect x="${center - pinSpacing - pinWidth/2}" y="${center + chipHalf - pinLen}" width="${pinWidth}" height="${pinLen}" rx="2" fill="url(#purpleLinear)" />
      <rect x="${center - pinWidth/2}" y="${center + chipHalf - pinLen}" width="${pinWidth}" height="${pinLen}" rx="2" fill="url(#purpleLinear)" />
      <rect x="${center + pinSpacing - pinWidth/2}" y="${center + chipHalf - pinLen}" width="${pinWidth}" height="${pinLen}" rx="2" fill="url(#purpleLinear)" />

      <!-- Left Pins -->
      <rect x="${center - chipHalf}" y="${center - pinSpacing - pinWidth/2}" width="${pinLen}" height="${pinWidth}" rx="2" fill="url(#purpleLinear)" />
      <rect x="${center - chipHalf}" y="${center - pinWidth/2}" width="${pinLen}" height="${pinWidth}" rx="2" fill="url(#purpleLinear)" />
      <rect x="${center - chipHalf}" y="${center + pinSpacing - pinWidth/2}" width="${pinLen}" height="${pinWidth}" rx="2" fill="url(#purpleLinear)" />

      <!-- Right Pins -->
      <rect x="${center + chipHalf - pinLen}" y="${center - pinSpacing - pinWidth/2}" width="${pinLen}" height="${pinWidth}" rx="2" fill="url(#purpleLinear)" />
      <rect x="${center + chipHalf - pinLen}" y="${center - pinWidth/2}" width="${pinLen}" height="${pinWidth}" rx="2" fill="url(#purpleLinear)" />
      <rect x="${center + chipHalf - pinLen}" y="${center + pinSpacing - pinWidth/2}" width="${pinLen}" height="${pinWidth}" rx="2" fill="url(#purpleLinear)" />

      <!-- Main Microchip Beveled Body -->
      <rect x="${frameStart}" y="${frameStart}" width="${frameW}" height="${frameW}" rx="${size * 0.05}" fill="#0D111A" stroke="url(#purpleLinear)" stroke-width="${size * 0.016}" />

      <!-- Tech Corner Brackets (HUD style) -->
      <path d="M ${frameStart + size*0.04} ${frameStart + size*0.08} L ${frameStart + size*0.04} ${frameStart + size*0.04} L ${frameStart + size*0.08} ${frameStart + size*0.04}" fill="none" stroke="${COLOR_AMBER}" stroke-width="${size * 0.008}" stroke-linecap="round" />
      <path d="M ${frameEnd - size*0.08} ${frameStart + size*0.04} L ${frameEnd - size*0.04} ${frameStart + size*0.04} L ${frameEnd - size*0.04} ${frameStart + size*0.08}" fill="none" stroke="${COLOR_AMBER}" stroke-width="${size * 0.008}" stroke-linecap="round" />
      <path d="M ${frameStart + size*0.04} ${frameEnd - size*0.08} L ${frameStart + size*0.04} ${frameEnd - size*0.04} L ${frameStart + size*0.08} ${frameEnd - size*0.04}" fill="none" stroke="${COLOR_AMBER}" stroke-width="${size * 0.008}" stroke-linecap="round" />
      <path d="M ${frameEnd - size*0.08} ${frameEnd - size*0.04} L ${frameEnd - size*0.04} ${frameEnd - size*0.04} L ${frameEnd - size*0.04} ${frameEnd - size*0.08}" fill="none" stroke="${COLOR_AMBER}" stroke-width="${size * 0.008}" stroke-linecap="round" />

      <!-- Circuit Traces Connecting Frame to Center Core -->
      <line x1="${center}" y1="${frameStart}" x2="${center}" y2="${center - emblemSize*0.53}" stroke="${COLOR_PURPLE_LIGHT}" stroke-width="${size*0.006}" stroke-dasharray="3,3" />
      <line x1="${center}" y1="${frameEnd}" x2="${center}" y2="${center + emblemSize*0.53}" stroke="${COLOR_PURPLE_LIGHT}" stroke-width="${size*0.006}" stroke-dasharray="3,3" />
      <line x1="${frameStart}" y1="${center}" x2="${center - emblemSize*0.53}" y2="${center}" stroke="${COLOR_PURPLE_LIGHT}" stroke-width="${size*0.006}" stroke-dasharray="3,3" />
      <line x1="${frameEnd}" y1="${center}" x2="${center + emblemSize*0.53}" y2="${center}" stroke="${COLOR_PURPLE_LIGHT}" stroke-width="${size*0.006}" stroke-dasharray="3,3" />

      <!-- Orbital Tech Accent Ellipse (Echoing PITS emblem's satellite orbit) -->
      <ellipse cx="${center}" cy="${center}" rx="${emblemSize * 0.58}" ry="${emblemSize * 0.28}" fill="none" stroke="${COLOR_PURPLE_LIGHT}" stroke-width="${size*0.004}" stroke-dasharray="6,4" transform="rotate(-25 ${center} ${center})" opacity="0.8" />
      <circle cx="${center - emblemSize*0.52}" cy="${center + emblemSize*0.22}" r="${size*0.012}" fill="${COLOR_AMBER}" />
      <circle cx="${center + emblemSize*0.52}" cy="${center - emblemSize*0.22}" r="${size*0.012}" fill="${COLOR_PURPLE_LIGHT}" />

      <!-- Circular Backing Disc for Official PITS Emblem -->
      <circle cx="${center}" cy="${center}" r="${emblemSize * 0.51}" fill="#FFFFFF" stroke="url(#amberLinear)" stroke-width="${size * 0.01}" />

      <!-- The Official PITS Emblem (Exact, Unaltered, Preserved proportions & lettering) -->
      <image href="data:image/png;base64,${pitsEmblemB64}" x="${emblemOffset}" y="${emblemOffset}" width="${emblemSize}" height="${emblemSize}" />
    </g>
  `;
}

// ============================================================================
// 2. Deliverable: Circular Social Profile Icon (1024x1024)
// ============================================================================
function generateCircularProfileSvg(transparent = false) {
  const size = 1024;
  const center = size / 2;
  const markSize = 740;
  const markOffset = (size - markSize) / 2;

  return `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0F172A" />
        <stop offset="50%" stop-color="#080A0F" />
        <stop offset="100%" stop-color="#05070B" />
      </linearGradient>
      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${COLOR_PURPLE_LIGHT}" />
        <stop offset="50%" stop-color="${COLOR_AMBER}" />
        <stop offset="100%" stop-color="${COLOR_PURPLE}" />
      </linearGradient>
      <!-- Circular Arc Text Paths -->
      <path id="topArcPath" d="M 120 512 A 392 392 0 0 1 904 512" fill="none" />
      <path id="bottomArcPath" d="M 904 512 A 392 392 0 0 1 120 512" fill="none" />
    </defs>

    ${!transparent ? `
    <!-- Background Circle -->
    <rect width="${size}" height="${size}" fill="url(#bgGrad)" />
    <!-- Outer Ambient Glow -->
    <circle cx="${center}" cy="${center}" r="490" fill="none" stroke="url(#ringGrad)" stroke-width="4" opacity="0.6" />
    <circle cx="${center}" cy="${center}" r="480" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="8,6" opacity="0.25" />
    ` : `
    <circle cx="${center}" cy="${center}" r="500" fill="none" />
    <circle cx="${center}" cy="${center}" r="490" fill="none" stroke="url(#ringGrad)" stroke-width="4" opacity="0.7" />
    `}

    <!-- Corner Circuit Node Accents -->
    <circle cx="80" cy="80" r="4" fill="${COLOR_PURPLE}" />
    <line x1="80" y1="80" x2="140" y2="80" stroke="${COLOR_PURPLE}" stroke-width="2" opacity="0.4" />
    <circle cx="944" cy="80" r="4" fill="${COLOR_AMBER}" />
    <line x1="944" y1="80" x2="884" y2="80" stroke="${COLOR_AMBER}" stroke-width="2" opacity="0.4" />
    <circle cx="80" cy="944" r="4" fill="${COLOR_AMBER}" />
    <line x1="80" y1="944" x2="140" y2="944" stroke="${COLOR_AMBER}" stroke-width="2" opacity="0.4" />
    <circle cx="944" cy="944" r="4" fill="${COLOR_PURPLE}" />
    <line x1="944" y1="944" x2="884" y2="944" stroke="${COLOR_PURPLE}" stroke-width="2" opacity="0.4" />

    <!-- Center Emblem Mark -->
    <g transform="translate(${markOffset}, ${markOffset - 40})">
      ${generateEmblemMarkSvg(markSize, true)}
    </g>

    <!-- Bottom Curved Identity Banner -->
    <g transform="translate(0, 30)">
      <rect x="212" y="860" width="600" height="64" rx="32" fill="#0D1322" stroke="url(#ringGrad)" stroke-width="2.5" />
      <text x="${center}" y="894" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900" fill="${COLOR_WHITE}" text-anchor="middle" letter-spacing="3">
        PITS CLOUD COMPUTING
      </text>
      <text x="${center}" y="913" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="${COLOR_AMBER}" text-anchor="middle" letter-spacing="2">
        STUDENT BUILDER GROUP
      </text>
    </g>
  </svg>
  `;
}

// ============================================================================
// 3. Deliverable: Primary Community Logo (Vertical / Lockup 1200x1200)
// ============================================================================
function generatePrimaryLogoSvg(transparent = false) {
  const width = 1200;
  const height = 1200;
  const center = width / 2;
  const markSize = 620;
  const markOffset = (width - markSize) / 2;

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0F172A" />
        <stop offset="50%" stop-color="#080A0F" />
        <stop offset="100%" stop-color="#040608" />
      </linearGradient>
      <linearGradient id="purpleTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${COLOR_PURPLE_LIGHT}" />
        <stop offset="100%" stop-color="${COLOR_PURPLE}" />
      </linearGradient>
      <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFB347" />
        <stop offset="100%" stop-color="${COLOR_AMBER}" />
      </linearGradient>
    </defs>

    ${!transparent ? `<rect width="${width}" height="${height}" fill="url(#bgGrad2)" />` : ''}

    <!-- Tech Grid Subtle Background Accent -->
    <g opacity="0.08">
      <line x1="200" y1="0" x2="200" y2="${height}" stroke="#FFFFFF" stroke-width="1" />
      <line x1="600" y1="0" x2="600" y2="${height}" stroke="#FFFFFF" stroke-width="1" />
      <line x1="1000" y1="0" x2="1000" y2="${height}" stroke="#FFFFFF" stroke-width="1" />
      <line x1="0" y1="300" x2="${width}" y2="300" stroke="#FFFFFF" stroke-width="1" />
      <line x1="0" y1="700" x2="${width}" y2="700" stroke="#FFFFFF" stroke-width="1" />
    </g>

    <!-- Top Institutional Affiliation Header -->
    <g transform="translate(0, 110)">
      <rect x="290" y="0" width="620" height="34" rx="17" fill="#131B2E" stroke="${COLOR_PURPLE}" stroke-width="1.5" stroke-opacity="0.5" />
      <circle cx="310" cy="17" r="4" fill="${COLOR_AMBER}" />
      <text x="600" y="22" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="${COLOR_SLATE_200}" text-anchor="middle" letter-spacing="3">
        PRASHANTI INSTITUTE OF TECHNOLOGY &amp; SCIENCE • UJJAIN
      </text>
    </g>

    <!-- Center Composite Emblem Mark -->
    <g transform="translate(${markOffset}, 165)">
      ${generateEmblemMarkSvg(markSize, true)}
    </g>

    <!-- Bottom Typography Block -->
    <g transform="translate(0, 840)">
      <!-- Primary Name -->
      <text x="${center}" y="60" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="900" fill="${COLOR_WHITE}" text-anchor="middle" letter-spacing="4">
        PITS CLOUD COMPUTING
      </text>

      <!-- Subtitle Builder Badge -->
      <g transform="translate(${center - 240}, 90)">
        <rect x="0" y="0" width="480" height="42" rx="21" fill="#121829" stroke="url(#amberGrad)" stroke-width="2" />
        <circle cx="28" cy="21" r="5" fill="${COLOR_AMBER}" />
        <text x="240" y="27" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="${COLOR_AMBER}" text-anchor="middle" letter-spacing="3.5">
          STUDENT BUILDER GROUP
        </text>
        <circle cx="452" cy="21" r="5" fill="${COLOR_AMBER}" />
      </g>

      <!-- Tagline -->
      <g transform="translate(0, 185)">
        <line x1="380" y1="-8" x2="490" y2="-8" stroke="#334155" stroke-width="1.5" />
        <text x="${center}" y="0" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="${COLOR_PURPLE_LIGHT}" text-anchor="middle" letter-spacing="4">
          LEARN • BUILD • INNOVATE
        </text>
        <line x1="710" y1="-8" x2="820" y2="-8" stroke="#334155" stroke-width="1.5" />
      </g>
    </g>
  </svg>
  `;
}

// ============================================================================
// 4. Deliverable: Horizontal Logo for Website Headers & Banners (1400x380)
// ============================================================================
function generateHorizontalLogoSvg(transparent = false) {
  const width = 1400;
  const height = 380;
  const markSize = 290;

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hBgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#080A0F" />
        <stop offset="60%" stop-color="#0C101A" />
        <stop offset="100%" stop-color="#080A0F" />
      </linearGradient>
      <linearGradient id="dividerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${COLOR_PURPLE}" stop-opacity="0" />
        <stop offset="30%" stop-color="${COLOR_PURPLE_LIGHT}" stop-opacity="0.8" />
        <stop offset="70%" stop-color="${COLOR_AMBER}" stop-opacity="0.8" />
        <stop offset="100%" stop-color="${COLOR_AMBER}" stop-opacity="0" />
      </linearGradient>
      <linearGradient id="amberGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFB347" />
        <stop offset="100%" stop-color="${COLOR_AMBER}" />
      </linearGradient>
    </defs>

    ${!transparent ? `<rect width="${width}" height="${height}" fill="url(#hBgGrad)" />` : ''}

    <!-- Left Emblem Mark -->
    <g transform="translate(60, 45)">
      ${generateEmblemMarkSvg(markSize, true)}
    </g>

    <!-- Vertical Glass Divider -->
    <line x1="390" y1="50" x2="390" y2="330" stroke="url(#dividerGrad)" stroke-width="2.5" />

    <!-- Right Side Typography Lockup -->
    <g transform="translate(425, 0)">
      <!-- Institutional Eyebrow Pill -->
      <g transform="translate(0, 72)">
        <rect x="0" y="0" width="530" height="28" rx="14" fill="#131B2E" stroke="${COLOR_PURPLE}" stroke-width="1.2" stroke-opacity="0.6" />
        <circle cx="16" cy="14" r="3.5" fill="${COLOR_AMBER}" />
        <text x="270" y="19" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="${COLOR_SLATE_200}" text-anchor="middle" letter-spacing="2.5">
          PRASHANTI INSTITUTE OF TECHNOLOGY &amp; SCIENCE • UJJAIN
        </text>
      </g>

      <!-- Primary Brand Name -->
      <g transform="translate(0, 155)">
        <text x="0" y="0" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="46" font-weight="900" fill="${COLOR_WHITE}" letter-spacing="2">
          PITS CLOUD COMPUTING
        </text>
      </g>

      <!-- Subtitle: Student Builder Group with AWS colors -->
      <g transform="translate(0, 205)">
        <rect x="0" y="0" width="370" height="34" rx="17" fill="#141C2E" stroke="url(#amberGrad2)" stroke-width="1.8" />
        <circle cx="20" cy="17" r="4" fill="${COLOR_AMBER}" />
        <text x="185" y="23" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" fill="${COLOR_AMBER}" text-anchor="middle" letter-spacing="3">
          STUDENT BUILDER GROUP
        </text>
      </g>

      <!-- Bottom Tagline & Focus areas -->
      <g transform="translate(0, 290)">
        <text x="0" y="0" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="${COLOR_PURPLE_LIGHT}" letter-spacing="3">
          LEARN • BUILD • INNOVATE
        </text>
        <circle cx="215" cy="-4" r="2.5" fill="${COLOR_SLATE_400}" />
        <text x="230" y="0" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="${COLOR_SLATE_400}" letter-spacing="1.5">
          AWS Learning Ecosystem • AI &amp; Cloud Engineering
        </text>
      </g>
    </g>
  </svg>
  `;
}

// ============================================================================
// 5. Deliverable: High-Resolution Poster & Banner (2400x1200)
// ============================================================================
function generatePosterBannerSvg() {
  const width = 2400;
  const height = 1200;
  const markSize = 780;

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bannerBg" cx="35%" cy="50%" r="75%">
        <stop offset="0%" stop-color="#181534" />
        <stop offset="45%" stop-color="#0A0C14" />
        <stop offset="100%" stop-color="#030408" />
      </radialGradient>
      <linearGradient id="bannerLineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${COLOR_PURPLE_LIGHT}" stop-opacity="0" />
        <stop offset="50%" stop-color="${COLOR_PURPLE}" stop-opacity="0.8" />
        <stop offset="100%" stop-color="${COLOR_AMBER}" stop-opacity="0" />
      </linearGradient>
      <linearGradient id="amberGold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFB347" />
        <stop offset="50%" stop-color="${COLOR_AMBER}" />
        <stop offset="100%" stop-color="#FF7A00" />
      </linearGradient>
    </defs>

    <rect width="${width}" height="${height}" fill="url(#bannerBg)" />

    <!-- Ambient Tech Grid Overlay -->
    <g opacity="0.06">
      ${Array.from({ length: 24 }).map((_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="${height}" stroke="#FFFFFF" stroke-width="1.5" />`).join('')}
      ${Array.from({ length: 12 }).map((_, i) => `<line x1="0" y1="${i * 100}" x2="${width}" y2="${i * 100}" stroke="#FFFFFF" stroke-width="1.5" />`).join('')}
    </g>

    <!-- Atmospheric Glowing Nebulae -->
    <circle cx="560" cy="600" r="500" fill="${COLOR_PURPLE}" opacity="0.12" filter="blur(60px)" />
    <circle cx="1600" cy="500" r="400" fill="${COLOR_AMBER}" opacity="0.08" filter="blur(70px)" />

    <!-- Left Side Emblem Mark -->
    <g transform="translate(180, 210)">
      ${generateEmblemMarkSvg(markSize, true)}
    </g>

    <!-- Vertical Futuristic Cyber Divider -->
    <line x1="1040" y1="180" x2="1040" y2="1020" stroke="url(#bannerLineGrad)" stroke-width="3" />
    <circle cx="1040" cy="180" r="5" fill="${COLOR_PURPLE_LIGHT}" />
    <circle cx="1040" cy="600" r="7" fill="${COLOR_AMBER}" />
    <circle cx="1040" cy="1020" r="5" fill="${COLOR_PURPLE}" />

    <!-- Right Side Information Hierarchy -->
    <g transform="translate(1120, 0)">
      <!-- Institutional Eyebrow Tag -->
      <g transform="translate(0, 240)">
        <rect x="0" y="0" width="760" height="42" rx="21" fill="#11172A" stroke="${COLOR_PURPLE}" stroke-width="1.8" stroke-opacity="0.7" />
        <circle cx="24" cy="21" r="5" fill="${COLOR_AMBER}" />
        <text x="390" y="27" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="${COLOR_SLATE_200}" text-anchor="middle" letter-spacing="3.5">
          PRASHANTI INSTITUTE OF TECHNOLOGY &amp; SCIENCE • UJJAIN
        </text>
      </g>

      <!-- Main Headline: PITS Cloud Computing -->
      <g transform="translate(0, 390)">
        <text x="0" y="0" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="76" font-weight="900" fill="${COLOR_WHITE}" letter-spacing="3">
          PITS CLOUD COMPUTING
        </text>
      </g>

      <!-- Subtitle: Student Builder Group -->
      <g transform="translate(0, 480)">
        <rect x="0" y="0" width="560" height="54" rx="27" fill="#131B2E" stroke="url(#amberGold)" stroke-width="2.5" />
        <circle cx="32" cy="27" r="6" fill="${COLOR_AMBER}" />
        <text x="280" y="35" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="21" font-weight="800" fill="${COLOR_AMBER}" text-anchor="middle" letter-spacing="4">
          STUDENT BUILDER GROUP
        </text>
        <circle cx="528" cy="27" r="6" fill="${COLOR_AMBER}" />
      </g>

      <!-- Description Block -->
      <g transform="translate(0, 600)">
        <text x="0" y="0" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="${COLOR_SLATE_200}" line-height="32">
          An independent, student-led technical community advancing Cloud Architecture,
        </text>
        <text x="0" y="36" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="${COLOR_SLATE_200}">
          AI/ML Engineering, Serverless DevOps, and Hands-on AWS Console Skills.
        </text>
      </g>

      <!-- Tagline & Core Pillars -->
      <g transform="translate(0, 740)">
        <rect x="0" y="0" width="760" height="70" rx="20" fill="#0C1220" stroke="#1E293B" stroke-width="2" />
        <text x="380" y="44" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900" fill="${COLOR_PURPLE_LIGHT}" text-anchor="middle" letter-spacing="5">
          LEARN  •  BUILD  •  INNOVATE
        </text>
      </g>

      <!-- Community Credentials Row -->
      <g transform="translate(0, 890)" opacity="0.85">
        <text x="0" y="0" font-family="monospace" font-size="14" font-weight="700" fill="${COLOR_AMBER}" letter-spacing="2">
          CAMPUS CHAPTER • UJJAIN (M.P.)
        </text>
        <text x="0" y="26" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="400" fill="${COLOR_SLATE_400}">
          Affiliated with Prashanti Group of Institutions • Peer-to-Peer Student Developer Forum
        </text>
      </g>
    </g>
  </svg>
  `;
}

// ============================================================================
// Main Execution: Render All Deliverables
// ============================================================================
async function buildAll() {
  console.log('Building branding deliverables...');

  // 1. Primary Community Logo
  const primaryDarkSvg = generatePrimaryLogoSvg(false);
  const primaryTransSvg = generatePrimaryLogoSvg(true);
  fs.writeFileSync(path.join(BRANDING_DIR, 'community-logo-primary.svg'), primaryDarkSvg);
  fs.writeFileSync(path.join(BRANDING_DIR, 'community-logo-primary-transparent.svg'), primaryTransSvg);

  await sharp(Buffer.from(primaryDarkSvg)).png().toFile(path.join(BRANDING_DIR, 'community-logo-primary.png'));
  await sharp(Buffer.from(primaryTransSvg)).png().toFile(path.join(BRANDING_DIR, 'community-logo-primary-transparent.png'));
  console.log('✓ Deliverable 1: Primary Community Logo generated (Dark & Transparent)');

  // 2. Circular Social Media Profile Icon
  const circularDarkSvg = generateCircularProfileSvg(false);
  const circularTransSvg = generateCircularProfileSvg(true);
  fs.writeFileSync(path.join(BRANDING_DIR, 'community-logo-circular.svg'), circularDarkSvg);
  fs.writeFileSync(path.join(BRANDING_DIR, 'community-logo-circular-transparent.svg'), circularTransSvg);

  await sharp(Buffer.from(circularDarkSvg)).png().toFile(path.join(BRANDING_DIR, 'community-logo-circular.png'));
  await sharp(Buffer.from(circularTransSvg)).png().toFile(path.join(BRANDING_DIR, 'community-logo-circular-transparent.png'));
  console.log('✓ Deliverable 2: Circular Social Media Profile Icon generated (1024x1024)');

  // 3. Horizontal Logo for Headers
  const horizontalDarkSvg = generateHorizontalLogoSvg(false);
  const horizontalTransSvg = generateHorizontalLogoSvg(true);
  fs.writeFileSync(path.join(BRANDING_DIR, 'community-logo-horizontal.svg'), horizontalDarkSvg);
  fs.writeFileSync(path.join(BRANDING_DIR, 'community-logo-horizontal-transparent.svg'), horizontalTransSvg);

  await sharp(Buffer.from(horizontalDarkSvg)).png().toFile(path.join(BRANDING_DIR, 'community-logo-horizontal.png'));
  await sharp(Buffer.from(horizontalTransSvg)).png().toFile(path.join(BRANDING_DIR, 'community-logo-horizontal-transparent.png'));
  console.log('✓ Deliverable 3: Horizontal Header Logo generated (Dark & Transparent)');

  // 4. Standalone Community Mark (Square Emblem only)
  const markSvg = `<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">${generateEmblemMarkSvg(800, false)}</svg>`;
  fs.writeFileSync(path.join(BRANDING_DIR, 'community-mark-transparent.svg'), markSvg);
  await sharp(Buffer.from(markSvg)).png().toFile(path.join(BRANDING_DIR, 'community-mark-transparent.png'));
  console.log('✓ Deliverable 4: Standalone Community Mark generated (Transparent PNG)');

  // 5. High-Resolution Poster & Presentation Banner (2400x1200)
  const posterSvg = generatePosterBannerSvg();
  fs.writeFileSync(path.join(BRANDING_DIR, 'community-poster-banner.svg'), posterSvg);
  await sharp(Buffer.from(posterSvg)).png().toFile(path.join(BRANDING_DIR, 'community-poster-banner.png'));
  console.log('✓ Deliverable 5: High-Resolution Poster & Banner generated (2400x1200)');

  // Copy primary transparent mark to public/images/community-logo.png for immediate site-wide availability
  fs.copyFileSync(
    path.join(BRANDING_DIR, 'community-logo-horizontal-transparent.png'),
    path.join(PUBLIC_DIR, 'images', 'community-logo-horizontal.png')
  );
  fs.copyFileSync(
    path.join(BRANDING_DIR, 'community-mark-transparent.png'),
    path.join(PUBLIC_DIR, 'images', 'community-mark.png')
  );
  fs.copyFileSync(
    path.join(BRANDING_DIR, 'community-logo-circular.png'),
    path.join(PUBLIC_DIR, 'images', 'community-avatar.png')
  );

  console.log('All branding assets built successfully!');
}

buildAll().catch(err => {
  console.error('Build error:', err);
  process.exit(1);
});
