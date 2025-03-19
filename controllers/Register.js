import Users from "../Models/Users";

const Register = async (req, res) => {
  try {
    // accept data from frontend
    const reqBody = req.body();
    console.log(reqBody);

    // check user is already present or not
    const isUser = await Users.findOne({ email: reqBody.email });

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
    const user = await Users.create(reqBody);
    return res.status(201).json({
      message: "User is registered successfully",
      data: user,
      success: true,
    });
  } catch (err) {
    return res.status(200).json({ message: err.message, data: null });
  }
};

export default Register;
