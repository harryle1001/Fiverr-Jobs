const {chromium}=require('playwright');const {execSync}=require('child_process');const fs=require('fs');
// [file, baseW, baseH, dur, fps, scale, out]
const jobs=[['ad/ad.html',720,1280,10,30,1.5,'ad/product-ad-1080x1920.mp4']];
(async()=>{const br=await chromium.launch();
for(const [f,w,h,d,fps,S,out] of jobs){
 const wav=`/tmp/mus_${d}.wav`;
 // synth pad: Am-F-C-G style chords w/ slow tremolo + soft kick pulse, fades
 const ch=[[220,261.6,329.6],[174.6,220,261.6],[261.6,329.6,392],[196,246.9,293.7]];
 const seg=d/4;const expr=ch.map((c,i)=>`between(t,${i*seg},${(i+1)*seg})*(${c.map(fr=>`sin(2*PI*${fr}*t)`).join('+')})*0.12`).join('+')+`+0.25*sin(2*PI*55*t)*exp(-8*mod(t,0.5))`;
 execSync(`ffmpeg -y -loglevel error -f lavfi -i "aevalsrc='${expr}':s=44100:d=${d}" -af "afade=t=in:d=0.8,afade=t=out:st=${d-1}:d=1,lowpass=f=2200,aecho=0.8:0.7:120:0.35" ${wav}`);
 const pg=await br.newPage({viewport:{width:w,height:h},deviceScaleFactor:S});
 await pg.goto('file://'+__dirname+'/'+f+'#'+S);const dir='/tmp/fr2_'+out.replace(/\W/g,'');fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir);
 for(let i=0;i<d*fps;i++){await pg.evaluate(t=>render(t),i/fps);await pg.screenshot({path:`${dir}/${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:92})}
 execSync(`ffmpeg -y -loglevel error -framerate ${fps} -i ${dir}/%04d.jpg -i ${wav} -c:v libx264 -pix_fmt yuv420p -crf 18 -c:a aac -b:a 160k -shortest ${__dirname}/${out}`);console.log('done',out)}
await br.close()})();
