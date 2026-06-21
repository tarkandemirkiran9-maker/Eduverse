@echo off
cd /d "%~dp0"
echo EduVerse Edge yerel sunucu ile aciliyor...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0LOCAL_SERVER.ps1" -Browser edge -Port 8080
pause
