import pool from "../db/index.js";

export const createFile = async (req, res) => {
  const { filename, author_email } = req.body;

  if (!filename || !author_email) {
    return res.status(400).json({
      message: "filename and author_email are required",
    });
  }

  try {
    const result = await pool.query(
      "INSERT INTO files (filename, author_email) VALUES ($1, $2) RETURNING file_id, filename, author_email, created_at",
      [filename, author_email]
    );

    res.status(201).json({
      message: "File saved",
      file: result.rows[0],
    });

  } catch (error) {
    console.error("Error saving file metadata:", error);

    // Foreign key violation
    if (error.code === "23503") {
      return res.status(400).json({ message: "Author does not exist" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllFiles = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT file_id, filename, author_email, created_at FROM files ORDER BY created_at DESC"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch files" });
  }
};
