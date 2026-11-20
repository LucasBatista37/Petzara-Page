const sharp = require('sharp'); const fs = require('fs'); const path = require('path');
const OUT = process.argv[2], PUB = require('path').resolve(__dirname, '../../public/prints/v2');
(async () => {
  const conv = async (src, dst, w) => { let s = sharp(src); if (w) s = s.resize(w); await s.webp({ quality: 84 }).toFile(dst); };
  for (const f of fs.readdirSync(OUT).filter((f) => f.endsWith('.png'))) await conv(`${OUT}/${f}`, `${PUB}/app/${f.replace('.png', '.webp')}`);
  for (const f of fs.readdirSync(`${OUT}/mobile`)) await conv(`${OUT}/mobile/${f}`, `${PUB}/app/mobile/${f.replace('.png', '.webp')}`);
  for (const f of fs.readdirSync(`${OUT}/themes`)) await conv(`${OUT}/themes/${f}`, `${PUB}/themes/${f.replace('.png', '.webp')}`, f.includes('mobile') ? 720 : null);
  await conv(`${OUT}/dashboard.png`, `${PUB}/app/dashboard-800.webp`, 800);
  await conv(`${OUT}/mobile/dashboard.png`, `${PUB}/app/mobile/dashboard-360.webp`, 360);
})();
