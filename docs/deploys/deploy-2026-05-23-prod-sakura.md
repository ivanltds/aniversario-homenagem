# Registro de Deploy — 2026-05-23 (PROD - Refinamento Sakura)

Este documento registra o deploy em produção da versão `v1.3.0` do site de comemoração do aniversário da Bianca, incorporando os refinamentos da Fase 2 (Sakura).

---

## Detalhes do Deploy
- **Data/Hora:** 2026-05-23 às 19:21:44 (GMT-3)
- **Ambiente:** Produção (PROD)
- **Versão/Tag:** `v1.3.0`
- **ID do Deploy Vercel:** `dpl_HE5G6ajUZekQXzPqJqi6GZSNUA5g`
- **URL de Acesso Principal:** [maestro-ai-umber.vercel.app](https://maestro-ai-umber.vercel.app)
- **URL da Instância Específica:** [maestro-h0udf2ueq-ivan-souzas-projects-6f3b2529.vercel.app](https://maestro-h0udf2ueq-ivan-souzas-projects-6f3b2529.vercel.app)
- **Status:** `READY / OK`

---

## Arquivos Incluídos no Deploy
O deploy foi realizado a partir da raiz do repositório `maestro-ai`, atualizando os scripts de lógica, animações e testes:
- `index.html` (estrutura semântica atualizada com o Gate da Flor SVG interativo, envelope 3D e seções de fluxo)
- `js/sakura.js` (novo motor de renderização dinâmica de pétalas caindo e rajadas de vento "burst")
- `js/main.js` (orquestrador de fluxo em 2 estágios, gatilhos de animação da Sakura e digitação)
- `js/player.js` (máquina de estado do tocador de música)
- `js/gallery.js` (estado do álbum de fotos com algoritmo Fisher-Yates para randomização de Polaroids)
- `js/letter.js` (estados da carta 3D e controle de fluxo linear)
- `test/app.test.js` (suíte de testes unitários expandida para cobrir randomização e transições de fluxo)
- `vercel.json` e `.vercelignore` (configurações do deploy estático)
- Todos os arquivos estáticos de fotos (`fotos/`) e trilhas sonoras (`audio/`).

---

## Comando de Deploy Utilizado
```bash
npx vercel --prod --yes
```

---

## Verificação de Saúde (Smoke Test)
1. **Gate e Autoplay:** A flor de cerejeira (SVG) é exibida corretamente. Ao clicar, ela desabrocha e o áudio inicia perfeitamente.
2. **Ciclo de Estados:** A transição do estágio 1 (Flor) para o estágio 2 (Envelope 3D) e, finalmente, a rajada de vento (Burst de Sakura) para revelar a tela principal (`#hero-flow-section`) funciona sem travamentos ou gargalos de CPU no celular.
3. **Randomização de Polaroids:** Ao alternar categorias, as fotos são embaralhadas dinamicamente na tela.
4. **SSL e URLs Limpas:** A navegação ocorre sob HTTPS com URLs otimizadas de forma fluida.
