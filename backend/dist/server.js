"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const errorHandler_1 = require("./middleware/errorHandler");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const sellerRoutes_1 = __importDefault(require("./routes/sellerRoutes"));
const customerRoutes_1 = __importDefault(require("./routes/customerRoutes"));
const complaintRoutes_1 = __importDefault(require("./routes/complaintRoutes"));
async function bootstrap() {
    await (0, db_1.connectToDatabase)();
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({ origin: env_1.CORS_ORIGIN, credentials: true }));
    app.use(express_1.default.json({ limit: "2mb" }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, morgan_1.default)("dev"));
    app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
    app.get("/health", (_req, res) => res.json({ ok: true }));
    app.use("/api/auth", authRoutes_1.default);
    app.use("/api/admin", adminRoutes_1.default);
    app.use("/api/seller", sellerRoutes_1.default);
    app.use("/api/customer", customerRoutes_1.default);
    app.use("/api/complaints", complaintRoutes_1.default);
    app.use(errorHandler_1.notFound);
    app.use(errorHandler_1.errorHandler);
    app.listen(env_1.PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Server listening on http://localhost:${env_1.PORT}`);
    });
}
bootstrap().catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Failed to start server", err);
    process.exit(1);
});
