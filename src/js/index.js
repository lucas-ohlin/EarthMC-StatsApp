const { app, ipcMain, clipboard, BrowserWindow } = require('electron');
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

if (require('electron-squirrel-startup')) {
    app.quit();
}

async function fetchData(endpoint) {
    const baseUrl = "https://api.earthmc.net/v3";
    const url = `${baseUrl}${endpoint}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Error: ${response.statusText} (Status: ${response.status})`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Fetch Error: ${error.message}`);
        return null;
    }
}

// Application creation
const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 630,
        minWidth: 800,
        minHeight: 630,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            enableRemoteModule: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, '../index.html'));
    // mainWindow.webContents.openDevTools();

    ipcMain.on('quit-app', () => {
        app.quit();
    });

    ipcMain.on('maximize-app', () => {
        if (!mainWindow.isMaximized()) {
			mainWindow.maximize();
		} else {
			mainWindow.unmaximize();
		}
    });

    ipcMain.on('minimize-app', () => {
        mainWindow.minimize();
    });

    ipcMain.on('server', async () => {
		const serverStats = await fetchData('/aurora/');
		if (serverStats) {
			mainWindow.webContents.send("server_recieved", JSON.stringify(serverStats, null, 2));
		}
	});	

    // ipcMain.on('townless', async () => {
    //     const townlessPlayers = await fetchData('/aurora/');
    //     if (townlessPlayers) {
    //         mainWindow.webContents.send("townless_recieved", JSON.stringify(townlessPlayers, null, 2));
    //     }
    // });

    // ipcMain.on('btn-pressed', (event, data) => {
    //     clipboard.writeText(data);
    // });

    // ipcMain.on('track-search', async (event, data) => {
    //     const player = await fetchData(`/players/${data}`);
    //     if (player) {
    //         mainWindow.webContents.send("track_recieved", JSON.stringify(player, null, 2));
    //     }
    // });

    // ipcMain.on('nation-search', async (event, data) => {
    //     const nation = await fetchData(`/nations/${data}`);
    //     if (nation) {
    //         mainWindow.webContents.send("nation_recieved", JSON.stringify(nation, null, 2));
    //     }
    // });

    // ipcMain.on('town-search', async (event, data) => {
    //     const town = await fetchData(`/towns/${data}`);
    //     if (town) {
    //         mainWindow.webContents.send("town_recieved", JSON.stringify(town, null, 2));
    //     }
    // });

    // ipcMain.on('resident-search', async (event, data) => {
    //     const resident = await fetchData(`/residents/${data}`);
    //     if (resident) {
    //         mainWindow.webContents.send("resident_recieved", JSON.stringify(resident, null, 2));
    //     }
    // });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
		app.quit();
	} 
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
