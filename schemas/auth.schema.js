const Joi = require('joi');

const username = Joi.string().email(),
  password = Joi.string().min(8),
  newPassword = Joi.string().min(8),
  token = Joi.string().regex(
    /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
  );

const loginAuthSchema = Joi.object({
  username: username.required(),
  password: password.required(),
});

const recoveryAuthSchema = Joi.object({
  username: username.required(),
});

const changePasswordAuthSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required(),
});

module.exports = {
  loginAuthSchema,
  recoveryAuthSchema,
  changePasswordAuthSchema,
};
