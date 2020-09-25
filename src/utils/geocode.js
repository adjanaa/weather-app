const request = require('request');

const geocode = (adress, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(adress) + ".json?access_token=pk.eyJ1IjoiZHJuYW5vIiwiYSI6ImNrZG9xbTRoeDBuYmMydXFqdHh6ZDc3a3QifQ.eyxqg2S-KhX7QGkKMyPqKQ&limit=1";
     request({url: url, json: true}, (error, response) => {
         if (error) {
             callback("Unable to connect to location services!", undefined);              
         } else if(response.body.features.length === 0) {
             callback("Unable to find location. Try another search", undefined)   ;         
         }else{
             callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
             });
         }

     }) 
}

module.exports = geocode;
