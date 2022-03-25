const path = require('path')
const hbs = require('hbs')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

//Define paths
const publicDirectoryPath = path.join(__dirname ,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlers
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Khushi Patel'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Khushi Patel'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide your Location'
        })
    }
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
              return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                  return res.send({error})
                }
                res.send({
                    location,
                    forecastData,
                    address:req.query.address
                })
            })
        })            
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'Get help here',
        name:'Khushi Patel'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',
    {
        title:'Help error',
        name:'Khushi Patel',
        error:'Help article not found'
    }
    )
})
app.get('*',(req,res)=>{
    res.render('error',
    {
        title:'404 error',
        name:'Khushi Patel',
        error:'Page not found'
    }
    )
})


app.listen(port,()=>{
    console.log('Server running on port ' + port)
})