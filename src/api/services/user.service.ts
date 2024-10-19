import { Model } from "mongoose";
import { User } from "@models";
import GenericService from "./generic.service";
import {
  NotFoundException,
  ForbiddenException,
  UnAuthorizedException,
  InternalException
} from "./error.service";
import { IGenericObject, IUpdateUser, IUser } from "@interfaces";
import { verifyHash, isAuthorised } from "@utils";

export class UserService<T extends IUser> extends GenericService<T> {
  constructor(model: Model<T>) {
    super(model);
    this.model = model;
  }

  async editUser(id: string, user: IUser, payload: IUpdateUser) {
    const { email, password, newPassword } = payload;
    const existingUser = await this.findOne({ _id: id })

    if (!existingUser) {
      throw new NotFoundException(`This user does not exist`);
    }

    if (!isAuthorised(user, "_id", existingUser._id.toString())) {
      throw new ForbiddenException(
        `You do not have permission to update this user`
      );
    }

    if (email && existingUser.email === email) {
      throw new ForbiddenException(`This email is not available.`);
    }

    if (password) {
      const isValid = await verifyHash(password, existingUser.password);

      if (!isValid) {
        throw new UnAuthorizedException(`Email or Password is incorrect`);
      }

      payload.password = newPassword;
      delete payload.newPassword;
    }

    const updatedUser = await this.updateOne({ _id: id }, payload);
    if (!updatedUser)
      throw new ForbiddenException("Your profile update failed");

    const data: any = updatedUser.toObject();
    delete data.password;

    return {
      message: `Your profile was updated successfully! Please reset your password if this wasn't done by you`,
      data: updatedUser
    };
  }

  async uploadAvatar(_id: string, uploads: any, user: IUser) {
    const existingUser = await this.findOne({ _id });
    if (!existingUser) {
      throw new NotFoundException(`User ${_id} does not exist`);
    }

    if (!isAuthorised(user, "_id", existingUser._id.toString())) {
      throw new UnAuthorizedException("You are not authorised to change this avatar");
    }

    const updatedUser = await this.updateOne(
      { _id },
      { avatar: uploads[0].secure_url }
    );

    if (!updatedUser) {
      throw new InternalException("Your avatar was not updated")
    }

    const data: IGenericObject = updatedUser.toObject();
    delete data.password;

    return {
      message: `Avatar updated successfully`,
      data: updatedUser
    }
  }

  async disableUser(user: IUser) {
    const { _id } = user
    const existingUser = await this.findOne({ _id });

    if (!existingUser) {
      throw new NotFoundException(`This user does not exist`)
    }

    const isUnAuthorised = !isAuthorised(user, "_id", existingUser._id.toString()) &&
      !isAuthorised(user, "role", "coordinator")

    if (isUnAuthorised) {
      throw new UnAuthorizedException(`You do not have permission to delete this user`)
    }

    const disabledUser = await this.disableOne({ _id });
    if (!disabledUser) {
      throw new InternalException("There was an error disabling user")
    }

    const data: IGenericObject = disabledUser.toObject();
    delete data.password;

    return {
      message: `Your account was disabled. Please let us know if this was a mistake`,
      data
    }
  }

  async getUser(_id: string) {
    const isExistingUser = await this.findOne({ _id });

    if (!isExistingUser) {
      throw new NotFoundException(`User ${_id} does not exist`)
    }

    return {
      message: `User fetched successfully!`,
      data: isExistingUser
    }
  }

  async getUsers(query: any) {
    const { id, fullName, deleted } = query;

    if (id) {
      delete query.id;
      query._id = id;
    }

    if (fullName) {
      query.fullName = {
        $regex: (fullName as string).toLowerCase().trim(),
        $options: "i",
      };
    }

    if (typeof deleted === "boolean") {
      query.deleted = deleted;
    }

    const {
      data: users,
      currentPage,
      totalPages,
    } = await this.findAll(query);

    if (!users) {
      throw new InternalException("There was a problem fetching users.")
    }

    return {
      message: "Users successfully fetched",
      data: users,
      currentPage,
      totalPages
    }
  }
}

export default new UserService(User);