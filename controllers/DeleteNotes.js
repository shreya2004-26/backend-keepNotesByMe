//
import Users from "../Models/Users.js";

const DeleteNotes = async (req, res) => {
  try {
    console.log(req.query); // Debugging

    const { id } = req.query; // Get note ID & user email

    if (!id) {
      return res
        .status(400)
        .json({ message: "ID and Email are required", success: false });
    }

    // Find the user by email
    const updatedUser = await Users.findOneAndUpdate(
      { _id: req.id },
      { $pull: { notes: { _id: id } } }, // Removes the note with matching ID
      { new: true } // Returns updated user
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      message: "Note deleted successfully",
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

export default DeleteNotes;
