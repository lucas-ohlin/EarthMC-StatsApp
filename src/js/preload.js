const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => { // Send the data between the two channels 
            let validChannels = [
                "minimize-app",
                "maximize-app",
                "quit-app","server",
                "townless",
                "btn-pressed",
                "track-search",
                "nation-search",
                "town-search",
                "resident-search"
            ];

            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            } 
        },
        receive: (channel, data) => { // Recieve data between the two channels 
            let validChannels = [
                "server_recieved",
                "townless_recieved",         
                "track_recieved",
                "nation_recieved",
                "town_recieved",
                "resident_recieved"
            ];
            
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, data)   
            } 
        }
    }
);
