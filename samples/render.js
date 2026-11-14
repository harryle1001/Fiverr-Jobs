const {chromium}=require('playwright');const {execSync}=require('child_process');const fs=require('fs');
const jobs=[['ad/ad.html',720,1280,10,30,'ad/product-ad-demo.mp4'],['event/event.html',1280,720,8,30,'event/event-loop-demo.mp4']];
(async()=>{const br=await chromium.launch();
for(const [f,w,h,d,fps,out] of jobs){const pg=await br.newPage({viewport:{width:w,height:h}});
 await pg.goto('file://'+__dirname+'/'+f);const dir='/tmp/fr_'+out.replace(/\W/g,'');fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir);
 for(let i=0;i<d*fps;i++){await pg.evaluate(t=>render(t),i/fps);await pg.screenshot({path:`${dir}/${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:92})}
 execSync(`ffmpeg -y -loglevel error -framerate ${fps} -i ${dir}/%04d.jpg -c:v libx264 -pix_fmt yuv420p -crf 18 ${__dirname}/${out}`);console.log('done',out)}
// product images
const pg=await br.newPage({viewport:{width:1600,height:1600},deviceScaleFactor:1});
const bgs=[['studio','radial-gradient(circle at 50% 40%,#fff,#cfe3ee)'],['aqua','radial-gradient(circle at 50% 35%,#1b8fb5,#04121f)'],['dark','linear-gradient(160deg,#111,#000)']];
for(const [n,bg] of bgs){await pg.setContent(`<body style="margin:0;background:${bg};display:flex;align-items:center;justify-content:center;height:1600px"><div id=b style="width:700px;filter:drop-shadow(0 60px 50px #0009)"></div><script src="file://${__dirname}/bottle.js"><\/script><script>b.innerHTML=bottleSVG(.62)<\/script>`);
 await pg.waitForTimeout(300);await pg.screenshot({path:`${__dirname}/images/product-${n}.png`})}
await pg.setViewportSize({width:390,height:844});await pg.goto('file://'+__dirname+'/website/index.html');await pg.waitForTimeout(1800);await pg.screenshot({path:__dirname+'/website/preview-mobile.png'});
await pg.setViewportSize({width:1440,height:900});await pg.waitForTimeout(500);await pg.screenshot({path:__dirname+'/website/preview-desktop.png'});
await br.close()})();
