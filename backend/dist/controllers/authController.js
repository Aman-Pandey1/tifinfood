"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const password_1 = require("../utils/password");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { name, email, password, role } = req.body;
    const existing = await User_1.User.findOne({ email });
    if (existing)
        return res.status(400).json({ message: "Email already in use" });
    const hashed = await (0, password_1.hashPassword)(password);
    const user = await User_1.User.create({ name, email, password: hashed, role: role || "CUSTOMER" });
    const token = jsonwebtoken_1.default.sign({ id: user._id.toString(), role: user.role }, env_1.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});
exports.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.User.findOne({ email });
    if (!user)
        return res.status(400).json({ message: "Invalid credentials" });
    const ok = await (0, password_1.comparePassword)(password, user.password);
    if (!ok)
        return res.status(400).json({ message: "Invalid credentials" });
    const token = jsonwebtoken_1.default.sign({ id: user._id.toString(), role: user.role }, env_1.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});
