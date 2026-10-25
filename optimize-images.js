/**
 * Villux Image Optimization Script
 * Converts large JPG/PNG images to AVIF and WebP for maximum Page Speed score
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imagesDir = path.join(__dirname, 'images');

const toConvert = [
  { input: 'fusebox.jpg',      output: 'fusebox.avif',      width: 800 },
  { input: 'panel-work.jpg',   output: 'panel-work-new.avif', width: 800 },
  { input: 'lighting.jpg',     output: 'lighting.avif',     width: 800 },
  { input: 'hero-electrician.jpg', output: 'hero-electrician.avif', width: 900 },
  { input: 'team2.jpg',        output: 'team2.avif',        width: 800 },
  { input: 'van.jpg',          output: 'van.avif',          width: 800 },
  { input: 'security-camera.jpg', output: 'security-camera.avif', width: 800 },
];

async function run() {
  for (const item of toConvert) {
    const inputPath = path.join(imagesDir, item.input);
    const outputPath = path.join(imagesDir, item.output);

    if (!fs.existsSync(inputPath)) {
      console.log(`SKIP (not found): ${item.input}`);
      continue;
    }

    try {
      const info = await sharp(inputPath)
        .resize({ width: item.width, withoutEnlargement: true })
        .avif({ quality: 72, effort: 6 })
        .toFile(outputPath);

      const inputSize = fs.statSync(inputPath).size;
      const outputSize = fs.statSync(outputPath).size;
      const pct = Math.round((1 - outputSize / inputSize) * 100);
      console.log(`✅ ${item.input} → ${item.output} | ${Math.round(inputSize/1024)}KB → ${Math.round(outputSize/1024)}KB (${pct}% smaller)`);
    } catch (err) {
      console.error(`❌ Error converting ${item.input}:`, err.message);
    }
  }
  console.log('\nDone! All images optimized.');
}

run();
