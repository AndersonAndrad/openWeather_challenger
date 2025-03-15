"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var routes_1 = require("./routes");
dotenv_1.default.config();
var Server = /** @class */ (function () {
    function Server() {
        this.expressInstance = (0, express_1.default)();
        this.routes = new routes_1.Routes();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }
    Server.prototype.initializeServer = function () {
        var PORT = process.env.APP_PORT || '3000';
        this.expressInstance.listen(PORT, function () {
            console.log("Server running on http://localhost:".concat(PORT, "/v1"));
        });
    };
    Server.prototype.initializeMiddlewares = function () {
        this.expressInstance.use(express_1.default.json());
    };
    Server.prototype.initializeRoutes = function () {
        this.routes.attachAppRoutes(this.expressInstance);
    };
    return Server;
}());
exports.Server = Server;
var server = new Server();
server.initializeServer();
