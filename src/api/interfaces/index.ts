import { Request } from 'express'
import { IUser, ICreateUser, IUpdateUser } from "./user.interface";
import { UploadApiResponse } from 'cloudinary';
import { ICategory, ICreateCategory, IUpdateCategory } from './category.interface';

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

export type ICollections = IUser | ICategory;

export type ICreateCollections = ICreateUser | ICreateCategory;

export type IUpdateCollections = IUpdateUser | IUpdateCategory;

export * from "./user.interface";
export * from "./category.interface";