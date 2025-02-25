import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  credentials: {},
  updateCredentials: () => {},
  resetCredentials: () => {},
  userRegister: {},
  updateUserRegister: () => {},
  resetUserRegister: () => {},
  removeJwtToken: () => {},
});

export default function AuthProvider({ children }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    code: null,
    confirm_password: null,
  });

  const updateCredentials = (newCredentials) => {
    setCredentials(newCredentials);
  };

  // Reset credentials
  const resetCredentials = () => {
    setCredentials({});
  };

  // Register user infos
  const [userRegister, setUserRegister] = useState({
    lastname: "",
    firstname: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const updateUserRegister = (newUserRegister) => {
    setUserRegister(newUserRegister);
  };

  // Reset userRegister
  const resetUserRegister = () => {
    setUserRegister({
      lastname: "",
      firstname: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
    });
  };

  // Remove JWT Token
  const removeJwtToken = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem("JWT_TOKEN");
      if (jwtToken) {
        await AsyncStorage.removeItem("JWT_TOKEN");
        console.log("JWT_TOKEN removed successfully");
      }
    } catch (error) {
      console.error("Error removing JWT_TOKEN:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        credentials,
        updateCredentials,
        resetCredentials,
        userRegister,
        updateUserRegister,
        resetUserRegister,
        removeJwtToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
