const Joi = require('joi'); 
const middleware = (schema, property) => { 
  return (req, res, next) => { 
    console.log(typeof(req.body));
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }
    else {
      console.log('all correct');
      next();
    }
  } 
} 
module.exports = middleware;