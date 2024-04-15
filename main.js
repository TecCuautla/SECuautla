const {app, BrowserWindow} = require('electron');

const createWindow = () => {
    const window = new BrowserWindow({
      useContentSize: true,
      minimizable : false,
      fullscreen:true,
      fullscreenable: true,
      minHeight:600,
      minWidth:800
    });
    window.loadFile('index.html')
}

app.whenReady().then(()=>{
    createWindow();
});