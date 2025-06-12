@echo off
echo Iniciando Aplicacoes Micro Frontend

echo Limpando diretórios de build...
if exist ".\container\dist" rd /s /q ".\container\dist"
if exist ".\remote\dist" rd /s /q ".\remote\dist"

echo Iniciando o micro frontend remoto...
start cmd /k "cd remote && npm start"

echo Aguardando o micro frontend remoto iniciar (10 segundos)...
timeout /t 10 /nobreak

echo Iniciando o container...
start cmd /k "cd container && npm start"

echo Aplicações iniciadas!
echo Container: http://localhost:3000
echo Remote: http://localhost:3001
