import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { CORS_ORIGIN, PORT } from "./config/env";
import { connectToDatabase } from "./config/db";
import { errorHandler, notFound } from "./middleware/errorHandler";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import sellerRoutes from "./routes/sellerRoutes";
import customerRoutes from "./routes/customerRoutes";
import complaintRoutes from "./routes/complaintRoutes";
import userRoutes from "./routes/userRoutes";

async function bootstrap() {
  await connectToDatabase();

  const app = express();

  app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));

  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.use("/api/auth", authRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/seller", sellerRoutes);
  app.use("/api/customer", customerRoutes);
  app.use("/api/complaints", complaintRoutes);
  app.use("/api/user", userRoutes);

  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server", err);
  process.exit(1);
});
