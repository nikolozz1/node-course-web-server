const request = require("request")

const forecast = (latitude, longitude, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=7774dec61f590d91229aa62ba5a31541&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`

    request({ url, json: true }, (error, {body} = {}) =>{
        if(error){
            callback("Unable to connect the service!", undefined)
        }else if(body.error){
            callback("Unable to find location, try again!", undefined)
        }else{
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. wind speed is about ${body.current.wind_speed} km/h`)
        }
    })
}

module.exports = forecast