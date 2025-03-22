// import Users from "../Models/Users.js";

// const Login = async (req, res) => {
//   try {
//     // retrieve data from frontend
//     console.log(req.body);

//     const { email, password } = req.body;

//     // now find an user whose email matches with .i.e entered email from frontend
//     const user = await Users.findOne({ email: email });
//     //if user is not present
//     if (user == null) {
//       return res
//         .status(200)
//         .json({ message: "User does not exist", data: null, success: false });
//     }
//     // if user is present, then check if the password is equal with password sent from frontend
//     if (user.password == password) {
//       return res.status(200).json({
//         message: "user logged in successfully",
//         data: user,
//         success: true,
//       });
//     } else {
//       return res
//         .status(500)
//         .json({ message: "Invalid credentials", data: null, success: false });
//     }
//   } catch (err) {
//     return res.status(500).json({
//       message: err.message,
//       success: false,
//       data: null,
//     });
//   }
// };
// export default Login;

import Users from "../Models/Users.js";
import bcrypt from "bcrypt";

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

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
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
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
