import React, { useEffect, useState } from "react";
import axios from "axios";
import TableBoxComponenet from "./TableBoxComponenet";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Home = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/files/getallfiles"
        );
        setFiles(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load files");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="max-w-3xl w-full mx-auto px-4 py-8 flex-1">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Time Tables
          </h1>

          {loading && (
            <p className="text-center text-gray-500">Loading files...</p>
          )}

          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}

          {!loading && !error && files.length === 0 && (
            <p className="text-center text-gray-500">
              No files uploaded yet
            </p>
          )}

          <ul className="space-y-4">
            {files.map((file) => (
              <TableBoxComponenet
                key={file.file_id}
                filename={file.filename}
                authorname={file.author_email}
              />
            ))}
          </ul>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
