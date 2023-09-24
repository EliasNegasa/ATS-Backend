import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

import { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter firstname'],
    },
    lastName: {
      type: String,
      required: [true, 'Please enter lastname'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      immutable: true,
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [8, 'Password must be at least 8 characters long'],
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ['Candidate', 'Admin', 'Super Admin'],
        message: 'Role can only be Candidate, Admin, or Super Admin',
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      immutable: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.updatePassword = async function (newPassword) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(newPassword, salt);
};

const User = mongoose.model('User', userSchema);

export default User;
