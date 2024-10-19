import Joi from 'joi'
import { checkForRequiredInput, validateObjectId } from '@utils'

export const UserSchemas = {
    email: Joi.string().email(),
    avatar: Joi.string(),
    password: Joi.string(),
    fullName: Joi.string(),
    page: Joi.number(),
    limit: Joi.number(),
    newPassword: Joi.string().custom((val, obj) => checkForRequiredInput(val, obj, 'password', 'isProvided')),
    id: Joi.string().custom(validateObjectId),
    _id: Joi.string().custom(validateObjectId)
}

export const UserFields = {
    GetOneUser: {
        params: ["id*"]
    },
    UpdateOneUser: {
        body: [
            "email",
            "avatar",
            "password",
            "newPassword"
        ],
        params: ["id*"]
    },
    DeleteOneUser: {
        params: [
            "id*"
        ]
    },
    GetAllUsers: {
        query: [
            "id",
            "_id",
            "email",
            "fullName",
            "page",
            "limit"
        ]
    }
}