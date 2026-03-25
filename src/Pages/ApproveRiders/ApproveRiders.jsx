import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaTrashAlt, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";

const ApproveRiders = () => {


    const { data: riders = [], refetch } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: () => {
            return fetch(`http://localhost:3000/riders`).then(res => res.json());
        }
    })
    const handleApproval = id => {
        fetch(`http://localhost:3000/riders/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'approved' })
        })
            .then(res => res.json())
            .then(data => console.log(data));



    }
    return (
        <div>

            <h1 className="text-5xl">Riders available: {riders.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            riders.map((rider, index) => (
                                <tr>
                                    <th>{index + 1}</th>
                                    <th>{rider.riderName}</th>
                                    <th>{rider.riderEmail}</th>
                                    <th>{rider.riderDistrict}</th>
                                    <th>{rider.status}</th>
                                    <th>
                                        <button className={`mx-2 ${rider.status === 'approved' ? 'text-green-500' : 'text-red-500'}`} onClick={() => handleApproval(rider._id)}><FaUserCheck /></button>

                                        <button className='mx-2'><FaTrashAlt /></button>

                                        <button className='mx-2'><IoPersonRemoveSharp /></button>


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

export default ApproveRiders;