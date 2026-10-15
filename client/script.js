let blob = null;   // holds the current image (from file or camera)
let stream = null; // holds the camera stream

// ── NAV ACTIVE STATE ON SCROLL ────────────────────────────────────────────────

const sections = [
  { id: 'home',         navId: 'nav-home'  },
  { id: 'how-it-works', navId: 'nav-how'   },
  { id: 'about',        navId: 'nav-about' },
];

function updateActiveNav() {
  const scrollY = window.scrollY + 80;
  let current = sections[0].navId;

  for (const s of sections) {
    const el = document.getElementById(s.id);
    if (el && el.offsetTop <= scrollY) current = s.navId;
  }

  document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
  const active = document.getElementById(current);
  if (active) active.classList.add('active');
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ── DRAG-AND-DROP ─────────────────────────────────────────────────────────────

const dropZone = document.getElementById('drop-zone');

if (dropZone) {
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      blob = file;
      showPreview(URL.createObjectURL(blob));
    }
  });
}

// ── TOGGLE BETWEEN UPLOAD / CAMERA ───────────────────────────────────────────

function switchMode(mode, btn) {
  document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const isCamera = mode === 'camera';
  document.getElementById('upload-mode').classList.toggle('hidden', isCamera);
  document.getElementById('camera-mode').classList.toggle('hidden', !isCamera);

  isCamera ? startCamera() : stopCamera();
  reset();
}

// ── FILE UPLOAD ───────────────────────────────────────────────────────────────

function onFile(input) {
  blob = input.files[0];
  showPreview(URL.createObjectURL(blob));
}

// ── CAMERA ────────────────────────────────────────────────────────────────────

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    document.getElementById('video').srcObject = stream;
  } catch (err) {
    console.error('Camera access denied:', err);
  }
}

function stopCamera() {
  stream?.getTracks().forEach(t => t.stop());
  stream = null;
}

function capture() {
  const video  = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  canvas.width  = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  showPreview(canvas.toDataURL());
  canvas.toBlob(b => {
    blob = b;
    document.getElementById('detect-btn').disabled = false;
  });
}

// ── DETECT AGE ────────────────────────────────────────────────────────────────

async function detectAge() {
  const btn    = document.getElementById('detect-btn');
  const result = document.getElementById('result');

  btn.disabled    = true;
  btn.textContent = 'Detecting…';

  try {
    const form = new FormData();
    form.append('image', blob, 'photo.jpg');

    const res  = await fetch('http://localhost:5000/detect-age', { method: 'POST', body: form });
    const data = await res.json();

    result.innerHTML = Array.isArray(data) && data.length
      ? `<div class="age">${data[0].age} years old</div><div class="label">${data.length} face(s) detected</div>`
      : `<div class="label">No face detected. Try another image.</div>`;
  } catch {
    result.innerHTML = `<div class="label">Server not reachable. Is it running?</div>`;
  }

  result.classList.remove('hidden');
  btn.disabled    = false;
  btn.textContent = 'Detect Age';
}

// ── HELPERS ───────────────────────────────────────────────────────────────────

function showPreview(src) {
  const preview = document.getElementById('preview');
  preview.src = src;
  preview.classList.remove('hidden');
  document.getElementById('detect-btn').disabled = false;
}

function reset() {
  blob = null;
  document.getElementById('preview').classList.add('hidden');
  document.getElementById('result').classList.add('hidden');
  document.getElementById('detect-btn').disabled = true;
}
