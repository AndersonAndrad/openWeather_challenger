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
exports.WeatherService = void 0;
var axios_1 = __importDefault(require("axios"));
var str_utils_1 = require("../../core/utils/str.utils");
var WeatherService = /** @class */ (function () {
    function WeatherService() {
        var _a, _b;
        this.WEATHER_URL = (_a = process.env.WEATHER_URL) !== null && _a !== void 0 ? _a : '';
        this.WEATHER_API_KEY = (_b = process.env.WEATHER_API_KEY) !== null && _b !== void 0 ? _b : '';
    }
    WeatherService.prototype.retrieveCity = function (cityName) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, errorMessage, error_1, errorMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cityName = (0, str_utils_1.clearString)(cityName);
                        if (!cityName || !cityName.length) {
                            console.log("No city name provided");
                            throw new Error("City parameter is required");
                        }
                        url = "".concat(this.WEATHER_URL, "/forecast.json");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        console.log("Searching for city ".concat(cityName));
                        return [4 /*yield*/, axios_1.default.get(url, {
                                params: { q: cityName, key: this.WEATHER_API_KEY, days: 1 },
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response || !response.data) {
                            errorMessage = "Don't exists city with this name ".concat(cityName);
                            console.log(errorMessage);
                            throw new Error(errorMessage);
                        }
                        return [2 /*return*/, response.data];
                    case 3:
                        error_1 = _a.sent();
                        errorMessage = "Not exists city with name: ".concat(cityName);
                        console.log("".concat(error_1.message, " - ").concat(errorMessage));
                        throw new Error(errorMessage);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return WeatherService;
}());
exports.WeatherService = WeatherService;
