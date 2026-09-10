@echo off
cd /d "%~dp0"
echo EduVerse Chrome yerel sunucu ile aciliyor...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0LOCAL_SERVER.ps1" -Browser chrome -Port 8080
pause
