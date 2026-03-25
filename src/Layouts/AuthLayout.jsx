import React from 'react';
import { Outlet } from 'react-router';
import AuthImage from '../assets/ExtraImage/authImage.png'


const AuthLayout = () => {
    return (
        <div className="flex max-w-7xl mx-auto ">
            <div className="flex-1">

                <Outlet></Outlet>
            </div>
            <div className="flex-1">
                <img src={AuthImage} alt="" />
            </div>

        </div>
    );
};

export default AuthLayout;