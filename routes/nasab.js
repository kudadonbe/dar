const express = require('express');
const Joi = require('joi');

const data = require('../db.json');
const people = data.bano_adam;
// const people = JSON.stringify(data);


const nasab = express.Router();

nasab.route('/')
    .get((req, res) => {
        // res.json(nasabData);
        res.json(people);
    });

nasab.get('/:nid/family', (req, res) => {
    const family = {
        me: {},
        kids: [],
        partners: {
            present: [],
            past: []
        }
    }
    const nid = req.params.nid;
    // console.log(nid);

    //  * to create a family
    //  * get person
    const person = people.find(p => p.nid === nid);
    const kids = people.filter(k => k.father === nid);

    // console.log(people);
    family.me = person;
    //  * get kids 
    family.kids = kids;
    //  * 
    // 





    res.json(family);
});



module.exports = nasab;