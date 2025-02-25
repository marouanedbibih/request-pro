// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import ClientForm from "../../components/form/ClientForm";
import ClientFormContext from "../../context/ClientFormContext";
import HeaderClientForm from "../../components/header/HeaderClientForm";
import { useParams } from "react-router-dom";


function ClientEdit() {
  let { id } = useParams();
  let idClient = id ? id : null;

  return (
    <ClientFormContext>
      <div className="w-full flex justify-start items-center">
        <HeaderClientForm idClient={idClient}/>
      </div>
      <div className="flex justify-start items-start w-full gap-4">
        <ClientForm idClient={idClient}/>
      </div>
    </ClientFormContext>
  );
}

export default ClientEdit;
