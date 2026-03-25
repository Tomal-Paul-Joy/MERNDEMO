import React from 'react';
import UseAuth from '../Context/AuthContext/UseAuth';
import { useLocation } from 'react-router';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const location = useLocation();
    console.log(location);
    if (loading) {
        return (<><span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
            <span className="loading loading-bars loading-xl"></span></>);
    }
    if (!user) {
        return <Navigate state={location.pathname} to='/login' ></Navigate>
    }



    return children;
};

export default PrivateRoute;