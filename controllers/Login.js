import Users from "../Models/Users.js";
import bcrypt from "bcrypt";

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

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      data: user,
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
