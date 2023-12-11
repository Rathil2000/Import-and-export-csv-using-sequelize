const Joi = require('joi');
const definition = [{ username: true, email: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/]}];
const data = {
    body: Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().required(),
        status:Joi.string().required(),
        process: Joi.string().required(),
        email: Joi.string().pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
       
      }),
}


module.exports=data;