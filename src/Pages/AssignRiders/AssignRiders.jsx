import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';

const AssignRiders = () => {
    const [selectedParcel, setSelectedParcel] = useState(null);


    const riderModalRef = useRef();
    const { data: parcels = [] } = useQuery({

        queryKey: ['parcels', 'pending-pickup'],
        queryFn: () => {
            return fetch(`http://localhost:3000/parcels?deliveryStatus=pending-pickup`).then(res => res.json());
        }

    })
    const { data: riders = [] } = useQuery({
        queryKey: ['parcels', selectedParcel?.senderRegion, 'available'],
        enabled: !!selectedParcel,
        queryFn: () => {
            return fetch(`http://localhost:3000/parcels?deliveryStatus=pending-pickup`).then(res => res.json());
        }
    })

    console.log(parcels)
    const openAssignModal = parcel => {
        setSelectedParcel(parcel)
        riderModalRef.current.showModal();
    }
    return (
        <div>
            this is assign Riders {parcels.length}

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Parcel Name </th>
                            <th>Cost </th>
                            <th>Created At </th>
                            <th>Sender District </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            parcels.map((parcel, index) => (

                                <tr key={parcel._id}>
                                    <th>{index + 1}</th>
                                    <td>{parcel.data.parcelName}</td>
                                    <td>{parcel.data.cost}</td>
                                    <td>{parcel.createdAt}</td>
                                    <td>Bangladesh</td>
                                    <td>
                                        <button onClick={() => openAssignModal(parcel)} className='btn btn-primary text-black'>Assign Rider</button>
                                    </td>


                                </tr>
                            ))
                        }


                    </tbody>
                </table>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{riders.length}</h3>
                    {
                        riders.map((rider, index) => (
                            <h1>{index}</h1>
                        ))
                    }
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignRiders;