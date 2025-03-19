import Users from "../Models/Users";

const Login = async (req, res) => {
  try {
    // retrieve data from frontend
    // console.log(req.body);

    const { email, password } = req.body();

    // now find an user whose email matches with .i.e entered email from frontend
    const user = await Users.findOne({ email: email });
    //if user is not present
    if (user == null) {
      return res
        .status(200)
        .json({ message: "User does not exist", data: null, success: false });
    }
    // if user is present, then check if the password is equal with password sent from frontend
    if (user.password == password) {
      return res.status(200).json({
        message: "user logged in successfully",
        data: user,
        success: true,
      });
    } else {
      return res
        .status(200)
        .json({ message: "Invalid credentials", data: null, success: false });
    }
  } catch (err) {
    return res.status(200).json({
      message: err.message,
      success: false,
      data: null,
    });
  }
};
export default Login;
