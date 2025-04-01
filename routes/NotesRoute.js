import express from "express";
import AddNotes from "../controllers/AddNotes.js";
import GetAllNotes from "../controllers/GetAllNotes.js";
import DeleteNotes from "../controllers/DeleteNotes.js";
import UpdateNotes from "../controllers/UpdateNotes.js";

// create route
const NotesRoute = express.Router();
// create sub-routes and their controllers
NotesRoute.route("/")
  .post(AddNotes)
  .get(GetAllNotes)
  .delete(DeleteNotes)
  .put(UpdateNotes); // here we have just created a single route because here routes will be differentiated on the basis of the type of request and then it will hit the particular controller
export default NotesRoute;
