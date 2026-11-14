import * as THREE from './lib/three.module.js';
import { RoomEnvironment } from './lib/RoomEnvironment.js';

function roundedBox(w, d, h, r, bevel) {
  const s = new THREE.Shape(), x = -w / 2, y = -d / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + d - r); s.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
  s.lineTo(x + r, y + d); s.quadraticCurveTo(x, y + d, x, y + d - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  const g = new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 8, curveSegments: 16 });
  g.rotateX(-Math.PI / 2); g.translate(0, 0, 0); return g;
}
function labelTexture(brand, sub) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 640; const x = c.getContext('2d');
  x.fillStyle = '#fbf5ea'; x.fillRect(0, 0, 512, 640);
  x.strokeStyle = '#c9a24d'; x.lineWidth = 6; x.strokeRect(18, 18, 476, 604);
  x.fillStyle = '#3a1a24'; x.textAlign = 'center';
  x.font = '700 92px Georgia'; x.fillText(brand, 256, 270);
  x.fillStyle = '#c9a24d'; x.fillRect(176, 305, 160, 4);
  x.fillStyle = '#6a4a3a'; x.font = '34px Georgia'; x.fillText(sub, 256, 375);
  x.font = '26px Arial'; x.fillStyle = '#8a6a5a'; x.fillText('50 ML · 1.7 FL OZ', 256, 560);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}

export function createScene(canvas, W, H, opts = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(opts.dpr || 1); renderer.setSize(W, H, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  const camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 100); camera.position.set(0, 2.2, 13); camera.lookAt(0, 2.0, 0);

  const bottle = new THREE.Group(); scene.add(bottle);
  const gold = new THREE.MeshStandardMaterial({ color: 0xe0b860, metalness: 1, roughness: 0.22 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0.02, transmission: 0, ior: 1.5, clearcoat: 1, clearcoatRoughness: 0.02, transparent: true, opacity: 0.22, envMapIntensity: 2.2, depthWrite: false });
  const liquidMat = new THREE.MeshPhysicalMaterial({ color: opts.liquid || 0xe08a52, roughness: 0.05, transparent: true, opacity: 0.8, emissive: opts.liquid || 0xe08a52, emissiveIntensity: 0.1 });

  const body = new THREE.Mesh(roundedBox(1.7, 1.1, 2.7, 0.18, 0.1), glass); bottle.add(body);
  const liquid = new THREE.Mesh(roundedBox(1.5, 0.9, 1.95, 0.14, 0.06), liquidMat); liquid.position.y = 0.2; bottle.add(liquid);
  const base = new THREE.Mesh(roundedBox(1.6, 1.0, 0.18, 0.12, 0.05), new THREE.MeshPhysicalMaterial({ color: 0xfff4ea, roughness: 0.05, transparent: true, opacity: 0.55 })); base.position.y = 0.05; bottle.add(base);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.5, 48), gold); neck.position.y = 3.05; bottle.add(neck);
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.07, 24, 64), gold); collar.rotation.x = Math.PI / 2; collar.position.y = 2.85; bottle.add(collar);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 1.15, 64, 1), gold); cap.position.y = 3.85; bottle.add(cap);
  const capTop = new THREE.Mesh(new THREE.SphereGeometry(0.62, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), gold); capTop.scale.y = 0.25; capTop.position.y = 4.42; bottle.add(capTop);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.63, 0.03, 16, 64), gold); ring.rotation.x = Math.PI / 2; ring.position.y = 3.3; bottle.add(ring);
  const lab = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.25), new THREE.MeshStandardMaterial({ map: labelTexture('AURÉA', 'EAU DE PARFUM'), roughness: 0.6 }));
  lab.position.set(0, 1.0, 0.66); bottle.add(lab);
  bottle.position.y = -0.5;

  // soft contact glow instead of a hard floor
  const gc = document.createElement('canvas'); gc.width = gc.height = 256; const gx = gc.getContext('2d');
  const gg = gx.createRadialGradient(128, 128, 0, 128, 128, 128); gg.addColorStop(0, 'rgba(255,200,140,.55)'); gg.addColorStop(.45, 'rgba(217,120,90,.18)'); gg.addColorStop(1, 'rgba(0,0,0,0)');
  gx.fillStyle = gg; gx.fillRect(0, 0, 256, 256);
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(gc), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  glow.rotation.x = -Math.PI / 2; glow.position.y = -0.48; scene.add(glow);
  // lights
  const key = new THREE.SpotLight(0xffe2c0, 140, 30, 0.5, 0.6); key.position.set(4, 8, 6); scene.add(key);
  const rim = new THREE.PointLight(0xff7aa8, 60, 20); rim.position.set(-5, 3, -3); scene.add(rim);
  const rim2 = new THREE.PointLight(0xffd27a, 50, 20); rim2.position.set(5, 2, -4); scene.add(rim2);
  // sparkles
  const N = 160, pos = new Float32Array(N * 3), ph = [];
  for (let i = 0; i < N; i++) { pos.set([(Math.random() - .5) * 8, Math.random() * 7 - .5, (Math.random() - .5) * 5 - 1], i * 3); ph.push(Math.random() * 6.28); }
  const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xffd98a, size: 0.05, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending })); scene.add(pts);

  const api = {
    THREE, renderer, scene, camera, bottle, liquidMat, W, H,
    setLiquid(hex) { liquidMat.color.set(hex); liquidMat.emissive.set(hex); },
    setSize(w, h) { renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); },
    // deterministic cinematic animation, t in seconds
    frame(t, T = 10) {
      const e = k => { k = Math.max(0, Math.min(1, k)); return 1 - Math.pow(1 - k, 3); };
      const intro = e(t / 2.2);
      bottle.rotation.y = (1 - intro) * -2.4 + (t - 6.5) * 0.4 - (1 - intro) * 0;
      bottle.position.y = -0.5 + (1 - intro) * 4 + Math.sin(t * 1.5) * 0.04 * intro;
      const dolly = 14.5 - e((t - 2.5) / 5) * 3.2;
      camera.position.set(Math.sin(t * 0.25) * 1.5, 2.2 + e((t - 2.5) / 5) * 0.8, dolly);
      camera.lookAt(0, 2.0, 0);
      key.position.x = 4 + Math.sin(t * 0.8) * 3; rim.position.x = -5 + Math.cos(t * 0.6) * 2;
      const p = pg.attributes.position;
      for (let i = 0; i < N; i++) { p.array[i * 3 + 1] += 0.004 + (i % 5) * 0.0006; if (p.array[i * 3 + 1] > 6.6) p.array[i * 3 + 1] = -0.5; p.array[i * 3] += Math.sin(t + ph[i]) * 0.0015; }
      p.needsUpdate = true;
      renderer.render(scene, camera);
    },
    draw() { renderer.render(scene, camera); }
  };
  return api;
}
