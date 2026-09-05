const { chromium } = require('c:/Users/Getmeds/Desktop/nareshbishnoiwebsite/node_modules/playwright');
(async () => {
  const w = Number(process.argv[2]); const PATH = process.argv[3]||'/'; const TAG=process.argv[4]||'sc';
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3001'+PATH, { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(1500);
  const H = await page.evaluate(()=>document.body.scrollHeight);
  const n = Math.ceil(H/850);
  for (let i=0;i<n;i++){
    await page.evaluate(y=>window.scrollTo(0,y), i*850);
    await page.waitForTimeout(700);
    await page.screenshot({ path: process.env.SP + `/${TAG}${w}_${String(i).padStart(2,'0')}.png` });
  }
  console.log('shots', n, 'H', H);
  await browser.close();
})();
