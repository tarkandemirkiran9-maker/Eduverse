param(
  [string]$Browser = "edge",
  [int]$Port = 8080
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Root

function Get-ContentType([string]$Path) {
  $ext = [System.IO.Path]::GetExtension($Path).ToLowerInvariant()
  switch ($ext) {
    ".html" { return "text/html; charset=utf-8" }
    ".htm"  { return "text/html; charset=utf-8" }
    ".js"   { return "application/javascript; charset=utf-8" }
    ".css"  { return "text/css; charset=utf-8" }
    ".json" { return "application/json; charset=utf-8" }
    ".png"  { return "image/png" }
    ".jpg"  { return "image/jpeg" }
    ".jpeg" { return "image/jpeg" }
    ".gif"  { return "image/gif" }
    ".svg"  { return "image/svg+xml" }
    ".webp" { return "image/webp" }
    ".mp3"  { return "audio/mpeg" }
    ".wav"  { return "audio/wav" }
    ".ogg"  { return "audio/ogg" }
    ".ico"  { return "image/x-icon" }
    default  { return "application/octet-stream" }
  }
}

$listener = New-Object System.Net.HttpListener
$prefix = "http://127.0.0.1:$Port/"
try {
  $listener.Prefixes.Add($prefix)
  $listener.Start()
} catch {
  Write-Host "Port $Port acilamadi. 8081 deneniyor..."
  $Port = 8081
  $prefix = "http://127.0.0.1:$Port/"
  $listener = New-Object System.Net.HttpListener
  $listener.Prefixes.Add($prefix)
  $listener.Start()
}

$url = "http://127.0.0.1:$Port/index.html"
Write-Host "EduVerse yerel sunucu basladi: $url"
Write-Host "Bu siyah pencere acik kalacak. Kapatirsan oyun durur."
Write-Host "Durdurmak icin CTRL+C basabilirsin."

if ($Browser -eq "chrome") {
  Start-Process "chrome.exe" $url -ErrorAction SilentlyContinue
} else {
  Start-Process "msedge.exe" $url -ErrorAction SilentlyContinue
}

while ($listener.IsListening) {
  try {
    $context = $listener.GetContext()
    $reqPath = [System.Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart('/'))
    if ([string]::IsNullOrWhiteSpace($reqPath)) { $reqPath = "index.html" }
    $reqPath = $reqPath -replace '/', [System.IO.Path]::DirectorySeparatorChar
    $fullPath = [System.IO.Path]::GetFullPath((Join-Path $Root $reqPath))
    $rootFull = [System.IO.Path]::GetFullPath($Root)

    if (-not $fullPath.StartsWith($rootFull)) {
      $context.Response.StatusCode = 403
      $bytes = [System.Text.Encoding]::UTF8.GetBytes("Forbidden")
    } elseif (Test-Path $fullPath -PathType Leaf) {
      $bytes = [System.IO.File]::ReadAllBytes($fullPath)
      $context.Response.ContentType = Get-ContentType $fullPath
      $context.Response.StatusCode = 200
    } else {
      $context.Response.StatusCode = 404
      $bytes = [System.Text.Encoding]::UTF8.GetBytes("Not found")
    }
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $context.Response.OutputStream.Close()
  } catch {
    try { $context.Response.StatusCode = 500; $context.Response.Close() } catch {}
  }
}
