import React from 'react';
import UseAuth from '../Context/AuthContext/UseAuth';
import UseRole from '../Context/UseRole/UseRole';

const AdminRoute = ({ children }) => {
    const { loading } = UseAuth();
    const { role, roleLoading } = UseRole();
    if (loading || roleLoading) {
        return (<div>Loading</div>);
    }

    if (role.role !== 'Admin') {
        return (<div>Forbidden</div>)
    }



    return children;
};

export default AdminRoute;