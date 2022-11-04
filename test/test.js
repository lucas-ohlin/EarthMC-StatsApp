// C:\Users\Lucas\Desktop\jsProjects\emcApp\test
// node test.js
const fetch = require("node-fetch")
const emc = require("earthmc");

async function NovaTest () {
    var town = await fetch('https://earthmc-api.herokuapp.com/api/v1/nova/towns/London').then(response => response.json());
    console.log('Nova:');
    console.log(town);
    return (town);
}   
async function AuroraTest () {
    var town = await fetch('http://earthmcstats.ddns.net/api/v1/aurora/towns/Berlin').then(response => response.json());
    console.log('Aurora:');
    console.log(town);
    return (town);
}   
async function AuroraTest2 () {
    var townless = await emc.Nova.getTownless().then(array => { return array });
    console.log('Aurora2:');
    console.log(townless);
    return (townless);
}   
// NovaTest();
// AuroraTest();
AuroraTest2();