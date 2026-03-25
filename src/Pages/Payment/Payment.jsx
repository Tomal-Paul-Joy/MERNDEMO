import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

const Payment = () => {

    const { id } = useParams();
   
    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcel', id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/parcels/${id}`);
            return res.json();
        }
    });
    const handlePayment = () => {
        const paymentInfo = {
            cost: parcel.data.cost,
            parcelId: id,
            senderEmail: parcel.data.senderEmail,
            parcelName: parcel.data.parcelName
        }
        fetch('http://localhost:3000/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                window.location.href = data.url;
            })
    }
    if (isLoading) {
        return <div>Loading...</div>
    }


    return (
        <div>
            <h2>Please pay {parcel?.data?.cost} for {parcel?.data?.parcelName}</h2>
            <button onClick={handlePayment} className="btn btn-primary text-black">Pay</button>
        </div>
    );
};

export default Payment;