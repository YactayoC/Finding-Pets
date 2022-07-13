import mongoose, { Schema, model, Model } from 'mongoose';

import type { TUser } from 'types';
import { generateToken } from 'utils/generateToken';

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    profile: {
      type: String,
      default: 'https://res.cloudinary.com/sebas-2001-yac/image/upload/v1655085028/finding_pets/user/user_a5zknx.jpg',
      required: true,
    },

    role: {
      type: String,
      default: 'client',
      required: true,
      enum: {
        values: ['client', 'admin'],
        message: '{VALUE} is not a valid role',
      },
    },

    confirmed: {
      type: Boolean,
      default: false,
    },

    token: {
      type: String,
      default: generateToken(),
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<TUser> = mongoose.models.User || model('User', userSchema);
export default User;
