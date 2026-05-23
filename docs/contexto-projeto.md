# Contexto do Projeto — n/a
> ÍNDICE CENTRAL. Máximo 300 linhas.
> Todo agente lê ao iniciar. Todo agente atualiza ao criar arquivos.

## Projeto
1

## Objetivo de Negócio


## Stack
- Frontend  : Vanilla HTML5 / CSS3 Moderno / JS Vanilla (Tailwind CSS CDN)
- Backend   : n/a (Site Estático)
- Banco     : n/a
- Infra     : Vercel Static Hosting (CDN)
- Testes    : QA Manual responsivo mobile-first

## Estrutura de Pastas
| Pasta                       | Propósito                                  |
|-----------------------------|--------------------------------------------|
| .gemini/agents/             | Definição dos agentes                      |
| .gemini/melhoria-continua/  | Aprendizados incrementais por agente       |
| docs/contexto-projeto.md    | Este índice central                        |
| docs/prd/                   | PRDs por demanda                           |
| docs/arquitetura/           | Documentação arquitetural                  |
| docs/design-system/         | Design system                              |
| docs/deploys/               | Histórico de deploys                       |

## PRDs
| ID  | Nome | Status   | Fase Atual |
|-----|------|----------|------------|
| PRD-001 | PRD Inicial - Surpresa Bianca | Ativo | Concluído |

## Arquivos Registrados
| Arquivo                                    | Responsável | Descrição                |
|--------------------------------------------|-------------|--------------------------|
| GEMINI.md                                  | Sistema     | Instruções globais       |
| README-AGENTS.md                           | Sistema     | Guia de uso              |
| .gemini/settings.json                      | Sistema     | Config do Gemini CLI     |
| .gemini/agents/maestro.md                  | Sistema     | Orquestrador             |
| .gemini/agents/ba.md                       | Sistema     | Analista de negócios     |
| .gemini/agents/ux-ui.md                    | Sistema     | Designer UX/UI           |
| .gemini/agents/architect.md                | Sistema     | Arquiteto                |
| .gemini/agents/dev.md                      | Sistema     | Desenvolvedor            |
| .gemini/agents/qa.md                       | Sistema     | QA                       |
| .gemini/agents/devops.md                   | Sistema     | DevOps                   |
| docs/contexto-projeto.md                   | Sistema     | Índice central           |
| docs/arquitetura/arquitetura-atual.md      | Architect   | Estrutura de deploy, controle de áudio e mitigação de riscos |
| docs/design-system/design-system.md        | UX-UI       | Guia de Design System (Cores, Fontes)    |
| docs/prd/prd-001/prd-inicial.md            | BA          | PRD Inicial do projeto                   |
| docs/prd/prd-001/fluxo-ux.md               | UX-UI       | Fluxo e jornada de experiência da Bianca |
| docs/prd/prd-001/wireframes/index.html     | UX-UI       | Wireframe interativo em HTML + CSS + JS  |
| docs/prd/prd-001/plano-implementacao-fase-1.md | Architect | Planejamento técnico da stack, passos de execução e failsafes |
| docs/prd/prd-001/relatorio-qa-fase-1.md    | QA          | Relatório detalhado de validação de qualidade (QA) da Fase 1 |
| docs/prd/prd-001/relatorio-qa-fase-2.md    | QA          | Relatório detalhado de validação de qualidade (QA) da Fase 2 (Sakura) |
| index.html                                 | Dev         | Página principal da experiência interativa (HTML/CSS/JS) |
| js/player.js                               | Dev         | Estado do player de áudio (TDD) |
| js/gallery.js                              | Dev         | Estado da galeria com abas (TDD) |
| js/letter.js                               | Dev         | Estado do envelope e carta 3D (TDD) |
| js/main.js                                 | Dev         | Orquestrador de interações e efeitos do DOM |
| js/sakura.js                               | Dev         | Motor de animação de pétalas de cerejeira (sakura) |
| test/app.test.js                           | Dev         | Testes unitários de estado (Node.js Test Runner) |
| .vercelignore                              | Dev         | Exclusão de arquivos de desenvolvimento para o deploy |
| vercel.json                                | DevOps      | Configuração do Vercel para Clean URLs |
| docs/deploys/deploy-2026-05-23-prod.md     | DevOps      | Registro de deploy da versão v1.2.0 em produção |
| docs/deploys/deploy-2026-05-23-prod-sakura.md| DevOps    | Registro de deploy da versão v1.3.0 em produção (Sakura) |
| git-publish.ps1                            | DevOps      | Script Powershell para automatizar commits e tags locais |


## Última Atualização
- Data    : 2026-05-23
- Por     : DevOps
- Motivo  : Conclusão do PRD-001 (Fase 2) com deploy da v1.3.0 (Refinamento Sakura) em produção na Vercel e registro do log.