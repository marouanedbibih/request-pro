// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axios";
import { useStateContext } from "../../context/ContextProvider";
import ConfirmNotification from "../../components/notifications/ConfirmNotification";
import Success from "../../components/alert/Success";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { useMyDemandeContext } from "../../context/MyDemandeProvider";
import MyDemandeTable from "../../components/table/DemandeTable";
import Spinner from "../../components/spinner/Spinner";

function MyDemande() {
  const { user, success, _setSuccess } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [confirmNotification, setConfirmNotification] = useState(false);
  const [deleteDemandeId, setDeleteDemandeId] = useState(null);

  const { demandes, updateDemandes } = useMyDemandeContext();

  useEffect(() => {
    getDemandesByClientApi(currentPage);
    console.log("MyDemande user", user);
  }, [currentPage]);

  const handleConfirm = () => {
    setConfirmNotification(false);
    deleteDemandeApi(deleteDemandeId);
  };

  const handleCancel = () => {
    setConfirmNotification(false);
    _setSuccess("Delete action cancelled");
  };

  const onDeleteClick = (id) => {
    setConfirmNotification(true);
    setDeleteDemandeId(id);
  };

  const getDemandesByClientApi = (page) => {
    setLoading(true);
    axiosClient
      .get(`/demandes/client/${user.clientId}?page=${page}`)
      .then(({ data }) => {
        updateDemandes(data.demandes);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        console.log("MyDemande data", data);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  const deleteDemandeApi = (id) => {
    setLoading(true);
    axiosClient
      .delete(`/demandes/${id}`)
      .then(({ data }) => {
        getDemandesByClientApi(currentPage);
        _setSuccess(data.success);
      })
      .catch((error) => {
        console.error(error);
      });
    setLoading(false);
  };
  return (
    <div className="w-full flex flex-col justify-center items-center gap-8">
      {confirmNotification && (
        <ConfirmNotification
          message={"You are sure you want to delete this Demande?"}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
      {success && <Success message={success} />}
      {loading && <Spinner />}
      {/* Header section */}
      <Header title={"My Demandes"} />
      {/* Serach and buttons section */}
      <div className="w-full py-4 flex justify-end items-center">
        <div className="flex justify-center items-center gap-2">
          <Link
            to={"/my-demandes/new"}
            className="w-auto px-3.5 py-2 mr-2 bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-lg shadow justify-center items-center gap-2 flex text-white text-xs font-bold font-['Roboto'] uppercase leading-[18px]"
          >
            New Demande
          </Link>
        </div>
      </div>
      {/* Table section */}
      <MyDemandeTable
        onDeleteClick={onDeleteClick}
        demandes={demandes}
        loading={null}
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

export default MyDemande;
