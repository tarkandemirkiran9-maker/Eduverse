/* EduVerse store routing — iOS-ready.
   When the App Store page exists, only fill the ios URL below.
   No layout, HTML or app.js redesign is required. */
window.EDUVERSE_STORE_LINKS = {
  android: 'https://play.google.com/store/apps/details?id=club.eduverse.app',
  ios: ''
};

/* EduVerse Vitrin Kumandasi — owner-controlled, local source only. */
window.EDUVERSE_VITRIN_CONFIG = {
  mode: 'prelaunch',
  modules: {
    countdown: true,
    languagePromo: true,
    okiDede: true,
    ios: true,
    android: true,
    lightGate: true,
    pricing: true,
    freeRooms: true,
    campaign: false,
    socialProof: false,
    feedback: false,
    analytics: false
  }
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
   Live storefront uses play.eduverse.club. */
window.EDUVERSE_WEB_GAME_CONFIG = {
  enabled: true,
  localUrl: 'http://127.0.0.1:8788/',
  productionUrl: 'https://play.eduverse.club/',
  freeRoom: 'okiyesor'
};
