import React from "react";
import { Link } from "react-router-dom";


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
function MyDemandeTable({ demandes, loading, onDeleteClick }) {
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
                  <td className="">
                  {d.description}
                  </td>
                  <td>{d.date}</td>
                  <td>{d.type}</td>

                  <td className="">
                    {d.status}
                  </td>
                  <td>{d.clientName}</td>

                  <td className="flex items-center">
                    <Link
                      to={"/my-demandes/update/" + d.id}
                      className="w-auto px-3.5 py-2 mr-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-lg shadow justify-center items-center gap-2 flex"
                    >
                      <div className="text-white text-xs font-bold font-['Roboto'] uppercase leading-[18px]">
                        Edit
                      </div>
                    </Link>
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

export default MyDemandeTable;
