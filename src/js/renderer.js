function parseJSONData(data) {
    var parsedData = JSON.parse(data); 
    if (!parsedData) {
        document.getElementById("item2-content-server").innerHTML = '<strong>Error:</strong> Unable to fetch server data.';
        return;
    }

    return parsedData;
}

function updateHTMLContent(elementId, content) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = content;
    } else {
        console.warn(`Element with ID "${elementId}" not found.`);
    }
}

// Frame Buttons
document.getElementById('min-btn').addEventListener('click', () => api.send('minimize-app'));
document.getElementById('max-btn').addEventListener('click', () => api.send('maximize-app'));
document.getElementById('close-btn').addEventListener('click', () => api.send('quit-app'));

// Send server data request on DOM load
document.addEventListener('DOMContentLoaded', () => {
    api.send('server');
});

// Fetch server data when the server tab is clicked
document.getElementById('_server').addEventListener('click', () => {
    api.send('server');
});

//Server callback
api.receive("server_recieved", (event, data) => { //server
    var parsedData = parseJSONData(data);
    const serverInfo = `
        Version: ${parsedData.version} <br/>
        Max Pop: ${parsedData.stats.maxPlayers} <br/>
        In Server: ${parsedData.stats.numOnlinePlayers} <br/>
    `;

    updateHTMLContent("item2-content-server", serverInfo);
});
