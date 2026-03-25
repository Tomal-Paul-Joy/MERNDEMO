import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        if (sessionId) {
            fetch(`http://localhost:3000/payment-success?session_id=${sessionId}`, {
                method: 'PATCH',
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Payment success updated:', data);
                    if (data.success) {
                        setPaymentInfo({
                            transactionId: data.transactionId,
                            trackingId: data.trackingId
                        });
                    }
                })
                .catch(err => console.error(err));
        }
    }, [sessionId]);

    return (
        <div>
            <h1>Payment Successful</h1>
            <p>Your transaction ID: {paymentInfo.transactionId || 'Loading...'}</p>
            <p>Your parcel tracking ID: {paymentInfo.trackingId || 'Loading...'}</p>
        </div>
    );
};

export default PaymentSuccess;
