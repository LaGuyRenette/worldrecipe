import express from "express";
import { deleteUser, getAllUsers, getOneUser, updateUser } from "../controllers/user.controller.js";

const UserRoute = express.Router();


//GET ALL USERS
UserRoute.route('/users').get(getAllUsers)

//GET ONE
UserRoute.route("/user/:id").get(getOneUser)

//UPDATE
UserRoute.route("/update-user/:id").put(updateUser)

//DELETE
UserRoute.route("/delete-user/:id").delete(deleteUser)

export default UserRoute;