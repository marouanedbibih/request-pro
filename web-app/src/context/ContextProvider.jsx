// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, createContext, useEffect } from "react";

// create Context
const StateContext = createContext({
  user: {},
  token: null,
  role: null,
  notification: null,
  userId: null,
  _setToken: () => {},
  setUser: () => {},
  _setRole: () => {},
  setNotification: () => {},
  _setUserId: () => {},
  success: null,
  _setSuccess: () => {},

  updateUser: () => {},
});

// eslint-disable-next-line react/prop-types
export default function ContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("USER");
    return storedUser ? JSON.parse(storedUser) : {};
  });
  const [token, setToken] = useState(localStorage.getItem("JWT_TOKEN"));
  const [role, setRole] = useState(localStorage.getItem("ACCESS_ROLE"));
  const [userId, setUserId] = useState(localStorage.getItem("USER_ID"));
  const [notification, _setNotification] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      localStorage.setItem("USER", JSON.stringify(user));
    } else {
      localStorage.removeItem("USER");
    }
  }, [user]);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const _setToken = (token) => {
    setToken(token);
    if (token) {
      localStorage.setItem("JWT_TOKEN", token);
    } else {
      localStorage.removeItem("JWT_TOKEN");
    }
  };
  const _setRole = (role) => {
    setRole(role);
    // console.log('Context SetRole',role)
    if (role) {
      localStorage.setItem("ACCESS_ROLE", role);
    } else {
      localStorage.removeItem("ACCESS_ROLE");
    }
  };

  const _setUserId = (userId) => {
    setUserId(userId);
    if (userId) {
      localStorage.setItem("USER_ID", userId);
    } else {
      localStorage.removeItem("USER_ID");
    }
  };

  const setNotification = (message) => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification("");
    }, 5000);
  };

  const _setSuccess = (message) => {
    setSuccess(message);

    setTimeout(() => {
      setSuccess("");
    }, 5000);
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
    <StateContext.Provider
      value={{
        user,
        token,
        role,
        userId,
        _setToken,
        setUser,
        _setRole,
        notification,
        setNotification,
        _setUserId,
        success,
        _setSuccess,

        updateUser,

        currentPage,
        updateCurrentPage,
        totalPages,
        updateTotalPages,
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
    </StateContext.Provider>
  );
}
export const useStateContext = () => useContext(StateContext);
