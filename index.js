const {app, ipcMain, dialog, BrowserWindow} = require('electron');
const os =require('os')

let mainWindow=null

app.on("ready",function(){
    mainWindow = new BrowserWindow({
        resizable:true,
        height:600,
        width:800,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false,
             enableRemoteModule: true
        }
    })
    mainWindow.loadFile('./index.html');
    mainWindow.on('closed',function(){
        mainWindow=null
    })
})

ipcMain.on("openDialog",function(event){
console.log("button pressed")

if(os.platform() === 'linux' || os.platform() === 'win32'){
    dialog.showOpenDialog(null,{
        properties:['openFile']
    }).then((result)=>{
        console.log(result.filePaths)
        event.sender.send("selected-file",result.filePaths[0])
    }).catch((err)=>{
        console.log(err)
    })

}
})