import React from "react";
import ActionButtons from "./ActionButtons";

function TableBody({
  tableData,
  headers,
  action,
  handleView,
  handleEdit,
  handleDelete,
}) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {tableData.map((item, index) => (
        <tr key={index}>
          {headers.map((header, idx) => (
            <td key={idx} className="px-6 py-4 whitespace-nowrap">
              {item[header]}
            </td>
          ))}
          {action && (
            <td className="px-6 py-4 whitespace-nowrap flex space-x-3">
              <ActionButtons
                item={item}
                handleView={handleView}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
