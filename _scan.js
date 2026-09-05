const { chromium } = require('c:/Users/Getmeds/Desktop/nareshbishnoiwebsite/node_modules/playwright');
(async () => {
  const w = Number(process.argv[2]);
  const n = Number(process.argv[3] || 10);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);
  const H = await page.evaluate(() => document.body.scrollHeight);
  console.log('height', H);
  for (let i = 0; i < n; i++) {
    const y = Math.round((H - 900) * i / (n - 1));
    await page.evaluate(y => window.scrollTo(0, y), y);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: process.env.SP + `/s${w}_${i}.png` });
  }
  await browser.close();
})();
