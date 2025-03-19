import mongoose from "mongoose";

// Define the schema of model
const UserSchema = new mongoose.Schema({
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
  notes: [{ tile: String, description: String }],
});

// create the model
const Users = mongoose.model("Users", UserSchema);
export default Users;
