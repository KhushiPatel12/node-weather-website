
const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        messageOne.textContent = 'Loading..'
        messageTwo.textContent = ''
        fetch('http://localhost:3000/weather?address=' + address.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        } 
        else{
            messageOne.textContent = 'Location : ' + data.location 
            messageTwo.textContent = '\nForecast : ' + data.forecastData
        }  
    })
    })
})