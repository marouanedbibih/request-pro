// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useStateContext } from '../context/ContextProvider';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import Success from '../components/alert/Success';
import HomeProvider from '../context/HomeProvider';
import Navbar from '../components/navbar/Navbar';

function HomeLayout() {
    const { success,role,token } = useStateContext();

    if (!token || role !== "CLIENT") {
      return <Navigate to="/login" />;
    }
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="px-16">
            <HomeProvider>
                <Outlet />
            </HomeProvider>
          </main>
          {success && <Success message={success} />}
          
        </div>
      </div>
    );
}

export default HomeLayout