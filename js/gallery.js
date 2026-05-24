import { photosData as rawPhotosData } from './photosData.js';

const captionsBank = {
  sozinha: [
    "A dona do meu sorriso, simplesmente perfeita.",
    "Beleza que vem de dentro e irradia.",
    "O brilho nos seus olhos ilumina meus dias.",
    "Minha musa inspiradora.",
    "Você é a poesia mais linda que a vida escreveu.",
    "A flor mais bela do meu jardim.",
    "Maravilhosa em todos os detalhes.",
    "Perfeição tem nome e sobrenome.",
    "Tão linda por fora quanto é por dentro.",
    "Meu coração erra as batidas toda vez que te olho."
  ],
  'comigo-ivan': [
    "Mais um dia de sorrisos ao seu lado.",
    "O melhor lugar do mundo é dentro do seu abraço.",
    "Cumplicidade e amor que crescem a cada dia.",
    "Colecionando memórias preciosas com você.",
    "A melhor parte do meu dia é você.",
    "Sorte a minha ter você para dividir a vida.",
    "Onde quer que estejamos, meu lar é você.",
    "Um amor que não cabe no peito.",
    "A nossa sintonia é inexplicável.",
    "Te amei ontem, te amo hoje, te amarei para sempre."
  ],
  zuadas: [
    "Nossas palhaçadas e risadas soltas.",
    "Com você, a diversão nunca tem fim.",
    "Se não for para fazer careta juntos, nem vale!",
    "O amor também é feito de momentos bobos e alegres.",
    "A felicidade mora na nossa espontaneidade.",
    "Amo cada detalhe engraçado do nosso dia a dia.",
    "O nosso humor salva qualquer dia ruim.",
    "Companheira de todas as loucuras.",
    "As melhores risadas são as que dou com você.",
    "Loucos um pelo outro e doidinhos de nascença!"
  ],
  iuri: [
    "Nosso pequeno Iuri, o pacotinho de amor mais lindo.",
    "Um olhar puro que trouxe luz para as nossas vidas.",
    "Nosso principezinho crescendo rápido demais.",
    "A maior e mais bela prova da nossa união.",
    "O sorrisinho mais gostoso que alegra qualquer dia.",
    "Nosso pequeno milagre, nossa maior benção.",
    "Fruto de um amor que transborda.",
    "A carinha de quem tem os melhores pais do mundo.",
    "Um anjo que Deus enviou para cuidar de nós.",
    "Mãe de menino, meu maior orgulho!"
  ]
};

export class GalleryState {
  constructor() {
    this.photosData = rawPhotosData;
  }

  getRandomImageObj(category, excludedUrls = []) {
    const images = this.photosData[category] || [];
    const available = images.filter(img => !excludedUrls.includes(img));
    
    const pool = available.length > 0 ? available : images;
    if (pool.length === 0) return null;

    const randomImg = pool[Math.floor(Math.random() * pool.length)];
    const captions = captionsBank[category] || ["Nosso momento especial."];
    const randomCaption = captions[Math.floor(Math.random() * captions.length)];

    return { src: randomImg, caption: randomCaption };
  }

  getInitialGrid(category, count = 6) {
    const list = [...(this.photosData[category] || [])];
    
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }

    const selected = list.slice(0, count);
    return selected.map(src => {
      const captions = captionsBank[category] || ["Nosso momento especial."];
      const caption = captions[Math.floor(Math.random() * captions.length)];
      return { src, caption };
    });
  }
}
