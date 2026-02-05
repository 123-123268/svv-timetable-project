import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "table_app",
  password: process.env.PASSWORD_DB,
  port: 5432,
});

export default pool;
