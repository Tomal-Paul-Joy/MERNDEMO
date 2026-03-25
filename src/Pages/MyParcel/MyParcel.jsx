import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuth from '../../Context/AuthContext/UseAuth';
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { NavLink } from 'react-router';

const MyParcel = () => {
    const { user } = UseAuth();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: () => {
            const res = fetch(`http://localhost:3000/parcels?email=${user?.email}`);
            return res.then(res => res.json());
        }
    })
    const handlePayment = (parcel) => {
        const paymentInfo = {
            cost: parcel.data.cost,
            parcelId: parcel._id,
            senderEmail: parcel.data.senderEmail,
            parcelName: parcel.data.parcelName

        }
        fetch(`http://localhost:3000/payment-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                window.location.assign(data.url);
            })
    }
    const handleParcelDelete = (id) => {
        console.log(`delete`, id)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/parcels/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {

                        console.log(data);
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                "Deleted!",
                                "Your parcel request has been deleted.",
                                "success"
                            );
                        }


                    })



            }
        });



    }
    console.log(parcels);
    return (<div>


        <div>
            this is my parcel page {parcels.length}
        </div>
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Cost</th>
                        <th>Payment</th>
                        <th>Tracking Id </th>
                        <th>Delivery status </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        parcels.map((parcel, index) => (<tr>
                            <th>{index + 1}</th>
                            <td>{parcel.data.parcelName}</td>
                            <td>{parcel.data.cost}</td>
                            <td>
                                {
                                    parcel?.paymentStatus?.toLowerCase() === 'paid'

                                        ? <span className='text-green-600 font-bold'>Paid</span>
                                        : <button
                                            onClick={() => handlePayment(parcel)}
                                            className='btn btn-primary btn-sm'
                                        >
                                            Pay Now
                                        </button>
                                }

                            </td>
                            <td>{parcel.trackingId}</td>
                            <td>{parcel.deliveryStatus}</td>
                            <td><button className="btn btn-ghost hover:bg-yellow-500"><FaEdit /></button></td>
                            <td><button className="btn btn-ghost hover:bg-blue-500">< FaMagnifyingGlass /></button></td>
                            <td><button onClick={() => handleParcelDelete(parcel._id)} className="btn btn-ghost hover:bg-red-500"><FaTrashCan /></button></td>
                        </tr>))
                    }

                </tbody>
            </table>
        </div>
    </div>

    );
};

export default MyParcel;