// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../api/axios";

function Navbar() {
  const { _setToken, _setRole, token, user, updateUser } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get(`/users/profile?token=${token}`)
      .then(({ data }) => {
        console.log("User data navbar", data);
        updateUser(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]); 


  const onLogout = (ev) => {
    ev.preventDefault();
    _setToken(null);
    _setRole(null);
    updateUser(null);
    navigate("/login");
  };

  return (
    <header className="h-20 px-16 bg-white shadow-md flex justify-end items-center">
      <div className="flex items-center gap-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col justify-center items-start gap-1">
            <div className="text-neutral-800 text-sm font-bold font-['Roboto'] leading-[18.20px]">
              {user.firstname} {user.lastname}
            </div>
            <div className="text-zinc-400 text-[10px] font-bold font-['Roboto'] leading-[13px]">
              {user?.email}
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

export default Navbar;
