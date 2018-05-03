var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 5000;

const shoes = require('./modules/shoe')
app.use(bodyParser.json());

app.post('/shoe', (req, res)=>{
    let shoeObject = req.body;
    shoes.push(shoeObject)
    res.sendStatus(200);
});

app.get('/shoe', (req, res)=>{
    console.log('GET server works');
    res.send(shoes);
});

app.listen(port, function (req, res) {
  console.log('Listening on port', port);
});