const express = require('express')
const path = require('path')
const hbs = require('hbs')
const requestPostman = require('postman-request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()

const dirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(dirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'andrew'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: 'corona'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        name: "who are you"
    })
})


app.get('/weather', (req, res) => {

    const addressValue = req.query.address
    if(!addressValue){
        return res.send({
            error: 'You must provide address...'
        })
    }

    geocode(addressValue, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send(error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send(error)
            }
            
            res.send({
                forecast: 'It is snowing',
                location: req.query.address,
                temperature: forecastData
            })
            console.log(forecastData)
            console.log(location)
        })
    })
     
    
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide search term..'})
    }
    res.send({
        search:"naver",
        name: "haejin"
    })
})

app.get('/help/*', (req, res) => {
    res.render('page404', {
        title : 'help article',
        name: 'helpman',
        errormessage: 'help article not found....'
    })
})

app.get('*', (req, res) => {
    res.render('page404', {
        title : 'error 404',
        name: 'get out',
        errorMessage: '404 error doing..'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})