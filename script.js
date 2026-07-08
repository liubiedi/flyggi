const zones = {
  'plot-a': { title: 'Plot A · 9 raised beds', description: 'The largest soil-growing area uses multiple 2.33 × 1.17 m raised beds for seasonal vegetables, herbs, and accessible crop rotation.', stats: { Capacity: '9 beds', Mode: 'Soil growing', Interaction: 'Assign beds, inspect crops, and plan rotations' } },
  'plot-b': { title: 'Plot B · 4 raised beds', description: 'A compact row of beds at the top edge of the garden, ideal for education sessions, trial crops, or volunteer-managed planting.', stats: { Capacity: '4 beds', BedSize: '2.33 × 1.17 m', Interaction: 'Compare crop plans with Plot A' } },
  'hydro-a': { title: 'Hydroponics A · vertical towers', description: 'Vertical towers sit in a blue production zone to maximize yield in a small footprint and make nutrient-flow systems visible.', stats: { System: 'Vertical towers', Benefit: 'High density leafy greens', Interaction: 'Toggle tower focus and imagine live sensor data' } },
  'hydro-b': { title: 'Hydroponics B · buckets + aeroponics', description: 'Dutch bucket and aeroponic benches support demonstration growing beside the solar farm and the outdoor learning area.', stats: { System: 'Dutch bucket + aeroponics', Location: 'Central learning zone', Interaction: 'Review modules and maintenance points' } },
  solar: { title: 'Solar Farm', description: 'A 15 sq. m. panel array powers pumps, lighting, and monitoring for the smart garden systems.', stats: { Area: '15 sq. m.', Purpose: 'Renewable energy', Interaction: 'Connect energy production to hydroponics' } },
  shelter: { title: 'Shelter and seating', description: 'The covered seating area provides shade for classes, volunteer breaks, and garden planning meetings.', stats: { Use: 'Gathering + workshops', Nearby: 'Share-food station', Interaction: 'Open community activity ideas' } },
  compost: { title: 'Composting zone', description: 'The right-side composting area closes the loop by transforming garden waste into soil amendments for the raised beds.', stats: { Units: 'Multiple 1 sq. m. bins', Flow: 'Waste → compost → beds', Interaction: 'Track compost stages' } },
  water: { title: 'Existing water point', description: 'The water connection supports hand watering, hydroponic reservoirs, cleaning, and emergency access.', stats: { Asset: 'Existing water point', Supports: 'Beds + hydroponics', Interaction: 'Show irrigation routes' } },
  share: { title: 'Start small · store food · share food', description: 'A small vertical hub highlights the garden mission: begin with manageable actions, store harvests safely, and share food locally.', stats: { Mission: 'Food resilience', Location: 'Beside shelter', Interaction: 'Plan harvest distribution' } },
  tree: { title: 'Social tree seating', description: 'A circular bench around a large tree creates a calm meeting place and a visual anchor for the garden.', stats: { Feature: 'Shade tree + bench', Use: 'Rest and conversation', Interaction: 'Highlight visitor route' } }
};

const scene = document.querySelector('#gardenScene');
const modelViewer = document.querySelector('#gardenModel');
const title = document.querySelector('#zoneTitle');
const description = document.querySelector('#zoneDescription');
const stats = document.querySelector('#zoneStats');
const zoneButtons = [...document.querySelectorAll('.hotspot')];
let active = 0;
let scale = 1;
const MIN_SCALE = 0.6;
const MAX_SCALE = 2.5;
const ZOOM_STEP = 0.16;
const ROTATION_STEP_DEGREES = 30;
const TILT_STEP_DEGREES = 8;
const HORIZONTAL_VIEW_THETA_DEGREES = 35;
const DEFAULT_VIEW_PHI_DEGREES = 62;
const MIN_VIEW_PHI_DEGREES = 18;
const MAX_VIEW_PHI_DEGREES = 86;
const DEFAULT_CAMERA_DISTANCE = 115;

let orbit = HORIZONTAL_VIEW_THETA_DEGREES;
let tilt = DEFAULT_VIEW_PHI_DEGREES;
let tourTimer;

function renderZone(id) {
  const data = zones[id];
  zoneButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.zone === id));
  title.textContent = data.title;
  description.textContent = data.description;
  stats.innerHTML = Object.entries(data.stats).map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`).join('');
  active = zoneButtons.findIndex(btn => btn.dataset.zone === id);}

function updateTransform() {
  modelViewer.cameraOrbit = `${orbit}deg ${tilt}deg ${Math.round(DEFAULT_CAMERA_DISTANCE / scale)}%`;
  modelViewer.minCameraOrbit = `auto ${MIN_VIEW_PHI_DEGREES}deg 40%`;
  modelViewer.maxCameraOrbit = `auto ${MAX_VIEW_PHI_DEGREES}deg 420%`;
}

function resetView() {
  scale = 1;
  orbit = HORIZONTAL_VIEW_THETA_DEGREES;
  tilt = DEFAULT_VIEW_PHI_DEGREES;
  updateTransform();
  modelViewer.jumpCameraToGoal?.();
}

function showMissingModel() {
  scene.classList.add('model-missing');
}

modelViewer.addEventListener('load', () => {
  scene.classList.remove('model-missing');
  scene.classList.add('model-ready');
});

modelViewer.addEventListener('error', () => {
  const fallbackSrc = modelViewer.dataset.fallbackSrc;
  if (fallbackSrc && !modelViewer.dataset.fallbackTried) {
    modelViewer.dataset.fallbackTried = 'true';
    modelViewer.src = fallbackSrc;
    return;
  }
  showMissingModel();
});
zoneButtons.forEach(btn => btn.addEventListener('click', () => renderZone(btn.dataset.zone)));
document.querySelector('#focusNext').addEventListener('click', () => renderZone(zoneButtons[(active + 1) % zoneButtons.length].dataset.zone));
document.querySelector('#resetView').addEventListener('click', resetView);
document.querySelector('#zoomIn').addEventListener('click', () => { scale = Math.min(MAX_SCALE, scale + ZOOM_STEP); updateTransform(); });
document.querySelector('#zoomOut').addEventListener('click', () => { scale = Math.max(MIN_SCALE, scale - ZOOM_STEP); updateTransform(); });
document.querySelector('#rotateLeft').addEventListener('click', () => { orbit = (orbit - ROTATION_STEP_DEGREES) % 360; updateTransform(); });
document.querySelector('#rotateRight').addEventListener('click', () => { orbit = (orbit + ROTATION_STEP_DEGREES) % 360; updateTransform(); });
document.querySelector('#rotateUp').addEventListener('click', () => { tilt = Math.max(MIN_VIEW_PHI_DEGREES, tilt - TILT_STEP_DEGREES); updateTransform(); });
document.querySelector('#rotateDown').addEventListener('click', () => { tilt = Math.min(MAX_VIEW_PHI_DEGREES, tilt + TILT_STEP_DEGREES); updateTransform(); });
document.querySelector('#tourMode').addEventListener('click', event => {
  clearInterval(tourTimer);
  event.currentTarget.textContent = 'Tour running';
  renderZone(zoneButtons[0].dataset.zone);
  tourTimer = setInterval(() => renderZone(zoneButtons[(active + 1) % zoneButtons.length].dataset.zone), 2200);
});
scene.addEventListener('wheel', event => {
  event.preventDefault();
  scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale - event.deltaY * .001));
  updateTransform();
}, { passive: false });

renderZone('plot-a');
updateTransform();
