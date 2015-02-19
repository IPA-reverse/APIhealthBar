
var express = require('express')
var app = express()

app.set('port', process.env.PORT || 3000);

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

app.get('/200',function(req,res){
    res.sendStatus(200)
})

app.get('/400',function(req,res){
    res.sendStatus(400)
})

app.get('/500',function(req,res){
    res.sendStatus(500)
})

app.listen(app.get('port'))
