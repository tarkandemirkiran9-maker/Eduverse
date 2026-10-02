(function(w){
'use strict';
if(w.EVIOSParentGate && w.EVIOSParentGate.__v1){ return; }

var recoveryTimer = null;

function store(){
  try{
    if(
      w.EVIOSStore &&
      typeof w.EVIOSStore.enabled === 'function' &&
      w.EVIOSStore.enabled() === true
    ){
      return w.EVIOSStore;
    }
  }catch(e){}
  return null;
}

function t(key){
  try{
    if(typeof w.evParentT === 'function'){ return w.evParentT(key); }
  }catch(e){}
  return String(key || '');
}

function base(title,info){
  if(typeof w.evParentBase !== 'function'){ return null; }
  return w.evParentBase(title,info);
}

function message(text){
  try{
    if(typeof w.evParentMessage === 'function'){
      w.evParentMessage(String(text || ''));
    }
  }catch(e){}
}

function input(label){
  return typeof w.evParentInput === 'function' ? w.evParentInput(label) : null;
}

function button(label,secondary){
  return typeof w.evParentButton === 'function' ? w.evParentButton(label,secondary) : null;
}

function close(){
  stopRecovery();
  try{
    if(typeof w.evParentClose === 'function'){ w.evParentClose(); }
  }catch(e){}
}

function validPin(pin){
  return /^\d{4}$/.test(String(pin || ''));
}

function stopRecovery(){
  if(recoveryTimer){
    clearTimeout(recoveryTimer);
    recoveryTimer = null;
  }
}

function unavailable(){
  base(t('title'),t('unavailable'));
}

function locked(productId,status){
  var box = base(t('title'),t('locked'));
  if(!box){ return; }

  var remaining = Number(status && status.remainingSeconds || 0);
  if(remaining > 0){
    message(t('locked') + ' (' + Math.ceil(remaining) + ' s)');
  }

  var forgot = button(t('forgot'),true);
  var cancel = button(t('cancel'),true);

  if(forgot){
    forgot.onclick = function(){ beginRecovery(productId); };
    box.appendChild(forgot);
  }
  if(cancel){
    cancel.onclick = close;
    box.appendChild(cancel);
  }
}

async function create(productId,notice){
  var bridge = store();
  if(!bridge){ unavailable(); return; }

  var box = base(t('createTitle'),t('createInfo'));
  if(!box){ return; }
  if(notice){ message(notice); }

  var p1 = input(t('pin'));
  var p2 = input(t('pinAgain'));
  var createButton = button(t('create'),false);
  var cancel = button(t('cancel'),true);

  if(!p1 || !p2 || !createButton || !cancel){ unavailable(); return; }

  createButton.onclick = async function(){
    var a = p1.value;
    var b = p2.value;

    if(!validPin(a) || !validPin(b)){ message(t('fourDigits')); return; }
    if(a !== b){ message(t('mismatch')); return; }

    createButton.disabled = true;
    var result = await bridge.createParentPin(a,b);
    p1.value = '';
    p2.value = '';

    if(result && result.ok === true && result.code === 'PIN_CREATED'){
      await verify(productId,t('created'));
      return;
    }

    message((result && result.code) || t('authFailed'));
    createButton.disabled = false;
  };

  cancel.onclick = close;
  box.appendChild(p1);
  box.appendChild(p2);
  box.appendChild(createButton);
  box.appendChild(cancel);

  setTimeout(function(){ try{ p1.focus(); }catch(e){} },50);
}

async function verify(productId,notice){
  var bridge = store();
  if(!bridge){ unavailable(); return; }

  var status = await bridge.getParentGateStatus();

  if(!status || status.hasPin !== true){
    await create(productId,notice);
    return;
  }

  if(status.locked === true){
    locked(productId,status);
    return;
  }

  var box = base(t('title'),t('verifyInfo'));
  if(!box){ return; }
  if(notice){ message(notice); }

  var pin = input(t('pin'));
  var approve = button(t('approve'),false);
  var forgot = button(t('forgot'),true);
  var cancel = button(t('cancel'),true);

  if(!pin || !approve || !forgot || !cancel){ unavailable(); return; }

  approve.onclick = async function(){
    if(!validPin(pin.value)){ message(t('fourDigits')); return; }

    approve.disabled = true;
    forgot.disabled = true;

    var auth = await bridge.authorizePurchaseWithParentPin(
      String(productId || ''),
      pin.value
    );
    pin.value = '';

    if(auth && auth.ok === true && auth.code === 'AUTHORIZED'){
      message(t('preparing'));

      var launch = await bridge.launchPurchase(String(productId || ''));

      if(launch && launch.ok === true){
        try{ await bridge.refresh(); }catch(e){}
        close();
        return;
      }

      message(String((launch && (launch.purchaseState || launch.code)) || t('authFailed')));
      approve.disabled = false;
      forgot.disabled = false;
      return;
    }

    if(auth && auth.code === 'LOCKED'){
      locked(productId,auth);
      return;
    }

    message((auth && auth.code) || t('authFailed'));
    approve.disabled = false;
    forgot.disabled = false;

    var fresh = await bridge.getParentGateStatus();
    if(fresh && fresh.locked === true){ locked(productId,fresh); }
  };

  forgot.onclick = function(){ beginRecovery(productId); };
  cancel.onclick = close;

  box.appendChild(pin);
  box.appendChild(approve);
  box.appendChild(forgot);
  box.appendChild(cancel);

  setTimeout(function(){ try{ pin.focus(); }catch(e){} },50);
}

async function beginRecovery(productId){
  var bridge = store();
  if(!bridge){ unavailable(); return; }

  var box = base(t('title'),t('deviceAuth'));
  if(!box){ return; }

  var cancel = button(t('cancel'),true);
  if(cancel){
    cancel.onclick = close;
    box.appendChild(cancel);
  }

  var begin = await bridge.beginParentPinRecovery();

  if(
    !begin ||
    (
      begin.ok !== true &&
      begin.code !== 'PROMPT_STARTED' &&
      begin.code !== 'ALREADY_AUTHORIZED'
    )
  ){
    message((begin && begin.code) || t('recoveryFailed'));
    return;
  }

  if(begin.authorized === true || begin.code === 'ALREADY_AUTHORIZED'){
    await reset(productId);
    return;
  }

  stopRecovery();
  var startedAt = Date.now();

  async function poll(){
    try{
      var r = await bridge.getParentRecoveryStatus();

      if(r && r.authorized === true){
        stopRecovery();
        await reset(productId);
        return;
      }

      var code = String((r && r.code) || '');
      if(
        code === 'CANCELLED' ||
        code === 'FAILED_RETRY' ||
        code === 'PROMPT_START_ERROR' ||
        code === 'DEVICE_AUTH_UNAVAILABLE'
      ){
        stopRecovery();
        message(t('recoveryFailed'));
        return;
      }

      if(Date.now() - startedAt > 120000){
        stopRecovery();
        message(t('recoveryFailed'));
        return;
      }
    }catch(e){}

    recoveryTimer = setTimeout(poll,500);
  }

  recoveryTimer = setTimeout(poll,500);
}

async function reset(productId){
  var bridge = store();
  if(!bridge){ unavailable(); return; }

  var box = base(t('resetTitle'),t('resetInfo'));
  if(!box){ return; }

  var p1 = input(t('pin'));
  var p2 = input(t('pinAgain'));
  var resetButton = button(t('reset'),false);
  var cancel = button(t('cancel'),true);

  if(!p1 || !p2 || !resetButton || !cancel){ unavailable(); return; }

  resetButton.onclick = async function(){
    var a = p1.value;
    var b = p2.value;

    if(!validPin(a) || !validPin(b)){ message(t('fourDigits')); return; }
    if(a !== b){ message(t('mismatch')); return; }

    resetButton.disabled = true;
    var result = await bridge.resetParentPinAfterDeviceAuth(a,b);
    p1.value = '';
    p2.value = '';

    if(result && result.ok === true && result.code === 'PIN_RESET'){
      await verify(productId,t('resetDone'));
      return;
    }

    message((result && result.code) || t('authFailed'));
    resetButton.disabled = false;
  };

  cancel.onclick = close;
  box.appendChild(p1);
  box.appendChild(p2);
  box.appendChild(resetButton);
  box.appendChild(cancel);

  setTimeout(function(){ try{ p1.focus(); }catch(e){} },50);
}

async function begin(productId){
  var bridge = store();
  if(!bridge){ unavailable(); return; }

  var status = await bridge.getParentGateStatus();

  if(status && status.hasPin === true){
    if(status.locked === true){ locked(productId,status); }
    else{ await verify(productId,''); }
  }else{
    await create(productId,'');
  }
}

w.EVIOSParentGate = {
  __v1:true,
  begin:begin,
  close:close
};
})(window);

