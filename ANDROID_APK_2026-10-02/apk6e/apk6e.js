'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cp = require('child_process');
const os = require('os');

const ROOT = path.join(process.env.USERPROFILE || 'C:\\Users\\Lenovo', 'Desktop', 'Edu', 'ANDROID_UI');
const ANDROID = path.join(ROOT, 'android');
const PUB = path.join(ANDROID, 'app', 'src', 'main', 'assets', 'public');
const GRADLE = path.join(ANDROID, 'app', 'build.gradle');
const GRADLE_BAK = GRADLE + '.apk6e.backup';
const GJSON = path.join(ANDROID, 'app', 'google-services.json');
const GJSON_HOLD = GJSON + '.apk6e.hold';
const APK_SRC = path.join(ANDROID, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
const APK_OUT = path.join(process.env.USERPROFILE || 'C:\\Users\\Lenovo', 'Desktop', 'Edu', 'preview6.apk');

const GUARD = {
  'android-app.js':'8C559C45D040CDC9E38BB9F754FC3DC5E2847D8240F11D8F45971E5719D96BDA',
  'hub\\HUB.js':'51D0FA8F53B96C54D5B1951496A8CE02A6BC3393909B5F712C711CFB58206A30',
  'hub\\web-entry.js':'3FDDC2A32E298706E3497B7630F894F8021349461A5542C6EC347D0A5419CD0E',
  'game\\android-nav.js':'614B009407AEF6DAD1C6AAFCA22A56711B635BC84B587092C022C268F5BEAAEA',
  'game\\index.html':'CDD4BA928F1AFAE216778FD25D4D0080AC6C739A17A8B126544EB542738EB554'
};
const FILM = {
  'hub\\film.js':'B5E21ADCB1F70E28FDD40FBDA298ADE0D34F89C16B1B9EB77E0B1AD24777F95B',
  'hub\\film.css':'27A93ADA57AE6C51B8826946F657DB708D5DEF3904DA69102BBD4CEC6AE9281C',
  'showcase\\index.html':'43946E3D802B0B4B14ED4FC8837E08B7907BEEE44137E63FF019E4C18DB7EE1E'
};

function log(s=''){ process.stdout.write(String(s)+'\n'); }
function fail(reason, code=1){ const e=new Error(reason); e.controlled=true; e.reason=reason; e.exitCode=code; throw e; }
function sha256(file){ return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').toUpperCase(); }
function mustFile(file, label){ if(!fs.existsSync(file) || !fs.statSync(file).isFile()) fail(label+'_MISSING='+file); }
function relFile(rel){ return path.join(PUB, ...rel.split('\\')); }
function uniq(arr){ return [...new Set(arr.filter(Boolean).map(x=>path.normalize(x)))]; }

function restoreQuiet(){
  try{
    if(fs.existsSync(GRADLE_BAK)){
      fs.copyFileSync(GRADLE_BAK, GRADLE);
      fs.unlinkSync(GRADLE_BAK);
      log('BUILD_GRADLE_RESTORED=YES');
    }
    if(fs.existsSync(GJSON_HOLD)){
      if(fs.existsSync(GJSON)) fs.unlinkSync(GJSON);
      fs.renameSync(GJSON_HOLD, GJSON);
      log('GOOGLE_SERVICES_RESTORED=YES');
    }
  }catch(e){ log('RESTORE_WARNING='+e.message); }
}

function validateSource(){
  mustFile(GRADLE,'BUILD_GRADLE');
  mustFile(path.join(PUB,'index.html'),'INDEX');
  log('--- PLAY5_PROTECTED_GUARD ---');
  for(const [rel, expected] of Object.entries(GUARD)){
    const f=relFile(rel); mustFile(f,'GUARD_FILE');
    const got=sha256(f);
    if(got!==expected) fail('GUARD_HASH_MISMATCH='+rel+'|CURRENT='+got+'|EXPECTED='+expected);
    log('GUARD_OK='+rel);
  }
  log('--- FILM28_GUARD ---');
  for(const [rel, expected] of Object.entries(FILM)){
    const f=relFile(rel); mustFile(f,'FILM_FILE');
    const got=sha256(f);
    if(got!==expected) fail('FILM_HASH_MISMATCH='+rel+'|CURRENT='+got+'|EXPECTED='+expected);
    log('FILM_OK='+rel);
  }
  const idx=fs.readFileSync(path.join(PUB,'index.html'),'utf8');
  for(const marker of ['id="eduFilmShowcase"','./hub/film.css','./hub/film.js']){
    if(!idx.includes(marker)) fail('INDEX_FILM_MARKER_MISSING='+marker);
  }
  log('INDEX_FILM_INTEGRATION=OK');
  const g=fs.readFileSync(GRADLE,'utf8');
  const hits=(g.match(/applicationId\s+["']club\.eduverse\.app["']/g)||[]).length;
  if(hits!==1) fail('APPLICATION_ID_MATCH_COUNT='+hits);
  if(/applicationId\s+["']club\.eduverse\.app\.preview["']/.test(g)) fail('BUILD_GRADLE_ALREADY_PREVIEW');
}

function parseJavaMajor(text){
  let m=text.match(/version\s+"1\.(\d+)/i); if(m) return Number(m[1]);
  m=text.match(/version\s+"(\d+)/i); if(m) return Number(m[1]);
  m=text.match(/openjdk(?:\s+version)?\s+"?(\d+)/i); if(m) return Number(m[1]);
  return 0;
}
function runCapture(exe,args,opts={}){
  try{
    const r=cp.spawnSync(exe,args,{encoding:'utf8',windowsHide:true,...opts});
    return {status:typeof r.status==='number'?r.status:999, text:String(r.stdout||'')+String(r.stderr||'')};
  }catch(e){ return {status:999,text:e.message}; }
}
function addChildren(base, out){
  try{
    for(const n of fs.readdirSync(base)){
      const d=path.join(base,n);
      try{ if(fs.statSync(d).isDirectory()) out.push(d); }catch{}
    }
  }catch{}
}
function registryAndroidStudioPaths(){
  const out=[];
  if(process.platform!=='win32') return out;
  const keys=[
    'HKLM\\SOFTWARE\\Android Studio',
    'HKCU\\SOFTWARE\\Android Studio',
    'HKLM\\SOFTWARE\\WOW6432Node\\Android Studio'
  ];
  for(const key of keys){
    const r=runCapture('reg.exe',['query',key,'/v','InstallPath']);
    if(r.status===0){
      const m=r.text.match(/InstallPath\s+REG_\w+\s+(.+)$/mi);
      if(m){ out.push(path.join(m[1].trim(),'jbr')); out.push(path.join(m[1].trim(),'jre')); }
    }
  }
  return out;
}
function whereJavaHomes(){
  const out=[];
  if(process.platform!=='win32') return out;
  const r=runCapture('where.exe',['java.exe']);
  if(r.status===0){
    for(const line of r.text.split(/\r?\n/)){
      const p=line.trim();
      if(p.toLowerCase().endsWith('\\bin\\java.exe')) out.push(path.dirname(path.dirname(p)));
    }
  }
  return out;
}
function jdkCandidates(){
  const out=[];
  const pf=process.env.ProgramFiles || 'C:\\Program Files';
  const pf86=process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)';
  const la=process.env.LOCALAPPDATA || '';
  if(process.env.JAVA_HOME) out.push(process.env.JAVA_HOME);
  for(const base of [pf,pf86]){
    out.push(path.join(base,'Android','Android Studio','jbr'));
    out.push(path.join(base,'Android','Android Studio','jre'));
  }
  if(la){
    out.push(path.join(la,'Programs','Android Studio','jbr'));
    out.push(path.join(la,'Programs','Android Studio','jre'));
  }
  out.push(...registryAndroidStudioPaths());
  out.push(...whereJavaHomes());
  const vendorRoots=[];
  for(const base of [pf,pf86]){
    vendorRoots.push(path.join(base,'Java'));
    vendorRoots.push(path.join(base,'Eclipse Adoptium'));
    vendorRoots.push(path.join(base,'Microsoft'));
    vendorRoots.push(path.join(base,'Amazon Corretto'));
    vendorRoots.push(path.join(base,'Zulu'));
    vendorRoots.push(path.join(base,'BellSoft'));
  }
  for(const vr of vendorRoots) addChildren(vr,out);
  return uniq(out);
}
function findJdk17(){
  const checked=[];
  for(const home of jdkCandidates()){
    const exe=path.join(home,'bin','java.exe');
    if(!fs.existsSync(exe)) continue;
    const r=runCapture(exe,['-version']);
    const major=parseJavaMajor(r.text);
    checked.push(home+'|JAVA_MAJOR='+major);
    if(r.status===0 && major>=17) return {home,major,checked};
  }
  return {home:null,major:0,checked};
}
function nodeJavaDiagnostic(){
  const found=findJdk17();
  for(const row of found.checked) log('JDK_CHECKED='+row);
  if(!found.home) fail('JDK17_OR_NEWER_NOT_FOUND_AFTER_REAL_SCAN');
  log('JAVA_HOME='+found.home);
  log('JAVA_MAJOR='+found.major);
  return found.home;
}
function runGradle(javaHome,args){
  const env={...process.env, JAVA_HOME:javaHome};
  env.PATH=path.join(javaHome,'bin')+path.delimiter+(process.env.PATH||'');
  const cmd='gradlew.bat '+args.map(a=>/\s/.test(a)?'"'+a.replace(/"/g,'\\"')+'"':a).join(' ');
  const r=cp.spawnSync('cmd.exe',['/d','/s','/c',cmd],{cwd:ANDROID,env,stdio:'inherit',windowsHide:false});
  return typeof r.status==='number'?r.status:999;
}
function preparePreview(){
  restoreQuiet();
  validateSource();
  const original=fs.readFileSync(GRADLE,'utf8');
  fs.copyFileSync(GRADLE,GRADLE_BAK);
  const patched=original.replace(/applicationId\s+["']club\.eduverse\.app["']/g,'applicationId "club.eduverse.app.preview"');
  if(patched===original) fail('APPLICATION_ID_PATCH_NO_CHANGE');
  fs.writeFileSync(GRADLE,patched,'utf8');
  const verify=fs.readFileSync(GRADLE,'utf8');
  const n=(verify.match(/applicationId\s+["']club\.eduverse\.app\.preview["']/g)||[]).length;
  if(n!==1) fail('PREVIEW_APPLICATION_ID_VERIFY_COUNT='+n);
  if(fs.existsSync(GJSON)){
    if(fs.existsSync(GJSON_HOLD)) fs.unlinkSync(GJSON_HOLD);
    fs.renameSync(GJSON,GJSON_HOLD);
    log('GOOGLE_SERVICES_TEMP_HOLD=YES');
  }else log('GOOGLE_SERVICES_TEMP_HOLD=NOT_PRESENT');
  log('PREVIEW_PATCH=PASSED');
}
function findAdb(){
  const candidates=[];
  if(process.env.ANDROID_HOME) candidates.push(path.join(process.env.ANDROID_HOME,'platform-tools','adb.exe'));
  if(process.env.ANDROID_SDK_ROOT) candidates.push(path.join(process.env.ANDROID_SDK_ROOT,'platform-tools','adb.exe'));
  if(process.env.LOCALAPPDATA) candidates.push(path.join(process.env.LOCALAPPDATA,'Android','Sdk','platform-tools','adb.exe'));
  if(process.platform==='win32'){
    const r=runCapture('where.exe',['adb.exe']);
    if(r.status===0) for(const line of r.text.split(/\r?\n/)) if(line.trim()) candidates.push(line.trim());
  }
  return uniq(candidates).find(p=>fs.existsSync(p))||null;
}
function installApk(){
  const adb=findAdb();
  if(!adb){ log('INSTALL=SKIPPED_ADB_NOT_FOUND'); log('RESULT=APK_READY_NOT_INSTALLED'); log('===== TARKAN_BITIS ====='); return 0; }
  const state=runCapture(adb,['get-state']);
  if(state.status!==0 || !/device/i.test(state.text)){
    log('INSTALL=SKIPPED_NO_DEVICE'); log('RESULT=APK_READY_NOT_INSTALLED'); log('===== TARKAN_BITIS ====='); return 0;
  }
  let r=cp.spawnSync(adb,['install','-r',APK_OUT],{stdio:'inherit',windowsHide:false});
  if(r.status!==0) fail('APK_INSTALL_FAILED_NO_UNINSTALL_DONE');
  r=cp.spawnSync(adb,['shell','monkey','-p','club.eduverse.app.preview','-c','android.intent.category.LAUNCHER','1'],{stdio:'ignore',windowsHide:false});
  if(r.status!==0) fail('APK_INSTALLED_BUT_OPEN_FAILED');
  log('INSTALL=PASSED'); log('OPEN=PASSED'); log('PACKAGE=club.eduverse.app.preview');
  log('REAL_APP=UNTOUCHED'); log('AAB=NOT_BUILT'); log('GOOGLE_PLAY=NOT_TOUCHED');
  log('RESULT=APK_INSTALLED_AND_OPENED'); log('===== TARKAN_BITIS =====');
  return 0;
}

function selftest(){
  const samples=[['java version "1.8.0_401"',8],['openjdk version "17.0.12"',17],['openjdk version "21.0.4"',21]];
  for(const [s,e] of samples) if(parseJavaMajor(s)!==e) throw new Error('parseJavaMajor selftest failed');
  const d=fs.mkdtempSync(path.join(os.tmpdir(),'apk6e-'));
  const g=path.join(d,'build.gradle');
  fs.writeFileSync(g,'android { defaultConfig { applicationId "club.eduverse.app"\n versionCode 5 } }','utf8');
  const x=fs.readFileSync(g,'utf8').replace(/applicationId\s+["']club\.eduverse\.app["']/g,'applicationId "club.eduverse.app.preview"');
  if(!x.includes('club.eduverse.app.preview')) throw new Error('patch selftest failed');
  fs.rmSync(d,{recursive:true,force:true});
  log('SELFTEST_PARSE_JAVA=PASSED');
  log('SELFTEST_PATCH=PASSED');
}

function main(){
  if(process.argv[2]==='selftest'){ selftest(); return; }
  log('===== TARKAN_BASLANGIC =====');
  log('ISLEM=ANDROID_FILM28_PREVIEW6_APK_NODE_ONLY');
  log('MODE=NODE_ORCHESTRATOR_NO_AAB_NO_PLAY');
  log('SAFETY=TRY_FINALLY_RESTORE_BUILD_GRADLE');
  restoreQuiet();
  validateSource();
  const javaHome=nodeJavaDiagnostic();
  log('--- GRADLE_RUNTIME_CHECK ---');
  const vr=runGradle(javaHome,['--version']);
  if(vr!==0) fail('GRADLE_VERSION_CHECK_FAILED='+vr);
  let prepared=false;
  try{
    preparePreview(); prepared=true;
    log('--- APK_BUILD ---');
    const br=runGradle(javaHome,[':app:assembleDebug','--no-daemon']);
    if(br!==0) fail('PREVIEW_GRADLE_EXIT='+br);
  }finally{
    if(prepared || fs.existsSync(GRADLE_BAK) || fs.existsSync(GJSON_HOLD)) restoreQuiet();
  }
  mustFile(APK_SRC,'APK_AFTER_BUILD');
  fs.copyFileSync(APK_SRC,APK_OUT);
  log('APK='+APK_OUT);
  log('APK_SIZE='+fs.statSync(APK_OUT).size);
  log('APK_SHA256='+sha256(APK_OUT));
  installApk();
}

try{ main(); }
catch(e){
  try{ restoreQuiet(); }catch{}
  log('RESULT=STOPPED');
  if(e && e.controlled) log('REASON='+e.reason);
  else log('REASON=NODE_EXCEPTION='+String(e&&e.message||e));
  log('===== TARKAN_BITIS =====');
  process.exitCode=(e&&e.exitCode)||1;
}
