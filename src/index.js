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

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/properties", propertiesRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Backend API running on http://localhost:${port}`);
});
