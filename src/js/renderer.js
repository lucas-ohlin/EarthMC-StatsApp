

//Frame Buttons
document.getElementById('min-btn').addEventListener('click', () =>   {api.send('minimize-app'); });
document.getElementById('max-btn').addEventListener('click', () =>   {api.send('maximize-app'); });
document.getElementById('close-btn').addEventListener('click', () => {api.send('quit-app'); });

//NAV, server package api buttons
document.addEventListener('DOMContentLoaded', () => {               //server, homepage calls on start
    api.send('server');
});

document.getElementById('_server').addEventListener('click', () => {    //server
    api.send('server');
});
// document.getElementById('_track').addEventListener('click', () => {    //nearby
//     api.send('townless');
// });
document.getElementById('_townless').addEventListener('click', () => {  //townless
    api.send('townless');
});
// document.getElementById('_nation').addEventListener('click', () => {    //nation
//     api.send('townless');
// }); 
// document.getElementById('_town').addEventListener('click', () => {      //town
//     api.send('townless');
// });
// document.getElementById('_resident').addEventListener('click', () => {  //resident
//     api.send('townless');
// });


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
                            'Max Pop: '+ dServer.max +'<br>'+
                            'In Server: '+ dServer.online +'<br>'+
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
        for (var i = 0; i < threeArray[0].length; i++)          {document.getElementById("item2-content-townless-1").innerHTML += "<button id='btn-value"+[i]+"' class='copy-btn2' onclick='copyValue(this.id)'>" + threeArray[0][i] + "</button>" + "<br>";}
        for (var i = 0+50; i < threeArray[1].length+50; i++)    {document.getElementById("item2-content-townless-2").innerHTML += "<button id='btn-value"+[i]+"' class='copy-btn2' onclick='copyValue(this.id)'>" + threeArray[1][i-50] + "</button>" + "<br>";}
        for (var i = 0+100; i < threeArray[2].length+100; i++)  {document.getElementById("item2-content-townless-3").innerHTML += "<button id='btn-value"+[i]+"' class='copy-btn2' onclick='copyValue(this.id)'>" + threeArray[2][i-100] + "</button>" + "<br>";}
    } 

    else {

        console.log("An error occured");

    } 

});

//Track API recieve
api.receive("track_recieved", (event, data) => { //town
    console.log("Recieved");
    var Nation = JSON.parse(data); 
    document.getElementById("track-tab").innerHTML =    Nation.name+'´s leader: ' +Nation.king+ '<br>' +
                                                        Nation.residents.length + ' citizens' + '<br>' + '<br>' +
                                                        'Capital: '+Nation.capitalName+'<br>'+' Size: '+Nation.area+'<br>'+' Cords: '+'X:'+Nation.capitalX+' | '+'Z:'+Nation.capitalZ+ '<br>' + '<br>' +
                                                        'Towns in nation:' + '<br>' + Nation.towns  
});

//Nation API recieve
api.receive("nation_recieved", (event, data) => { //nation
    console.log("Recieved");
    console.log(data);
    var nation = JSON.parse(data); 
    document.getElementById("nation-tab").innerHTML =   nation[0][0].name+'´s leader: ' +nation[0][0].king+ '<br>' +
                                                        nation[0][0].residents.length + ' citizens' + '<br>' + '<br>' +
                                                        'Capital: '+nation[0][0].capital.name+'<br>'+' Size: '+nation[0][0].area+'<br>'+' Cords: '+'X:'+nation[0][0].capital.x+' | '+'Z:'+nation[0][0].capital.z+ '<br>' + '<br>' +
                                                        'Towns: ' + nation[0][0].towns.length + '<br>' +
                                                        'Inviteable towns:' + nation[0][1].name
});

//Town API recieve
api.receive("town_recieved", (event, data) => { //town
    console.log("Recieved");
    var town = JSON.parse(data); 
    console.log(town);
    document.getElementById("town-tab").innerHTML =     'Nation: ' + town.nation + '<br>' + 
                                                        town.name+'´s leader: ' +town.mayor+ '<br>' + '<br>' +
                                                        town.residents.length + ' citizens' + '<br>' +
                                                        'Size: ' + town.area + '<br>' +
                                                        'Location: '+'x:'+town.x+' z:'+town.z + '<br>' +
                                                        'pvp:'+town.flags.pvp+' mobs:'+town.flags.mobs+' public:'+town.flags.public+' explosion:'+town.flags.explosion+' fire:'+town.flags.fire+ '<br>' + '<br>' + 
                                                        'Citizens:' + '<br>' + town.residents  
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
  
  
  