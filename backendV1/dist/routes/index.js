"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const index_1 = require("index");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const index_2 = require("./user/index");
const registerRouter = (app) => {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Start Node API",
                version: "1.0.0",
                description: "This page is dedicated to the route list in the application",
            },
            servers: [
                {
                    url: `http://${index_1.HOST}:${index_1.PORT}/api/v1`,
                },
            ],
        },
        apis: [
            `${__dirname}/*/*${path_1.default.extname(path_1.default.basename(__filename))}`,
            `${__dirname}/*/*/*${path_1.default.extname(path_1.default.basename(__filename))}`,
        ],
    };
    const specs = (0, swagger_jsdoc_1.default)(options);
    app.use("/api/v1/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    // app.get("/", (_, res) => {
    //   res.json({ message: "API Running ! " });
    // });
    app.use("/", [index_2.routerUser]);
};
exports.default = registerRouter;
