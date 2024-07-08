import React, { createContext, useContext, useState } from "react";

// Create the HomeContext
export const HomeContext = createContext({
    demande: {},
    updateDemande: () => {},
    resetDemande: () => {},
    demandes: [],
    updateDemandes: () => {},
});

// Create the HomeProvider component
export const HomeProvider = ({ children }) => {

  const [demande, setDemande] = useState({
    id: null,
    description: "",
    date: null,
    status: null,    
    type: null,
    clientId: null,
    clientName: null,
  });
  const [demandes, setDemandes] = useState([]);

  const updateDemande = (demande) => {
    setDemande(demande);
  };
  const updateDemandes = (demandes) => {
    setDemandes(demandes);
  };

  const resetDemande = () => {
    setDemande({
      id: null,
      description: "",
      date: null,
      status: null,
      type: null,
      clientId: null,
      clientName: null,
    });
  };


  return (
    <HomeContext.Provider
      value={{
        demande,
        updateDemande,
        resetDemande,
        demandes,
        updateDemandes,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);
