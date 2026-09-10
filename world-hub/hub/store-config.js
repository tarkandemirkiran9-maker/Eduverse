/* EduVerse store routing — iOS-ready.
   When the App Store page exists, only fill the ios URL below.
   No layout, HTML or app.js redesign is required. */
window.EDUVERSE_STORE_LINKS = {
  android: 'https://play.google.com/store/apps/details?id=club.eduverse.app',
  ios: ''
};

/* EduVerse Vitrin Kumandasi 2.0 — owner-controlled, local source only.
   Each module can be switched ON/OFF without rewriting the World Hub layout. */
window.EDUVERSE_VITRIN_CONFIG = {
  version: 2,
  mode: 'prelaunch',
  modules: {
    world: true,
    store: true,
    showcase: true,
    freeRooms: true,
    family: true,
    pricing: true,
    worldBridge: true,
    platform: true,
    android: true,
    ios: true,
    goodness: true,
    story: true,
    countdown: true,
    languagePromo: true,
    askida: false,
    campaign: false,
    socialProof: false,
    feedback: false,
    analytics: false
  }
};

/* EduVerse launch panel.
   targetAt is owner-selected for 21 September 2026, Europe/Berlin.
   When the target reaches zero, the same panel becomes the visitor's live local
   date/time. It never enables paid sales. */
window.EDUVERSE_LAUNCH_CONFIG = {
  targetAt: '2026-09-21T00:00:00+02:00',
  waitingMode: 'soon',
  afterMode: 'clock',
  clockZone: 'local',
  autoSales: false
};

/* EduVerse purchase routing.
   mode: stores | direct | hybrid
   direct can be enabled later without changing price-card HTML. */
window.EDUVERSE_PURCHASE_CONFIG = {
  mode: 'stores',
  paidSalesEnabled: false,
  channels: {
    android: {
      visible: true,
      enabled: true,
      url: 'https://play.google.com/store/apps/details?id=club.eduverse.app'
    },
    ios: {
      visible: true,
      enabled: false,
      url: ''
    },
    direct: {
      visible: false,
      enabled: false,
      label: 'EduVerse • Doğrudan Satın Al',
      url: ''
    }
  },
  prices: {
    free:    { store: '0 €',    direct: '' },
    five:    { store: '2,99 €', direct: '' },
    full:    { store: '6,99 €', direct: '' },
    upgrade: { store: '5,99 €', direct: '' }
  }
};

/* EduVerse web game entry.
   Localhost tests use :8788 automatically.
   Live storefront uses /game/. */
window.EDUVERSE_WEB_GAME_CONFIG = {
  enabled: true,
  localUrl: 'http://127.0.0.1:8788/',
  productionUrl: '/game/',
  freeRoom: 'okiyesor'
};
