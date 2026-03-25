import React from 'react';
import UseAuth from '../AuthContext/UseAuth';
import { useQuery } from '@tanstack/react-query';

const UseRole = () => {

    const { user } = UseAuth();
    const { roleLoading, data: role = 'user' } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: () => {
            return fetch(`http://localhost:3000/users/${user?.email}/role`).then(res => res.json())
        }

    })

    return { role, roleLoading }
};

export default UseRole;