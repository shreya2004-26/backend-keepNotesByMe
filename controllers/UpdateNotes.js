import Users from "../Models/Users.js";

const UpdateNotes = async (req, res) => {
  try {
    console.log(req.body);

    const { id, title, description } = req.body; // Extract values from the request body

    if (!id || !title || !description) {
      return res
        .status(400)
        .json({ error: "id, title and description are required" });
    }

    // Find the user
    const user = await Users.findOne({ _id: req.id });

    // Find and update the note inside the user's notes array
    let noteFound = false;
    user.notes = user.notes.map((note) => {
      if (note._id.toString() === id) {
        noteFound = true;
        return { ...note, title: title, description: description }; // Update note content
      }
      return note;
    });

    if (!noteFound) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Save the updated user document
    await user.save();

    return res.status(200).json({
      message: "Note updated successfully",
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message, success: false });
  }
};

export default UpdateNotes;
