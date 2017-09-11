const {app, BrowserWindow} = require('electron');
const {ipcMain} = require('electron');


let win;


app.on('ready', ()=>{
  win = new BrowserWindow({width:800,height:600, show:false});
  win.loadURL(`file://${__dirname}/scripts/index.html`);
  win.once('ready-to-show',()=>{
    win.show();
  });
});

app.on('window-all-closed', ()=>{
  app.quit();
});
