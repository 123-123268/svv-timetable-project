import pool from "../db/index.js";

const fetchcelldata = async (req, res) => {
  const { fileId } = req.body;
  try {
    // Simulate fetching cell data from a database or service
    const result = await pool.query(
      "SELECT file_id,row,col,value,access_user_email FROM celldata WHERE file_id = $1",
      [fileId],
    );
    res
      .status(200)
      .json({
        message: "Cell data fetched successfully",
        cellData: result.rows,
      });
  } catch (error) {
    console.error("Error fetching cell data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const editcellbyuser = async (req, res) => {
  const { fileId, row, col, newvalue, curruser } = req.body;

  try {
    const cell = await pool.query(
      `SELECT * FROM celldata
       WHERE file_id = $1 AND "row" = $2 AND col = $3`,
      [fileId, row, col]
    );
    const authoroffile = await pool.query(
      `SELECT author_email FROM files
       WHERE file_id = $1`,
      [fileId]
    );
    if (cell.rows.length === 0) {
      return res.status(404).json({
        message: "No one is yet given the access to the cell by author",
      });
    }

    // ✅ FIX IS HERE
    if (cell.rows[0].access_user_email !== curruser && curruser !== authoroffile.rows[0].author_email) {
      return res.status(403).json({
        message: "You don't have access to edit this cell",
      });
    }

    await pool.query(
      `UPDATE celldata
       SET "value" = $1
       WHERE file_id = $2 AND "row" = $3 AND col = $4`,
      [newvalue, fileId, row, col]
    );

    res.status(200).json({ message: "Cell data updated successfully" });

  } catch (error) {
    console.error("Error changing cell data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editcellbyauthor = async (req, res) => {
  const { fileId, row, col, newvalue, newaccessuser } = req.body;

  try {
    const cell = await pool.query(
      `SELECT * FROM celldata
       WHERE file_id = $1 AND "row" = $2 AND col = $3`,
      [fileId, row, col]
    );

    if (cell.rows.length === 0) {
      // insert new cell
      await pool.query(
        `INSERT INTO celldata (file_id, row, col, value, access_user_email)
         VALUES ($1, $2, $3, $4, $5)`,
        [fileId, row, col, newvalue, newaccessuser]
      );
    } else {
      // update existing cell
      await pool.query(
        `UPDATE celldata
         SET value = $1, access_user_email = $2
         WHERE file_id = $3 AND row = $4 AND col = $5`,
        [newvalue, newaccessuser, fileId, row, col]
      );
    }

    return res.status(200).json({
      message: `Cell data updated to '${newvalue}' and access granted to '${newaccessuser}' by author`
    });

  } catch (error) {
    console.error("Error changing cell data by author:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { fetchcelldata, editcellbyuser ,editcellbyauthor};
