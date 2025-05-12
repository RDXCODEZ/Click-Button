// convert-to-webp.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public'; // or './src/assets' if you're using imports

function convertImagesToWebP(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      convertImagesToWebP(fullPath); // process subfolders too
    } else if (/\.(png|jpg|jpeg|jfif)$/i.test(file)) {
      const outputFile = fullPath.replace(/\.(png|jpg|jpeg|jfif)$/i, '.webp');
      sharp(fullPath)
        .webp({ quality: 80 })
        .toFile(outputFile)
        .then(() => console.log(`✅ Converted: ${file} → ${path.basename(outputFile)}`))
        .catch(err => console.error(`❌ Failed: ${file}`, err));
    }
  });
}

convertImagesToWebP(inputDir);
