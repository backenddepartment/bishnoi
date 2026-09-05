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
  await page.waitForTimeout(2500);
  const r = await page.evaluate(() => {
    const path = [];
    let el = document.elementFromPoint(600, 400);
    while (el) { const cs=getComputedStyle(el); path.push(`${el.tagName}#${el.id}.${String(el.className||'').slice(0,40)} pos=${cs.position} op=${cs.opacity} bg=${cs.backgroundColor} clip=${cs.clipPath} z=${cs.zIndex} tr=${cs.transform}`); el = el.parentElement; }
    // any element with clip-path or mask
    const clips=[];
    document.querySelectorAll('*').forEach(e=>{const cs=getComputedStyle(e); if(cs.clipPath!=='none'||cs.maskImage!=='none'||cs.filter!=='none'&&cs.filter.includes('url')) clips.push(e.tagName+'#'+e.id+'.'+String(e.className||'').slice(0,40)+' clip='+cs.clipPath.slice(0,80)+' mask='+cs.maskImage.slice(0,60));});
    const fixed=[];
    document.querySelectorAll('*').forEach(e=>{const cs=getComputedStyle(e); if((cs.position==='fixed')&&e.getBoundingClientRect().width>500) fixed.push(e.tagName+'#'+e.id+'.'+String(e.className||'').slice(0,40)+' op='+cs.opacity+' bg='+cs.backgroundColor+' z='+cs.zIndex+' rect='+JSON.stringify(e.getBoundingClientRect().toJSON()));});
    return { path, clips: clips.slice(0,10), fixed: fixed.slice(0,10) };
  });
  console.log('PATH@600,400:\n' + r.path.join('\n  '));
  console.log('\nCLIPS:\n' + r.clips.join('\n'));
  console.log('\nFIXED:\n' + r.fixed.join('\n'));
  await browser.close();
})();
