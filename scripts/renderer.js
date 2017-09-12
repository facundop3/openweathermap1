const {app} = require('electron');
let $ = require('jquery');
const {net} = require('electron').remote;
var APIKEY = '71adc5278d9f94410bb4e9e0e202abf1';
var Country;
// const {ipcRenderer} = require('electron');

$('#Weather').on('click', ()=>{
  console.log($('#Country').val());
  Country = $('#Country').val();
  console.log(`Se recibe desde renderer: ${Country}`);
  const request = net.request({
    method:'GET',
    protocol: 'http:',
    hostname:'api.openweathermap.org',
    port: 80,
    path:`/data/2.5/weather?q=${Country}&APPID=${APIKEY}`});

  request.on('response', (response)=>{
    console.log(response);
    console.log(`STATUS: ${response.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(response.headders)}`);
    response.on('data', (chunk)=>{
      console.log(`BODY:`);
      console.log(JSON.parse(chunk));
    });
    response.on('end', ()=>{
      console.log('No more data on response');
    });
  });
  request.end();
});
