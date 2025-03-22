import express from "express";
import Register from "../controllers/Register.js";
import Login from "../controllers/Login.js";

// create a route
const UserRoute = express.Router();

// create subroute and their controller
UserRoute.route("/register").post(Register);

UserRoute.route("/login").post(Login);

export default UserRoute;
