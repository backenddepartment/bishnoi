const { chromium } = require('c:/Users/Getmeds/Desktop/nareshbishnoiwebsite/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight*0.9));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: process.env.SP + '/ba_before.png' });
  await page.setViewportSize({ width: 1250, height: 900 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: process.env.SP + '/ba_after.png' });
  // now nudge scroll
  await page.evaluate(() => window.scrollBy(0, 10));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: process.env.SP + '/ba_nudge.png' });
  const r = await page.evaluate(()=>{
    const out=[];
    document.querySelectorAll('main *, footer *').forEach(el=>{
      const b=el.getBoundingClientRect(); if(b.bottom<0||b.top>innerHeight||b.width===0) return;
      const cs=getComputedStyle(el);
      if(parseFloat(cs.opacity)<0.1) out.push(el.tagName+'.'+String(el.className||'').slice(0,50)+' op='+cs.opacity+' tr='+cs.transform);
    });
    return out.slice(0,20);
  });
  console.log(r.join('\n'));
  await browser.close();
})();
