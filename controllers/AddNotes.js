import Users from "../Models/Users.js";

const AddNotes = async (req, res) => {
  try {
    console.log(req.body);

    //get the data from frontend
    const { email, title, description } = req.body;
    //get the use
    const user = await Users.findOne({ email });
    //add the notes
    user.notes = [...user.notes, { title, description }];
    // save user
    const newUser = await user.save();
    return res.status(200).json({
      message: "Notes added successfully",
      data: newUser,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default AddNotes;
