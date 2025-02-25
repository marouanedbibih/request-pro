import { useContext, useState } from 'react';
import { createContext } from "react";

const DemandeContext = createContext(
    {
        demande: {},
        updateDemande: () => {},
        demandes: [],
        updateDemandes: () => {}
    }

);

// eslint-disable-next-line react/prop-types
export default function DemandeProvider({children}) {
    const [demande, setDemande] = useState({
        id: null,
        description: "",
        date: null,
        status: null,
        type: null,
        clientId:null,
        clientName: null
    });
    const [demandes, setDemandes] = useState([]);

    const updateDemande = (demande) => {
        setDemande(demande);
    }
    const updateDemandes = (demandes) => {
        setDemandes(demandes);
    }

    return (
        <DemandeContext.Provider value={{
            demande,
            updateDemande,
            demandes,
            updateDemandes,
        }}>
            {children}
        </DemandeContext.Provider>
    );
}

export const useDemandeContext = () => useContext(DemandeContext);