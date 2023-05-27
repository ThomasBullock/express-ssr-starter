import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// Create Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
  },
  googleId: {
    type: String,
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

export default mongoose.model("User", userSchema);
