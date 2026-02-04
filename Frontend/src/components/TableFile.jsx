import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Authordialogbox from "./Authordialogbox";

const TableFile = () => {
  const location = useLocation();
  const filename = location.state?.filename;
  const authorname = location.state?.authorname;

  const curr = "trent"; // current user

  const data = [
    { row: 0, col: 0, value: "cse", accessuser: "John Doe" },
    { row: 0, col: 1, value: "maths", accessuser: "doe" },
    { row: 0, col: 2, value: "science", accessuser: "trent" },
    { row: 1, col: 0, value: "data structures", accessuser: "bob" },
    { row: 1, col: 1, value: "algebra", accessuser: "charlie" },
    { row: 2, col: 0, value: "algorithms", accessuser: "mallory" },
    { row: 2, col: 1, value: "calculus", accessuser: "trent" },
    { row: 2, col: 2, value: "chemistry", accessuser: "peggy" },
  ];

  const maxRow = Math.max(...data.map((d) => d.row));
  const maxCol = Math.max(...data.map((d) => d.col));

  const [table, setTable] = useState(() => {
    const t = Array.from({ length: maxRow + 1 }, () =>
      Array(maxCol + 1).fill(""),
    );
    data.forEach((d) => (t[d.row][d.col] = d.value));
    return t;
  });
  const [permtable, setPermtable] = useState(() => {
    const t = Array.from({ length: maxRow + 1 }, () =>
      Array(maxCol + 1).fill(""),
    );
    data.forEach((d) => (t[d.row][d.col] = d.accessuser));
    return t;
  });

  const [selectedCell, setSelectedCell] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updateCell = (row, col, value) => {
    setTable((prev) =>
      prev.map((r, rIdx) =>
        rIdx === row ? r.map((c, cIdx) => (cIdx === col ? value : c)) : r,
      ),
    );
  };
  const updateCellValue = (row, col, value) => {
    setTable((prev) =>
      prev.map((r, rIdx) =>
        rIdx === row ? r.map((c, cIdx) => (cIdx === col ? value : c)) : r,
      ),
    );
  };

  const updateCellAccess = (row, col, user) => {
    setPermtable((prev) =>
      prev.map((r, rIdx) =>
        rIdx === row ? r.map((c, cIdx) => (cIdx === col ? user : c)) : r,
      ),
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">{filename}</h1>

      <table className="border border-gray-300 table-auto w-full">
        <tbody>
          {table.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => {
                const canEdit = curr === authorname || permtable[r][c] === curr;

                return (
                  <td
                    key={c}
                    className={`px-6 py-4 border ${
                      canEdit ? "bg-green-50 cursor-pointer" : "bg-gray-100"
                    }`}
                    onClick={() => {
                      // AUTHOR → open modal with options
                      if (curr === authorname) {
                        setSelectedCell({
                          row: r,
                          col: c,
                          value: table[r][c],
                          access: permtable[r][c],
                        });
                        setIsDialogOpen(true);
                        return;
                      }

                      // NON-AUTHOR with permission → quick edit value
                      if (permtable[r][c] === curr) {
                        const newValue = prompt("Enter new value", cell);
                        if (newValue !== null) {
                          updateCellValue(r, c, newValue);
                        }
                        return;
                      }

                      // NO ACCESS
                      alert("You don't have permission to edit this cell");
                    }}
                  >
                    {cell || "—"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <Authordialogbox
        open={isDialogOpen}
        cell={selectedCell}
        onClose={() => setIsDialogOpen(false)}
        onSaveValue={updateCellValue}
        onSaveAccess={updateCellAccess}
      />
    </div>
  );
};

export default TableFile;
