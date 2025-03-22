import Users from "../Models/Users.js";

const Register = async (req, res) => {
  try {
    // accept data from frontend

    const { name, email, password } = req.body;

    // validate input data
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        data: null,
        success: false,
      });
    }
    console.log(req.body);

    // check user is already present or not
    const isUser = await Users.findOne({ email: email });

    // if user is already present
    if (isUser) {
      return res.status(200).json({
        message: "User is already registered",
        data: null,
        success: false,
      });
    }

    //if user is not present

    // save user in the database
    const user = await Users.create(req.body);
    return res.status(201).json({
      message: "User is registered successfully",
      data: user,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: null });
  }
};

export default Register;
