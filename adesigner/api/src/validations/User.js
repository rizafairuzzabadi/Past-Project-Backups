const Joi = require("joi");

const defaultRole = "visitor"
const createUser = Joi.object({
  username: Joi.string().required().min(2),
  name: Joi.string().min(2),
  surname: Joi.string().min(2),
  email: Joi.string().email().required().min(2),
  password: Joi.string().required().min(2),
  role: Joi.string().min(2),
});

module.exports = {
  createUser,
};
