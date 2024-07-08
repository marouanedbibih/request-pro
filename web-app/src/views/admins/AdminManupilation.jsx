// eslint-disable-next-line no-unused-vars
import React from "react";
import HeaderAdminForm from "../../components/header/HeaderAdminForm";
import AdminForm from "../../components/form/AdminForm";
import { useParams } from "react-router-dom";

function AdminManupilation() {
    let { id } = useParams();
    let idAdmin = id ? id : null;
  return (
    <div>
      <div className="w-full flex justify-start items-center">
        <HeaderAdminForm idAdmin={idAdmin} />
      </div>
      <div className="flex justify-start items-start w-full gap-4">
        <AdminForm idAdmin={idAdmin} />
        {/* {idClient ? <ImageForm idClient={idClient} /> : null} */}
      </div>
    </div>
  );
}

export default AdminManupilation;
