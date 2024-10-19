import { Request } from 'express'
import { IUser, ICreateUser, IUpdateUser } from "./user.interface";
import { UploadApiResponse } from 'cloudinary';

export interface IGenericObject {
    [key: string]: any
}

export interface CustomRequest extends Request {
    user: IUser;
}

export interface IPaginate {
    currentPage: number;
    totalPages: number
}

export type ICustomValidationFields = (value: any, helpers: any, fieldToCheck: any, valueToCheck: any) => any

export interface IReqFileUpload {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number
}

export type IUpload = IReqFileUpload & UploadApiResponse

export type ICollections = IUser;

export type ICreateCollections = ICreateUser;

export type IUpdateCollections = IUpdateUser;

export * from "./user.interface";