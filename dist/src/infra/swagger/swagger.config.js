"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUi = exports.swaggerDocs = void 0;
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerUi = swagger_ui_express_1.default;
var APP_PORT = process.env.APP_PORT || 3000;
var swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Weather API",
            version: "1.0.0",
            description: "API documentation for the Weather service",
        },
        servers: [
            {
                url: "http://localhost:".concat(APP_PORT, "/v1"),
                description: "Local server",
            },
            {
                url: "https://open-weather-challenger.onrender.com/v1",
                description: "Prod server",
            },
        ],
    },
    apis: ["src/routes.ts"],
};
var swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.swaggerDocs = swaggerDocs;
