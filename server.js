require('dotenv').config();

const Joi = require('joi');
const express = require("express");
const maal = require('./routes/maal')
const nasab = require('./routes/nasab')
const app = express();



app.use(express.static("public"))
app.use(express.json())

app.get('/api', (reg, res) => {
    console.log("server started")
    res.json({ msg: "dar API is at your service!" })
})

app.use('/api/maal', maal);
app.use('/api/nasab', nasab);

console.log(`server is runing at http://localhost:${process.env.PORT}/`);
app.listen(process.env.PORT);