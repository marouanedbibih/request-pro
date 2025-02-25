// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import ConfirmNotification from "../../components/notifications/ConfirmNotification";
import { useStateContext } from "../../context/ContextProvider";
import Success from "../../components/alert/Success";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import axiosClient from "../../api/axios";
import AdminTable from "../../components/table/AdminTable";
import { useAdminContext } from "../../context/AdminProvider";

function AdminsList() {
  const { success, _setSuccess } = useStateContext();
  const { _setAdmins, admins } = useAdminContext();
  //current page and total pages is used for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  // eslint-disable-next-line no-unused-vars
  const carouselPages = 5;
  // Delete notification state and functions
  const [confirmNotification, setConfirmNotification] = useState(false);
  const [deleteAdminId, setDeleteAdminId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleGetAdmins(currentPage);
  }, [currentPage]);

  const handleGetAdmins = (page) => {
    getAdminsApi(page);
  };

  const getAdminsApi = (page) => {
    axiosClient
      .get(`/admins?page=${page}`)
      .then(({ data }) => {
        _setAdmins(data.admins);
        console.info("Admins from response", data.admins);
        console.info("Admins from context", admins);

        setLoading(false);
        setTotalPages(data.totalPages);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleConfirm = () => {
    setConfirmNotification(false);
    deleteClient(deleteAdminId);
  };

  const handleCancel = () => {
    setConfirmNotification(false);
    _setSuccess("Delete action cancelled");
  };

  const onDeleteClick = (id) => {
    setConfirmNotification(true);
    setDeleteAdminId(id);
  };

  const deleteClient = (id) => {
    axiosClient
      .delete(`/admins/${id}`)
      .then(({ data }) => {
        handleGetAdmins(currentPage);
        _setSuccess(data.success);
      })
      .catch((error) => {
        console.error(error);
      });
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
      <Header title={"Manage Admins"} />
      {/* Serach and buttons section */}
      <div className="w-full py-4 flex justify-end items-center">
        <div className="flex justify-center items-center gap-2">
          <Link
            to={"/admins/new"}
            className="w-auto px-3.5 py-2 mr-2 bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-lg shadow justify-center items-center gap-2 flex text-white text-xs font-bold font-['Roboto'] uppercase leading-[18px]"
          >
            New Admin
          </Link>
        </div>
      </div>
      {/* Table section */}
      <AdminTable
        admins={admins}
        loading={loading}
        onDeleteClick={onDeleteClick}
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

export default AdminsList;
