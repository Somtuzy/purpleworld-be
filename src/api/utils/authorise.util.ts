import { IUser } from '@interfaces';

export const isAuthorised = (user: IUser, key: keyof IUser, value: string | boolean) => {
    return user[key].toString().toLowerCase() === value
}