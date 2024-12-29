import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    avtar: {
      type: String,
    },
    avtarPubId:{
        type:String,
    },
    coverImage: {
      type: String,
    },
    coverImagePubId:{
        type:String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Video',
      },
    ],
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    refreshToken: {
      type: String,
    },
    accessToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  // short lived token
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.JWT_SECRET_ACCESS,
    { expiresIn: process.env.JWT_SECRET_ACCESS_EXPIRE }
  );
};

userSchema.methods.generateRefreshToken = function () {
  // long lived token
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_REFRESH, {
    expiresIn: process.env.JWT_SECRET_REFRESH_EXPIRE,
  });
};

export const User = mongoose.model('User', userSchema);
