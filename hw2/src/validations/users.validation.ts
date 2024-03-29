import * as Joi from '@hapi/joi';

export const usersBodySchema = Joi.object({
    login: Joi.string()
        .required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,15}$/)
        .required(),
    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required(),
    isDeleted: Joi.boolean()
        .required(),
    id: Joi.string()
});


export default {
    usersBodySchema
};
