@echo off

cd /d "%~dp0database_server"
start "" cmd /k "npm run dev"

cd /d "%~dp0authentication_server"
start "" cmd /k "npm run dev"

cd /d "%~dp0socket_server"
start "" cmd /k "npm run dev"

cd /d "%~dp0api_gateway"
start "" cmd /k "npm run dev"

cd /d "%~dp0redis"
start "" cmd /k "npm run dev"

cd /d "%~dp0client"
start "" cmd /k "npm run dev"