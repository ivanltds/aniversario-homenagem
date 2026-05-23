# PRD-001: Site Comemorativo de Aniversário — Bianca Rayssa

## 1. Contexto e Problema
O usuário (Ivan) deseja presentear sua namorada, **Bianca Rayssa Gonçalves dos Santos**, no seu aniversário de **21 anos (25/05/2026)** com uma homenagem digital única, imersiva e romântica. 
O principal desafio é o prazo de execução extremamente apertado (2 dias a partir do início do projeto em 23/05/2026). A solução precisa ser entregue sem falhas técnicas, com alta carga de impacto emocional, responsiva (focada em dispositivos móveis) e de fácil hospedagem (Vercel).

---

## 2. Público-Alvo e Personas
*   **Persona Principal (Usuária Final):** Bianca Rayssa Gonçalves dos Santos.
    *   **Idade:** 21 anos (comemoração em 25/05/2026).
    *   **Perfil:** Jovem, conectada, usuária ativa de redes sociais (Instagram). Valoriza estética visual limpa, transições suaves, tipografia elegante e elementos visuais românticos ("instagramáveis").
    *   **Carga Emocional:** É mãe do **Iuri**. A vinda de seu filho representa um marco de transformação e amor em sua vida e no relacionamento com o Ivan. Portanto, uma seção dedicada a este marco é indispensável para tocar seu coração de forma profunda.
*   **Persona Secundária (Cliente/Patrocinador):** Ivan.
    *   **Objetivo:** Demonstrar carinho, resgatar memórias valiosas e criar um momento inesquecível de surpresa que expresse a união e a história da família que construíram.

---

## 3. Benchmarks e Referências
Pesquisas de mercado e projetos de código aberto indicam que as melhores experiências românticas digitais utilizam:
1.  **Mural de Memórias e Timeline Interativa:**
    *   *Referência:* [hkalexling/Love-Timeline](https://github.com/hkalexling/Love-Timeline). Linhas do tempo verticais elegantes que contam a história do casal passo a passo com suporte a mídias e datas especiais.
2.  **Tocador de Músicas Customizado e Integrado:**
    *   *Referência:* [Hardikasetiyawann/romantic-memory-website](https://github.com/Hardikasetiyawann/romantic-memory-website). Um site de memórias integrando contagem de tempo do casal e um player de música de fundo que acompanha a leitura da página.
3.  **Cartas Interativas e Efeitos de Digitação (Typing Effect):**
    *   *Referência:* Envelopes interativos baseados em CSS que abrem ao toque do usuário para revelar uma carta romântica, imitando a entrega física de uma correspondência (muito comum em portfólios no CodePen e projetos de Dia dos Namorados).
4.  **Estética Polaroid e Grade Masonry:**
    *   Exibições de imagens que simulam fotos físicas Polaroid penduradas ou dispostas de forma orgânica, trazendo nostalgia e calor ao design.

---

## 4. Proposta de Valor
Uma **cápsula do tempo emocional digital**. Ao contrário de um presente físico efêmero, o site comemorativo eterniza momentos chaves do relacionamento do casal e do crescimento do filho em uma URL privada acessível de qualquer lugar. É uma celebração viva, íntima e interativa do amor deles, combinando trilha sonora personalizada, fotos marcantes e palavras sinceras.

---

## 5. Retorno Esperado
*   **Valor Emocional (Valor de Retorno):** Fortalecimento do vínculo afetivo do casal, satisfação emocional profunda e memórias registradas que podem ser revisitadas de forma imediata e interativa.
*   **Fator Uau/Surpresa:** Proporcionar uma experiência marcante na transição para os 21 anos da Bianca.
*   **Registro Histórico:** Um acervo digital de fácil acesso para revisitar nos anos seguintes, criando uma tradição familiar digital.

---

## 6. Escopo Inicial (MVP)
Para atender ao prazo de 2 dias, o site será uma aplicação web estática de página única (Single Page Application) altamente otimizada, dividida nas seguintes seções:

*   **TELA DE ENTRADA (Gate de Interação):**
    *   Uma tela de "boas-vindas" com um botão interativo (ex: "Abrir o seu presente, Bianca") para garantir a ativação do áudio pelo navegador (mitigando o bloqueio de autoplay).
*   **SEÇÃO 1: Hero & Carta Romântica:**
    *   Visual elegante com uma mensagem de feliz aniversário de 21 anos.
    *   Uma carta interativa que se abre (efeito envelope) com animação de digitação suave para contar a declaração de amor do Ivan.
*   **SEÇÃO 2: Galeria de Fotos Categorizada:**
    *   Visualizador de fotos separado por abas ou categorias correspondentes às pastas enviadas pelo usuário:
        *   `sozinha` (Retratos da Bianca)
        *   `comigo-ivan` (Momentos do casal)
        *   `zuadas` (Fotos divertidas e momentos leves)
        *   `iuri` (A transição para a seção do filho)
    *   Efeito de zoom suave ao clicar e legendas carinhosas.
*   **SEÇÃO 3: O Espaço do Iuri (Dedicado):**
    *   Seção com design poético e acolhedor dedicada exclusivamente à vinda e importância do filho Iuri na vida deles.
    *   Destaque para fotos e um texto emocionante sobre a maternidade da Bianca e a felicidade da família.
*   **SEÇÃO 4: Trilha Sonora Emocional:**
    *   Um tocador de áudio flutuante ou fixado na página que reproduz as três faixas fornecidas:
        1.  *Jean Tassy - Diz Pra Mim (Karaoke)*
        2.  *Liniker - Veludo Marrom*
        3.  *Djavan - Samurai*
    *   Interface simples de player (Play/Pause, indicador de faixa, trocar música).
*   **ESTÉTICA E ANIMAÇÕES:**
    *   Paleta de cores romântica (tons pasteis de rosa, pêssego, bege e branco caloroso).
    *   Animações suaves de corações flutuando levemente ao fundo ou efeitos de fade-in ao rolar a tela (usando CSS ou biblioteca leve como AOS).
    *   **Responsividade Mobile-First:** Foco 100% no layout móvel, garantindo que tudo funcione perfeitamente no smartphone dela.

---

## 7. Fora de Escopo
*   Área de login ou painel administrativo para upload de novas fotos.
*   Integração com APIs de redes sociais (manter privacidade total).
*   Comentários públicos ou livro de visitas aberto a terceiros.
*   Banco de dados e persistência no backend.

---

## 8. KPIs e Critérios de Sucesso
*   **Carregamento Rápido:** Página carregando em menos de 2.5 segundos em redes móveis (3G/4G).
*   **Compatibilidade de Áudio:** Player de música funcionando sem travar em navegadores Safari (iOS) e Chrome/Samsung Internet (Android).
*   **Responsividade Perfeita:** Sem quebras de layout ou textos cortados em telas de 360px a 430px de largura (padrão de smartphones modernos).
*   **Zero Bugs de Navegação:** Transições de abas de fotos fluidas e sem travamentos.

---

## 9. Riscos e Mitigações
*   **Risco 1: Autoplay de áudio bloqueado pelo navegador.**
    *   *Mitigação:* Implementar a tela inicial de boas-vindas que exige um clique do usuário para destravar o contexto de áudio do navegador (`AudioContext`).
*   **Risco 2: Lentidão no carregamento devido ao tamanho das fotos.**
    *   *Mitigação:* Otimização rigorosa das imagens na pasta `fotos/`, convertendo-as para formato `.webp` e redimensionando para o tamanho máximo de exibição web antes do deploy final.
*   **Risco 3: Prazo crítico de entrega (2 dias).**
    *   *Mitigação:* Utilizar stack limpa de HTML5, CSS3 avançado (com Tailwind ou CSS puro de alta qualidade) e JavaScript Vanilla. Evitar frameworks complexos desnecessários. Deploy contínuo na Vercel desde a Fase 1 para testar em tempo real no dispositivo móvel.

---

## 10. Fases Sugeridas de Entrega
*   **Fase 1 (Design System e Estrutura):** Definição das fontes, cores, esqueleto HTML e deploy do projeto em produção na Vercel. (Dia 1 - Manhã)
*   **Fase 2 (Integração de Mídias e Conteúdo):** Otimização de imagens, carregamento das músicas, estruturação do player e montagem da galeria de abas. (Dia 1 - Tarde/Noite)
*   **Fase 3 (Seções Especiais e Animações):** Implementação da seção do Iuri, carta com efeito de digitação, transições românticas e ajuste fino de responsividade móvel. (Dia 2 - Manhã)
*   **Fase 4 (Ajustes Finais e Homologação):** QA em diferentes dispositivos móveis, polimento estético e entrega final. (Dia 2 - Tarde)
