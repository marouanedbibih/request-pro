// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import ClientTable from "../../components/table/ClientTable";
import Pagination from "../../components/pagination/Pagination";
import SearchInput from "../../components/inputs/SearchInput";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import axiosClient from "../../api/axios";
import ConfirmNotification from "../../components/notifications/ConfirmNotification";
import { useStateContext } from "../../context/ContextProvider";
import Success from "../../components/alert/Success";
import { useClientContext } from "../../context/ClientContext";

function ClientList() {
  const { success, _setSuccess } = useStateContext();
  const { clients, _setClients } = useClientContext();
  const [loading, setLoading] = useState(false);

  //current page and total pages is used for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const carouselPages = 5;

  // Delete notification state and functions
  const [confirmNotification, setConfirmNotification] = useState(false);
  const [deleteClientId, setDeleteClientId] = useState(null);
  useEffect(() => {
    handleGetClients(currentPage);
  },[currentPage]);

  /**
   * This function is used to handle the confirm notification.
   * The confirm notification is a modal that appears when the user clicks on the delete button.
   * When the user clicks on the confirm button, the deleteClient function is called.
   * deleteClient function is used to delete the client from the API.
   */
  const handleConfirm = () => {
    setConfirmNotification(false);
    deleteClient(deleteClientId);
  };

  /**
   * This function is used to handle the cancel notification.
   * The cancel notification is a modal that appears when the user clicks on the delete button.
   * When the user clicks on the cancel button, the handleCancel function is called.
   * _setSuccess function is used to show a success message from the context ContextProvider.jsx.
   */
  const handleCancel = () => {
    setConfirmNotification(false);
    _setSuccess("Delete action cancelled");
  };

  /**
   * this function render the getClient function when the page is loaded
   * currentPage is used to get the current page number
   */

  // useEffect(() => {
  //   displayClients(currentPage);
  // }, [currentPage]);

  /**
   * This function is used to fetch data from the API.
   * The API returns a response with the data and metadata, such as total pages and current page,
   * which are then set in the state.
   * Note: You must develop the error card to handle API errors.
   */
  const handleGetClients = (page) => {
    setLoading(true);
    getClients(page);
  };

  /**
   *
   * @param {bigint} id
   * When the user cliciks on the delete button in the table, the onDeleteClick function is called
   * this funstion open the Confirm Notification by change the value of state confirmNotification to true
   * then set the deleteClientId to the id of the client that the user wants to delete
   */
  const onDeleteClick = (id) => {
    setConfirmNotification(true);
    setDeleteClientId(id);
  };
  /**
   * 
   * @param {string} searchTerm 
   * @returns 
   * This function is used to search for a client by calling the searchClient function
   * The searchClient function is used to search for a client by calling the API
   * onSearch is passed as a parameter to the SearchInput component
   */
  const onSearch = (searchTerm) => {
    // console.log("Search:", searchTerm);
    if (searchTerm === "") {
      handleGetClients(currentPage);
      return;
    }
    setCurrentPage(1);
    setLoading(true);
    searchClient(searchTerm);
    // console.log("Search:", searchTerm);
  };

  // API functions
  const getClients = (page) => {
    axiosClient
      .get(`/clients?page=${page}`)
      .then(({ data }) => {
        console.log(data);
        _setClients(data.clients);
        setLoading(false);
        setTotalPages(data.totalPages);
      })
      .catch(() => {
        setLoading(false);
        // Show error card
      });
  };
  /**
   *
   * @param {bigint} id
   * This function is used to delete a client from the API
   * The client is deleted by calling the delete method on the axiosClient instance
   * then the getClients function is called to fetch the updated data from the API
   * the success message is return from response of the API like this
   * { "message": "Client deleted successfully"}
   */
  const deleteClient = (id) => {
    axiosClient
      .delete(`/clients/${id}`)
      .then(({data}) => {
        handleGetClients(currentPage);
        _setSuccess(data.success);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  /**
   * 
   * @param {string} term
   * This function is used to sent api with term to search for a client
   * Each term is typed in the search input is sent to the API
   * this function is working like the getClients function
   * She return the data of the clients that match the term and the meta data {total pages, current page}
   */
  const searchClient = (term) => {
    axiosClient
      .get(`/clients/search?search=${term}&page=${currentPage}`)
      .then(({data}) => {
        _setClients(data.content);
        console.log("Clients search",data);
        setLoading(false);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-8">
      {confirmNotification && (
        <ConfirmNotification
          message={"You are sure you want to delete this client?"}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
      {success && <Success message={success} />}
      {/* Header section */}
      <Header title={"Manage Clients"} />
      {/* Serach and buttons section */}
      <div className="w-full py-4 flex justify-between items-center">
        <SearchInput onSearch={onSearch} />
        <div className="flex justify-center items-center gap-2">
          <Link
            to={"/clients/new"}
            className="w-auto px-3.5 py-2 mr-2 bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-lg shadow justify-center items-center gap-2 flex text-white text-xs font-bold font-['Roboto'] uppercase leading-[18px]"
          >
            New Client
          </Link>
        </div>
      </div>
      {/* Table section */}
      <ClientTable
        clients={clients}
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

export default ClientList;
