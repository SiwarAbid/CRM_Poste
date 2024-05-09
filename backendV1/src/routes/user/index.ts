import express from "express";
import {
  addUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
  AuthWithTokenAdmin,
  AuthWithTokenUser,
  // getUsers,
} from "../../controllers/index";

export const routerUser = express.Router();

routerUser.route("/clients").get(getAllUser);

routerUser.route("/getuser/:id").get(getUserById); //http://localhost:3000/getuser/1

routerUser.route("/adduser").post(addUser); /** **/

routerUser.route("/delUser").delete(deleteUser); //http://localhost:3001/deluser?id=3

routerUser.route("/updateUser").put(updateUser);

routerUser.route("/login").post(AuthWithTokenAdmin);

routerUser.route("/userLogin").post(AuthWithTokenUser);

// routerUser.get("/users", getUsers);
