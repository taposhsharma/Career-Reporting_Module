const Joi = require('joi') 
const schemas = { 
    dataSchema:  Joi.object({
      position: Joi.object({
        operator: Joi.string().required(),
        column: Joi.string().required(),
        params: Joi.array().items(Joi.string()).required()
      }).required(),
      location: Joi.object({
        operator: Joi.string().required(),
        column: Joi.string().required(),
        params: Joi.array().items(Joi.string()).required()
      }).required(),
      gender: Joi.object({
        operator: Joi.string().required(),
        column: Joi.string().required(),
        params: Joi.array().items(Joi.string()).required()
      }).required(),
      application_status: Joi.object({
        operator: Joi.string().required(),
        column: Joi.string().required(),
        params: Joi.array().items(Joi.string()).required()
      }).required(),
      experience: Joi.object({
        operator: Joi.string().required(),
        column: Joi.string().required(),
        min: Joi.number().integer().required(),
        max: Joi.number().integer().required()
      }).required(),
      age: Joi.object({
        operator: Joi.string().required(),
        column: Joi.string().required(),
        min: Joi.number().integer().required(),
        max: Joi.number().integer().required()
      }).required()
    })
    
    
    
    
  // define all the other schemas below 
}; 
module.exports = schemas;