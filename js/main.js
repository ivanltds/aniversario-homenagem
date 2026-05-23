import { PlayerState } from './player.js';
import { GalleryState } from './gallery.js';
import { LetterState } from './letter.js';

// Mapeamento de mídias e metadados
const playlist = [
  { title: 'Veludo Marrom', artist: 'Liniker', src: 'audio/liniker-veludo-marrom.mp3' },
  { title: 'Samurai', artist: 'Djavan ft. Stevie Wonder', src: 'audio/djavan-samurai.mp3' },
  { title: 'Diz Pra Mim', artist: 'Jean Tassy', src: 'audio/jean-tassy-diz-pra-mim.mp3' }
];

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

// Texto da carta comovente
const letterText = `Minha linda Bianca Rayssa Gonçalves dos Santos,

Hoje você completa 21 anos, e eu não poderia deixar de celebrar a mulher incrível, forte e iluminada que você se tornou. Desde que você entrou na minha vida, tudo ganhou mais cor, mais sentido e um brilho especial que só você tem.

O nosso amor é o meu maior abrigo. Cada momento ao seu lado é uma memória preciosa que guardo no fundo do coração. Mas de todas as coisas lindas que construímos, a maior e mais perfeita delas é o nosso pequeno Iuri.

Ver você sendo mãe, cuidando dele com tanto carinho, paciência e amor, me faz admirar e me apaixonar por você ainda mais a cada dia. O Iuri é o fruto da nossa união, a prova viva de que o amor se multiplica e transborda.

Neste seu dia especial, quero lhe desejar toda a felicidade do mundo. Que você continue com esse sorriso contagiante, essa determinação admirável e essa alma pura. Estarei sempre aqui para segurar sua mão, aplaudir suas vitórias e te amar em cada passo do caminho.

Parabéns, meu amor, minha parceira de vida. Feliz 21 anos!

Com todo o meu amor,
Ivan (e o nosso pequeno Iuri) ❤️`;

// Inicialização dos estados
const player = new PlayerState(playlist);
const gallery = new GalleryState(photosData);
const letter = new LetterState();

// Elemento de áudio HTML nativo
let audioEl = null;

// Rotações para as Polaroids para simular fotos reais sobre a mesa
const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-3', '-rotate-3'];

document.addEventListener('DOMContentLoaded', () => {
  audioEl = new Audio();
  audioEl.src = player.getCurrentTrack().src;
  
  // Configurar volume para ficar confortável
  audioEl.volume = 0.7;

  // Ligar eventos do áudio
  audioEl.addEventListener('ended', () => {
    handleNextTrack();
  });

  setupEventListeners();
  renderGallery();
});

function setupEventListeners() {
  // 1. Gate de Entrada
  const btnEnter = document.getElementById('btn-enter');
  const gateScreen = document.getElementById('gate-screen');
  const mainContent = document.getElementById('main-content');
  const audioPlayerBar = document.getElementById('audio-player-bar');

  btnEnter.addEventListener('click', () => {
    // Destrava áudio móvel tocando imediatamente
    audioEl.play().then(() => {
      player.play();
      updatePlayerUI();
    }).catch(err => {
      console.warn("Erro ao iniciar áudio devido a restrições do navegador:", err);
    });

    // Animação de subida suave e ocultação
    gateScreen.classList.add('opacity-0', '-translate-y-full');
    setTimeout(() => {
      gateScreen.classList.add('hidden');
    }, 800);

    // Revelar conteúdo principal
    mainContent.classList.remove('hidden');
    mainContent.classList.add('opacity-100');
    
    // Mostrar player de áudio flutuante
    audioPlayerBar.classList.remove('translate-y-24');
    audioPlayerBar.classList.add('translate-y-0');

    // Iniciar corações flutuantes globais
    startFloatingHeartsLoop();
  });

  // 2. Controles do Player de Áudio
  const btnPlayPause = document.getElementById('player-play-pause');
  const btnNext = document.getElementById('player-next');

  btnPlayPause.addEventListener('click', () => {
    if (player.isPlaying) {
      audioEl.pause();
      player.pause();
    } else {
      audioEl.play().catch(err => console.error("Erro ao dar play:", err));
      player.play();
    }
    updatePlayerUI();
  });

  btnNext.addEventListener('click', () => {
    handleNextTrack();
  });

  // 3. Envelope de Amor e Carta
  const envelope = document.getElementById('envelope-container');
  const letterPaper = document.getElementById('letter-paper');
  const btnCloseLetter = document.getElementById('btn-close-letter');
  
  envelope.addEventListener('click', () => {
    if (!letter.isOpen) {
      letter.open();
      
      // Abrir aba do envelope
      document.getElementById('envelope-flap').classList.add('open-flap');
      
      // Subir e ampliar a carta
      setTimeout(() => {
        letterPaper.classList.add('letter-open');
        envelope.classList.add('pointer-events-none'); // Desabilita cliques extras no envelope
        
        // Iniciar efeito de digitação se ainda não foi feito
        if (!letter.isTyped) {
          startTypingEffect();
        }
      }, 500);
    }
  });

  btnCloseLetter.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita reabrir o envelope imediatamente
    letter.close();
    
    // Recolher folha
    letterPaper.classList.remove('letter-open');
    
    // Fechar aba após recolher a folha
    setTimeout(() => {
      document.getElementById('envelope-flap').classList.remove('open-flap');
      envelope.classList.remove('pointer-events-none');
    }, 600);
  });

  // 4. Abas da Galeria
  const tabButtons = document.querySelectorAll('.gallery-tab');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.dataset.tab;
      
      // Atualizar botões ativos/inativos
      tabButtons.forEach(b => {
        b.classList.remove('border-bordo', 'text-bordo', 'font-semibold');
        b.classList.add('border-transparent', 'text-chocolate/60');
      });
      btn.classList.remove('text-chocolate/60');
      btn.classList.add('border-bordo', 'text-bordo', 'font-semibold');

      gallery.switchTab(tabName);
      renderGallery();
    });
  });

  // 5. Lightbox Modal (Zoom)
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const btnCloseLightbox = document.getElementById('btn-close-lightbox');

  btnCloseLightbox.addEventListener('click', () => {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-overlay')) {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
    }
  });
}

function handleNextTrack() {
  const nextTrack = player.nextTrack();
  audioEl.src = nextTrack.src;
  
  if (player.isPlaying) {
    audioEl.play().then(() => {
      updatePlayerUI();
    }).catch(err => {
      console.warn("Erro ao avançar e tocar áudio automaticamente:", err);
    });
  } else {
    // Se o player estiver pausado, apenas carrega a música
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
    recordDisc.classList.add('animate-spin-slow');
    // Mudar ícone para Pause
    btnPlayPauseIcon.innerHTML = `
      <svg class="w-6 h-6 text-champagne" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </svg>
    `;
  } else {
    recordDisc.classList.remove('animate-spin-slow');
    // Mudar ícone para Play
    btnPlayPauseIcon.innerHTML = `
      <svg class="w-6 h-6 text-champagne translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"/>
      </svg>
    `;
  }
}

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';

  const images = gallery.getImages();

  images.forEach((img, idx) => {
    const rot = rotations[idx % rotations.length];
    
    const polaroid = document.createElement('div');
    polaroid.className = `card-polaroid bg-alabaster p-3 pb-6 shadow-md rounded-sm border border-rosacha/20 cursor-pointer transform ${rot} hover:rotate-0 hover:scale-105 transition-all duration-300 w-full max-w-[280px] mx-auto`;
    
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
}

function openLightbox(src, caption) {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  lightboxImg.src = src;
  lightboxCaption.textContent = caption;
  
  // Definir imagem reserva caso falhe
  lightboxImg.onerror = function() {
    this.onerror = null;
    this.src = 'https://placehold.co/800x800/FFF9F2/5C1322?text=Bianca+❤️';
  };

  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
}

function startTypingEffect() {
  const textContainer = document.getElementById('typed-text');
  textContainer.innerHTML = '';
  
  let i = 0;
  const speed = 25; // milissegundos por caractere
  
  // Converte quebras de linha para marcações que respeitem a estrutura
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
      
      // Scroll automático suave se ultrapassar o tamanho visível da carta
      const letterContent = document.getElementById('letter-content');
      letterContent.scrollTop = letterContent.scrollHeight;
      
      setTimeout(type, speed);
    } else {
      letter.setTyped(true);
      // Remove o cursor de digitação ao terminar
      textContainer.classList.remove('after:animate-pulse');
    }
  }

  type();
}

function createFloatingHeart(containerSelector) {
  const container = document.querySelector(containerSelector) || document.body;
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  
  // Variação de tamanho, posição horizontal e velocidade
  const size = Math.random() * 15 + 10; // 10px a 25px
  const left = Math.random() * 100; // 0% a 100%
  const duration = Math.random() * 4 + 4; // 4s a 8s
  const delay = Math.random() * 2; // 0s a 2s
  const rotation = Math.random() * 40 - 20; // -20deg a 20deg
  
  heart.style.left = `${left}%`;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.animationDelay = `${delay}s`;
  
  // Corações podem ser SVG elegantes
  heart.innerHTML = `
    <svg viewBox="0 0 32 29.6" fill="#F2C6C2" style="transform: rotate(${rotation}deg); opacity: ${Math.random() * 0.4 + 0.5};">
      <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
      c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
    </svg>
  `;

  container.appendChild(heart);

  // Remover elemento após a animação terminar
  setTimeout(() => {
    heart.remove();
  }, (duration + delay) * 1000);
}

function startFloatingHeartsLoop() {
  // Criar corações flutuantes gerais
  setInterval(() => {
    createFloatingHeart('#hearts-container');
  }, 1000);
  
  // Criar os primeiros corações de imediato
  for (let i = 0; i < 15; i++) {
    createFloatingHeart('#hearts-container');
  }
}

// Configurar corações adicionais ao scrollar no rodapé
window.addEventListener('scroll', () => {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
    // Bianca chegou no rodapé da página! Celebração de corações extra!
    for (let i = 0; i < 5; i++) {
      createFloatingHeart('#hearts-container');
    }
  }
});
