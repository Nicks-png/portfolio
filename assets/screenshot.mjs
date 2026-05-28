import puppeteer from 'puppeteer';

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let total = 0;
      const dist = 200;
      const timer = setInterval(() => {
        window.scrollBy(0, dist);
        total += dist;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 120);
    });
  });
  await page.waitForFunction(() =>
    Array.from(document.images).every(img => img.complete)
  , { timeout: 15000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 1500));
}

async function capture(page, name, opts = {}) {
  const base = 'C:\\Users\\nicol\\Portfolio\\assets\\';
  // thumbnail: viewport only (top of page)
  await page.screenshot({ path: `${base}${name}-thumb.png`, fullPage: false });
  console.log(`  thumb: ${name}-thumb.png`);
  // full page
  if (!opts.skipFull) {
    await page.screenshot({ path: `${base}${name}.png`, fullPage: true });
    const s = await page.evaluate(() => ({ w: document.body.scrollWidth, h: document.body.scrollHeight }));
    console.log(`  full:  ${name}.png  ${s.w}x${s.h}`);
  }
}

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars', '--allow-file-access-from-files', '--disable-web-security']
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// ── Run & Bass ──
console.log('Run & Bass...');
try {
  await page.goto('file:///C:/Users/nicol/runebass-site/index.html', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'C:\\Users\\nicol\\Portfolio\\assets\\runebass-site-thumb.png', fullPage: false });
  console.log('  thumb done');
  await autoScroll(page);
  await page.screenshot({ path: 'C:\\Users\\nicol\\Portfolio\\assets\\runebass-site-preview.png', fullPage: true });
  const s = await page.evaluate(() => ({ w: document.body.scrollWidth, h: document.body.scrollHeight }));
  console.log(`  full done ${s.w}x${s.h}`);
} catch(e) { console.log(`  FAIL: ${e.message}`); }

// ── Furlan ──
console.log('Furlan...');
try {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 25000 });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: 'C:\\Users\\nicol\\Portfolio\\assets\\furlan-thumb.png', fullPage: false });
  console.log('  thumb done');
  await autoScroll(page);
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'C:\\Users\\nicol\\Portfolio\\assets\\furlan-preview.png', fullPage: true });
  const s = await page.evaluate(() => ({ w: document.body.scrollWidth, h: document.body.scrollHeight }));
  console.log(`  full done ${s.w}x${s.h}`);
} catch(e) { console.log(`  FAIL: ${e.message}`); }

// ── Perrotta ──
console.log('Perrotta...');
try {
  await page.goto('file:///C:/Users/nicol/Perrotta-fragances/shop.html', { waitUntil: 'networkidle0', timeout: 20000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'C:\\Users\\nicol\\Portfolio\\assets\\perrotta-thumb.png', fullPage: false });
  console.log('  thumb done');
  await autoScroll(page);
  await page.screenshot({ path: 'C:\\Users\\nicol\\Portfolio\\assets\\perrotta-preview.png', fullPage: true });
  const s = await page.evaluate(() => ({ w: document.body.scrollWidth, h: document.body.scrollHeight }));
  console.log(`  full done ${s.w}x${s.h}`);
} catch(e) { console.log(`  FAIL: ${e.message}`); }

// ── AI HR Academy ──
console.log('AI HR Academy...');
try {
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle0', timeout: 20000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'C:\\Users\\nicol\\Portfolio\\assets\\aihr-thumb.png', fullPage: false });
  await page.screenshot({ path: 'C:\\Users\\nicol\\Portfolio\\assets\\aihr-preview.png', fullPage: true });
  const s = await page.evaluate(() => ({ w: document.body.scrollWidth, h: document.body.scrollHeight }));
  console.log(`  done ${s.w}x${s.h}`);
} catch(e) { console.log(`  FAIL: ${e.message}`); }

await browser.close();
console.log('Done.');
