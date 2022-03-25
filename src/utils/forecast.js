const request=require('request')

const forecast = (latitude,longitude,callback)=>{
    const url='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+ latitude +','+ longitude +'?key=S3GTNUQF44H73GHG3JT9B669B'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,body.days[0].description +' It is currently ' + body.currentConditions.temp + ' degrees out. There is a '+ body.currentConditions.precipprob + '% chance of rain ')
        }
    }) 
}
module.exports = forecast