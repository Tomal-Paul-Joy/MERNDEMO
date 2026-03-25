import React from 'react';
import { AuthContext } from './AuthContext';
import { use } from 'react';

const UseAuth = () => {
    const authInfo = use(AuthContext);
    return authInfo;
};

export default UseAuth;