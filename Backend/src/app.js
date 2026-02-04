import express from "express";
import fileRoutes from "./routes/files.route.js";
import userRoutes from "./routes/user.route.js";
const app = express();
app.use(express.json());
app.use("/files", fileRoutes);
app.use("/users",userRoutes);
export default app;
