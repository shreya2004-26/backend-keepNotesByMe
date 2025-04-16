import Users from "../Models/Users.js";

const AddNotes = async (req, res) => {
  try {
    //get the data from frontend
    console.log(req);

    const { title, description } = req.body;
    //get the user id
    const userID = req.id;
    //get the user
    const user = await Users.findOne({ _id: userID });
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
