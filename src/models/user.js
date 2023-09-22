import mongoose from 'mongoose';
import validator from 'validator';
import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

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
      immutable: [true, 'Email cannot be changed'],
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: 8,
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ['Candidate', 'Admin', 'Super Admin'],
        message: 'Role can only include Candidate, Admin, Super Admin',
      },
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

const User = mongoose.model('User', userSchema);

export default User;
