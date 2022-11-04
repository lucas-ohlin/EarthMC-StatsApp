const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(

    "api", {

        //Send the data between the two channels safely
        send: (channel, data) => {

            // whitelist channels
            let validChannels = ["minimize-app","maximize-app","quit-app",
                                "server","townless","btn-pressed",
                                "track-search","nation-search","town-search","resident-search"];

            if (validChannels.includes(channel)) 
                ipcRenderer.send(channel, data);

        },
        //Recieve data between the two channels safely
        receive: (channel, data) => {

            let validChannels = ["server_recieved","townless_recieved",
                                "track_recieved","nation_recieved","town_recieved","resident_recieved"];

            if (validChannels.includes(channel)) 
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, data)
            
        }

    }

);
