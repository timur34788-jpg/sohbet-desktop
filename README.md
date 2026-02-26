# 🇹🇷 Sohbet — Güncelleme Rehberi

---

## ⚡ Güncelleme Nasıl Çalışır?

```
Sen index.html'i düzenle
        ↓
GitHub'a push et  (git push)
        ↓
Tüm PC kullanıcıları otomatik güncellenir ✅
```

Uygulama her açıldığında GitHub Pages'dan yüklenir.
Kullanıcılar hiçbir şey yapmadan en son sürümü görür.

---

## 🔄 Güncelleme Göndermek (Adım Adım)

### 1. index.html'i düzenle (istediğin editörle)

### 2. GitHub'a gönder:
```bash
git add index.html
git commit -m "Güncelleme: açıklama yaz"
git push
```

### 3. ~1 dakika bekle → GitHub Pages yayına girer

### 4. Kullanıcılar uygulamayı yeniden açtığında veya
   tepsiden sağ tık → 🔄 Güncelle deyin → hazır!

---

## 📂 Hangi Dosyayı Düzenleyeceksin?

| Değişiklik | Dosya |
|---|---|
| Tasarım, özellik, hata düzeltme | `index.html` |
| Pencere boyutu, tray menüsü | `main.js` |
| Uygulama adı, ikonu | `package.json` + `assets/` |

**Kural:** Sadece `index.html`'i değiştiriyorsan → sadece GitHub push yeterli.
`main.js` değiştirdiysen → yeni `.exe` build etmen gerekir.

---

## 💻 Kurulum (ilk kez)

```bash
npm install
npm start          # Geliştirme modu
npm run build:win  # Windows .exe
npm run build:mac  # macOS .dmg
npm run build:linux # Linux .AppImage
```

---

## 🌐 Çevrimdışı Durum

İnternet yoksa uygulama otomatik olarak yerel `index.html`'i açar.
Bu sayede bağlantı olmasa da uygulama çalışır.

