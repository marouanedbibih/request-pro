// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import ConfirmNotification from "../../components/notifications/ConfirmNotification";
import { useStateContext } from "../../context/ContextProvider";
import Success from "../../components/alert/Success";
import Header from "../../components/header/Header";
import { useDemandeContext } from "../../context/DemandeProvider";
import axiosClient from "../../api/axios";
import ManagerDemandeTable from "../../components/table/ManagerDemandeTable";
import SearchInput from "../../components/inputs/SearchInput";

function DemandeList() {
  const { success, _setSuccess } = useStateContext();
  const [confirmNotification, setConfirmNotification] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { demandes, updateDemandes } = useDemandeContext();

  useEffect(() => {
    getDemandesApi(currentPage);
  }, [currentPage]);

  const getDemandesApi = (page) => {
    axiosClient
      .get(`/demandes?page=${page}`)
      .then(({ data }) => {
        updateDemandes(data.demandes);
        console.log(data.demandes);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConfirm = () => {
    setConfirmNotification(false);
  };

  const handleCancel = () => {
    setConfirmNotification(false);
    _setSuccess("Delete action cancelled");
  };

  const onDeleteClick = (id) => {
    setConfirmNotification(true);
    // setDeleteAdminId(id);
  };

  const onUpdateStatus = (demandeId, newStatus) => {
    axiosClient
      .put(`/demandes/${demandeId}/status`, { status: newStatus })
      .then(({ data }) => {
        console.log(data);
        _setSuccess("Status updated successfully");
        getDemandesApi(currentPage);
      })
      .catch((error) => {
        console.log(error);
      

      });
  }

  const onSearch = (search) => {
  };
  return (
    <div className="w-full flex flex-col justify-center items-center gap-8">
      {confirmNotification && (
        <ConfirmNotification
          message={"You are sure you want to delete this Admin?"}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
      {success && <Success message={success} />}
      {/* Header section */}
      <Header title={"All Demandes"} />
      {/* Serach and buttons section */}
      <SearchInput onSearch={onSearch} />
      {/* Table section */}
      <ManagerDemandeTable
        onDeleteClick={onDeleteClick}
        demandes={demandes}
        loading={null}
        onUpdateStatus={onUpdateStatus}
      />
      {/* Pagination section */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default DemandeList;
