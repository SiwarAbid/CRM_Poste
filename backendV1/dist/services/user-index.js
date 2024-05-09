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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authTokenClient = exports.authTokenAdmin = exports.getAll_user = exports.get_userById = exports.update_user = exports.delete_user = exports.add_user = void 0;
const index_1 = __importDefault(require("@bd/index"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const add_user = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO client(nom, adresse, num_tel, email)
        VALUES ('${user.nom}', '${user.adresse}' , '${user.num_tel}' , '${user.email}');`;
        index_1.default.query(sql, (error, response) => {
            if (error) {
                console.log("Error executing query (add_user):", error.message);
                reject(error);
            }
            else {
                console.log("Query result:", "SUCCESS");
                resolve(response);
            }
        });
    });
});
exports.add_user = add_user;
const delete_user = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM client WHERE client_id = ${id};`;
        index_1.default.query(sql, (error, response) => {
            if (error) {
                console.log("Error executing query (add_user):", error.message);
                reject(error);
            }
            else {
                console.log("Query result:", "SUCCESS");
                resolve(response);
            }
        });
    });
});
exports.delete_user = delete_user;
const update_user = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE client SET nom = '${user.nom}', adresse = '${user.adresse}', num_tel = '${user.num_tel}', email = '${user.email}' WHERE client_id = '${user.id}';`;
        index_1.default.query(sql, (error, response) => {
            if (error) {
                console.log("Error executing query (update_user):", error.message);
                reject(error);
            }
            else {
                console.log("Query result:", "SUCCESS");
                resolve(response);
            }
        });
    });
});
exports.update_user = update_user;
const get_userById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM client WHERE client_id = ${id};`;
        index_1.default.query(sql, (error, response) => {
            if (error) {
                console.log("Error executing query (get_userById):", error.message);
                reject(error);
            }
            else {
                console.log("Query result:", "SUCCESS");
                resolve(response);
            }
        });
    });
});
exports.get_userById = get_userById;
const getAll_user = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM client;`;
        index_1.default.query(sql, (error, response) => {
            if (error) {
                console.log("Error executing query (getAll_user):", error.message);
                reject(error);
            }
            else {
                console.log("Query result:", "SUCCESS");
                resolve(response);
            }
        });
    });
});
exports.getAll_user = getAll_user;
const user = {
    id: 1,
    nom: "string",
    adresse: "string",
    num_tel: 123,
    email: "string",
};
jsonwebtoken_1.default.sign(user, "secret");
const authTokenAdmin = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM admin WHERE username='${username}' AND password='${password}';`;
        index_1.default.query(sql, (error, response) => {
            if (error) {
                console.log("Error executing query (authTokenAdmin):", error.message);
                reject(error);
            }
            else {
                console.log("Query result:", "SUCCESS");
                if (response.ok) {
                    const token = jsonwebtoken_1.default.sign({ username }, "PFE2024");
                    console.log("Res: ", response, " Token: ", token);
                    resolve({ response, token });
                }
                else {
                    reject(new Error("Utilisateur ou mot de passe incorrect"));
                }
            }
        });
    });
});
exports.authTokenAdmin = authTokenAdmin;
const authTokenClient = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM client WHERE nom='${username}' AND password='${password}';`;
        index_1.default.query(sql, (error, response) => {
            if (error) {
                console.log("Error executing query (authTokenClient):", error.message);
                reject(error);
            }
            else {
                console.log("Query result:", "SUCCESS");
                if (response.ok) {
                    const token = jsonwebtoken_1.default.sign({ username }, "PFE2024");
                    console.log("Res: ", response, " Token: ", token);
                    resolve({ response, token });
                }
                else {
                    reject(new Error("Utilisateur ou mot de passe incorrect"));
                }
            }
        });
    });
});
exports.authTokenClient = authTokenClient;
