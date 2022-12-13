const express = require('express');
const Joi = require('joi');
const dataValidate = require('../datavalidation')
const maal = express.Router();

const products = [
    {
        id: 1,
        name: "Cake Rolls",
        price: 2.00,
        maf: "31/12/2021",
        exp: "12/10/2023"

    },
    {
        id: 2,
        name: "Enamle Paint",
        price: 10.00,
        maf: "11/10/2019",
        exp: "30/10/2023"

    }
];


maal.route('/')
    .get((req, res) => {
        res.json(products);
    })
    .post((req, res) => {

        const { error, value } = dataValidate.newProduct(req.body)
        if (error) return res.json(error.details[0].message);

        const product = {
            id: getProductId(products),
            name: req.body.name,
            price: req.body.price,
            maf: req.body.maf,
            exp: req.body.exp
        }
        products.push(product);
        res.json(product);
    });

maal.route('/:id')
    .get((req, res) => {

        const product = products.find(p => p.id === parseInt(req.params.id));
        //not existing, return 404
        if (!product) return res.status(404).json({ error: "Product not found" })
        res.json(product)
    })
    .put((req, res) => {

        //look up the product
        const product = products.find(p => p.id === parseInt(req.params.id));
        // if not exiting, return 404
        if (!product) return res.status(404).json({ error: "Product not found" })

        //Validate
        const { error, value } = dataValidate.beforUpdate(req.body);

        //If invalid, return 400 - Bad request
        if (error) return res.status(400).json(error.details[0].message);

        //Update product
        if (req.body.name) product.name = req.body.name;
        if (req.body.price) product.price = parseFloat(req.body.price);
        if (req.body.maf) product.maf = req.body.maf;
        if (req.body.exp) product.exp = req.body.exp;

        //Retuen the updated product
        res.json(product)
    })
    .delete((req, res) => {


        //Look up the product
        const product = products.find(p => p.id === parseInt(req.params.id));
        //not existing, return 404
        if (!product) return res.status(404).json({ error: "Product not found" })

        //Delete
        const index = products.indexOf(product);
        products.splice(index, 1)

        //Return the same product
        res.json(product);
    })




maal.param('id', (req, res, next, id) => {
    req.product = products[id - 1]
    next();
});

//get the id of last product, increse by 1, return the new id
function getProductId(products) {
    // console.log(products);
    if (!products.length) return 1
    return products[products.length - 1].id + 1;
};






module.exports = maal;