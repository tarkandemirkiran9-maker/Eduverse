@echo off
setlocal EnableExtensions DisableDelayedExpansion
chcp 65001 >nul
set "NODE=node.exe"
where node.exe >nul 2>&1
if errorlevel 1 if exist "%ProgramFiles%\nodejs\node.exe" set "NODE=%ProgramFiles%\nodejs\node.exe"
"%NODE%" "%~dp0apk6e.js"
exit /b %ERRORLEVEL%
