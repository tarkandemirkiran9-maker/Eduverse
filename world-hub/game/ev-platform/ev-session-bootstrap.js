(function(w){
  'use strict';
  if(w.EVSessionBootstrap && w.EVSessionBootstrap.__v1){ return; }

  var state='IDLE';

  async function run(){
    if(state==='RUNNING'){ return false; }
    var cfg=w.EV_CONFIG||{};
    if(cfg.backendEnabled!==true){
      state='DISABLED';
      return false;
    }
    if(!w.EVAccount || typeof w.EVAccount.refresh!=='function'){
      state='NO_ACCOUNT_LAYER';
      return false;
    }

    state='RUNNING';
    try{
      var account=await w.EVAccount.refresh();
      state=account && account.status==='SIGNED_IN' ? 'SIGNED_IN' : 'SIGNED_OUT';
      try{
        w.dispatchEvent(new CustomEvent('eduverse:account-ready',{detail:account||{status:'SIGNED_OUT'}}));
      }catch(e){}
      return state==='SIGNED_IN';
    }catch(e){
      state='FAILED_SAFE';
      return false;
    }
  }

  function boot(){
    if(document.readyState==='loading'){
      document.addEventListener('DOMContentLoaded',run,{once:true});
    }else{
      run();
    }
  }

  w.EVSessionBootstrap={
    __v1:true,
    run:run,
    status:function(){return state;}
  };

  boot();
})(window);

