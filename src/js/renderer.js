

//Frame Buttons
document.getElementById('min-btn').addEventListener('click', () =>   {api.send('minimize-app'); });
document.getElementById('max-btn').addEventListener('click', () =>   {api.send('maximize-app'); });
document.getElementById('close-btn').addEventListener('click', () => {api.send('quit-app'); });

//NAV, server package api buttons
document.addEventListener('DOMContentLoaded', () => {               //server, homepage calls on start
    api.send('server');
});

//server event listener
document.getElementById('_server').addEventListener('click', () => {    
    api.send('server');
});
//townless
document.getElementById('_townless').addEventListener('click', () => {  
    api.send('townless');
});

//search button in nation
document.getElementById('track-btn').addEventListener('click', () => {      //track
    api.send('track-search', document.getElementById('track-input').value);
});
document.getElementById('nation-btn').addEventListener('click', () => {     //nation
    api.send('nation-search', document.getElementById('nation-input').value);
});

//search button in town
document.getElementById('town-btn').addEventListener('click', () => {       //town
    api.send('town-search', document.getElementById('town-input').value);
});
document.getElementById('resident-btn').addEventListener('click', () => {   //resident
    api.send('resident-search', document.getElementById('resident-input').value);
});

//test
window.addEventListener('DOMContentLoaded', () => { 
    document.getElementById('item2-content-townless-1').addEventListener('click', (e) => {
        if(e.target.id == 'btn-value') {
            alert('test');
        }
    });
});

//Server callback
api.receive("server_recieved", (event, data) => { //server

    var dServer = JSON.parse(data); 
    var serverBool = '';

    if (dServer.serverOnline) 
        serverBool = 'online.';
    else 
        serverBool = 'down.';

    document.getElementById("item2-content-server").innerHTML = 
                            'The server is '+ serverBool +'<br>'+'<br>'+
                            // 'Max Pop: '+ dServer.max +'<br>'+
                            // 'In Server: '+ dServer.online +'<br>'+
                            'In Queue: '+ dServer.queue +'<br>'+
                            'In Aurora: '+ dServer.aurora +'<br>'+
                            'In Nova: ' + dServer.nova;
});


api.receive("townless_recieved", (event, data) => { //townless

    //As long as the data isn't empty (null)
    if (!data.length == 0) {

        var dTownless = JSON.parse(data); 
        var objArray = [] //Base Array
        const threeArray = [[],[],[]] //Split Array 
        
        console.log(dTownless);

        //Pushes the json data into the base array
        for(var i = 0; i < dTownless.length; i++) {

            var obj = dTownless[i]; 
            objArray.push(obj.name);

        }
        
        //splits orgArray into n(3) sub arrays
        var n = 3; 
        var namesPerColumn = Math.ceil(objArray.length / 3); 

        for(var line = 0; line < n; line++) { 

            for(var y = 0; y < namesPerColumn; y++) {

                var value = objArray[y + line * namesPerColumn]
                if(!value) continue //Remove undefined values

                //Store value
                threeArray[line].push(value);

            } 

        }

        console.log(threeArray);

        //Clear the Buttons
        document.getElementById("item2-content-townless-1").innerHTML = '';
        document.getElementById("item2-content-townless-2").innerHTML = '';
        document.getElementById("item2-content-townless-3").innerHTML = '';
    
        //Creates buttons for each of the objects in threeArray
        for (var i = 0; i < threeArray[0].length; i++) {
            document.getElementById("item2-content-townless-1").innerHTML += "<button id='btn-value"+[i]+
            "' class='copy-btn2' onclick='copyValue(this.id)'>" + threeArray[0][i] + "</button>" + "<br>";
        }
        for (var i = 0+50; i < threeArray[1].length+50; i++) {
            document.getElementById("item2-content-townless-2").innerHTML += "<button id='btn-value"+[i]+
            "' class='copy-btn2' onclick='copyValue(this.id)'>" + threeArray[1][i-50] + "</button>" + "<br>";
        }
        for (var i = 0+100; i < threeArray[2].length+100; i++) {
            document.getElementById("item2-content-townless-3").innerHTML += "<button id='btn-value"+[i]+
            "' class='copy-btn2' onclick='copyValue(this.id)'>" + threeArray[2][i-100] + "</button>" + "<br>";
        }
    } 

    else {
        console.log("An error occured");
    } 

});

//Track API recieve
api.receive("track_recieved", (event, data) => { //town
    console.log("Recieved");
    var Nation = JSON.parse(data); 
    document.getElementById("track-tab").innerHTML =    nation.name+'´s leader: ' +nation.king+ '<br>' +
                                                        nation.residents.length + ' citizens' + '<br>' + '<br>' +
                                                        'Capital: '+nation.capitalName+'<br>'+' Size: '+nation.area+'<br>'+' Cords: '+'X:'+nation.capitalX+' | '+'Z:'+nation.capitalZ+ '<br>' + '<br>' +
                                                        'Towns in nation:' + '<br>' + nation.towns  
});

//Nation API recieve
api.receive("nation_recieved", (event, data) => { //nation
    console.log("Recieved");
    var nation = JSON.parse(data); 
    document.getElementById("nation-tab").innerHTML =   nation.name+'´s leader: ' + nation.king+ '<br>' +
                                                        nation.towns.length + ' towns' + 
                                                        nation.residents.length + ' citizens' +'<br>' + '<br>' +
                                                        'Capital: '+ nation.capital.name+'<br>'+' Size: ' + nation.area+'<br>'+' Cords: '+'X:'+nation.capital.x+' | '+'Z:'+nation.capital.z  +'<br>'
                                                        +'Map: ' + '<a href=https://earthmc.net/map/aurora/?worldname=earth&mapname=flat&zoom=5&x='+nation.capital.x+'&z='+nation.capital.z+'>'+'Nation On The Map'+'</a>'
                                                        // + '<br>' + '<br>' +
                                                        // 'Towns in nation:' + '<br>' + Nation.towns  
});

//Town API recieve
api.receive("town_recieved", (event, data) => { //town
    console.log("Recieved");
    var town = JSON.parse(data); 
    console.log(town);
    document.getElementById("town-tab").innerHTML =     town.name+'´s leader: ' +town.mayor+ '<br>' + '<br>' +
                                                        town.residents.length + ' citizens' + '<br>' +
                                                        'Size: ' + town.area + ' plots' + '<br>' +
                                                        'Cords: '+'x:'+town.x+' z:'+town.z + '<br>' +
                                                        'Map: ' + '<a href=https://earthmc.net/map/aurora/?worldname=earth&mapname=flat&zoom=5&x='+town.x+'&z='+town.z+'>'+'Town On The Map'+'</a>' 
                                                        // 'pvp:'+town.pvp+' mobs:'+town.mobs+' public:'+town.public+' explosion:'+town.explosion+' fire:'+town.fire
                                                        // + '<br>' + '<br>' + 
                                                        // 'Citizens:' + '<br>' + town.residents  
});

api.receive("resident_recieved", (event, data) => { //town
    console.log("Recieved");
    var player = JSON.parse(data); 
    console.log(player);
    document.getElementById("resident-tab").innerHTML = player.name + '<br>' + '<br>' +
                                                        'Nation: ' + player.nation + '<br>' +
                                                        'Town: ' + player.town + '<br>' +
                                                        'Rank: ' + player.rank 
});
  
  
  