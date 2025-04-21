// import the express module
import express from "express";
import connectDB from "./config/database.js";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import NotesRoute from "./routes/NotesRoute.js";
import isAuth from "./middleware/isAuth.js";
import dotenv from "dotenv";
dotenv.config();

// create an instance of the express application
const app = express();

// specify a port number for the server
const port = 8000;

// to accept data in json format from frontend
app.use(express.json());

// to enable cross origin resourse sharing
console.log(process.env.FRONTEND_SERVER);

app.use(
  cors({
    origin: process.env.FRONTEND_SERVER, // or wherever your frontend is//it will sharing resource only on this url
    credentials: true, // <-- VERY IMPORTANT//it will store cookies in this particular url
  })
);

// create a server route
app.get("/", (req, res) => {
  res.send("This server is created by Shreya Singh");
});

//connect database
connectDB();

// register routes
app.use("/api", UserRoute);
app.use("/api/notes", isAuth, NotesRoute);

//start the server and listen to the port
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
