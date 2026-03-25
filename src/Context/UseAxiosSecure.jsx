import axios from 'axios';
import React from 'react';
const axiosSecure = axios.create({
    baseURL: 'https://some-domain.com/api/',

});

const UseAxiosSecure = () => {

    return axiosSecure;
};

export default UseAxiosSecure;