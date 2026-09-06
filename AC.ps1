param(
  [switch]$NoOpen
)
$ErrorActionPreference='Stop'

$Root=$PSScriptRoot
$Edu=Split-Path $Root -Parent
$Game=Join-Path $Root 'game'
$Hub=Join-Path $Root 'world-hub'
$GamePid=Join-Path $Root '.game.pid'
$HubPid=Join-Path $Root '.hub.pid'
$HubPortFile=Join-Path $Root '.hub.port'

function Test-Http([string]$Url){
  try{
    $r=Invoke-WebRequest -UseBasicParsing -Uri $Url -TimeoutSec 3
    return ($r.StatusCode -eq 200)
  }catch{return $false}
}
function Get-FreePortValue{
  $l=[Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback,0)
  $l.Start()
  $p=[int]$l.LocalEndpoint.Port
  $l.Stop()
  return $p
}
function Get-LanIPv4Value{
  try{
    $all=Get-NetIPAddress -AddressFamily IPv4 -ErrorAction Stop |
      Where-Object {
        $_.IPAddress -notlike '127.*' -and
        $_.IPAddress -notlike '169.254.*' -and
        $_.AddressState -eq 'Preferred'
      } |
      Select-Object -ExpandProperty IPAddress
    foreach($ip in $all){
      if($ip -match '^10\.' -or $ip -match '^192\.168\.' -or $ip -match '^172\.(1[6-9]|2[0-9]|3[0-1])\.'){
        return $ip
      }
    }
  }catch{}
  return '127.0.0.1'
}
function Stop-OwnPid([string]$Path){
  if(Test-Path $Path){
    try{
      $id=[int](Get-Content $Path -Raw).Trim()
      Stop-Process -Id $id -Force -ErrorAction SilentlyContinue
    }catch{}
    Remove-Item $Path -Force -ErrorAction SilentlyContinue
  }
}

Write-Host '===== TARKAN_BASLANGIC ====='
Write-Host 'ISLEM=K6R20_TEK_LAUNCHER'
try{
  foreach($p in @(
    (Join-Path $Game 'index.html'),
    (Join-Path $Game 'game.js'),
    (Join-Path $Hub 'index.html'),
    (Join-Path $Hub 'hub\web-entry.js'),
    (Join-Path $Hub 'hub\askida_server.py')
  )){
    if(!(Test-Path $p)){throw "PACKAGE_FILE_NOT_FOUND=$p"}
  }

  Stop-OwnPid $GamePid
  Stop-OwnPid $HubPid

  $legacyPidFiles=@(
    (Join-Path $Edu 'OYUN_TEST.pid'),
    (Join-Path $Edu 'OYUN_HUB.pid')
  )
  foreach($pf in $legacyPidFiles){Stop-OwnPid $pf}

  Start-Sleep -Milliseconds 300
  if(Test-Http 'http://127.0.0.1:8788/'){
    throw 'PORT_8788_BUSY_AFTER_OWN_SERVER_CLEANUP'
  }

  $py=Get-Command py -ErrorAction SilentlyContinue
  if(!$py){$py=Get-Command python -ErrorAction SilentlyContinue}
  if(!$py){throw 'PYTHON_NOT_FOUND'}

  $gp=Start-Process -FilePath $py.Source -ArgumentList @(
    '-m','http.server','8788','--bind','127.0.0.1','--directory',$Game
  ) -WindowStyle Hidden -PassThru
  Set-Content $GamePid $gp.Id -Encoding ASCII

  $gameReady=$false
  for($i=0;$i-lt 40;$i++){
    Start-Sleep -Milliseconds 250
    if((Test-Http 'http://127.0.0.1:8788/') -and (Test-Http 'http://127.0.0.1:8788/game.js')){
      $gameReady=$true
      break
    }
  }
  if(!$gameReady){throw 'GAME_SERVER_START_FAILED'}

  $hubPort=8789
  if(Test-Http "http://127.0.0.1:$hubPort/"){$hubPort=Get-FreePortValue}

  $server=Join-Path $Hub 'hub\askida_server.py'
  $vendor=Join-Path $Hub 'hub\_vendor'
  $askidaData=Join-Path $Hub 'data\askida\gifts.json'
  $lan=Get-LanIPv4Value
  $publicBase="http://$lan`:$hubPort"

  $hp=Start-Process -FilePath $py.Source -ArgumentList @(
    $server,$Hub,"$hubPort",$askidaData,$vendor,$publicBase
  ) -WindowStyle Hidden -PassThru
  Set-Content $HubPid $hp.Id -Encoding ASCII
  Set-Content $HubPortFile $hubPort -Encoding ASCII

  $hubReady=$false
  for($i=0;$i-lt 40;$i++){
    Start-Sleep -Milliseconds 250
    if(Test-Http "http://127.0.0.1:$hubPort/"){
      $hubReady=$true
      break
    }
  }
  if(!$hubReady){throw 'HUB_SERVER_START_FAILED'}

  $url="http://127.0.0.1:$hubPort/?v=K6R20#eduverseStoreBridge"
  Write-Host 'GAME_SERVER=PASS'
  Write-Host 'GAME_PORT=8788'
  Write-Host "GAME_PID=$($gp.Id)"
  Write-Host 'GAME_URL=http://127.0.0.1:8788/'
  Write-Host 'HUB_SERVER=PASS'
  Write-Host "HUB_PORT=$hubPort"
  Write-Host "HUB_PID=$($hp.Id)"
  Write-Host "QR_PUBLIC_BASE=$publicBase"
  Write-Host "URL=$url"
  Write-Host 'MODE=BACKGROUND'
  Write-Host 'RESULT=PASSED'

  if(!$NoOpen){Start-Process $url}
}catch{
  Write-Host 'RESULT=FAILED'
  Write-Host "FAILURE=$($_.Exception.Message)"
}finally{
  Write-Host '===== TARKAN_BITIS ====='
}
