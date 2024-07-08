import { createContext, useContext, useState } from "react";

const HomeContext = createContext({
  user: {},
  updateUser: () => {},
  resetUser: () => {},
  removeJwtToken: () => {},
  demandes: [],
  updatedemandes: () => {},
  currentPage: 1,
  updateCurrentPage: () => {},
  totalPages: 1,
  updateTotalPages: () => {},
  success: "",
  updateSuccess: () => {},
  errors: [],
  updateErrors: () => {},
  loading: false,
  updateLoading: () => {},
  confirmNotification: false,
  updateConfirmNotification: () => {},
});

// eslint-disable-next-line react/prop-types
export default function HomeProvider({ children }) {
  const [user, setUser] = useState({});
  const [demandes, setDemandes] = useState([]);
  const updatedemandes = (newDemande) => {
    setDemandes(newDemande);
  };
  const updateUser = (newUser) => {
    setUser(newUser);
  };
  const resetUser = () => {
    setUser({});
  };
  const removeJwtToken = () => {
    localStorage.removeItem("JWT_TOKEN");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const updateCurrentPage = (newPage) => {
    setCurrentPage(newPage);
  };
  const updateTotalPages = (newTotalPages) => {
    setTotalPages(newTotalPages);
  };

  const [success, setSuccess] = useState("");
  const updateSuccess = (newSuccess) => {
    setSuccess(newSuccess);
  };

  const [errors, setErrors] = useState([]);
  const updateErrors = (newErrors) => {
    setErrors(newErrors);
  };

  const [loading, setLoading] = useState(false);
  const updateLoading = (newLoading) => {
    setLoading(newLoading);
  };

  const [confirmNotification, setConfirmNotification] = useState(false);
  const updateConfirmNotification = (newConfirmNotification) => {
    setConfirmNotification(newConfirmNotification);
  };

  return (
    <HomeContext.Provider
      value={{
        user,
        updateUser,
        resetUser,
        removeJwtToken,
        demandes,
        updatedemandes,
        currentPage,
        updateCurrentPage,
        totalPages,
        updateTotalPages,
        success,
        updateSuccess,
        errors,
        updateErrors,
        loading,
        updateLoading,
        confirmNotification,
        updateConfirmNotification,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export const useHomeContext = () => useContext(HomeContext);
