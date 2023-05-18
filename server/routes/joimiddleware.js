const Joi = require('joi'); 
const middleware = (schema, property) => { 
  return (req, res, next) => { 
    console.log(JSON.parse(req.body));
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  } 
} 
module.exports = middleware;