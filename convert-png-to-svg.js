const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const chokidar = require('chokidar');

const inputDir = 'site/static/images';
const outputDir = 'site/static/images_svg';

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

async function convertPngToSvg(filePath) {
    const fileName = path.basename(filePath, '.png');
    const outputPath = path.join(outputDir, fileName + '.svg');

    const buffer = await sharp(filePath)
        .resize({ width: 512 })
        .toFormat('png')
        .toBuffer();

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
  <image href="data:image/png;base64,${buffer.toString('base64')}" width="512" height="512"/>
</svg>`;

    fs.writeFileSync(outputPath, svgContent);
    console.log(`Converted: ${fileName}.png → ${fileName}.svg`);
}

// Convert existing PNGs
fs.readdirSync(inputDir).forEach(file => {
    if (file.toLowerCase().endsWith('.png')) {
        convertPngToSvg(path.join(inputDir, file));
    }
});

// Watch for new PNGs
chokidar.watch(inputDir, { ignoreInitial: true }).on('add', filePath => {
    if (filePath.toLowerCase().endsWith('.png')) {
        convertPngToSvg(filePath);
    }
});

console.log('Watching for new PNG files...');
