const { chromium } = require('c:/Users/Getmeds/Desktop/nareshbishnoiwebsite/node_modules/playwright');
(async () => {
  const widths = process.argv.slice(2).map(Number);
  const browser = await chromium.launch();
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2500);
    const info = await page.evaluate(() => ({
      rootFont: getComputedStyle(document.documentElement).fontSize,
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
      bodyH: document.body.scrollHeight,
    }));
    console.log(w, JSON.stringify(info), errs.length ? 'ERR:'+errs.join('|') : '');
    await page.screenshot({ path: process.env.SP + `/w${w}.png` });
    await ctx.close();
  }
  await browser.close();
})();
