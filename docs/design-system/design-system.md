# Design System — Bianca Rayssa 21 Anos

Este documento estabelece as diretrizes visuais, de tipografia, componentes e interações para a construção do site comemorativo da Bianca. O objetivo é transmitir uma estética premium, nostálgica e intimista, focada inteiramente em dispositivos móveis.

---

## 1. Paleta de Cores (Premium & Romântica)

A seleção cromática baseia-se em tons quentes, suaves e luxuosos, garantindo excelente contraste de acessibilidade para leitura no celular e uma atmosfera afetiva e acolhedora.

| Amostra | Nome | HEX | HSL | Propósito / Uso principal |
| :--- | :--- | :--- | :--- | :--- |
| ![#FDFBF7](https://via.placeholder.com/15/FDFBF7/000000?text=+) | **Champagne (Fundo principal)** | `#FDFBF7` | `hsl(40, 43%, 98%)` | Cor de fundo geral do site. Confortável para os olhos, passa sensação de papel de carta antigo de alta qualidade. |
| ![#FFF9F2](https://via.placeholder.com/15/FFF9F2/000000?text=+) | **Alabaster Warm (Fundo Secundário)** | `#FFF9F2` | `hsl(35, 100%, 97%)` | Usado para diferenciar seções ou como cor de fundo das fotos Polaroids. |
| ![#F2C6C2](https://via.placeholder.com/15/F2C6C2/000000?text=+) | **Rosa Chá (Destaque Suave)** | `#F2C6C2` | `hsl(5, 61%, 85%)` | Tons românticos para botões, bordas suaves de envelopes, decorações de corações e abas inativas. |
| ![#C99A5C](https://via.placeholder.com/15/C99A5C/000000?text=+) | **Dourado Champagne (Accent)** | `#C99A5C` | `hsl(34, 52%, 58%)` | Detalhes de brilho, bordas finas premium, lacre do envelope e títulos especiais de seção. |
| ![#5C1322](https://via.placeholder.com/15/5C1322/000000?text=+) | **Bordô Profundo (Texto & Contraste)** | `#5C1322` | `hsl(347, 65%, 22%)` | Títulos principais, texto da carta e elementos que exigem alta leitura e legibilidade. |
| ![#3A2422](https://via.placeholder.com/15/3A2422/000000?text=+) | **Marrom Chocolate (Texto Secundário)** | `#3A2422` | `hsl(5, 25%, 18%)` | Corpo de texto em geral, legendas manuscritas nas fotos Polaroid. |

---

## 2. Tipografia

Para obter o equilíbrio perfeito entre elegância clássica, modernidade e o toque pessoal (manuscrito), combinamos três famílias tipográficas (carregadas via Google Fonts):

*   **Títulos & Destaques (Serifa Premium):** *Playfair Display* ou *Cormorant Garamond*
    *   *Uso:* Títulos de seção (H1, H2), cabeçalhos de seções e frases soltas de impacto.
    *   *CSS:* `font-family: 'Playfair Display', Georgia, serif; font-weight: 600; letter-spacing: -0.02em;`
*   **Corpo de Texto (Sans-Serif Limpa & Legível):** *Inter* ou *Montserrat*
    *   *Uso:* Parágrafos de leitura longa (como o interior da carta) e textos de interface.
    *   *CSS:* `font-family: 'Inter', system-ui, sans-serif; line-height: 1.6; font-weight: 400;`
*   **Toque Pessoal / Polaroid (Manuscrita Romântica):** *Caveat* ou *Sacramento*
    *   *Uso:* Legendas das fotos Polaroid, assinaturas (Ivan & Iuri) e pequenas anotações decorativas.
    *   *CSS:* `font-family: 'Caveat', cursive; font-size: 1.35rem;`

---

## 3. Grid & Espaçamento (Mobile-First)

Como o foco é 100% no smartphone, usamos um sistema de espaçamento compacto, porém respirável, evitando poluição visual.

*   **Paddings Horizontais de Página:** `1.5rem (24px)` para dar margem nas laterais do aparelho.
*   **Espaçamento entre Seções (Gap/Margin):** `4rem (64px)` verticalmente, permitindo uma transição visual clara ao rolar a página.
*   **Arredondamento de Bordas (Border Radius):**
    *   Botoes e Player: `9999px` (pílula) para suavidade.
    *   Cards Polaroid e Envelopes: `8px` ou `12px` para simular papel cortado.
*   **Sombras (Box Shadows):**
    *   Sombra suave (Polaroid): `0 4px 15px rgba(92, 19, 34, 0.08)` (usando o tom bordô na opacidade da sombra para parecer natural e não cinza frio).
    *   Sombra do Envelope: `0 10px 30px rgba(0, 0, 0, 0.12)`.

---

## 4. Componentes

### A. Botão de Gate (Boas-vindas)
*   **Design:** Botão circular grande ou pílula elegante.
*   **Interatividade:** Efeito de pulso sutil em CSS para guiar o clique.
*   **CSS Básico:**
    ```css
    .btn-gate {
      background-color: var(--color-bordo);
      color: var(--color-champagne);
      padding: 1rem 2.5rem;
      border-radius: 9999px;
      font-weight: 500;
      box-shadow: 0 10px 25px rgba(92, 19, 34, 0.25);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .btn-gate:active {
      transform: scale(0.96);
    }
    ```

### B. Envelope de Carta Virtual
*   **Design:** Corpo de envelope retangular com aba superior triangular dobrável.
*   **Funcionamento:** 
    1. O envelope inicia fechado. O lacre de coração pulsa suavemente.
    2. O usuário clica. O lacre desaparece e a aba triangular se dobra para trás (`transform: rotateX(180deg)`).
    3. A folha da carta desliza de dentro do envelope para cima, expandindo seu tamanho para ocupar a tela inteira de forma legível.
*   **Efeito:** Efeito 3D sutil usando `perspective` no CSS.

### C. Cards Polaroid (Galeria)
*   **Design:** Retângulo vertical simulando foto física instantânea. A foto ocupa a parte de cima com bordas uniformes de `8px`. A parte inferior é mais larga (`32px`) para conter a legenda escrita à mão.
*   **CSS Básico:**
    ```css
    .card-polaroid {
      background: var(--color-alabaster);
      padding: 10px 10px 30px 10px;
      box-shadow: var(--shadow-polaroid);
      border-radius: 4px;
      transition: transform 0.3s ease;
      display: inline-block;
    }
    /* Rotação aleatória simulada por classes utilitárias no JS ou CSS */
    .polaroid-rot-left { transform: rotate(-3deg); }
    .polaroid-rot-right { transform: rotate(3deg); }
    ```

### D. Player de Música Flutuante
*   **Design:** Barra fixa inferior ("sticky bar") ou cápsula flutuante arredondada.
*   **Controles:** Botão Play/Pause, botão Avançar, indicador simples do nome da música em rotação horizontal ("marquee") se o título for longo.
*   **UX de Carregamento:** Exibe um indicador visual discreto (ondas de áudio se movendo) quando a música estiver tocando.

---

## 5. Micro-animações e Transições

*   **Flutuador de Corações:** Criação dinâmica de micro-corações em SVG ou CSS que flutuam suavemente de baixo para cima na tela inicial ou na seção do Iuri. Velocidade e opacidade variadas para criar profundidade.
*   **Typing Effect (Efeito de Digitação):** Usado para a revelação do texto da carta romântica, com um cursor piscante que some ao concluir.
*   **Fade-in Reveal:** Animações do tipo `fade-in-up` aplicadas às Polaroids conforme entram no viewport do celular, trazendo vida ao scroll da Bianca.