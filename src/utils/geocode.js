const request = require("request")

const geocode = (address, callback) =>{
    const url = `http://api.positionstack.com/v1/forward?access_key=9ee7ea226cb373f0acb3856ad20011a8&query=${encodeURIComponent(address)}&limit=1`
    request({ url, json: true }, (error, {body} = {}) =>{
        if(error){
            callback("Unable to connect to location services!", undefined)
        }else if(body.data.length === 0){
            callback("Unable to find location, try another search!", undefined)
        }else{
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                placeName: body.data[0].label 
            })
        }
    })
}


module.exports = geocode