const express = require('express');
const app = express();
const path = require('path');



//setting the view engine
app.set('views' , path.join(__dirname , '../views'))
app.set("view engine" , "ejs");
//rendering test
app.get('/home' , function(req, res){
    let page = {title : "home"}
    res.render('page' , page);
});
app.get('/about' , function(req, res){
    let page = {title : "about"}
    res.render('page' , page);
});
app.get('/contact' , function(req, res){
    let page = {title : "contact"}
    res.render('page' , page);
});
app.get('/:product' , function(req, res){
    let page = {title : req.params.product}
    res.render('page' , page);
});
//starting to listen 
app.listen(3000);