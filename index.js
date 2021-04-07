const express = require('express')
const { Client } = require('pg');
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000


app.use(express.json())

const client = new Client({
    user: 'enteruser',
    host: 'enterhost',
    database: 'enterdb',
    password: 'enterpassword',
    port: 'enterport'
})
client.connect()
 .then(() =>{
     console.log("Postgresql connected...");
 })
 .catch(err => {
     console.log(err.message);
 })

 app.get('/api/v1/users',(req, res) => {
    client.query('SELECT * FROM users', (err, data) => {
        if(err){
            return res.status(400).json({
                type: 'error',
                message:err.message
            })
    
        }
        return res.status(200).json(data.rows)
    })
 })
app.post('/api/v1/user/add', (req, res) => {
    let ip = `'${req.body.ip}'`
    let query = `INSERT INTO users (ip) VALUES (${ip})`
    client.query(query, (err, data) => {
        if(err){
            return res.status(400).json({
                type: 'error',
                message:err.message
            })
    
        }
        return res.redirect('/api/v1/users')
    })
})
 app.listen(port,() => console.log('App running...'))
