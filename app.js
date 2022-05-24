const express = require('express');
const app = express();
const fs = require('fs');
const csvFilePath='./server/log.csv';
const csv=require('csvtojson');

app.set('json spaces', 2);
app.use((req, res, next) =>{
    let agent = req.headers['user-agent'].replace(/,/g,"") ;
    let time = new Date().toISOString();
    let method = req.method;
    let resource = req.originalUrl;
    let version = "HTTP/" + req.httpVersion;
    let status = res.statusCode;


    

    const dataLogs = `\n${agent},${time},${method},${resource},${version},${status}`;
    console.log(dataLogs);  
    fs.appendFile('./server/log.csv', dataLogs, function (err) {
        if (err) throw err;
 });
next();
})
//http://localhost:3000/
app.get('/', (req, res) => {
res.status(200).send('ok');
})

//http://localhost:3000/logs
app.get('/logs', (req, res) =>{
    csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
res.json(jsonObj);    
})
} )
module.exports = app;
