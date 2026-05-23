import test from 'node:test';
import assert from 'node:assert';
import { PlayerState } from '../js/player.js';
import { GalleryState } from '../js/gallery.js';
import { LetterState } from '../js/letter.js';

test('PlayerState - inicialização e navegação de faixas', () => {
  const playlist = [
    { title: 'Samurai', src: 'audio/djavan-samurai.mp3' },
    { title: 'Veludo Marrom', src: 'audio/liniker-veludo-marrom.mp3' },
    { title: 'Diz Pra Mim', src: 'audio/jean-tassy-diz-pra-mim.mp3' }
  ];

  const player = new PlayerState(playlist);

  // Estado inicial
  assert.strictEqual(player.currentIndex, 0);
  assert.strictEqual(player.getCurrentTrack().title, 'Samurai');
  assert.strictEqual(player.isPlaying, false);

  // Tocar
  player.play();
  assert.strictEqual(player.isPlaying, true);

  // Pausar
  player.pause();
  assert.strictEqual(player.isPlaying, false);

  // Próxima faixa
  const nextTrack = player.nextTrack();
  assert.strictEqual(player.currentIndex, 1);
  assert.strictEqual(nextTrack.title, 'Veludo Marrom');

  // Próxima faixa 2
  player.nextTrack();
  assert.strictEqual(player.currentIndex, 2);

  // Próxima faixa (ciclo)
  const cycledTrack = player.nextTrack();
  assert.strictEqual(player.currentIndex, 0);
  assert.strictEqual(cycledTrack.title, 'Samurai');
});

test('GalleryState - alternância de abas e retorno de fotos corretas', () => {
  const photosData = {
    sozinha: [{ src: 'fotos/sozinha/1.jpg', caption: 'Legenda 1' }],
    'comigo-ivan': [
      { src: 'fotos/comigo-ivan/2.jpg', caption: 'Legenda 2' },
      { src: 'fotos/comigo-ivan/3.jpg', caption: 'Legenda 3' },
      { src: 'fotos/comigo-ivan/4.jpg', caption: 'Legenda 4' },
      { src: 'fotos/comigo-ivan/5.jpg', caption: 'Legenda 5' }
    ],
    zuadas: [{ src: 'fotos/zuadas/3.jpg', caption: 'Legenda 3' }],
    iuri: [{ src: 'fotos/iuri/4.jpg', caption: 'Legenda 4' }]
  };

  const gallery = new GalleryState(photosData);

  // Estado inicial deve ser 'sozinha'
  assert.strictEqual(gallery.currentTab, 'sozinha');
  assert.deepStrictEqual(gallery.getImages(), photosData.sozinha);

  // Alterar aba
  const newImages = gallery.switchTab('comigo-ivan');
  assert.strictEqual(gallery.currentTab, 'comigo-ivan');
  assert.deepStrictEqual(newImages, photosData['comigo-ivan']);

  // Randomização de fotos (deve conter os mesmos itens, mas pode estar em ordens distintas)
  const randomized = gallery.getRandomizedImages('comigo-ivan');
  assert.strictEqual(randomized.length, photosData['comigo-ivan'].length);
  
  // Garantir que todos os itens originais estão na lista randomizada
  photosData['comigo-ivan'].forEach(img => {
    assert.ok(randomized.some(r => r.src === img.src && r.caption === img.caption));
  });

  // Alterar para aba inválida deve manter a atual
  gallery.switchTab('invalida');
  assert.strictEqual(gallery.currentTab, 'comigo-ivan');
});

test('LetterState - abertura, fechamento, controle e fluxo da carta', () => {
  const letter = new LetterState();

  // Estado inicial
  assert.strictEqual(letter.isOpen, false);
  assert.strictEqual(letter.isTyped, false);
  assert.strictEqual(letter.getFlowState(), 'flower');

  // Abrir carta
  letter.open();
  assert.strictEqual(letter.isOpen, true);
  assert.strictEqual(letter.getFlowState(), 'letter');

  // Marcar como digitada
  letter.setTyped(true);
  assert.strictEqual(letter.isTyped, true);

  // Alterar o flowState para transitioning e depois para hero
  letter.setFlowState('transitioning');
  assert.strictEqual(letter.getFlowState(), 'transitioning');

  letter.setFlowState('hero');
  assert.strictEqual(letter.getFlowState(), 'hero');

  // Tentar setar um flowState inválido não deve alterar
  letter.setFlowState('invalid_state');
  assert.strictEqual(letter.getFlowState(), 'hero');

  // Fechar carta
  letter.close();
  assert.strictEqual(letter.isOpen, false);
  assert.strictEqual(letter.isTyped, true);
});
