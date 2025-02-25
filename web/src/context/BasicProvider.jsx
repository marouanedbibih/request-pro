import { createContext, useContext, useState } from "react";

const BasicContext = createContext({
  user: {},
  updateUser: () => {},
  resetUser: () => {},
  role: "",
  updateRole: () => {},

  jwtToken: "",
  updateJwtToken: () => {},
  removeJwtToken: () => {},
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
export default function BasicProvider({ children }) {
  // User Context
  const [user, setUser] = useState({});
  const updateUser = (newUser) => {
    setUser(newUser);
  };
  const resetUser = () => {
    setUser({});
  };
  const [role, setRole] = useState(localStorage.getItem("ACCESS_ROLE"));
  const updateRole = (newRole) => {
    setRole(newRole);
  };

  // JWT Token Context
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("JWT_TOKEN"));
  const updateJwtToken = (newJwtToken) => {
    setJwtToken(newJwtToken);
  };
  const removeJwtToken = () => {
    localStorage.removeItem("JWT_TOKEN");
  };

  // Pagination Context
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const updateCurrentPage = (newPage) => {
    setCurrentPage(newPage);
  };
  const updateTotalPages = (newTotalPages) => {
    setTotalPages(newTotalPages);
  };

  // Notification Context
  const [success, setSuccess] = useState("");
  const updateSuccess = (newSuccess) => {
    setSuccess(newSuccess);
  };

  const [errors, setErrors] = useState([]);
  const updateErrors = (newErrors) => {
    setErrors(newErrors);
  };

  const [confirmNotification, setConfirmNotification] = useState(false);
  const updateConfirmNotification = (newConfirmNotification) => {
    setConfirmNotification(newConfirmNotification);
  };

  // Loading Context
  const [loading, setLoading] = useState(false);
  const updateLoading = (newLoading) => {
    setLoading(newLoading);
  };

  return (
    <BasicContext.Provider
      value={{
        user,
        updateUser,
        resetUser,
        role,
        updateRole,
        jwtToken,
        updateJwtToken,
        removeJwtToken,
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
    </BasicContext.Provider>
  );
}

export const useBasicContext = () => useContext(BasicContext);
