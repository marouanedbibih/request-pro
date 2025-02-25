// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, createContext } from "react";

// create Context
const MyDemandeContext = createContext({
  demandes: [],
  updateDemandes: () => {},
  demande: {},
  updateDemande: () => {},
  resetDemande: () =>{}
});

// eslint-disable-next-line react/prop-types
export default function MyDemandeProvider({ children }) {

    const [demandes, setDemandes] = useState([]);
    const updateDemandes = (demandes) => setDemandes(demandes);

    const [demande, setDemande] = useState({});
    const updateDemande = (demande) => setDemande(demande);
    const resetDemande = () => setDemande({});


  return (
    <MyDemandeContext.Provider
      value={{
        demandes,
        updateDemandes,
        demande,
        updateDemande,
        resetDemande
      }}
    >
      {children}
    </MyDemandeContext.Provider>
  );
}
export const useMyDemandeContext = () => useContext(MyDemandeContext);
