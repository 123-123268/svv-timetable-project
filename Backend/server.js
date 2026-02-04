import app from "./src/app.js";
import pool from "./src/db/index.js";
pool.connect().then(() => {
  console.log("Connected to the database");
}).catch((err) => {
  console.error("Database connection error", err.stack);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
