import React from 'react';
import { useLoaderData} from 'react-router-dom';

const Payment = () => {
    const payment = useLoaderData();
    // const { resellPrice, productName,} = booking;
    const {resellPrice, productName} = payment
    console.log(payment);
    return (
        <div>
            <h2 className="text-3xl">Payment for {productName}</h2>
            <p className='text-xl'><i>please pay <strong>${resellPrice}</strong> for this {productName} mobile phone</i></p>
        </div>
    );
};

export default Payment;