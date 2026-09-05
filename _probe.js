const { chromium } = require('c:/Users/Getmeds/Desktop/nareshbishnoiwebsite/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight*0.9));
  await page.waitForTimeout(1500);
  const dump = async (label) => {
    const r = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('main > *, footer, main > * > *').forEach(el=>{
        const b = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        out.push({ t: el.tagName.toLowerCase(), id: el.id, cls: String(el.className||'').slice(0,40), l:Math.round(b.left), r:Math.round(b.right), top:Math.round(b.top), h:Math.round(b.height), pos:cs.position, tr: cs.transform==='none'?'':cs.transform });
      });
      return { sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, y: Math.round(scrollY), out };
    });
    console.log('===',label, r.sw, r.cw, r.y);
    r.out.filter(o=>o.h>0).forEach(o=>console.log('  ', JSON.stringify(o)));
  };
  await dump('before 1600');
  await page.setViewportSize({ width: 1250, height: 900 });
  await page.waitForTimeout(1500);
  await dump('after 1250');
  await browser.close();
})();
