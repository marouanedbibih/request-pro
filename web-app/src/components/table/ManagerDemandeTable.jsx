// eslint-disable-next-line no-unused-vars
import React from "react";

const headerTable = [
  "ID",
  "Description",
  "Date",
  "Type",
  "Status",
  "Client",
  "Actions",
];

// eslint-disable-next-line react/prop-types
function ManagerDemandeTable({ demandes, loading, onDeleteClick,onUpdateStatus }) {
  const handleStatusChange = (demandeId, event) => {
    const newStatus = event.target.value;
    onUpdateStatus(demandeId, newStatus);
  };
  return (
    <div className=" bg-white rounded-2xl shadow p-8 animated fadeInDown w-full">
      <table className="">
        <thead className="bg-light ">
          {headerTable.map((h, index) => (
            <th key={index} className="text-left p-2">
              {h}
            </th>
          ))}
        </thead>
        {loading && (
          <tbody>
            <tr>
              <td colSpan="7" className="text-center w-full">
                {/* <TableSpinner /> */}
              </td>
            </tr>
          </tbody>
        )}
        {!loading ? (
          // eslint-disable-next-line react/prop-types
          demandes && demandes.length > 0 ? (
            <tbody className="">
              {demandes.map((d, index) => (
                <tr key={d.id} className="">
                  <tr>{d.id}</tr>
                  <td className="">{d.description}</td>
                  <td>{d.date}</td>
                  <td>{d.type}</td>

                  <td>
                    {/* Render select element for status */}
                    <select
                      value={d.status}
                      onChange={(e) => handleStatusChange(d.id, e)}
                      className="border border-gray-400 rounded p-1"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="APPROVED">APPROVED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </td>
                  <td>{d.clientName}</td>

                  <td className="flex items-center">
                    <button
                      onClick={(ev) => onDeleteClick(d.id)}
                      className="w-auto px-3.5 py-2 bg-red-600 hover:bg-red-500 active:bg-red-700  rounded-lg shadow justify-center items-center gap-2 flex"
                    >
                      <div className="text-white text-xs font-bold font-['Roboto'] uppercase leading-[18px]">
                        Delete
                      </div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="7" className="text-center">
                  No demandes available
                </td>
              </tr>
            </tbody>
          )
        ) : null}
      </table>
    </div>
  );
}

export default ManagerDemandeTable;
