import express from "express";
import {
  addUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
  paginateClientsController
} from "../../controllers/index";

export const routerUser = express.Router();

routerUser.route("/getAllUser").get(getAllUser);

routerUser.route("/getuser/:id").get(getUserById); //http://localhost:3000/getuser/1

routerUser.route("/adduser").post(addUser);

routerUser.route("/delUser").delete(deleteUser); //http://localhost:3001/deluser?id=3

routerUser.route("/updateUser").put(updateUser);

routerUser.route('/clients').get(paginateClientsController);