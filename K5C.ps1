$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
$Base = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Join-Path $Base 'world-hub'
$Ports = 8789..8799

if (-not (Test-Path $Root -PathType Container)) {
  Write-Host '===== TARKAN_BASLANGIC ====='
  Write-Host 'ISLEM=W5_K5C_RUNTIME'
  Write-Host 'RESULT=FAILED'
  Write-Host ('REASON=Klasor bulunamadi: ' + $Root)
  Write-Host '===== TARKAN_BITIS ====='
  exit 1
}

function Get-ContentType([string]$Path) {
  switch ([IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    '.html' { 'text/html; charset=utf-8'; break }
    '.js'   { 'application/javascript; charset=utf-8'; break }
    '.css'  { 'text/css; charset=utf-8'; break }
    '.json' { 'application/json; charset=utf-8'; break }
    '.svg'  { 'image/svg+xml'; break }
    '.png'  { 'image/png'; break }
    '.jpg'  { 'image/jpeg'; break }
    '.jpeg' { 'image/jpeg'; break }
    '.webp' { 'image/webp'; break }
    '.mp3'  { 'audio/mpeg'; break }
    default { 'application/octet-stream' }
  }
}

$listener = $null
$Port = $null
$lastError = $null
foreach ($candidate in $Ports) {
  $tryListener = [Net.HttpListener]::new()
  $tryPrefix = "http://127.0.0.1:$candidate/"
  $tryListener.Prefixes.Add($tryPrefix)
  try {
    $tryListener.Start()
    $listener = $tryListener
    $Port = $candidate
    break
  } catch {
    $lastError = $_.Exception.Message
    try { $tryListener.Close() } catch {}
  }
}
if (-not $listener -or -not $listener.IsListening) {
  Write-Host '===== TARKAN_BASLANGIC ====='
  Write-Host 'ISLEM=W5_K5C_RUNTIME'
  Write-Host 'RESULT=FAILED'
  Write-Host 'REASON=8789-8799 arasinda bos port bulunamadi.'
  if ($lastError) { Write-Host ('DETAIL=' + $lastError) }
  Write-Host '===== TARKAN_BITIS ====='
  exit 1
}
$prefix = "http://127.0.0.1:$Port/"
$preview = $prefix + '?launchTest=12'

Write-Host '===== TARKAN_BASLANGIC ====='
Write-Host 'ISLEM=W5_K5C_RUNTIME'
Write-Host 'RESULT=SERVER_RUNNING'
Write-Host ('URL=' + $preview)
Write-Host 'KONTROL=SAYAC BITINCE 4 KUTU KAYBOLUR; KOMPAKT TARIH+SAAT KARTI KALIR'
Write-Host 'GUVENLIK=paidSalesEnabled FALSE kalir; sayac satis acmaz.'
Write-Host 'NOT=Test boyunca bu pencere acik kalacak.'
Write-Host '===== TARKAN_BITIS ====='

Start-Process 'msedge.exe' $preview -ErrorAction SilentlyContinue
try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
    if ([string]::IsNullOrWhiteSpace($rel)) { $rel = 'index.html' }
    $rel = $rel -replace '/', [IO.Path]::DirectorySeparatorChar
    $full = [IO.Path]::GetFullPath((Join-Path $Root $rel))
    $rootFull = [IO.Path]::GetFullPath($Root)
    if (-not $full.StartsWith($rootFull, [StringComparison]::OrdinalIgnoreCase)) {
      $ctx.Response.StatusCode = 403
      $bytes = [Text.Encoding]::UTF8.GetBytes('Forbidden')
    } elseif (Test-Path $full -PathType Leaf) {
      $bytes = [IO.File]::ReadAllBytes($full)
      $ctx.Response.StatusCode = 200
      $ctx.Response.ContentType = Get-ContentType $full
    } else {
      $ctx.Response.StatusCode = 404
      $bytes = [Text.Encoding]::UTF8.GetBytes('Not found')
    }
    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $ctx.Response.OutputStream.Close()
  }
} finally {
  if ($listener) { $listener.Stop(); $listener.Close() }
}
