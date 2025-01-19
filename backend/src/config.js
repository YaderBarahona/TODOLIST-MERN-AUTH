import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 4000;
export const DB_HOST = process.env.DB_HOST || "mongodb://localhost/merndb";
export const DB_DATABASE = process.env.DB_DATABASE || "merndb";
export const DB_PORT = process.env.DB_PORT || 27017;
export const URL = process.env.URL || "mongodb://localhost/merndb";

export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret123";
export const JWT_EXPIRES = process.env.JWT_EXPIRES || "1d";
export const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";
