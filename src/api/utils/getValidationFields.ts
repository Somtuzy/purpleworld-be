import Joi from 'joi'

export const getValidationFields = (schema: any, fields: string[]) => {
  return Joi.object(Object.keys(schema).reduce((acc: any, key) => {
    const isRequired = fields.includes(`${key}*`);
    acc[key] = isRequired ? schema[key].required() : schema[key];
    return acc;
  }, {}));
};