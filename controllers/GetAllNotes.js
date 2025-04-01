import Users from "../Models/Users.js";

const GetAllNotes = async (req, res) => {
  console.log(req);
  const { email } = req.query; // Extract email from query params

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const notes = await Users.find({ email }); // Assuming Notes is your model
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default GetAllNotes;
