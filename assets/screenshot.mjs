import puppeteer from 'puppeteer';

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let total = 0;
      const dist = 250;
      const timer = setInterval(() => {
        window.scrollBy(0, dist);
        total += dist;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 80);
    });
  });
  // wait for lazy images to finish loading
  await page.waitForFunction(() =>
    Array.from(document.images).every(img => img.complete)
  , { timeout: 10000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 1000));
}

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars', '--allow-file-access-from-files', '--disable-web-security']
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// ── Run & Bass ──
console.log('Capturing runebass-site-preview.png...');
try {
  await page.goto('file:///C:/Users/nicol/runebass-site/index.html', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, 2000));
  await autoScroll(page);
  await page.screenshot({ path: 'C:\\Users\\nicol\\Portfolio\\assets\\runebass-site-preview.png', fullPage: true });
  const s = await page.evaluate(() => ({ w: document.body.scrollWidth, h: document.body.scrollHeight }));
  console.log(`  ✓ ${s.w}x${s.h}`);
} catch(e) { console.log(`  ✗ ${e.message}`); }

// ── Furlan ──
console.log('Capturing furlan-preview.png...');
try {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 20000 });
  await new Promise(r => setTimeout(r, 2000));
  await autoScroll(page);
  await page.screenshot({ path: 'C:\\Users\\nicol\\Portfolio\\assets\\furlan-preview.png', fullPage: true });
  const s = await page.evaluate(() => ({ w: document.body.scrollWidth, h: document.body.scrollHeight }));
  console.log(`  ✓ ${s.w}x${s.h}`);
} catch(e) { console.log(`  ✗ ${e.message}`); }

// ── Perrotta ──
console.log('Capturing perrotta-preview.png...');
try {
  await page.goto('file:///C:/Users/nicol/Perrotta-fragances/shop.html', { waitUntil: 'networkidle0', timeout: 20000 });
  await new Promise(r => setTimeout(r, 2000));
  await autoScroll(page);
  await page.screenshot({ path: 'C:\\Users\\nicol\\Portfolio\\assets\\perrotta-preview.png', fullPage: true });
  const s = await page.evaluate(() => ({ w: document.body.scrollWidth, h: document.body.scrollHeight }));
  console.log(`  ✓ ${s.w}x${s.h}`);
} catch(e) { console.log(`  ✗ ${e.message}`); }

// ── AI HR Academy ──
console.log('Capturing aihr-preview.png...');
try {
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle0', timeout: 20000 });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'C:\\Users\\nicol\\Portfolio\\assets\\aihr-preview.png', fullPage: true });
  const s = await page.evaluate(() => ({ w: document.body.scrollWidth, h: document.body.scrollHeight }));
  console.log(`  ✓ ${s.w}x${s.h}`);
} catch(e) { console.log(`  ✗ ${e.message}`); }

await browser.close();
console.log('Done.');
