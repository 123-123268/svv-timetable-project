import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "table_app",
  password: "sahilrao@313",
  port: 5432,
});

export default pool;
