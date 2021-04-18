import Joi from 'joi';

export const schema = Joi.object().keys({
    login: Joi.string().alphanum().required(),
    password: Joi.string().alphanum().min(3).max(30).required(),
    age: Joi.number().integer().min(4).max(130).required()
});
