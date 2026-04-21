// import mongoose from "mongoose";
import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required'],
    },
    userName: {
      type: String,
      required: [true, 'Username is required'],
      // keep in mind that when we create user it's coming from google because we're using the google oauth and the provider from next auth so they won't be entering this email, Username and stuff through a form. You could do it like that using NextAuth. you can use email and password in your own db but the way our's gonna work is that they validate with google with the google provider and then their google info will go into our db
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Property',
      },
    ],
    // because we're going to be able to have users bookmark certain properties as basically like their favourites, you can call this favourites, bookmarks or whatever.
  },
  { timestamps: true },
);

const User = models.User || model('User', UserSchema);

export default User;
