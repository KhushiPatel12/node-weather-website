const request=require('request')

const geocode = (address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWFwYm94a2h1c2hpIiwiYSI6ImNsMTNmazk4dTBnam0zanMwM3F1NHh4eGkifQ.TwfdNFNbpMEpdETs-E4d-A'

    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }else if(body.features.length === 0){
            callback('Location not found',undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode