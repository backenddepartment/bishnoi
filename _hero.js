const { chromium } = require('c:/Users/Getmeds/Desktop/nareshbishnoiwebsite/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  for (const w of [1440,1024,900,768,700,640,430]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1800);
    const r = await page.evaluate(()=>{
      const s=document.getElementById('home');
      const cs=getComputedStyle(s);
      const h1=document.getElementById('hero-h1');
      return {sec: Math.round(s.getBoundingClientRect().height), minH: cs.minHeight, ih: innerHeight, h1fs: h1?getComputedStyle(h1).fontSize:null, root:getComputedStyle(document.documentElement).fontSize};
    });
    console.log(w, JSON.stringify(r));
    await ctx.close();
  }
  await browser.close();
})();
