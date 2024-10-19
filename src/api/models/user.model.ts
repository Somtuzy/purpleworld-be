import { Schema, model } from "mongoose";
import { IUser } from "@interfaces";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { hash } from "@utils";

const userSchema = new Schema<IUser>({
  fullName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isDeleted: {
    type: Boolean
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

userSchema.plugin(mongooseAutoPopulate);

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

    this.password = await hash(this.password);

    next();
});


export default model<IUser>("User", userSchema);