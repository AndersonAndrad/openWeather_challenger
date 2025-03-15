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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var index_1 = require("../index");
jest.mock('../infra/logger.ts', function () {
    return {
        Logger: jest.fn().mockImplementation(function () { return ({
            info: jest.fn(),
            debug: jest.fn(),
        }); }),
    };
});
jest.mock('../routes.ts', function () {
    return {
        Routes: jest.fn().mockImplementation(function () { return ({
            initializeRoutes: jest.fn(),
            attachAppRoutes: jest.fn(),
        }); }),
    };
});
describe(index_1.Server.name, function () {
    var server;
    var app;
    beforeAll(function () {
        server = new index_1.Server();
        app = server['expressInstance'];
    });
    it('should be defined', function () {
        expect(server).toBeDefined();
    });
    it('should start the server and respond to a request', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get('/')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should initialize the server and call listen', function () {
        var listenSpy = jest.spyOn(app, 'listen').mockImplementation(function (port, callback) {
            callback === null || callback === void 0 ? void 0 : callback();
            return {
                close: jest.fn(),
            };
        });
        server.initializeServer();
        expect(listenSpy).toHaveBeenCalled();
        listenSpy.mockRestore();
    });
    it('should initialize routes', function () {
        expect(server['routes'].attachAppRoutes).toHaveBeenCalledWith(app);
    });
    it('should initialize the server with default port', function () {
        delete process.env.APP_PORT;
        var listenSpy = jest.spyOn(app, 'listen').mockImplementation(function (port, callback) {
            callback === null || callback === void 0 ? void 0 : callback();
            return {
                close: jest.fn(),
            };
        });
        server.initializeServer();
        expect(listenSpy).toHaveBeenCalledWith('3000', expect.any(Function));
        listenSpy.mockRestore();
    });
    it('should initialize the server with custom port', function () {
        process.env.APP_PORT = '5000';
        var listenSpy = jest.spyOn(app, 'listen').mockImplementation(function (port, callback) {
            callback === null || callback === void 0 ? void 0 : callback();
            return {
                close: jest.fn(),
            };
        });
        server.initializeServer();
        expect(listenSpy).toHaveBeenCalledWith('5000', expect.any(Function));
        listenSpy.mockRestore();
    });
});
