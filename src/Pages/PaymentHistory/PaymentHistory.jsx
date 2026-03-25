import React from 'react';
import UseAuth from '../../Context/AuthContext/UseAuth';
import { useQuery } from '@tanstack/react-query';


const PaymentHistory = () => {

    const { user } = UseAuth();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: () => {
            return fetch(`http://localhost:3000/payments?email=${user.email}`, {
                headers: {
                    authorization: `bearer ${user?.accessToken}`
                }
            })
                .then(res => res.json())



        }
    })

    console.log(payments, user.email)
    return (
        <div>
            <h2 className="text-5xl">Payment History: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Paid time </th>
                            <th>Transaction</th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            payments.map((payment, index) => (
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>cy ganderton</td>

                                    <td>${payment.amount}</td>
                                    <td>{payment.paidAt}</td>
                                    <td>{payment.transactionId}</td>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PaymentHistory;