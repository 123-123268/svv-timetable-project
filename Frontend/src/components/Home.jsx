import React, { useEffect, useState } from "react";
import axios from "axios";
import TableBoxComponenet from "./TableBoxComponenet";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const {
    fetchFiles,
    files,
    setFiles,
    homeloading,
    sethomeloading,
    error,
    setError,
  } = useAuth();

  useEffect(() => {
    const loadFiles = async () => {
      try {
        await fetchFiles();
      } catch (err) {
        console.error(err);
      }
    };

    loadFiles();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="max-w-3xl w-full mx-auto px-4 py-8 flex-1">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Time Tables</h1>

          {homeloading && (
            <p className="text-center text-gray-500">Loading files...</p>
          )}

          {error && <p className="text-center text-red-500">{error}</p>}

          {!homeloading && !error && files.length === 0 && (
            <p className="text-center text-gray-500">No files uploaded yet</p>
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
