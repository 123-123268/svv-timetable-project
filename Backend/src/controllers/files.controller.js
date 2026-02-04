import pool from "../db/index.js";

const createFile=async(req,res)=>{
    const {filename,author_email}=req.body;
    try{
        // Insert file metadata into the database
        const result=await pool.query(
            "INSERT INTO files (filename, author_email) VALUES ($1, $2) RETURNING *",
            [filename,author_email]
        );
        res.status(201).json({message:"File saved",file:result.rows[0]});
    }catch(error){
        console.error("Error saving file metadata:",error);
        res.status(500).json({message:"Internal server error"});
    } 
}
export {createFile};