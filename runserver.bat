@echo off

cd /d "%~dp0data"
start "" cmd /k "npm run dev"

cd /d "%~dp0auth"
start "" cmd /k "npm run dev"

cd /d "%~dp0socket"
start "" cmd /k "npm run dev"

cd /d "%~dp0apiGateway"
start "" cmd /k "npm run dev"

cd /d "%~dp0client"
start "" cmd /k "npm run dev"