const { app, BrowserWindow, Tray, Menu, nativeImage, shell, session, dialog } = require('electron');
const path = require('path');
const dns = require('dns');

let mainWindow;
let tray;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ⚙️  AYARLAR — Sadece buraya dokunman yeterli
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const LIVE_URL   = 'https://timur34788-jpg.github.io/sohbet/';
const CHECK_HOST = 'github.com';
const LOCAL_FILE = path.join(__dirname, 'index.html');
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function isOnline() {
  return new Promise(resolve => {
    dns.lookup(CHECK_HOST, (err) => resolve(!err));
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    title: '🇹🇷 Sohbet',
    backgroundColor: '#141618',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
    },
    show: false,
  });

  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const allowed = ['media', 'notifications', 'display-capture', 'mediaKeySystem'];
    callback(allowed.includes(permission));
  });

  isOnline().then(online => {
    if (online) {
      mainWindow.loadURL(LIVE_URL);
    } else {
      mainWindow.loadFile(LOCAL_FILE);
    }
  });

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('close', (e) => {
    if (!app.isQuiting) { e.preventDefault(); mainWindow.hide(); }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F5' || (input.key === 'r' && input.control)) mainWindow.webContents.reload();
    if (input.key === 'F12') mainWindow.webContents.toggleDevTools();
  });
}

function createTray() {
  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#3f0e40"/><text y="46" x="32" text-anchor="middle" font-size="38">💬</text></svg>`;
  const icon = nativeImage.createFromDataURL(`data:image/svg+xml;base64,${Buffer.from(iconSvg).toString('base64')}`);

  tray = new Tray(icon);
  tray.setToolTip('Sohbet');

  const menu = Menu.buildFromTemplate([
    { label: '💬 Sohbeti Aç', click: () => { mainWindow.show(); mainWindow.focus(); } },
    {
      label: '🔄 Güncelle',
      click: () => {
        isOnline().then(online => {
          if (online) { mainWindow.loadURL(LIVE_URL); mainWindow.show(); }
          else dialog.showMessageBox(mainWindow, { type: 'warning', title: 'Bağlantı Yok', message: 'Güncelleme için internet gerekli.' });
        });
      }
    },
    { type: 'separator' },
    { label: '❌ Çıkış', click: () => { app.isQuiting = true; app.quit(); } },
  ]);

  tray.setContextMenu(menu);
  tray.on('double-click', () => { mainWindow.show(); mainWindow.focus(); });
}

app.whenReady().then(() => {
  createWindow();
  createTray();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
    else { mainWindow.show(); mainWindow.focus(); }
  });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('before-quit', () => { app.isQuiting = true; });
