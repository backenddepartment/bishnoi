const { chromium } = require('c:/Users/Getmeds/Desktop/nareshbishnoiwebsite/node_modules/playwright');
const WIDTHS = (process.argv[2]||'1600,1440,1280,1024,900,820,768,700,640,560,430,390,360,320').split(',').map(Number);
const PATH = process.argv[3] || '/';
const TAG = process.argv[4] || 'g';
(async () => {
  const browser = await chromium.launch();
  for (const w of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    const errs=[];
    page.on('pageerror', e=>errs.push(String(e).slice(0,120)));
    await page.goto('http://localhost:3001'+PATH, { waitUntil: 'networkidle', timeout: 90000 });
    await page.waitForTimeout(1800);
    const r = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const off = [];
      document.querySelectorAll('main *, footer *, header *').forEach(el => {
        const b = el.getBoundingClientRect();
        if (b.width===0||b.height===0) return;
        const cs = getComputedStyle(el);
        if (cs.position==='fixed'||parseFloat(cs.opacity)===0) return;
        if (b.right > docW+1) {
          // report only if no ancestor already reported / no scroll container
          let p=el.parentElement, clipped=false;
          while(p&&p!==document.body){const pc=getComputedStyle(p); if(pc.overflowX!=='visible'){clipped=true;break;} p=p.parentElement;}
          if(!clipped) off.push(el.tagName+'.'+String(el.className||'').slice(0,45)+' r='+Math.round(b.right));
        }
      });
      return { scrollW: document.documentElement.scrollWidth, docW, root: getComputedStyle(document.documentElement).fontSize, H: document.body.scrollHeight, off: [...new Set(off)].slice(0,8) };
    });
    console.log(String(w).padStart(5), 'root='+r.root.padEnd(9), 'scrollW='+r.scrollW, 'H='+r.H, r.off.length?('OVERFLOW: '+r.off.join(' | ')):'', errs.length?('ERR '+errs[0]):'');
    await page.screenshot({ path: process.env.SP + `/${TAG}_${w}.png` });
    await ctx.close();
  }
  await browser.close();
})();
