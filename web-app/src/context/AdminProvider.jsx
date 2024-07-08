// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext({
    admin: null,
    _setAdmin: () => {},
    admins: [],
    _setAdmins: () => {},
    adminForm: null,
    _setAdminForm: () => {},
    _restAdminForm: () => {}
})

// eslint-disable-next-line react/prop-types
export const AdminProvider = ({ children }) => {
    const [admin,setAdmin] = useState({
        lastname:"",
        firstname:"",
        email:"",
        phone:"",
        password:"",
        confirm_password:""
    })
    const _setAdmin = (data) =>{
        setAdmin(data)
    }

    const [admins,setAdmins] = useState([]);

    const _setAdmins = (datas) =>{
        setAdmins(datas)
    }

    const [adminForm,setAdminForm] = useState({
        id:null,
        lastname:"",
        firstname:"",
        email:"",
        phone:"",
        password:"",
        confirm_password:""
    })
    const _setAdminForm = (data) =>{
        setAdminForm(data)
    }
    const _restAdminForm = () => {
        setAdminForm({
            id: null,
            lastname: "",
            firstname: "",
            phone: "",
            email: "",
            password: "",
            confirm_password: "",
        });
    }
    

    return (
        <AdminContext.Provider value={{
            _setAdmin,
            _setAdmins,
            admin,
            admins,
            adminForm,
            _setAdminForm,
            _restAdminForm
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => useContext(AdminContext);
