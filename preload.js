// Preload script — runs in renderer with limited Node access
// Exposes only what the app needs
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronApp', {
  platform: process.platform, // 'win32' | 'darwin' | 'linux'
});
