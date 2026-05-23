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
    'comigo-ivan': [{ src: 'fotos/comigo-ivan/2.jpg', caption: 'Legenda 2' }],
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

  // Alterar para aba inválida deve manter a atual
  gallery.switchTab('invalida');
  assert.strictEqual(gallery.currentTab, 'comigo-ivan');
});

test('LetterState - abertura, fechamento e controle da carta', () => {
  const letter = new LetterState();

  // Estado inicial
  assert.strictEqual(letter.isOpen, false);
  assert.strictEqual(letter.isTyped, false);

  // Abrir carta
  letter.open();
  assert.strictEqual(letter.isOpen, true);

  // Marcar como digitada
  letter.setTyped(true);
  assert.strictEqual(letter.isTyped, true);

  // Fechar carta
  letter.close();
  assert.strictEqual(letter.isOpen, false);
  // O estado digitado pode ser mantido ou resetado (vamos manter como true para saber se já foi lido)
  assert.strictEqual(letter.isTyped, true);
});
