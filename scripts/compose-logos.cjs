#!/usr/bin/env node
/**
 * compose-logos.cjs
 * Downloads SVG pieces from Figma and composes them into container SVGs.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, '../src/components/atoms/Logos/assets');

function fetch(url) {
  return new Promise((resolve, reject) => {
    const get = (url, redirectCount = 0) => {
      if (redirectCount > 10) return reject(new Error('Too many redirects'));
      const mod = url.startsWith('https') ? https : require('http');
      mod.get(url, { headers: { 'User-Agent': 'compose-logos/1.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location, redirectCount + 1);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        res.on('error', reject);
      }).on('error', reject);
    };
    get(url);
  });
}

function parseInsets(insetStr) {
  const parts = insetStr.split(/\s+/).map((s) => parseFloat(s.replace('%', '')) / 100);
  return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[3] };
}

function extractViewBox(svg) {
  const m = svg.match(/viewBox="([^"]+)"/);
  return m ? m[1] : null;
}

function extractPaths(svg) {
  // Extract all <path ... /> or <path ...>...</path> elements
  const paths = [];
  const re = /<path\b[^>]*(?:\/>|>[\s\S]*?<\/path>)/gi;
  let m;
  while ((m = re.exec(svg)) !== null) {
    let pathStr = m[0];
    // Replace var(--fill-0, #HEX) with just #HEX
    pathStr = pathStr.replace(/var\(--fill-\d+,\s*(#[0-9A-Fa-f]+)\)/g, '$1');
    paths.push(pathStr);
  }
  return paths;
}

async function composeLogo(name, containerW, containerH, pieces, outputFile) {
  console.log(`\nComposing ${name} (${pieces.length} pieces)...`);

  const results = [];
  const concurrency = 8;
  let idx = 0;

  async function worker() {
    while (idx < pieces.length) {
      const i = idx++;
      const piece = pieces[i];
      try {
        console.log(`  Downloading piece ${i + 1}/${pieces.length}...`);
        const svg = await fetch(piece.url);
        results[i] = { svg, insets: piece.insets };
      } catch (err) {
        console.error(`  ERROR piece ${i + 1}: ${err.message}`);
        results[i] = null;
      }
    }
  }

  const workers = [];
  for (let w = 0; w < concurrency; w++) workers.push(worker());
  await Promise.all(workers);

  let innerSvgs = '';
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (!r) continue;

    const { top, right, bottom, left } = parseInsets(r.insets);
    const x = left * containerW;
    const y = top * containerH;
    const w = (1 - left - right) * containerW;
    const h = (1 - top - bottom) * containerH;

    const viewBox = extractViewBox(r.svg);
    const paths = extractPaths(r.svg);

    if (!viewBox || paths.length === 0) {
      console.warn(`  Piece ${i + 1}: no viewBox or paths found, skipping.`);
      continue;
    }

    innerSvgs += `  <svg x="${round(x)}" y="${round(y)}" width="${round(w)}" height="${round(h)}" viewBox="${viewBox}">\n`;
    for (const p of paths) {
      innerSvgs += `    ${p}\n`;
    }
    innerSvgs += `  </svg>\n`;
  }

  const finalSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${containerW}" height="${containerH}" viewBox="0 0 ${containerW} ${containerH}" fill="none">\n${innerSvgs}</svg>\n`;

  fs.writeFileSync(outputFile, finalSvg, 'utf8');
  console.log(`  Saved: ${outputFile} (${finalSvg.length} bytes)`);
}

function round(n) {
  return Math.round(n * 1000) / 1000;
}

// --- Logo definitions ---

const mecPieces = [
  { url: 'https://www.figma.com/api/mcp/asset/48bd5906-b0a8-4ef3-a8ec-3e83c43e053a', insets: '5.38% 70.39% 0.46% 0' },
  { url: 'https://www.figma.com/api/mcp/asset/939b8988-f2a7-4e19-87bc-04eb42c0cfad', insets: '36.32% 70.39% 0.46% 7.72%' },
  { url: 'https://www.figma.com/api/mcp/asset/e74883fe-1126-4174-9af4-b2798d46af7b', insets: '61.88% 70.39% 0.46% 19.31%' },
  { url: 'https://www.figma.com/api/mcp/asset/af092132-4f64-4968-a409-373eaae38ee2', insets: '84.74% 70.39% 0.46% 27.46%' },
  { url: 'https://www.figma.com/api/mcp/asset/da37da11-4f14-43cd-a9b5-85d54fad0234', insets: '68.6% 70.39% 30.05% 29.18%' },
  { url: 'https://www.figma.com/api/mcp/asset/0ac6bc38-52d9-48fa-a37b-95061b31df8e', insets: '92.82% 81.12% 0.46% 15.02%' },
  { url: 'https://www.figma.com/api/mcp/asset/64d7e339-9a0d-4e3a-9e4e-19f551367d31', insets: '55.15% 70.39% 30.05% 29.61%' },
  { url: 'https://www.figma.com/api/mcp/asset/bdc48891-90ec-4bca-acfd-c9b6ac4254cd', insets: '5.38% 70.39% 0.46% 0' },
  { url: 'https://www.figma.com/api/mcp/asset/032e4a96-68a4-4f96-8b0d-04ed249ea377', insets: '5.38% 70.39% 0.46% 0' },
  { url: 'https://www.figma.com/api/mcp/asset/0cd02ee8-bd01-493d-b14d-853ab7260cb2', insets: '5.38% 87.99% 62.34% 0' },
  { url: 'https://www.figma.com/api/mcp/asset/f877fcf2-2377-4cff-b45b-5bf1b524ee21', insets: '5.38% 94.85% 86.55% 0' },
  { url: 'https://www.figma.com/api/mcp/asset/bc4d9c57-f78f-440d-aa4b-7d6604cc6568', insets: '5.38% 90.13% 93.27% 9.44%' },
  { url: 'https://www.figma.com/api/mcp/asset/48bb0f91-7fc8-4e17-b197-c295caeca1f0', insets: '39.01% 97.85% 46.19% 0' },
  { url: 'https://www.figma.com/api/mcp/asset/e3d460d7-4bc6-4827-8ae8-e9b9136220d1', insets: '5.38% 82.41% 93.27% 9.87%' },
  { url: 'https://www.figma.com/api/mcp/asset/4e99d0a3-6c3e-4af2-8961-08f4e1bb3077', insets: '6.73% 70.82% 83.86% 26.17%' },
  { url: 'https://www.figma.com/api/mcp/asset/d7c4a8a5-b97c-4049-82d3-4ac3bdae6a32', insets: '6.73% 73.83% 83.86% 23.17%' },
  { url: 'https://www.figma.com/api/mcp/asset/8ce219ab-447a-410d-933e-a83b5d6c88e2', insets: '9.42% 71.68% 89.24% 28.32%' },
  { url: 'https://www.figma.com/api/mcp/asset/b035db27-9bc5-4631-ab11-49f78683bc98', insets: '25.53% 0 0 34.75%' },
  { url: 'https://www.figma.com/api/mcp/asset/3af766aa-5995-4c54-ae6c-c4653c908a21', insets: '5.4% 32.27% 73.86% 63.64%' },
  { url: 'https://www.figma.com/api/mcp/asset/15957319-d1e2-4263-8fb8-620334895ab0', insets: '17.88% 33.71% 79.79% 65.19%' },
  { url: 'https://www.figma.com/api/mcp/asset/6b696e6c-d49d-4cb0-bfc0-00372ba0b708', insets: '5.44% 20.11% 79.49% 75.45%' },
  { url: 'https://www.figma.com/api/mcp/asset/9da747f2-9ca8-4755-ad34-f60a516cb74e', insets: '5.49% 53.24% 79.44% 42.52%' },
  { url: 'https://www.figma.com/api/mcp/asset/d091d2c5-41d9-4f0c-ab0f-829447ce8195', insets: '5.52% 7.47% 79.4% 88.27%' },
  { url: 'https://www.figma.com/api/mcp/asset/a0d7b2e7-b67a-4dec-ac47-40690a15af16', insets: '5.51% 58.06% 79.57% 37.6%' },
  { url: 'https://www.figma.com/api/mcp/asset/8b32306b-72a2-412b-a573-59d870a9b14e', insets: '0 44.06% 79.54% 52.02%' },
  { url: 'https://www.figma.com/api/mcp/asset/a27f5261-6835-4743-841c-4ca06a5fccbc', insets: '5.53% 0.01% 79.43% 96.18%' },
  { url: 'https://www.figma.com/api/mcp/asset/4f9c9d20-f69a-496d-8ea4-83324cd6f097', insets: '5.53% 12.58% 79.31% 83.62%' },
  { url: 'https://www.figma.com/api/mcp/asset/72596e9d-631e-4512-a2ad-59c995246b0e', insets: '5.43% 37.21% 79.41% 58.97%' },
  { url: 'https://www.figma.com/api/mcp/asset/ae4e2133-28e3-49d5-8fcd-12101fc99b99', insets: '5.46% 24.95% 79.46% 71.09%' },
  { url: 'https://www.figma.com/api/mcp/asset/be3bba26-e064-4177-8c36-c7ea4dafb637', insets: '5.47% 48.68% 79.57% 47.5%' },
  { url: 'https://www.figma.com/api/mcp/asset/2a6dcea6-5d83-4075-9e0f-d65a47372509', insets: '4.94% 62.74% 79.65% 34.84%' },
  { url: 'https://www.figma.com/api/mcp/asset/4648646c-016e-42a1-b7d2-d4ee00540c75', insets: '5.48% 16.94% 79.57% 80.65%' },
  { url: 'https://www.figma.com/api/mcp/asset/d8da28ae-9575-488d-9ff4-9075319e32a8', insets: '4.73% 3.97% 79.18% 93.48%' },
  { url: 'https://www.figma.com/api/mcp/asset/89d7dc58-a091-42ed-8724-c2c17cf7fe94', insets: '5.11% 42.35% 79.14% 56.91%' },
];

const omPieces = [
  { url: 'https://www.figma.com/api/mcp/asset/d3b70b58-7fd2-40a2-9aa0-d8976a9db3de', insets: '1% 75.99% 66.1% 20.12%' },
  { url: 'https://www.figma.com/api/mcp/asset/4c736205-63b3-459e-b912-ad89f1063a98', insets: '0.99% 62.14% 66.11% 33.96%' },
  { url: 'https://www.figma.com/api/mcp/asset/be52c6e9-f35e-4358-a7c0-f76ed23161eb', insets: '1.4% 71.02% 66.33% 24.28%' },
  { url: 'https://www.figma.com/api/mcp/asset/730fd6d4-6d02-4d4a-821b-b92ab7169b3c', insets: '1.32% 10.3% 66.3% 85.39%' },
  { url: 'https://www.figma.com/api/mcp/asset/05713bb7-c379-4358-ad44-2ca0465fec87', insets: '1.32% 0.18% 65.27% 95.47%' },
  { url: 'https://www.figma.com/api/mcp/asset/7adebaf6-b9e6-493f-9e9d-716272fd5ee2', insets: '0.89% 58.12% 65.68% 38.25%' },
  { url: 'https://www.figma.com/api/mcp/asset/3c903bac-5921-4589-bd32-eb2aef58e3c8', insets: '1.28% 26.55% 66.32% 70.41%' },
  { url: 'https://www.figma.com/api/mcp/asset/d566c019-64d0-45c2-8f4e-d3068e6f830a', insets: '1.2% 29.83% 66.38% 67.06%' },
  { url: 'https://www.figma.com/api/mcp/asset/8b6d0ce8-d5e6-4a7c-955f-b2c210f36bc4', insets: '0.64% 6.49% 66.32% 89.84%' },
  { url: 'https://www.figma.com/api/mcp/asset/d37d68de-cbd4-4d42-b07a-962656069946', insets: '1.48% 33.21% 65.49% 63.03%' },
  { url: 'https://www.figma.com/api/mcp/asset/83fd5763-86a6-4d27-a433-154fafc0d9ec', insets: '0 49.67% 66.27% 46.82%' },
  { url: 'https://www.figma.com/api/mcp/asset/c2a4be59-04ef-45bf-99d7-d412d79fad68', insets: '0.72% 14.94% 65.91% 81.85%' },
  { url: 'https://www.figma.com/api/mcp/asset/9ab768ac-4186-4ac9-acd0-62c0d01353f9', insets: '0.72% 44.02% 65.8% 52.79%' },
  { url: 'https://www.figma.com/api/mcp/asset/81689c8f-0a87-4429-a5b2-727fe5aeae50', insets: '1.32% 23.01% 66.29% 73.69%' },
  { url: 'https://www.figma.com/api/mcp/asset/69f5f868-90b6-45c1-a8c3-0c0c3fb09502', insets: '0.75% 53.4% 65.84% 44.29%' },
  { url: 'https://www.figma.com/api/mcp/asset/613b862e-c723-47e4-b619-e2f5c699d1ad', insets: '0.73% 41.25% 65.92% 56.44%' },
  { url: 'https://www.figma.com/api/mcp/asset/21511fc9-e82d-4b87-bfb5-4164acd57067', insets: '0.76% 37.19% 65.88% 60.49%' },
  { url: 'https://www.figma.com/api/mcp/asset/1abe1b2b-f738-4e93-9f29-3fd06f4313ec', insets: '1.32% 66.2% 66.26% 30.51%' },
  { url: 'https://www.figma.com/api/mcp/asset/309e3aa2-86ef-4257-8fb0-7ee156fff091', insets: '1.49% 20.15% 66.24% 76.68%' },
  { url: 'https://www.figma.com/api/mcp/asset/7a5ad782-3d97-40b3-9396-c6ec0c615c8d', insets: '1.33% 4.68% 66.41% 93.59%' },
  { url: 'https://www.figma.com/api/mcp/asset/797ba288-cdb1-42e2-867b-a60db5fc7c90', insets: '1.33% 56.15% 66.41% 42.14%' },
  { url: 'https://www.figma.com/api/mcp/asset/da1996f3-7571-4abf-830d-d978593d42f7', insets: '1.32% 47.65% 66.45% 50.62%' },
  { url: 'https://www.figma.com/api/mcp/asset/8647969c-0442-45a9-9b4d-5fd151319bcf', insets: '1.62% 19.6% 90.87% 79.29%' },
  { url: 'https://www.figma.com/api/mcp/asset/cd105e83-d5fd-42d7-9386-015c1409f9f9', insets: '43.49% 0 0 19.78%' },
  { url: 'https://www.figma.com/api/mcp/asset/9c7a1be0-ad23-4557-9fea-dca629930153', insets: '51.98% 24.89% 18.09% 72.33%' },
  { url: 'https://www.figma.com/api/mcp/asset/291d7415-ffb4-467f-a55d-753b50306e7d', insets: '67.81% 25.67% 20.3% 73.47%' },
  { url: 'https://www.figma.com/api/mcp/asset/b9869585-9641-46bf-bce6-c526f8d72325', insets: '54.75% 25.75% 34.68% 73.47%' },
  { url: 'https://www.figma.com/api/mcp/asset/594137e5-8a02-4eec-be34-cf950a5fe2f4', insets: '61.67% 44.18% 7.36% 53.23%' },
  { url: 'https://www.figma.com/api/mcp/asset/7eaf3905-5777-410f-9139-147474181d21', insets: '83.48% 44.72% 9.36% 53.73%' },
  { url: 'https://www.figma.com/api/mcp/asset/e9668b41-64b0-45c7-b55b-e2074588984f', insets: '63.2% 45.11% 25.49% 54.05%' },
  { url: 'https://www.figma.com/api/mcp/asset/9ff3a6c5-71e2-4ccc-b503-1cc92740f087', insets: '61.47% 63.36% 7.78% 34.04%' },
  { url: 'https://www.figma.com/api/mcp/asset/8eab9002-a107-4016-b189-d075654c548b', insets: '63.56% 64.11% 19.52% 35.02%' },
  { url: 'https://www.figma.com/api/mcp/asset/7d03eacf-8e3c-47f8-8222-440bbb75cf5a', insets: '61.27% 66.85% 18.1% 29.15%' },
  { url: 'https://www.figma.com/api/mcp/asset/89d7dc58-a091-42ed-8724-c2c17cf7fe94', insets: '61.56% 36.19% 17.57% 61.37%' },
  { url: 'https://www.figma.com/api/mcp/asset/602e18c0-21b7-4a75-a3ec-3a8d79d79ed2', insets: '63.23% 36.93% 19.43% 62.07%' },
  { url: 'https://www.figma.com/api/mcp/asset/df425d93-d373-4a4a-b699-c18c485d645e', insets: '51.92% 73.95% 17.42% 23.92%' },
  { url: 'https://www.figma.com/api/mcp/asset/3da38608-ab2e-48c1-bf0d-1d89e0624569', insets: '52.18% 39.23% 18.06% 57.8%' },
  { url: 'https://www.figma.com/api/mcp/asset/8b045320-70d9-4e17-93b8-fa0344f006d9', insets: '61.3% 12.56% 18.07% 84.54%' },
  { url: 'https://www.figma.com/api/mcp/asset/8d0e3b3b-dffd-4a7d-a608-5e4b1acb5ee8', insets: '61.44% 21.28% 17.3% 76.05%' },
  { url: 'https://www.figma.com/api/mcp/asset/9c2865bc-0616-4493-8b92-b59e63a4acc6', insets: '61.46% 32.46% 17.37% 64.72%' },
  { url: 'https://www.figma.com/api/mcp/asset/6e953b02-9306-4009-be77-66996c13e0f0', insets: '61.22% 47.57% 18.08% 49.67%' },
  { url: 'https://www.figma.com/api/mcp/asset/05e169e2-c34f-4860-b979-8e7ef67f4840', insets: '61.64% 9.61% 17.5% 88.17%' },
  { url: 'https://www.figma.com/api/mcp/asset/c3c7e10d-0cd6-4340-8ae0-2d4a89af4076', insets: '63.11% 10.31% 29.59% 88.92%' },
  { url: 'https://www.figma.com/api/mcp/asset/0837149a-84bf-4abb-88c1-2734e2e05deb', insets: '51.18% 56.11% 18.08% 41.89%' },
  { url: 'https://www.figma.com/api/mcp/asset/f4b2caa0-23bb-4807-8024-be86b7e4aab5', insets: '61.91% 53.18% 7.41% 44.06%' },
  { url: 'https://www.figma.com/api/mcp/asset/06ce9815-0573-46b3-a34a-93c5815e94ca', insets: '51.14% 61.15% 18.14% 37.56%' },
  { url: 'https://www.figma.com/api/mcp/asset/289bf282-eac3-4f9f-adef-f3f35c9afc7d', insets: '61.56% 18.49% 17.55% 79.63%' },
  { url: 'https://www.figma.com/api/mcp/asset/19de06f8-55f0-4704-a5b4-ad4ddc296b5c', insets: '61.58% 6.76% 17.51% 91.32%' },
  { url: 'https://www.figma.com/api/mcp/asset/425bcc08-b5ab-4edc-91eb-e9ae4bde6728', insets: '61.58% 3.99% 17.51% 94.11%' },
  { url: 'https://www.figma.com/api/mcp/asset/73254ee1-9886-46d1-a871-06b5042a6e8b', insets: '61.35% 29.73% 18.08% 68.24%' },
  { url: 'https://www.figma.com/api/mcp/asset/bf84371d-e127-40e6-aa81-5514dec49438', insets: '61.7% 71.7% 18.1% 27%' },
  { url: 'https://www.figma.com/api/mcp/asset/3fabfae2-ee1a-4d80-8ff1-786ef8679f03', insets: '61.71% 51.18% 18.1% 47.53%' },
  { url: 'https://www.figma.com/api/mcp/asset/c86626e2-8d9d-4761-bc1e-459d049e38a2', insets: '61.69% 16.35% 18.14% 82.43%' },
  { url: 'https://www.figma.com/api/mcp/asset/3f041cb4-d4fb-420b-99d3-1418ce4eaea9', insets: '61.75% 58.88% 18.16% 39.71%' },
  { url: 'https://www.figma.com/api/mcp/asset/b80ef711-3c32-4c88-943b-6d94084cd1e1', insets: '52.61% 51.44% 40.6% 47.76%' },
  { url: 'https://www.figma.com/api/mcp/asset/039d2b12-36d1-4995-8229-10a5108580a8', insets: '52.62% 59.26% 40.62% 39.94%' },
  { url: 'https://www.figma.com/api/mcp/asset/509c0aeb-6281-4867-8790-7ffb976c74f9', insets: '52.64% 16.56% 40.63% 82.65%' },
  { url: 'https://www.figma.com/api/mcp/asset/9ed3ddc8-f650-4155-80a2-c8492427d9ec', insets: '52.33% 71.97% 40.5% 27.26%' },
  { url: 'https://www.figma.com/api/mcp/asset/943dc456-d05a-4d7c-93d9-2835d6aaf318', insets: '0 83.29% 0.37% 0' },
];

async function main() {
  await composeLogo(
    'MEC',
    69, 22,
    mecPieces,
    path.join(OUTPUT_DIR, 'mec-logo.svg')
  );

  await composeLogo(
    'OM Logistics',
    186, 22,
    omPieces,
    path.join(OUTPUT_DIR, 'om-logistics-logo.svg')
  );

  console.log('\nDone!');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
