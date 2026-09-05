const { chromium } = require('c:/Users/Getmeds/Desktop/nareshbishnoiwebsite/node_modules/playwright');
(async () => {
  const w = Number(process.argv[2]); const y = Number(process.argv[3]||0); const tag=process.argv[4]||'f';
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(2000);
  if (y) { await page.evaluate(y=>window.scrollTo(0,y), y); await page.waitForTimeout(1500); }
  await page.screenshot({ path: process.env.SP + `/${tag}${w}_${y}.png` });
  await browser.close();
})();
