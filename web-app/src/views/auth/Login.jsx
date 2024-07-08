// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

import Error from "../../components/alert/Error";
import axiosClient from "../../api/axios";
import { useStateContext } from "../../context/ContextProvider.jsx";
import Spinner from "../../components/spinner/Spinner.jsx";

// Test json
// eslint-disable-next-line no-unused-vars
import registerErrors from "../../../test/json/errors/register.json";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext.jsx";
import Success from "../../components/alert/Success.jsx";

function Login() {
  const { credentials, _setCredentials } = useAuthContext();

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState();
  // import the function _setSuccess from the context
  const { _setSuccess,success,_setRole,_setToken,updateUserEmail } = useStateContext();

  /**
   * useNavigate is a function from react-router-dom
   * used to redirect to another page
   */
  const navigate = useNavigate();

  // When the button submit this function sent request into the api and get the response
  const onSubmit = (ev) => {
    ev.preventDefault();
    setLoading(true);
    // set the credentials object into the payload {body of request} for sent to the api
    const payload = { ...credentials };
    console.log("Payload:", payload);

    /**
     * axios function create by defautl into axios.js file
     * this function sent the request to the api
     * and get the response
     *
     * the url of api EX: http://localhost:50000 is configure by defautl into axios.js file
     * you just need to put the endpoint of the api EX: /register,/clients?page=3
     * ?page=3 is a query parameter
     * always check the response object by console,log(response) for see the response format
     */
    loginApi(payload);
  };

  const loginApi =(payload)=>{
    axiosClient
    .post("/auth/login", payload)
    // {data } is shortcut of response.data
    .then(({ data }) => {
      console.log("Login Response Data ", data);
      setLoading(false);
      /**
       * _setSuccess is a function from the context
       * used to store data at a high level and share it between components.
       *
       * Example: If a user is created, the application redirects you to a new page (component) to display the success message.
       * You can retrieve this message from the context.
       */
      _setSuccess(data.success);
      _setToken(data.token);
      _setRole(data.role);
      updateUserEmail(data.email)
      _setToken(data.token)
      _setRole(data.role)
      
      // /profile is the routes of client list page in frontend check /src/routes/routes.jsx file
      navigate(data.redirectTo);

    })
    .catch((err) => {
      setErrors(err.response.data.errors);
      setLoading(false);
      // console.log("Error",err.response.data.errors);
    });
  }



  return (
    <>
      {errors && (
        <div className="fixed w-1/2 right-4 bottom-4 z-50 flex flex-col-reverse justify-end items-end space-y-4">
          {errors.map((e) => (
            <Error message={e} key={e} />
          ))}
        </div>
      )}
      {success && <Success message={success} />}

      {loading && <Spinner />}
      <div className="w-full flex justify-center items-center">
        <div className="w-2/6 h-auto p-6 bg-white rounded-lg shadow flex-col justify-center items-center inline-flex gap-4">
          {/* Title & Description form */}
          <div className="flex-col justify-start items-start gap-3 flex w-full">
            <div className="text-neutral-800 text-2xl font-bold font-['Roboto'] leading-9">
              Login
            </div>
            <div className="w-full text-start text-slate-500 text-base font-bold font-['Roboto'] leading-7">
              Nice to meet you! Enter your credentials to login.
            </div>
            {/* Form inputs */}
            <form className="" onSubmit={onSubmit}>
              <div id="inputs">
                <input
                  value={credentials.email}
                  onChange={(ev) =>
                    _setCredentials({ ...credentials, email: ev.target.value })
                  }
                  placeholder="Email"
                  className="mb-4 outline-none bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base transition duration-300 focus:border-gray-600"
                />
                <input
                  value={credentials.password}
                  onChange={(ev) =>
                    _setCredentials({
                      ...credentials,
                      password: ev.target.value,
                    })
                  }
                  placeholder="Password"
                  type="password"
                  className="mb-4 outline-none bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base transition duration-300 focus:border-gray-600"
                />
              </div>
              <div
                id="button"
                className="flex flex-col justify-center items-center gap-2"
              >
                <button
                  type="submit"
                  className="self-stretch w-full px-5 py-2.5 bg-gray-800 rounded-lg shadow justify-center items-center gap-2 inline-flex hover:bg-gray-700 active:bg-gray-900"
                >
                  <div className="text-white text-sm font-bold font-['Roboto'] uppercase leading-[21px]">
                    Login
                  </div>
                </button>

              </div>
              <div className="w-full flex justify-center items-center p-4 ">
                <p className="mr-2 text-slate-500 text-base font-bold font-['Roboto'] leading-7">
                  Already have an account?{" "}
                </p>
                <Link
                  to={"/register"}
                  className="text-base font-bold font-['Roboto'] leading-7 text-gray-900"
                >
                  Register
                </Link>
              </div>
              <div className="w-full flex justify-center items-center pb-4 px-4 ">
                <p className="mr-2 text-slate-500 text-base font-bold font-['Roboto'] leading-7">
                  {`You dont remember your password?`}{" "}
                </p>
                <Link
                  to={`/rest-password`}
                  className="text-base font-bold font-['Roboto'] leading-7 text-gray-900"
                >
                  Rest Password
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
