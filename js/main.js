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
const letterText = `Minha linda Bianca Rayssa Gonçalves dos Santos,

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

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa o motor de pétalas caindo continuamente no fundo
  SakuraEffect.start(document.getElementById('sakura-container'));

  // Prepara o áudio
  audioEl = new Audio();
  audioEl.src = player.getCurrentTrack().src;
  audioEl.volume = 0.7;
  audioEl.addEventListener('ended', handleNextTrack);

  setupEventListeners();
  buildSlideshow();
});

function setupEventListeners() {
  // 1. Flor de Cerejeira que desabrocha (Gate Inicial)
  const cherryBlossomSvg = document.getElementById('cherry-blossom-svg');
  const flowerGateContainer = document.getElementById('flower-gate-container');
  const envelopeSection = document.getElementById('envelope-section');

  cherryBlossomSvg.addEventListener('click', () => {
    if (letter.getFlowState() !== 'flower') return;

    // Desabrocha a flor (aplica rotações e miolo)
    cherryBlossomSvg.classList.add('blossomed');
    document.getElementById('flower-center').classList.remove('opacity-0');
    document.getElementById('flower-details').classList.remove('opacity-0');

    // Inicia a música de fundo imediatamente (contorna autoplay)
    audioEl.play().then(() => {
      player.play();
      updatePlayerUI();
    }).catch(err => console.warn("Player bloqueado pelo autoplay do navegador:", err));

    // Após 1.3s, fade-out da flor e revela o envelope
    setTimeout(() => {
      flowerGateContainer.classList.add('opacity-0', 'scale-90');
      
      setTimeout(() => {
        flowerGateContainer.classList.add('hidden');
        envelopeSection.classList.remove('hidden');
        
        // Transição de fade-in para o envelope
        setTimeout(() => {
          envelopeSection.classList.remove('opacity-0', 'scale-75');
          envelopeSection.classList.add('opacity-100', 'scale-100');
        }, 50);
      }, 700);
    }, 1300);
  });

  // 2. Abertura do Envelope e Expansão da Carta
  const envelopeContainer = document.getElementById('envelope-container');
  const envelopeFlap = document.getElementById('envelope-flap');
  const letterPaper = document.getElementById('letter-paper');

  envelopeContainer.addEventListener('click', () => {
    if (letter.getFlowState() === 'letter') return; // evita clique duplo

    letter.open(); // Altera flowState para 'letter' e isOpen para true

    // Dobra a aba do envelope para trás
    envelopeFlap.classList.add('open-flap');

    // Desliza e expande a carta
    setTimeout(() => {
      letterPaper.classList.add('letter-open');
      envelopeContainer.classList.add('pointer-events-none');

      // Dispara digitação se necessário
      if (!letter.isTyped) {
        setTimeout(startTypingEffect, 600);
      }
    }, 500);
  });

  // 3. Transição da Carta para a Seção Hero (Rajada de Pétalas)
  const btnContinue = document.getElementById('btn-continue');
  const gateFlowSection = document.getElementById('gate-flow-section');
  const heroFlowSection = document.getElementById('hero-flow-section');
  const audioPlayerBar = document.getElementById('audio-player-bar');

  btnContinue.addEventListener('click', () => {
    letter.setFlowState('transitioning');

    // Rajada de pétalas de cerejeira cobrindo a tela
    SakuraEffect.burst(75);

    // Após o estouro de pétalas cobrir a visão, realiza a transição
    setTimeout(() => {
      gateFlowSection.classList.add('opacity-0', 'scale-95');
      
      setTimeout(() => {
        gateFlowSection.classList.add('hidden');
        
        // Exibe Hero
        heroFlowSection.classList.remove('hidden');
        setTimeout(() => {
          heroFlowSection.classList.remove('opacity-0', 'translate-y-8');
          heroFlowSection.classList.add('opacity-100', 'translate-y-0');
        }, 50);

        // Mostra Player flutuante
        audioPlayerBar.classList.remove('translate-y-24');
        audioPlayerBar.classList.add('translate-y-0');

        letter.setFlowState('hero');
        startSlideshow();
      }, 600);
    }, 400);
  });

  // 4. Player de Áudio
  const btnPlayPause = document.getElementById('player-play-pause');
  const btnNext = document.getElementById('player-next');

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

  btnNext.addEventListener('click', handleNextTrack);

  // 5. Botões de Acesso às Galerias Dinâmicas (Modal Randômico)
  const categoryButtons = document.querySelectorAll('.category-btn');
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const categoryName = btn.dataset.category;
      openGalleryModal(categoryName);
    });
  });

  const btnCloseGallery = document.getElementById('btn-close-gallery');
  const galleryModal = document.getElementById('gallery-modal');
  btnCloseGallery.addEventListener('click', () => {
    galleryModal.classList.add('hidden');
    galleryModal.classList.remove('flex');
  });

  // 6. Lightbox
  const lightbox = document.getElementById('lightbox-modal');
  const btnCloseLightbox = document.getElementById('btn-close-lightbox');
  
  btnCloseLightbox.addEventListener('click', () => {
    lightbox.classList.add('hidden');
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-overlay')) {
      lightbox.classList.add('hidden');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.classList.add('hidden');
      galleryModal.classList.add('hidden');
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

function startTypingEffect() {
  const textContainer = document.getElementById('typed-text');
  textContainer.innerHTML = '';
  
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
      letterContent.scrollTop = letterContent.scrollHeight;

      setTimeout(type, speed);
    } else {
      letter.setTyped(true);
      textContainer.classList.remove('after:animate-pulse');
      
      // Revela o botão de continuar de forma suave
      const continueContainer = document.getElementById('continue-action-container');
      continueContainer.classList.remove('opacity-0');
      continueContainer.classList.add('opacity-100');
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

  const categoryTitles = {
    sozinha: 'Ela (Bianca Rayssa)',
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
      <div class="relative overflow-hidden aspect-square bg-neutral-100 rounded-sm mb-3">
        <img src="${img.src}" 
             alt="${img.caption}" 
             class="w-full h-full object-cover opacity-0 transition-opacity duration-500"
             loading="lazy"
             onload="this.classList.remove('opacity-0')"
             onerror="this.onerror=null; this.src='https://placehold.co/400x400/FFF9F2/5C1322?text=Bianca+❤️'; this.classList.remove('opacity-0');">
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
