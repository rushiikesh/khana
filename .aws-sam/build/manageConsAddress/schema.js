const {Joi} = require('common-layer/utils/packageExports.js');

let schema = Joi.object().keys({
    userID: Joi.string().required(),
    line1: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().required(),
    u_date: Joi.date().required(),
    isDefault:Joi.boolean().required(),
    reqtype: Joi.string().required(),
    addID:Joi.string()
    })

module.exports = schema;