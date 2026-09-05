const { chromium } = require('c:/Users/Getmeds/Desktop/nareshbishnoiwebsite/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight*0.9));
  await page.waitForTimeout(2000);
  await page.setViewportSize({ width: 1250, height: 900 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => { document.body.style.display='none'; void document.body.offsetHeight; document.body.style.display=''; });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: process.env.SP + '/repaint.png' });
  await browser.close();
})();
