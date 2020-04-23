import * as Joi from '@hapi/joi';

export const groupBodySchema = Joi.object({
    id: Joi.string(),
    name: Joi.string()
        .required(),
    permissions: Joi.array()
        .items(Joi.string())
        .required()
});
