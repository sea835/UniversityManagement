import React from "react";

function TableHeader({ headers, action }) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            onclink={() => handleHeaderClick(header)}
          >
            <span>
              {header.charAt(0).toUpperCase() +
              header.slice(1).replace(/([A-Z])/g, " $1")}
            </span>
            <span></span>
          </th>
        ))}
        {action && (
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <span>Action</span>
          </th>
        )}
      </tr>
    </thead>
  );
}

export default TableHeader;
