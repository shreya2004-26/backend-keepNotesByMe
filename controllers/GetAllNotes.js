import Users from "../Models/Users.js";

const GetAllNotes = async (req, res) => {
  try {
    //get the user id
    const userID = req.id;
    const notes = await Users.find({ _id: userID }); // Assuming Notes is your model
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default GetAllNotes;
