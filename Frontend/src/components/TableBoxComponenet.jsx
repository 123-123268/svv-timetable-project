import React from 'react'
import { useNavigate } from 'react-router-dom';

const TableBoxComponenet = ({filename,authorname}) => {
    const navigate = useNavigate();
    return (
    <li className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4 flex items-center gap-4">
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">
          {filename}
        </h2>
        <p className="text-sm text-gray-500">
          {authorname}
        </p>
      </div>

      <span className="text-sm text-blue-600 font-medium cursor-pointer hover:underline" onClick={() =>
  navigate("/table", { state: { filename, authorname } })
}>
        View
      </span>
    </li>
  );
}

export default TableBoxComponenet
