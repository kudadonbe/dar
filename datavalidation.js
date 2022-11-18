const Joi = require('joi')

const auMudhaa = Joi.object(
    {
        name: Joi.string().min(3).required(),
        price: Joi.number().required(),
        maf: Joi.string(),
        exp: Joi.string().required()
    }
);

const mudaIslaahu = Joi.object(
    {
        name: Joi.string().min(3),
        price: Joi.number(),
        maf: Joi.string(),
        exp: Joi.string()
    }
);

const newProduct = (product) => {
    return auMudhaa.validate(product);
}

const beforUpdate = (product) => {
    return mudaIslaahu.validate(product);
}

module.exports = { newProduct, beforUpdate };