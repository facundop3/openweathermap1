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
      var bodyRes = JSON.parse(chunk);
      console.log(bodyRes.main.temp -273.15);
      console.log( bodyRes.main.humidity);
      $('#Response').text(`Temperature in ${Country}: ` + ((bodyRes.main.temp -273.15).toFixed(2))+ ` Cº \n Humidity:  ${bodyRes.main.humidity} % \n Wind Speed: ${bodyRes.wind.speed} m/s`);

    });
    response.on('end', ()=>{
      console.log('No more data on response');
    });
  });
  request.end();
});
