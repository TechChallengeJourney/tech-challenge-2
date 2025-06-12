$startDir = Get-Location

Write-Host "Limpando diretórios de build..." -ForegroundColor Yellow
if (Test-Path "$startDir\container\dist") { Remove-Item -Recurse -Force "$startDir\container\dist" }
if (Test-Path "$startDir\remote\dist") { Remove-Item -Recurse -Force "$startDir\remote\dist" }

Write-Host "Iniciando o Micro Frontend Remoto..." -ForegroundColor Green
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "cd '$startDir\remote'; npm start"

Write-Host "Aguardando o micro frontend remoto iniciar (10 segundos)..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host "Iniciando a Aplicação Container..." -ForegroundColor Cyan
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "cd '$startDir\container'; npm start"

Write-Host "Aplicações iniciadas!" -ForegroundColor Yellow
Write-Host "Container: http://localhost:3002" -ForegroundColor Cyan
Write-Host "Remote: http://localhost:3001" -ForegroundColor Green
