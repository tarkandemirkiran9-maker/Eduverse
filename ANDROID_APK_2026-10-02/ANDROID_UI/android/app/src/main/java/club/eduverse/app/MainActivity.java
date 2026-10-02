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
import android.content.SharedPreferences;
import android.util.Base64;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import android.app.KeyguardManager;
import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;
import java.util.concurrent.Executor;
import java.util.List;
import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.PendingPurchasesParams;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.AcknowledgePurchaseParams;
import com.android.billingclient.api.PurchasesUpdatedListener;
import com.android.billingclient.api.QueryPurchasesParams;
import com.android.billingclient.api.ProductDetails;
import com.android.billingclient.api.ProductDetailsResponseListener;
import com.android.billingclient.api.QueryProductDetailsParams;
import com.android.billingclient.api.QueryProductDetailsResult;
import java.util.ArrayList;
import java.util.Locale;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  private TextToSpeech evTts;
  private TextToSpeech evHelperTts;
  private boolean evTtsReady = false;
  private boolean evHelperTtsReady = false;
  // EV_OKI_HELPER_FIXED_CFS_V7
  private String evPendingText = null;
  private String evPendingLang = "tr-TR";
  private String evPendingRole = "default";
  private boolean evReloadedForTts = false;
  private final AndroidTTSBridge evBridgeObj = new AndroidTTSBridge();
  private final EVAccessBridge evAccessBridgeObj = new EVAccessBridge();

  // ============================================================
  // EV_PLAY_BILLING_V1
  // Google Play Billing: bağlantı + sahiplik sorgusu.
  // Bu fazda gerçek ödeme başlatma metodu kullanılmaz.
  // ============================================================
  private static final String EV_PRODUCT_FIVE =
      "eduverse_5_room_pack";

  private static final String EV_PRODUCT_FULL =
      "eduverse_full_access";

  private static final String EV_PRODUCT_UPGRADE =
      "eduverse_full_upgrade";

  // EV_ASKIDA_GIFT_NATIVE_V1
  // Gift is repeatable consumable; never an access entitlement.
  private static final String EV_PRODUCT_GIFT =
      "eduverse_gift_full_access";
  private static final String EV_GIFT_VERIFY_URL =
      "https://api.eduverse.club/v1/gifts/verify";

  private volatile String evLastGiftState = "IDLE";
  private volatile String evLastGiftCode = "";
  private volatile String evLastGiftId = "";
  private volatile String evLastGiftError = "";
  private volatile boolean evGiftSubmitInFlight = false;

  private BillingClient evBillingClient = null;
  private volatile boolean evBillingReady = false;
  private volatile boolean evBillingConnecting = false;

  private volatile boolean evOwnFiveProduct = false;
  private volatile boolean evOwnFullProduct = false;
  private volatile boolean evOwnUpgradeProduct = false;

  private volatile String evLastBillingState =
      "NOT_INITIALIZED";

  // ============================================================
  // EV_PLAY_ACKNOWLEDGE_V1
  // Yalnız EduVerse erişim ürünleri için acknowledge.
  // Purchase token JavaScript katmanına verilmez.
  // ============================================================
  private volatile String evLastAcknowledgeState =
      "NOT_REQUIRED";
  private final PurchasesUpdatedListener
      evPurchasesUpdatedListener =
      new PurchasesUpdatedListener() {

        @Override
        public void onPurchasesUpdated(
            BillingResult billingResult,
            List<Purchase> purchases
        ) {
          try {
            int code =
                billingResult.getResponseCode();

            if (
                code ==
                BillingClient.BillingResponseCode.OK
            ) {
              evLastBillingState =
                  "PURCHASE_UPDATE_OK";

              evRefreshOwnedPurchases();

            } else if (
                code ==
                BillingClient.BillingResponseCode.ITEM_ALREADY_OWNED
            ) {
              // EV_ITEM_ALREADY_OWNED_AUTO_RESTORE_V1
              evLastBillingState =
                  "ITEM_ALREADY_OWNED_REFRESHING";

              evRefreshOwnedPurchases();

            } else if (
                code ==
                BillingClient.BillingResponseCode.USER_CANCELED
            ) {
              evLastBillingState =
                  "USER_CANCELED";

            } else {
              evLastBillingState =
                  "PURCHASE_UPDATE_CODE_" + code;
            }

          } catch (Exception e) {
            evLastBillingState =
                "PURCHASE_UPDATE_ERROR";
          }
        }
      };

  @Override public void onCreate(Bundle savedInstanceState) {
    try { requestWindowFeature(Window.FEATURE_NO_TITLE); } catch (Exception e) { }
    super.onCreate(savedInstanceState);
    evPrepareWindow();
    hideSystemUI();
    evInitTts();
    evInstallBridgeSoon();
    evInitBilling();
  }

  @Override public void onResume() {
    super.onResume();
    evPrepareWindow();
    hideSystemUI();
    evInstallBridgeSoon();
    evInitBilling();
    evRefreshOwnedPurchases();
    evRefreshProductCatalog();
  }

  @Override public void onWindowFocusChanged(boolean hasFocus) {
    super.onWindowFocusChanged(hasFocus);
    if (hasFocus) { evPrepareWindow(); hideSystemUI(); evInstallBridgeSoon(); }
  }

  private void evPrepareWindow() {
    try {
      getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
      getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
      androidx.core.view.WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
      if (Build.VERSION.SDK_INT >= 28) {
        WindowManager.LayoutParams lp = getWindow().getAttributes();
        lp.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
        getWindow().setAttributes(lp);
      }
    } catch (Exception e) { }
  }

  private void hideSystemUI() {
    try {
      androidx.core.view.WindowInsetsControllerCompat c =
          androidx.core.view.WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
      c.hide(androidx.core.view.WindowInsetsCompat.Type.systemBars());
      c.setSystemBarsBehavior(
          androidx.core.view.WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
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
      w.addJavascriptInterface(evAccessBridgeObj, "EVAccess");
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
      android.speech.tts.Voice selected = null;
      String preferred = "tr".equals(wanted.getLanguage()) ? "tr-tr-x-cfs-network" : null;
      String fallback = "tr".equals(wanted.getLanguage()) ? "tr-tr-x-cfs-local" : null;
      if (preferred != null) {
        for (android.speech.tts.Voice v : voices) {
          if (preferred.equals(v.getName())) { selected = v; break; }
        }
      }
      if (selected == null && fallback != null) {
        for (android.speech.tts.Voice v : voices) {
          if (fallback.equals(v.getName())) { selected = v; break; }
        }
      }
      if (selected == null) {
        int bestScore = Integer.MIN_VALUE;
        for (android.speech.tts.Voice v : voices) {
          Locale vl = v.getLocale();
          if (vl == null || !wanted.getLanguage().equals(vl.getLanguage())) continue;
          int score = v.getQuality();
          if (wanted.getCountry().equalsIgnoreCase(vl.getCountry())) score += 200;
          if (score > bestScore) { bestScore = score; selected = v; }
        }
      }
      if (selected != null) {
        tts.setVoice(selected);
        android.util.Log.i("EV_HELPER_VOICE", "FIXED_CFS_V7 | SELECTED="+selected.getName()+" | LOCALE="+selected.getLocale()+" | NETWORK="+selected.isNetworkConnectionRequired());
      }
    } catch (Exception e) { android.util.Log.e("EV_HELPER_VOICE", "FIXED_CFS_V7_ERROR="+e.getMessage()); }
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

  // ============================================================
  // EV_PARENT_SECURITY_V1
  // Native ebeveyn PIN güvenlik katmanı.
  // PIN Web localStorage içine kaydedilmez.
  // ============================================================
  private static final String EV_PARENT_PREFS = "ev_parent_security_v1";
  private static final String EV_PIN_HASH = "pin_hash";
  private static final String EV_PIN_SALT = "pin_salt";
  private static final String EV_PIN_FAILS = "pin_fails";
  private static final String EV_PIN_LOCK_UNTIL = "pin_lock_until";

  private static final int EV_PIN_MAX_FAILS = 5;
  private static final long EV_PIN_LOCK_MS = 15L * 60L * 1000L;
  private static final int EV_PIN_HASH_ROUNDS = 120000;

  private SharedPreferences evParentPrefs() {
    return getSharedPreferences(EV_PARENT_PREFS, MODE_PRIVATE);
  }

  private boolean evValidParentPin(String pin) {
    return pin != null && pin.matches("\\d{4}");
  }

  private String evB64(byte[] data) {
    return Base64.encodeToString(data, Base64.NO_WRAP);
  }

  private byte[] evB64Decode(String data) {
    return Base64.decode(data, Base64.NO_WRAP);
  }

  private String evHashParentPin(String pin, byte[] salt) throws Exception {
    MessageDigest md = MessageDigest.getInstance("SHA-256");
    md.update(salt);
    byte[] out = md.digest(pin.getBytes(StandardCharsets.UTF_8));

    for (int i = 1; i < EV_PIN_HASH_ROUNDS; i++) {
      md.reset();
      md.update(salt);
      out = md.digest(out);
    }

    return evB64(out);
  }

  private boolean evParentPinExists(SharedPreferences p) {
    String hash = p.getString(EV_PIN_HASH, "");
    String salt = p.getString(EV_PIN_SALT, "");

    return hash != null &&
        hash.length() > 0 &&
        salt != null &&
        salt.length() > 0;
  }

  private String evParentJson(
      boolean ok,
      String code,
      boolean hasPin,
      boolean locked,
      long remainingSeconds,
      int attemptsRemaining
  ) {
    return "{"
        + "\"ok\":" + ok
        + ",\"code\":\"" + code + "\""
        + ",\"hasPin\":" + hasPin
        + ",\"locked\":" + locked
        + ",\"remainingSeconds\":" + remainingSeconds
        + ",\"attemptsRemaining\":" + attemptsRemaining
        + "}";
  }

  private void evNormalizeExpiredParentLock(SharedPreferences p) {
    long now = System.currentTimeMillis();
    long until = p.getLong(EV_PIN_LOCK_UNTIL, 0L);

    if (until > 0L && until <= now) {
      p.edit()
          .putInt(EV_PIN_FAILS, 0)
          .putLong(EV_PIN_LOCK_UNTIL, 0L)
          .commit();
    }
  }

  // ============================================================
  // EV_PARENT_RECOVERY_V1
  // PIN unutulduğunda cihazın kendi güvenlik doğrulaması gerekir.
  // Başarılı doğrulama yalnızca kısa süreli yeni-PIN yetkisi verir.
  // ============================================================
  private static final long EV_PARENT_RECOVERY_WINDOW_MS =
      2L * 60L * 1000L;

  private volatile long evParentRecoveryAuthorizedUntil = 0L;
  private volatile String evParentRecoveryState = "IDLE";

  private String evParentRecoveryJson(
      boolean ok,
      String code,
      boolean authorized,
      long remainingSeconds
  ) {
    return "{"
        + "\"ok\":" + ok
        + ",\"code\":\"" + code + "\""
        + ",\"authorized\":" + authorized
        + ",\"remainingSeconds\":" + remainingSeconds
        + "}";
  }

  private boolean evParentRecoveryAuthorized() {
    return evParentRecoveryAuthorizedUntil >
        System.currentTimeMillis();
  }

  private void evClearExpiredRecoveryAuthorization() {
    if (
        evParentRecoveryAuthorizedUntil > 0L &&
        evParentRecoveryAuthorizedUntil <= System.currentTimeMillis()
    ) {
      evParentRecoveryAuthorizedUntil = 0L;

      if ("AUTHORIZED".equals(evParentRecoveryState)) {
        evParentRecoveryState = "EXPIRED";
      }
    }
  }
  // ============================================================
  // EV_PLAY_PRODUCT_DETAILS_V1
  // Play Store ürün bilgisi + yerelleştirilmiş fiyat.
  // ProductDetails nesnesi kalıcı cache edilmez.
  // ============================================================
  private volatile boolean evProductFiveAvailable = false;
  private volatile boolean evProductFullAvailable = false;
  private volatile boolean evProductUpgradeAvailable = false;
  private volatile boolean evProductGiftAvailable = false; // EV_GIFT_CATALOG_V1

  private volatile String evProductFiveName = "";
  private volatile String evProductFullName = "";
  private volatile String evProductUpgradeName = "";
  private volatile String evProductGiftName = "";

  private volatile String evProductFivePrice = "";
  private volatile String evProductFullPrice = "";
  private volatile String evProductUpgradePrice = "";
  private volatile String evProductGiftPrice = "";

  private volatile int evProductUnfetchedCount = 0;

  private volatile String evLastProductCatalogState =
      "NOT_QUERIED";

  private String evJsonEscape(String value) {
    if (value == null) return "";

    return value
        .replace("\\", "\\\\")
        .replace("\"", "\\\"")
        .replace("\r", "\\r")
        .replace("\n", "\\n")
        .replace("\t", "\\t");
  }

  private String evProductFormattedPrice(
      ProductDetails details
  ) {
    try {
      if (details == null) return "";

      ProductDetails.OneTimePurchaseOfferDetails offer = null;

      List<ProductDetails.OneTimePurchaseOfferDetails> offers =
          details.getOneTimePurchaseOfferDetailsList();

      if (
          offers != null &&
          !offers.isEmpty()
      ) {
        offer = offers.get(0);
      } else {
        offer =
            details.getOneTimePurchaseOfferDetails();
      }

      if (offer == null) return "";

      String price = offer.getFormattedPrice();

      return price == null ? "" : price;

    } catch (Exception e) {
      return "";
    }
  }

  private void evClearProductCatalogSnapshot() {
    evProductFiveAvailable = false;
    evProductFullAvailable = false;
    evProductUpgradeAvailable = false;
    evProductGiftAvailable = false;

    evProductFiveName = "";
    evProductFullName = "";
    evProductUpgradeName = "";
    evProductGiftName = "";

    evProductFivePrice = "";
    evProductFullPrice = "";
    evProductUpgradePrice = "";
    evProductGiftPrice = "";

    evProductUnfetchedCount = 0;
  }

  private void evApplyProductDetails(
      QueryProductDetailsResult result
  ) {
    try {
      evClearProductCatalogSnapshot();

      if (result == null) {
        evLastProductCatalogState =
            "NULL_RESULT";
        return;
      }

      List<ProductDetails> detailsList =
          result.getProductDetailsList();

      if (detailsList != null) {
        for (ProductDetails details : detailsList) {

          if (details == null) continue;

          String id = details.getProductId();
          String name = details.getName();
          String price =
              evProductFormattedPrice(details);

          if (EV_PRODUCT_FIVE.equals(id)) {
            evProductFiveAvailable = true;
            evProductFiveName =
                name == null ? "" : name;
            evProductFivePrice = price;
          }

          if (EV_PRODUCT_FULL.equals(id)) {
            evProductFullAvailable = true;
            evProductFullName =
                name == null ? "" : name;
            evProductFullPrice = price;
          }

          if (EV_PRODUCT_UPGRADE.equals(id)) {
            evProductUpgradeAvailable = true;
            evProductUpgradeName =
                name == null ? "" : name;
            evProductUpgradePrice = price;
          }

          if (EV_PRODUCT_GIFT.equals(id)) {
            evProductGiftAvailable = true;
            evProductGiftName =
                name == null ? "" : name;
            evProductGiftPrice = price;
          }
        }
      }

      if (result.getUnfetchedProductList() != null) {
        evProductUnfetchedCount =
            result
                .getUnfetchedProductList()
                .size();
      }

      evLastProductCatalogState =
          "CATALOG_UPDATED";

    } catch (Exception e) {
      evLastProductCatalogState =
          "CATALOG_APPLY_ERROR";
    }
  }

  private void evRefreshProductCatalog() {
    try {
      if (
          evBillingClient == null ||
          !evBillingClient.isReady()
      ) {
        evLastProductCatalogState =
            "BILLING_NOT_READY";
        return;
      }

      ArrayList<QueryProductDetailsParams.Product>
          productList = new ArrayList<>();

      productList.add(
          QueryProductDetailsParams.Product
              .newBuilder()
              .setProductId(EV_PRODUCT_FIVE)
              .setProductType(
                  BillingClient.ProductType.INAPP
              )
              .build()
      );

      productList.add(
          QueryProductDetailsParams.Product
              .newBuilder()
              .setProductId(EV_PRODUCT_FULL)
              .setProductType(
                  BillingClient.ProductType.INAPP
              )
              .build()
      );

      productList.add(
          QueryProductDetailsParams.Product
              .newBuilder()
              .setProductId(EV_PRODUCT_UPGRADE)
              .setProductType(
                  BillingClient.ProductType.INAPP
              )
              .build()
      );

      productList.add(
          QueryProductDetailsParams.Product
              .newBuilder()
              .setProductId(EV_PRODUCT_GIFT)
              .setProductType(
                  BillingClient.ProductType.INAPP
              )
              .build()
      );

      QueryProductDetailsParams params =
          QueryProductDetailsParams
              .newBuilder()
              .setProductList(productList)
              .build();

      evLastProductCatalogState =
          "QUERYING";

      evBillingClient.queryProductDetailsAsync(
          params,
          new ProductDetailsResponseListener() {

            @Override
            public void onProductDetailsResponse(
                BillingResult billingResult,
                QueryProductDetailsResult result
            ) {
              try {
                if (
                    billingResult.getResponseCode() ==
                    BillingClient.BillingResponseCode.OK
                ) {
                  evApplyProductDetails(result);

                } else {
                  evLastProductCatalogState =
                      "QUERY_CODE_" +
                      billingResult.getResponseCode();
                }

              } catch (Exception e) {
                evLastProductCatalogState =
                    "QUERY_CALLBACK_ERROR";
              }
            }
          }
      );

    } catch (Exception e) {
      evLastProductCatalogState =
          "QUERY_START_ERROR";
    }
  }

  private String evProductCatalogJson() {
    return "{"
        + "\"ok\":true"
        + ",\"state\":\""
        + evJsonEscape(evLastProductCatalogState)
        + "\""
        + ",\"unfetchedCount\":"
        + evProductUnfetchedCount

        + ",\"five\":{"
        + "\"id\":\""
        + EV_PRODUCT_FIVE
        + "\""
        + ",\"available\":"
        + evProductFiveAvailable
        + ",\"name\":\""
        + evJsonEscape(evProductFiveName)
        + "\""
        + ",\"price\":\""
        + evJsonEscape(evProductFivePrice)
        + "\"}"

        + ",\"full\":{"
        + "\"id\":\""
        + EV_PRODUCT_FULL
        + "\""
        + ",\"available\":"
        + evProductFullAvailable
        + ",\"name\":\""
        + evJsonEscape(evProductFullName)
        + "\""
        + ",\"price\":\""
        + evJsonEscape(evProductFullPrice)
        + "\"}"

        + ",\"upgrade\":{"
        + "\"id\":\""
        + EV_PRODUCT_UPGRADE
        + "\""
        + ",\"available\":"
        + evProductUpgradeAvailable
        + ",\"name\":\""
        + evJsonEscape(evProductUpgradeName)
        + "\""
        + ",\"price\":\""
        + evJsonEscape(evProductUpgradePrice)
        + "\"}"

        + ",\"gift\":{"
        + "\"id\":\""
        + EV_PRODUCT_GIFT
        + "\""
        + ",\"available\":"
        + evProductGiftAvailable
        + ",\"name\":\""
        + evJsonEscape(evProductGiftName)
        + "\""
        + ",\"price\":\""
        + evJsonEscape(evProductGiftPrice)
        + "\"}"

        + "}";
  }
  private synchronized void evInitBilling() {
    try {
      if (evBillingClient == null) {
        evBillingClient =
            BillingClient
                .newBuilder(MainActivity.this)
                .setListener(
                    evPurchasesUpdatedListener
                )
                .enablePendingPurchases(
                    PendingPurchasesParams
                        .newBuilder()
                        .enableOneTimeProducts()
                        .build()
                )
                .enableAutoServiceReconnection()
                .build();
      }

      if (
          evBillingReady ||
          evBillingConnecting ||
          evBillingClient.isReady()
      ) {
        if (evBillingClient.isReady()) {
          evBillingReady = true;
        }

        return;
      }

      evBillingConnecting = true;
      evLastBillingState = "CONNECTING";

      evBillingClient.startConnection(
          new BillingClientStateListener() {

            @Override
            public void onBillingSetupFinished(
                BillingResult billingResult
            ) {
              evBillingConnecting = false;

              if (
                  billingResult.getResponseCode() ==
                  BillingClient.BillingResponseCode.OK
              ) {
                evBillingReady = true;
                evLastBillingState = "READY";

                evRefreshOwnedPurchases();
                evRefreshProductCatalog();

              } else {
                evBillingReady = false;

                evLastBillingState =
                    "SETUP_CODE_" +
                    billingResult.getResponseCode();
              }
            }

            @Override
            public void onBillingServiceDisconnected() {
              evBillingReady = false;
              evBillingConnecting = false;
              evLastBillingState = "DISCONNECTED";
            }
          }
      );

    } catch (Exception e) {
      evBillingReady = false;
      evBillingConnecting = false;
      evLastBillingState = "INIT_ERROR";
    }
  }

  private void evAcknowledgePurchaseIfNeeded(
      Purchase purchase
  ) {
    try {
      if (purchase == null) {
        return;
      }

      /*
       * PENDING işlem kesinlikle acknowledge edilmez.
       */
      if (
          purchase.getPurchaseState() !=
          Purchase.PurchaseState.PURCHASED
      ) {
        evLastAcknowledgeState =
            "NOT_PURCHASED";

        return;
      }

      /*
       * Daha önce acknowledge edilmişse tekrar gönderme.
       */
      if (purchase.isAcknowledged()) {
        evLastAcknowledgeState =
            "ALREADY_ACKNOWLEDGED";

        return;
      }

      if (
          evBillingClient == null ||
          !evBillingClient.isReady()
      ) {
        evLastAcknowledgeState =
            "BILLING_NOT_READY";

        return;
      }

      String purchaseToken =
          purchase.getPurchaseToken();

      if (
          purchaseToken == null ||
          purchaseToken.trim().length() == 0
      ) {
        evLastAcknowledgeState =
            "TOKEN_MISSING";

        return;
      }

      AcknowledgePurchaseParams params =
          AcknowledgePurchaseParams
              .newBuilder()
              .setPurchaseToken(purchaseToken)
              .build();

      evLastAcknowledgeState =
          "ACKNOWLEDGING";

      evBillingClient.acknowledgePurchase(
          params,
          billingResult -> {
            try {
              int code =
                  billingResult.getResponseCode();

              if (
                  code ==
                  BillingClient.BillingResponseCode.OK
              ) {
                evLastAcknowledgeState =
                    "ACKNOWLEDGED";

                /*
                 * Play durumunu yeniden okuyarak
                 * entitlement snapshot'ını tazele.
                 */
                evRefreshOwnedPurchases();

              } else {
                evLastAcknowledgeState =
                    "ACK_CODE_" + code;
              }

            } catch (Exception e) {
              evLastAcknowledgeState =
                  "ACK_CALLBACK_ERROR";
            }
          }
      );

    } catch (Exception e) {
      evLastAcknowledgeState =
          "ACK_START_ERROR";
    }
  }
  private void evApplyOwnedPurchases(
      List<Purchase> purchases
  ) {
    boolean five = false;
    boolean full = false;
    boolean upgrade = false;

    try {
      if (purchases != null) {

        for (Purchase purchase : purchases) {
          // Gift is never acknowledged here; backend verifies + consumes.
          evHandleGiftPurchaseIfPresent(purchase);

          /*
           * Pending işlem erişim açmaz.
           * Yalnız PURCHASED değerlendirilir.
           */
          if (
              purchase.getPurchaseState() !=
              Purchase.PurchaseState.PURCHASED
          ) {
            continue;
          }

          List<String> products =
              purchase.getProducts();

          if (products == null) {
            continue;
          }

          boolean knownEduVerseAccessProduct = false;

          for (String product : products) {

            if (
                EV_PRODUCT_FIVE.equals(product)
            ) {
              five = true;
              knownEduVerseAccessProduct = true;
            }

            if (
                EV_PRODUCT_FULL.equals(product)
            ) {
              full = true;
              knownEduVerseAccessProduct = true;
            }

            if (
                EV_PRODUCT_UPGRADE.equals(product)
            ) {
              upgrade = true;
              knownEduVerseAccessProduct = true;
            }
          }

          /*
           * Başka bir INAPP ürünü varsa ona dokunma.
           * Yalnız tanımlı EduVerse erişim ürünleri işlenir.
           */
          if (knownEduVerseAccessProduct) {
            evAcknowledgePurchaseIfNeeded(
                purchase
            );
          }
        }
      }

      evOwnFiveProduct = five;
      evOwnFullProduct = full;
      evOwnUpgradeProduct = upgrade;

      evLastBillingState =
          "OWNERSHIP_UPDATED";

    } catch (Exception e) {
      evLastBillingState =
          "OWNERSHIP_ERROR";
    }
  }

    private boolean evPurchaseHasProduct(
      Purchase purchase,
      String productId
  ) {
    try {
      if (purchase == null || productId == null) return false;
      List<String> products = purchase.getProducts();
      return products != null && products.contains(productId);
    } catch (Exception e) {
      return false;
    }
  }

  private void evHandleGiftPurchaseIfPresent(
      Purchase purchase
  ) {
    try {
      if (purchase == null) return;
      if (
          purchase.getPurchaseState() !=
          Purchase.PurchaseState.PURCHASED
      ) return;

      if (!evPurchaseHasProduct(purchase, EV_PRODUCT_GIFT)) return;

      String token = purchase.getPurchaseToken();
      if (token == null || token.trim().length() < 20) {
        evLastGiftState = "TOKEN_MISSING";
        evLastGiftError = "PURCHASE_TOKEN_REQUIRED";
        return;
      }

      evSubmitGiftPurchaseToken(token);
    } catch (Exception e) {
      evLastGiftState = "HANDLE_ERROR";
      evLastGiftError = "GIFT_HANDLE_ERROR";
    }
  }

  private synchronized boolean evBeginGiftSubmit() {
    if (evGiftSubmitInFlight) return false;
    evGiftSubmitInFlight = true;
    evLastGiftState = "VERIFYING";
    evLastGiftError = "";
    return true;
  }

  private synchronized void evEndGiftSubmit() {
    evGiftSubmitInFlight = false;
  }

  private void evSubmitGiftPurchaseToken(
      final String purchaseToken
  ) {
    if (!evBeginGiftSubmit()) return;

    new Thread(
        new Runnable() {
          @Override
          public void run() {
            java.net.HttpURLConnection conn = null;
            try {
              java.net.URL url =
                  new java.net.URL(EV_GIFT_VERIFY_URL);

              conn =
                  (java.net.HttpURLConnection)
                      url.openConnection();

              conn.setRequestMethod("POST");
              conn.setConnectTimeout(15000);
              conn.setReadTimeout(20000);
              conn.setDoOutput(true);
              conn.setRequestProperty(
                  "Content-Type",
                  "application/json; charset=utf-8"
              );
              conn.setRequestProperty("Accept", "application/json");
              conn.setRequestProperty(
                  "X-EduVerse-Client",
                  "android-native"
              );

              String requestBody =
                  new org.json.JSONObject()
                      .put("purchaseToken", purchaseToken)
                      .toString();

              byte[] payload =
                  requestBody.getBytes(
                      java.nio.charset.StandardCharsets.UTF_8
                  );

              conn.setFixedLengthStreamingMode(payload.length);

              try (
                  java.io.OutputStream out =
                      conn.getOutputStream()
              ) {
                out.write(payload);
                out.flush();
              }

              int http = conn.getResponseCode();

              java.io.InputStream stream =
                  (http >= 200 && http < 400)
                      ? conn.getInputStream()
                      : conn.getErrorStream();

              StringBuilder body = new StringBuilder();

              if (stream != null) {
                try (
                    java.io.BufferedReader reader =
                        new java.io.BufferedReader(
                            new java.io.InputStreamReader(
                                stream,
                                java.nio.charset.StandardCharsets.UTF_8
                            )
                        )
                ) {
                  String line;
                  while ((line = reader.readLine()) != null) {
                    body.append(line);
                    if (body.length() > 65536) break;
                  }
                }
              }

              org.json.JSONObject result =
                  body.length() > 0
                      ? new org.json.JSONObject(body.toString())
                      : new org.json.JSONObject();

              if (
                  http >= 200 &&
                  http < 300 &&
                  result.optBoolean("ok", false)
              ) {
                evLastGiftId = result.optString("giftId", "");
                evLastGiftCode = result.optString("giftCode", "");
                evLastGiftState =
                    result.optString("giftState", "AVAILABLE");
                evLastGiftError = "";

                runOnUiThread(
                    new Runnable() {
                      @Override
                      public void run() {
                        evRefreshOwnedPurchases();
                      }
                    }
                );
              } else {
                evLastGiftId =
                    result.optString("giftId", evLastGiftId);
                evLastGiftState =
                    result.optBoolean("retryable", false)
                        ? "RETRY_PENDING"
                        : "VERIFY_FAILED";
                evLastGiftError =
                    result.optString("error", "HTTP_" + http);
              }

            } catch (Exception e) {
              evLastGiftState = "NETWORK_ERROR";
              evLastGiftError = "GIFT_VERIFY_NETWORK_ERROR";
            } finally {
              try {
                if (conn != null) conn.disconnect();
              } catch (Exception ignored) { }
              evEndGiftSubmit();
            }
          }
        },
        "EV-Gift-Verify"
    ).start();
  }

  private synchronized String evGiftStatusJson() {
    return "{"
        + "\"state\":\""
        + evJsonEscape(evLastGiftState)
        + "\""
        + ",\"giftId\":\""
        + evJsonEscape(evLastGiftId)
        + "\""
        + ",\"giftCode\":\""
        + evJsonEscape(evLastGiftCode)
        + "\""
        + ",\"error\":\""
        + evJsonEscape(evLastGiftError)
        + "\""
        + ",\"inFlight\":"
        + evGiftSubmitInFlight
        + "}";
  }
private void evRefreshOwnedPurchases() {
    try {
      if (
          evBillingClient == null ||
          !evBillingClient.isReady()
      ) {
        return;
      }

      QueryPurchasesParams params =
          QueryPurchasesParams
              .newBuilder()
              .setProductType(
                  BillingClient.ProductType.INAPP
              )
              .build();

      evBillingClient.queryPurchasesAsync(
          params,
          (billingResult, purchases) -> {
            try {
              if (
                  billingResult.getResponseCode() ==
                  BillingClient.BillingResponseCode.OK
              ) {
                evApplyOwnedPurchases(
                    purchases
                );

              } else {
                evLastBillingState =
                    "QUERY_CODE_" +
                    billingResult.getResponseCode();
              }

            } catch (Exception e) {
              evLastBillingState =
                  "QUERY_ERROR";
            }
          }
      );

    } catch (Exception e) {
      evLastBillingState =
          "QUERY_START_ERROR";
    }
  }

  private String evBillingJson() {
    boolean effectiveFull =
        evOwnFullProduct ||
        evOwnUpgradeProduct;

    boolean effectiveFive =
        evOwnFiveProduct ||
        effectiveFull;

    return "{"
        + "\"ok\":true"
        + ",\"ready\":" + evBillingReady
        + ",\"state\":\"" + evLastBillingState + "\""
        + ",\"fiveProductOwned\":" + evOwnFiveProduct
        + ",\"fullProductOwned\":" + evOwnFullProduct
        + ",\"upgradeProductOwned\":" + evOwnUpgradeProduct
        + ",\"fiveRoomAccess\":" + effectiveFive
        + ",\"fullAccess\":" + effectiveFull
        + ",\"acknowledgeState\":\""
        + evJsonEscape(evLastAcknowledgeState)
        + "\""
        + "}";
  }

  private synchronized void evEndBilling() {
    try {
      if (evBillingClient != null) {
        evBillingClient.endConnection();
      }
    } catch (Exception e) { }

    evBillingReady = false;
    evBillingConnecting = false;
    evBillingClient = null;
  }
  // ============================================================
  // EV_PURCHASE_PARENT_GATE_V1
  //
  // Her gerçek para satın alma girişimi için:
  // - Ebeveyn PIN'i tekrar doğrulanır.
  // - Yetki yalnız seçilen ürün içindir.
  // - Yetki en fazla 2 dakika geçerlidir.
  // - Yetki ilk satın alma denemesinde tüketilir.
  //
  // Web katmanı bu kontrolü bypass edemez.
  // ============================================================
  private static final long EV_PURCHASE_GATE_WINDOW_MS =
      2L * 60L * 1000L;

  private volatile long evPurchaseGateAuthorizedUntil =
      0L;

  private volatile String evPurchaseGateProduct =
      "";

  private volatile String evPurchaseGateState =
      "IDLE";

  private boolean evKnownAccessProduct(
      String productId
  ) {
    return EV_PRODUCT_FIVE.equals(productId)
        || EV_PRODUCT_FULL.equals(productId)
        || EV_PRODUCT_UPGRADE.equals(productId);
  }
  private boolean evKnownPurchasableProduct(
      String productId
  ) {
    return evKnownAccessProduct(productId)
        || EV_PRODUCT_GIFT.equals(productId);
  }

  private void evClearPurchaseGate() {
    evPurchaseGateAuthorizedUntil = 0L;
    evPurchaseGateProduct = "";
  }

  private void evClearExpiredPurchaseGate() {
    if (
        evPurchaseGateAuthorizedUntil > 0L &&
        evPurchaseGateAuthorizedUntil <=
            System.currentTimeMillis()
    ) {
      evClearPurchaseGate();

      if ("AUTHORIZED".equals(evPurchaseGateState)) {
        evPurchaseGateState = "EXPIRED";
      }
    }
  }

  private boolean evPurchaseGateIsAuthorizedFor(
      String productId
  ) {
    evClearExpiredPurchaseGate();

    return productId != null
        && evPurchaseGateAuthorizedUntil >
            System.currentTimeMillis()
        && productId.equals(
            evPurchaseGateProduct
        );
  }

  /*
   * Gelecekte gerçek Billing launch metodu
   * MUTLAKA bu fonksiyon üzerinden izin alacaktır.
   *
   * Başarılı veya başarısız ilk kullanım girişiminde
   * yetki tüketilir.
   */
  private synchronized boolean
      evConsumePurchaseGateForProduct(
          String productId
      ) {

    boolean allowed =
        evPurchaseGateIsAuthorizedFor(
            productId
        );

    evClearPurchaseGate();

    evPurchaseGateState =
        allowed
            ? "CONSUMED"
            : "DENIED_OR_EXPIRED";

    return allowed;
  }

  private String evPurchaseGateJson(
      boolean ok,
      String code,
      boolean authorized,
      long remainingSeconds
  ) {
    return "{"
        + "\"ok\":" + ok
        + ",\"code\":\""
        + evJsonEscape(code)
        + "\""
        + ",\"authorized\":"
        + authorized
        + ",\"remainingSeconds\":"
        + remainingSeconds
        + "}";
  }

  // ============================================================
  // EV_PLAY_LAUNCH_BILLING_FLOW_V1
  //
  // Güvenlik sırası:
  // known product
  // -> entitlement eligibility
  // -> Billing hazır
  // -> Parent Gate consume
  // -> fresh ProductDetails
  // -> offer token
  // -> BillingFlowParams
  // -> launchBillingFlow
  //
  // Parent Gate ilk launch girişiminde tüketilir.
  // Purchase token JavaScript katmanına verilmez.
  // ============================================================

  private String evPurchaseLaunchJson(
      boolean ok,
      String code
  ) {
    return "{"
        + "\"ok\":" + ok
        + ",\"code\":\""
        + evJsonEscape(code)
        + "\""
        + "}";
  }

  private boolean evPurchaseEligible(
      String productId
  ) {
    if (EV_PRODUCT_GIFT.equals(productId)) {
      return true;
    }
    boolean fullEntitlement =
        evOwnFullProduct ||
        evOwnUpgradeProduct;

    if (EV_PRODUCT_FIVE.equals(productId)) {
      return !evOwnFiveProduct &&
          !fullEntitlement;
    }

    /*
     * 5 Oda sahibi direct 6,99 full ürünü tekrar alamaz.
     * Onun doğru yolu yalnız 5,99 upgrade ürünüdür.
     */
    if (EV_PRODUCT_FULL.equals(productId)) {
      return !evOwnFiveProduct &&
          !fullEntitlement;
    }

    /*
     * Upgrade yalnız 5 Oda sahibi ve henüz full olmayan
     * kullanıcı için geçerlidir.
     */
    if (EV_PRODUCT_UPGRADE.equals(productId)) {
      return evOwnFiveProduct &&
          !fullEntitlement;
    }

    return false;
  }

  private void evQueryFreshProductAndLaunch(
      final String productId
  ) {
    try {
      if (
          evBillingClient == null ||
          !evBillingClient.isReady()
      ) {
        evLastBillingState =
            "PURCHASE_BILLING_NOT_READY_AFTER_GATE";
        return;
      }

      ArrayList<QueryProductDetailsParams.Product>
          productList = new ArrayList<>();

      productList.add(
          QueryProductDetailsParams.Product
              .newBuilder()
              .setProductId(productId)
              .setProductType(
                  BillingClient.ProductType.INAPP
              )
              .build()
      );

      QueryProductDetailsParams params =
          QueryProductDetailsParams
              .newBuilder()
              .setProductList(productList)
              .build();

      evLastBillingState =
          "PURCHASE_QUERYING_FRESH_PRODUCT";

      evBillingClient.queryProductDetailsAsync(
          params,
          new ProductDetailsResponseListener() {
            @Override
            public void onProductDetailsResponse(
                BillingResult billingResult,
                QueryProductDetailsResult result
            ) {
              try {
                if (
                    billingResult == null ||
                    billingResult.getResponseCode() !=
                        BillingClient.BillingResponseCode.OK
                ) {
                  int code =
                      billingResult == null
                          ? -1
                          : billingResult.getResponseCode();

                  evLastBillingState =
                      "PURCHASE_PRODUCT_QUERY_CODE_" + code;
                  return;
                }

                if (result == null) {
                  evLastBillingState =
                      "PURCHASE_PRODUCT_NULL_RESULT";
                  return;
                }

                ProductDetails selected = null;

                List<ProductDetails> detailsList =
                    result.getProductDetailsList();

                if (detailsList != null) {
                  for (ProductDetails details : detailsList) {
                    if (
                        details != null &&
                        productId.equals(
                            details.getProductId()
                        )
                    ) {
                      selected = details;
                      break;
                    }
                  }
                }

                if (selected == null) {
                  evLastBillingState =
                      "PURCHASE_PRODUCT_NOT_FOUND";
                  return;
                }

                List<ProductDetails.OneTimePurchaseOfferDetails>
                    offers =
                        selected
                            .getOneTimePurchaseOfferDetailsList();

                if (offers == null || offers.isEmpty()) {
                  evLastBillingState =
                      "PURCHASE_NO_AVAILABLE_OFFER";
                  return;
                }

                /*
                 * EduVerse ürün tasarımında bu fazda
                 * ürün başına tek aktif satın alma seçeneği
                 * beklenir. Birden fazla teklif çıkarsa
                 * yanlış fiyat/teklif seçmemek için fail-closed.
                 */
                if (offers.size() != 1) {
                  evLastBillingState =
                      "PURCHASE_MULTIPLE_OFFERS_UNSUPPORTED";
                  return;
                }

                ProductDetails.OneTimePurchaseOfferDetails
                    offer = offers.get(0);

                if (offer == null) {
                  evLastBillingState =
                      "PURCHASE_OFFER_NULL";
                  return;
                }

                String offerToken =
                    offer.getOfferToken();

                if (
                    offerToken == null ||
                    offerToken.trim().length() == 0
                ) {
                  evLastBillingState =
                      "PURCHASE_OFFER_TOKEN_MISSING";
                  return;
                }

                final ProductDetails finalDetails =
                    selected;

                final String finalOfferToken =
                    offerToken;

                runOnUiThread(new Runnable() {
                  @Override
                  public void run() {
                    try {
                      if (
                          evBillingClient == null ||
                          !evBillingClient.isReady()
                      ) {
                        evLastBillingState =
                            "PURCHASE_BILLING_NOT_READY_AT_LAUNCH";
                        return;
                      }

                      ArrayList<
                          BillingFlowParams.ProductDetailsParams
                      > flowProducts = new ArrayList<>();

                      flowProducts.add(
                          BillingFlowParams.ProductDetailsParams
                              .newBuilder()
                              .setProductDetails(
                                  finalDetails
                              )
                              .setOfferToken(
                                  finalOfferToken
                              )
                              .build()
                      );

                      BillingFlowParams flowParams =
                          BillingFlowParams
                              .newBuilder()
                              .setProductDetailsParamsList(
                                  flowProducts
                              )
                              .build();

                      evLastBillingState =
                          "PURCHASE_FLOW_LAUNCHING";

                      BillingResult launchResult =
                          evBillingClient.launchBillingFlow(
                              MainActivity.this,
                              flowParams
                          );

                      if (launchResult == null) {
                        evLastBillingState =
                            "PURCHASE_LAUNCH_NULL_RESULT";
                        return;
                      }

                      int launchCode =
                          launchResult.getResponseCode();

                      if (
                          launchCode ==
                          BillingClient.BillingResponseCode.ITEM_ALREADY_OWNED
                      ) {
                        // EV_ITEM_ALREADY_OWNED_AUTO_RESTORE_V1
                        evLastBillingState =
                            "ITEM_ALREADY_OWNED_REFRESHING";

                        evRefreshOwnedPurchases();
                        return;
                      }

                      if (
                          launchCode ==
                          BillingClient.BillingResponseCode.OK
                      ) {
                        evLastBillingState =
                            "PURCHASE_FLOW_LAUNCHED";
                      } else {
                        evLastBillingState =
                            "PURCHASE_LAUNCH_CODE_" +
                            launchCode;
                      }

                    } catch (Exception e) {
                      evLastBillingState =
                          "PURCHASE_LAUNCH_ERROR";
                    }
                  }
                });

              } catch (Exception e) {
                evLastBillingState =
                    "PURCHASE_PRODUCT_RESPONSE_ERROR";
              }
            }
          }
      );

    } catch (Exception e) {
      evLastBillingState =
          "PURCHASE_PREPARE_ERROR";
    }
  }

  private synchronized String evBeginPurchaseLaunch(
      String productId
  ) {
    try {
      if (!evKnownPurchasableProduct(productId)) {
        evLastBillingState =
            "PURCHASE_UNKNOWN_PRODUCT";

        return evPurchaseLaunchJson(
            false,
            "UNKNOWN_PRODUCT"
        );
      }

      if (!evPurchaseEligible(productId)) {
        evLastBillingState =
            "PURCHASE_NOT_ELIGIBLE";

        return evPurchaseLaunchJson(
            false,
            "NOT_ELIGIBLE"
        );
      }

      /*
       * Billing hazır değilse Parent Gate tüketilmez.
       */
      if (
          evBillingClient == null ||
          !evBillingClient.isReady()
      ) {
        evLastBillingState =
            "PURCHASE_BILLING_NOT_READY";

        return evPurchaseLaunchJson(
            false,
            "BILLING_NOT_READY"
        );
      }

      /*
       * Tam burada ürün-özel, 2 dakikalık,
       * tek kullanımlık Parent Gate tüketilir.
       */
      if (
          !evConsumePurchaseGateForProduct(
              productId
          )
      ) {
        evLastBillingState =
            "PURCHASE_PARENT_AUTH_REQUIRED";

        return evPurchaseLaunchJson(
            false,
            "PARENT_AUTH_REQUIRED"
        );
      }

      evLastBillingState =
          "PURCHASE_GATE_CONSUMED";

      /*
       * Kalıcı ProductDetails cache kullanılmaz.
       * Her launch için Play'den fresh sorgu yapılır.
       */
      evQueryFreshProductAndLaunch(
          productId
      );

      return evPurchaseLaunchJson(
          true,
          "PURCHASE_PREPARING"
      );

    } catch (Exception e) {
      evLastBillingState =
          "PURCHASE_BEGIN_ERROR";

      return evPurchaseLaunchJson(
          false,
          "PURCHASE_BEGIN_ERROR"
      );
    }
  }
  public class EVAccessBridge {
    @JavascriptInterface
    public synchronized String launchPurchase(
        String productId
    ) {
      return evBeginPurchaseLaunch(
          productId
      );
    }


    @JavascriptInterface
    public String ping() {
      return "EV_ACCESS_OK";
    }

    @JavascriptInterface
    public synchronized String getParentGateStatus() {
      try {
        SharedPreferences p = evParentPrefs();
        evNormalizeExpiredParentLock(p);

        boolean hasPin = evParentPinExists(p);
        long now = System.currentTimeMillis();
        long until = p.getLong(EV_PIN_LOCK_UNTIL, 0L);
        boolean locked = until > now;

        long remaining = locked
            ? Math.max(1L, (until - now + 999L) / 1000L)
            : 0L;

        int fails = p.getInt(EV_PIN_FAILS, 0);

        int attempts = locked
            ? 0
            : Math.max(0, EV_PIN_MAX_FAILS - fails);

        return evParentJson(
            true,
            "STATUS",
            hasPin,
            locked,
            remaining,
            attempts
        );

      } catch (Exception e) {
        return evParentJson(
            false,
            "STATUS_ERROR",
            false,
            false,
            0L,
            0
        );
      }
    }

    @JavascriptInterface
    public synchronized String createParentPin(
        String pin,
        String confirmation
    ) {
      try {
        SharedPreferences p = evParentPrefs();

        if (evParentPinExists(p)) {
          return evParentJson(
              false,
              "PIN_ALREADY_EXISTS",
              true,
              false,
              0L,
              EV_PIN_MAX_FAILS
          );
        }

        if (!evValidParentPin(pin) ||
            !evValidParentPin(confirmation)) {
          return evParentJson(
              false,
              "PIN_MUST_BE_4_DIGITS",
              false,
              false,
              0L,
              EV_PIN_MAX_FAILS
          );
        }

        if (!pin.equals(confirmation)) {
          return evParentJson(
              false,
              "PIN_CONFIRMATION_MISMATCH",
              false,
              false,
              0L,
              EV_PIN_MAX_FAILS
          );
        }

        byte[] salt = new byte[16];
        new SecureRandom().nextBytes(salt);

        String hash = evHashParentPin(pin, salt);

        boolean saved = p.edit()
            .putString(EV_PIN_HASH, hash)
            .putString(EV_PIN_SALT, evB64(salt))
            .putInt(EV_PIN_FAILS, 0)
            .putLong(EV_PIN_LOCK_UNTIL, 0L)
            .commit();

        if (!saved) {
          return evParentJson(
              false,
              "PIN_SAVE_FAILED",
              false,
              false,
              0L,
              EV_PIN_MAX_FAILS
          );
        }

        return evParentJson(
            true,
            "PIN_CREATED",
            true,
            false,
            0L,
            EV_PIN_MAX_FAILS
        );

      } catch (Exception e) {
        return evParentJson(
            false,
            "PIN_CREATE_ERROR",
            false,
            false,
            0L,
            0
        );
      }
    }

    @JavascriptInterface
    public synchronized String verifyParentPin(String pin) {
      try {
        SharedPreferences p = evParentPrefs();
        evNormalizeExpiredParentLock(p);

        if (!evParentPinExists(p)) {
          return evParentJson(
              false,
              "PIN_NOT_CONFIGURED",
              false,
              false,
              0L,
              EV_PIN_MAX_FAILS
          );
        }

        long now = System.currentTimeMillis();
        long until = p.getLong(EV_PIN_LOCK_UNTIL, 0L);

        if (until > now) {
          long remaining = Math.max(
              1L,
              (until - now + 999L) / 1000L
          );

          return evParentJson(
              false,
              "LOCKED",
              true,
              true,
              remaining,
              0
          );
        }

        if (!evValidParentPin(pin)) {
          int currentFails = p.getInt(EV_PIN_FAILS, 0);

          return evParentJson(
              false,
              "PIN_MUST_BE_4_DIGITS",
              true,
              false,
              0L,
              Math.max(
                  0,
                  EV_PIN_MAX_FAILS - currentFails
              )
          );
        }

        String savedHash = p.getString(EV_PIN_HASH, "");
        String savedSalt = p.getString(EV_PIN_SALT, "");

        String candidateHash = evHashParentPin(
            pin,
            evB64Decode(savedSalt)
        );

        boolean match = MessageDigest.isEqual(
            evB64Decode(savedHash),
            evB64Decode(candidateHash)
        );

        if (match) {
          p.edit()
              .putInt(EV_PIN_FAILS, 0)
              .putLong(EV_PIN_LOCK_UNTIL, 0L)
              .commit();

          return evParentJson(
              true,
              "PIN_VERIFIED",
              true,
              false,
              0L,
              EV_PIN_MAX_FAILS
          );
        }

        int fails = p.getInt(EV_PIN_FAILS, 0) + 1;

        if (fails >= EV_PIN_MAX_FAILS) {
          long lockUntil = now + EV_PIN_LOCK_MS;

          p.edit()
              .putInt(EV_PIN_FAILS, EV_PIN_MAX_FAILS)
              .putLong(EV_PIN_LOCK_UNTIL, lockUntil)
              .commit();

          return evParentJson(
              false,
              "LOCKED_15_MINUTES",
              true,
              true,
              15L * 60L,
              0
          );
        }

        p.edit()
            .putInt(EV_PIN_FAILS, fails)
            .commit();

        return evParentJson(
            false,
            "WRONG_PIN",
            true,
            false,
            0L,
            Math.max(0, EV_PIN_MAX_FAILS - fails)
        );

      } catch (Exception e) {
        return evParentJson(
            false,
            "PIN_VERIFY_ERROR",
            true,
            false,
            0L,
            0
        );
      }
    }
    @JavascriptInterface
    public synchronized String getParentRecoveryStatus() {
      try {
        evClearExpiredRecoveryAuthorization();

        boolean authorized =
            evParentRecoveryAuthorized();

        long remaining = authorized
            ? Math.max(
                1L,
                (
                    evParentRecoveryAuthorizedUntil -
                    System.currentTimeMillis() +
                    999L
                ) / 1000L
              )
            : 0L;

        String code = authorized
            ? "AUTHORIZED"
            : evParentRecoveryState;

        return evParentRecoveryJson(
            true,
            code,
            authorized,
            remaining
        );

      } catch (Exception e) {
        return evParentRecoveryJson(
            false,
            "RECOVERY_STATUS_ERROR",
            false,
            0L
        );
      }
    }

    @JavascriptInterface
    public synchronized String beginParentPinRecovery() {
      try {
        final SharedPreferences p = evParentPrefs();

        if (!evParentPinExists(p)) {
          return evParentRecoveryJson(
              false,
              "PIN_NOT_CONFIGURED",
              false,
              0L
          );
        }

        evClearExpiredRecoveryAuthorization();

        if (evParentRecoveryAuthorized()) {
          long remaining = Math.max(
              1L,
              (
                  evParentRecoveryAuthorizedUntil -
                  System.currentTimeMillis() +
                  999L
              ) / 1000L
          );

          return evParentRecoveryJson(
              true,
              "ALREADY_AUTHORIZED",
              true,
              remaining
          );
        }

        /*
         * Android 11+:
         * BIOMETRIC_STRONG veya cihaz PIN/desen/parolası.
         *
         * Android 10 ve altı:
         * setAllowedAuthenticators(STRONG|DEVICE_CREDENTIAL)
         * desteklenmediği için AndroidX'in uyumlu eski yolu kullanılır.
         */
        if (Build.VERSION.SDK_INT >= 30) {
          int allowed =
              BiometricManager.Authenticators.BIOMETRIC_STRONG |
              BiometricManager.Authenticators.DEVICE_CREDENTIAL;

          int canAuth =
              BiometricManager
                  .from(MainActivity.this)
                  .canAuthenticate(allowed);

          if (canAuth != BiometricManager.BIOMETRIC_SUCCESS) {
            return evParentRecoveryJson(
                false,
                "DEVICE_AUTH_UNAVAILABLE_" + canAuth,
                false,
                0L
            );
          }

        } else {
          KeyguardManager keyguard =
              (KeyguardManager)
                  getSystemService(KEYGUARD_SERVICE);

          boolean deviceSecure =
              keyguard != null &&
              keyguard.isDeviceSecure();

          int biometricStatus =
              BiometricManager
                  .from(MainActivity.this)
                  .canAuthenticate();

          boolean biometricReady =
              biometricStatus ==
                  BiometricManager.BIOMETRIC_SUCCESS;

          if (!deviceSecure && !biometricReady) {
            return evParentRecoveryJson(
                false,
                "DEVICE_AUTH_UNAVAILABLE",
                false,
                0L
            );
          }
        }

        evParentRecoveryAuthorizedUntil = 0L;
        evParentRecoveryState = "PROMPT_PENDING";

        runOnUiThread(new Runnable() {
          @Override
          public void run() {
            try {
              Executor executor =
                  ContextCompat.getMainExecutor(
                      MainActivity.this
                  );

              BiometricPrompt prompt =
                  new BiometricPrompt(
                      MainActivity.this,
                      executor,
                      new BiometricPrompt.AuthenticationCallback() {

                        @Override
                        public void onAuthenticationSucceeded(
                            BiometricPrompt.AuthenticationResult result
                        ) {
                          super.onAuthenticationSucceeded(result);

                          evParentRecoveryAuthorizedUntil =
                              System.currentTimeMillis() +
                              EV_PARENT_RECOVERY_WINDOW_MS;

                          evParentRecoveryState =
                              "AUTHORIZED";
                        }

                        @Override
                        public void onAuthenticationFailed() {
                          super.onAuthenticationFailed();

                          evParentRecoveryState =
                              "FAILED_RETRY";
                        }

                        @Override
                        public void onAuthenticationError(
                            int errorCode,
                            CharSequence errString
                        ) {
                          super.onAuthenticationError(
                              errorCode,
                              errString
                          );

                          evParentRecoveryAuthorizedUntil = 0L;

                          evParentRecoveryState =
                              "AUTH_ERROR_" + errorCode;
                        }
                      }
                  );

              BiometricPrompt.PromptInfo.Builder builder =
                  new BiometricPrompt.PromptInfo.Builder()
                      .setTitle("Ebeveyn doğrulaması")
                      .setSubtitle(
                          "Ebeveyn PIN'ini sıfırlamak için " +
                          "cihaz güvenliğini doğrulayın"
                      );

              if (Build.VERSION.SDK_INT >= 30) {
                builder.setAllowedAuthenticators(
                    BiometricManager.Authenticators.BIOMETRIC_STRONG |
                    BiometricManager.Authenticators.DEVICE_CREDENTIAL
                );
              } else {
                /*
                 * AndroidX backward-compatible cihaz kimliği yolu.
                 */
                builder.setDeviceCredentialAllowed(true);
              }

              prompt.authenticate(builder.build());

            } catch (Exception e) {
              evParentRecoveryAuthorizedUntil = 0L;
              evParentRecoveryState =
                  "PROMPT_START_ERROR";
            }
          }
        });

        return evParentRecoveryJson(
            true,
            "PROMPT_STARTED",
            false,
            0L
        );

      } catch (Exception e) {
        evParentRecoveryAuthorizedUntil = 0L;
        evParentRecoveryState =
            "RECOVERY_START_ERROR";

        return evParentRecoveryJson(
            false,
            "RECOVERY_START_ERROR",
            false,
            0L
        );
      }
    }

    @JavascriptInterface
    public synchronized String resetParentPinAfterDeviceAuth(
        String newPin,
        String confirmation
    ) {
      try {
        evClearExpiredRecoveryAuthorization();

        SharedPreferences p = evParentPrefs();

        if (!evParentPinExists(p)) {
          return evParentJson(
              false,
              "PIN_NOT_CONFIGURED",
              false,
              false,
              0L,
              EV_PIN_MAX_FAILS
          );
        }

        if (!evParentRecoveryAuthorized()) {
          return evParentJson(
              false,
              "DEVICE_AUTH_REQUIRED",
              true,
              false,
              0L,
              Math.max(
                  0,
                  EV_PIN_MAX_FAILS -
                  p.getInt(EV_PIN_FAILS, 0)
              )
          );
        }

        if (
            !evValidParentPin(newPin) ||
            !evValidParentPin(confirmation)
        ) {
          return evParentJson(
              false,
              "PIN_MUST_BE_4_DIGITS",
              true,
              false,
              0L,
              EV_PIN_MAX_FAILS
          );
        }

        if (!newPin.equals(confirmation)) {
          return evParentJson(
              false,
              "PIN_CONFIRMATION_MISMATCH",
              true,
              false,
              0L,
              EV_PIN_MAX_FAILS
          );
        }

        byte[] salt = new byte[16];
        new SecureRandom().nextBytes(salt);

        String hash =
            evHashParentPin(newPin, salt);

        boolean saved =
            p.edit()
                .putString(EV_PIN_HASH, hash)
                .putString(EV_PIN_SALT, evB64(salt))
                .putInt(EV_PIN_FAILS, 0)
                .putLong(EV_PIN_LOCK_UNTIL, 0L)
                .commit();

        if (!saved) {
          return evParentJson(
              false,
              "PIN_RESET_SAVE_FAILED",
              true,
              false,
              0L,
              EV_PIN_MAX_FAILS
          );
        }

        /*
         * Recovery yetkisi tek kullanımlıktır.
         */
        evParentRecoveryAuthorizedUntil = 0L;
        evParentRecoveryState = "CONSUMED";

        return evParentJson(
            true,
            "PIN_RESET",
            true,
            false,
            0L,
            EV_PIN_MAX_FAILS
        );

      } catch (Exception e) {
        return evParentJson(
            false,
            "PIN_RESET_ERROR",
            true,
            false,
            0L,
            0
        );
      }
    }
    @JavascriptInterface
    public String getGiftPurchaseStatus() {
      return evGiftStatusJson();
    }

    @JavascriptInterface
    public void retryGiftPurchaseVerification() {
      runOnUiThread(
          new Runnable() {
            @Override
            public void run() {
              evInitBilling();
              evRefreshOwnedPurchases();
            }
          }
      );
    }

@JavascriptInterface
    public String getBillingStatus() {
      return evBillingJson();
    }

    @JavascriptInterface
    public void refreshBillingStatus() {
      runOnUiThread(new Runnable() {
        @Override
        public void run() {
          evInitBilling();
          evRefreshOwnedPurchases();
        }
      });
    }
    @JavascriptInterface
    public String getProductCatalog() {
      return evProductCatalogJson();
    }

    @JavascriptInterface
    public void refreshProductCatalog() {
      runOnUiThread(new Runnable() {
        @Override
        public void run() {
          evInitBilling();
          evRefreshProductCatalog();
        }
      });
    }
    @JavascriptInterface
    public synchronized String
        authorizePurchaseWithParentPin(
            String productId,
            String pin
        ) {

      try {
        /*
         * Her yeni authorization talebi,
         * önceki kullanılmamış yetkiyi iptal eder.
         */
        evClearPurchaseGate();
        evPurchaseGateState =
            "AUTHORIZING";

        if (!evKnownPurchasableProduct(productId)) {
          evPurchaseGateState =
              "UNKNOWN_PRODUCT";

          return evPurchaseGateJson(
              false,
              "UNKNOWN_PRODUCT",
              false,
              0L
          );
        }

        /*
         * Mevcut native PIN motorunu kullan.
         * Yanlış deneme sayacı ve 15 dk kilit
         * aynı mekanizma üzerinden işler.
         */
        String pinResult =
            verifyParentPin(pin);

        boolean verified =
            pinResult != null
            && pinResult.contains(
                "\"ok\":true"
            )
            && pinResult.contains(
                "\"code\":\"PIN_VERIFIED\""
            );

        if (!verified) {
          evPurchaseGateState =
              "PIN_DENIED";

          return evPurchaseGateJson(
              false,
              "PIN_DENIED",
              false,
              0L
          );
        }

        evPurchaseGateProduct =
            productId;

        evPurchaseGateAuthorizedUntil =
            System.currentTimeMillis()
            + EV_PURCHASE_GATE_WINDOW_MS;

        evPurchaseGateState =
            "AUTHORIZED";

        return evPurchaseGateJson(
            true,
            "AUTHORIZED",
            true,
            120L
        );

      } catch (Exception e) {
        evClearPurchaseGate();

        evPurchaseGateState =
            "AUTHORIZATION_ERROR";

        return evPurchaseGateJson(
            false,
            "AUTHORIZATION_ERROR",
            false,
            0L
        );
      }
    }

    @JavascriptInterface
    public synchronized String
        getPurchaseGateStatus() {

      try {
        evClearExpiredPurchaseGate();

        boolean authorized =
            evPurchaseGateAuthorizedUntil >
                System.currentTimeMillis()
            && evKnownPurchasableProduct(
                evPurchaseGateProduct
            );

        long remaining =
            authorized
                ? Math.max(
                    1L,
                    (
                        evPurchaseGateAuthorizedUntil
                        - System.currentTimeMillis()
                        + 999L
                    ) / 1000L
                )
                : 0L;

        return evPurchaseGateJson(
            true,
            evPurchaseGateState,
            authorized,
            remaining
        );

      } catch (Exception e) {
        return evPurchaseGateJson(
            false,
            "STATUS_ERROR",
            false,
            0L
        );
      }
    }

    @JavascriptInterface
    public synchronized void
        cancelPurchaseAuthorization() {

      evClearPurchaseGate();
      evPurchaseGateState =
          "CANCELLED";
    }
  }
  @Override public void onDestroy() {
    try { evEndBilling(); } catch (Exception e) { }
    try { if (evTts != null) { evTts.stop(); evTts.shutdown(); evTts = null; } if (evHelperTts != null) { evHelperTts.stop(); evHelperTts.shutdown(); evHelperTts = null; } } catch (Exception e) { }
    super.onDestroy();
  }
}
