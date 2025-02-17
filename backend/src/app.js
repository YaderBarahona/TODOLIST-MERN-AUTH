import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { FRONTEND_URL } from "./config.js";

const app = express();
app.use(
  cors({
    origin: FRONTEND_URL,
    // origin: "http://localhost:5174",
    credentials: true,
  })
);
app.use(morgan("dev"));

//para que el backend pueda utilizar/entender json
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", tasksRoutes);

export default app;
