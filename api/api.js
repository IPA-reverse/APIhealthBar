
var express = require('express')
var app = express()

app.get('/200',function(req,res){
    res.send(200)
})

app.get('/400',function(req,res){
    res.send(400)
})

app.get('/500',function(req,res){
    res.send(500)
})

app.listen(3000)
