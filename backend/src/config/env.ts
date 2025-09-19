import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = Number(process.env.PORT || 4000);
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/food_service_app";
export const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret_change_me";
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}
