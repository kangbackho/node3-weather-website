const requestPostman = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=daee72b5228d716f9ad54f04ab864a68&query=' + latitude + ',' + longitude + '&units=f'

    requestPostman({url: url, json:true}, (error, {body}) => {
        if(error){
            callback('there is no internet', undefined)
        }else if(body.error===0){
            callback('we cannot fine that location', undefined)
        }else{
            callback(undefined, {
                temperature : body.current.temperature
            })
            
            
        }
    })
}

module.exports = forecast