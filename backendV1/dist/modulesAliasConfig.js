"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_alias_1 = require("module-alias");
const path_1 = require("path");
(0, module_alias_1.addAliases)({
    "@root": (0, path_1.resolve)(__dirname, ""),
    "@routes": (0, path_1.resolve)(__dirname, "routes"),
    "@controllers": (0, path_1.resolve)(__dirname, "controllers"),
    "@helpers": (0, path_1.resolve)(__dirname, "helpers"),
    "@services": (0, path_1.resolve)(__dirname, "services"),
    "@bd": (0, path_1.resolve)(__dirname, "Database"),
});
