const { chromium } = require('c:/Users/Getmeds/Desktop/nareshbishnoiwebsite/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', e => console.log('PAGEERROR', String(e).slice(0,200)));
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);
  for (const w of [1280, 1024, 900, 768, 640, 560, 430, 375, 320]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(900);
    const r = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const bad = [];
      document.querySelectorAll('*').forEach(el => {
        const b = el.getBoundingClientRect();
        if (b.width === 0 || b.height === 0) return;
        if (b.right > docW + 1 || b.left < -1) {
          const cs = getComputedStyle(el);
          if (cs.position === 'fixed') return;
          bad.push({ t: el.tagName.toLowerCase(), c: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : String(el.className||'')).slice(0,60), l: Math.round(b.left), r: Math.round(b.right), w: Math.round(b.width) });
        }
      });
      // dedupe to outermost
      return { docW, scrollW: document.documentElement.scrollWidth, root: getComputedStyle(document.documentElement).fontSize, bad: bad.slice(0, 12), total: bad.length };
    });
    console.log(w, JSON.stringify(r));
  }
  await browser.close();
})();
