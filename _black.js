const { chromium } = require('c:/Users/Getmeds/Desktop/nareshbishnoiwebsite/node_modules/playwright');
const zlib = require('zlib');
function meanLum(buf){
  // decode PNG minimally? use sharp? not available. Instead sample via page.evaluate on elements.
}
(async () => {
  const w = Number(process.argv[2]);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);
  const H = await page.evaluate(() => document.body.scrollHeight);
  const steps = Math.ceil(H/900);
  console.log('width', w, 'height', H, 'steps', steps);
  for (let i=0;i<steps;i++){
    const y = i*900;
    await page.evaluate(y=>window.scrollTo(0,y), y);
    await page.waitForTimeout(400);
    const r = await page.evaluate(() => {
      // sample a grid of points, find topmost element and its text presence
      const pts = [];
      for (let px=0.1; px<1; px+=0.2) for (let py=0.1; py<1; py+=0.2) pts.push([px*innerWidth, py*innerHeight]);
      const secs = new Set();
      let textPx = 0;
      pts.forEach(([x,y])=>{
        const el = document.elementFromPoint(x,y);
        if(!el) return;
        let s = el.closest('section,footer,header'); if(s) secs.add(s.id || s.tagName.toLowerCase());
      });
      // visible text in viewport
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n, chars=0;
      while((n=walker.nextNode())){
        const t=n.textContent.trim(); if(!t) continue;
        const rg=document.createRange(); rg.selectNodeContents(n);
        const b=rg.getBoundingClientRect();
        if(b.bottom>0&&b.top<innerHeight&&b.width>0) chars+=t.length;
      }
      return { secs:[...secs], chars };
    });
    console.log(' y='+y, JSON.stringify(r));
  }
  await browser.close();
})();
