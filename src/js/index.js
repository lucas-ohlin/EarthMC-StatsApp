//Imports of libraries and the EMC API
const { app, ipcMain, clipboard, BrowserWindow } = require('electron');
const fs = require('fs');
const emc = require("earthmc");
const fetch = require("node-fetch")
const path = require('path');


if (require('electron-squirrel-startup'))  
  	app.quit();

//Application creation
const createWindow = () => {

	//Window creation
	const mainWindow = new BrowserWindow({

		//Window Specs
		width: 800,
		height: 630,
		minWidth: 800,
		minHeight: 630,

		//Other options for the application
		frame: false,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			enableRemoteModule: true,
			nodeIntegration: false,
    	}

  	}); 

	//Load file from index.html
	mainWindow.loadFile(path.join(__dirname, '../index.html'));
	//devtools for use if needed
	mainWindow.webContents.openDevTools(); 

	//Quit the application
	ipcMain.on('quit-app', () => {
		app.quit();
	});

	//Maximize/unmazimize the application
	ipcMain.on('maximize-app', () => {
		if (!mainWindow.isMaximized()) 
			mainWindow.maximize();       
		else 
			mainWindow.unmaximize();
	});
	//Minimize application
	ipcMain.on('minimize-app', () => {
		mainWindow.minimize();    
	});
	
  	//------Package call from the application------//
	ipcMain.on('server', () => { //server

		async function run() {

			//Call from the NPM package
			var serverstats = await emc.getServerInfo().then(info => { return info }); // npm package
			mainWindow.webContents.send("server_recieved", JSON.stringify(serverstats, null, 2));
			fs.writeFileSync(path.resolve(__dirname, 'server.txt'), JSON.stringify(serverstats));

		}run();

	});

	ipcMain.on('townless', () => { //townless

		async function run() {

			var townless = await emc.Aurora.Players.townless().then(array => { return array }); // npm package
			mainWindow.webContents.send("townless_recieved", JSON.stringify(townless, null, 2));

		}run();

	});

	//copies townless name to clipboard
	ipcMain.on('btn-pressed', (event, data) => { 
		async function run() { clipboard.writeText(data); }run();
	});

	//Tracks inputed player
	ipcMain.on('track-search', (event, data) => { 

		async function run() { 

			var player = await emc.Aurora.getOnlinePlayer(data).then(player => { return player }) // npm package
			console.log(player);
			mainWindow.webContents.send("track_recieved", JSON.stringify(player, null, 2));

		}run();

	});

	ipcMain.on('nation-search', (event, data) => { //copies townless name to clipboard

		async function run() { 
			
			console.log("called.");
			console.log(data);
			
			var nation = await emc.Aurora.Nations.get(data).then(nation => { return nation }); // npm package
			console.log(nation);

			mainWindow.webContents.send("nation_recieved", JSON.stringify(nation, null, 2));
			console.log("sent");

		}run();

	});

	ipcMain.on('town-search', (event, data) => { //searches up town

		async function run() { 

			var town = await emc.Aurora.Towns.get(data).then(town => { return town }); // npm package
			console.log(town);
			mainWindow.webContents.send("town_recieved", JSON.stringify(town, null, 2));

		}run();

	});
	
	ipcMain.on('resident-search', (event, data) => { 
		
		async function run() { 

			var resident = await emc.Aurora.Residents.get(data).then(resident => { return resident }); // npm package
			mainWindow.webContents.send("resident_recieved", JSON.stringify(resident, null, 2));

		}run();

	});




  // ipcMain.on('btn-pressed', (event, data) => { //copies townless name to clipboard
  //   async function run() { 
      
  //   }run();
  // });
};

//When the application is ready
app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') 
		app.quit();
});

app.on('activate', () => {
  	if (mainWindow === null) createWindow();
});
