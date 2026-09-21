// ==========================================================================
// APP INITIALIZATION & DATA DEFINITION
// ==========================================================================

// List of all 21 photos provided in workspace
const photosList = [
    { src: "WhatsApp Image 2026-09-21 at 1.00.02 PM.jpeg", title: "Galaxies in Her Eyes", theme: "Eyes & Mystery" },
    { src: "WhatsApp Image 2026-09-21 at 1.00.04 PM.jpeg", title: "Time-Stopping Gaze", theme: "Eyes & Mystery" },
    { src: "WhatsApp Image 2026-09-21 at 1.00.07 PM.jpeg", title: "Soft Depth & Innocence", theme: "Eyes & Mystery" },
    { src: "WhatsApp Image 2026-09-21 at 1.00.08 PM.jpeg", title: "Cascading Waves of Silk", theme: "Hair & Grace" },
    { src: "WhatsApp Image 2026-09-21 at 1.00.09 PM.jpeg", title: "Effortless Charm", theme: "Hair & Grace" },
    { src: "WhatsApp Image 2026-09-21 at 1.00.10 PM.jpeg", title: "Simplicity in Bloom", theme: "Hair & Grace" },
    { src: "WhatsApp Image 2026-09-21 at 1.00.12 PM.jpeg", title: "Morning Sunshine Smile", theme: "Smile & Joy" },
    { src: "WhatsApp Image 2026-09-21 at 1.00.13 PM.jpeg", title: "Heartwarming Laughter", theme: "Smile & Joy" },
    { src: "WhatsApp Image 2026-09-21 at 1.00.14 PM.jpeg", title: "Pure Joy Captured", theme: "Smile & Joy" },
    { src: "WhatsApp Image 2026-09-21 at 1.00.14 PMwef.jpeg", title: "Regal Elegance", theme: "Beauty & Grace" },
    { src: "WhatsApp Image 2026-09-21 at 1.00.15 PMwef.jpeg", title: "Timeless Portrait", theme: "Beauty & Grace" },
    { src: "ee.jpeg", title: "Cute & Charming", theme: "Beauty & Grace" },
    { src: "ef.jpeg", title: "Grace Personified", theme: "Beauty & Grace" },
    { src: "efwe.jpeg", title: "Unfiltered Happiness", theme: "Precious Memories" },
    { src: "efwef.jpeg", title: "Golden Hour Glow", theme: "Precious Memories" },
    { src: "eref.jpeg", title: "Sweet & Silly Vibe", theme: "Precious Memories" },
    { src: "fwe.jpeg", title: "Best Days Together", theme: "Precious Memories" },
    { src: "sef.jpeg", title: "Pure Bestie Energy", theme: "Eternal Bond" },
    { src: "sf.jpeg", title: "Laughter & Trust", theme: "Eternal Bond" },
    { src: "wefwf.jpeg", title: "Cherished Moment", theme: "Eternal Bond" },
    { src: "werwf.jpeg", title: "Shining Forever", theme: "Eternal Bond" }
];

let currentSpread = 1;
const totalSpreads = 6;
let isAudioPlaying = false;
let audioCtx = null;
let melodyInterval = null;

// ==========================================================================
// DOM CONTENT LOADED HANDLER
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initParticleCanvas();
    initSketchSlider();
    init3DBookControls();
    initLightbox();
    initMasonryGallery();
    initLetterSaver();
    initViewToggler();
});

// ==========================================================================
// 1. AMBIENT FAIRY LIGHT PARTICLES CANVAS
// ==========================================================================
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2.5 + 1,
            color: `rgba(230, 184, 106, ${Math.random() * 0.5 + 0.2})`,
            vx: (Math.random() - 0.5) * 0.4,
            vy: -Math.random() * 0.5 - 0.2,
            alpha: Math.random()
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha += (Math.random() - 0.5) * 0.02;
            if (p.alpha < 0.2) p.alpha = 0.2;
            if (p.alpha > 0.8) p.alpha = 0.8;

            if (p.y < 0) p.y = canvas.height;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(230, 184, 106, ${p.alpha})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#e6b86a';
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// ==========================================================================
// 2. INTERACTIVE SKETCH TO PHOTO REVEAL SLIDER
// ==========================================================================
function initSketchSlider() {
    const slider = document.getElementById('sketchSlider');
    const overlay = document.getElementById('sketchOverlay');
    const btn = document.getElementById('sliderBtn');

    if (!slider || !overlay || !btn) return;

    slider.addEventListener('input', (e) => {
        const val = e.target.value;
        overlay.style.width = `${val}%`;
        btn.style.left = `${val}%`;
    });
}

// ==========================================================================
// 3. 3D BOOK FLIP ENGINE & AUDIO SYNTHESIZER
// ==========================================================================
function init3DBookControls() {
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    const openBookBtn = document.getElementById('openBookBtn');
    const scrollGalleryBtn = document.getElementById('scrollGalleryBtn');

    if (prevBtn) prevBtn.addEventListener('click', () => changeSpread(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changeSpread(1));

    if (openBookBtn) {
        openBookBtn.addEventListener('click', () => {
            document.getElementById('bookSection').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (scrollGalleryBtn) {
        scrollGalleryBtn.addEventListener('click', () => {
            document.getElementById('gallerySection').classList.remove('hidden');
            document.getElementById('gallerySection').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Keyboard Arrow Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') changeSpread(-1);
        if (e.key === 'ArrowRight') changeSpread(1);
    });

    updateSpreadUI();
}

function changeSpread(direction) {
    const newSpread = currentSpread + direction;
    if (newSpread >= 1 && newSpread <= totalSpreads) {
        currentSpread = newSpread;
        updateSpreadUI();
        playPaperFlipSound();
    }
}

function updateSpreadUI() {
    const spreads = document.querySelectorAll('.page-spread');
    spreads.forEach(s => {
        const spreadNum = parseInt(s.getAttribute('data-spread'));
        if (spreadNum === currentSpread) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });

    const currentSpan = document.getElementById('currentPageNum');
    if (currentSpan) currentSpan.textContent = `Spread ${currentSpread}`;

    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');

    if (prevBtn) prevBtn.disabled = (currentSpread === 1);
    if (nextBtn) nextBtn.disabled = (currentSpread === totalSpreads);
}

// WEB AUDIO API PAPER FLIP SOUND SYNTHESIS
function playPaperFlipSound() {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        const bufferSize = audioCtx.sampleRate * 0.15;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
        }

        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1200;
        filter.Q.value = 1.5;

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        noise.start();
    } catch (e) {
        console.log("Audio play allowed on user interaction");
    }
}

// MUSIC TOGGLE (ACOUSTIC SYNTHESIZED MELODY)
const musicBtn = document.getElementById('musicToggleBtn');
if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        isAudioPlaying = !isAudioPlaying;
        const text = document.getElementById('musicText');

        if (isAudioPlaying) {
            musicBtn.classList.add('playing');
            if (text) text.textContent = "Pause Music";
            startSoothingMelody();
        } else {
            musicBtn.classList.remove('playing');
            if (text) text.textContent = "Play Music";
            stopSoothingMelody();
        }
    });
}

function startSoothingMelody() {
    const notes = [261.63, 329.63, 392.00, 440.00, 349.23, 329.63]; // C4, E4, G4, A4, F4, E4
    let noteIdx = 0;

    melodyInterval = setInterval(() => {
        if (!isAudioPlaying || !audioCtx) return;
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[noteIdx], audioCtx.currentTime);
        
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);

        noteIdx = (noteIdx + 1) % notes.length;
    }, 1400);
}

function stopSoothingMelody() {
    if (melodyInterval) clearInterval(melodyInterval);
}

// ==========================================================================
// 4. LIGHTBOX MODAL HANDLER
// ==========================================================================
function initLightbox() {
    const modal = document.getElementById('lightboxModal');
    const closeBtn = document.getElementById('lightboxClose');
    const img = document.getElementById('lightboxImg');
    const title = document.getElementById('lightboxTitle');
    const downloadBtn = document.getElementById('downloadPhotoBtn');

    // Attach click listener to all polaroid frames
    document.body.addEventListener('click', (e) => {
        const frame = e.target.closest('.polaroid-frame') || e.target.closest('.gallery-card');
        if (frame) {
            const src = frame.getAttribute('data-src') || frame.querySelector('img').getAttribute('src');
            const caption = frame.querySelector('.polaroid-caption')?.textContent || "Special Memory";
            
            img.src = src;
            title.textContent = caption;
            downloadBtn.href = src;
            
            modal.classList.add('active');
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }
}

// ==========================================================================
// 5. MASONRY GALLERY INJECTION
// ==========================================================================
function initMasonryGallery() {
    const grid = document.getElementById('masonryGrid');
    if (!grid) return;

    photosList.forEach(photo => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.setAttribute('data-src', photo.src);
        
        card.innerHTML = `
            <img src="${photo.src}" alt="${photo.title}" loading="lazy">
            <div class="gallery-card-info">
                <h4>${photo.title}</h4>
                <p><i class="fa-solid fa-tag"></i> ${photo.theme}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ==========================================================================
// 6. LETTER SAVER & LOCAL STORAGE
// ==========================================================================
function initLetterSaver() {
    const letterText = document.getElementById('customLetterText');
    const saveBtn = document.getElementById('saveLetterBtn');

    if (!letterText || !saveBtn) return;

    // Load saved letter if available
    const saved = localStorage.getItem('bestfriend_gift_letter');
    if (saved) {
        letterText.innerHTML = saved;
    }

    saveBtn.addEventListener('click', () => {
        const content = letterText.innerHTML;
        localStorage.setItem('bestfriend_gift_letter', content);
        
        saveBtn.innerHTML = '<i class="fa-solid fa-check-double"></i> Saved!';
        setTimeout(() => {
            saveBtn.innerHTML = '<i class="fa-solid fa-check"></i> Save Letter';
        }, 2000);
    });
}

// ==========================================================================
// 7. VIEW TOGGLER (BOOK VS GALLERY)
// ==========================================================================
function initViewToggler() {
    const toggleBtn = document.getElementById('toggleViewBtn');
    const bookSection = document.getElementById('bookSection');
    const gallerySection = document.getElementById('gallerySection');

    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const isGalleryHidden = gallerySection.classList.contains('hidden');
        if (isGalleryHidden) {
            gallerySection.classList.remove('hidden');
            gallerySection.scrollIntoView({ behavior: 'smooth' });
            toggleBtn.querySelector('span').textContent = "Book View";
        } else {
            bookSection.scrollIntoView({ behavior: 'smooth' });
            toggleBtn.querySelector('span').textContent = "Gallery View";
        }
    });
}
