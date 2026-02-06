import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function CreateFileModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [tableName, setTableName] = useState("");
  const { createFile } = useAuth();

  const handleCreate = async() => {
    if (!tableName.trim()) {
        alert("Please enter a valid table name");
    }
    try{
        await createFile(tableName);
    }
    catch(err){
        console.error(err);
        alert("Failed to create table");
    }
    setTableName("");
    setIsOpen(false);
  };

  return (
    <>
      {/* Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          create new time table
        </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-gray-300 y-40 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-96 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">
              Create Time Table
            </h2>

            <input
              type="text"
              placeholder="Time Table Name"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              className="w-full border px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
