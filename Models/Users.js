import mongoose from "mongoose";

// Define the schema of model
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required field"],
  },
  email: {
    type: String,
    required: [true, "email is required field"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [{ title: String, description: String }],
});

// create the model
const Users = mongoose.model("Users", UserSchema);
export default Users;
