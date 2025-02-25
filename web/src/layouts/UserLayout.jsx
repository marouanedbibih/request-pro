// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useStateContext } from '../context/ContextProvider'
import { Navigate, Outlet } from 'react-router-dom';

function UserLayout() {
    const {token} = useStateContext();
    if (!token ) {
        return <Navigate to="/login" />;
    }
  return (
    <div>
      <h1>User Layout</h1>
      <Outlet />
    </div>
  )
}

export default UserLayout