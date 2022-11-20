const path = require("path")
const express = require("express");
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//paths
app.set("view engine", "hbs")
app.set("views", viewPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))


app.get("", (req, res) =>{
    res.render("index", {
        title: "Weather app",
        name: "Koloz"
    })
})

app.get("/about", (req, res) =>{
    res.render("about", {
        title: "About",
        name: "Koloz"
    })
})

app.get("/help", (req, res) =>{
    res.render("help", {
        job: "back-end",
        title: "Help",
        name: "Koloz"
    })
})


app.get("/weather", (req, res) =>{
    if(!req.query.address){
        return res.send("You must enter address!")
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>{
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, data) =>{
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: data,
                location,
                address: req.query.address
            })
        })
        
    })
    

    
})

app.get("/products", (req, res) =>{
    if(!req.query.search){
        res.send({
            error: "You must provide a search term"
        })
    }else{
        res.send({
            products: []
        })
    }

    
})



app.get("/help/*", (req, res) =>{
    res.render("404", {
        title: "help404",
        error: "Help article not found!"
    })
})


app.get("*", (req, res) =>{
    res.render("404", {
        title: "404",
        error: "Article not found!"
    })
})



app.listen(3000, () =>{
    console.log("Server is up on port 3000")
})
