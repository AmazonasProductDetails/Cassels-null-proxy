const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const path = require('path');

var prox = express();

prox.use(bodyParser.json());
prox.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

function serve(req, res){
    axios.get('http://127.0.0.1:3000/api/recs')
    .then((result)=>{
        console.log('got data from remote');
        res.send(result.data)
    })
    .catch((err)=>{console.log('ERROR after get reuest fro bindle: '+err)})
}

prox.get('/p', serve);

prox.listen(1337, ()=>{console.log('listening on port: 1337')});