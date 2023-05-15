const Joi = require('joi') 
const schemas = { 
    dataSchema:  Joi.object().keys({ 
    experience:Joi.number().min(0),
    age: Joi.number(),
    position: Joi.array().items(Joi.string().min(1)),
    gender: Joi.string().valid('Male', 'Female', 'Other'),
    location: Joi.string(),
  }),
  // define all the other schemas below 
}; 
module.exports = schemas;