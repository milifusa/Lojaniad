import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const fullTurn = Math.PI * 2;
const duration = 5800;
const startAngle = .14;
const panoramaUrl = '/editorial/finca-panorama.webp';
const roasteryUrl = '/editorial/tostadora.webp';
const backdropDistance = 20;

export function mountHeroScene(canvas, anchor, modelUrl, onReady) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.22;
  renderer.shadowMap.enabled = true;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, .025, 35);
  const viewMin = new THREE.Vector2();
  const viewMax = new THREE.Vector2();
  const target = new THREE.Vector3();
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let cancelled = false;
  let loaded = false;
  let visible = false;
  let finished = false;
  let frame = 0;
  let elapsed = 0;
  let lastTime = 0;
  let progress = 0;
  let angle = startAngle;
  let distance = .65;
  let width = 0;
  let height = 0;
  let modelHeight = .23;
  let modelWidth = .32;
  let drag = null;
  let backdrop = null;
  let backdropAspect = 1;
  let glassReflections;
  let bag;
  let cup;
  const bagRest = new THREE.Vector3();
  const cupRest = new THREE.Vector3();

  const daylight = new THREE.Color('#ffe1ac');
  const roasteryLight = new THREE.Color('#ffca92');
  const key = new THREE.DirectionalLight(daylight, 2.3);
  key.position.set(-.7, .9, .45);
  key.castShadow = true;
  key.shadow.mapSize.set(512, 512);
  key.shadow.camera.left = key.shadow.camera.bottom = -.34;
  key.shadow.camera.right = key.shadow.camera.top = .34;
  key.shadow.camera.near = .1;
  key.shadow.camera.far = 2.5;
  key.shadow.normalBias = .002;
  key.shadow.bias = -.0004;
  const rim = new THREE.DirectionalLight('#fff0cd', 1.4);
  rim.position.set(.65, .38, -.5);
  scene.add(key, rim, new THREE.HemisphereLight('#fff4dc', '#544727', 1.3));

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShadowMaterial({ opacity: .29 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -.004;
  floor.receiveShadow = true;
  scene.add(floor);

  function draw() {
    if (!loaded || !width || !height) return;
    const lift = Math.sin(progress * Math.PI);
    const reveal = backdrop ? THREE.MathUtils.smootherstep(progress, .61, .94) : 0;
    const arrival = Math.sin(reveal * Math.PI);
    if (bag && cup) {
      const bagRise = Math.sin(Math.PI * THREE.MathUtils.smoothstep(progress, .02, .91));
      const cupRise = Math.sin(Math.PI * THREE.MathUtils.smoothstep(progress, .12, 1));
      const sway = Math.sin(progress * fullTurn);
      bag.position.set(bagRest.x - .014 * bagRise, bagRest.y + .028 * bagRise + .012 * arrival, bagRest.z);
      bag.rotation.set(-.09 * bagRise, .30 * sway - .10 * arrival, .11 * bagRise);
      cup.position.set(cupRest.x + .024 * cupRise, cupRest.y + .045 * cupRise, cupRest.z + .025 * cupRise);
      cup.rotation.set(.065 * cupRise, -.36 * cupRise + .12 * arrival, -.07 * cupRise);
    }

    if (backdrop) {
      backdrop.material.opacity = reveal;
      const photo = backdrop.material.map;
      const zoom = 1.09 - .09 * reveal;
      photo.repeat.set(Math.min(1, backdropAspect) / zoom, Math.min(1, 1 / backdropAspect) / zoom);
      photo.offset.set((1 - photo.repeat.x) * .63, (1 - photo.repeat.y) * .5);
      key.color.lerpColors(daylight, roasteryLight, reveal);
      rim.intensity = 1.4 + .65 * reveal;
    }

    const radius = distance * (1 - .08 * lift - .035 * arrival);
    camera.position.set(
      Math.sin(angle) * radius,
      target.y + radius * (.17 + .065 * lift + .035 * arrival),
      Math.cos(angle) * radius
    );
    camera.lookAt(target);
    renderer.render(scene, camera);
  }

  function measure() {
    if (!loaded) return;
    const bounds = canvas.getBoundingClientRect();
    const product = anchor.getBoundingClientRect();
    width = Math.round(bounds.width);
    height = Math.round(bounds.height);
    if (!width || !height || !product.width || !product.height) return;

    renderer.setSize(width, height, false);
    const centerX = product.left + product.width * .5 - bounds.left;
    const centerY = product.top + product.height * .5 - bounds.top;
    camera.setViewOffset(width, height, width * .5 - centerX, height * .5 - centerY, width, height);

    if (backdrop) {
      camera.getViewBounds(backdropDistance, viewMin, viewMax);
      backdrop.position.set((viewMin.x + viewMax.x) / 2, (viewMin.y + viewMax.y) / 2, -backdropDistance);
      backdrop.scale.set(viewMax.x - viewMin.x, viewMax.y - viewMin.y, 1);

      const photo = backdrop.material.map;
      backdropAspect = (width / height) / (photo.image.width / photo.image.height);
    }

    const visibleSpan = Math.max(modelHeight / (product.height * .82), modelWidth / (product.width * .93)) * height;
    distance = visibleSpan / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
    draw();
  }

  function animate(now) {
    frame = 0;
    if (!loaded || !visible || finished || motion.matches || drag) return;
    if (lastTime) elapsed += Math.min(now - lastTime, 50);
    lastTime = now;
    progress = Math.min(elapsed / duration, 1);
    const eased = progress - Math.sin(progress * fullTurn) / fullTurn;
    angle = startAngle + fullTurn * eased;
    draw();
    finished = progress === 1;
    if (!finished) frame = requestAnimationFrame(animate);
  }

  function start() {
    if (loaded && visible && !finished && !frame && !motion.matches) {
      frame = requestAnimationFrame(animate);
    }
  }

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
  }

  function pointerDown(event) {
    if (!loaded || !event.isPrimary || event.button !== 0) return;
    stop();
    finished = true;
    drag = { id: event.pointerId, x: event.clientX, angle };
    anchor.setPointerCapture(event.pointerId);
  }

  function pointerMove(event) {
    if (drag?.id !== event.pointerId) return;
    angle = drag.angle - (event.clientX - drag.x) * .014;
    draw();
  }

  function pointerUp(event) {
    if (drag?.id === event.pointerId) drag = null;
  }

  function keyDown(event) {
    if (!loaded || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    stop();
    finished = true;
    angle += event.key === 'ArrowLeft' ? -.19 : .19;
    draw();
  }

  function visibilityChanged([entry]) {
    visible = entry.isIntersecting;
    if (!visible) stop();
    else start();
  }

  function motionChanged() {
    if (motion.matches) {
      stop();
      finished = true;
      progress = 0;
      angle = startAngle;
      draw();
    }
  }

  const listeners = [
    ['pointerdown', pointerDown], ['pointermove', pointerMove],
    ['pointerup', pointerUp], ['pointercancel', pointerUp], ['keydown', keyDown]
  ];
  for (const [event, handler] of listeners) anchor.addEventListener(event, handler);
  motion.addEventListener('change', motionChanged);
  const resize = new ResizeObserver(measure);
  resize.observe(canvas);
  resize.observe(anchor);
  const intersection = new IntersectionObserver(visibilityChanged);
  intersection.observe(anchor);

  function disposeObject(object) {
    object.traverse((node) => {
      node.geometry?.dispose();
      for (const material of [node.material].flat().filter(Boolean)) {
        for (const value of Object.values(material)) {
          if (value?.isTexture && value !== glassReflections?.texture) value.dispose();
        }
        material.dispose();
      }
    });
  }

  const textureLoader = new THREE.TextureLoader();
  Promise.allSettled([
    textureLoader.loadAsync(panoramaUrl),
    new GLTFLoader().loadAsync(modelUrl),
    textureLoader.loadAsync(roasteryUrl)
  ]).then(([panorama, asset, roastery]) => {
    if (cancelled || panorama.status !== 'fulfilled' || asset.status !== 'fulfilled') {
      if (panorama.status === 'fulfilled') panorama.value.dispose();
      if (asset.status === 'fulfilled') disposeObject(asset.value.scene);
      if (roastery.status === 'fulfilled') roastery.value.dispose();
      return;
    }

    const texture = panorama.value;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.backgroundRotation.y = 2.55;
    scene.environment = texture;
    scene.environmentIntensity = .95;
    scene.environmentRotation.y = scene.backgroundRotation.y;

    if (roastery.status === 'fulfilled') {
      roastery.value.colorSpace = THREE.SRGBColorSpace;
      // Blend in the opaque pass so the glass can refract both backgrounds during the dissolve.
      const material = new THREE.MeshBasicMaterial({
        map: roastery.value, opacity: 0, depthWrite: false, toneMapped: false,
        blending: THREE.CustomBlending, blendSrc: THREE.SrcAlphaFactor,
        blendDst: THREE.OneMinusSrcAlphaFactor, blendSrcAlpha: THREE.OneFactor
      });
      backdrop = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
      backdrop.renderOrder = -1;
      camera.add(backdrop);
      scene.add(camera);
    }

    const model = asset.value.scene;
    const bounds = new THREE.Box3().setFromObject(model);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const bagMesh = model.children.find((node) => node.name.startsWith('Funda'));
    const cupMeshes = model.children.filter((node) => /^(Taza|Espresso)/.test(node.name));
    if (bagMesh && cupMeshes.length) {
      new THREE.Box3().setFromObject(bagMesh).getCenter(bagRest);
      cupRest.copy(cupMeshes[0].position);
      bag = new THREE.Group();
      cup = new THREE.Group();
      bag.position.copy(bagRest);
      cup.position.copy(cupRest);
      model.add(bag, cup);
      bag.attach(bagMesh);
      for (const mesh of cupMeshes) cup.attach(mesh);
    }
    model.position.set(-center.x, -bounds.min.y, -center.z);
    modelHeight = size.y;
    modelWidth = Math.hypot(size.x, size.z);
    target.y = modelHeight * .51;
    model.traverse((node) => {
      if (!node.isMesh) return;
      const materials = [node.material].flat();
      node.castShadow = !materials.some((material) => material.transparent || material.transmission > 0);
      for (const material of materials) {
        if (!(material.transmission > 0)) continue;
        if (!glassReflections) {
          const room = new RoomEnvironment();
          const pmrem = new THREE.PMREMGenerator(renderer);
          glassReflections = pmrem.fromScene(room, .035, .1, 100, { size: 128 });
          room.dispose();
          pmrem.dispose();
        }
        material.envMap = glassReflections.texture;
        material.envMapIntensity = 1.15;
      }
    });
    scene.add(model);
    loaded = true;
    measure();
    onReady(true);
    start();
  });

  return () => {
    cancelled = true;
    stop();
    resize.disconnect();
    intersection.disconnect();
    for (const [event, handler] of listeners) anchor.removeEventListener(event, handler);
    motion.removeEventListener('change', motionChanged);
    disposeObject(scene);
    glassReflections?.dispose();
    scene.background?.dispose();
    renderer.dispose();
  };
}
