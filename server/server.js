const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('server/public'));
app.use(bodyParser.json());


//--------------PG Connection route-------------//
const Pool = pg.Pool; //a pool is a bunch of connections 

const pool = new Pool({
    database: 'shoe_store', //the name of the DB
    host: 'localhost',//where is your DB?
    port: 5432, //the postico port that's running
    max: 10, //how many queries can you run at one time
    idleTimeoutMillis: 30000, //the timeout in milliseconds
});

pool.on('connect', () =>{
    console.log('Postgresql connected'); //checking the connection
});
pool.on('error', (error)=>{
    console.log('Error with postgres pool', error);//showing an error if there's something wrong with connection
})
//----------------------end---------------------//


app.post('/shoe', (req, res)=>{
    const newShoe = req.body;

    pool.query(
        `INSERT INTO "shoes" ("name", "cost")
        VALUES ($1, $2);`, [newShoe.name, newShoe.cost])//shoe.name would be $1, it functions the same as below but keeps malicious users from destroying or retrieving our DB
        //VALUES ('${req.body.name}', '${req.body.name}');`)
        .then(()=>{
            res.sendStatus(200);
            
        })
        .catch((error)=>{
            console.log('Query problem: ', error);
            res.sendStatus(500);
        })
});

app.get('/shoe', (req, res)=>{
    pool.query(
        `SELECT * FROM "shoes"`)
        .then((results)=>{
            res.send(results.rows);
        })
        .catch((error)=>{
            res.sendStatus(500);
        })
});

app.listen(port, function (req, res) {
  console.log('Listening on port', port);
});