import mongoose from "mongoose";

const MONGODB_URL =
  "mongodb+srv://neeva02singh:Shreya123@ecommerce.gfwk7yp.mongodb.net/myDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB is successfully connected");
  } catch (err) {
    console.log(err.message);
  }
};
export default connectDB;
