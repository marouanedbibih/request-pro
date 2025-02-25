// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../context/AdminProvider";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../api/axios";
import Spinner from "../spinner/Spinner";
import Error from "../alert/Error";

// eslint-disable-next-line react/prop-types
function AdminForm({idAdmin}) {
  const navigate = useNavigate();
  const {adminForm,_setAdminForm,_restAdminForm} = useAdminContext();
  const { _setSuccess } = useStateContext();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (idAdmin) {
      handelGetAdminById(idAdmin);
    }
  },[idAdmin]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = { ...adminForm };
    setLoading(true);
    if (idAdmin) {
      putAdmin(idAdmin, payload);
    } else {
      postAdmin(payload);
    }
  };
  const handelGetAdminById = (idAdmin) => {
    getAdminById(idAdmin);
  };

  setTimeout(() => {
    setErrors(null);
  }, 10000);

  // API Functions
  const postAdmin = (payload) => {
    axiosClient
      .post("/admins", payload)
      .then(({ data }) => {
        _setSuccess(data.success);
        navigate(data.redirectTo);
        _restAdminForm();
        setLoading(false);
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
        setLoading(false);
      });
  };

  const putAdmin = (id, payload) => {
    axiosClient
      .put(`/admins/${id}`, payload)
      .then(({data}) => {
        console.log("Update Admin Data", data);
        _setSuccess(data.success);
        console.log("Update Admin Data", data);

        setLoading(false);
        _restAdminForm();
        navigate(data.redirectTo);
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
        setLoading(false);
      });
  };
  const getAdminById = (id) => {
    axiosClient
      .get(`/admins/${id}`)
      .then(({ data }) => {
        _restAdminForm()
        _setAdminForm(data.user);
        setLoading(false);
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
        setLoading(false);
      });
  };

  return (
    <div className="w-1/2">
      {errors && (
        <div className="fixed right-4 bottom-4 z-50 flex flex-col-reverse justify-end items-end space-y-4">
          {errors.map((e) => (
            <Error message={e} key={e} />
          ))}
        </div>
      )}
      {loading && <Spinner />}

      <div className="w-full card animated fadeInDown ">
        <form className="grid grid-cols-1 gap-4" onSubmit={onSubmit}>
          <div className="grid grid-colms-1 gab-8 ">
            <div className="flex flex-col justify-center items-center gap-2">
              <input
                value={adminForm.firstname}
                onChange={(ev) =>
                  _setAdminForm({ ...adminForm, firstname: ev.target.value })
                }
                placeholder="Enter the admin first name"
                className="mb-4 outline-none bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base transition duration-300 focus:border-gray-600"
              />
              <input
                value={adminForm.lastname}
                onChange={(ev) =>
                  _setAdminForm({ ...adminForm, lastname: ev.target.value })
                }
                placeholder="Enter the admin last name"
                className="mb-4 outline-none bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base transition duration-300 focus:border-gray-600"
              />
            </div>

            <input
              value={adminForm.email}
              onChange={(ev) =>
                _setAdminForm({ ...adminForm, email: ev.target.value })
              }
              disabled={idAdmin}
              placeholder="Email"
              className="mb-4 outline-none bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base transition duration-300 focus:border-gray-600"
            />
            <input
              value={adminForm.phone}
              onChange={(ev) =>
                _setAdminForm({ ...adminForm, phone: ev.target.value })
              }
              placeholder="Phone"
              className="mb-4 outline-none bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base transition duration-300 focus:border-gray-600"
            />

            <input
              type="password"
              onChange={(ev) =>
                _setAdminForm({ ...adminForm, password: ev.target.value })
              }
              placeholder="Password"
              className="mb-4 outline-none bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base transition duration-300 focus:border-gray-600"
            />
            <input
              type="password"
              onChange={(ev) =>
                _setAdminForm({ ...adminForm, confirm_password: ev.target.value })
              }
              placeholder="Password Confirmation"
              className="mb-4 outline-none bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base transition duration-300 focus:border-gray-600"
            />
          </div>
          <div className="grid grid-cols-1 w-2/12">
            <button
              className="select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40  active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminForm;
