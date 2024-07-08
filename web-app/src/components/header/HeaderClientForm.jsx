// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useClientContext } from "../../context/ClientContext";


// eslint-disable-next-line react/prop-types
function HeaderClientForm({idClient}) {
  const { client } = useClientContext();
  

  return (
    <div className="w-auto h-20  justify-between items-center inline-flex">
      <div className="text-black text-5xl font-bold font-['Roboto'] leading-[62.40px]">
        {idClient && (
          <h1>
            Update Client:  {client.firstname} {client.lastname}{" "}
          </h1>
        )}
        {!idClient && <h1>New Client</h1>}
      </div>
    </div>
  );
}

export default HeaderClientForm;
