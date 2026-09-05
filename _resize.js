const { chromium } = require('c:/Users/Getmeds/Desktop/nareshbishnoiwebsite/node_modules/playwright');
(async () => {
  const url = process.argv[2] || 'http://localhost:3001/';
  const tag = process.argv[3] || 'loc';
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(2500);
  // scroll to bottom-ish like the user
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight*0.9));
  await page.waitForTimeout(1500);
  for (const [i,w] of [1250, 1000, 800, 700, 640, 500].entries()) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(1200);
    const info = await page.evaluate(()=>({y:Math.round(scrollY), H:document.body.scrollHeight, root:getComputedStyle(document.documentElement).fontSize}));
    console.log(tag, w, JSON.stringify(info));
    await page.screenshot({ path: process.env.SP + `/rz_${tag}_${w}.png` });
  }
  await browser.close();
})();
