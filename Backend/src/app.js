import express from "express";
import fileRoutes from "./routes/files.route.js";
import userRoutes from "./routes/user.route.js";
import cellRoutes from "./routes/cell.route.js";
import cors from "cors";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use("/files", fileRoutes);
app.use("/users",userRoutes);
app.use("/cell",cellRoutes);

export default app;
