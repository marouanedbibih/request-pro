// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../api/axios";
import { useAuthContext } from "../../context/AuthContext";
// import axiosClient from "../../api/axios.js";

function ClientNavbar() {
  const { _setToken, _setRole, user,userEmail, updateUser} = useStateContext();
  const navigate = useNavigate();

  const {credentials} = useAuthContext();

  useEffect(() => {
    findUserByEmailApi(userEmail)
  }, []);

  const findUserByEmailApi = (email) => {
    axiosClient.get(`/users/${email}`)
      .then(({ data }) => {
        console.log(data)
        updateUser(data.user)
      })
      .catch((err)=>{
        console.log(err)

      })
  };

  const onLogout = (ev) => {
    ev.preventDefault();
    _setToken(null);
    _setRole(null);
    navigate("/login");

    // axiosClient.post("/logout").then(() => {
    //   setUser({});
    //   _setToken(null);
    //   _setRole(null);
    // });
  };

  return (
    <header className="h-20 px-16 bg-white shadow-md flex justify-end items-center">
      <div className="flex items-center gap-8">
        <div className="flex items-center justify-between gap-4">
          <img
            className="w-10 h-10 rounded-[40px]"
            // src={`${import.meta.env.VITE_API_BASE_URL}/${user.image}`}
            // src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
            src={user.image}
          />
          <div className="flex flex-col justify-center items-start gap-1">
            <div className="text-neutral-800 text-sm font-bold font-['Roboto'] leading-[18.20px]">
              {/* {`${user.name} `} */} {user.lastname} {user.firstname}
            </div>
            <div className="text-zinc-400 text-[10px] font-bold font-['Roboto'] leading-[13px]">
              {/* {user.email} */} {user.email}
            </div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-[75px] px-3.5 py-2 bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow flex justify-center items-center gap-2"
        >
          <div className="text-white text-xs font-bold font-['Roboto'] uppercase leading-[18px]">
            Logout
          </div>
        </button>
      </div>
    </header>
  );
}

export default ClientNavbar;
