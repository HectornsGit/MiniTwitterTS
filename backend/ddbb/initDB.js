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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var getConnection_js_1 = require("./getConnection.js");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, 9, 10]);
                    return [4 /*yield*/, getConnection_js_1.default];
                case 1:
                    connection = _a.sent();
                    if (typeof connection === "undefined") {
                        throw new Error("Error en la conexión con la base de datos");
                    }
                    console.log("Borrando tablas...");
                    //BORRADO DE TABLAS
                    return [4 /*yield*/, connection.query("DROP TABLE IF EXISTS likes")];
                case 2:
                    //BORRADO DE TABLAS
                    _a.sent();
                    return [4 /*yield*/, connection.query("DROP TABLE IF EXISTS entries")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection.query("DROP TABLE IF EXISTS users")];
                case 4:
                    _a.sent();
                    console.log("Creando tablas...");
                    return [4 /*yield*/, connection.query("CREATE TABLE IF NOT EXISTS users(\n        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,\n        email VARCHAR(100) NOT NULL UNIQUE,\n        password VARCHAR(100) NOT NULL,\n        username VARCHAR(30) NOT NULL,\n        bio VARCHAR(100),\n        avatar VARCHAR(200) DEFAULT \"default_avatar.png\",\n        registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n        activated BOOLEAN DEFAULT FALSE\n        )")];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, connection.query("CREATE TABLE IF NOT EXISTS entries(\n      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,\n      user_id int UNSIGNED NOT NULL,\n      parent_entry_id int UNSIGNED,\n      FOREIGN KEY(parent_entry_id) REFERENCES entries(id),\n      FOREIGN KEY(user_id) REFERENCES users(id),\n      text VARCHAR(280) NOT NULL,\n      pictures VARCHAR(100),\n      creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n      )")];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, connection.query("CREATE TABLE IF NOT EXISTS likes (\n      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,\n        user_id INT UNSIGNED NOT NULL,\n        FOREIGN KEY (user_id) REFERENCES users (id),\n        entry_id INT UNSIGNED NOT NULL,\n        FOREIGN KEY (entry_id) REFERENCES entries (id),\n        creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n    )")];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 8:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 10];
                case 9:
                    console.log("Operación terminada");
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
main();
