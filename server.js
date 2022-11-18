require('dotenv').config();
// console.log(process.env);cls
const Joi = require('joi');
const express = require("express");

const maal = require('./routes/maal')

const app = express();

app.use(logger); // using a middleware

app.use(express.static("public"))
app.use(express.json())



app.get('/api', (reg, res) => {
    console.log("server started")
    // res.sendStatus(500) 
    // res.download("file_path") // download options
    // res.status(500).json({ msg: "Error" })
    res.json({ msg: "dar API is at your service!" })
    // res.send('Hi')
    // res.render('index')
})

app.use('/api/maal', maal)

function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}





console.log(`server is runing at http://localhost:${process.env.PORT}/`);
app.listen(process.env.PORT)