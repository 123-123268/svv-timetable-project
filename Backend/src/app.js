import express from "express";
import fileRoutes from "./routes/files.route.js";

const app = express();
app.use(express.json());
app.use("/files", fileRoutes);

export default app;
