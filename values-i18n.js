(function(){
  var dict = {
    tr:{
      app:'Degerler Evi', panelTitle:'Evrensel Degerler', panelSub:'Din bagimsiz, her cocuk icin evrensel degerler modu.', todayTitle:'Bugunun degeri', todayText:'Nezaket: Bugun birine guzel bir soz soyle.',
      namePlaceholder:'Adin nedir?', enter:'Eve Gir', feed:'Yemek Ver', growing:'Buyuyor...', star:'Yildiz', coins:'Para', daily:'Gunluk', level:'Baslangic', dailyTasks:'BUGUNUN GOREVLERI', loading:'Yukleniyor...',
      buttons:{shop:'Dukkan',tasks:'Gorevler',words:'Kelimeler',champ:'Meydan Okuma',theme:'Tema',reflect:'Dusunceler',report:'Rapor',qr:'Paylas'},
      invite:'Davet', card:'Kart', chest:'Sandik', feedback:'Gorus', chestTitle:'Surpriz Sandik', chestOpen:'Ac', chestClose:'Kapat',
      rooms:{ibadet:['Sakinlik Odasi','🧘'],sinema:['Sinema Odasi','🎬'],ders:['Ogrenme Odasi','📚'],oyuncak:['Hayal Atolyesi','🧸'],cevre:['Gezegeni Koru','🌱'],caliskan:['Caba Odasi','💪'],sanat:['Sanat Atolyesi','🎨'],mutfak:['Mutfak Lab','🍳'],aile:['Aile Odasi','👨‍👩‍👧'],ada:['Sessiz Ada','🏝️'],sifa:['Saglik Odasi','🌿'],ilkbahar:['Ilkbahar Bahcesi','🌸'],odulodasi:['Odul Odasi','🏆'],nefes:['Nefes Odasi','🌬️'],para:['Paylasim Odasi','🤝'],arapca:['Dunya Harfleri','✍️'],gizli:['Gizem Odasi','🔮'],english:['Ingilizce Odasi','🇬🇧'],deutsch:['Almanca Odasi','🇩🇪'],okyanus:['Okyanus Odasi','🌊'],atlas:['Dunya Kasifi','🌌'],muzik:['Muzik Odasi','🎵'],boyama:['Renk Atolyesi','🎨'],kumanda:['Oyun Odasi','🎮'],puzzle:['Puzzle Odasi','🧩'],lazer:['Odak Odasi','⚡'],bilgisayar:['Teknoloji Odasi','💻'],hayvanat:['Hayvan Parki','🦁'],refleks:['Refleks Odasi','⚡']}
    },
    en:{
      app:'Wonder House', panelTitle:'Global Values', panelSub:'A faith-neutral values mode for children from every culture.', todayTitle:'Value of the day', todayText:'Kindness: Say one kind thing to someone today.',
      namePlaceholder:'What is your name?', enter:'Enter House', feed:'Feed', growing:'Growing...', star:'Stars', coins:'Coins', daily:'Daily', level:'Beginner', dailyTasks:'TODAY\'S TASKS', loading:'Loading...',
      buttons:{shop:'Shop',tasks:'Tasks',words:'Words',champ:'Challenge',theme:'Theme',reflect:'Reflections',report:'Report',qr:'Share'},
      invite:'Invite', card:'Card', chest:'Chest', feedback:'Feedback', chestTitle:'Surprise Chest', chestOpen:'Open', chestClose:'Close',
      rooms:{ibadet:['Calm Room','🧘'],sinema:['Cinema Room','🎬'],ders:['Learning Room','📚'],oyuncak:['Imagination Studio','🧸'],cevre:['Planet Care','🌱'],caliskan:['Effort Room','💪'],sanat:['Art Studio','🎨'],mutfak:['Kitchen Lab','🍳'],aile:['Family Room','👨‍👩‍👧'],ada:['Quiet Island','🏝️'],sifa:['Wellness Room','🌿'],ilkbahar:['Spring Garden','🌸'],odulodasi:['Rewards Room','🏆'],nefes:['Breathing Room','🌬️'],para:['Sharing Room','🤝'],arapca:['World Letters','✍️'],gizli:['Mystery Room','🔮'],english:['English Room','🇬🇧'],deutsch:['German Room','🇩🇪'],okyanus:['Ocean Room','🌊'],atlas:['World Explorer','🌌'],muzik:['Music Room','🎵'],boyama:['Color Studio','🎨'],kumanda:['Game Room','🎮'],puzzle:['Puzzle Room','🧩'],lazer:['Focus Room','⚡'],bilgisayar:['Tech Room','💻'],hayvanat:['Animal Park','🦁'],refleks:['Reflex Room','⚡']}
    },
    de:{
      app:'Wunderhaus', panelTitle:'Globale Werte', panelSub:'Ein neutraler Werte-Modus fuer Kinder aus jeder Kultur.', todayTitle:'Wert des Tages', todayText:'Freundlichkeit: Sag heute jemandem ein freundliches Wort.',
      namePlaceholder:'Wie heisst du?', enter:'Haus betreten', feed:'Fuettern', growing:'Waechst...', star:'Sterne', coins:'Muenzen', daily:'Taeglich', level:'Anfaenger', dailyTasks:'HEUTIGE AUFGABEN', loading:'Laedt...',
      buttons:{shop:'Shop',tasks:'Aufgaben',words:'Woerter',champ:'Herausforderung',theme:'Design',reflect:'Reflexionen',report:'Fortschritt',qr:'Teilen'},
      invite:'Einladen', card:'Karte', chest:'Truhe', feedback:'Feedback', chestTitle:'Ueberraschungs-Truhe', chestOpen:'Oeffnen', chestClose:'Schliessen',
      rooms:{ibadet:['Ruhe-Raum','🧘'],sinema:['Filmstudio','🎬'],ders:['Lern-Raum','📚'],oyuncak:['Traum-Atelier','🧸'],cevre:['Planetenschutz','🌱'],caliskan:['Fleiss-Raum','💪'],sanat:['Kunststudio','🎨'],mutfak:['Kuechen-Labor','🍳'],aile:['Familien-Raum','👨‍👩‍👧'],ada:['Stille Insel','🏝️'],sifa:['Wellness-Raum','🌿'],ilkbahar:['Fruehlingsgarten','🌸'],odulodasi:['Belohnungs-Raum','🏆'],nefes:['Atem-Raum','🌬️'],para:['Teilen-Raum','🤝'],arapca:['Welt-Buchstaben','✍️'],gizli:['Geheim-Raum','🔮'],english:['Englisch-Raum','🇬🇧'],deutsch:['Deutsch-Raum','🇩🇪'],okyanus:['Ozean-Raum','🌊'],atlas:['Welt-Entdecker','🌌'],muzik:['Musik-Raum','🎵'],boyama:['Farbstudio','🎨'],kumanda:['Spielarena','🎮'],puzzle:['Puzzlewelt','🧩'],lazer:['Fokus-Raum','⚡'],bilgisayar:['Technik-Raum','💻'],hayvanat:['Tierpark','🦁'],refleks:['Reaktionsraum','⚡']}
    },
    fr:{
      app:'Maison des Valeurs', panelTitle:'Valeurs universelles', panelSub:'Un mode neutre pour les enfants de toutes les cultures.', todayTitle:'Valeur du jour', todayText:'Gentillesse : dis une parole gentille à quelqu\'un aujourd\'hui.',
      namePlaceholder:'Comment t\'appelles-tu ?', enter:'Entrer', feed:'Nourrir', growing:'Grandit...', star:'Étoiles', coins:'Pièces', daily:'Aujourd\'hui', level:'Débutant', dailyTasks:'MISSIONS DU JOUR', loading:'Chargement...',
      buttons:{shop:'Boutique',tasks:'Missions',words:'Mots',champ:'Défi',theme:'Thème',reflect:'Réflexions',report:'Rapport',qr:'Partager'},
      invite:'Inviter', card:'Carte', chest:'Coffre', feedback:'Avis', chestTitle:'Coffre surprise', chestOpen:'Ouvrir', chestClose:'Fermer',
      rooms:{ibadet:['Salle calme','🧘'],sinema:['Cinéma','🎬'],ders:['Salle d\'apprentissage','📚'],oyuncak:['Atelier imaginaire','🧸'],cevre:['Protéger la planète','🌱'],caliskan:['Salle de l\'effort','💪'],sanat:['Atelier d\'art','🎨'],mutfak:['Laboratoire cuisine','🍳'],aile:['Salle de la famille','👨‍👩‍👧'],ada:['Île tranquille','🏝️'],sifa:['Salle du bien-être','🌿'],ilkbahar:['Jardin du printemps','🌸'],odulodasi:['Salle des récompenses','🏆'],nefes:['Salle de respiration','🌬️'],para:['Salle du partage','🤝'],arapca:['Lettres du monde','✍️'],gizli:['Salle mystère','🔮'],english:['Salle d\'anglais','🇬🇧'],deutsch:['Salle d\'allemand','🇩🇪'],okyanus:['Salle de l\'océan','🌊'],atlas:['Explorateur du monde','🌌'],muzik:['Salle de musique','🎵'],boyama:['Atelier des couleurs','🎨'],kumanda:['Salle de jeu','🎮'],puzzle:['Salle de puzzle','🧩'],lazer:['Salle de concentration','⚡'],bilgisayar:['Salle technologique','💻'],hayvanat:['Parc animalier','🦁'],refleks:['Salle de réflexes','⚡']}
    },
    ar:{
      app:'بيت الدعاء', panelTitle:'خط بيت الدعاء', panelSub:'الوضع العربي يحافظ على هوية بيت الدعاء والمحتوى الإسلامي.', todayTitle:'دعاء اليوم', todayText:'النية الطيبة: ابدأ يومك بذكر الله والدعاء.',
      namePlaceholder:'ما اسمك؟', enter:'ادخل البيت', feed:'أطعم أوكي', growing:'ينمو...', star:'نجوم', coins:'نقود', daily:'يومي', level:'مبتدئ', dailyTasks:'مهام اليوم', loading:'جار التحميل...',
      buttons:{shop:'المتجر',tasks:'المهام',words:'الكلمات',champ:'التحدي',theme:'الشكل',reflect:'الأدعية',report:'تقرير',qr:'مشاركة'},
      invite:'دعوة', card:'بطاقة', chest:'صندوق', feedback:'رأي', chestTitle:'صندوق المفاجأة', chestOpen:'افتح', chestClose:'اغلاق',
      rooms:{ibadet:['غرفة العبادة','🕌'],sinema:['غرفة السينما','🎬'],ders:['غرفة العلم','📚'],oyuncak:['ورشة الخيال','🧸'],cevre:['غرفة الأمانة','🌱'],caliskan:['غرفة الاجتهاد','💪'],sanat:['غرفة الفن','🎨'],mutfak:['غرفة الطعام','🍳'],aile:['غرفة العائلة','👨‍👩‍👧'],ada:['جزيرة السكينة','🏝️'],sifa:['غرفة الشفاء','🌿'],ilkbahar:['حديقة الربيع','🌸'],odulodasi:['غرفة الجوائز','🏆'],nefes:['غرفة النفس الطيب','🌬️'],para:['غرفة الصدقة','🤝'],arapca:['غرفة العربية','✍️'],gizli:['غرفة الأسرار','🔮'],english:['غرفة الإنجليزية','🇬🇧'],deutsch:['غرفة الألمانية','🇩🇪'],okyanus:['غرفة البحر','🌊'],atlas:['مستكشف العالم','🌌'],muzik:['غرفة الصوت الجميل','🎵'],boyama:['غرفة الألوان','🎨'],kumanda:['غرفة اللعب','🎮'],puzzle:['غرفة الأحجية','🧩'],lazer:['غرفة التركيز','⚡'],bilgisayar:['غرفة التقنية','💻'],hayvanat:['حديقة الحيوانات','🦁'],refleks:['غرفة السرعة','⚡']}
    }
  };

  var frenchPhraseMap={
    'Dua Evi':'Maison des Valeurs','Dua':'Réflexion','Dua et':'Réfléchir','Eve Gir':'Entrer','Adini yaz, galaksiye gir!':'Écris ton nom et entre dans la galaxie !','Adini yaz':'Écris ton nom','Adin nedir?':'Comment t\'appelles-tu ?','Karakterini Sec':'Choisis ton personnage','Ogrenci':'Élève','Ogren':'Apprendre','Buyu':'Grandir','Kesfet':'Découvrir',
    'Yemek Ver':'Nourrir','Buyuyor...':'Grandit...','Yildiz':'Étoiles','Para':'Pièces','Gunluk':'Aujourd\'hui','Bugunun Gorevleri':'Missions du jour','Yukleniyor...':'Chargement...','Baslangic':'Débutant','Dukkan':'Boutique','Gorevler':'Missions','Kelimeler':'Mots','Meydan Okuma':'Défi','Tema':'Thème','Dusunceler':'Réflexions','Rapor':'Rapport','Paylas':'Partager',
    'Kapat':'Fermer','Ac':'Ouvrir','Acildi':'Ouvert','Gonder':'Envoyer','Kaydet':'Enregistrer','Iptal':'Annuler','Devam':'Continuer','Geri':'Retour','Tamam':'OK','Oyun':'Jeu','Oda':'Salle','Sandik':'Coffre','Surpriz Sandik':'Coffre surprise','Sandigi ac':'Ouvrir le coffre','Bugunun hediyesi seni bekliyor.':'Le cadeau du jour t\'attend.',
    'Gorus':'Avis','Gorusler':'Avis','Oyunu begendin mi?':'As-tu aimé le jeu ?','Deneyimi nasil buldun?':'Comment était ton expérience ?','1 ile 5 arasinda puan ver':'Donne une note de 1 à 5','Kisa not yazabilirsin':'Tu peux écrire une courte note','Tesekkurler! Gorusun kaydedildi.':'Merci ! Ton avis a été enregistré.','Bu oda cok iyi':'Cette salle est très bien','Oyunu begendim':'J\'ai aimé le jeu','Bir sey eksik':'Il manque quelque chose','Begenmedim':'Je n\'ai pas aimé',
    'Davet':'Inviter','Kart':'Carte','Basari Karti':'Carte de réussite','Muzik':'Musique','Odul':'Récompense','Caba':'Effort','Paylasim':'Partage','Saglik':'Bien-être','Nefes':'Respiration','Sanat':'Art','Mutfak':'Cuisine','Aile':'Famille','Cevre':'Planète','Ders':'Apprentissage','Oyuncak':'Imaginaire','Sinema':'Cinéma','Gizli':'Mystère','Ingilizce':'Anglais','Almanca':'Allemand','Arapca':'Arabe','Turkce':'Turc',
    'Arkadasini davet et':'Inviter un ami','Linki kopyala':'Copier le lien','Kopyalandi':'Copié','Indir':'Télécharger','SUPER OGRENEN':'SUPER ÉLÈVE','yildiz topladi':'étoiles gagnées','Bugunun basarisi paylasilmaya deger!':'La réussite du jour mérite d\'être partagée !','Izle':'Voir','İzle':'Voir','Hazir misin?':'Prêt ?','Biliyor musun?':'Le savais-tu ?','Odaya Gir':'Entrer dans la salle','Bilmiyorum, gec':'Je ne sais pas, continuer'
  };

  var lang = localStorage.getItem('ev_values_lang') || 'tr';
  if(!dict[lang]) lang='tr';
  var originalRooms = {};
  var textOriginals = new WeakMap();
  var attrOriginals = new WeakMap();
  var phraseMap = {
    en:{
      'Dua Evi':'Wonder House','Dua':'Reflection','Dua et':'Reflect','Eve Gir':'Enter House','Adini yaz, galaksiye gir!':'Write your name and enter the galaxy!','Adini yaz':'Write your name','Adin nedir?':'What is your name?','Karakterini Sec':'Choose Your Character','Ogrenci':'Student','Ogren':'Learn','Buyu':'Grow','Kesfet':'Explore','Yemek Ver':'Feed','Buyuyor...':'Growing...','Yildiz':'Stars','Para':'Coins','Gunluk':'Daily','Bugunun Gorevleri':'Today\'s Tasks','Yukleniyor...':'Loading...','Baslangic':'Beginner','Dukkan':'Shop','Gorevler':'Tasks','Kelimeler':'Words','Meydan Okuma':'Challenge','Tema':'Theme','Dusunceler':'Reflections','Rapor':'Report','Paylas':'Share','Kapat':'Close','Ac':'Open','Acildi':'Opened','Gonder':'Send','Kaydet':'Save','Iptal':'Cancel','Devam':'Continue','Geri':'Back','Tamam':'OK','Oyun':'Game','Oda':'Room','Sandik':'Chest','Surpriz Sandik':'Surprise Chest','Sandigi ac':'Open the chest','Bugunun hediyesi seni bekliyor.':'Today\'s gift is waiting for you.','Gorus':'Feedback','Gorusler':'Feedback','Oyunu begendin mi?':'Did you like the game?','Deneyimi nasil buldun?':'How was the experience?','1 ile 5 arasinda puan ver':'Rate from 1 to 5','Kisa not yazabilirsin':'You can write a short note','Tesekkurler! Gorusun kaydedildi.':'Thank you! Your feedback was saved.','Bu oda cok iyi':'This room is very good','Oyunu begendim':'I liked the game','Bir sey eksik':'Something is missing','Begenmedim':'I did not like it','Davet':'Invite','Davet metni kopyalandi':'Invite text copied','Kart':'Card','Basari Karti':'Achievement Card','EduVerse Basari Kartim':'My EduVerse Achievement Card','Muzik':'Music','Bu odaya muzik':'Music for this room','Oda icin uygun fon':'Suitable background for this room','Oyun ve hareket enerjisi':'Game and movement energy','Odul':'Reward','Odul Odasi':'Rewards Room','Caba':'Effort','Paylasim':'Sharing','Saglik':'Wellness','Nefes':'Breathing','Sanat':'Art','Mutfak':'Kitchen','Aile':'Family','Cevre':'Planet Care','Ders':'Learning','Oyuncak':'Imagination','Sinema':'Cinema','Gizli':'Mystery','Ingilizce':'English','Almanca':'German','Arapca':'Arabic','Turkce':'Turkish','Bir EduVerse kahramani':'An EduVerse hero',' EduVerse oynuyor ve ':' is playing EduVerse and has earned ',' yildiz kazandi. Sen de dene: ':' stars. Try it too: ','Arkadasini davet et':'Invite a friend','Linki kopyala':'Copy link','Basari kartini ac':'Open achievement card','Kopyalandi':'Copied','Indir':'Download','SUPER OGRENEN':'SUPER LEARNER','oyna â€¢ ogren â€¢ basar':'play • learn • achieve','yildiz topladi':'stars collected','Bugunun basarisi paylasilmaya deger!':'Today\'s achievement is worth sharing!','icin':'for','uygun fon':'suitable background','Ritimli muzik odasi havasi':'rhythmic music room mood','Sakin oud ve sicak oda havasi':'calm oud and warm room mood','Sanat icin yumusak melodi':'soft melody for art','Sinema ve kesif havasi':'cinema and discovery mood','Manevi ve huzurlu fon':'peaceful calm background','Doga ve kus sesleri':'nature and bird sounds','Neseli cocuk enerjisi':'cheerful child energy','Ders icin hafif odak muzigi':'light focus music for learning','Kisa neseli cocuk melodisi':'short cheerful child melody','Macera ve sinema havasi':'adventure and cinema mood','Sakin sabah dogasi':'calm morning nature','Orman ve ilkbahar sesi':'forest and spring sound','Huzurlu islami fon':'peaceful calm background','Oud ve sicak aile havasi':'oud and warm family mood','Yumusak muzik kutusu havasi':'soft music-box mood'
    },
    de:{
      'Dua Evi':'Wunderhaus','Dua':'Reflexion','Dua et':'Reflektieren','Eve Gir':'Haus betreten','Adini yaz, galaksiye gir!':'Schreib deinen Namen und betrete die Galaxie!','Adini yaz':'Schreib deinen Namen','Adin nedir?':'Wie heisst du?','Karakterini Sec':'Waehle deine Figur','Ogrenci':'Schueler','Ogren':'Lernen','Buyu':'Wachsen','Kesfet':'Entdecken','Yemek Ver':'Fuettern','Buyuyor...':'Waechst...','Yildiz':'Sterne','Para':'Muenzen','Gunluk':'Taeglich','Bugunun Gorevleri':'Heutige Aufgaben','Yukleniyor...':'Laedt...','Baslangic':'Anfaenger','Dukkan':'Shop','Gorevler':'Aufgaben','Kelimeler':'Woerter','Meydan Okuma':'Challenge','Tema':'Design','Dusunceler':'Reflexionen','Rapor':'Fortschritt','Paylas':'Teilen','Kapat':'Schliessen','Ac':'Oeffnen','Acildi':'Geoeffnet','Gonder':'Senden','Kaydet':'Speichern','Iptal':'Abbrechen','Devam':'Weiter','Geri':'Zurueck','Tamam':'OK','Oyun':'Spiel','Oda':'Raum','Sandik':'Truhe','Surpriz Sandik':'Ueberraschungs-Truhe','Sandigi ac':'Truhe oeffnen','Bugunun hediyesi seni bekliyor.':'Das Geschenk des Tages wartet auf dich.','Gorus':'Feedback','Gorusler':'Feedback','Oyunu begendin mi?':'Hat dir das Spiel gefallen?','Deneyimi nasil buldun?':'Wie fandest du die Erfahrung?','1 ile 5 arasinda puan ver':'Bewerte von 1 bis 5','Kisa not yazabilirsin':'Du kannst eine kurze Notiz schreiben','Tesekkurler! Gorusun kaydedildi.':'Danke! Dein Feedback wurde gespeichert.','Bu oda cok iyi':'Dieser Raum ist sehr gut','Oyunu begendim':'Mir gefaellt das Spiel','Bir sey eksik':'Etwas fehlt','Begenmedim':'Mir gefaellt es nicht','Davet':'Einladen','Davet metni kopyalandi':'Einladungstext kopiert','Kart':'Karte','Basari Karti':'Erfolgskarte','EduVerse Basari Kartim':'Meine EduVerse Erfolgskarte','Muzik':'Musik','Bu odaya muzik':'Musik fuer diesen Raum','Oda icin uygun fon':'Passender Hintergrund fuer diesen Raum','Oyun ve hareket enerjisi':'Spiel- und Bewegungsenergie','Odul':'Belohnung','Odul Odasi':'Belohnungs-Raum','Caba':'Fleiss','Paylasim':'Teilen','Saglik':'Wellness','Nefes':'Atem','Sanat':'Kunst','Mutfak':'Kueche','Aile':'Familie','Cevre':'Planetenschutz','Ders':'Lernen','Oyuncak':'Traum','Sinema':'Filmstudio','Gizli':'Geheimnis','Ingilizce':'Englisch','Almanca':'Deutsch','Arapca':'Arabisch','Turkce':'Tuerkisch','Bir EduVerse kahramani':'Ein EduVerse-Held',' EduVerse oynuyor ve ':' spielt EduVerse und hat ',' yildiz kazandi. Sen de dene: ':' Sterne gesammelt. Probier es auch: ','Arkadasini davet et':'Freund einladen','Linki kopyala':'Link kopieren','Basari kartini ac':'Erfolgskarte oeffnen','Kopyalandi':'Kopiert','Indir':'Herunterladen','SUPER OGRENEN':'SUPER-LERNER','oyna â€¢ ogren â€¢ basar':'spielen • lernen • schaffen','yildiz topladi':'Sterne gesammelt','Bugunun basarisi paylasilmaya deger!':'Der heutige Erfolg ist es wert, geteilt zu werden!','icin':'fuer','uygun fon':'passender Hintergrund','Ritimli muzik odasi havasi':'rhythmische Musikraum-Stimmung','Sakin oud ve sicak oda havasi':'ruhige Oud und warme Raumstimmung','Sanat icin yumusak melodi':'sanfte Melodie fuer Kunst','Sinema ve kesif havasi':'Film- und Entdeckungsstimmung','Manevi ve huzurlu fon':'friedlicher ruhiger Hintergrund','Doga ve kus sesleri':'Natur- und Vogelstimmen','Neseli cocuk enerjisi':'froehliche Kinderenergie','Ders icin hafif odak muzigi':'leichte Fokusmusik zum Lernen','Kisa neseli cocuk melodisi':'kurze froehliche Kindermelodie','Macera ve sinema havasi':'Abenteuer- und Kinostimmung','Sakin sabah dogasi':'ruhige Morgennatur','Orman ve ilkbahar sesi':'Wald- und Fruehlingsklang','Huzurlu islami fon':'friedlicher ruhiger Hintergrund','Oud ve sicak aile havasi':'Oud und warme Familienstimmung','Yumusak muzik kutusu havasi':'sanfte Spieluhr-Stimmung','Basari karti':'Erfolgskarte','EduVerse Kahramani':'EduVerse-Held','oyna • ogren • basar':'spielen • lernen • schaffen','SUPER OGRENEN':'SUPER-LERNER','Başlangıç':'Anfaenger','Meraklı':'Neugierig','Merakli':'Neugierig','Duacı':'Traeumer','Duaci':'Traeumer','Kahraman':'Held','Yıldız':'Stern','Melek':'Engel','Bebek Okişi':'Baby Oki','Küçük Okişi':'Kleiner Oki','Okul Okişi':'Schul-Oki','Kahraman Okişi':'Helden-Oki','Yıldız Okişi':'Stern-Oki','Melek Okişi':'Engel-Oki','Melekler duanı gökyüzüne götürdü':'Dein Wunsch steigt zum Himmel','İnşallah kabul olur':'Ich hoffe, dein Wunsch wird erhoert','Duanız Kabul Olsun!':'Dein Wunsch soll gehoert werden','Ana Sayfaya Dön':'Zur Startseite','En iyi':'Am besten','en iyi':'am besten','EN IYI':'AM BESTEN','EN İYİ':'AM BESTEN','İzle':'Ansehen','Izle':'Ansehen','izle':'Ansehen','İZLE':'ANSEHEN','IZLE':'ANSEHEN','Yemek Ver!':'Fuettern!','Öğrenilen Kelimeler':'Gelernte Woerter','kelime öğrenildi':'Woerter gelernt','Bugün Öğrenilen':'Heute gelernt','Açtın':'geoeffnet','Açtın!':'geoeffnet!','Actin':'geoeffnet','Actin!':'geoeffnet!','açtın':'geoeffnet','actin':'geoeffnet','gün':'Tage','gun':'Tage','5 gün':'5 Tage','5 gun':'5 Tage','OKlandı':'bestaetigt','OKlandi':'bestaetigt','oklandı':'bestaetigt','oklandi':'bestaetigt','5 gün OKlandı!':'5 Tage bestaetigt!','5 gun OKlandi!':'5 Tage bestaetigt!','Açtın! 5 gün OKlandı!':'geoeffnet! 5 Tage bestaetigt!','Actin! 5 gun OKlandi!':'geoeffnet! 5 Tage bestaetigt!','BEBEK':'BABY','Bebek':'Baby','bebek':'Baby','ÖĞRENCİ':'SCHUELER','Öğrenci':'Schueler','Ogrenci':'Schueler','GELECEK':'ZUKUNFT','Gelecek':'Zukunft','gelecek':'Zukunft','ÖĞREN':'LERNEN','OGREN':'LERNEN','OĞREN':'LERNEN','BÜYÜ':'WACHSEN','BUYU':'WACHSEN','KEŞFET':'ENTDECKEN','KESFET':'ENTDECKEN','ÖĞREN · BÜYÜ · KEŞFET':'LERNEN · WACHSEN · ENTDECKEN','OGREN · BUYU · KESFET':'LERNEN · WACHSEN · ENTDECKEN','✦ ÖĞREN · BÜYÜ · KEŞFET ✦':'✦ LERNEN · WACHSEN · ENTDECKEN ✦','✦ OGREN · BUYU · KESFET ✦':'✦ LERNEN · WACHSEN · ENTDECKEN ✦','Streak':'Serie','streak':'Serie','Seri':'Serie','seri':'Serie','Günler':'Tage','Gunler':'Tage','günler':'Tage','gunler':'Tage','Gün':'Tag','Gun':'Tag','İki':'Zwei','Iki':'Zwei','iki':'zwei','2 gün':'2 Tage','2 gun':'2 Tage','İki gün':'Zwei Tage','Iki gun':'Zwei Tage','iki gün':'zwei Tage','iki gun':'zwei Tage','gün kaldı':'Tage uebrig','gun kaldi':'Tage uebrig','2 gün kaldı':'2 Tage uebrig','2 gun kaldi':'2 Tage uebrig','İki gün kaldı':'Zwei Tage uebrig','Iki gun kaldi':'Zwei Tage uebrig','üst üste':'in Folge','ust uste':'in Folge','Üst üste':'In Folge','Ust uste':'In Folge','Harika gidiyorsun':'Du machst das grossartig','harika gidiyorsun':'du machst das grossartig','İki gün üst üste harika gidiyorsun':'Zwei Tage in Folge, du machst das grossartig','Iki gun ust uste harika gidiyorsun':'Zwei Tage in Folge, du machst das grossartig','İki gün üst üste! Harika gidiyorsun':'Zwei Tage in Folge! Du machst das grossartig','Iki gun ust uste! Harika gidiyorsun':'Zwei Tage in Folge! Du machst das grossartig','Pzt':'Mo','Sal':'Di','Çar':'Mi','Car':'Mi','Per':'Do','Cum':'Fr','Cmt':'Sa','Paz':'So','HADI BASLIYALIM':'LOS GEHTS','HADI BASLAYALIM':'LOS GEHTS','Hadi basliyalim':'Los gehts','Hadi baslayalim':'Los gehts','Hadi başlayalım':'Los gehts','Hadi başlayalım!':'Los gehts!','Hadi baslayalim!':'Los gehts!','Hadi basliyalim!':'Los gehts!','Başlayalım':'Loslegen','Baslayalim':'Loslegen','baslayalim':'loslegen','HAZIR M?S?N?':'BEREIT?','HAZIR MISIN?':'BEREIT?','HAZIR M??S??N?':'BEREIT?','Haz?r?':'Bereit?','Hazir?':'Bereit?','Haz?r m?s?n?':'Bereit?','Hazir misin?':'Bereit?','Do?ru cevab? yakala!':'Fange die richtige Antwort!','Dogru cevabi yakala!':'Fange die richtige Antwort!','Kumandaya dokun ? oday? patla!':'Tippe auf den Controller und starte den Raum!','Kumandaya dokun - odayi patla!':'Tippe auf den Controller und starte den Raum!','KUMANDA':'CONTROLLER','HAZ?NE ODASI':'SCHATZRAUM','HAZINE ODASI':'SCHATZRAUM','LAZER ODASI':'LASERRAUM','L A Z E R   O D A S I':'L A S E R R A U M','Cevap!':'Antwort!','Cevap balonunu bul ve patlat!':'Finde den Antwort-Ballon und platze ihn!','Balondan bul!':'Finde es im Ballon!','Harika!':'Grossartig!','S?per!':'Super!','Super!':'Super!','Bravo!':'Bravo!','Do?ru!':'Richtig!','Dogru!':'Richtig!','Neredeyse!':'Fast!','Devam et!':'Mach weiter!','hata yapmak da ??renmek':'Fehler gehoeren zum Lernen','Seviye':'Level','??z?len':'Geloest','Cozulen':'Geloest','TEBRIKLER!':'GLUECKWUNSCH!','TEBR?KLER!':'GLUECKWUNSCH!','Evren sonsuz ? merak et, ke?fet, b?y!':'Das Universum ist endlos - sei neugierig, entdecke, wachse!','Doktor yazmadan':'Ohne aerztlichen Rat','ilac icmeyin!':'keine Medizin nehmen!','Sifa Allahtandir':'Gesundheit bewusst schuetzen','Borsa':'Boerse','Yilan':'Schlange','Tavsan':'Hase','At':'Pferd','?lk Ad?m!':'Erster Schritt!','Ilk Adim!':'Erster Schritt!','B?y?yorsun!':'Du waechst!','Buyuyorsun!':'Du waechst!','Kahramans?n!':'Du bist ein Held!','Kahramansin!':'Du bist ein Held!','M?cevhersin!':'Du bist ein Juwel!','Mucevhersin!':'Du bist ein Juwel!','Tac Hak Ettin!':'Du hast die Krone verdient!','Tac? Hak Ettin!':'Du hast die Krone verdient!','Ay Gibi Parl?yorsun!':'Du leuchtest wie der Mond!','Ay Gibi Parliyorsun!':'Du leuchtest wie der Mond!','50 y?ld?z!':'50 Sterne!','150 y?ld?z!':'150 Sterne!','300 y?ld?z!':'300 Sterne!','500 y?ld?z!':'500 Sterne!','1000 y?ld?z!':'1000 Sterne!','2000 y?ld?z!':'2000 Sterne!','g?nl?k seri':'Tage Serie','Gizli Oda A??k! 5 g?n tamamland?!':'Geheim-Raum offen! 5 Tage geschafft!','Gizli Oda aktif!':'Geheim-Raum aktiv!','Gizli Oda i?in':'fuer den Geheim-Raum','Gizli Oda icin':'fuer den Geheim-Raum','g?n kald?':'Tage uebrig','kelime ??renildi':'Woerter gelernt','Hen?z kelime yok!':'Noch keine Woerter!','odaya gir':'Raum betreten'
    },
    ar:{
      'Dua Evi':'بيت الدعاء','Dua':'دعاء','Dua et':'ادع الله','Dualar':'الأدعية','Dusunceler':'الأدعية','Eve Gir':'ادخل البيت','Adini yaz, galaksiye gir!':'اكتب اسمك وادخل المجرة!','Adini yaz':'اكتب اسمك','Adin nedir?':'ما اسمك؟','Karakterini Sec':'اختر شخصيتك','Ogrenci':'طالب','Ogren':'تعلم','Buyu':'اكبر','Kesfet':'استكشف','Yemek Ver':'أطعم أوكي','Buyuyor...':'ينمو...','Yildiz':'نجوم','Para':'نقود','Gunluk':'يومي','Bugunun Gorevleri':'مهام اليوم','Yukleniyor...':'جار التحميل...','Baslangic':'مبتدئ','Dukkan':'المتجر','Gorevler':'المهام','Kelimeler':'الكلمات','Meydan Okuma':'التحدي','Tema':'الشكل','Rapor':'تقرير','Paylas':'مشاركة','Kapat':'إغلاق','Ac':'افتح','Acildi':'تم الفتح','Gonder':'إرسال','Kaydet':'حفظ','Iptal':'إلغاء','Devam':'متابعة','Geri':'رجوع','Tamam':'حسنا','Oyun':'لعبة','Oda':'غرفة','Sandik':'صندوق','Surpriz Sandik':'صندوق المفاجأة','Sandigi ac':'افتح الصندوق','Bugunun hediyesi seni bekliyor.':'هدية اليوم تنتظرك.','Gorus':'رأي','Gorusler':'الآراء','Oyunu begendin mi?':'هل أعجبتك اللعبة؟','Deneyimi nasil buldun?':'كيف كانت التجربة؟','1 ile 5 arasinda puan ver':'قيّم من 1 إلى 5','Kisa not yazabilirsin':'يمكنك كتابة ملاحظة قصيرة','Tesekkurler! Gorusun kaydedildi.':'شكرا! تم حفظ رأيك.','Bu oda cok iyi':'هذه الغرفة جيدة جدا','Oyunu begendim':'أعجبتني اللعبة','Bir sey eksik':'هناك شيء ناقص','Begenmedim':'لم تعجبني','Davet':'دعوة','Davet metni kopyalandi':'تم نسخ نص الدعوة','Kart':'بطاقة','Basari Karti':'بطاقة الإنجاز','EduVerse Basari Kartim':'بطاقة إنجازي في EduVerse','Muzik':'الصوت الجميل','Bu odaya muzik':'صوت مناسب لهذه الغرفة','Oda icin uygun fon':'خلفية مناسبة لهذه الغرفة','Oyun ve hareket enerjisi':'طاقة اللعب والحركة','Odul':'جائزة','Odul Odasi':'غرفة الجوائز','Caba':'اجتهاد','Paylasim':'صدقة','Saglik':'شفاء','Nefes':'نفس طيب','Sanat':'فن','Mutfak':'طعام','Aile':'عائلة','Cevre':'أمانة','Ders':'علم','Oyuncak':'خيال','Sinema':'سينما','Gizli':'أسرار','Ingilizce':'الإنجليزية','Almanca':'الألمانية','Arapca':'العربية','Turkce':'التركية','Bir EduVerse kahramani':'بطل من EduVerse',' EduVerse oynuyor ve ':' يلعب EduVerse وجمع ',' yildiz kazandi. Sen de dene: ':' نجمة. جربها أنت أيضا: ','Arkadasini davet et':'ادع صديقا','Linki kopyala':'نسخ الرابط','Basari kartini ac':'افتح بطاقة الإنجاز','Kopyalandi':'تم النسخ','Indir':'تنزيل','SUPER OGRENEN':'طالب مميز','oyna â€¢ ogren â€¢ basar':'العب • تعلم • انجح','yildiz topladi':'جمع نجوما','Bugunun basarisi paylasilmaya deger!':'إنجاز اليوم يستحق المشاركة!','icin':'لـ','uygun fon':'خلفية مناسبة','Ritimli muzik odasi havasi':'صوت جميل بإيقاع هادئ','Sakin oud ve sicak oda havasi':'عود هادئ وأجواء دافئة','Sanat icin yumusak melodi':'لحن ناعم للفن','Sinema ve kesif havasi':'أجواء سينما واكتشاف','Manevi ve huzurlu fon':'خلفية إيمانية هادئة','Doga ve kus sesleri':'أصوات الطبيعة والطيور','Neseli cocuk enerjisi':'طاقة أطفال مرحة','Ders icin hafif odak muzigi':'صوت تركيز خفيف للتعلم','Kisa neseli cocuk melodisi':'لحن أطفال قصير ومبهج','Macera ve sinema havasi':'أجواء مغامرة وسينما','Sakin sabah dogasi':'طبيعة صباحية هادئة','Orman ve ilkbahar sesi':'صوت الغابة والربيع','Huzurlu islami fon':'خلفية إيمانية هادئة','Oud ve sicak aile havasi':'عود وأجواء عائلية دافئة','Yumusak muzik kutusu havasi':'أجواء صندوق موسيقى ناعمة'
    }
  };
  phraseMap.fr=Object.assign({}, phraseMap.fr||{}, frenchPhraseMap);

  var paintPhraseMap={
    en:{'Yıldız':'Star','Yildiz':'Star','Kalp':'Heart','Güneş':'Sun','Gunes':'Sun','Çiçek':'Flower','Cicek':'Flower','Kelebek':'Butterfly','Araba':'Car','Ev':'House','Ay':'Moon','Balık':'Fish','Balik':'Fish','Robot':'Robot','Ağaç':'Tree','Agac':'Tree','Uçak':'Plane','Ucak':'Plane','Boyama Odası':'Color Studio','Boyama Odasi':'Color Studio','Temizle':'Clear','Renk seç':'Choose color','Şablon seç':'Choose template','Sablon sec':'Choose template','Tuvale dokun':'Touch canvas'},
    de:{'Yıldız':'Stern','Yildiz':'Stern','Kalp':'Herz','Güneş':'Sonne','Gunes':'Sonne','Çiçek':'Blume','Cicek':'Blume','Kelebek':'Schmetterling','Araba':'Auto','Ev':'Haus','Ay':'Mond','Balık':'Fisch','Balik':'Fisch','Robot':'Roboter','Ağaç':'Baum','Agac':'Baum','Uçak':'Flugzeug','Ucak':'Flugzeug','Boyama Odası':'Farbstudio','Boyama Odasi':'Farbstudio','Temizle':'Leeren','Renk seç':'Farbe wählen','Şablon seç':'Vorlage wählen','Sablon sec':'Vorlage wählen','Tuvale dokun':'Leinwand berühren'},
    fr:{'Yıldız':'Étoile','Yildiz':'Étoile','Kalp':'Cœur','Güneş':'Soleil','Gunes':'Soleil','Çiçek':'Fleur','Cicek':'Fleur','Kelebek':'Papillon','Araba':'Voiture','Ev':'Maison','Ay':'Lune','Balık':'Poisson','Balik':'Poisson','Robot':'Robot','Ağaç':'Arbre','Agac':'Arbre','Uçak':'Avion','Ucak':'Avion','Boyama Odası':'Atelier de coloriage','Boyama Odasi':'Atelier de coloriage','Temizle':'Effacer','Renk seç':'Choisis une couleur','Şablon seç':'Choisis un modèle','Sablon sec':'Choisis un modèle','Tuvale dokun':'Touche la toile'},
    ar:{'Yıldız':'نجمة','Yildiz':'نجمة','Kalp':'قلب','Güneş':'شمس','Gunes':'شمس','Çiçek':'زهرة','Cicek':'زهرة','Kelebek':'فراشة','Araba':'سيارة','Ev':'بيت','Ay':'قمر','Balık':'سمكة','Balik':'سمكة','Robot':'روبوت','Ağaç':'شجرة','Agac':'شجرة','Uçak':'طائرة','Ucak':'طائرة','Boyama Odası':'غرفة التلوين','Boyama Odasi':'غرفة التلوين','Temizle':'مسح','Renk seç':'اختر اللون','Şablon seç':'اختر القالب','Sablon sec':'اختر القالب','Tuvale dokun':'المس اللوحة'}
  };
  Object.keys(paintPhraseMap).forEach(function(pl){ phraseMap[pl]=Object.assign({}, phraseMap[pl]||{}, paintPhraseMap[pl]); });


  function $(id){ return document.getElementById(id); }
  function D(){ return dict[lang] || dict.en; }

  function evI18nDiscoveryTitle(){
    if(window.evDiscoveryPlanetTitle) return window.evDiscoveryPlanetTitle(window.playerName||'Kahraman');
    var n=String(window.playerName||'Kahraman').trim()||'Kahraman';
    var low=n.toLowerCase(), vowels='aıoueiöü', last='', lastChar='';
    for(var c=low.length-1;c>=0;c--){ if(/[a-zçğıöşü]/i.test(low.charAt(c))){ lastChar=low.charAt(c); break; } }
    for(var i=low.length-1;i>=0;i--){ if(vowels.indexOf(low.charAt(i))>=0){ last=low.charAt(i); break; } }
    var base=(last==='a'||last==='ı')?'ın':((last==='o'||last==='u')?'un':((last==='ö'||last==='ü')?'ün':'in'));
    var suf=(vowels.indexOf(lastChar)>=0?'n':'')+base;
    return n+"'"+suf+' Keşif Gezegeni';
  }

  function lockBrowserTranslate(){
    try{
      document.documentElement.setAttribute('translate','no');
      document.documentElement.classList.add('notranslate');
      document.documentElement.lang = valuesOn() ? lang : 'tr';
      document.documentElement.dir = (valuesOn() && lang==='ar') ? 'rtl' : 'ltr';
      if(document.body){ document.body.setAttribute('translate','no'); document.body.classList.add('notranslate'); }
    }catch(e){}
  }

  function valuesOn(){ try{return localStorage.getItem('eduverse_values_mode')==='1' || window._valuesMode===true;}catch(e){return false;} }
  function withIcon(text, icon){ return icon ? icon + ' ' + text : text; }
  function applyHeroProgressText(){
    var activeLang = valuesOn() ? lang : 'tr';
    var growth=$('growth-bar-label');
    if(growth){
      var left=(growth.textContent.match(/\d+/)||['15000'])[0];
      if(activeLang==='ar') growth.textContent='\u0628\u0630\u0631\u0629 \u0623\u0648\u0643\u064a: \u0628\u0642\u064a '+left+' \u0646\u062c\u0645\u0629';
      else if(activeLang==='tr') growth.textContent='Tohum Oki -> '+left+' y\u0131ld\u0131z kald\u0131';
      else if(activeLang==='fr') growth.textContent='Graine Oki -> '+left+' \u00e9toiles restantes';
      else if(valuesOn()) growth.textContent=D().growing;
    }
    var level=$('hlv');
    if(level){
      if(activeLang==='ar') level.textContent='\u0645\u0628\u062a\u062f\u0626';
      else if(activeLang==='tr') level.textContent='Ba\u015flang\u0131\u00e7';
      else if(valuesOn()) level.textContent=D().level;
    }
  }

  function ensurePanel(){
    if($('ev-values-panel')) return;
    var p=document.createElement('div');
    p.id='ev-values-panel';
    p.innerHTML='<div class="ev-values-head"><div><div class="ev-values-title"></div><div class="ev-values-sub"></div></div><button id="ev-values-close" type="button">×</button></div><div class="ev-values-langs"><button data-vlang="de">Deutsch</button><button data-vlang="en">English</button><button data-vlang="tr">Türkçe</button><button data-vlang="fr">Français</button><button data-vlang="ar">العربية</button></div><div class="ev-values-card"><div class="ev-values-card-title"></div><div class="ev-values-card-text"></div></div>';
    document.body.appendChild(p);
    $('ev-values-close').onclick=function(){p.classList.remove('show');};
    p.querySelectorAll('[data-vlang]').forEach(function(b){b.onclick=function(){setValuesLang(b.getAttribute('data-vlang'));};});
  }

  function showPanel(){ ensurePanel(); renderPanel(); $('ev-values-panel').classList.add('show'); }
  function renderPanel(){
    ensurePanel(); var d=D(), p=$('ev-values-panel');
    p.querySelector('.ev-values-title').textContent=d.panelTitle;
    p.querySelector('.ev-values-sub').textContent=d.panelSub;
    p.querySelector('.ev-values-card-title').textContent=d.todayTitle;
    p.querySelector('.ev-values-card-text').textContent=d.todayText;
    p.querySelectorAll('[data-vlang]').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-vlang')===lang);});
    p.dir = lang==='ar'?'rtl':'ltr';
  }

  function refreshSpecialRoomText(){
    try{
      if(typeof window.evApplySpecialGerman==='function') window.evApplySpecialGerman();
      if(typeof window.evV47S9ApplyBoyamaTexts==='function') window.evV47S9ApplyBoyamaTexts();
      if(typeof window.evV47S9ApplyStreakTexts==='function') window.evV47S9ApplyStreakTexts();
      setTimeout(function(){
        if(typeof window.evApplySpecialGerman==='function') window.evApplySpecialGerman();
        if(typeof window.evV47S9ApplyBoyamaTexts==='function') window.evV47S9ApplyBoyamaTexts();
        if(typeof window.evV47S9ApplyStreakTexts==='function') window.evV47S9ApplyStreakTexts();
      },80);
      setTimeout(function(){
        if(typeof window.evApplySpecialGerman==='function') window.evApplySpecialGerman();
        if(typeof window.evV47S9ApplyBoyamaTexts==='function') window.evV47S9ApplyBoyamaTexts();
        if(typeof window.evV47S9ApplyStreakTexts==='function') window.evV47S9ApplyStreakTexts();
      },220);
    }catch(e){}
  }

  function setValuesLang(l){ if(!dict[l]) return; lang=l; localStorage.setItem('ev_values_lang',lang); try{localStorage.setItem('edu_values_lang',lang);localStorage.setItem('eduverse_lang',lang);localStorage.setItem('app_lang',lang);localStorage.setItem('edu_lang',lang);localStorage.setItem('lang',lang);}catch(e0){} try{document.documentElement.lang=lang;document.documentElement.dir=(valuesOn()&&lang==='ar')?'rtl':'ltr';}catch(e1){} lockBrowserTranslate(); try{restoreGlobalTranslations();}catch(e){} textOriginals=new WeakMap(); attrOriginals=new WeakMap(); applyValuesI18n(); refreshSpecialRoomText(); if(typeof window.eduverseRefreshFeedbackLang==='function') window.eduverseRefreshFeedbackLang(); if(typeof window.eduverseRefreshChestLang==='function') window.eduverseRefreshChestLang(); if(typeof window.eduverseRefreshInviteLang==='function') window.eduverseRefreshInviteLang(); if(typeof window.eduverseRefreshShareLang==='function') window.eduverseRefreshShareLang(); if(typeof window.eduverseRefreshStreakLang==='function') window.eduverseRefreshStreakLang(); showPanel(); }

  function saveOriginalRooms(){
    if(!window.ROOMS) return;
    window.ROOMS.forEach(function(r){ if(!originalRooms[r.id]) originalRooms[r.id]={name:r._origName||r.name, ico:r._origIco||r.ico}; });
  }

  function applyRoomNames(){
    if(!window.ROOMS) return;
    saveOriginalRooms(); var d=D();
    var trRooms={
      ibadet:['\u0130badet Odas\u0131','\ud83e\uddd8'], sinema:['Sinema Odas\u0131','\ud83c\udfac'],
      ders:['Ders Odas\u0131','\ud83d\udcda'], oyuncak:['Oyuncak Odas\u0131','\ud83e\uddf8'],
      cevre:['\u00c7evre Odas\u0131','\ud83c\udf31'], caliskan:['\u00c7al\u0131\u015fkanl\u0131k Odas\u0131','\ud83d\udcaa'],
      sanat:['Sanat At\u00f6lyesi','\ud83c\udfa8'], mutfak:['Mutfak Odas\u0131','\ud83c\udf73'],
      aile:['Aile Odas\u0131','\ud83d\udc6a'], ada:['Sessiz Ada','\ud83c\udfdd\ufe0f'],
      sifa:['\u015eifa Odas\u0131','\ud83c\udf3f'], ilkbahar:['\u0130lkbahar Odas\u0131','\ud83c\udf38'],
      odulodasi:['\u00d6d\u00fcl Odas\u0131','\ud83c\udfc6'], nefes:['Nefes Odas\u0131','\ud83c\udf2c\ufe0f'],
      para:['Para Odas\u0131','\ud83d\udcb0'], arapca:['Arap\u00e7a Odas\u0131','\u270d\ufe0f'],
      gizli:['Gizli Oda','\ud83d\udd2e'], english:['\u0130ngilizce Odas\u0131','\ud83c\uddec\ud83c\udde7'],
      deutsch:['Almanca Odas\u0131','\ud83c\udde9\ud83c\uddea'], okyanus:['Okyanus Odas\u0131','\ud83c\udf0a'],
      atlas:['D\u00fcnya Ka\u015fifi','\ud83c\udf0c'], muzik:['M\u00fczik Odas\u0131','\ud83c\udfb5'],
      boyama:['Boyama Odas\u0131','\ud83c\udfa8'], kumanda:['Kumanda Odas\u0131','\ud83c\udfae'],
      puzzle:['Puzzle Odas\u0131','\ud83e\udde9'], lazer:['Lazer Odas\u0131','\u26a1'],
      bilgisayar:['Bilgisayar Odas\u0131','\ud83d\udcbb'], hayvanat:['Hayvanat Bah\u00e7esi','\ud83e\udd81'],
      refleks:['Refleks Odas\u0131','\u26a1']
    };
    window.ROOMS.forEach(function(r){
      if(valuesOn() && d.rooms[r.id]){ r.name=d.rooms[r.id][0]; r.ico=d.rooms[r.id][1]; }
      else if(!valuesOn() && trRooms[r.id]){ r.name=trRooms[r.id][0]; r.ico=trRooms[r.id][1]; }
      else if(!valuesOn() && originalRooms[r.id]){ r.name=originalRooms[r.id].name; r.ico=originalRooms[r.id].ico; }
    });
    if(typeof window.buildGrid==='function') window.buildGrid();
  }

  function setAllByOnclick(part, text, icon){
    document.querySelectorAll('[onclick*="'+part+'"]').forEach(function(el){
      if(el.id==='values-toggle-btn') return;
      el.textContent=withIcon(text, icon||'');
    });
  }

  function applyTurkishBaseUI(){
    if(valuesOn()) return;
    var set=function(id,text){var el=$(id);if(el)el.textContent=text;};
    var title=$('hm-title');
    if(title && window.playerName) title.textContent=evI18nDiscoveryTitle();

    set('feed-btn','\ud83c\udf4e Oki\u2019yi Besle');
    applyHeroProgressText();

    var streakTitle=document.querySelector('#streak-ov div[style*="letter-spacing:3px"]');
    if(streakTitle) streakTitle.textContent='G\u00dcN SER\u0130S\u0130';
    var streakBest=$('streak-best');
    if(streakBest){
      var best=(streakBest.textContent.match(/\d+/)||['0'])[0];
      streakBest.textContent='En iyi seri: '+best+' g\u00fcn';
    }
    var streakCount=parseInt(($('streak-count')||{}).textContent||'0',10)||0;
    var streakMsg=$('streak-msg-ov');
    if(streakMsg){
      var messages={1:'Ho\u015f geldin! Serin \u015fimdi ba\u015fl\u0131yor.',2:'2 g\u00fcn \u00fcst \u00fcste! Harika gidiyorsun.',3:'3 g\u00fcn \u00fcst \u00fcste! Al\u0131\u015fkanl\u0131k olu\u015fuyor.',5:'5 g\u00fcn! Ger\u00e7ekten kararl\u0131s\u0131n.',7:'Tam bir hafta! Muhte\u015fem!'};
      streakMsg.textContent=messages[streakCount]||(streakCount+' g\u00fcn \u00fcst \u00fcste! Devam et!');
    }
    var cal=$('streak-cal');
    if(cal){
      var days=['Pzt','Sal','\u00c7ar','Per','Cum','Cmt','Paz'];
      Array.prototype.forEach.call(cal.children,function(dot,i){if(dot)dot.textContent=days[i%7];});
    }
    var goalBar=$('streak-goal-bar');
    if(goalBar && goalBar.parentElement && goalBar.parentElement.previousElementSibling) goalBar.parentElement.previousElementSibling.textContent='Gizli oda ilerlemesi';
    document.querySelectorAll('[onclick*="hideStreakOv"]').forEach(function(el){el.textContent='Devam';});
    document.querySelectorAll('[onclick*="_adaStop"]').forEach(function(el){el.textContent='\u2715 Kapat';});

    var exactButtons={Close:'Kapat',Back:'Geri',Home:'Ana Sayfa',Continue:'Devam',Clear:'Temizle','Enter Room':'Odaya Gir','I do not know, skip':'Bilmiyorum, ge\u00e7'};
    document.querySelectorAll('button, .sq2-skip').forEach(function(el){
      var key=(el.textContent||'').trim();
      if(exactButtons[key]) el.textContent=exactButtons[key];
    });
  }

  function applyTurkishValuesExactText(){
    if(!valuesOn() || lang!=='tr') return;
    var streakTitle=document.querySelector('#streak-ov div[style*="letter-spacing:3px"]');
    if(streakTitle) streakTitle.textContent='GÜN SERİSİ';
    var streakBest=$('streak-best');
    if(streakBest && /^Best streak: (\d+) days?$/.test(streakBest.textContent||'')) streakBest.textContent='En iyi seri: '+RegExp.$1+' gün';
    var goalBar=$('streak-goal-bar');
    if(goalBar && goalBar.parentElement && goalBar.parentElement.previousElementSibling) goalBar.parentElement.previousElementSibling.textContent='Gizli oda ilerlemesi';
    document.querySelectorAll('[onclick*="hideStreakOv"]').forEach(function(el){el.textContent='Devam';});
  }

  function applyLoginText(){
    lockBrowserTranslate();
    var active=valuesOn();
    var l=active?lang:'tr';
    var ui={
      tr:{motto:'OGREN - BUYU - KESFET',baby:'BEBEK',student:'OGRENCI',future:'GELECEK',subtitle:'Adini yaz ve galaksiye gir!',character:'KARAKTERINI SEC',placeholder:'Adin nedir?',enter:'EduVerse\'e Gir'},
      en:{motto:'LEARN - GROW - DISCOVER',baby:'BABY',student:'STUDENT',future:'FUTURE',subtitle:'Write your name and enter the galaxy!',character:'CHOOSE YOUR CHARACTER',placeholder:'What is your name?',enter:'Enter House'},
      de:{motto:'LERNEN - WACHSEN - ENTDECKEN',baby:'BABY',student:'SCHUELER',future:'ZUKUNFT',subtitle:'Schreib deinen Namen und betrete die Galaxie!',character:'WAEHLE DEINE FIGUR',placeholder:'Wie heisst du?',enter:'Haus betreten'},
      fr:{motto:'APPRENDRE - GRANDIR - DÉCOUVRIR',baby:'BÉBÉ',student:'ÉLÈVE',future:'AVENIR',subtitle:'Écris ton nom et entre dans la galaxie !',character:'CHOISIS TON PERSONNAGE',placeholder:'Comment t\'appelles-tu ?',enter:'Entrer'},
      ar:{motto:'تعلم - انمُ - اكتشف',baby:'طفل',student:'طالب',future:'المستقبل',subtitle:'اكتب اسمك وادخل المجرة!',character:'اختر شخصيتك',placeholder:'ما اسمك؟',enter:'ادخل البيت'}
    };
    var t=ui[l]||ui.tr;
    var set=function(id,text){var el=$(id);if(el)el.textContent=text;};
    set('ev-login-motto',t.motto); set('ev-login-baby',t.baby); set('ev-login-student',t.student); set('ev-login-future',t.future);
    set('ev-login-subtitle',t.subtitle); set('ev-character-title',t.character);
    var ni=$('ni'); if(ni) ni.placeholder=t.placeholder;
    var nb=$('nb'); if(nb) nb.textContent=t.enter;
    document.documentElement.lang=l;
  }
  function applyHomeText(){
    applyLoginText();
    var d=D();
    if(valuesOn()){
      document.title=d.app+' - EduVerse';
      var prayer=$('prayer-banner'); if(prayer) prayer.style.display='none';
      var story=document.querySelector('.story-banner');
      if(story){
        var ico=story.querySelector('.sb-ico'); if(ico) ico.textContent='EV';
        var st=story.querySelector('.sb-title'); if(st) st.textContent=lang==='de'?'Reflexionen':d.buttons.reflect;
        var ss=story.querySelector('.sb-sub'); if(ss) ss.textContent=lang==='de'?'Ruhe - Werte - Wuensche - Dankbarkeit':'Values - Reflection - Gratitude';
      }
    }
    var ni=$('ni'); if(ni) ni.placeholder=d.namePlaceholder;
    var nb=$('nb'); if(nb && valuesOn()) nb.textContent=withIcon(d.enter,'🚀');
    var feed=$('feed-btn'); if(feed && valuesOn()) feed.textContent=withIcon(d.feed,'🍎');
    applyHeroProgressText();
    var labels=document.querySelectorAll('[onclick="showStarJar()"] div, [onclick="showCrystalJar()"] div, [onclick="showDailyJar()"] div');
    labels.forEach(function(el){
      var txt=el.textContent||'';
      if(txt.indexOf('Y')>=0 || txt.indexOf('Stars')>=0) el.textContent=withIcon(d.star,'⭐');
      if(txt.indexOf('Para')>=0 || txt.indexOf('Coins')>=0) el.textContent=withIcon(d.coins,'🪙');
      if(txt.indexOf('G')>=0 || txt.indexOf('Daily')>=0) el.textContent=withIcon(d.daily,'📊');
    });
    var dailyTitle=document.querySelector('#daily-strip div div'); if(dailyTitle && valuesOn()) dailyTitle.textContent=d.dailyTasks;
    var dailyText=$('daily-strip-text'); if(dailyText && valuesOn() && /Yuklen|Yüklen|Loading|Laedt|جار/.test(dailyText.textContent)) dailyText.textContent=d.loading;
  }

  function normText(v){
    return String(v||'')
      .replace(/[İIı]/g,'i').replace(/[Şş]/g,'s').replace(/[Ğğ]/g,'g').replace(/[Üü]/g,'u').replace(/[Öö]/g,'o').replace(/[Çç]/g,'c')
      .replace(/[🎮🎵🎨🏆⭐📓🛍️📊🔗🚀🍎🌍🧘🎬📚🧸🌱💪🍳👨‍👩‍👧🏝️🌿🌸🤝✍️🔮🇬🇧🇩🇪🌊⚡💻🦁🏡✦·]/g,' ')
      .replace(/\s+/g,' ').trim().toLowerCase();
  }

  function translatedFromOriginal(original){
    if(!valuesOn()) return original;
    if(lang==='tr') return original;
    var clean=normText(original);
    if(!clean) return original;
    var map=phraseMap[lang]||phraseMap.en;
    var exact={};
    Object.keys(map).forEach(function(k){ exact[normText(k)] = map[k]; });
    if(exact[clean]) return exact[clean];
    var out=String(original||'');
    Object.keys(map).sort(function(a,b){return b.length-a.length;}).forEach(function(k){
      var nk=normText(k);
      if(!nk || clean.indexOf(nk)<0) return;
      var parts=k.split(/\s+/).map(function(part){
        return part.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
          .replace(/i/g,'[iİIı]').replace(/s/g,'[sşŞ]').replace(/g/g,'[gğĞ]').replace(/u/g,'[uüÜ]').replace(/o/g,'[oöÖ]').replace(/c/g,'[cçÇ]');
      });
      try{ var pattern=parts.join('\\s+'); if(parts.length===1) pattern='\\b'+pattern+'\\b'; out=out.replace(new RegExp(pattern,'gi'), map[k]); }catch(e){}
    });
    if(lang==='de'){
      out=out.replace(/Iki\s+Tage/gi,'Zwei Tage')
        .replace(/İki\s+Tage/gi,'Zwei Tage')
        .replace(/iki\s+Tage/gi,'zwei Tage')
        .replace(/Tage\s+seri/gi,'Tage Serie')
        .replace(/Tage\s+Seri/g,'Tage Serie')
        .replace(/seri\s+bolumu/gi,'Serienbereich')
        .replace(/seri\s+bölümü/gi,'Serienbereich')
        .replace(/Oeffnen[ıi]k/gi,'geoeffnet')
        .replace(/Geoeffnet[ıi]k/gi,'geoeffnet')
        .replace(/OKland[ıi]/gi,'bestaetigt')
        .replace(/\bgün\b/gi,'Tage')
        .replace(/\bgun\b/gi,'Tage');
    }
    return out;
  }

  function applyGlobalTranslations(){
    if(!valuesOn()) return;
    var skip={SCRIPT:1,STYLE:1,NOSCRIPT:1,TEMPLATE:1,IFRAME:1,CANVAS:1,SVG:1};
    var walker=document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode:function(node){
        var p=node.parentElement;
        if(!p || skip[p.tagName] || p.closest('#ev-values-panel,#boyama-ov,#streak-ov,#room-hook-ov,#ov-soru2')) return NodeFilter.FILTER_REJECT;
        var t=node.nodeValue||'';
        if(!t.trim() || t.length>220) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function(node){
      if(!textOriginals.has(node)) textOriginals.set(node,node.nodeValue);
      var next=translatedFromOriginal(textOriginals.get(node));
      if(next && next!==node.nodeValue) node.nodeValue=next;
    });
    document.querySelectorAll('input[placeholder], textarea[placeholder], button[title], [aria-label], [title]').forEach(function(el){
      ['placeholder','title','aria-label'].forEach(function(attr){
        if(!el.hasAttribute || !el.hasAttribute(attr)) return;
        var current=el.getAttribute(attr)||'';
        var bag=attrOriginals.get(el)||{};
        if(!bag[attr]) bag[attr]=current;
        attrOriginals.set(el,bag);
        var next=translatedFromOriginal(bag[attr]);
        if(next && next!==current) el.setAttribute(attr,next);
      });
    });
  }

  function restoreGlobalTranslations(){
    var skip={SCRIPT:1,STYLE:1,NOSCRIPT:1,TEMPLATE:1,IFRAME:1,CANVAS:1,SVG:1};
    var walker=document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode:function(node){
        var p=node.parentElement;
        if(!p || skip[p.tagName] || p.closest('#ev-values-panel,#boyama-ov,#streak-ov,#room-hook-ov,#ov-soru2')) return NodeFilter.FILTER_REJECT;
        return textOriginals.has(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function(node){ node.nodeValue=textOriginals.get(node); });
    document.querySelectorAll('input[placeholder], textarea[placeholder], button[title], [aria-label], [title]').forEach(function(el){
      var bag=attrOriginals.get(el);
      if(!bag) return;
      Object.keys(bag).forEach(function(attr){ if(el.setAttribute) el.setAttribute(attr,bag[attr]); });
    });
  }

  function applyVisibleText(){
    restoreGlobalTranslations();
    applyLoginText();
    var d=D();
    var title=$('hm-title'); if(title && valuesOn()) title.textContent=d.app;
    var btn=$('values-toggle-btn'); if(btn){btn.classList.toggle('ev-values-glow',valuesOn()); btn.title=valuesOn()?d.panelTitle:'Values Mode'; btn.textContent=valuesOn()?lang.toUpperCase():'TR';}
    if(valuesOn()){
      applyHomeText();
      setAllByOnclick('showShopRoom', d.buttons.shop, '🛍️');
      setAllByOnclick('showTasks', d.buttons.tasks, '⭐');
      setAllByOnclick('showKelime', d.buttons.words, '📓');
      setAllByOnclick('showChamp', d.buttons.champ, '🏆');
      setAllByOnclick('cycleTheme', d.buttons.theme, '🎨');
      setAllByOnclick('showDua', d.buttons.reflect, '🌍');
      var report=$('rapor-btn'); if(report) report.textContent=withIcon(d.buttons.report,'📊');
      var qr=$('qr-btn'); if(qr) qr.textContent=withIcon(d.buttons.qr,'🔗');
      var inv=$('ev-invite-btn'); if(inv) inv.setAttribute('aria-label',d.invite);
      var card=$('ev-share-btn'); if(card) card.setAttribute('aria-label',d.card);
      var chest=$('ev-chest-btn'); if(chest) chest.setAttribute('aria-label',d.chest);
      var fb=$('ev-feedback-btn'); if(fb) fb.setAttribute('aria-label',d.feedback);
      var ct=document.querySelector('.ev-chest-title'); if(ct) ct.textContent=d.chestTitle;
      var co=$('ev-chest-open'); if(co) co.textContent=d.chestOpen;
      var cc=$('ev-chest-close'); if(cc) cc.textContent=d.chestClose;
      applyGlobalTranslations();
      applyInternationalExactText();
      applyTurkishValuesExactText();
      applyLoginText();
      document.documentElement.dir = lang==='ar' ? 'rtl' : 'ltr';
    } else {
      restoreGlobalTranslations();
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'tr';
      var trTitle=$('hm-title'); if(trTitle && window.playerName) trTitle.textContent=evI18nDiscoveryTitle();
      var trFeed=$('feed-btn'); if(trFeed) trFeed.textContent='\ud83c\udf4e Oki\u2019yi Besle';
      setAllByOnclick('showShopRoom', 'D\u00fckkan', '\ud83d\uded1');
      setAllByOnclick('showTasks', 'G\u00f6revler', '\u2b50');
      setAllByOnclick('showKelime', 'Kelimeler', '\ud83d\udcd3');
      setAllByOnclick('showChamp', '\u015eampiyona', '\ud83c\udfc6');
      setAllByOnclick('cycleTheme', 'Tema', '\ud83c\udfa8');
      setAllByOnclick('showDua', 'Dualar', '\ud83c\udf0d');
      var trReport=$('rapor-btn'); if(trReport) trReport.textContent='\ud83d\udcca Rapor';
      var trQr=$('qr-btn'); if(trQr) trQr.textContent='\ud83d\udd17 Payla\u015f';
      applyTurkishBaseUI();
    }
  }

  function applyInternationalExactText(){
    if(!valuesOn() || (lang!=='fr' && lang!=='ar')) return;
    var fr={
      'Close':'Fermer','Back':'Retour','Home':'Accueil','Continue':'Continuer','Clear':'Effacer','Open':'Ouvrir','Done':'Terminé',
      'Daily Tasks':'Missions du jour','Today Tasks':'Missions du jour','Today':'Aujourd\'hui','Baby Oki':'Bébé Oki','Today 0 XP earned':'0 XP gagné aujourd\'hui',
      'Went to school':'Je suis allé à l\'école','I went to school today':'Je suis allé à l\'école aujourd\'hui','Learned something new':'J\'ai appris quelque chose','Practiced for at least 30 minutes':'J\'ai pratiqué pendant au moins 30 minutes',
      'Read':'Lecture','Read a few pages':'J\'ai lu quelques pages','Listened to music':'J\'ai écouté de la musique','Enjoyed music mindfully':'J\'ai écouté attentivement',
      'Ate healthy food':'J\'ai mangé sainement','Ate fruit or vegetables':'J\'ai mangé des fruits ou des légumes','Moved my body':'J\'ai bougé','Kept my body active':'Je suis resté actif',
      'Was kind':'J\'ai été gentil','Helped someone today':'J\'ai aidé quelqu\'un aujourd\'hui','Stayed focused':'Je suis resté concentré','Finished one task calmly':'J\'ai terminé une tâche calmement',
      'Was creative':'J\'ai été créatif','Drew, built, or invented something':'J\'ai dessiné, construit ou inventé quelque chose','Cared for nature':'J\'ai pris soin de la nature','Did something good for the planet':'J\'ai fait quelque chose de bon pour la planète',
      'Practiced calm':'J\'ai pratiqué le calme','Breathed and relaxed for a moment':'J\'ai respiré et me suis détendu un moment','Felt grateful':'J\'ai ressenti de la gratitude','Noticed something good today':'J\'ai remarqué quelque chose de positif aujourd\'hui',
      'DAY STREAK':'SÉRIE QUOTIDIENNE','Secret room progress':'Progression de la salle secrète','Start your streak today!':'Commence ta série aujourd\'hui !',
      'Enter room':'Entrer dans la salle','I do not know, continue':'Je ne sais pas, continuer','DID YOU KNOW?':'LE SAVAIS-TU ?'
    };
    var ar={
      'Close':'إغلاق','Back':'رجوع','Home':'الرئيسية','Continue':'متابعة','Clear':'مسح','Open':'فتح','Done':'تم',
      'Daily Tasks':'مهام اليوم','Today Tasks':'مهام اليوم','Today':'اليوم','Baby Oki':'أوكي الصغير','Today 0 XP earned':'تم كسب 0 نقطة اليوم',
      'Went to school':'ذهبت إلى المدرسة','I went to school today':'ذهبت إلى المدرسة اليوم','Learned something new':'تعلمت شيئاً جديداً','Practiced for at least 30 minutes':'تدربت لمدة 30 دقيقة على الأقل',
      'Read':'قرأت','Read a few pages':'قرأت بضع صفحات','Listened to music':'استمعت إلى الموسيقى','Enjoyed music mindfully':'استمتعت بالموسيقى باهتمام',
      'Ate healthy food':'تناولت طعاماً صحياً','Ate fruit or vegetables':'تناولت فاكهة أو خضروات','Moved my body':'حركت جسمي','Kept my body active':'حافظت على نشاط جسمي',
      'Was kind':'كنت لطيفاً','Helped someone today':'ساعدت شخصاً اليوم','Stayed focused':'حافظت على تركيزي','Finished one task calmly':'أنهيت مهمة بهدوء',
      'Was creative':'كنت مبدعاً','Drew, built, or invented something':'رسمت أو بنيت أو ابتكرت شيئاً','Cared for nature':'اعتنيت بالطبيعة','Did something good for the planet':'فعلت شيئاً جيداً للكوكب',
      'Practiced calm':'تدربت على الهدوء','Breathed and relaxed for a moment':'تنفست واسترخيت للحظة','Felt grateful':'شعرت بالامتنان','Noticed something good today':'لاحظت شيئاً جيداً اليوم',
      'DAY STREAK':'سلسلة الأيام','Secret room progress':'تقدم الغرفة السرية','Start your streak today!':'ابدأ سلسلتك اليوم!',
      'Enter room':'ادخل الغرفة','I do not know, continue':'لا أعرف، متابعة','DID YOU KNOW?':'هل تعلم؟'
    };
    var map=lang==='fr'?fr:ar;
    document.querySelectorAll('button,span,div,p,h1,h2,h3,label').forEach(function(el){
      if(el.children.length) return;
      var t=(el.textContent||'').trim();
      if(map[t]) el.textContent=map[t];
      else if(lang==='fr' && /^Best streak: (\d+) days?$/.test(t)) el.textContent='Meilleure série : '+RegExp.$1+' jour'+(RegExp.$1==='1'?'':'s');
      else if(lang==='ar' && /^Best streak: (\d+) days?$/.test(t)) el.textContent='أفضل سلسلة: '+RegExp.$1+' يوم';
    });
  }


  function deAscii(text){
    return String(text||'').toLowerCase()
      .replace(/[\u0130I\u0131]/g,'i').replace(/[\u015E\u015F]/g,'s').replace(/[\u011E\u011F]/g,'g')
      .replace(/[\u00DC\u00FC]/g,'u').replace(/[\u00D6\u00F6]/g,'o').replace(/[\u00C7\u00E7]/g,'c')
      .replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
  }
  function deLooksTurkishOrReligious(text){
    var t=deAscii(text);
    if(!t) return false;
    var keys=['allah','bismillah','subhan','elham','namaz','dua','ibadet','cami','mekke','kuran','peygamber','hz','hadis','sunn','suret','rekat','secde','melek','gunah','sukur','rabbi','rahman','rahim','bugun','gorev','henuz','kelime','ogren','basla','baslayalim','kapat','gonder','paylas','rapor','puan','yildiz','para','dukk','sandik','gorus','tamam','cikar','giy','oda','odasi','hayvan','timsah','yilan','tavsan','nefes','firca','kalin','lazer','hazine','kumanda','okul','boyama','resim','atolye','calisma','yemek','afiyet','portakal','harika','super','dogru','yanlis','bilmiyorum','izle'];
    return keys.some(function(k){ return t.indexOf(k)>=0; });
  }
  function deFallbackFor(text){
    var t=deAscii(text);
    if(t.indexOf('namaz')>=0||t.indexOf('dua')>=0||t.indexOf('allah')>=0||t.indexOf('bismillah')>=0||t.indexOf('ibadet')>=0||t.indexOf('cami')>=0||t.indexOf('kuran')>=0||t.indexOf('peygamber')>=0||t.indexOf('melek')>=0) return 'Nimm dir einen ruhigen Moment.';
    if(t.indexOf('gorev')>=0) return 'Aufgabe';
    if(t.indexOf('rapor')>=0) return 'Fortschritt';
    if(t.indexOf('paylas')>=0) return 'Teilen';
    if(t.indexOf('kelime')>=0||t.indexOf('ogren')>=0) return 'Woerter lernen';
    if(t.indexOf('sandik')>=0) return 'Truhe';
    if(t.indexOf('dukk')>=0) return 'Shop';
    if(t.indexOf('gorus')>=0) return 'Feedback';
    if(t.indexOf('kapat')>=0) return 'Schliessen';
    if(t.indexOf('gonder')>=0) return 'Senden';
    if(t.indexOf('basla')>=0) return 'Los gehts';
    if(t.indexOf('tamam')>=0) return 'Fertig';
    if(t.indexOf('cikar')>=0) return 'Ausziehen';
    if(t.indexOf('giy')>=0) return 'Anziehen';
    if(t.indexOf('hayvan')>=0||t.indexOf('timsah')>=0||t.indexOf('yilan')>=0||t.indexOf('tavsan')>=0) return 'Tierpark';
    if(t.indexOf('nefes')>=0) return 'Ruhig atmen';
    if(t.indexOf('firca')>=0||t.indexOf('boya')>=0||t.indexOf('resim')>=0||t.indexOf('atolye')>=0) return 'Kunststudio';
    if(t.indexOf('lazer')>=0||t.indexOf('kumanda')>=0) return 'Fokus-Raum';
    if(t.indexOf('hazine')>=0) return 'Schatzraum';
    if(t.indexOf('okul')>=0||t.indexOf('calisma')>=0) return 'Lernen macht stark';
    if(t.indexOf('yemek')>=0||t.indexOf('portakal')>=0||t.indexOf('afiyet')>=0) return 'Gute Gewohnheiten machen stark.';
    if(t.indexOf('harika')>=0||t.indexOf('super')>=0||t.indexOf('dogru')>=0) return 'Super gemacht!';
    return 'Gut gemacht. Weiter so!';
  }

  function enFallbackFor(text){
    var t=deAscii(text);
    if(t.indexOf('namaz')>=0||t.indexOf('dua')>=0||t.indexOf('allah')>=0||t.indexOf('bismillah')>=0||t.indexOf('ibadet')>=0||t.indexOf('cami')>=0||t.indexOf('kuran')>=0||t.indexOf('peygamber')>=0||t.indexOf('melek')>=0) return 'Take a calm moment.';
    if(t.indexOf('gorev')>=0) return 'Task';
    if(t.indexOf('rapor')>=0) return 'Report';
    if(t.indexOf('paylas')>=0) return 'Share';
    if(t.indexOf('kelime')>=0||t.indexOf('ogren')>=0) return 'Learn words';
    if(t.indexOf('sandik')>=0) return 'Chest';
    if(t.indexOf('dukk')>=0) return 'Shop';
    if(t.indexOf('gorus')>=0) return 'Feedback';
    if(t.indexOf('kapat')>=0) return 'Close';
    if(t.indexOf('gonder')>=0) return 'Send';
    if(t.indexOf('basla')>=0) return 'Let us start';
    if(t.indexOf('tamam')>=0) return 'Done';
    if(t.indexOf('cikar')>=0) return 'Take off';
    if(t.indexOf('giy')>=0) return 'Wear';
    if(t.indexOf('hayvan')>=0||t.indexOf('timsah')>=0||t.indexOf('yilan')>=0||t.indexOf('tavsan')>=0) return 'Animal Park';
    if(t.indexOf('nefes')>=0) return 'Breathe calmly';
    if(t.indexOf('firca')>=0||t.indexOf('boya')>=0||t.indexOf('resim')>=0||t.indexOf('atolye')>=0) return 'Art Studio';
    if(t.indexOf('lazer')>=0||t.indexOf('kumanda')>=0) return 'Focus Room';
    if(t.indexOf('hazine')>=0) return 'Treasure Room';
    if(t.indexOf('okul')>=0||t.indexOf('calisma')>=0) return 'Learning makes you stronger';
    if(t.indexOf('yemek')>=0||t.indexOf('portakal')>=0||t.indexOf('afiyet')>=0) return 'Good habits make you stronger.';
    if(t.indexOf('harika')>=0||t.indexOf('super')>=0||t.indexOf('dogru')>=0) return 'Great job!';
    return 'Good job. Keep going!';
  }
  function englishClean(text){
    if(!(valuesOn() && lang==='en')) return text;
    var out=translatedFromOriginal(text);
    if(deLooksTurkishOrReligious(out)) out=enFallbackFor(out);
    return out;
  }
  function germanClean(text){
    if(!(valuesOn() && lang==='de')) return text;
    var out=translatedFromOriginal(text);
    if(deLooksTurkishOrReligious(out)) out=deFallbackFor(out);
    return out;
  }

  function applyValuesI18n(){ lockBrowserTranslate(); applyRoomNames(); applyVisibleText(); renderPanel(); refreshSpecialRoomText(); if(typeof window.eduverseRefreshFeedbackLang==='function') window.eduverseRefreshFeedbackLang(); if(typeof window.eduverseRefreshChestLang==='function') window.eduverseRefreshChestLang(); if(typeof window.eduverseRefreshInviteLang==='function') window.eduverseRefreshInviteLang(); if(typeof window.eduverseRefreshShareLang==='function') window.eduverseRefreshShareLang(); }

  function wrapToggle(){
    if(typeof window._toggleValuesMode==='function' && !window._toggleValuesMode.__i18nWrapped){
      var old=window._toggleValuesMode;
      window._toggleValuesMode=function(){ var res=old.apply(this,arguments); setTimeout(function(){ applyValuesI18n(); if(valuesOn()) showPanel(); else {var p=$('ev-values-panel'); if(p)p.classList.remove('show');}},80); return res; };
      window._toggleValuesMode.__i18nWrapped=true;
    }
  }

  function boot(){ ensurePanel(); wrapToggle(); applyValuesI18n(); var btn=$('values-toggle-btn'); if(btn && !btn.__valuesPanelHint){btn.__valuesPanelHint=true; btn.addEventListener('contextmenu',function(e){e.preventDefault();showPanel();});} }
  window.eduverseSetValuesLang=setValuesLang;
  window.eduverseShowValuesPanel=showPanel;
  window.eduverseValuesLang=function(){return lang;};
  window.eduverseValuesOn=valuesOn;
  window.eduverseValuesText=translatedFromOriginal;
  window.eduverseGermanClean=germanClean;
  window.eduverseEnglishClean=englishClean;
  window.eduverseApplyValuesI18n=applyValuesI18n;
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
  window.addEventListener('load',function(){setTimeout(boot,700);setTimeout(applyValuesI18n,1200);setTimeout(refreshSpecialRoomText,1450);});
  // V47S5: no periodic global text scan; prevents language flicker/leaks. Language refresh happens on explicit language switch and normal boot.
  // setInterval(function(){ if(!(window.gameActive===true)) { applyVisibleText(); } },2500);
})();














