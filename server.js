const express = require('express');
const hbs = require("hbs");
var app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;



app.set("view engine", "hbs");
app.use(express.static(__dirname + '/public'));
//hbs.registerpartials(__dirname + "/views/partials")
hbs.registerPartials(__dirname + '/views/partials');


app.use((req,res,next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log',log +'\n')
    next();
})

app.use((req,res,next) =>{
    res.render('maintenance.hbs');
})
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

app.get('/',(req,res) => {
   // res.send('hello Express');
   res.render('home.hbs',{
        pageTitle:'Home Page',
       message:'Welcome to our site'
   })
})


hbs.registerHelper('screamIt',(text) =>{
    return text.toUpperCase(text);
})

app.get('/about' , (req,res) => {
    res.render("about.hbs",{
        pageTitle:'About Page',
    });
})


 app.get('/bad', (req,res) => {
      res.send("Invalid Request");
 });

app.listen(port, () =>{
        console.log(`Server is up on port ${port}`)
});