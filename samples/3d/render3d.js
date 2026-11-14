const {chromium}=require('playwright');const {execSync}=require('child_process');const fs=require('fs');
const [W,H,T,FPS,out]=[+process.argv[2],+process.argv[3],+process.argv[4],30,process.argv[5]];
(async()=>{const br=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const pg=await br.newPage({viewport:{width:W,height:H}});pg.on('pageerror',e=>console.log('ERR',e.message));
fs.writeFileSync(__dirname+'/_r.html',`<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:radial-gradient(circle at 50% 40%,#4a1d3a,#120b12 70%)}canvas{display:block;width:${W}px;height:${H}px}</style><canvas id=c></canvas><script type=module>import {createScene} from './scene.js';window.S=createScene(document.getElementById('c'),${W},${H});window.ready=1;<\/script>`);
await pg.goto('http://localhost:8765/_r.html');await pg.waitForFunction('window.ready');
const dir='/tmp/f3d_'+out.replace(/\W/g,'');fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir);
const n=T*FPS,t0=Date.now();
for(let i=0;i<n;i++){await pg.evaluate(t=>S.frame(t),i/FPS);await pg.screenshot({path:`${dir}/${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:93});if(i==2)console.log('~',((Date.now()-t0)/3/1000).toFixed(1),'s/frame')}
const wav=`/tmp/mus_${T}.wav`;
const ch=[[220,261.6,329.6],[174.6,220,261.6],[261.6,329.6,392],[196,246.9,293.7]],seg=T/4;
const expr=ch.map((c,i)=>`between(t,${i*seg},${(i+1)*seg})*(${c.map(f=>`sin(2*PI*${f}*t)`).join('+')})*0.12`).join('+')+`+0.25*sin(2*PI*55*t)*exp(-8*mod(t,0.5))`;
execSync(`ffmpeg -y -loglevel error -f lavfi -i "aevalsrc='${expr}':s=44100:d=${T}" -af "afade=t=in:d=0.8,afade=t=out:st=${T-1}:d=1,lowpass=f=2200,aecho=0.8:0.7:120:0.35" ${wav}`);
execSync(`ffmpeg -y -loglevel error -framerate ${FPS} -i ${dir}/%04d.jpg -i ${wav} -c:v libx264 -pix_fmt yuv420p -crf 17 -c:a aac -b:a 160k -shortest ${__dirname}/${out}`);
// still frame
await pg.evaluate(()=>S.frame(6.5));await pg.screenshot({path:__dirname+'/'+out.replace('.mp4','-still.png')});
fs.unlinkSync(__dirname+'/_r.html');await br.close();console.log('done',out)})();
