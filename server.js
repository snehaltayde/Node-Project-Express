const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
//register Partials for Seperate header and footer Partials
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//Express Middleware to create a static directory and serve it on server
//app.use(express.static(__dirname + '/public'));
app.get('/rajat', (req, res) =>{
res.send('<h1>This is rajat<h1>');
});
//express MiddleWare
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} : ${req.url}`;
  console.log(log);
fs.appendFile('server.log', log + '\n', (err) =>{
  if(err){
    console.log('Cannot Append FIle');
  }
});
next();
});
//Express MiddleWare Maintainance Mode

app.use((req, res, next) =>{
res.render('maintain.hbs')
next();
});

//Expresss Create url and assign views
app.get('/about', (req,res)=>{
res.render('about.hbs', {
  pagetitle: 'About Us',
  username: 'User',
  date: new Date().getFullYear()
});
});

app.get('/', (req,res)=>{

  res.render('home.hbs', {
pagetitle: 'Home Page',
welcome: 'welcome to Our Site',
date: new Date().getFullYear()

  });
});
//Set Port No to listen and run server
app.listen(3000, () =>{

  console.log('Server is running');
});
