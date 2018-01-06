const electron = require('electron');
const url = require('url');
const path = require('path');
const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let secondWindow;


app.on('ready', createWindow); 

function createWindow(){
	
	mainWindow = new BrowserWindow({});
	mainWindow.maximize();

	mainWindow.loadURL(url.format({
		pathname : path.join(__dirname, 'index.html'),
		protocol : 'file',
		slashes : true	
	}));

	
const menu = Menu.buildFromTemplate(mainMenu);
Menu.setApplicationMenu(menu);

}

const mainMenu = [];


if(process.env.NODE_ENV !== 'production'){
	mainMenu.push(
	{	
		label : 'Toogle DevTools',
		submenu :[
		{
			label : "Toogle Dev",
			accelerator : "Ctrl+I",
			click(item, focusedWindow){
				focusedWindow.webContents.openDevTools();
			}			
		},
		{
			role : 'reload'
		}
	]
	});
}