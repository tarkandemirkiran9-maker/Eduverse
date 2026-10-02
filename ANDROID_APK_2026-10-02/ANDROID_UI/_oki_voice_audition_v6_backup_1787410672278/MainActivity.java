package club.eduverse.app;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.os.Build;
import android.view.View;
import android.view.Window;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.view.WindowManager;
import android.graphics.Color;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.speech.tts.TextToSpeech;
import java.util.Locale;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  private TextToSpeech evTts;
  private TextToSpeech evHelperTts;
  private boolean evTtsReady = false;
  private boolean evHelperTtsReady = false;
  private String evPendingText = null;
  private String evPendingLang = "tr-TR";
  private String evPendingRole = "default";
  private boolean evReloadedForTts = false;
  private final AndroidTTSBridge evBridgeObj = new AndroidTTSBridge();

  @Override public void onCreate(Bundle savedInstanceState) {
    try { requestWindowFeature(Window.FEATURE_NO_TITLE); } catch (Exception e) { }
    super.onCreate(savedInstanceState);
    evPrepareWindow();
    hideSystemUI();
    evInitTts();
    evInstallBridgeSoon();
  }

  @Override public void onResume() {
    super.onResume();
    evPrepareWindow();
    hideSystemUI();
    evInstallBridgeSoon();
  }

  @Override public void onWindowFocusChanged(boolean hasFocus) {
    super.onWindowFocusChanged(hasFocus);
    if (hasFocus) { evPrepareWindow(); hideSystemUI(); evInstallBridgeSoon(); }
  }

  private void evPrepareWindow() {
    try {
      getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
      getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
      if (Build.VERSION.SDK_INT >= 21) {
        getWindow().setStatusBarColor(Color.TRANSPARENT);
        getWindow().setNavigationBarColor(Color.TRANSPARENT);
      }
      if (Build.VERSION.SDK_INT >= 28) {
        WindowManager.LayoutParams lp = getWindow().getAttributes();
        lp.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
        getWindow().setAttributes(lp);
      }
      if (Build.VERSION.SDK_INT >= 30) {
        getWindow().setDecorFitsSystemWindows(false);
      }
    } catch (Exception e) { }
  }

  private void hideSystemUI() {
    try {
      if (Build.VERSION.SDK_INT >= 30) {
        WindowInsetsController c = getWindow().getInsetsController();
        if (c != null) {
          c.hide(WindowInsets.Type.statusBars() | WindowInsets.Type.navigationBars());
          c.setSystemBarsBehavior(WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
        }
      }
      getWindow().getDecorView().setSystemUiVisibility(
        View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |
        View.SYSTEM_UI_FLAG_FULLSCREEN |
        View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
        View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
        View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
        View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
    } catch (Exception e) { }
  }

  // EV_OKI_DUAL_TTS_ENGINE_V5
  private void evInitTts() {
    try {
      if (evTts == null) {
        evTts = new TextToSpeech(this, new TextToSpeech.OnInitListener() {
          @Override public void onInit(int status) {
            evTtsReady = (status == TextToSpeech.SUCCESS);
            if (evTtsReady) {
              try { evTts.setSpeechRate(0.84f); evTts.setPitch(1.10f); evLogVoices("SAMSUNG_OKI", evTts); } catch (Exception e) { }
              if (evPendingText != null && !"helper".equalsIgnoreCase(evPendingRole)) {
                final String t = evPendingText; final String l = evPendingLang; final String p = evPendingRole;
                evPendingText = null; evSpeakNow(t, l, p);
              }
            }
          }
        }, "com.samsung.SMT");
      }
      if (evHelperTts == null) {
        evHelperTts = new TextToSpeech(this, new TextToSpeech.OnInitListener() {
          @Override public void onInit(int status) {
            evHelperTtsReady = (status == TextToSpeech.SUCCESS);
            if (evHelperTtsReady) {
              try { evHelperTts.setSpeechRate(0.92f); evHelperTts.setPitch(1.00f); evLogVoices("GOOGLE_HELPER", evHelperTts); } catch (Exception e) { }
              if (evPendingText != null && "helper".equalsIgnoreCase(evPendingRole)) {
                final String t = evPendingText; final String l = evPendingLang; final String p = evPendingRole;
                evPendingText = null; evSpeakNow(t, l, p);
              }
            }
          }
        }, "com.google.android.tts");
      }
    } catch (Exception e) { }
  }

  @SuppressLint({"SetJavaScriptEnabled", "JavascriptInterface"})
  private void evInstallBridgeNow() {
    try {
      if (getBridge() == null || getBridge().getWebView() == null) return;
      WebView w = getBridge().getWebView();
      WebSettings s = w.getSettings();
      s.setJavaScriptEnabled(true);
      s.setUseWideViewPort(true);
      s.setLoadWithOverviewMode(false);
      s.setTextZoom(100);
      try { w.setInitialScale(0); } catch (Exception e) { }
      w.addJavascriptInterface(evBridgeObj, "AndroidTTS");
      w.addJavascriptInterface(evBridgeObj, "EVAndroidTTS");
      w.addJavascriptInterface(evBridgeObj, "NativeTTS");
      if (Build.VERSION.SDK_INT >= 19) {
        try { w.evaluateJavascript("window.__EV_NATIVE_TTS_READY=1;try{document.documentElement.classList.add('ev-android-native');}catch(e){}", null); } catch (Exception e) { }
      }
      hideSystemUI();
      if (!evReloadedForTts) {
        evReloadedForTts = true;
        w.postDelayed(new Runnable() { @Override public void run() {
          try { if (getBridge() != null && getBridge().getWebView() != null) getBridge().getWebView().reload(); } catch (Exception e) { }
        }}, 350);
      }
    } catch (Exception e) { }
  }

  private void evInstallBridgeSoon() {
    try {
      getWindow().getDecorView().postDelayed(new Runnable() { @Override public void run() { evInstallBridgeNow(); hideSystemUI(); }}, 30);
      getWindow().getDecorView().postDelayed(new Runnable() { @Override public void run() { evInstallBridgeNow(); hideSystemUI(); }}, 350);
      getWindow().getDecorView().postDelayed(new Runnable() { @Override public void run() { evInstallBridgeNow(); hideSystemUI(); }}, 1200);
      getWindow().getDecorView().postDelayed(new Runnable() { @Override public void run() { hideSystemUI(); }}, 2500);
    } catch (Exception e) { }
  }

  private Locale evLocale(String lang) {
    String l = lang == null ? "" : lang.toLowerCase(Locale.ROOT);
    if (l.startsWith("de")) return Locale.GERMANY;
    if (l.startsWith("fr")) return Locale.FRANCE;
    if (l.startsWith("en")) return Locale.US;
    if (l.startsWith("ar")) return new Locale("ar", "SA");
    return new Locale("tr", "TR");
  }

  private void evLogVoices(final String engine, final TextToSpeech tts) {
    try {
      java.util.Set<android.speech.tts.Voice> voices = tts.getVoices();
      if (voices == null) return;
      for (android.speech.tts.Voice v : voices) {
        Locale vl = v.getLocale();
        String code = vl == null ? "" : vl.getLanguage();
        if ("tr".equals(code) || "de".equals(code) || "en".equals(code) || "fr".equals(code) || "ar".equals(code)) {
          android.util.Log.i("EV_TTS_INVENTORY", "ENGINE="+engine+" | NAME="+v.getName()+" | LOCALE="+vl+" | QUALITY="+v.getQuality()+" | LATENCY="+v.getLatency()+" | NETWORK="+v.isNetworkConnectionRequired());
        }
      }
    } catch (Exception e) { android.util.Log.e("EV_TTS_INVENTORY", "ERROR="+e.getMessage()); }
  }

  private void evSelectHelperVoice(final TextToSpeech tts, final String lang) {
    try {
      Locale wanted = evLocale(lang);
      java.util.Set<android.speech.tts.Voice> voices = tts.getVoices();
      if (voices == null) return;
      android.speech.tts.Voice best = null;
      int bestScore = Integer.MIN_VALUE;
      for (android.speech.tts.Voice v : voices) {
        Locale vl = v.getLocale();
        if (vl == null || !wanted.getLanguage().equals(vl.getLanguage())) continue;
        String name = v.getName() == null ? "" : v.getName().toLowerCase(Locale.ROOT);
        int score = v.getQuality();
        if (wanted.getCountry().equalsIgnoreCase(vl.getCountry())) score += 200;
        if (name.contains("network")) score += 80;
        if (name.contains("tr-tr-x-ama")) score += 2000;
        if (name.contains("tr-tr-x-tmc")) score -= 1500;
        if (score > bestScore) { bestScore = score; best = v; }
      }
      if (best != null) {
        tts.setVoice(best);
        android.util.Log.i("EV_HELPER_VOICE", "SELECTED="+best.getName()+" | LOCALE="+best.getLocale()+" | NETWORK="+best.isNetworkConnectionRequired());
      }
    } catch (Exception e) { android.util.Log.e("EV_HELPER_VOICE", "ERROR="+e.getMessage()); }
  }

  private void evSelectOkiVoice(final TextToSpeech tts, final String lang) {
    try {
      if (lang == null) return;
      String evLang = lang.toLowerCase(Locale.ROOT);
      String target = null;
      if (evLang.startsWith("tr")) target = "tr-tr-x-tmc-network";
      else if (evLang.startsWith("de")) target = "de-de-x-dea-network";
      else if (evLang.startsWith("en")) target = "en-us-x-tpf-network";
      else if (evLang.startsWith("fr")) target = "fr-fr-x-frd-network";
      else if (evLang.startsWith("ar")) target = "ar-xa-x-arc-network";
      java.util.Set<android.speech.tts.Voice> voices = tts.getVoices();
      if (target != null && voices != null) {
        for (android.speech.tts.Voice v : voices) {
          if (target.equals(v.getName())) { tts.setVoice(v); android.util.Log.i("EV_OKI_VOICE", "SELECTED="+v.getName()); break; }
        }
      }
    } catch (Exception e) { android.util.Log.e("EV_OKI_VOICE", "ERROR="+e.getMessage()); }
  }

  // EV_OKI_ROLE_VOICE_V1
  // EV_OKI_THREE_ROLE_DIALOGUE_V4
  private void evSpeakNow(final String text, final String lang) {
    evSpeakNow(text, lang, "default");
  }

  private void evSpeakNow(final String text, final String lang, final String role) {
    try {
      if (text == null || text.trim().length() == 0) return;
      boolean helper = "helper".equalsIgnoreCase(role);
      TextToSpeech target = helper && evHelperTtsReady && evHelperTts != null ? evHelperTts : evTts;
      if (target == null) return;
      int r = target.setLanguage(evLocale(lang));
      if (r == TextToSpeech.LANG_MISSING_DATA || r == TextToSpeech.LANG_NOT_SUPPORTED) r = target.setLanguage(new Locale("tr", "TR"));
      if (helper) evSelectHelperVoice(target, lang); else evSelectOkiVoice(target, lang);
      float rate = 0.90f; float pitch = 1.08f;
      if (helper) { rate = 0.92f; pitch = 1.00f; }
      else if ("child".equalsIgnoreCase(role)) { rate = 0.82f; pitch = 1.18f; }
      else if ("oki".equalsIgnoreCase(role)) { rate = 0.84f; pitch = 1.10f; }
      target.setSpeechRate(rate); target.setPitch(pitch);
      if (Build.VERSION.SDK_INT >= 21) target.speak(text, TextToSpeech.QUEUE_FLUSH, null, "EV_TTS_" + System.currentTimeMillis());
      else target.speak(text, TextToSpeech.QUEUE_FLUSH, null);
    } catch (Exception e) { }
  }

  public class AndroidTTSBridge {
    @JavascriptInterface public String ping() { return "OK"; }
    @JavascriptInterface public void warm() { runOnUiThread(new Runnable() { @Override public void run() { evInitTts(); hideSystemUI(); }}); }
    @JavascriptInterface public void immersive() { runOnUiThread(new Runnable() { @Override public void run() { evPrepareWindow(); hideSystemUI(); }}); }
    @JavascriptInterface public void stop() {
      runOnUiThread(new Runnable() { @Override public void run() {
        try { if (evTts != null) evTts.stop(); if (evHelperTts != null) evHelperTts.stop(); } catch (Exception e) { }
        hideSystemUI();
      }});
    }
    @JavascriptInterface public void speakStyled(final String text, final String lang, final String role) {
      runOnUiThread(new Runnable() { @Override public void run() {
        try {
          evPrepareWindow(); hideSystemUI(); evInitTts();
          if (evTts == null || text == null || text.trim().length() == 0) return;
          boolean helperRole = "helper".equalsIgnoreCase(role);
          if ((helperRole && !evHelperTtsReady) || (!helperRole && !evTtsReady)) {
            evPendingText = text; evPendingLang = lang; evPendingRole = role; return;
          }
          evSpeakNow(text, lang, role);
        } catch (Exception e) { }
      }});
    }

    @JavascriptInterface public void speak(final String text, final String lang) {
      runOnUiThread(new Runnable() { @Override public void run() {
        try {
          evPrepareWindow(); hideSystemUI(); evInitTts();
          if (evTts == null || text == null || text.trim().length() == 0) return;
          if (!evTtsReady) { evPendingText = text; evPendingLang = lang; evPendingRole = "default"; return; }
          evSpeakNow(text, lang);
        } catch (Exception e) { }
      }});
    }
  }

  @Override public void onDestroy() {
    try { if (evTts != null) { evTts.stop(); evTts.shutdown(); evTts = null; } if (evHelperTts != null) { evHelperTts.stop(); evHelperTts.shutdown(); evHelperTts = null; } } catch (Exception e) { }
    super.onDestroy();
  }
}
