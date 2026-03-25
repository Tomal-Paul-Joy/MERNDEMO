import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import UseAuth from "../../Context/AuthContext/UseAuth";


const UsersManagement = () => {
    const [searchText, setSearchText] = useState('');


    const { user } = UseAuth();
    const accessToken = user.accessToken;

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', searchText],
        queryFn: () => {
            return fetch(`http://localhost:3000/users?searchText=${searchText}`).then(res => res.json())
        }
    })
    const handleMakeUser = user => {
        console.log('handle clicked ',)
        const roleInfo = { role: 'Admin' };
        fetch(`http://localhost:3000/users/${user._id}/role`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(roleInfo)
        })
            .then(res => res.json())
            .then(data => {
                refetch();
                console.log(data)
            })
    }
    const handleRemoveAdmin = user => {

        console.log('handle clicked ')
        const roleInfo = { role: 'user' };
        fetch(`http://localhost:3000/users/${user._id}/role`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`

            },
            body: JSON.stringify(roleInfo)
        })
            .then(res => res.json())
            .then(data => {
                refetch();
                console.log(data)
            })

    }



    return (
        <div>
            Users Management:<br></br>
            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input onChange={(e) => setSearchText(e.target.value)} type="search" className="grow" placeholder="Search" />

            </label>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th></th>

                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Actions </th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, index) => (
                                <tr>
                                    <td>{index + 1}</td>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user?.photoURL}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user?.displayName}</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td>


                                        <span className="badge badge-ghost badge-sm">{user?.email}</span>
                                    </td>
                                    <td>{user?.role}</td>
                                    <th>

                                        {
                                            user.role === 'Admin' ? (<button onClick={() => handleRemoveAdmin(user)} className='btn'>
                                                <FiShieldOff />

                                            </button >) : (<button onClick={() => handleMakeUser(user)} className='btn'>

                                                <FaUserShield />
                                            </button>)
                                        }


                                    </th>
                                    <th>
                                        Actions
                                    </th>
                                </tr>
                            ))
                        }

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default UsersManagement;