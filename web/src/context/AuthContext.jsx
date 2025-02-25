import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    client: {},
    _setClient: () => { },
    _restClient: () => { },
    credentials: {},
    _setCredentials: () => { },

});

// eslint-disable-next-line react/prop-types
export default function AuthContext({ children }) {
    const [client, setClient] = useState({
        lastname: "",
        firstname: "",
        phone: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const [credentials, setCredentials] = useState({
        email: "",
        password: null,
      });

    const _setClient = (data) => {
        setClient(data);
    }

    const _restClient = () => {
        setClient({
            lastname: "",
            firstname: "",
            phone: "",
            email: "",
            password: "",
            confirm_password: "",
        });
    }

    const _setCredentials = (data) => {
        setCredentials(data);
    }

    return (
        <StateContext.Provider value={{
            client,
            _setClient,
            _restClient,
            credentials,
            _setCredentials  
        }}>
            {children}
        </StateContext.Provider>
    )
}
export const useAuthContext = () => useContext(StateContext);
