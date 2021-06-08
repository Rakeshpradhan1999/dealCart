import mongoose from 'mongoose';
import crypto from 'crypto';
const userSchema = new mongoose.Schema (
  {
    name: {
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
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    gender: {
      type: String,
      default: 'Male',
    },
    mobile: {
      type: Number,
    },
    resetPasswordLink: {
      data: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model ('User', userSchema);
export default User;
