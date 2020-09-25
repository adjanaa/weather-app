const request = require('request');

const forecast = (longitude, latitude, callback) =>{
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric"+ "&appid=39ec1097f5b4828f2255a72616cf58b3";

    request({url: url, json: true}, (error, response) => {
        //ici notre callback quon appelle  avec (error, response) contient soit une valeur dans error 
        //ou  une valeur dans response pas les 2. Et si lun contient une valeur l'autre est automatiquement undefined 
        if (error) {
            callback("Unable to connect to weather services!", undefined);   
        } else if(response.body.code === 400){
            callback("Unable to find location. Try another search", undefined)  
        }else{
            callback(undefined, "la temperature actuelle est de: " + Math.round(response.body.main.temp) + " degrés");
        }
    
    });

};


module.exports = forecast;