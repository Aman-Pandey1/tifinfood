"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORS_ORIGIN = exports.JWT_SECRET = exports.MONGO_URI = exports.PORT = exports.NODE_ENV = void 0;
exports.requireEnv = requireEnv;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.NODE_ENV = process.env.NODE_ENV || "development";
exports.PORT = Number(process.env.PORT || 4000);
exports.MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/food_service_app";
exports.JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret_change_me";
exports.CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
function requireEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
}
