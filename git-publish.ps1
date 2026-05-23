# Script de automação do versionamento da entrega v1.3.0 (Refinamento Sakura)

Write-Host "Iniciando versionamento da entrega v1.3.0..." -ForegroundColor Cyan

# Commit 1: Lógica e Interface Sakura
Write-Host "1. Versionando código-fonte do refinamento Sakura..." -ForegroundColor Yellow
git add index.html js/gallery.js js/letter.js js/main.js js/sakura.js test/app.test.js package-lock.json git-publish.ps1
git commit -m "feat(sakura): adiciona motor de petalas e reformula interface visual do site"

# Commit 2: Documentação, logs de deploy e QA
Write-Host "2. Versionando relatórios de QA e registros de deploy..." -ForegroundColor Yellow
git add docs/prd/prd-001/relatorio-qa-fase-2.md docs/deploys/deploy-2026-05-23-prod-sakura.md docs/contexto-projeto.md
git commit -m "docs(qa): adiciona relatorio de qa fase 2"

# Tag de Versão
Write-Host "3. Criando tag local v1.3.0..." -ForegroundColor Yellow
git tag v1.3.0

Write-Host "Finalizado com sucesso! Versão v1.3.0 registrada localmente." -ForegroundColor Green
