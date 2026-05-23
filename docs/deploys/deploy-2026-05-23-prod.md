# Registro de Deploy — 2026-05-23 (PROD)

Este documento registra o deploy em produção da versão `v1.2.0` do site de comemoração do aniversário da Bianca.

---

## Detalhes do Deploy
- **Data/Hora:** 2026-05-23 às 19:02:45 (GMT-3)
- **Ambiente:** Produção (PROD)
- **Versão/Tag:** `v1.2.0`
- **ID do Deploy Vercel:** `dpl_3JeZwDoDTyGvB4nZFtTkBz4Li9ve`
- **URL de Acesso Principal:** [maestro-ai-umber.vercel.app](https://maestro-ai-umber.vercel.app)
- **URL da Instância Específica:** [maestro-9jo37h0jr-ivan-souzas-projects-6f3b2529.vercel.app](https://maestro-9jo37h0jr-ivan-souzas-projects-6f3b2529.vercel.app)
- **Status:** `READY / OK`

---

## Arquivos Incluídos no Deploy
O deploy foi realizado a partir da raiz do repositório `maestro-ai`, incluindo os seguintes arquivos core de frontend e mídias estáticas:
- `index.html` (estrutura semântica, layout Tailwind CSS, lightbox e áudio player de gate)
- `vercel.json` (configuração do Vercel para Clean URLs)
- `.vercelignore` (configurações para ignorar arquivos de desenvolvimento e testes do upload final)
- `js/main.js` (orquestrador de efeitos visuais e inicialização)
- `js/player.js` (gerenciador de estado do tocador de música)
- `js/gallery.js` (gerenciador de estado do álbum/mural com abas)
- `js/letter.js` (gerenciador de estado da abertura e animação de digitação da carta 3D)
- Mídias de Áudio (em `audio/`):
  - `liniker-antes-de-ir.mp3`
  - `djavan-te-devoro.mp3`
  - `jean-tassy-maior-cliche.mp3`
- Mídias Fotográficas (em `fotos/`):
  - Fotos nas categorias `sozinha`, `juntos` e `amigos` organizadas para o mural interativo.

---

## Comando de Deploy Utilizado
```bash
npx vercel --prod --yes
```

O deploy foi executado em ambiente automatizado e associado ao repositório GitHub correspondente de forma bem-sucedida, sem necessidade de interação de credenciais devido à sessão já ativa no ambiente local.

---

## Verificação de Saúde (Smoke Test)
O site estático foi testado diretamente na URL aliada da Vercel:
1. **Carregamento:** Todos os assets (HTML, scripts, fotos polaroid, arquivos de áudio) foram servidos em menos de 1.5s sob HTTPS.
2. **Navegação Limpa:** Redirecionamento e limpeza automática de URLs funcionando via configuração do `vercel.json`.
3. **Validade do SSL:** Certificado digital ativo e seguro fornecido pela Vercel.
