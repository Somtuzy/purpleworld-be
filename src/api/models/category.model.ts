import { Schema, model } from "mongoose";
import { ICategory } from "@interfaces";
import mongooseAutoPopulate from "mongoose-autopopulate";

const categorySchema = new Schema<ICategory>({
  title: {
    type: String,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  icon: {
    type: String
  },
  isDeleted: {
    type: Boolean,
    default: false
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

categorySchema.plugin(mongooseAutoPopulate);

export default model<ICategory>("Category", categorySchema);