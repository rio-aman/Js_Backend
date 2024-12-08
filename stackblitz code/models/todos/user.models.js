import { Schema, model } from 'mongoose';
// import mongoose from 'mongoose'

const userSchema = new Schema(
  //   {
  //   username: String,
  //   email: String,
  //   isActive: Boolean,
  // } one way to write
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      // required: [true,"Password is required"],
      required: true,
      unique: true,
      // min: [8, "Must be atleast of 8"]
    },
  },
  { timestamps: true }
);
// const userSchema = new mongoose.Schema({})

export const User = model('User', userSchema);
// export const User = mongoose.model("User",userSchema)

//this is right way to write mongoose data modeling

// ## IMP CAN BE ASK IN INTERVIEW
// in model User is written so in MongoDatabase has some standard in which the model User is convert to plural
// and it also converts to lowercase as users(by writing s convert it into plural and it also in small case)
