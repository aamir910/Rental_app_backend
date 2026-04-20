import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import propertiesRouter from "./routes/properties.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use((req, _res, next) => {
  console.log(`[API] ${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/properties", propertiesRouter);
app.use("/api/auth", authRouter);

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend API running on port ${port}`);
});
