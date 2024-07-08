import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext({
  user: {},
  updateUser: () => {},
  errors: [],
  updateErrors: () => {},
  loading: false,
  updateLoading: () => {},
  success: false,
  updateSuccess: () => {},
  token: null,
  updateToken: () => {},
  role: null,
  updateRole: () => {},
});

export default GlobalProvider = ({ children }) => {
  // User state
  const [user, setUser] = useState({});
  const updateUser = (newUser) => setUser(newUser);

  // Erros state
  const [errors, setErrors] = useState([]);
  const updateErrors = (newErrors) => {
    setErrors(newErrors);
    setTimeout(() => {
      setErrors({});
    }, 5000);
  };

  // Loading state
  const [loading, setLoading] = useState(false);
  const updateLoading = (newLoading) => setLoading(newLoading);

  // Success state
  const [success, setSuccess] = useState(false);
  const updateSuccess = (newSuccess) => {
    setSuccess(newSuccess);
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  // Load data from AsyncStorage on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const token = await AsyncStorage.getItem("JWT_TOKEN");
      const role = await AsyncStorage.getItem("ACCESS_ROLE");
      if (token) setToken(token);
      if (role) setRole(role);
    } catch (error) {
      console.error("Error loading data from AsyncStorage:", error);
    }
  };

  const updateToken = async (token) => {
    try {
      setToken(token);
      if (token) {
        await AsyncStorage.setItem("JWT_TOKEN", token);
      } else {
        await AsyncStorage.removeItem("JWT_TOKEN");
      }
    } catch (error) {
      console.error("Error setting token in AsyncStorage:", error);
    }
  };

  const updateRole = async (role) => {
    try {
      setRole(role);
      if (role) {
        await AsyncStorage.setItem("ACCESS_ROLE", role);
      } else {
        await AsyncStorage.removeItem("ACCESS_ROLE");
      }
    } catch (error) {
      console.error("Error setting role in AsyncStorage:", error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        updateUser,
        errors,
        updateErrors,
        loading,
        updateLoading,
        success,
        updateSuccess,
        token,
        updateToken,
        role,
        updateRole,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
