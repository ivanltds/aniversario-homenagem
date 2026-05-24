import { PlayerState } from './player.js';
import { GalleryState } from './gallery.js';
import { LetterState } from './letter.js';
import { SakuraEffect } from './sakura.js';

// Playlist
const playlist = [
  { title: 'Veludo Marrom', artist: 'Liniker', src: 'audio/liniker-veludo-marrom.mp3' },
  { title: 'Samurai', artist: 'Djavan ft. Stevie Wonder', src: 'audio/djavan-samurai.mp3' },
  { title: 'Diz Pra Mim', artist: 'Jean Tassy', src: 'audio/jean-tassy-diz-pra-mim.mp3' }
];

// Mapeamento das mídias
const photosData = {
  sozinha: [
    { src: 'fotos/sozinha/20250706_164449.jpg', caption: 'A dona do meu sorriso, simplesmente perfeita.' }
  ],
  'comigo-ivan': [
    { src: 'fotos/comigo-ivan/20250209_183859.jpg', caption: 'Mais um dia de sorrisos ao seu lado.' },
    { src: 'fotos/comigo-ivan/20250926_220939.jpg', caption: 'O melhor lugar do mundo é dentro do seu abraço.' },
    { src: 'fotos/comigo-ivan/20251101_233301.jpg', caption: 'Cumplicidade e amor que crescem a cada dia.' },
    { src: 'fotos/comigo-ivan/20251222_193309.jpg', caption: 'Colecionando memórias preciosas com você.' },
    { src: 'fotos/comigo-ivan/20251224_234002.jpg', caption: 'Nosso Natal repleto de paz, amor e gratidão.' }
  ],
  zuadas: [
    { src: 'fotos/zuadas/20250401_175126.jpg', caption: 'Nossas palhaçadas e risadas soltas.' },
    { src: 'fotos/zuadas/20250406_081526.jpg', caption: 'Com você, a diversão nunca tem fim.' },
    { src: 'fotos/zuadas/20250411_185135.jpg', caption: 'Se não for para fazer careta juntos, nem vale!' },
    { src: 'fotos/zuadas/20250414_192927.jpg', caption: 'O amor também é feito de momentos bobos e alegres.' },
    { src: 'fotos/zuadas/IMG-20230106-WA0002.jpg', caption: 'A felicidade mora na nossa espontaneidade.' },
    { src: 'fotos/zuadas/Screenshot_2023-03-07-23-50-38-327_com.google.android.apps.photos.jpg', caption: 'Amo cada detalhe engraçado do nosso dia a dia.' }
  ],
  iuri: [
    { src: 'fotos/iuri/20250713_154623.jpg', caption: 'Nosso pequeno Iuri, o pacotinho de amor mais lindo.' },
    { src: 'fotos/iuri/20250804_210955.jpg', caption: 'Um olhar puro que trouxe luz para as nossas vidas.' },
    { src: 'fotos/iuri/20251121_163546.jpg', caption: 'Nosso principezinho crescendo rápido demais.' },
    { src: 'fotos/iuri/20251220_232859 - Copia.jpg', caption: 'A maior e mais bela prova da nossa união.' },
    { src: 'fotos/iuri/IMG_20250801_132348_435.jpg', caption: 'O sorrisinho mais gostoso que alegra qualquer dia.' },
    { src: 'fotos/iuri/Screenshot_20250713_144306_Photos.jpg', caption: 'Nosso pequeno milagre, nossa maior benção.' }
  ]
};

// Imagens selecionadas para o slideshow automático do Hero Banner
const slideshowImages = [
  'fotos/sozinha/20250706_164449.jpg',
  'fotos/comigo-ivan/20251222_193309.jpg',
  'fotos/comigo-ivan/20251101_233301.jpg',
  'fotos/iuri/20250804_210955.jpg',
  'fotos/comigo-ivan/20251224_234002.jpg'
];

// Texto da carta
const letterText = `Minha linda Bianca,

Hoje você completa 21 anos, e eu não poderia deixar de celebrar a mulher incrível, forte e iluminada que você se tornou. Desde que você entrou na minha vida, tudo ganhou mais cor, mais sentido e um brilho especial que só você tem.

O nosso amor é o meu maior abrigo. Cada momento ao seu lado é uma memória preciosa que guardo no fundo do coração. Mas de todas as coisas lindas que construímos, a maior e mais perfeita delas é o nosso pequeno Iuri.

Ver você sendo mãe, cuidando dele com tanto carinho, paciência e amor, me faz admirar e me apaixonar por você ainda mais a cada dia. O Iuri é o fruto da nossa união, a prova viva de que o amor se multiplica e transborda.

Neste seu dia especial, quero lhe desejar toda a felicidade do mundo. Que você continue com esse sorriso contagiante, essa determinação admirável e essa alma pura. Estarei sempre aqui para segurar sua mão, aplaudir suas vitórias e te amar em cada passo do caminho.

Parabéns, meu amor, minha parceira de vida. Feliz 21 anos!

Com todo o meu amor,
Ivan (e o nosso pequeno Iuri) ❤️`;

// Estados
const player = new PlayerState(playlist);
const gallery = new GalleryState(photosData);
const letter = new LetterState();

let audioEl = null;
const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-3', '-rotate-3'];
let slideshowInterval = null;

const PETAL_FILLS   = ['#FFD1DC', '#FFC0CB', '#FFB6C1']; // Cores rosas de Sakura
const PETAL_BACKS   = ['#FFC0CB', '#FFB6C1', '#FF69B4']; // Tons rosas mais escuros para o verso
const COUNTS = [8, 8, 8];
const LAYERS = ['layerOuter','layerMid','layerInner'];
const Z_OFF  = [8, 5, 2];
const A_OFF  = [0, 22.5, 45];
const allPetals = [];

let isActive = true;
let floatAnim;
let xTo;
let yTo;

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa o motor de pétalas caindo continuamente no fundo
  SakuraEffect.start(document.getElementById('sakura-container'));

  // Prepara o áudio
  audioEl = new Audio();
  audioEl.src = player.getCurrentTrack().src;
  audioEl.volume = 0.7;
  audioEl.addEventListener('ended', handleNextTrack);

  buildGSAPFlower();
  setupEventListeners();
  buildSlideshow();
});

function buildGSAPFlower() {
  LAYERS.forEach((lid, li) => {
    const container = document.getElementById(lid);
    if (!container) return;
    const fill = PETAL_FILLS[li];
    const back = PETAL_BACKS[li];
    for (let i = 0; i < COUNTS[li]; i++) {
      const angle = A_OFF[li] + (360 / COUNTS[li]) * i;
      const el = document.createElement('div');
      el.className = 'petal';
      el.id = `${lid}_p${i}`;
      el.style.cssText = `transform: translateX(-50%) rotate(${angle}deg) translateZ(${Z_OFF[li]}px); z-index: ${10 - li};`;
      el.innerHTML = `
        <div class="petal-face front">
          <svg viewBox="0 0 230 230" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:-115px;width:230px;height:230px">
            <path d="M 115 230 C 55 190,15 140,20 90 C 25 40,80 10,105 20 L 115 35 L 125 20 C 150 10,205 40,210 90 C 215 140,175 190,115 230 Z"
              fill="${fill}" stroke="rgba(0,0,0,0.05)" stroke-width="1"/>
          </svg>
        </div>
        <div class="petal-face back">
          <svg viewBox="0 0 230 230" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:-115px;width:230px;height:230px">
            <path d="M 115 230 C 55 190,15 140,20 90 C 25 40,80 10,105 20 L 115 35 L 125 20 C 150 10,205 40,210 90 C 215 140,175 190,115 230 Z"
              fill="${back}"/>
          </svg>
        </div>`;
      container.appendChild(el);
      allPetals.push({ el, angle });
    }
  });

  const flowerWrapper = document.getElementById('flowerWrapper');
  if (flowerWrapper && typeof gsap !== 'undefined') {
    floatAnim = gsap.to(flowerWrapper, {
      y: 12, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1
    });

    xTo = gsap.quickTo(flowerWrapper, "rotationY", {duration: 1, ease: "power3.out"});
    yTo = gsap.quickTo(flowerWrapper, "rotationX", {duration: 1, ease: "power3.out"});

    window.addEventListener("mousemove", (e) => {
      if (!isActive) return;
      xTo(-(window.innerWidth  / 2 - e.pageX) / 35);
      yTo( (window.innerHeight / 2 - e.pageY) / 35);
    });
  }
}

function setupEventListeners() {
  const flowerWrapper = document.getElementById('flowerWrapper');
  const btnContinue = document.getElementById('btn-continue');
  const sceneSection = document.getElementById('scene-section');
  const heroFlowSection = document.getElementById('hero-flow-section');
  const audioPlayerBar = document.getElementById('audio-player-bar');

  if (flowerWrapper) {
    flowerWrapper.addEventListener('click', () => {
      if (!isActive || typeof gsap === 'undefined') return;
      isActive = false;

      // Mostra o botão de pular a animação
      const btnSkip = document.getElementById('btn-skip-intro');
      if (btnSkip) btnSkip.classList.remove('hidden');

      // Start audio
      audioEl.play().then(() => {
        player.play();
        updatePlayerUI();
      }).catch(err => console.warn("Player bloqueado:", err));

      letter.setFlowState('letter');

      if (floatAnim) floatAnim.kill();
      gsap.to(flowerWrapper, { rotationX: 0, rotationY: 0, y: 0, duration: 0.6, ease: "power2.out" });
      gsap.to("#hint", { autoAlpha: 0, duration: 0.3 });

      const tl = gsap.timeline();

      // Botão Pular avança a timeline
      if (btnSkip) {
        btnSkip.addEventListener('click', () => {
          tl.progress(1);
          btnSkip.classList.add('hidden');
          if (!letter.isTyped) startTypingEffect(true);
        }, { once: true });
      }

      tl.to(flowerWrapper, { scale: 1.06, duration: 0.3, ease: "power1.out" }, 0)
        .to(flowerWrapper, { scale: 1,    duration: 0.3, ease: "power1.in" },  0.3);

      LAYERS.forEach((lid, li) => {
        const count  = COUNTS[li];
        const startT = 0.3 + li * 0.15;

        for (let i = 0; i < count; i++) {
          const el = document.getElementById(`${lid}_p${i}`);
          if (!el) continue;
          tl.to(el, {
            rotateX:  -160,
            skewY:    (i % 2 === 0 ? 6 : -6),
            duration: 1.3,
            ease: "power2.inOut",
          }, startT + i * 0.04)
          .set(el, { zIndex: 1 }, startT + i * 0.04 + 0.65)
          .to(el, {
            skewY: 0,
            rotateX: -165,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
          }, startT + i * 0.04 + 1.3);
        }
      });

      const pollenC = document.getElementById('pollenContainer');
      if (pollenC) {
        for (let i = 0; i < 50; i++) {
          const p = document.createElement('div');
          p.className = 'pollen-dot';
          const size = 2 + Math.random() * 5;
          p.style.cssText = `width:${size}px;height:${size}px;margin-left:${-size/2}px;margin-top:${-size/2}px;`;
          pollenC.appendChild(p);
          const tx = (Math.random() - 0.5) * 500;
          const ty = (Math.random() - 0.5) * 500 - 80;
          const dur = 2 + Math.random();
          const del = 0.5 + Math.random() * 0.5;
          tl.to(p, { x: tx, y: ty, scale: Math.random() * 2 + 0.5, opacity: Math.random() * 0.8 + 0.2, duration: dur, ease: "power2.out" }, del)
            .to(p, { opacity: 0, duration: 0.8 }, del + dur - 0.8);
        }
      }

      tl.to("#layerOuter, #layerMid, #layerInner", {
        z: -100, duration: 1.2, ease: "power2.inOut"
      }, 1.8)
      .to("#card", {
        opacity: 1,
        width: '90vw',
        height: '85vh',
        borderRadius: "16px",
        z: 150, // Move a carta bem à frente das pétalas
        duration: 1.2, ease: "expo.inOut"
      }, 1.8)
      .to("#cardBorder", { borderRadius: "12px", duration: 1.2, ease: "expo.inOut" }, 1.8)
      .set("#card", { zIndex: 20 }, 1.9)
      .to("#card", {
        z: 200, scale: 1.05,
        duration: 1.2, ease: "power3.out"
      }, 3.0)
      .to("#layerOuter, #layerMid, #layerInner", {
        z: -300, opacity: 0.2, duration: 1.2, ease: "power3.out"
      }, 3.0)
      .add(() => {
        allPetals.forEach(({ el }, idx) => {
          const tx    = (Math.random() - 0.45) * 1400;
          const ty    = -300 - Math.random() * 600;
          const tz    = -200 - Math.random() * 300;
          const rot   = (Math.random() - 0.5) * 720;
          const rotX  = -90 + (Math.random() - 0.5) * 180;
          const delay = Math.random() * 0.5;

          gsap.to(el, {
            x: tx, y: ty, z: tz,
            rotation: rot, rotateX: rotX,
            scale: 0.2 + Math.random() * 0.6,
            opacity: 0,
            duration: 2.2 + Math.random() * 1.2,
            ease: "power1.inOut",
            delay
          });
        });
      }, 4.0)
      .to("#card-header", { opacity: 1, duration: 0.8 }, 4.5)
      .to("#letter-content", { opacity: 1, duration: 0.8 }, 4.5)
      .add(() => {
        if (!letter.isTyped) {
          startTypingEffect(false);
        }
      }, 5.0);
    });
  }

  if (btnContinue) {
    btnContinue.addEventListener('click', () => {
      letter.setFlowState('transitioning');
      SakuraEffect.burst(300); // Mais pétalas para cobrir a tela inteira

      if (typeof gsap !== 'undefined') {
        const tlEnd = gsap.timeline();
        tlEnd.to("#card", { scale: 5, autoAlpha: 0, duration: 1.8, ease: "power3.inOut" }, 0)
             .to("#bgSite", { filter: "blur(0px) brightness(1)", opacity: 1, duration: 2, ease: "power2.inOut" }, 0)
             .add(() => {
                if(sceneSection) sceneSection.classList.add('hidden');
                if(heroFlowSection) {
                  heroFlowSection.classList.remove('hidden');
                  setTimeout(() => {
                    heroFlowSection.classList.remove('opacity-0', 'translate-y-8');
                    heroFlowSection.classList.add('opacity-100', 'translate-y-0');
                  }, 50);
                }

                if(audioPlayerBar) {
                  audioPlayerBar.classList.remove('translate-y-24');
                  audioPlayerBar.classList.add('translate-y-0');
                }

                letter.setFlowState('hero');
                startSlideshow();
             }, 1.5);
      }
    });
  }

  // 4. Player de Áudio
  const btnPlayPause = document.getElementById('player-play-pause');
  const btnNext = document.getElementById('player-next');

  if (btnPlayPause) {
    btnPlayPause.addEventListener('click', () => {
      if (player.isPlaying) {
        audioEl.pause();
        player.pause();
      } else {
        audioEl.play().catch(err => console.error("Erro ao tocar:", err));
        player.play();
      }
      updatePlayerUI();
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', handleNextTrack);
  }

  // 5. Interação das Galerias
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const category = e.currentTarget.dataset.category;
      if (category) {
        SakuraEffect.burst(300); // Dispara a transição
        openGalleryModal(category);
      }
    });
  });

  const btnCloseGallery = document.getElementById('btn-close-gallery');
  const galleryModal = document.getElementById('gallery-modal');
  const galleryBg = document.getElementById('gallery-modal-bg');
  const sakuraContainer = document.getElementById('sakura-container');

  if (btnCloseGallery && galleryModal) {
    btnCloseGallery.addEventListener('click', () => {
      galleryModal.classList.add('hidden');
      galleryModal.classList.remove('flex');
      if (galleryBg) galleryBg.classList.add('hidden');
      // Retorna o z-index original das pétalas
      if (sakuraContainer) sakuraContainer.style.zIndex = '10';
    });
  }

  // 6. Lightbox
  const lightbox = document.getElementById('lightbox-modal');
  const btnCloseLightbox = document.getElementById('btn-close-lightbox');
  
  if (btnCloseLightbox && lightbox) {
    btnCloseLightbox.addEventListener('click', () => {
      lightbox.classList.add('hidden');
    });
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-overlay')) {
        lightbox.classList.add('hidden');
      }
    });
  }

  // 7. Modal Reler Carta
  const btnReread = document.getElementById('btn-reread-letter');
  const letterModal = document.getElementById('letter-modal');
  const btnCloseLetterModal = document.getElementById('btn-close-letter-modal');
  
  if (btnReread && letterModal && btnCloseLetterModal) {
    btnReread.addEventListener('click', () => {
      SakuraEffect.burst(300); // Dispara a transição
      document.getElementById('letter-modal-text').innerHTML = letterText.replace(/\n/g, '<br>');
      letterModal.classList.remove('hidden');
      letterModal.classList.add('flex');
      if (sakuraContainer) sakuraContainer.style.zIndex = '10';
    });
    
    btnCloseLetterModal.addEventListener('click', () => {
      letterModal.classList.add('hidden');
      letterModal.classList.remove('flex');
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox) lightbox.classList.add('hidden');
      if (galleryModal) {
        galleryModal.classList.add('hidden');
        if (galleryBg) galleryBg.classList.add('hidden');
        if (sakuraContainer) sakuraContainer.style.zIndex = '10';
      }
      if (letterModal) {
        letterModal.classList.add('hidden');
        letterModal.classList.remove('flex');
      }
    }
  });
}

function handleNextTrack() {
  const nextTrack = player.nextTrack();
  audioEl.src = nextTrack.src;
  
  if (player.isPlaying) {
    audioEl.play().then(() => {
      updatePlayerUI();
    }).catch(err => console.warn("Autoplay bloqueou avanço automático:", err));
  } else {
    updatePlayerUI();
  }
}

function updatePlayerUI() {
  const track = player.getCurrentTrack();
  const trackTitle = document.getElementById('player-track-title');
  const trackArtist = document.getElementById('player-track-artist');
  const recordDisc = document.getElementById('player-record-disc');
  const btnPlayPauseIcon = document.getElementById('play-pause-icon');

  if (track) {
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
  }

  if (player.isPlaying) {
    recordDisc.classList.add('vinyl-spin');
    btnPlayPauseIcon.innerHTML = `
      <svg class="w-5 h-5 text-champagne" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </svg>
    `;
  } else {
    recordDisc.classList.remove('vinyl-spin');
    btnPlayPauseIcon.innerHTML = `
      <svg class="w-5 h-5 text-champagne translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"/>
      </svg>
    `;
  }
}

function startTypingEffect(instant = false) {
  const textContainer = document.getElementById('typed-text');
  const btnSkip = document.getElementById('btn-skip-intro');
  textContainer.innerHTML = '';
  
  if (instant) {
    textContainer.innerHTML = letterText.replace(/\n/g, '<br>');
    letter.setTyped(true);
    textContainer.classList.remove('after:animate-pulse');
    const continueContainer = document.getElementById('continue-action-container');
    if(continueContainer) {
      continueContainer.classList.remove('opacity-0');
      continueContainer.classList.add('opacity-100');
    }
    if (btnSkip) btnSkip.classList.add('hidden');
    return;
  }

  let i = 0;
  const speed = 25; // ms por caractere
  const characters = Array.from(letterText);

  function type() {
    if (i < characters.length) {
      const char = characters[i];
      if (char === '\n') {
        textContainer.innerHTML += '<br>';
      } else {
        textContainer.innerHTML += char;
      }
      i++;

      const letterContent = document.getElementById('letter-content');
      if(letterContent) letterContent.scrollTop = letterContent.scrollHeight;

      setTimeout(type, speed);
    } else {
      letter.setTyped(true);
      textContainer.classList.remove('after:animate-pulse');
      
      // Revela o botão de continuar de forma suave e oculta o de pular
      const continueContainer = document.getElementById('continue-action-container');
      if(continueContainer) {
        continueContainer.classList.remove('opacity-0');
        continueContainer.classList.add('opacity-100');
      }
      if (btnSkip) btnSkip.classList.add('hidden');
    }
  }

  type();
}

// Constrói o HTML inicial do Slideshow do Hero Banner
function buildSlideshow() {
  const container = document.getElementById('slideshow-container');
  container.innerHTML = '';

  slideshowImages.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = `absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${idx === 0 ? 'opacity-100' : 'opacity-0'}`;
    img.dataset.slideIdx = idx;
    
    img.onerror = function() {
      this.onerror = null;
      this.src = 'https://placehold.co/800x450/FFF9F2/5C1322?text=Bianca+❤️';
    };

    container.appendChild(img);
  });
}

// Inicia o slideshow automático (roda a cada 4 segundos)
function startSlideshow() {
  let currentIdx = 0;
  const slides = document.querySelectorAll('#slideshow-container img');

  if (slides.length <= 1) return;

  slideshowInterval = setInterval(() => {
    slides[currentIdx].classList.remove('opacity-100');
    slides[currentIdx].classList.add('opacity-0');

    currentIdx = (currentIdx + 1) % slides.length;

    slides[currentIdx].classList.remove('opacity-0');
    slides[currentIdx].classList.add('opacity-100');
  }, 4000);
}

// Abre o modal da galeria e exibe fotos em ordem aleatória
function openGalleryModal(category) {
  const modal = document.getElementById('gallery-modal');
  const title = document.getElementById('gallery-modal-title');
  const grid = document.getElementById('gallery-modal-grid');
  const galleryBg = document.getElementById('gallery-modal-bg');
  const sakuraContainer = document.getElementById('sakura-container');

  // Coloca o container de pétalas entre o background escuro (z-30) e as fotos (z-50)
  if (sakuraContainer) sakuraContainer.style.zIndex = '40';

  const categoryTitles = {
    sozinha: 'Ela (Bianca)',
    'comigo-ivan': 'Nós Dois',
    zuadas: 'Momentos Divertidos',
    iuri: 'Nosso Iuri'
  };

  title.textContent = categoryTitles[category] || 'Nossas Lembranças';
  grid.innerHTML = '';

  // Recupera imagens embaralhadas da categoria
  const randomizedImages = gallery.getRandomizedImages(category);

  randomizedImages.forEach((img, idx) => {
    const rot = rotations[idx % rotations.length];
    const polaroid = document.createElement('div');
    polaroid.className = `card-polaroid bg-alabaster p-3 pb-6 shadow-md rounded-sm border border-rosacha/20 cursor-pointer transform ${rot} hover:rotate-0 hover:scale-105 transition-all duration-300 w-full max-w-[280px]`;
    
    polaroid.innerHTML = `
      <div class="relative overflow-hidden aspect-[4/5] bg-neutral-100 rounded-sm mb-3">
        <img src="${img.src}" 
             alt="${img.caption}" 
             class="w-full h-full object-cover object-top opacity-0 transition-opacity duration-500"
             loading="lazy"
             onload="this.classList.remove('opacity-0')"
             onerror="this.onerror=null; this.src='https://placehold.co/400x500/FFF9F2/5C1322?text=Bianca+❤️'; this.classList.remove('opacity-0');">
      </div>
      <p class="font-manuscrita text-chocolate text-center text-lg leading-tight mt-2 px-1 select-none">${img.caption}</p>
    `;

    polaroid.addEventListener('click', () => {
      openLightbox(img.src, img.caption);
    });

    grid.appendChild(polaroid);
  });

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function openLightbox(src, caption) {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  lightboxImg.src = src;
  lightboxCaption.textContent = caption;

  lightboxImg.onerror = function() {
    this.onerror = null;
    this.src = 'https://placehold.co/800x800/FFF9F2/5C1322?text=Bianca+❤️';
  };

  lightbox.classList.remove('hidden');
}
