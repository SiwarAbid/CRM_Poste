"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUser = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("../../controllers/index");
exports.routerUser = express_1.default.Router();
exports.routerUser.route("/clients").get(index_1.getAllUser);
exports.routerUser.route("/getuser/:id").get(index_1.getUserById); //http://localhost:3000/getuser/1
exports.routerUser.route("/adduser").post(index_1.addUser);
exports.routerUser.route("/delUser").delete(index_1.deleteUser); //http://localhost:3001/deluser?id=3
exports.routerUser.route("/updateUser").put(index_1.updateUser);
exports.routerUser.route("/login").post(index_1.AuthWithTokenAdmin);
exports.routerUser.route("/userLogin").post(index_1.AuthWithTokenUser);
