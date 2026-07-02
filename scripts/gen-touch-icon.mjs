import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '..', 'public', 'apple-touch-icon.png');

// SVG do ícone em 180x180 — mesmo design do favicon ampliado
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e91e8c"/>
      <stop offset="100%" stop-color="#880e4f"/>
    </linearGradient>
  </defs>

  <!-- Background (Apple adiciona o arredondamento, não precisa aqui) -->
  <rect width="180" height="180" fill="url(#bg)"/>

  <!-- Left hair strand -->
  <path d="M58 28 C50 57 66 85 58 113 C50 141 57 158 60 166"
        stroke="white" stroke-width="7" stroke-linecap="round" opacity="0.45" fill="none"/>
  <!-- Center hair strand -->
  <path d="M90 22 C76 51 96 79 88 108 C80 135 86 153 90 164"
        stroke="white" stroke-width="10" stroke-linecap="round" fill="none"/>
  <!-- Right hair strand -->
  <path d="M122 28 C130 57 114 85 122 113 C130 141 123 158 120 166"
        stroke="white" stroke-width="7" stroke-linecap="round" opacity="0.45" fill="none"/>

  <!-- Gold drip at bottom of center strand -->
  <circle cx="90" cy="164" r="14" fill="#d4a843"/>
</svg>`;

await sharp(Buffer.from(svg))
  .resize(180, 180)
  .png()
  .toFile(outPath);

console.log('apple-touch-icon.png gerado em', outPath);
