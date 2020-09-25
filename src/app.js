const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 


const app = express()

// console.log(__dirname);
// console.log(__filename);

//links to express config 
const linkToHtml = path.join(__dirname, "../public")
const linktoHbs = path.join(__dirname, "../templates/views")
const linkToPartials = path.join(__dirname, "../templates/partials")

//setup handlebars and view location
app.set("view engine", "hbs")
app.set("views", linktoHbs)
hbs.registerPartials(linkToPartials)

// static link to html file in public
app.use(express.static(linkToHtml))

app.get("", (req,res) => {
    res.render("index", {
        title: "weather",
        name: "nano"
    })
})

app.get("/help", (req,res) => {
    res.render("help", {
        helptext: "How can i help you!",
        title: "Help",
        name: "nano"
    })
})

app.get("/about", (req,res) => {
    res.render("about", {
        title: "About Us",
        name: "nano"
    })
})

app.get("/weather", (req, res) =>{
    if(!req.query.adress){
        return res.send({
            error: "You must provide an adress"
        })
    }

    geocode(req.query.adress, (error, data) => { 
        if (error) {  
            return res.send({ error: error })
            //return res.send({error})   on peut utiliser aussi ca comme raccourci      
        }
       
        forecast(data.longitude, data.latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })  
            }
            
            return res.send({
                forcast: forecastData,
                location: data.location,
                adress: req.query.adress    
            }) 
                  
        })
    }) 
    
})

app.get("/help/*", (req, res)=> {
    res.render("404", {
        title: "404",
        name: "nano",
        errorMsg: "Help article not found"
    })
})

app.get("*", (req, res)=> {
    res.render("404", {
        title: "404",
        name: "nano",
        errorMsg: "P age not found"
    })
})

app.listen(3000, () => {
    console.log("serveur is up on port 3000");
})