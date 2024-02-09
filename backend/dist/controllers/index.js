"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateClientsController = exports.getUserById = exports.updateUser = exports.deleteUser = exports.getAllUser = exports.addUser = void 0;
const user_index_1 = require("@services/user-index");
function addUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = request.body;
            yield (0, user_index_1.add_user)(data);
            return response.status(200).json({ result: "SUCCESS" });
        }
        catch (error) {
            console.error("Failed to add user:", error);
            return response.status(500).json({ error: "Failed to add user" });
        }
    });
}
exports.addUser = addUser;
function getAllUser(_, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield (0, user_index_1.getAll_user)();
            return response.status(200).json({ result: res });
        }
        catch (error) {
            console.error("Failed to get all user:", error);
            return response.status(500).json({ error: "Failed to get all user" });
        }
    });
}
exports.getAllUser = getAllUser;
function deleteUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = request.query.id;
            console.log("FUNCTION DELETE");
            (0, user_index_1.delete_user)(Number(id));
            return response.status(200).json({ result: "DELETED" });
        }
        catch (error) {
            console.error("Failed to delete user:", error);
            return response.status(500).json({ error: "Failed to delete user" });
        }
    });
}
exports.deleteUser = deleteUser;
function updateUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = request.body;
            (0, user_index_1.update_user)(user);
            return response.status(200).json({ result: "UPDATED" });
        }
        catch (error) {
            console.error("Failed to update user :", error);
            return response.status(500).json({ error: "Failed to update user " });
        }
    });
}
exports.updateUser = updateUser;
function getUserById(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield (0, user_index_1.get_userById)(Number(request.params.id));
            return response.status(200).json({ result: res });
        }
        catch (error) {
            console.error("Failed to get user by id:", error);
            return response.status(500).json({ error: "Failed to get user by id" });
        }
    });
}
exports.getUserById = getUserById;
function paginateClientsController(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield (0, user_index_1.getAll_user)();
            return response.status(200).json({ result: res });
        }
        catch (error) {
            console.error("Error fetching clients:", error);
            return response.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.paginateClientsController = paginateClientsController;
