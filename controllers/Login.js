import Users from "../Models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
        data: null,
      });
    }

    // Find user by email
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
        data: null,
      });
    }

    // Compare password with stored hashed password
    // const isPasswordValid = await bcrypt.compare(password, user.password);

    if (password !== user.password) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
        data: null,
      });
    }

    //if all things are going correct, then we generate token
    const token = await jwt.sign({ id: user._id }, "mynameisshreyasingh", {
      expiresIn: "2h",
    }); //unique id,secret key and expiry time
    //save in cookie
    return res
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, //1 day in millisecond
        // httpOnly: true,
      })
      .status(200)
      .json({
        message: "User logged in successfully",
        success: true,
        data: user,
        token,
      });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};

export default Login;
