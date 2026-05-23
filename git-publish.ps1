# Script de automação do versionamento da entrega v1.2.0

Write-Host "Iniciando versionamento da entrega v1.2.0..." -ForegroundColor Cyan

# Commit 1: Código
Write-Host "1. Versionando código-fonte..." -ForegroundColor Yellow
git add index.html js/ test/ .vercelignore vercel.json .gitignore git-publish.ps1
git commit -m "feat(site): logica, testes e estrutura da capsula do tempo"

# Commit 2: Assets
Write-Host "2. Versionando mídias e fotos..." -ForegroundColor Yellow
git add audio/ fotos/
git commit -m "chore(assets): adiciona musicas da playlist e fotos polaroid"

# Commit 3: Documentação
Write-Host "3. Versionando documentação e logs de deploy..." -ForegroundColor Yellow
git add docs/
git commit -m "docs(contexto): relatorios de QA, logs de deploy e atualizacoes de contexto"

# Tag de Versão
Write-Host "4. Criando tag local v1.2.0..." -ForegroundColor Yellow
git tag v1.2.0

Write-Host "Finalizado com sucesso! Versão v1.2.0 registrada localmente." -ForegroundColor Green
