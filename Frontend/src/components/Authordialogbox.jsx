import React, { useState, useEffect } from "react";
const Authordialogbox = ({
  open,
  cell,
  onClose,
  onSaveValue,
  onSaveAccess,
}) => {
  const [value, setValue] = useState("");
  const [access, setAccess] =useState("");

  useEffect(() => {
    if (cell) {
      setValue(cell.value || "");
      setAccess(cell.access || "");
    }
  }, [cell]);

  if (!open || !cell) return null;

  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-6 w-100">
          <h3 className="text-lg font-semibold mb-4">
            Edit Cell (Author)
          </h3>

          <label className="block text-sm mb-1">Cell Value</label>
          <input
            className="w-full border px-3 py-2 mb-4 rounded"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <label className="block text-sm mb-1">Access User</label>
          <input
            className="w-full border px-3 py-2 mb-6 rounded"
            value={access}
            onChange={(e) => setAccess(e.target.value)}
          />

          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 border rounded"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => {
                onSaveValue(cell.row, cell.col, value);
                onSaveAccess(cell.row, cell.col, access);
                onClose();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authordialogbox;
