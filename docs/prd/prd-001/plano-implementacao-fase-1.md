# Plano de Implementação Técnico (Fase 1) — Site Bianca Rayssa 21 Anos

Este plano orienta a implementação técnica da cápsula do tempo emocional para o aniversário de 21 anos da Bianca. A meta é criar uma experiência altamente imersiva, performática (carregamento < 2.5s) e focada em dispositivos móveis, com entrega garantida em 2 dias.

---

## 1. Objetivo Técnico e Stack Escolhida

Para mitigar problemas de compilação, complexidade de infraestrutura e garantir deploy imediato na Vercel, a stack técnica definida é:

*   **Linguagem & Estrutura:** Vanilla HTML5 sem pré-processadores.
*   **Estilização:** CSS3 Moderno + Tailwind CSS carregado via CDN (otimizado para setup de temas).
*   **Interações & Lógica:** JavaScript Vanilla (ES6+) estruturado de forma modular e limpa.
*   **Áudio:** HTML5 Audio API (`AudioContext` / Elemento `<audio>`).
*   **Tipografia:** Google Fonts carregadas de forma assíncrona.
*   **Hospedagem:** Vercel (plataforma estática, entrega por CDN).

### Raciocínio Anti-Overengineering
Utilizar frameworks como React, Next.js ou Vue traria custos de setup de build, dependências de pacotes (npm), riscos de incompatibilidade de versão de Node no CI/CD e tempos de compilação desnecessários para um site estático de página única. A escolha do JS/HTML/Tailwind puro garante estabilidade absoluta, facilidade de depuração direta no navegador do celular e deploy em segundos.

---

## 2. Estrutura de Pastas e Assets do Site

O site será estruturado diretamente na raiz do workspace para que o deploy na Vercel seja feito de forma limpa, apontando para o próprio repositório.

```text
/c:/Users/ivanl/Downloads/surpresa/
├── audio/                                      <-- Nova pasta organizada para músicas
│   ├── Djavan - Samurai.mp3
│   ├── Jean Tassy - Diz Pra Mim (Karaoke).mp3
│   └── Liniker - Veludo Marrom.mp3
├── fotos/                                      <-- Fotos já fornecidas e categorizadas
│   ├── comigo-ivan/
│   │   ├── 20250209_183859.jpg
│   │   └── ... (outros arquivos de casal)
│   ├── iuri/
│   │   ├── 20250713_154623.jpg
│   │   └── ... (outros arquivos do filho)
│   ├── sozinha/
│   │   └── 20250706_164449.jpg
│   └── zuadas/
│       ├── 20250401_175126.jpg
│       └── ... (outros arquivos divertidos)
├── index.html                                  <-- Ponto de entrada do site (HTML/CSS/JS)
├── .vercelignore                               <-- Configuração para ignorar arquivos de desenvolvimento
└── maestro-ai/                                 <-- Pasta da equipe de agentes (Ignorada no deploy)
    ├── docs/
    └── .gemini/
```

### Script de Movimentação dos Arquivos de Áudio
Como as músicas estão atualmente na raiz do workspace, o plano prevê criar a pasta `audio/` e mover/copiar os arquivos `.mp3` para ela, limpando a raiz para o deploy.

---

## 3. Ordem Cronológica de Implementação

A implementação será executada em 9 passos ordenados, divididos entre os 2 dias de prazo:

### Dia 1: Estruturação, Áudio e Core da Experiência

#### Passo 1: Preparação de Ambiente e Arquivos
*   Criar o diretório `audio/` na raiz do workspace.
*   Copiar os 3 arquivos de música `.mp3` da raiz do workspace para o diretório `audio/`.
*   Renomear os arquivos `.mp3` na pasta de destino para nomes limpos e sem caracteres especiais (ex: `jean-tassy-diz-pra-mim.mp3`, `liniker-veludo-marrom.mp3`, `djavan-samurai.mp3`) para evitar erros de encode de URL em servidores Linux da Vercel.
*   Criar o arquivo `.vercelignore` na raiz do workspace.

#### Passo 2: Esqueleto HTML e Configuração Tailwind
*   Criar o arquivo `index.html` na raiz do workspace.
*   Configurar a tag `<head>` com viewport apropriado para mobile (`width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no`).
*   Importar o script do Tailwind CSS CDN e configurar o objeto `tailwind.config` com a paleta de cores (Champagne, Alabaster, Rosa Chá, Dourado, Bordô, Chocolate) e famílias tipográficas do Design System.
*   Importar as fontes do Google Fonts (*Cormorant Garamond*, *Inter*, *Caveat*) com o parâmetro `&display=swap` para carregamento otimizado.

#### Passo 3: Gate de Entrada (Desbloqueio de Autoplay)
*   Desenhar a tela de boas-vindas fixa (`fixed inset-0 z-50 bg-champagne`).
*   Configurar animação de pulso sutil no botão "Abrir seu Presente".
*   Inserir o motor de corações flutuantes em segundo plano específico para a tela de gate.
*   Implementar o listener de clique no botão que:
    1. Instancia/inicia o objeto `Audio` na primeira música da playlist.
    2. Adiciona classes CSS de fade-out e transição para cima (`opacity-0 -translate-y-full`) no container de gate.
    3. Exibe o conteúdo principal (`#main-content`) alterando a visibilidade de `hidden` para `block/flex`.
    4. Mostra o player flutuante no rodapé com animação de subida (`translate-y-0`).
    5. Dispara os corações flutuantes globais.

#### Passo 4: Player de Áudio Flutuante Persistente
*   Criar a cápsula flutuante fixa (`fixed bottom-4 left-4 right-4 z-40 bg-champagne/95 backdrop-blur-md`).
*   Adicionar os controles de Play/Pause e Avanço rápido.
*   Criar o disco giratório virtual (ícone de nota musical ou vinil em SVG) que rotaciona via classe CSS `.animate-spin-slow` apenas quando o áudio estiver no estado `playing`.
*   Adicionar listeners para o evento `ended` do elemento de áudio, disparando a próxima faixa automaticamente (reprodução contínua e cíclica).

### Dia 2: Seções Emocionais, Galeria e QA Mobile

#### Passo 5: O Envelope 3D e Efeito de Digitação
*   Montar o envelope virtual usando CSS 3D (`perspective` e `transform-style: preserve-3d`).
*   Criar a aba superior triangular, o bolso e a folha de papel interior.
*   Implementar a animação de clique no lacre de coração:
    1. Girar a aba superior em 180 graus.
    2. Subir a folha de papel (`transform: translateY(-Xpx)`) e expandir sua altura.
    3. Travar a interação no envelope e habilitar o botão de fechar.
*   Implementar o script do Efeito de Digitação (Typing Effect):
    *   Pegar o texto de declaração do Ivan estruturado in parágrafos.
    *   Escrevê-lo letra por letra em velocidade calibrada (~25ms por caractere).
    *   Garantir scroll automático da folha da carta se o texto exceder o container visível no celular.

#### Passo 6: Galeria de Polaroids com Abas
*   Criar a navegação por abas horizontais com barra deslizante ou destaque ativo para as categorias: `Sozinha`, `Nós Dois`, `Zuadas` e `Nosso Iuri`.
*   Estruturar o array de metadados das imagens no JavaScript (caminho do arquivo, legenda manuscrita, classe de rotação).
*   Implementar a função de renderização dinâmica que:
    1. Limpa o grid.
    2. Adiciona os cards Polaroid com classes de rotações aleatórias sutis (`-2deg` a `2deg`) para simular fotos físicas dispostas sobre uma mesa.
    3. Aplica lazy loading (`loading="lazy"`) nativo nas imagens para economizar dados móveis.
    4. Adiciona tratamento de erro (`onerror`) que substitui a imagem por um placeholder romântico elegante caso o arquivo falhe em carregar.

#### Passo 7: Espaço do Iuri e Rodapé
*   Construir a seção dedicada ao Iuri com fundo Alabaster e detalhes dourados.
*   Inserir fotos de destaque do Iuri com legendas emotivas manuscritas.
*   Criar o rodapé com a assinatura manuscrita final ("Ivan & Iuri") e efeito de micro-confetes de coração subindo ao chegar no final do scroll da página.

#### Passo 8: Lightbox Modal (Zoom de Imagens)
*   Criar o modal fixo escuro (`bg-bordo/95`) que bloqueia a interação da página ao abrir.
*   Ao clicar em qualquer Polaroid da galeria ou da seção do Iuri, abrir a imagem em tamanho grande centralizada em um card Polaroid no modal, acompanhada da sua legenda correspondente em fonte manuscrita.
*   Habilitar fechamento por clique fora, botão de fechar e tecla ESC.

#### Passo 9: QA, Ajustes de Responsividade e Deploy
*   Testar exaustivamente o layout em simulação mobile de diferentes aparelhos (iPhone SE, iPhone 12/13 Pro, Samsung Galaxy S20, telas ultra-estreitas de 320px).
*   Garantir contraste de leitura (relação de contraste WCAG superior a 4.5:1 para títulos em bordô sobre fundo champagne).
*   Realizar o deploy piloto na Vercel e testar diretamente em um smartphone real (Android e iOS).

---

## 4. Contratos de Componentes e Eventos (API Interna JS)

Para manter o código JS Vanilla organizado e legível, utilizaremos uma estrutura de objetos simples que gerenciam os estados do site.

### A. Playlist Controller (Gerenciador de Músicas)
```javascript
const AudioPlayer = {
  playlist: [ /* { title, artist, src } */ ],
  currentIdx: 0,
  audioElem: null,
  
  init() { /* Configura elemento de áudio e listeners */ },
  loadTrack(idx) { /* Carrega dados da faixa no DOM */ },
  togglePlay() { /* Alterna entre play e pause, altera classes CSS do player */ },
  nextTrack() { /* Carrega a próxima música e inicia a reprodução */ },
  updateUI() { /* Atualiza títulos e estado do disco giratório */ }
};
```

### B. Letter & Envelope Controller
```javascript
const LetterManager = {
  wrapper: null,
  typingContainer: null,
  isOpened: false,
  isTyped: false,
  
  open() { /* Dispara transição 3D do envelope e inicia digitação */ },
  close() { /* Retorna a carta ao interior do envelope */ },
  startTyping() { /* Algoritmo de digitação incremental por caractere */ }
};
```

### C. Gallery Manager
```javascript
const GalleryManager = {
  photosData: {
    sozinha: [ /* { src, caption, rotClass } */ ],
    'comigo-ivan': [],
    zuadas: [],
    iuri: []
  },
  
  switchTab(tabName) { /* Gerencia classes das abas e renderiza fotos */ },
  render(tabName) { /* Injeta elementos HTML das Polaroids no grid */ },
  openLightbox(src, caption) { /* Abre imagem selecionada no modal */ }
};
```

---

## 5. Mitigações e Tratamento de Falhas (Failsafes)

1.  **Bloqueio de Autoplay pelo Navegador:**
    *   *Solução:* O site inicia obrigatoriamente bloqueado pela tela de boas-vindas (Gate de Entrada). A música só é executada a partir do evento de clique/toque físico do usuário no botão de ingresso, o que garante a liberação de áudio nos sistemas iOS e Android.
2.  **Imagens Quebradas ou Inexistentes:**
    *   *Solução:* Cada elemento `<img>` terá um atributo `onerror="this.src='https://placehold.co/400x400/FFF9F2/5C1322?text=Memoria+Especial+❤️'"` que substitui a imagem caso o link falhe, evitando buracos brancos ou ícones de imagem quebrada na tela.
3.  **Tamanho e Peso dos Arquivos de Áudio:**
    *   *Solução:* As músicas fornecidas pelo usuário somam quase 40MB. Recomendamos otimizar as faixas de áudio antes do deploy utilizando uma ferramenta de compressão (como Audacity ou conversores online) para convertê-las para MP3 de 128kbps, reduzindo o tamanho total para cerca de 10MB, o que acelera o carregamento em conexões 4G móveis.
4.  **Tamanho das Fotos:**
    *   *Solução:* As fotos devem ser mantidas na pasta original, mas em caso de lentidão, o desenvolvedor deve salvá-las no formato WebP ou JPEG comprimido.

---

## 6. Critérios de Pronto (Definition of Done)

Para considerar a Fase 1 da arquitetura e a implementação concluídas, o projeto deve atender:

*   [ ] Todos os 3 arquivos de áudio movidos para `/audio/` e referenciados corretamente.
*   [ ] O arquivo `index.html` criado e funcional na raiz do projeto.
*   [ ] O site carregando sem erros de console no navegador móvel.
*   [ ] O player flutuante persistindo em todas as seções e funcionando Play/Pause/Avançar.
*   [ ] O envelope virtual abrindo com animação 3D e revelando a folha com digitação por letra.
*   [ ] O mural de fotos respondendo corretamente à troca de abas.
*   [ ] O lightbox expandindo as imagens ao toque e fechando corretamente.
*   [ ] O site 100% responsivo em telas a partir de 320px de largura.
*   [ ] Deploy ativo na Vercel com URL de produção funcional.
