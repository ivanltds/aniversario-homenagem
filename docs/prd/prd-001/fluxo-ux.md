# Jornada do Usuário e Fluxo UX/UI — Bianca Rayssa 21 Anos

Este documento detalha o fluxo de experiência da usuária final (Bianca) no site comemorativo de aniversário, garantindo uma navegação mobile-first intuitiva, comovente e de alta conversão emocional.

---

## 1. Mapeamento da Jornada do Usuário

Abaixo, descrevemos a jornada da Bianca dividida por momentos cronológicos de interação.

```
Momentos da Jornada:
[ Recebimento do Link ] -> [ Gate de Áudio ] -> [ Abertura do Envelope ] -> [ Trilha Sonora ] -> [ Galeria de Memórias ] -> [ Espaço Iuri ] -> [ Fechamento ]
```

### Momento 1: O Acesso Inicial (O Gate de Áudio)
*   **Ação da Bianca:** Clica na URL fornecida pelo Ivan em seu smartphone.
*   **Interface:** Uma tela limpa, misteriosa e elegante. Tons de champanhe e rosa chá.
*   **Elemento Central:** Um grande botão ou elemento interativo sutil com a mensagem *"Você recebeu um presente de aniversário especial. Toque para abrir..."*
*   **Objetivo de UX:** 
    1. Despertar curiosidade.
    2. **Mitigar a restrição de autoplay de áudio dos navegadores modernos (Safari/Chrome).** Ao tocar na tela, o navegador permite que o contexto de áudio seja ativado.
*   **Efeito:** Ao clicar, a tela de boas-vindas faz uma transição suave (fade-out + slide-up) revelando a trilha sonora iniciando silenciosamente em fade-in e a página principal se revelando.

### Momento 2: A Revelação e a Carta (Hero & Envelope)
*   **Ação da Bianca:** A página principal surge com um banner de feliz aniversário de 21 anos.
*   **Interface:** Abaixo do banner, há um envelope de carta virtual estilizado (estética clássica, lacre de coração).
*   **Interação:** Um texto flutuante diz *"Toque na carta para abri-la"*. Ao tocar, o lacre se rompe, o envelope se abre com uma animação elegante e a carta desliza para cima.
*   **Leitura:** O texto da declaração do Ivan surge com um efeito de escrita contínua (typing effect) ou fade-in por parágrafos para simular a emoção de uma leitura em tempo real.

### Momento 3: A Trilha Sonora (Player Minimalista)
*   **Ação da Bianca:** Enquanto lê, ela ouve a trilha sonora.
*   **Interface:** Um player de música flutuante e minimalista se fixa no rodapé ou no canto da tela (em telas maiores). 
*   **UX:** O player exibe a faixa tocando (*Jean Tassy - Diz Pra Mim* por padrão). Se ela desejar, pode tocar em pause, pular para a próxima música (*Liniker - Veludo Marrom* ou *Djavan - Samurai*) ou voltar, sem interromper a leitura.

### Momento 4: A Galeria Polaroid (Memórias Compartilhadas)
*   **Ação da Bianca:** Rola a tela e encontra a galeria de fotos.
*   **Interface:** Um sistema de abas intuitivo com 4 categorias:
    *   **Sozinha:** Fotos dela que ressaltam sua beleza e personalidade.
    *   **Comigo (Ivan):** Fotos românticas do casal.
    *   **Zuadas:** Momentos engraçados, espontâneos e descontraídos.
    *   **Iuri:** A transição para a próxima seção.
*   **Estética:** As imagens aparecem estilizadas como Polaroids físicas (borda branca grossa, leve inclinação rotativa aleatória no CSS, sombra suave).
*   **Interação:** Ao clicar em uma Polaroid, ela se destaca na tela inteira (Lightbox) com uma legenda manuscrita/emocional embaixo e a opção de deslizar para as fotos vizinhas.

### Momento 5: O Espaço Dedicado ao Iuri (Clímax Emocional)
*   **Ação da Bianca:** Chega à seção final do site, dedicada ao filho Iuri.
*   **Interface:** Mudança suave de paleta (tons levemente mais quentes e calorosos, dourados e creme). Fundo com micro-ilustrações de estrelas ou corações pulsando muito suavemente.
*   **Conteúdo:** Fotos emocionantes do Iuri e dela grávida/com ele. Um texto dedicado escrito por Ivan que expressa a gratidão pela mãe maravilhosa que ela é e a beleza da família que formaram.

### Momento 6: Despedida e Conexão (Footer)
*   **Ação da Bianca:** Finaliza a leitura.
*   **Interface:** Uma assinatura manuscrita *"Com todo o meu amor, Ivan & Iuri."*
*   **Detalhe Emocional:** Um contador de dias de relacionamento ou uma animação delicada de confetes de coração que sobem ao terminar a rolagem.

---

## 2. Diagrama de Fluxo UX/UI (ASCII)

```text
       +---------------------------------------------+
       |           TELA DE INTERAÇÃO (GATE)          |
       |  "Você recebeu um presente de Ivan..."      |
       |                                             |
       |               [ TOQUE PARA ABRIR ]          |  <-- Libera AudioContext (Autoplay)
       +----------------------|----------------------+
                              |
                     Transição Suave (Fade-Out)
                              v
       +---------------------------------------------+
       |   PÁGINA PRINCIPAL / HERO                     |  <-- Player toca "Diz Pra Mim"
       |   "Feliz Aniversário, Bianca! — 21 Anos"    |      em background.
       |                                             |
       |             [ Envelope Fechado ]            |
       +----------------------|----------------------+
                              |
                    Toque / Clique no Envelope
                              v
       +---------------------------------------------+
       |               CARTA REVELADA                |
       |  * Lacre de coração se rompe *              |
       |  * Papel da carta sobe *                    |
       |  * Texto da carta aparece com typing *      |
       +----------------------|----------------------+
                              |
                         Rolagem (Scroll)
                              v
       +---------------------------------------------+
       |           GALERIA DE FOTOS POLAROID         |
       |  [ Sozinha ] [ Comigo ] [ Zuadas ] [ Iuri ] |  <-- Abas clicáveis
       |                                             |
       |   +-----------+  +-----------+  +-----------+ |
       |   | Polaroid  |  | Polaroid  |  | Polaroid  | |  <-- Inclinação randômica leve
       |   |  (Foto)   |  |  (Foto)   |  |  (Foto)   | |      Zoom ao clicar (Lightbox)
       |   +-----------+  +-----------+  +-----------+ |
       +----------------------|----------------------+
                              |
                         Rolagem (Scroll)
                              v
       +---------------------------------------------+
       |           ESPAÇO DEDICADO: IURI             |
       |  * Fundo acolhedor e poético *              |
       |  * Homenagem à mãe e à família *            |
       |  * Galeria especial do Iuri *               |
       +----------------------|----------------------+
                              |
                         Rolagem (Scroll)
                              v
       +---------------------------------------------+
       |           FECHAMENTO E FOOTER               |
       |  "Com todo o amor, Ivan e Iuri."            |
       |                                             |
       |   [ PLAYER FLUTUANTE ]  (Play|Pause|Próxima) | <-- Acompanha toda a jornada
       +---------------------------------------------+
```

---

## 3. Estados Críticos da Experiência (Failsafes & Edge Cases)

Para garantir que a experiência não seja quebrada sob nenhuma circunstância, os seguintes estados foram mapeados e projetados:

1.  **Sem Áudio / Erro de Player:** 
    *   *Comportamento:* Caso os arquivos de áudio falhem em carregar, o player exibe uma mensagem discreta *"O som está baixinho ou indisponível no momento"*, mas não bloqueia a navegação ou interações da página.
2.  **Imagens Carregando (Lazy Loading):**
    *   *Comportamento:* As fotos terão um placeholder estético (um card Polaroid cinza quente/bege suave com um spinner minimalista no centro) antes de carregar o asset final. Isso evita "flashes" de layout.
3.  **Responsividade Extrema:**
    *   *Comportamento:* Em dispositivos muito estreitos (como o iPhone SE, 320px de largura), as abas de fotos se adaptam para rolagem horizontal (swipe tabs) e as Polaroids diminuem de escala proporcionalmente, sem quebrar o grid.
4.  **Acessibilidade Visual:**
    *   *Comportamento:* O contraste de texto em relação aos fundos pastéis será rigorosamente mantido (cores escuras como vinho/bordô sobre fundos de champanhe/bege), garantindo leitura confortável sob qualquer luminosidade de tela.
